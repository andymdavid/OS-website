import { Button } from './Button';
import { HeroShaderBackground } from './HeroShaderBackground';
import { HomeDuplicateLogoCarousel } from './HomeDuplicateLogoCarousel';
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
                onClick={() => (window.location.href = '/contact')}
              >
                Book a Call
              </Button>
              <a href="/the-good-stuff" className="btn-secondary hero-cta-dark">
                Join The Good Stuff
              </a>
            </div>
          </div>

        </div>
        <HomeDuplicateLogoCarousel />
      </div>
    </section>
  );
}
