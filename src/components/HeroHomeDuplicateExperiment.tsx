import { Button } from './Button';
import { HeroShaderBackground } from './HeroShaderBackground';
import { HomeDuplicateLogoCarousel } from './HomeDuplicateLogoCarousel';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './IntroSection.css';
import './Hero.css';

export function HeroHomeDuplicateExperiment() {
  return (
    <section className="hero-extended">
        <div className="hero-sticky">
          <HeroShaderBackground />
          <div className="hero-inner">
            <div className="hero-title-block">
              <div className="hero-logo">
                <img src="/Logo-Main-Icon.webp" alt="Other Stuff — AI product studio in Perth, Western Australia" />
              </div>
              <div className="intro-pill hero-eyebrow">
                An AI Partner for SMEs
              </div>
              <h1 className="hero-duplicate-heading">
                We put AI to work inside your business.
              </h1>
              <p className="hero-description">
                As your Automation Partner, we set up AI agents that know your business and automate more of it, workflow by workflow. You&apos;ll see results in the first month.
              </p>
              <div className="hero-cta">
                <Button
                  variant="primary"
                  className="hero-cta-book"
                  onClick={() => window.open(CAL_DISCOVERY_URL, '_blank', 'noopener,noreferrer')}
                >
                  Book a Call
                </Button>
                <p className="hero-cta-terms">From $5k a month. One-month minimum. Cancel anytime.</p>
              </div>
            </div>

          </div>
          <HomeDuplicateLogoCarousel />
        </div>
    </section>
  );
}
