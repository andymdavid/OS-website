'use client';

import { Button } from './Button';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero-extended">
      <div className="hero-sticky">
        <div className="hero-inner">
          <div className="hero-title-block">
            <h1>
              Artificial Intelligence is a <br />
              new dawn for <em>human flourishing</em>
            </h1>
            <p>
              We help SME's identify <strong>Optimal Human Placement™</strong>, where humans and AI do
              their best work—together—so you grow faster, leaner, and smarter.
            </p>
            <div className="hero-cta">
              <Button variant="primary">Marginal Gains Club</Button>
              <Button variant="secondary">Explore Workshops</Button>
            </div>
          </div>

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

          <div className="podcast-card">
            <div className="podcast-card-content">
              <div className="podcast-episode">Episode 32 - Stewarding SME's and AI</div>
              <div className="podcast-hosts">Pete & Andy with Bill Withers & Gabe Enslin</div>
            </div>
            <div className="podcast-card-footer">
              <span>THE GOOD STUFF</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14m0 0l-7-7m7 7l-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
