import { CAL_DISCOVERY_URL } from '../lib/links';
import { BookCallContent } from './BookCallContent';
import './FunnelSection.css';

const cards = [
  {
    category: 'Ambulando',
    title: 'Build and run your own AI workforce.',
    titleLines: ['Build and run your', 'own AI workforce.'],
    description: 'We set up Ambulando, the shared workspace where your people and AI agents build and manage automations together.',
    price: 'From $500 a month.',
    image: '/home-help-ambulando.webp',
    imageAlt: 'Ambulando agents dashboard showing Estimator, Accounts and Research agents.',
    imageClassName: 'static-help-image-interface-centred',
    buttonHref: 'https://ambulando.io',
  },
  {
    category: 'Automation Partner',
    title: 'We automate more of your business each month.',
    titleLines: ['We automate more of your', 'business each month.'],
    description: 'We join your team each month, find the work costing you the most time and automate it one workflow at a time.',
    price: 'From $5k a month. Cancel anytime',
    image: '/home-help-automation-partner.webp',
    imageAlt: 'Ambulando automations dashboard showing live workflows and Safety checks next up.',
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
    image: '/home-help-custom-software.webp',
    imageAlt: 'Northern Construction project software showing an estimate for Cottesloe Residence.',
    imageClassName: 'static-help-image-interface-centred',
    buttonHref: '/ai-automation',
  },
] as const;

type FunnelOfferCardsProps = {
  showFooter?: boolean;
  showRecommendation?: boolean;
  content?: readonly {
    category: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  }[];
};

export function FunnelOfferCards({ showFooter = true, showRecommendation = true, content }: FunnelOfferCardsProps) {
  return (
    <div className="funnel-cards funnel-offer-panel">
      {cards.map((card, index) => {
        const isExternal = card.buttonHref.startsWith('http');
        const cardContent = content?.[index];
        return (
          <article key={cardContent?.title ?? card.title} className="funnel-card fade-in">
            <div className="funnel-card-image">
              <img
                className={`static-help-image ${!cardContent && 'imageClassName' in card ? card.imageClassName : ''}`}
                src={cardContent?.image ?? card.image}
                alt={cardContent?.imageAlt ?? card.imageAlt}
              />
              {showRecommendation && card.tag && (
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
            <div className="funnel-card-header"><span className="funnel-card-category">{cardContent?.category ?? card.category}</span></div>
            <div className="funnel-card-body">
              <h4>
                {cardContent ? cardContent.title : (
                  <>{card.titleLines[0]}<br className="funnel-card-title-break" />{card.titleLines[1]}</>
                )}
              </h4>
              <p className="funnel-card-description">{cardContent?.description ?? card.description}</p>
              {showFooter && <p className="funnel-card-price">{card.price}</p>}
            </div>
            {showFooter && (
              <a className="funnel-card-button" href={card.buttonHref} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                Learn More
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function FunnelHomeDuplicate() {
  return (
    <section id="services" className="section funnel-section funnel-section-home-duplicate">
      <div className="section-container-wide">
        <div className="funnel-offer-header">
          <div className="funnel-offer-heading">
            <div className="funnel-pill fade-in">HOW WE HELP SMEs</div>
            <h2 className="section-heading fade-in fade-in-stagger-1">Get more done, without hiring more people.</h2>
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

          <FunnelOfferCards />
      </div>
    </section>
  );
}
