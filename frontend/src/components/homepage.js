import React from 'react';
import klimalogo from '../img/klima logo.png';
import klimatxt from '../img/klima text.png';
import rerend from '../img/rerend logo.png';
import gp from '../img/gp logo.png';
import gp2 from '../img/gp logo 2.png';
import download from '../img/download btn.png';
import developer1 from '../img/devs/shannen.jpg'; 
import developer2 from '../img/devs/mane.jpg';
import developer3 from '../img/devs/vinnie.jpg';
import developer4 from '../img/devs/kyan.jpg';
import '../css/homepage.css'; 

const Homepage = () => {
  return (
    <div className="background_homepage">
      <div className="centered_container">
        <img src={klimatxt} alt="KLIMA Logo" className="title_img" />
        <h1 className='subtitle'>Act Now for Nature – A Future Worth Protecting</h1>

        {/* Download Button */}
        <a  href="/login">
        <button className="dl_button">
          <img src={download} alt="Download" className="button_img" />
        </button>
      </a>
      </div>

      {/* Game Information Section */}
      <div className="main_container">
        <div className="game_info">
          <h2 className="game_title">About the Game</h2>
          <p className="game_description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus, nunc at egestas euismod, nisl nisl bibendum risus, a vestibulum nulla sapien et urna. Sed ac felis sed felis ullamcorper tincidunt.
          </p>
          <p className="game_description">
            Phasellus sed felis tincidunt, auctor arcu in, dictum nunc. Aenean ultricies vitae orci in lacinia. Sed vitae arcu at quam cursus tincidunt. Praesent sit amet leo libero.
          </p>
        </div>

        {/* About Us Section */}
        <div className="about_us">
          <h2 className="section_title">Meet Our Team</h2>
          <div className="developer_profiles">
            {/* Developer Profile 1 */}
            <div className="developer_card">
              <img src={developer1} alt="Developer 1" className="developer_photo" />
              <h3 className="developer_name">Developer 1</h3>
              <p className="developer_role">Role: Lead Developer</p>
              <p className="developer_bio">Expert in game development and passionate about sustainability.</p>
            </div>

            {/* Developer Profile 2 */}
            <div className="developer_card">
              <img src={developer2} alt="Developer 2" className="developer_photo" />
              <h3 className="developer_name">Developer 2</h3>
              <p className="developer_role">Role: UI/UX Designer</p>
              <p className="developer_bio">Focused on creating user-friendly and engaging designs.</p>
            </div>

            {/* Developer Profile 3 */}
            <div className="developer_card">
              <img src={developer3} alt="Developer 3" className="developer_photo" />
              <h3 className="developer_name">Developer 3</h3>
              <p className="developer_role">Role: Backend Developer</p>
              <p className="developer_bio">Specializes in secure and scalable server-side applications.</p>
            </div>

            {/* Developer Profile 4 */}
            <div className="developer_card">
              <img src={developer4} alt="Developer 4" className="developer_photo" />
              <h3 className="developer_name">Developer 4</h3>
              <p className="developer_role">Role: Project Manager</p>
              <p className="developer_bio">Organizes project timelines and ensures smooth collaboration.</p>
            </div>
          </div>
        </div>

        {/* Partner Section */}
        <div className="partners_section">
          <h2 className="section_title">Our Partners</h2>
          <div className="partner_card">
            <img src={gp2} alt="Partner Logo" className="partner_logo" />
            <p className="partner_info">Partner Organization Name - Dedicated to environmental conservation and sustainability.</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer_container">
            <p className="footer_copy">&#169; KLIMA 2024 | All rights reserved.</p>
            <img src={gp} alt="Bottom Left" className="bottom_left" />
            <img src={rerend} alt="Bottom Mid" className="bottom_mid" />
            <img src={klimalogo} alt="Bottom Right" className="bottom_right" />
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Homepage;
