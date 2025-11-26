'use client';

import React from 'react';
import { Button } from './Button';
import './FunnelSection.css';

export function FunnelSection() {
  const steps = [
    {
      number: '01',
      title: 'Step One',
      description: 'Placeholder description for step one',
    },
    {
      number: '02',
      title: 'Step Two',
      description: 'Placeholder description for step two',
    },
    {
      number: '03',
      title: 'Step Three',
      description: 'Placeholder description for step three',
    },
    {
      number: '04',
      title: 'Step Four',
      description: 'Placeholder description for step four',
    },
  ];

  return (
    <section id="services" className="section funnel-section">
      <div className="section-container-wide">
        <h3 className="section-eyebrow fade-in">HOW WE CAN HELP</h3>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          We're a venture studio and systems practice for the age of
          intelligence.
        </h2>

        <p className="funnel-intro fade-in fade-in-stagger-2">
          You know your business better than anyone. You've built the systems,
          the culture, the instincts that make it work. We're not consultants.
          We're builders and systems thinkers. Our role isn't to tell you how to
          run your business — it's to help you apply AI in ways that amplify
          what you already do best.
        </p>

        <div className="funnel-steps">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className={`funnel-step fade-in`}>
                <div className="step-number">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="funnel-arrow fade-in">→</div>
              )}
            </React.Fragment>
          ))}

          <div className="funnel-arrow fade-in">→</div>

          <div className="funnel-destination fade-in">
            <div className="destination-icon">
              <span>W</span>
            </div>
            <h4>Wingman</h4>
            <p>Your AI operating system</p>
          </div>
        </div>

        <div className="section-cta fade-in">
          <Button variant="primary">Marginal Gains Club</Button>
          <Button variant="secondary">Explore Workshops</Button>
        </div>
      </div>
    </section>
  );
}
