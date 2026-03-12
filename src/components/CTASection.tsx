
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
}

export function CTASection({
  pillLabel = 'Get Started',
  heading = "Ready to get started? Here's where to begin.",
  intro = "If you're ready to start building your internal AI capability in a practical way, lets chat.",
  buttonLabel = 'Talk to Us',
  className,
}: CTASectionProps) {
  const renderedHeading = heading === "Ready to get started? Here's where to begin."
    ? "Ready to get started?\nHere's where to begin."
    : heading;

  return (
    <section className={`section cta-section ${className ?? ''}`.trim()}>
      <div className="section-container-wide cta-content">
        <div className="intro-pill">{pillLabel}</div>

        <h2 className="section-heading cta-heading">
          {renderedHeading.split('\n').map((line, index) => (
            <React.Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </React.Fragment>
          ))}
        </h2>

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
