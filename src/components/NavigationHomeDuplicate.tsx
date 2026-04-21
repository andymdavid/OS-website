import React, { useEffect, useRef, useState } from 'react';
import { NewsletterModal } from './NewsletterModal';
import './Navigation.css';

type NavDropdownKey = 'solutions' | 'media';

const solutions = [
  {
    title: 'Custom AI Systems',
    description: 'Built to grow your margins, free up capital, and reduce risk across the workflows that matter most.',
    href: '/marginal-gains',
  },
  {
    title: 'Wingmen',
    description: 'The operating environment for running, monitoring, and managing the AI systems in your business.',
    href: '/#system',
  },
  {
    title: 'Speedrun Workshop',
    description: 'Get your team building with AI in a single high-energy session. Perfect for first exposure.',
    href: '/speedrun',
  },
  {
    title: 'Level-Up Workshop',
    description: 'Structured capability building over multiple sessions for deeper AI integration.',
    href: '/levelup',
  },
];

const mediaLinks = [
  {
    title: 'The Good Stuff',
    description: 'Conversations, episodes, and field notes from building with AI.',
    href: '/the-good-stuff',
  },
  {
    title: 'Writing',
    description: 'Notes, essays, and practical thinking from the work.',
    href: '/writing',
  },
  {
    title: 'Games',
    description: 'Playable examples built through our hands-on work with AI.',
    href: '/games',
  },
];

interface NavigationHomeDuplicateProps {
  titleOverride?: string;
  titleSwapOnScroll?: {
    before: string;
    after: string;
    targetId: string;
  };
}

export function NavigationHomeDuplicate({
  titleOverride,
  titleSwapOnScroll,
}: NavigationHomeDuplicateProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<NavDropdownKey | null>(null);
  const [isPastTarget, setIsPastTarget] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownEnter = (key: NavDropdownKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleDropdown = (key: NavDropdownKey) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0 });
    }
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenus();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

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

  const navTitle = titleOverride ?? 'OTHER STUFF';
  const activeDropdownItems = openDropdown === 'media' ? mediaLinks : solutions;
  const isMegaOpen = openDropdown !== null;

  return (
    <nav className={`nav ${isMegaOpen ? 'mega-open' : ''}`}>
      <div className={`nav-container ${isMegaOpen ? 'mega-open' : ''}`}>
        <div className="nav-row">
          <div className="nav-left">
            <a className="nav-logo-icon" href="/" onClick={closeMenus}>
              <img src="/Logo-Main-Icon.webp" alt="Other Stuff Logo" width="46" height="31" />
            </a>

            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <div
                className="nav-link-wrapper"
                onMouseEnter={() => handleDropdownEnter('solutions')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`nav-link nav-link-dropdown ${openDropdown === 'solutions' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('solutions')}
                  type="button"
                >
                  Solutions
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={`nav-inline-links ${openDropdown === 'solutions' ? 'visible' : ''}`}>
                  {solutions.map((item) => (
                    <a key={item.title} href={item.href} className="nav-inline-link" onClick={closeMenus}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              <div
                className="nav-link-wrapper"
                onMouseEnter={() => handleDropdownEnter('media')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`nav-link nav-link-dropdown ${openDropdown === 'media' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('media')}
                  type="button"
                >
                  Media
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={`nav-inline-links ${openDropdown === 'media' ? 'visible' : ''}`}>
                  {mediaLinks.map((item) => (
                    <a key={item.title} href={item.href} className="nav-inline-link" onClick={closeMenus}>
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              <a href="/about" className="nav-link" onClick={closeMenus}>
                Company
              </a>
            </div>
          </div>

          <div className="nav-center">
            <a className="nav-logo" href="/" onClick={closeMenus}>
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
            </a>
          </div>

          <div className="nav-right">
            <a href="https://welcome.otherstuff.ai/" className="nav-link nav-contact-link" onClick={closeMenus}>
              Sign In
            </a>
            <a
              href="mailto:info@otherstuff.studio"
              className="nav-join-btn"
              onClick={closeMenus}
            >
              Book a Free AI Audit
            </a>
          </div>

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

        <div
          className={`mega-menu ${isMegaOpen ? 'visible' : ''} ${openDropdown === 'media' ? 'media-menu' : ''}`}
          onMouseEnter={() => {
            if (openDropdown) {
              handleDropdownEnter(openDropdown);
            }
          }}
          onMouseLeave={handleDropdownLeave}
        >
          <div className={`mega-menu-grid ${openDropdown === 'media' ? 'media-grid' : 'solutions-grid'}`}>
            {activeDropdownItems.map((item) => (
              <a key={item.title} href={item.href} className="mega-menu-card" onClick={closeMenus}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-panel">
          <button
            type="button"
            className="mobile-menu-close"
            onClick={closeMenus}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>

          <div className="mobile-menu-groups">
            <div className="mobile-menu-group">
              <button
                className={`mobile-menu-primary mobile-menu-toggle ${openDropdown === 'solutions' ? 'active' : ''}`}
                onClick={() => toggleDropdown('solutions')}
                type="button"
                aria-expanded={openDropdown === 'solutions'}
              >
                <span>Solutions</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`mobile-menu-submenu ${openDropdown === 'solutions' ? 'visible' : ''}`}>
                {solutions.map((item) => (
                  <a key={item.title} href={item.href} className="mobile-menu-subitem" onClick={closeMenus}>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="mobile-menu-group">
              <button
                className={`mobile-menu-primary mobile-menu-toggle ${openDropdown === 'media' ? 'active' : ''}`}
                onClick={() => toggleDropdown('media')}
                type="button"
                aria-expanded={openDropdown === 'media'}
              >
                <span>Media</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`mobile-menu-submenu ${openDropdown === 'media' ? 'visible' : ''}`}>
                {mediaLinks.map((item) => (
                  <a key={item.title} href={item.href} className="mobile-menu-subitem" onClick={closeMenus}>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            <a href="/about" className="mobile-menu-primary mobile-menu-link" onClick={closeMenus}>
              Company
            </a>
          </div>

          <div className="mobile-menu-actions">
            <a href="https://welcome.otherstuff.ai/" className="mobile-menu-secondary" onClick={closeMenus}>
              Sign In
            </a>
            <a
              href="mailto:info@otherstuff.studio"
              className="nav-join-btn mobile-menu-cta"
              onClick={closeMenus}
            >
              Book a Free AI Audit
            </a>
          </div>
        </div>
      </div>

      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
