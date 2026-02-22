
import React, { useEffect, useState, useRef } from 'react';
import { NewsletterModal } from './NewsletterModal';
import './Navigation.css';

const solutions = [
  {
    title: 'Speedrun Workshop',
    description: 'Get your team building with AI in a single high-energy session. Perfect for first exposure.',
    href: '#speedrun-workshop',
  },
  {
    title: 'Speedrun Applied',
    description: 'Take what you learned and apply it to a real business challenge with guided support.',
    href: '#speedrun-applied',
  },
  {
    title: 'Level-Up Workshop',
    description: 'Structured capability building over multiple sessions for deeper AI integration.',
    href: '#level-up',
  },
  {
    title: 'Marginal Gains Club',
    description: 'Ongoing community access with weekly AI implementation support and resources.',
    href: '#marginal-gains',
  },
  {
    title: 'Wingman',
    description: 'Your AI agent system for automating real work inside your business.',
    href: '#wingman',
  },
];

export function NavigationDraft() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) {
      clearTimeout(solutionsTimeoutRef.current);
    }
    setIsSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
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
            <div
              className="nav-link-wrapper"
              onMouseEnter={handleSolutionsEnter}
              onMouseLeave={handleSolutionsLeave}
            >
              <button className={`nav-link nav-link-dropdown ${isSolutionsOpen ? 'active' : ''}`}>
                Solutions
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
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
          <a href="https://welcome.otherstuff.ai/" className="nav-link nav-contact-link">
            Sign In
          </a>
          <a
            href="mailto:info@otherstuff.studio"
            className="nav-join-btn"
          >
            Talk to Us
          </a>
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

      {/* Mega Menu */}
      <div
        className={`mega-menu ${isSolutionsOpen ? 'visible' : ''}`}
        onMouseEnter={handleSolutionsEnter}
        onMouseLeave={handleSolutionsLeave}
      >
        <div className="mega-menu-container">
          <div className="mega-menu-grid">
            {solutions.map((solution) => (
              <a key={solution.title} href={solution.href} className="mega-menu-card">
                <h4>{solution.title}</h4>
                <p>{solution.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
