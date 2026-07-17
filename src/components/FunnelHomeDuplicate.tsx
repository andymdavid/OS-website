import React from 'react';
import { CAL_DISCOVERY_URL } from '../lib/links';
import './FunnelSection.css';

export function FunnelHomeDuplicate() {
  const peopleOverlayCards = [
    { image: '/funnel-profiles/sarah-mitchell.webp', name: 'Sarah Mitchell' },
    { image: '/funnel-profiles/john-baker.webp', name: 'John Baker' },
  ];

  const cards = [
    {
      category: 'Speedrun',
      date: 'People',
      title: 'AI Workshops for Teams',
      description:
        'Hands-on AI workshops for teams that need confidence, capability, and better ways of working with AI. Your people build real, commercially useful apps, using their domain expertise alongside Wingman.',
      image: '/ai-workshops-card.webp',
      buttonText: 'Learn More',
      buttonHref: '/speedrun',
    },
    {
      category: 'WApps',
      date: 'Process',
      title: 'AI-Native Business Software',
      description:
        'A WApp turns a high-value workflow into highly personalised software the business can actually use. Each one runs on Wingman, connecting the agents, records, approvals, and tools needed to do the work.',
      image: '/Card3.webp',
      buttonText: 'Learn More',
      buttonHref: '/marginal-gains',
    },
    {
      category: 'Wingman',
      date: 'Tools',
      title: 'Control Layer for AI Work',
      description:
        'The control layer for AI work inside your business - agents, records, approvals, files, permissions, and memory in one operating environment, so AI works reliably without replacing your existing tools.',
      image: '/wingmen-suite-card.webp',
      buttonText: 'Learn More',
      buttonHref: '/#system',
    },
  ];

  return (
    <section id="services" className="section funnel-section funnel-section-home-duplicate">
      <div className="section-container-wide">
        <div className="funnel-offer-header">
          <div className="funnel-offer-heading">
            <div className="funnel-pill fade-in">HOW WE HELP SMEs</div>

            <h2 className="section-heading fade-in fade-in-stagger-1">
              Three practical ways to start <br />
              using AI inside your business.
            </h2>
          </div>

          <div className="funnel-offer-copy">
            <p className="funnel-intro fade-in fade-in-stagger-2">
              We build highly personalised AI-native software around the workflows that matter most in your business.
              Wingman gives your agents, records, and custom apps the infrastructure to run reliably,
              while Speedrun helps your team turn the tools and expertise into better ways of working with AI.
            </p>

            <a
              className="funnel-offer-cta fade-in fade-in-stagger-3"
              href={CAL_DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </a>
          </div>
        </div>

        <div className="funnel-cards funnel-offer-panel">
          {cards.map((card, index) => {
            const isExternal = card.buttonHref.startsWith('http');

            return (
              <article key={card.title} className="funnel-card fade-in">
                <div className="funnel-card-image">
                  <img src={card.image} alt="" aria-hidden="true" />
                  {index === 0 && (
                    <div className="people-overlay" aria-hidden="true">
                      <div className="people-overlay-grid">
                        {peopleOverlayCards.map((person, personIndex) => (
                          <div className="people-overlay-card" key={person.image}>
                            <span className="people-overlay-name">{person.name}</span>
                            <img
                              src={person.image}
                              alt=""
                              aria-hidden="true"
                              className={`people-overlay-photo people-overlay-photo-${personIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="people-overlay-terminal">
                        <div className="people-overlay-terminal-row">
                          <span>$</span>
                          <p>scope.workflow("quoting")</p>
                        </div>
                        <div className="people-overlay-terminal-row">
                          <span>→</span>
                          <p>build.app("margin_review")</p>
                        </div>
                        <b aria-hidden="true">▋</b>
                      </div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="wapps-overlay" aria-hidden="true">
                      <div className="wapps-window">
                        <div className="wapps-window-header">
                          <span>Prospect Research</span>
                          <i>·</i>
                          <em>18 mins</em>
                          <div className="wapps-window-icons">
                            <img src="/funnel-logos/app-logo-1.webp" alt="" aria-hidden="true" />
                            <img src="/funnel-logos/app-logo-2.webp" alt="" aria-hidden="true" />
                            <img src="/funnel-logos/app-logo-3.webp" alt="" aria-hidden="true" />
                          </div>
                        </div>

                        <div className="wapps-prospect-panel">
                          <div>
                            <strong>Horizon Media</strong>
                            <em>Fit 82</em>
                          </div>
                          <p>Marketing services · Perth, WA</p>
                          <div className="wapps-contact-profiles">
                            <span>
                              <img src="/funnel-profiles/helen-morris-headshot.webp" alt="" aria-hidden="true" />
                              <i>
                                <strong>Helen Morris</strong>
                                <em>Growth Director</em>
                              </i>
                            </span>
                            <span>
                              <img src="/funnel-profiles/chris-lane-headshot.webp" alt="" aria-hidden="true" />
                              <i>
                                <strong>Chris Lane</strong>
                                <em>Ops Lead</em>
                              </i>
                            </span>
                          </div>
                        </div>

                        <div className="wapps-smart-notes">
                          <span>Smart Notes:</span>
                          <p>Campaign volume is rising across paid and organic channels.</p>
                          <p>Lead with faster reporting and clearer margin visibility.</p>
                          <div className="wapps-note-lines">
                            <i />
                            <i />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="wingman-control-overlay" aria-hidden="true">
                      <div className="wingman-workflow-board">
                        <div className="wingman-workflow-header">
                          <span>Flight Deck</span>
                          <em>Agent work controlled</em>
                        </div>

                        <div className="wingman-workflow-columns">
                          <div className="wingman-workflow-column">
                            <div className="wingman-workflow-column-header">
                              <span>Queued</span>
                              <b>1</b>
                            </div>
                          </div>

                          <div className="wingman-workflow-column">
                            <div className="wingman-workflow-column-header">
                              <span>In Progress</span>
                              <b>1</b>
                            </div>
                            <div className="wingman-approval-card">
                              <strong>Margin check</strong>
                              <p>Approval required</p>
                            </div>
                          </div>

                          <div className="wingman-workflow-column">
                            <div className="wingman-workflow-column-header">
                              <span>Approved</span>
                              <b>2</b>
                            </div>
                          </div>

                          <div className="wingman-moving-task">
                            <strong>Client proposal</strong>
                            <span>Agent drafted</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="funnel-card-header">
                  <span className="funnel-card-category">{card.category}</span>
                  <span className="funnel-card-date">{card.date}</span>
                </div>

                <div className="funnel-card-body">
                  <h4 className={index === 1 ? 'funnel-card-title-wide' : undefined}>{card.title}</h4>
                  <p className="funnel-card-description">{card.description}</p>
                </div>

                <a
                  className="funnel-card-button"
                  href={card.buttonHref}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={card.buttonText}
                >
                  {card.buttonText}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
