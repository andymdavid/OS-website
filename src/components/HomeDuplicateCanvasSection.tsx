import {
  Bot,
  Building2,
  CircleDollarSign,
  Database,
  Headphones,
  Layers3,
  Megaphone,
  Network,
  Plane,
  Rocket,
  Settings2,
  ShieldCheck,
  UserRound,
  UsersRound,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import './HomeDuplicateCanvasSection.css';

const domains = [
  { label: 'Sales', Icon: CircleDollarSign },
  { label: 'Marketing', Icon: Megaphone },
  { label: 'Operations', Icon: Settings2 },
  { label: 'Finance', Icon: Database },
  { label: 'HR', Icon: UsersRound },
  { label: 'Customer Service', Icon: Headphones },
];

const operatingLayer = [
  {
    label: 'People',
    Icon: UserRound,
    description: 'The teams and decision-makers who move work forward.',
    image: '/operating-map/people-workflows-card.png',
    imageClassName: 'operating-map-compact-image',
  },
  {
    label: 'Processes',
    Icon: Workflow,
    description: 'The repeatable steps and handoffs that shape how work gets done.',
    image: '/operating-map/processes-workflows-card.png',
  },
  {
    label: 'Tools',
    Icon: Wrench,
    description: 'The systems and records teams use to manage work.',
    image: '/operating-map/tools-workflows-card.png',
    imageClassName: 'operating-map-compact-image',
  },
];

const wingmanLayer = [
  {
    component: 'Flight Deck',
    label: 'Control Surface',
    Icon: Plane,
    description: 'Where your team manages tasks, coordinates agents, and approves work.',
    image: '/operating-map/control-surface-card.png',
    imageClassName: 'operating-map-control-surface-image',
  },
  {
    component: 'Tower',
    label: 'Records',
    Icon: ShieldCheck,
    description: 'The secure system of record for workspace data, permissions, files, and APIs.',
    visual: 'tower',
  },
  {
    component: 'Airspace',
    label: 'Business Memory',
    Icon: Network,
    description: 'Maps how people, companies, work, decisions, and context relate.',
    image: '/operating-map/business-graph-card.png',
    imageClassName: 'operating-map-business-graph-image',
  },
  {
    component: 'Autopilot',
    label: 'Automation Engine',
    Icon: Rocket,
    description: 'The runtime for triggers, pipelines, sessions, agents, and managed apps.',
    visual: 'autopilot',
  },
  {
    component: 'Agents',
    label: 'Workforce',
    Icon: Bot,
    description: 'Specialised agents that carry out defined tasks across workflows and systems.',
    image: '/operating-map/workforce-card.png',
    imageClassName: 'operating-map-workforce-image',
  },
  {
    component: 'WApps',
    label: 'Custom Apps',
    Icon: Layers3,
    description: 'Agentic software built around specific business workflows, interfaces, and tools.',
    visual: 'wapps',
  },
];

function WingmanMicroVisual({ visual }: { visual: string }) {
  if (visual === 'tower') {
    const records = [
      ['Files', '32 synced'],
      ['Records', 'Live graph'],
      ['Permissions', 'Team access'],
      ['APIs', 'Connected'],
    ];

    return (
      <div className="operating-map-micro operating-map-micro-tower">
        <div className="micro-record-stack">
          {records.map(([title, meta], index) => (
            <div key={title} className="micro-record-card" style={{ '--delay': `${index * 0.2}s` } as CSSProperties}>
              <span className="micro-file-icon"></span>
              <div>
                <strong>{title}</strong>
                <em>{meta}</em>
              </div>
              <i></i>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual === 'autopilot') {
    const lines = [
      ['$', 'trigger.received("quote_request")'],
      ['→', 'context.loaded("Horizon Media")'],
      ['$', 'run.agent("proposal_builder")'],
      ['→', 'approval.sent("Flight Deck")'],
      ['✓', 'pipeline ready'],
    ];

    return (
      <div className="operating-map-micro operating-map-micro-autopilot">
        <div className="micro-terminal-lines">
          {lines.map(([prefix, line], index) => (
            <div key={line} className="micro-terminal-line" style={{ '--delay': `${index * 0.26}s` } as CSSProperties}>
              <span>{prefix}</span>
              <p>{line}</p>
            </div>
          ))}
          <b aria-hidden="true">▋</b>
        </div>
      </div>
    );
  }

  return (
    <div className="operating-map-micro operating-map-micro-wapps">
      <div className="micro-app-window">
        <div className="micro-app-metrics">
          <div>
            <span>Overdue</span>
            <strong>$39.2k</strong>
          </div>
          <div>
            <span>Actions</span>
            <strong>12</strong>
          </div>
        </div>
        {['Mitchell & Co', 'Horizon Media', 'Northern Group'].map((item, index) => (
          <div key={item} className="micro-app-row" style={{ '--delay': `${index * 0.24}s` } as CSSProperties}>
            <span>{item}</span>
            <i>{index === 0 ? 'Review' : index === 1 ? 'Send' : 'Approve'}</i>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeDuplicateCanvasSection() {
  return (
    <section className="home-duplicate-canvas-section">
      <div className="home-duplicate-canvas-inner">
        <div className="home-duplicate-canvas-copy">
          <div className="intro-pill">AI THAT FITS YOUR BUSINESS</div>
          <h2 className="section-heading">Your business already has the structure AI needs.</h2>
          <p>
            We start with your existing teams, workflows, and tools, then use Wingman to turn
            high-value work into practical AI systems, agents, and custom apps.
          </p>
        </div>

        <div className="operating-map" aria-label="A company operating map">
          <svg
            className="operating-map-connectors"
            viewBox="0 0 1180 588"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="operating-map-connector-arrow"
                viewBox="0 0 8 8"
                markerWidth="7"
                markerHeight="7"
                refX="4"
                refY="4"
                orient="auto"
              >
                <path d="M1 1 L7 4 L1 7 Z" />
              </marker>
              <marker
                id="operating-map-business-arrow"
                viewBox="0 0 10 10"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M1 1 L9 5 L1 9 Z" />
              </marker>
              <marker
                id="operating-map-wingman-arrow"
                viewBox="0 0 10 10"
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M1 1 L9 5 L1 9 Z" />
              </marker>
            </defs>
            <path className="operating-map-connector-line" d="M98 88 H1082" />
            <path className="operating-map-connector-line" d="M98 196 H1082" />
            <path className="operating-map-connector-line operating-map-business-connector" d="M590 88 V62" />
            <path className="operating-map-connector-line" d="M98 110 V88" />
            <path className="operating-map-connector-line" d="M295 110 V88" />
            <path className="operating-map-connector-line" d="M492 110 V88" />
            <path className="operating-map-connector-line" d="M688 110 V88" />
            <path className="operating-map-connector-line" d="M885 110 V88" />
            <path className="operating-map-connector-line" d="M1082 110 V88" />
            <path className="operating-map-connector-line" d="M98 172 V196" />
            <path className="operating-map-connector-line" d="M295 172 V196" />
            <path className="operating-map-connector-line" d="M492 172 V196" />
            <path className="operating-map-connector-line" d="M688 172 V196" />
            <path className="operating-map-connector-line" d="M885 172 V196" />
            <path className="operating-map-connector-line" d="M1082 172 V196" />
            <path className="operating-map-connector-line operating-map-connector-arrow-up" d="M197 220 V196" />
            <path className="operating-map-connector-line operating-map-connector-arrow-up" d="M590 220 V196" />
            <path className="operating-map-connector-line operating-map-connector-arrow-up" d="M983 220 V196" />
            <path className="operating-map-wingman-connector" d="M197 588 V540" />
            <path className="operating-map-wingman-connector" d="M590 588 V540" />
            <path className="operating-map-wingman-connector" d="M983 588 V540" />
          </svg>
          <div className="operating-map-row operating-map-row-company">
            <div className="operating-map-company">
              <Building2 aria-hidden="true" />
              <span>Your Business</span>
            </div>
          </div>

          <div className="operating-map-row operating-map-row-domains">
            {domains.map(({ label, Icon }) => (
              <div key={label} className="operating-map-card operating-map-domain">
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="operating-map-row operating-map-row-operating">
            {operatingLayer.map(({ label, Icon, description, image, imageClassName }) => (
              <div
                key={label}
                className={`operating-map-card operating-map-foundation ${
                  image ? 'operating-map-feature-card' : ''
                }`.trim()}
              >
                {image ? (
                  <>
                    <div className="operating-map-feature-copy">
                      <div className="operating-map-feature-title">
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                      </div>
                      <p>{description}</p>
                    </div>
                    <div className="operating-map-feature-graphic">
                      <img src={image} alt="" className={imageClassName} loading="lazy" />
                    </div>
                  </>
                ) : (
                  <>
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="operating-map-wingman">
            <div className="operating-map-wingman-copy">
              <div className="operating-map-wingman-label">
                <img src="/wingman-mark-white.png" alt="" aria-hidden="true" />
                <span>Wingman</span>
              </div>
              <p>
                The AI operating layer for your people, processes, and systems.
              </p>
            </div>
            <div className="operating-map-row operating-map-row-wingman">
              {wingmanLayer.map(({ component, label, Icon, description, image, imageClassName, visual }) => (
                <div
                  key={component}
                  className="operating-map-card operating-map-feature-card operating-map-wingman-card"
                >
                  <div className="operating-map-feature-copy">
                    <div className="operating-map-component-label">{component}</div>
                    <div className="operating-map-feature-title">
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                    <p>{description}</p>
                  </div>
                  {image ? (
                    <div
                      className="operating-map-feature-graphic operating-map-wingman-graphic"
                      aria-hidden="true"
                    >
                      <img src={image} alt="" className={imageClassName} loading="lazy" />
                    </div>
                  ) : (
                    <div
                      className={`operating-map-feature-graphic ${
                        visual ? 'operating-map-micro-slot' : 'operating-map-animation-placeholder'
                      }`}
                      aria-hidden="true"
                    >
                      <WingmanMicroVisual visual={visual ?? 'wapps'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
