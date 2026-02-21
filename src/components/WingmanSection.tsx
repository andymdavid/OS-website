
import React from 'react';
import { Button } from './Button';
import { WingmanDemo } from './WingmanDemo';
import './IntroSection.css';
import './WingmanSection.css';

export function WingmanSection() {
  const principles = [
    {
      title: 'Automate Real Work',
      description:
        'Offload the repetitive, routine tasks that drain time — from admin and reporting to everyday operational workflows.',
    },
    {
      title: 'Build Your Own Tools',
      description:
        'Create simple internal tools or micro-apps that replace messy spreadsheets and manual processes — and edit them with AI as your needs evolve.',
    },
    {
      title: 'Support Human Teams',
      description:
        'Give your people helpful agents that draft, summarise, organise, and follow up — accelerating work without replacing the judgment that matters.',
    },
    {
      title: 'Orchestrate Your Business',
      description:
        'Link people, tools, and tasks into clean workflows so your business runs smoothly end-to-end — without needing technical expertise.',
    },
  ];

  return (
    <section id="system" className="wingman-approach">
      <div className="wingman-top">
        <div className="intro-pill fade-in">THE SYSTEM</div>

        <h2 className="intro-heading fade-in fade-in-stagger-1">
          Introducing Wingman - an agent management system - that helps SMEs automate real work with AI.
        </h2>

        <p className="intro-text fade-in fade-in-stagger-2">
          Wingman lets you build and run AI agents on real work inside your business - without code, complexity, or being tied to a single vendor. Participants use Wingman in every workshop, and it gives teams a simple, practical way to put AI to work practically.
        </p>

        <Button className="followup-cta fade-in fade-in-stagger-3">
          Learn More
        </Button>
      </div>

      <div className="wingman-bottom">
        <div className="wingman-steps">
          {principles.map((step) => (
            <div className="wingman-step" key={step.title}>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}

          <div className="wingman-contact-card">
            <div>
              <div className="wingman-contact-heading">
                Want help bringing Wingman into your business?
              </div>
              <p>We’re always happy to advise on setup and best practice.</p>
            </div>
            <Button
              variant="primary"
              onClick={() => (window.location.href = 'mailto:info@otherstuff.studio')}
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="wingman-demo-panel">
          <WingmanDemo />
        </div>
      </div>
    </section>
  );
}
