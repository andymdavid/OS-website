import React from 'react';
import { InventoryDemo } from './InventoryDemo';
import { PreMeetingBriefingsDemo } from './PreMeetingBriefingsDemo';
import { ProjectStatusReportsDemo } from './ProjectStatusReportsDemo';
import { ProposalBuilderDemo } from './ProposalBuilderDemo';
import './HomeDuplicateGridSection.css';
import './MGGridSection.css';

const cards = [
  {
    tag: 'FINANCE & INVENTORY',
    title: 'Inventory Intelligence',
    description:
      'Stock levels, sales velocity, and reorder points monitored continuously and surfaced before they become urgent. Slow-moving stock gets flagged before it ties up capital. Reorder recommendations are based on actual demand, not spreadsheets. Less money sitting on shelves. Fewer stockouts on what actually sells.',
    demo: <InventoryDemo />,
    image: '/grid-finance-billing.webp',
  },
  {
    tag: 'SALES & QUOTING',
    title: 'Proposal Builder',
    description:
      'Pulls relevant past work, pricing, and capability evidence together into a structured draft when a new opportunity comes in. Your team shapes and sends it rather than building it from scratch. Proposals that reflect the full depth of what your business has delivered, without the hours of assembly.',
    demo: <ProposalBuilderDemo />,
    image: '/grid-sales-quoting.webp',
  },
  {
    tag: 'INTERNAL KNOWLEDGE',
    title: 'Pre-Meeting Briefings',
    description:
      'Before every client meeting, the system pulls together recent interactions, open issues, and anything flagged since the last conversation into a structured briefing. Your team arrives prepared without spending time piecing it together from emails and notes.',
    demo: <PreMeetingBriefingsDemo />,
    image: '/grid-internal-knowledge.webp',
  },
  {
    tag: 'REPORTING',
    title: 'Project Status Reports',
    description:
      'Pulls current job status, recent progress, and any issues requiring attention from across your project data into a structured report ready to review and send. Status updates that currently take hours to compile get done in minutes, and the picture is current every time.',
    demo: <ProjectStatusReportsDemo />,
    image: '/grid-customer-acquisition.webp',
  },
];

export function MGGridSection() {
  return (
    <section id="what-we-build" className="section home-duplicate-grid-section">
      <div className="section-container-wide">
        <div className="home-duplicate-grid-intro">
          <div className="intro-pill fade-in">WHAT WE BUILD</div>
          <h2 className="section-heading fade-in fade-in-stagger-1">
            Custom AI systems built around the workflows that cost your business the most time.
          </h2>
          <p className="home-duplicate-grid-subpara fade-in fade-in-stagger-2">
            Every system is scoped to a specific operational workflow inside your business. Here are the kinds of problems we solve.
          </p>
        </div>

        <div className="home-duplicate-grid">
          {cards.map((card) => (
            <article key={card.title} className="home-duplicate-grid-card">
              <div className="home-duplicate-grid-copy">
                <span className="mg-grid-tag">{card.tag}</span>
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
