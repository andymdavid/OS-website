'use client';

import React from 'react';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-logo">OTHER STUFF</div>
          <div className="footer-tagline">
            Artificial Intelligence is a new dawn for human flourishing
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Services</h4>
            <a href="#workshops">Workshops</a>
            <a href="#consulting">Consulting</a>
            <a href="#speaking">Speaking</a>
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <a href="#wingman">Wingman</a>
            <a href="#coming-soon">Coming Soon</a>
          </div>

          <div className="footer-column">
            <h4>Media</h4>
            <a href="#articles">Articles</a>
            <a href="#podcasts">Podcasts</a>
            <a href="#newsletter">Newsletter</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© 2025 Other Stuff Pty Ltd. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
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

          <div className="footer-info">
            <p>Other Stuff Pty Ltd</p>
            <p>ABN 20 682 110 970</p>
            <p>City Beach WA 6015</p>
            <p>info@otherstuff.studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
