'use client';

import React from 'react';
import { Button } from './Button';
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

  const imageSources = {
    primary: '/WingmanScreen2.png',
    secondary: '/WingmanScreen1.png',
  };

  return (
    <section className="wingman-approach">
      <div className="wingman-top">
        <div className="intro-pill fade-in">THE SYSTEM</div>

        <h2 className="intro-heading fade-in fade-in-stagger-1">
          To make all of this practical, we built Wingman — an open-source agent
          system that helps SMEs automate real work with AI.
        </h2>

        <p className="intro-text fade-in fade-in-stagger-2">
          Wingman is an open-source environment that lets you build and run AI
          agents on real work inside your business — without code, complexity, or
          being tied to a single vendor. It’s the system we use in every session
          and workshop, and it gives small teams a simple, practical way to put AI
          to work on the things that matter most.

          <br />
          <br />
          <span className="intro-text-emphasis">
            Here are a few ways Wingman can start making a difference in your
            business.
          </span>
        </p>
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
            <Button variant="primary">Contact Us</Button>
          </div>
        </div>

        <div className="wingman-image-panel">
          <div className="wingman-image-stack">
            <div className="wingman-image-primary">
              <img src={imageSources.primary} alt="Wingman Interface primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
