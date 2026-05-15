import React from 'react';
import { Button } from './Button';
import './IntroSection.css';
import './CTASection.css';

interface CTAHomeDuplicateProps {
  pillLabel?: string;
  heading?: string;
  intro?: string;
  buttonLabel?: string;
  className?: string;
}

export function CTAHomeDuplicate({
  pillLabel = 'Get Started',
  heading = "Let's talk about what's slowing your business down.",
  intro = "Book a free intro call. We'll look at where time is going and whether a custom AI system makes sense for your business.",
  buttonLabel = 'Book a Free AI Audit',
  className,
}: CTAHomeDuplicateProps) {
  const renderedHeading = heading;

  return (
    <section className={`section cta-section cta-section-home ${className ?? ''}`.trim()}>
      <div className="cta-card">
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
          className="cta-button cta-button-orange"
          variant="primary"
          onClick={() => (window.location.href = '/contact')}
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
