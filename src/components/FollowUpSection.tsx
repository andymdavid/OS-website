
import React from 'react';
import { Button } from './Button';
import './FollowUpSection.css';

const STEPS = [
  {
    week: 'Principle 1',
    title: 'Hands-on from the start',
    description:
      'We teach by building together, not by presenting. You get practical experience immediately so AI feels usable, not abstract.',
  },
  {
    week: 'Principle 2',
    title: 'Grounded in real work',
    description:
      'Everything happens inside the context of your actual operations — the systems, tasks, and workflows your team already uses.',
  },
  {
    week: 'Principle 3',
    title: 'People + AI, side by side',
    description:
      'We focus on ways AI can support your team’s strengths, not replace them. The goal is better decisions, clearer work, and less friction.',
  },
  {
    week: 'Principle 4',
    title: 'Momentum, not theory',
    description:
      'We move quickly in small, achievable steps so your team sees progress straight away. No overthinking, no overhauls — just steady capability building.',
  },
];

export function FollowUpSection() {
  return (
    <section id="approach" className="section followup-approach">
      <div className="section-container-wide intro-draft-grid followup-top-grid">
        <div className="intro-draft-left">
          <div className="intro-pill fade-in">OUR APPROACH</div>

          <h2 className="section-heading fade-in fade-in-stagger-1">
            We believe the best way to learn AI is to build with it on real
            use-cases — inside your business, with your people.
          </h2>

          <p className="intro-text fade-in fade-in-stagger-2">
            You don't learn AI by watching someone talk about it — you learn it by
            building with it on the real work your team already does. Everything we
            teach is hands-on, practical, and grounded in the day-to-day of small
            business.
          </p>

          <p className="intro-text fade-in fade-in-stagger-3">
            We focus on showing how people and AI can work side by side in ways
            that make your existing systems stronger, not more complicated.
          </p>

          <Button className="followup-cta fade-in fade-in-stagger-4">
            About Us
          </Button>
        </div>
        <div className="intro-draft-right"></div>
      </div>

      <div className="followup-bottom">
        <div className="followup-image-panel">
          <img src="/OurApproach.jpeg" alt="Workshop" />
        </div>

        <div className="followup-steps">
          {STEPS.map((step) => (
            <div className="followup-step" key={step.title}>
              <div className="followup-step-meta">{step.week}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
