
import React from 'react';
import { Button } from './Button';
import './IntroSection.css';
import './CTASection.css';

interface CTASectionProps {
  pillLabel?: string;
  heading?: string;
  intro?: string;
  buttonLabel?: string;
  className?: string;
  pillHasDot?: boolean;
}

export function CTASection({
  pillLabel = 'Get Started',
  heading = "Ready to get started? Here's where to begin.",
  intro = "If you're ready to start building your internal AI capability in a practical way, lets chat.",
  buttonLabel = 'Talk to Us',
  className,
  pillHasDot = true,
}: CTASectionProps) {
  return (
    <section className={`section cta-section ${className ?? ''}`.trim()}>
      <div className="section-container-wide cta-content">
        <div className={`intro-pill ${pillHasDot ? 'intro-pill-status' : ''}`.trim()}>
          {pillHasDot ? <span className="intro-pill-dot" aria-hidden="true" /> : null}
          <span>{pillLabel}</span>
        </div>

        <h2 className="section-heading">{heading}</h2>

        <p className="cta-intro">{intro}</p>

        <Button
          className="cta-button"
          variant="primary"
          onClick={() => (window.location.href = 'mailto:info@otherstuff.studio')}
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
