'use client';

import React from 'react';
import { Button } from './Button';
import './FunnelSection.css';

export function FunnelSection() {
  const cards = [
    {
      category: 'CATEGORY',
      date: 'PLACEHOLDER DATE',
      title: 'Card One Title Goes Here',
      image: '/Hero-Background.png', // Placeholder - replace with actual image
    },
    {
      category: 'CATEGORY',
      date: 'PLACEHOLDER DATE',
      title: 'Card Two Title Goes Here',
      image: '/Hero-Background.png', // Placeholder - replace with actual image
    },
    {
      category: 'CATEGORY',
      date: 'PLACEHOLDER DATE',
      title: 'Card Three Title Goes Here',
      image: '/Hero-Background.png', // Placeholder - replace with actual image
    },
  ];

  return (
    <section id="services" className="section funnel-section">
      <div className="section-container-wide">
        <div className="funnel-pill fade-in">HOW WE CAN HELP</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          We're a venture studio and systems practice for the age of
          intelligence.
        </h2>

        <p className="funnel-intro fade-in fade-in-stagger-2">
          You know your business better than anyone. You've built the systems,
          the culture, the instincts that make it work. We're not consultants.
          We're builders and systems thinkers. Our role isn't to tell you how to
          run your business — it's to help you apply AI in ways that amplify
          what you already do best.
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
                  <h4>{card.title}</h4>
                  <button className="funnel-card-button">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
