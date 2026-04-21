import React from 'react';
import './ExamplesSection.css';

const examples = [
  {
    tag: 'CUSTOMER ACQUISITION',
    title: 'Prospect to Pipeline',
    description:
      'Identifies prospects, runs outreach, and qualifies responses automatically — so your pipeline keeps moving without someone manually working through it every day.',
  },
  {
    tag: 'SALES & QUOTING',
    title: 'Quoting System',
    description:
      'Pulls together job history, past pricing, and supplier data to produce accurate quote drafts in minutes. Less time rebuilding the same work, fewer details missed, more quotes out the door.',
  },
  {
    tag: 'FINANCE & BILLING',
    title: 'Collections Agent',
    description:
      'Monitors payment status, generates chase communications at the right intervals, and surfaces what\'s owed without anyone having to pull it together manually. Nothing slips through unnoticed.',
  },
  {
    tag: 'INTERNAL KNOWLEDGE',
    title: 'Company Memory',
    description:
      'Briefs your team before client meetings, answers operational questions from your business knowledge, and ensures critical process knowledge stays in the business when people move on.',
  },
];

export function ExamplesSection() {
  return (
    <section className="section examples-section">
      <div className="examples-container">
        <div className="intro-pill fade-in">EXAMPLES</div>

        <h2 className="examples-heading fade-in fade-in-stagger-1">
          The kinds of systems we build.
        </h2>

        <p className="examples-subpara fade-in fade-in-stagger-2">
          Every engagement starts with understanding your specific workflows. These are examples of
          what comes out the other side — built around real operational problems across the businesses
          we work with.
        </p>

        <div className="examples-grid">
          {examples.map((example) => (
            <div key={example.title} className="examples-card">
              <div className="examples-card-tag">{example.tag}</div>
              <h3 className="examples-card-title">{example.title}</h3>
              <p className="examples-card-description">{example.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
