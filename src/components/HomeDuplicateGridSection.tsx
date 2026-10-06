import React from 'react';
import { AIChatDemo } from './AIChatDemo';
import { FormProcessingDemo } from './FormProcessingDemo';
import { DataAnalysisDemo } from './DataAnalysisDemo';
import { WingmanDemo } from './WingmanDemo';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './HomeDuplicateGridSection.css';

const cards = [
  {
    title: 'Marketing',
    description:
      'Keep your marketing running consistently, even when the team is flat out on client work.',
    tags: ['Lead capture', 'Outreach', 'Campaign reporting'],
    demo: <FormProcessingDemo />,
    image: '/grid-customer-acquisition.webp',
  },
  {
    title: 'Sales',
    description:
      'Handle the prep, paperwork and follow-up around every deal, so your people spend their time with clients.',
    tags: ['Prospect research', 'Proposals and quotes', 'Follow-up'],
    demo: <AIChatDemo />,
    image: '/grid-sales-quoting.webp',
  },
  {
    title: 'Operations',
    description:
      "Take care of the updates, handoffs and chasing that keep jobs moving, so it doesn't all depend on a few key people.",
    tags: ['Client onboarding', 'Project updates', 'Handovers'],
    demo: <WingmanDemo />,
    image: '/grid-internal-knowledge.webp',
  },
  {
    title: 'Finance',
    description:
      "Keep billing, collections and reporting up to date, so you see cash and margin while there's still time to act.",
    tags: ['Invoicing', 'Margin reviews', 'Month-end reporting'],
    demo: <DataAnalysisDemo />,
    image: '/grid-finance-billing.webp',
  },
];

export function HomeDuplicateGridSection() {
  return (
    <section className="section home-duplicate-grid-section">
      <div className="section-container-wide">
        <div className="home-duplicate-grid-intro">
          <div className="home-duplicate-grid-heading">
            <div className="intro-pill fade-in">USE CASES</div>
            <h2 className="section-heading fade-in fade-in-stagger-1">
              AI that works across your business.
            </h2>
          </div>

          <div className="home-duplicate-grid-intro-copy">
            <p className="home-duplicate-grid-subpara fade-in fade-in-stagger-2">
              Every part of a business has work that eats time and slows things down. These are some
              of the areas where our clients feel it most.
            </p>

            <a
              className="home-duplicate-grid-cta fade-in fade-in-stagger-3"
              href={CAL_DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </a>
          </div>
        </div>

        <div className="home-duplicate-grid">
          {cards.map((card) => (
            <article key={card.title} className="home-duplicate-grid-card">
              <div className="home-duplicate-grid-copy">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="home-duplicate-grid-tags" aria-label={`${card.title} examples`}>
                  {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div
                className="home-duplicate-grid-visual"
                style={{ '--card-bg': `url('${card.image}')` } as React.CSSProperties}
              >
                {card.demo}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
