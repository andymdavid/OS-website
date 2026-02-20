
import React from 'react';
import { Button } from './Button';
import './FunnelSection.css';

export function FunnelSection() {
  const cards = [
    {
      category: 'Workshops',
      date: 'We Start Here',
      title: 'Speedrun',
      description:
        "Speedrun is a hands-on workshop format designed to help businesses learn how to work with AI by building practical business tools and workflows.\n\nIt is delivered in two formats - Speedrun and Speedrun Applied - which share the same approach but differ in scope and depth.\n\nAcross both formats, participants work hands-on with AI agents (including Wingman, Claude Code, Codex, and Goose) to build real, working business tools.",
      image: '/Card1.png',
      buttonText: 'Start Here',
      buttonHref: 'https://events.humanitix.com/touch-don-t-look-how-to-actually-build-things-with-ai',
    },
    {
      category: 'Develop Your AI Champions',
      date: 'Where We Go Next',
      title: 'Marginal Gains Club',
      description:
        'Marginal Gains is a community for the key people in your business who we develop and support to become your AI Champions.\n\nWe guide them on how to use the tools, helping them adapt as the technology evolves, assist with rapid prototyping of new software and workflows for use in the business & we provide access to Wingman.\n\nMarginal Gains is designed so your AI Champions become the evangelists that help drive strategy, adoption and implementation from within.',
      image: '/Card2.png',
      buttonText: 'Learn More',
      buttonHref: '#',
    },
    {
      category: 'Automate Your Work',
      date: 'Infrastructure',
      title: 'Wingman',
      description:
        'A community of SME business leaders who keep building together. Monthly online sessions and in-person events. Each month the group votes on a real problem facing their business, then builds a solution everyone can use.\n\nFor graduates of Speedrun only.',
      image: '/Card3.png',
      buttonText: 'Learn More',
      buttonHref: '#',
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
          {cards.map((card, index) => (
            <div key={index} className="funnel-card fade-in">
              <div className="funnel-card-image">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="funnel-card-overlay">
                <div className="funnel-card-header">
                  <span className="funnel-card-category">{card.category}</span>
                  <span className="funnel-card-date">{card.date}</span>
                </div>
              <div className="funnel-card-footer">
                <div className="funnel-card-title-block">
                  <h4>{card.title}</h4>
                  <a
                    className={`funnel-card-button ${index > 0 ? 'funnel-card-button-dark' : ''}`}
                    href={card.buttonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.buttonText}
                  </a>
                </div>
                <p className="funnel-card-description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
