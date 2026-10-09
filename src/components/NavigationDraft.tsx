
import React, { useEffect, useState, useRef } from 'react';
import { NewsletterModal } from './NewsletterModal';
import { CAL_DISCOVERY_URL } from '../lib/links';
import { BookCallContent } from './BookCallContent';
import { HomeDuplicateGoodStuffStrip } from './HomeDuplicateGoodStuffStrip';
import './Navigation.css';

type NavDropdownKey = 'solutions' | 'media';

const solutions = [
  {
    title: 'AI Automation',
    description: 'We work with your team each month to automate and improve the processes costing you the most time.',
    href: '/ai-automation/',
  },
  {
    title: 'Ambulando',
    description: 'The shared workspace where your people and AI agents turn conversations into tasks, workflows and applications.',
    href: 'https://ambulando.io',
  },
  {
    title: 'AI Workshops',
    description: 'Practical, hands-on workshops that help business teams and students understand, use and build with AI.',
    href: '/speedrun/',
    children: [
      { title: 'Business workshops', href: '/speedrun/' },
      { title: 'School workshops', href: '/levelup/' },
    ],
  },
];

const mediaLinks = [
  {
    title: 'Intelligence Snacks',
    description: 'Long-form conversations and newsletters exploring useful ideas about AI, software and the future of business.',
    href: 'https://intelligencesnacks.com/',
  },
  {
    title: 'Writing',
    description: 'Notes, essays and practical thinking drawn from our work building AI systems with small and medium-sized businesses.',
    href: '/writing/',
  },
  {
    title: 'Games',
    description: 'Playable experiments created through our work with AI, software and new ways of interacting with technology.',
    href: '/games/',
  },
];

interface NavigationDraftProps {
  titleOverride?: string;
  showPromoStrip?: boolean;
  titleSwapOnScroll?: {
    before: string;
    after: string;
    targetId: string;
  };
}

export function NavigationDraft({ titleOverride, showPromoStrip = true, titleSwapOnScroll }: NavigationDraftProps) {
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
  const megaStrip = openDropdown === 'media'
    ? {
        label: 'Intelligence Snacks',
        text: 'Ideas about AI, software and business, delivered regularly.',
        action: 'Explore Intelligence Snacks',
        href: 'https://intelligencesnacks.com/',
      }
    : {
        label: 'Automation Partner',
        text: 'Automate more of your business each month.',
        action: 'Explore Automation Partner',
        href: '/ai-automation/',
      };

  return (
    <>
      {showPromoStrip && <HomeDuplicateGoodStuffStrip />}
      <nav className={`nav ${isMegaOpen ? 'mega-open' : ''}`}>
      <div className={`nav-container ${isMegaOpen ? 'mega-open' : ''}`}>
        {/* Main Nav Row */}
        <div className="nav-row">
          {/* Left Section: Logo Icon + Menu */}
          <div className="nav-left">
            <a className="nav-logo-icon" href="/" onClick={closeMenus}>
              <img src="/Logo-Main-Icon.webp" alt="Other Stuff — AI product studio" width="46" height="31" />
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
              <a href="/about/" className="nav-link" onClick={closeMenus}>
                Company
              </a>
            </div>
          </div>

          {/* Center Section: Logo Text */}
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

          {/* Right Section: Buttons */}
          <div className="nav-right">
            <a href="https://welcome.otherstuff.ai/" className="nav-link nav-contact-link" onClick={closeMenus}>
              Sign In
            </a>
            <a
              href={CAL_DISCOVERY_URL}
              className="nav-join-btn book-call-button"
              onClick={closeMenus}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookCallContent />
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
          className={`mega-menu ${isMegaOpen ? 'visible' : ''} ${openDropdown === 'media' ? 'media-menu' : ''}`}
          onMouseEnter={() => {
            if (openDropdown) {
              handleDropdownEnter(openDropdown);
            }
          }}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="mega-menu-surface">
            <div className="mega-menu-grid">
              {activeDropdownItems.map((item) => (
                <div key={item.title} className="mega-menu-column">
                  <a
                    href={item.href}
                    className="mega-menu-primary-link"
                    onClick={closeMenus}
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </a>
                  {'children' in item && item.children ? (
                    <div className="mega-menu-secondary-links">
                      {item.children.map((child) => (
                        <a key={child.title} href={child.href} onClick={closeMenus}>
                          {child.title}<span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <a
              className="mega-menu-strip"
              href={megaStrip.href}
              onClick={closeMenus}
              {...(megaStrip.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="mega-menu-strip-copy">
                <strong>{megaStrip.label}</strong>
                <span>{megaStrip.text}</span>
              </span>
              <span className="mega-menu-strip-action">
                {megaStrip.action}<span aria-hidden="true">→</span>
              </span>
            </a>
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
                  <React.Fragment key={item.title}>
                    <a href={item.href} className="mobile-menu-subitem" onClick={closeMenus}>
                      {item.title}
                    </a>
                    {'children' in item && item.children ? (
                      <div className="mobile-menu-nested-links">
                        {item.children.map((child) => (
                          <a key={child.title} href={child.href} onClick={closeMenus}>{child.title}</a>
                        ))}
                      </div>
                    ) : null}
                  </React.Fragment>
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

            <a href="/about/" className="mobile-menu-primary mobile-menu-link" onClick={closeMenus}>
              Company
            </a>
          </div>

          <div className="mobile-menu-actions">
            <a href="https://welcome.otherstuff.ai/" className="mobile-menu-secondary" onClick={closeMenus}>
              Sign In
            </a>
            <a
              href={CAL_DISCOVERY_URL}
              className="nav-join-btn mobile-menu-cta book-call-button"
              onClick={closeMenus}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookCallContent />
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </nav>
    </>
  );
}
