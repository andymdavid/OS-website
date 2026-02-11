
import React, { useEffect, useState } from 'react';
import { NewsletterModal } from './NewsletterModal';
import './Navigation.css';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0 });
    }
  }, []);

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Left Section: Logo Icon + Menu */}
        <div className="nav-left">
          <div
            className="nav-logo-icon"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          >
            <img src="/Logo-Main-Icon.png" alt="Other Stuff Logo" width="46" height="31" />
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a
              href="#system"
              className="nav-link"
              onClick={(event) => handleScrollTo(event, 'system')}
            >
              Products
            </a>
            <a href="#media" className="nav-link">
              Media
            </a>
            <a
              href="#approach"
              className="nav-link"
              onClick={(event) => handleScrollTo(event, 'approach')}
            >
              Company
            </a>
          </div>
        </div>

        {/* Center Section: Logo Text */}
        <div className="nav-center">
          <div
            className="nav-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          >
            OTHER STUFF
          </div>
        </div>

        {/* Right Section: Buttons */}
        <div className="nav-right">
          <a href="mailto:info@otherstuff.studio" className="nav-link nav-contact-link">
            Contact Us
          </a>
          <button
            className="nav-join-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Join the Good Stuff
          </button>
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

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
