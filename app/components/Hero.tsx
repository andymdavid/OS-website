'use client';

import { EmailCaptureForm } from './EmailCaptureForm';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero-extended">
      <div className="hero-sticky">
        <div className="hero-inner">
          <div className="hero-title-block">
            <div className="hero-logo">
              <img src="/Logo-Main-Icon.png" alt="Logo" />
            </div>
            <h1>You can just build with AI</h1>
            <p>
              We help SMEs figure out how to use AI in a way that actually works for people,
              <br />
              so your team moves faster and your business runs smarter.
            </p>
            <p className="hero-bridge">
              We share what we're building every week.
            </p>
            <div className="hero-cta">
              <EmailCaptureForm
                variant="inline"
                placeholder="Enter your email"
                buttonText="Join The Good Stuff"
              />
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

          <a
            className="podcast-card"
            href="https://youtu.be/7NIW9uWyiEU?si=38nxIqHMtnasSTfm"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          </a>
        </div>
      </div>
    </section>
  );
}
