'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import './Hero.css';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <section className={`hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-content">
        <div className="hero-icon">
          <video autoPlay loop muted playsInline width="35" height="23">
            <source src="/Logo-Icon.mp4" type="video/mp4" />
          </video>
        </div>

        <h1 className="hero-title">
          Artificial Intelligence is a<br />
          new dawn for <em>human flourishing</em>
        </h1>

        <p className="hero-subtitle">
          We help SME's identify <strong>Optimal Human Placement™</strong>, where
          humans and AI do their best work—together—so you grow faster, leaner,
          and smarter.
        </p>

        <div className="hero-cta">
          <Button variant="primary">Marginal Gains Club</Button>
          <Button variant="secondary">Explore Workshops</Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14m0 0l7-7m-7 7l-7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
