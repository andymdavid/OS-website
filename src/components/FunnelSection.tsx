
import React from 'react';
import { Button } from './Button';
import './FunnelSection.css';

export function FunnelSection() {
  const cards = [
    {
      category: '90 Minute Hands-On Session',
      date: 'We Start Here',
      title: "Touch, Don't Look.",
      description:
        "Build a working mobile app in an hour. No slides, no technical background, just you, your laptop, and the tools. You'll walk away with something you made yourself and a completely different sense of what's possible.\n\nFor business leaders who think they're not technical.",
      image: '/Card1.png',
    },
    {
      category: 'Full-Day Workshop',
      date: 'Where We Go Next',
      title: 'Speedrun.',
      description:
        'Build a complete workflow in five hours. A custom CRM, a website to launch it, an agent that writes content for your site, and another agent that finds leads and feeds them into your new CRM. Everything connected in a loop.\n\nLearn how AI handles entire processes, not just individual tasks.\n\nFor business leaders ready to go deeper.',
      image: '/Card2.png',
    },
    {
      category: 'In-Person Community',
      date: 'For Speedrun Graduates',
      title: 'Marginal Gains Club.',
      description:
        'A community of SME business leaders who keep building together. Monthly online sessions and in-person events. Each month the group votes on a real problem facing their business, then builds a solution everyone can use.\n\nFor graduates of Speedrun only.',
      image: '/Card3.png',
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
                  {index === 0 && (
                    <a
                      className="funnel-card-button"
                      href="https://events.humanitix.com/touch-don-t-look-how-to-actually-build-things-with-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Here
                    </a>
                  )}
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
