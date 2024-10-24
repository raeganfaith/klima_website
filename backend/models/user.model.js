// const mongoose = require('mongoose');
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  icon: {
    type: Number,
    default: 0,
  },
  world1: {
    type: Number,
    default: 0,
  },
  world2: {
    type: Number,
    default: 0,
  },
  world3: {
    type: Number,
    default: 0,
  },
  flowered: {
    type: Number,
    default: 0,
  },
  tree: {
    type: Number,
    default: 0,
  },
  trash: {
    type: Number,
    default: 0,
  },
  fired: {
    type: Number,
    default: 0,
  },
  minigame: {
    type: Number,
    default: 0,
  },
  talked: {
    type: Number,
    default: 0,
  },
  water: {
    type: Number,
    default: 0,
  },
  fire: {
    type: Number,
    default: 0,
  },
  earth: {
    type: Number,
    default: 0,
  },
});

// Product model, create a collection labelled as "Product" using the productSchema
// The "Product" will automatically renamed to "products" in the MongoDB
const User = mongoose.model("User", userSchema);

// To use this in different files
export default User;

// module.exports = mongoose.model('User', UserSchema);
