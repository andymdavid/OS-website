
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

interface NavigationDraftProps {
  titleOverride?: string;
  titleSwapOnScroll?: {
    before: string;
    after: string;
    targetId: string;
  };
}

export function NavigationDraft({ titleOverride, titleSwapOnScroll }: NavigationDraftProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isPastTarget, setIsPastTarget] = useState(false);
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

  useEffect(() => {
    if (!titleSwapOnScroll) {
      return undefined;
    }

    const resolveTarget = () =>
      document.getElementById(titleSwapOnScroll.targetId) ||
      document.querySelector('.speedrun-page section');

    const updateState = () => {
      const target = resolveTarget();
      if (!target) {
        setIsPastTarget(false);
        return;
      }

      const { bottom } = target.getBoundingClientRect();
      setIsPastTarget(bottom <= 0);
    };

    updateState();
    window.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    const intervalId = window.setInterval(updateState, 250);

    return () => {
      window.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
      window.clearInterval(intervalId);
    };
  }, [titleSwapOnScroll]);

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.replaceState(null, '', window.location.pathname);
  };

  const navTitle = titleOverride ?? 'OTHER STUFF';

  return (
    <nav className={`nav ${isSolutionsOpen ? 'mega-open' : ''}`}>
      <div className={`nav-container ${isSolutionsOpen ? 'mega-open' : ''}`}>
        {/* Main Nav Row */}
        <div className="nav-row">
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
              {titleSwapOnScroll ? (
                <span className="nav-logo-swap" aria-label={isPastTarget ? titleSwapOnScroll.after : titleSwapOnScroll.before}>
                  <span className="nav-logo-measure" aria-hidden="true">
                    {titleSwapOnScroll.before.length >= titleSwapOnScroll.after.length
                      ? titleSwapOnScroll.before
                      : titleSwapOnScroll.after}
                  </span>
                  <span className={`nav-logo-text ${isPastTarget ? '' : 'is-active'}`} aria-hidden="true">
                    {titleSwapOnScroll.before}
                  </span>
                  <span className={`nav-logo-text ${isPastTarget ? 'is-active' : ''}`} aria-hidden="true">
                    {titleSwapOnScroll.after}
                  </span>
                </span>
              ) : (
                navTitle
              )}
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

        {/* Mega Menu - Below nav-row */}
        <div
          className={`mega-menu ${isSolutionsOpen ? 'visible' : ''}`}
          onMouseEnter={handleSolutionsEnter}
          onMouseLeave={handleSolutionsLeave}
        >
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
