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
      category: 'Wingman',
      date: '',
      title: 'Build and run your own AI workforce.',
      titleLines: ['Build and run your', 'own AI workforce.'],
      description:
        'We set up Wingman, the system your AI agents run in. Your team builds and manages its own automations from there.',
      price: 'From $500 a month.',
      image: '/wingmen-suite-card.webp',
      visual: 'wingman',
      buttonText: 'Learn More',
      buttonHref: '/wingman',
    },
    {
      category: 'Automation Partner',
      date: '',
      title: 'We automate more of your business each month.',
      titleLines: ['We automate more of your', 'business each month.'],
      description:
        'We join your team each month, find the work costing you the most time and automate it one workflow at a time.',
      price: 'From $5k a month. Cancel anytime',
      tag: 'Most businesses start here',
      image: '/Card3.webp',
      visual: 'wapps',
      buttonText: 'Learn More',
      buttonHref: CAL_DISCOVERY_URL,
    },
    {
      category: 'Custom Software',
      date: '',
      title: 'Own the software your business runs on.',
      titleLines: ['Own the software your', 'business runs on.'],
      description:
        'When a workflow needs its own software, we design and build it around the way your team already works.',
      price: 'Quoted per project',
      image: '/Card01.webp',
      visual: 'custom',
      buttonText: 'Learn More',
      buttonHref: '/marginal-gains',
    },
  ];

  return (
    <section id="services" className="section funnel-section funnel-section-home-duplicate">
      <div className="section-container-wide">
        <div className="funnel-offer-header">
          <div className="funnel-offer-heading">
            <div className="funnel-pill fade-in">HOW WE HELP SMEs</div>

            <h2 className="section-heading fade-in fade-in-stagger-1">
              More done, without more people.
            </h2>
          </div>

          <div className="funnel-offer-copy">
            <p className="funnel-intro fade-in fade-in-stagger-2">
              We put AI to work where it makes the biggest difference in your business,
              so your team can get more done without adding headcount.
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
          {cards.map((card) => {
            const isExternal = card.buttonHref.startsWith('http');

            return (
              <article key={card.title} className="funnel-card fade-in">
                <div className="funnel-card-image">
                  <img src={card.image} alt="" aria-hidden="true" />
                  {card.tag && <span className="funnel-card-recommended">{card.tag}</span>}
                  {card.visual === 'people' && (
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
                  {card.visual === 'wapps' && (
                    <div className="wapps-overlay" aria-hidden="true">
                      <div className="build-system-scene">
                        <div className="build-system-orbit build-system-orbit-1" />
                        <div className="build-system-orbit build-system-orbit-2" />
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
                            <span>Agent output</span>
                            <p>Campaign volume is rising across paid and organic channels.</p>
                            <p>Lead with faster reporting and clearer margin visibility.</p>
                            <div className="wapps-note-lines">
                              <i />
                              <i />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {card.visual === 'wingman' && (
                    <div className="partner-system-overlay" aria-hidden="true">
                      <div className="partner-system-scene">
                        <div className="partner-system-glow" />
                        <div className="partner-system-label partner-system-label-business">YOUR BUSINESS</div>
                        <div className="partner-system-label partner-system-label-software">YOUR AI SOFTWARE</div>

                        <div className="partner-workflows">
                          {['Quoting', 'Margin reviews', 'Onboarding', 'Reporting'].map((workflow, workflowIndex) => (
                            <div className={`partner-workflow partner-workflow-${workflowIndex + 1}`} key={workflow}>
                              <i />
                              <span>{workflow}</span>
                              <em>{workflowIndex < 2 ? 'Connected' : 'Manual'}</em>
                            </div>
                          ))}
                        </div>

                        <div className="partner-context-stream">
                          <svg viewBox="0 0 110 190" preserveAspectRatio="none">
                            <path d="M0 24 C44 24 47 86 110 86" />
                            <path d="M0 71 C42 71 50 94 110 94" />
                            <path d="M0 119 C42 119 50 102 110 102" />
                            <path d="M0 166 C44 166 47 110 110 110" />
                            <circle className="partner-path-pulse partner-path-pulse-1" r="2">
                              <animateMotion path="M0 24 C44 24 47 86 110 86" dur="8s" begin="0s" repeatCount="indefinite" />
                            </circle>
                            <circle className="partner-path-pulse partner-path-pulse-2" r="2">
                              <animateMotion path="M0 71 C42 71 50 94 110 94" dur="8s" begin="2s" repeatCount="indefinite" />
                            </circle>
                            <circle className="partner-path-pulse partner-path-pulse-3" r="2">
                              <animateMotion path="M0 119 C42 119 50 102 110 102" dur="8s" begin="4s" repeatCount="indefinite" />
                            </circle>
                            <circle className="partner-path-pulse partner-path-pulse-4" r="2">
                              <animateMotion path="M0 166 C44 166 47 110 110 110" dur="8s" begin="6s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                          <div className="partner-context-chip partner-context-rules">Rules</div>
                          <div className="partner-context-chip partner-context-data">Data</div>
                          <div className="partner-context-chip partner-context-tools">Tools</div>
                        </div>

                        <div className="partner-ai-core">
                          <div className="partner-core-orbit partner-core-orbit-outer" />
                          <div className="partner-core-orbit partner-core-orbit-inner" />
                          <div className="partner-core-mark">
                            <img src="/Logo-Main-Icon.webp" alt="" />
                            <span>WINGMAN</span>
                          </div>
                        </div>

                        <div className="partner-software-surface">
                          <div className="partner-software-header">
                            <div>
                              <i />
                              <span>OPERATING LIVE</span>
                            </div>
                            <em>3 workflows</em>
                          </div>
                          <div className="partner-software-modules">
                            <div className="partner-software-module partner-software-module-1">
                              <b>01</b>
                              <div>
                                <strong>Margin Intelligence</strong>
                                <span className="partner-module-status">
                                  <em>Agent checking margins</em>
                                  <em>Approval ready</em>
                                </span>
                              </div>
                              <i />
                            </div>
                            <div className="partner-software-module partner-software-module-2">
                              <b>02</b>
                              <div>
                                <strong>Proposal Builder</strong>
                                <span><em>12 proposals processed</em></span>
                              </div>
                              <i />
                            </div>
                            <div className="partner-software-module partner-software-module-3">
                              <b>03</b>
                              <div>
                                <strong>Client Onboarding</strong>
                                <span><em>Connecting workflow</em></span>
                              </div>
                              <i />
                            </div>
                          </div>
                          <div className="partner-software-footer">
                            <span>AI coverage</span>
                            <div><i /></div>
                            <strong>EXPANDING</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="funnel-card-header">
                  <span className="funnel-card-category">{card.category}</span>
                </div>

                <div className="funnel-card-body">
                  <h4 className={card.visual === 'wapps' ? 'funnel-card-title-wide' : undefined}>
                    {card.titleLines[0]}
                    <br className="funnel-card-title-break" />
                    {card.titleLines[1]}
                  </h4>
                  <p className="funnel-card-description">{card.description}</p>
                  {card.price && <p className="funnel-card-price">{card.price}</p>}
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
