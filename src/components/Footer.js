import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo-row">
            <img src={process.env.PUBLIC_URL + "/logo.jpeg"} alt="Horizon Engineering Services LLP" className="footer__logo-img" />
            <span className="footer__brand-name">HORIZON <span className="footer__brand-sub">Engineering Services LLP</span></span>
          </div>
          <p className="footer__tagline">Building Energy, Infrastructure, and Life.</p>
          <div className="footer__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h4 className="footer__heading">Services</h4>
          <ul className="footer__list">
            <li>IT Services</li>
            <li>Construction</li>
            <li>Installation</li>
            <li>Material Supply</li>
            <li>Engineering</li>
          </ul>
        </div>

        {/* Sectors */}
        <div className="footer__col">
          <h4 className="footer__heading">Sectors</h4>
          <ul className="footer__list">
            {/* <li>Oil &amp; Gas</li> */}
            {/* <li>Petrochemical</li> */}
            <li>IT</li>
            <li>Residential</li>
            <li>Commercial</li>
            <li>Lifts &amp; Elevators</li>
            <li>Facilities</li>
            <li>Energy</li>
            
          </ul>
        </div>

        {/* Quick links */}
        <div className="footer__col">
          <h4 className="footer__heading">Company</h4>
          <ul className="footer__list">
            <li><a href="/#about">About Us</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} Horizon Engineering Services LLP. All rights reserved.</p>
        <p>Designed with precision. Built with purpose.</p>
      </div>
    </footer>
  );
}
