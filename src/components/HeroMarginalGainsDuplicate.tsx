import { Button } from './Button';
import './Hero.css';

export function HeroMarginalGainsDuplicate() {
  return (
    <section className="hero-extended">
      <div className="hero-sticky">
        <div className="hero-inner">
          <div className="hero-title-block">
            <div className="hero-logo">
              <img src="/Logo-Main-Icon.webp" alt="Other Stuff — AI product studio in Perth, Western Australia" />
            </div>
            <h1 className="hero-duplicate-heading">We build AI systems that take the{' '}<br />repetitive work off your team.</h1>
            <p>
              Purpose-built for the workflows in your business costing you the most time, money and energy. Scoped to your unique needs, delivered as a working system, and built on infrastructure you own.
            </p>
            <div className="hero-cta">
              <Button
                variant="primary"
                className="hero-cta-book"
                onClick={() => (window.location.href = '/contact')}
              >
                Book a Free AI Audit
              </Button>
              <a href="/ai-audit" className="btn-secondary hero-cta-dark">
                Learn about the AI Audit
              </a>
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
        </div>
      </div>
    </section>
  );
}
