
import { useState } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import { NewsletterModal } from './NewsletterModal';
import './Hero.css';

export function HeroDraft() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero-extended">
      <div className="hero-sticky">
        <div className="hero-inner">
          <div className="hero-title-block">
            <div className="hero-logo">
              <img src="/Logo-Main-Icon.png" alt="Logo" />
            </div>
            <h1>Build practical AI capability inside your business.</h1>
            <p>
              We help SMEs figure out how to use AI in a way that actually works for people,
              <br />
              so your team moves faster and your business runs smarter.
            </p>
            <p className="hero-bridge">
              Learn how we're building internal AI capability in practice.
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

          <div
            className="podcast-card"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="podcast-card-content">
              <div className="podcast-episode">Join The Good Stuff</div>
              <div className="podcast-hosts">Weekly insights on AI for SMEs</div>
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

      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
