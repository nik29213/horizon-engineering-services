import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'About', to: '/#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar${scrolled || !isHome ? ' navbar--solid' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <img src={process.env.PUBLIC_URL + "/logo_text.jpeg"} alt="Horizon Engineering Services LLP Logo" className="navbar__logo-img" />
          {/* <span className="navbar__brand">HORIZON <span className="navbar__brand-sub">ENGINEERING</span> <span className="navbar__brand-sub">SERVICES LLP</span></span> */}
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a
                href={l.to}
                className={`navbar__link${location.pathname === l.to ? ' active' : ''}`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/contact" className="navbar__cta">Get in Touch</Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a
            key={l.label}
            href={l.to}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <Link to="/contact" className="navbar__cta navbar__cta--mobile" onClick={() => setMenuOpen(false)}>
          Get in Touch
        </Link>
      </div>
    </nav>
  );
}
