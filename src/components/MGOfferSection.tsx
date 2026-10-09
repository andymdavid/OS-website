import { BookCallContent } from './BookCallContent';
import { FunnelOfferCards } from './FunnelHomeDuplicate';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './MGOfferSection.css';

const improvementCards = [
  {
    category: '01.',
    title: 'Monthly Improvement Cycle',
    description: 'Our Automation Partner Retainer runs in monthly cycles. Each month combines a concentrated week of identifying and delivering improvements with ongoing feedback and refinement over the remaining weeks. Together, we agree on priorities and decide where to focus our efforts.',
    image: '/automation-improvement-loop.webp',
    imageAlt: 'A single automation improvement loop',
  },
  {
    category: '02.',
    title: 'Improvement Loop',
    description: 'Each improvement loop begins with two mornings on site, working with your key people to identify pain points and agree on the automations to tackle. We spend the remainder of the first week building, configuring and testing, with the agreed changes working by Friday.',
    image: '/automation-multiple-loops.webp',
    imageAlt: 'Multiple automation improvement loops operating together',
  },
  {
    category: '03.',
    title: 'Multiple Improvement Loops',
    description: "Once delivered, automations become part of your team's day-to-day work. Over the following weeks, we gather feedback and refine them as needed. Depending on your priorities and the scope of work agreed, you can focus on a single improvement or have several improvements operating and evolving alongside one another.",
    image: '/automation-monthly-cycle.webp',
    imageAlt: 'Monthly automation improvement cycle',
  },
] as const;

export function MGOfferSection() {
  return (
    <div className="os-home-duplicate">
      <section id="automation-options" className="section funnel-section funnel-section-home-duplicate mg-offer-section">
        <div className="section-container-wide">
          <header className="mg-how-it-works-hero mg-offer-hero">
            <div className="intro-pill fade-in">HOW IT WORKS</div>
            <h2 className="section-heading fade-in fade-in-stagger-1">
              We work alongside your team,<br />one workflow at a time.
            </h2>
            <p className="mg-how-it-works-subpara fade-in fade-in-stagger-2">
              Each month starts with a week of focused work with your team. The new process goes live on Friday, then we refine it with your team over the rest of the month.
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

          <FunnelOfferCards showFooter={false} showRecommendation={false} content={improvementCards} />
        </div>
      </section>
    </div>
  );
}
