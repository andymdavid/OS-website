import { BookCallContent } from './BookCallContent';
import { MonthlyImprovementCycle } from './MonthlyImprovementCycle';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './MGHowItWorksSection.css';

export function MGHowItWorksSection() {
  return (
    <section id="how-it-works" className="section mg-how-it-works-section">
      <div className="section-container-wide">
        <header className="mg-how-it-works-hero mg-how-it-works-hero-centered">
          <div className="intro-pill fade-in">WHAT IS A MONTHLY IMPROVEMENT CYCLE</div>
          <h2 className="section-heading fade-in fade-in-stagger-1">
            We turn your time-consuming processes into simpler, repeatable ways of working.
          </h2>
          <p className="mg-how-it-works-subpara fade-in fade-in-stagger-2">
            Together with your team, we agree which processes are worth automating first. We remove the manual work, the time-consuming analysis and the copying of information between systems, and put the automation into use quickly.
          </p>
          <a
            className="mg-how-it-works-cta book-call-button fade-in fade-in-stagger-3"
            href={CAL_DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookCallContent />
          </a>
        </header>
        <MonthlyImprovementCycle />
      </div>
    </section>
  );
}
