'use client';

import React from 'react';
import { Button } from './Button';
import './FunnelSection.css';

export function FunnelSection() {
  const cards = [
    {
      category: '90 Minute Hands-On Session',
      date: 'We Start Here',
      title: "Touch, Don't Look.",
      image: '/Card1.png',
    },
    {
      category: 'Full-Day Workshop',
      date: 'Where We Go Next',
      title: 'Speedrun.',
      image: '/Card2.png',
    },
    {
      category: 'In-Person Community',
      date: 'For Speedrun Graduates',
      title: 'Marginal Gains Club.',
      image: '/Card3.png',
    },
  ];

  return (
    <section id="services" className="section funnel-section">
      <div className="section-container-wide">
        <div className="funnel-pill fade-in">HOW WE CAN HELP</div>

        <h2 className="section-heading fade-in fade-in-stagger-1">
          We help you make sense of AI by getting you hands-on and building
          things that matter to your business.
        </h2>

        <p className="funnel-intro fade-in fade-in-stagger-2">
          You know your business better than anyone. Our job isn’t to tell you
          how to run it — it’s to help you apply AI in practical ways that
          support what already works. We teach you to build by building
          together, not by presenting, and everything we do is designed to get
          you hands-on as quickly as possible.
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
                  {index === 0 && (
                    <button className="funnel-card-button">Start Here</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
