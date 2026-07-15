import React, { useState } from 'react';
import './ProcessTimeline.css';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery Session',
    description:
      'We start with the people, workflows, and decisions behind the problem. The goal is to find where time gets lost, what work is worth systemising, and whether there is a clear business case for using AI.',
  },
  {
    number: '02',
    title: 'Map the Workflow',
    description:
      'We map the specific workflow end to end, documenting how work currently moves through the business, where handoffs break down, and what information is needed at each stage. This becomes the blueprint for the system we build.',
  },
  {
    number: '03',
    title: 'Build the System',
    description:
      'We design and build around the workflow as it actually operates, not a theoretical version of it. That includes the data, agents, approvals, interfaces, and handoffs your team needs to make the system useful.',
  },
  {
    number: '04',
    title: 'Operate & Improve',
    description:
      'Your system runs on Wingman with full visibility through Flight Deck. Over time it learns from the knowledge in your business, improves through use, and compounds in value as your team builds on what is already working.',
  },
];

export function ProcessTimeline() {
  const [expandedStep, setExpandedStep] = useState<number>(0);

  return (
    <section className="section process-timeline-section">
      <div className="process-timeline-container">
        <div className="intro-pill fade-in">OUR PROCESS</div>

        <h2 className="process-timeline-heading fade-in fade-in-stagger-1">
          From identifying the problem to the day your team stops doing it manually.
        </h2>

        <div className="process-timeline">
          {steps.map((step, index) => {
            const isExpanded = expandedStep === index;
            const isCompleted = index < expandedStep;

            return (
              <div
                key={step.number}
                className={`process-step ${isExpanded ? 'expanded' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setExpandedStep(index)}
              >
                <div className="process-step-marker">
                  <div className="process-step-dot">
                    <span>{step.number}</span>
                  </div>
                  {index < steps.length - 1 && <div className="process-step-line" />}
                </div>

                <div className="process-step-content">
                  <h3 className="process-step-title">{step.title}</h3>
                  <div className={`process-step-description ${isExpanded ? 'visible' : ''}`}>
                    <p>{step.description}</p>
                    {step.number === '01' && (
                      <a
                        href="/contact"
                        className="process-step-cta"
                      >
                        Book a Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
