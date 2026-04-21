import React from 'react';
import { AIChatDemo } from './AIChatDemo';
import { FormProcessingDemo } from './FormProcessingDemo';
import { DataAnalysisDemo } from './DataAnalysisDemo';
import { WingmanDemo } from './WingmanDemo';
import './HomeDuplicateGridSection.css';

const cards = [
  {
    title: 'Customer Acquisition',
    description:
      'Make follow-up faster, keep outreach consistent, and reduce the amount of manual effort it takes to turn interest into qualified opportunities.',
    demo: <FormProcessingDemo />,
    image: '/grid-customer-acquisition.webp',
  },
  {
    title: 'Sales, Quoting & Proposals',
    description:
      'Reduce the time it takes to pull information together, produce proposals, and move opportunities forward without rebuilding the same work each time.',
    demo: <AIChatDemo />,
    image: '/grid-sales-quoting.webp',
  },
  {
    title: 'Finance, Billing & Inventory',
    description:
      'Surface what needs attention sooner, reduce manual handling across finance workflows, and keep a clearer picture of what is moving through the business.',
    demo: <DataAnalysisDemo />,
    image: '/grid-finance-billing.webp',
  },
  {
    title: 'Internal Knowledge',
    description:
      'Keep important process knowledge accessible, reduce dependency on a few key people, and give your agents the memory they need to do reliable work.',
    demo: <WingmanDemo />,
    image: '/grid-internal-knowledge.webp',
  },
];

export function HomeDuplicateGridSection() {
  return (
    <section className="section home-duplicate-grid-section">
      <div className="section-container-wide">
        <div className="home-duplicate-grid-intro">
          <div className="intro-pill fade-in">WHERE WE HELP</div>
          <h2 className="section-heading fade-in fade-in-stagger-1">
            Practical AI systems for the parts of your business where time goes to waste.
          </h2>
          <p className="home-duplicate-grid-subpara fade-in fade-in-stagger-2">
            We build custom AI systems around recurring business functions where manual work, slow handoffs,
            and fragmented information keep good people tied up for longer than they should be.
          </p>
        </div>

        <div className="home-duplicate-grid">
          {cards.map((card) => (
            <article key={card.title} className="home-duplicate-grid-card">
              <div className="home-duplicate-grid-copy">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
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
