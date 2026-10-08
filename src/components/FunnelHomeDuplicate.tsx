import { CAL_DISCOVERY_URL } from '../lib/links';
import { BookCallContent } from './BookCallContent';
import './FunnelSection.css';

const cards = [
  {
    category: 'Wingman',
    title: 'Build and run your own AI workforce.',
    titleLines: ['Build and run your', 'own AI workforce.'],
    description: 'We set up Wingman, the system your AI agents run in. Your team builds and manages its own automations from there.',
    price: 'From $500 a month.',
    image: '/how-we-help-wingman.png',
    imageAlt: 'Wingman agents dashboard showing Estimator, Accounts and Research agents.',
    imageClassName: 'static-help-image-interface-centred static-help-image-wingman',
    buttonHref: '/wingman',
  },
  {
    category: 'Automation Partner',
    title: 'We automate more of your business each month.',
    titleLines: ['We automate more of your', 'business each month.'],
    description: 'We join your team each month, find the work costing you the most time and automate it one workflow at a time.',
    price: 'From $5k a month. Cancel anytime',
    image: '/how-we-help-automation-partner.png',
    imageAlt: 'Wingman automations dashboard showing live workflows and Safety checks next up.',
    imageClassName: 'static-help-image-interface-centred',
    tag: 'Most clients start here',
    buttonHref: CAL_DISCOVERY_URL,
  },
  {
    category: 'Custom Software',
    title: 'Own the software your business runs on.',
    titleLines: ['Own the software your', 'business runs on.'],
    description: 'When a workflow needs its own software, we design and build it around the way your team already works.',
    price: 'Quoted per project',
    image: '/how-we-help-custom-software.png',
    imageAlt: 'Northern Construction project software showing an estimate for Cottesloe Residence.',
    imageClassName: 'static-help-image-custom-software',
    buttonHref: '/ai-automation',
  },
] as const;

export function FunnelHomeDuplicate() {
  return (
    <section id="services" className="section funnel-section funnel-section-home-duplicate">
      <div className="section-container-wide">
        <div className="funnel-offer-header">
          <div className="funnel-offer-heading">
            <div className="funnel-pill fade-in">HOW WE HELP SMEs</div>
            <h2 className="section-heading fade-in fade-in-stagger-1">More done, without more people.</h2>
          </div>
          <div className="funnel-offer-copy">
            <p className="funnel-intro fade-in fade-in-stagger-2">
              We put AI to work where it makes the biggest difference in your business,
              so your team can get more done without adding headcount.
            </p>
            <a className="funnel-offer-cta book-call-button fade-in fade-in-stagger-3" href={CAL_DISCOVERY_URL} target="_blank" rel="noopener noreferrer">
              <BookCallContent />
            </a>
          </div>
        </div>

        <div className="funnel-cards funnel-offer-panel">
          {cards.map((card) => {
            const isExternal = card.buttonHref.startsWith('http');
            return (
              <article key={card.title} className="funnel-card fade-in">
                <div className="funnel-card-image">
                  <img
                    className={`static-help-image ${'imageClassName' in card ? card.imageClassName : ''}`}
                    src={card.image}
                    alt={card.imageAlt}
                  />
                  {card.tag && (
                    <svg className="funnel-card-recommended" viewBox="0 0 180 180" role="img" aria-label={card.tag}>
                      <defs>
                        <path id="recommended-ribbon-path" d="M 35 0 C 42 56 110 126 180 138" />
                      </defs>
                      <use href="#recommended-ribbon-path" className="recommended-ribbon-band" />
                      <text className="recommended-ribbon-text">
                        <textPath href="#recommended-ribbon-path" startOffset="50%" textAnchor="middle">
                          MOST CLIENTS START HERE
                        </textPath>
                      </text>
                    </svg>
                  )}
                </div>
                <div className="funnel-card-header"><span className="funnel-card-category">{card.category}</span></div>
                <div className="funnel-card-body">
                  <h4>
                    {card.titleLines[0]}<br className="funnel-card-title-break" />{card.titleLines[1]}
                  </h4>
                  <p className="funnel-card-description">{card.description}</p>
                  <p className="funnel-card-price">{card.price}</p>
                </div>
                <a className="funnel-card-button" href={card.buttonHref} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                  Learn More
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
