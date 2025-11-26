'use client';

import React from 'react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo/Icon - Outside Grid */}
        <div className="footer-brand">
          <div className="footer-logo-icon">
            <img src="/Logo-Main-Icon.png" alt="Other Stuff Logo" width="46" height="31" />
          </div>
          <div className="footer-logo">OTHER STUFF</div>
        </div>

        {/* Main Grid - 4 Columns */}
        <div className="footer-grid">
          {/* Column 1: Tagline & Info (Wider) */}
          <div className="footer-brand-column">
            <div className="footer-tagline">
              Artificial Intelligence is a new dawn for human flourishing
            </div>
            <div className="footer-company-info">
              <p>Other Stuff Pty Ltd</p>
              <p>ABN 20 682 110 970</p>
              <p>City Beach WA 6015</p>
              <p>info@otherstuff.studio</p>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <a href="#touch-dont-look">Touch, Don't Look</a>
            <a href="#speedrun">Speedrun</a>
            <a href="#marginal-gains">Marginal Gains Club</a>
          </div>

          {/* Column 3: Media */}
          <div className="footer-column">
            <h4>Media</h4>
            <a href="#articles">Articles</a>
            <a href="#podcasts">Podcasts</a>
            <a href="#newsletter">Newsletter</a>
          </div>

          {/* Column 4: Company */}
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2025 Other Stuff Pty Ltd. All rights reserved.</span>
            <span className="footer-separator">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="footer-separator">•</span>
            <a href="#privacy">Privacy Policy</a>
          </div>

          <div className="footer-social">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              YT
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LI
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
