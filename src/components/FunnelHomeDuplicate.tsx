import React from 'react';
import './FunnelSection.css';

export function FunnelHomeDuplicate() {
  const cards = [
    {
      category: 'Automate Your Work',
      date: 'We Start Here',
      title: 'Custom AI Systems',
      description:
        "We identify the operational work costing your team the most time, build an AI system around it, and hand you something that runs.\n\nThat might be a system that handles your proposal pipeline, chases aged receivables, manages client onboarding, or keeps critical business knowledge accessible and working.\n\nEvery Sortie is scoped to a specific workflow in your business, built around how you actually work and delivered as a running system.",
      image: '/Card3.webp',
      buttonText: 'Learn More',
      buttonHref: '/marginal-gains',
    },
    {
      category: 'Run Your Agents',
      date: 'Infrastructure',
      title: 'Wingmen Suite',
      description:
        'Wingman is the operating environment your AI agents run inside.\n\nFlight Deck gives your team visibility and control. Tower holds the shared records and memory agents work from. Airspace structures the knowledge your business has built.\n\nTogether they give your agents the context to do reliable work — and your team the oversight to stay in control of it.',
      image: '/wingmen-suite-card.webp',
      buttonText: 'Learn More',
      buttonHref: '/#system',
    },
    {
      category: 'Grow Your Capability',
      date: 'We Start Here',
      title: 'AI Workshops',
      description:
        "Speedrun is a private hands-on AI workshop for business teams that want to build practical business tools and workflows.\n\nIt is delivered in two formats - Speedrun and Speedrun Applied - which share the same approach but differ in scope and depth.\n\nAcross both formats, participants work hands-on with AI agents to build real working business tools inside a focused team workshop.",
      image: '/ai-workshops-card.webp',
      buttonText: 'Learn More',
      buttonHref: '/speedrun',
    },
  ];

  return (
    <section id="services" className="section funnel-section">
      <div className="section-container-wide">
        <div className="funnel-pill fade-in">HOW WE HELP</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          We build the systems, deliver the infrastructure, and train your team to build on what&apos;s running.
        </h2>

        <p className="funnel-intro fade-in fade-in-stagger-2">
          We build custom AI systems for workflows in your business. Wingmen Suite gives
          your agents the infrastructure to run reliably. And Speedrun helps your team
          understand and build on what&apos;s been delivered.
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
                      className="funnel-card-button"
                      href={card.buttonHref}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
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
