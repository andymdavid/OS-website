'use client';

import React, { useState } from 'react';
import './Navigation.css';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Left Section: Logo Icon + Menu */}
        <div className="nav-left">
          <div className="nav-logo-icon">
            <img src="/Logo-Main-Icon.png" alt="Other Stuff Logo" width="46" height="31" />
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#products" className="nav-link">
              Products
            </a>
            <a href="#media" className="nav-link">
              Media
            </a>
            <a href="#company" className="nav-link">
              Company
            </a>
          </div>
        </div>

        {/* Center Section: Logo Text */}
        <div className="nav-center">
          <div className="nav-logo">OTHER STUFF</div>
        </div>

        {/* Right Section: Buttons */}
        <div className="nav-right">
          <a href="#contact" className="nav-link nav-contact-link">
            Contact Us
          </a>
          <button className="nav-join-btn">Join the Good Stuff</button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
