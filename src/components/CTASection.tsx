
import React from 'react';
import { Button } from './Button';
import './IntroSection.css';
import './CTASection.css';

export function CTASection() {
  return (
    <section className="section cta-section">
      <div className="section-container-wide cta-content">
        <div className="intro-pill">Get Started</div>

        <h2 className="section-heading">
          Ready to get started? Here's where to begin.
        </h2>

        <p className="cta-intro">
          If you're ready to start building your internal AI capability in a practical way, lets chat.
        </p>

        <Button
          className="cta-button"
          variant="primary"
          onClick={() => (window.location.href = 'mailto:info@otherstuff.studio')}
        >
          Talk to Us
        </Button>
      </div>
    </section>
  );
}
