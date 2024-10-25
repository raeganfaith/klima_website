import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import fs from "fs/promises";
import jwt from "jsonwebtoken"; 
dotenv.config();

const otpStore = {};
const app = express();
const secretKey = process.env.JWT_SECRET || "your_secret_key";  // Add secretKey for JWT

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 5000;

// Connect to MongoDB
app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Access denied. No token provided." });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Middleware to read and verify token from token.txt
const verifyTokenFromFile = (req, res, next) => {
  const tokenFilePath = "./public/Game/Token/token.txt";

  fs.readFile(tokenFilePath, "utf8", (err, token) => {
    if (err) return res.status(500).json({ message: "Error reading token file" });

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid or expired token" });
      req.user = decoded;
      next();
    });
  });
};

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: "24h" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });
      const filePath = "./frontend/public/Game/Token/token.txt"; 

      try {
        await fs.mkdir("./public/Game/Token", { recursive: true });
        await fs.writeFile(filePath, token, "utf8");
        res.status(200).json({ message: "Login successful", token });
      } catch (fileError) {
        console.error("Failed to write token to file:", fileError);
        res.status(500).json({ message: "Server error: unable to save token" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Validate token endpoint
app.get("/api/validate-token", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

// Change password
app.post("/api/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "klima.otp@gmail.com",
    pass: "temu zxkw hcom gael",
  },
});

// Generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const otp = generateOtp();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };

    const mailOptions = {
      from: "klima.otp@gmail.com",
      to: email,
      subject: "Your One-Time Password (OTP)",
      html: `<p>Your OTP code is: ${otp}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const storedOtp = otpStore[email];
  if (!storedOtp || storedOtp.expires < Date.now()) {
    return res.status(400).json({ message: "OTP expired or does not exist" });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email];
  res.status(200).json({ message: "OTP verified successfully" });
});
