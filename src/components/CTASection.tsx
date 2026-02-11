
import React, { useState } from 'react';
import { Button } from './Button';
import { NewsletterModal } from './NewsletterModal';
import './CTASection.css';

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="section cta-section">
      <div className="section-container-wide">
        <div className="cta-pill fade-in">HOW TO GET STARTED</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          Ready to get started? Here’s where to begin.
        </h2>

        <p className="cta-intro fade-in fade-in-stagger-2">
          If you’re ready to start working with AI in a practical way, here’s how
          to get started.
        </p>

        <div className="cta-cards">
          <div className="cta-card cta-card-dark fade-in">
            <div className="cta-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="4" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 14c0 3.866 2.686 7 6 7s6-3.134 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>
              If you want to get a feel for how we think and work, The Good Stuff
              is the best place to start.
            </h3>
            <p>
              Sign up for The Good Stuff, and get the ideas, insights, and
              observations we're learning as AI changes how people work and how
              businesses are built — delivered weekly to your inbox.
            </p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Join The Good Stuff
            </Button>
          </div>

          <div className="cta-card cta-card-gradient fade-in fade-in-stagger-1">
            <div className="cta-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="cta-card-heading">
              Get started with Touch, Don’t Look — and go from zero to building
              your own app in under an hour.
            </h3>
            <p>
              In this 90-minute hands-on session, you will build a working mobile
              app with AI, even if you’ve never built anything before. If you want
              to try this for yourself, book your session below.
            </p>
            <Button
              variant="primary"
              onClick={() =>
                (window.location.href =
                  'https://events.humanitix.com/touch-don-t-look-how-to-actually-build-things-with-ai')
              }
            >
              Book Your Session
            </Button>
          </div>
        </div>

      </div>

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
