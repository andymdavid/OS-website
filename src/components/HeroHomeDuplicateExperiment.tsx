import { useState } from 'react';
import { Button } from './Button';
import { HeroShaderBackground } from './HeroShaderBackground';
import { HomeDuplicateLogoCarousel } from './HomeDuplicateLogoCarousel';
import { NewsletterModal } from './NewsletterModal';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './Hero.css';

export function HeroHomeDuplicateExperiment() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <>
      <section className="hero-extended">
        <div className="hero-sticky">
          <HeroShaderBackground />
          <div className="hero-inner">
            <div className="hero-title-block">
              <div className="hero-logo">
                <img src="/Logo-Main-Icon.webp" alt="Other Stuff — AI product studio in Perth, Western Australia" />
              </div>
              <h1 className="hero-duplicate-heading">
                An AI Partner for SME’s that want to
                <br />
                {' '}
                <span className="hero-heading-metrics">▲ margins, ▲ capital, and ▼ risk.</span>
              </h1>
              <p>
                We turn your core workflows into practical AI systems that compound team output and drive growth.
              </p>
              <div className="hero-cta">
                <Button
                  variant="primary"
                  className="hero-cta-book"
                  onClick={() => window.open(CAL_DISCOVERY_URL, '_blank', 'noopener,noreferrer')}
                >
                  Book a Call
                </Button>
                <button
                  type="button"
                  className="btn-secondary hero-cta-dark"
                  onClick={() => setIsNewsletterOpen(true)}
                >
                  Join The Good Stuff
                </button>
              </div>
            </div>

          </div>
          <HomeDuplicateLogoCarousel />
        </div>
      </section>

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        pill="THE GOOD STUFF"
        heading="Get our newsletter for businesses exploring how AI can improve margin, free up capital, and reduce risk."
        description="The Good Stuff is our newsletter on how AI is changing the way SMEs work, what’s practical, and how we approach the problems we solve."
        buttonText="Join The Good Stuff"
      />
    </>
  );
}
