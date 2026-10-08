import { BookCallContent } from './BookCallContent';
import { HeroShaderBackground } from './HeroShaderBackground';
import { HomeDuplicateLogoCarousel } from './HomeDuplicateLogoCarousel';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './IntroSection.css';
import './Hero.css';
import './AutomationPartnerHero.css';

export function AutomationPartnerHero() {
  return (
    <section className="hero-extended automation-partner-hero" id="hero">
      <div className="hero-sticky">
        <HeroShaderBackground />
        <div className="hero-inner">
          <div className="automation-partner-hero-grid">
            <div className="hero-title-block automation-partner-hero-copy">
              <div className="intro-pill hero-eyebrow">YOUR DEDICATED AUTOMATION PARTNER</div>
              <h1 className="hero-duplicate-heading">
                Grow your business without growing your headcount.
              </h1>
              <p className="hero-description">
                We work with your team to automate your processes one workflow at a time, freeing your people for the work that actually grows the business.
              </p>
              <div className="hero-cta">
                <a className="hero-cta-book book-call-button" href={CAL_DISCOVERY_URL} target="_blank" rel="noopener noreferrer">
                  <BookCallContent />
                </a>
                <p className="hero-cta-terms">From $5k a month. One-month minimum. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
        <HomeDuplicateLogoCarousel />
      </div>
    </section>
  );
}
