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
      'Stock levels and sales are tracked continuously, so slow movers and low stock are flagged early. Reorders are based on actual demand, not a spreadsheet. Less cash on shelves, fewer stockouts.',
    demo: <InventoryDemo />,
    image: '/grid-finance-billing.webp',
  },
  {
    tag: 'SALES & QUOTING',
    title: 'Proposal Builder',
    description:
      'When a new opportunity comes in, past work, pricing and case studies are pulled into a structured draft. Your team shapes and sends it instead of starting from scratch. Nothing useful gets forgotten.',
    demo: <ProposalBuilderDemo />,
    image: '/grid-sales-quoting.webp',
  },
  {
    tag: 'CLIENT SERVICE',
    title: 'Pre-Meeting Briefings',
    description:
      'Before each client meeting, recent conversations, open issues and new flags are pulled into one brief. Your team arrives prepared without digging through emails. Clients notice when you remember everything.',
    demo: <PreMeetingBriefingsDemo />,
    image: '/grid-internal-knowledge.webp',
  },
  {
    tag: 'REPORTING',
    title: 'Project Status Reports',
    description:
      'Project status, progress and issues are pulled from your project data into a report ready to send. Your team reviews it instead of compiling it. Every update reflects where things stand today.',
    demo: <ProjectStatusReportsDemo />,
    image: '/grid-customer-acquisition.webp',
  },
];

export function MGGridSection() {
  return (
    <section id="what-we-build" className="section home-duplicate-grid-section">
      <div className="section-container-wide">
        <div className="home-duplicate-grid-intro">
          <div className="intro-pill fade-in">WHAT WE AUTOMATE</div>
          <h2 className="section-heading fade-in fade-in-stagger-1">
            Automation built around the processes costing your team the most time and money.
          </h2>
          <p className="home-duplicate-grid-subpara fade-in fade-in-stagger-2">
            Each month, we start with the work where automation will make the clearest commercial difference. Examples include:
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
