
import React from 'react';
import './FunnelSection.css';

export function FunnelSection() {
  const cards = [
    {
      category: 'Build Internal Capability',
      date: 'We Start Here',
      title: 'Build Internal AI Capability',
      description:
        "Speedrun is a private hands-on AI workshop for business teams that want to build practical business tools and workflows.\n\nIt is delivered in two formats - Speedrun and Speedrun Applied - which share the same approach but differ in scope and depth.\n\nAcross both formats, participants work hands-on with AI agents to build real working business tools inside a focused team workshop.",
      image: '/Card1.webp',
      buttonText: 'Explore Speedrun',
      buttonHref: '/speedrun',
    },
    {
      category: 'Develop Your AI Champions',
      date: 'Where We Go Next',
      title: 'Develop Your AI Champions',
      description:
        'Marginal Gains is an ongoing AI capability program for the key people in your business who we support to become your internal AI champions.\n\nWe guide them on how to use the tools, adapt as the technology evolves, prototype new software and workflows, and apply AI to real business work over time.\n\nMarginal Gains is designed so AI capability grows from within the business rather than being outsourced.',
      image: '/Card2.webp',
      buttonText: 'Explore Marginal Gains',
      buttonHref: '/marginal-gains',
    },
    {
      category: 'Automate Your Work',
      date: 'Infrastructure',
      title: 'Automate Your Work with AI',
      description:
        "Wingman is our AI agent management system, designed to bring AI automation into SME's without adding technical complexity.\n\nWhere Speedrun and Marginal Gains focus on building understanding and internal capability, Wingman provides the infrastructure layer that allows that capability to become operational systems.\n\nIt moves beyond using AI as an assistive drafting tool and instead deploy agents into real world processes where work is coordinated, scheduled, and progressed with reduced manual oversight.",
      image: '/Card3.webp',
      buttonText: 'Learn More',
      buttonHref: '/#system',
    },
  ];

  return (
    <section id="services" className="section funnel-section">
      <div className="section-container-wide">
        <div className="funnel-pill fade-in">HOW WE CAN HELP</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          We help you make sense of AI by getting you hands-on with it inside
          your business.
        </h2>

        <p className="funnel-intro fade-in fade-in-stagger-2">
          You know your business better than anyone. Our job isn't to tell you
          how to run it - it's to help you apply AI in practical ways that
          support what already works. Here's how.
        </p>

        <div className="funnel-cards">
          {cards.map((card, index) => {
            const isExternal = card.buttonHref.startsWith('http');

            return (
              <div key={index} className="funnel-card fade-in">
                <div className="funnel-card-image">
                  <img src={card.image} alt={card.title} />
                </div>
                <div className="funnel-card-overlay">
                  <div className="funnel-card-header">
                    <span className="funnel-card-category">{card.category}</span>
                  </div>
                  <div className="funnel-card-footer">
                    <div className="funnel-card-title-block">
                      <div className="funnel-card-title-row">
                        <h4>{card.title}</h4>
                      </div>
                      <div className="funnel-card-title-divider" aria-hidden="true" />
                    </div>
                    <p className="funnel-card-description">{card.description}</p>
                    <a
                      className={`funnel-card-button ${index > 0 ? 'funnel-card-button-dark' : ''}`}
                      href={card.buttonHref}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={card.buttonText}
                    >
                      {card.buttonText}
                    </a>
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
