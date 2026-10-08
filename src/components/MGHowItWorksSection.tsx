import { useEffect, useState } from 'react';
import { BookCallContent } from './BookCallContent';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './MGHowItWorksSection.css';

const steps = [
  {
    title: 'Agree what to automate.',
    description:
      'We spend two mornings with the people who do the work, seeing how it\'s done today. Together we agree which workflow to automate first.',
  },
  {
    title: 'Build and test it.',
    description:
      'We spend the rest of that week building and testing the automation, so it\'s working by Friday.',
  },
  {
    title: 'Put it to work.',
    description:
      'Your team uses it day to day. We refine it as feedback comes in and anything unexpected turns up.',
  },
  {
    title: 'Choose what\'s next.',
    description:
      'We look at what\'s working and agree the next workflow to automate from your backlog. Then the cycle starts again.',
  },
];

export function MGHowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setTimeout(() => {
      setActiveStep((current) => (current + 1) % steps.length);
      setCycleKey((current) => current + 1);
    }, 9000);

    return () => window.clearTimeout(timer);
  }, [activeStep, cycleKey]);

  const selectStep = (index: number) => {
    setActiveStep(index);
    setCycleKey((current) => current + 1);
  };

  return (
    <section id="how-it-works" className="section mg-how-it-works-section">
      <div className="section-container-wide">
        <div className="mg-how-it-works-layout">
          <div className="mg-how-it-works-content">
            <header className="mg-how-it-works-hero">
              <div className="intro-pill fade-in">HOW IT WORKS</div>
              <h2 className="section-heading fade-in fade-in-stagger-1">
                We work alongside your team, one improvement at a time.
              </h2>
              <p className="mg-how-it-works-subpara fade-in fade-in-stagger-2">
                Every month follows the same rhythm, so you always know what&apos;s being worked on, what&apos;s already running and what&apos;s next.
              </p>
              <a
                className="mg-how-it-works-cta book-call-button fade-in fade-in-stagger-3"
                href={CAL_DISCOVERY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookCallContent />
              </a>
            </header>

            <div className="mg-how-it-works-accordion">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const panelId = `automation-step-${index + 1}`;

                return (
                  <article className={`mg-how-it-works-step ${isActive ? 'is-active' : ''}`} key={step.title}>
                    {isActive && (
                      <span className="mg-how-it-works-progress" key={cycleKey} aria-hidden="true" />
                    )}
                    <button
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                    >
                      <span className="mg-how-it-works-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="mg-how-it-works-title">{step.title}</span>
                      <span className="mg-how-it-works-toggle" aria-hidden="true">{isActive ? '−' : '+'}</span>
                    </button>
                    <div className="mg-how-it-works-panel" id={panelId} aria-hidden={!isActive}>
                      <div>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mg-how-it-works-placeholder">
            <img src="/grid-internal-knowledge.webp" alt="Placeholder for the monthly automation cycle visual" />
          </div>
        </div>
      </div>
    </section>
  );
}
