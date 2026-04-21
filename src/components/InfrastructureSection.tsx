import React from 'react';
import './InfrastructureSection.css';

interface InfraComponent {
  name: string;
  role: string;
}

const components: InfraComponent[] = [
  {
    name: 'Flight Deck',
    role: 'Where your team manages tasks, monitors agents, and stays in control of what\u2019s running \u2014 across desktop and mobile.',
  },
  {
    name: 'Control Tower',
    role: 'The encrypted data and record layer that sits underneath everything. Your business data stored securely and never shared with public models.',
  },
  {
    name: 'Airspace',
    role: 'The knowledge layer that gives your agents the context they need \u2014 built from your own business data, not generic information.',
  },
  {
    name: 'Autopilot',
    role: 'Runs your automated workflows, connects to existing systems, and keeps everything moving without constant manual input.',
  },
  {
    name: 'Wingman',
    role: 'The agent environment for running, managing and building on your AI systems, providing deeper control and the flexibility with your agents.',
  },
];

/* Node positions as % of container — deliberately staggered for a graph feel */
const nodeLayout = [
  { left: 3, top: 2 },     /* Flight Deck — top-left */
  { left: 70, top: 7 },    /* Control Tower — top-right, offset down */
  { left: 0, top: 64 },    /* Airspace — left, below centre */
  { left: 38, top: 80 },   /* Autopilot — bottom-centre */
  { left: 74, top: 58 },   /* SuperBased — right, mid-low */
];

/* Centre hub position */
const hub = { left: 37, top: 35 };
const hubCentre = { x: hub.left + 13, y: hub.top + 10 };

/* Approximate card centres for SVG lines */
const nodeCentres = [
  { x: nodeLayout[0].left + 13, y: nodeLayout[0].top + 12 },
  { x: nodeLayout[1].left + 13, y: nodeLayout[1].top + 12 },
  { x: nodeLayout[2].left + 13, y: nodeLayout[2].top + 12 },
  { x: nodeLayout[3].left + 13, y: nodeLayout[3].top + 12 },
  { x: nodeLayout[4].left + 13, y: nodeLayout[4].top + 12 },
];

export function InfrastructureSection() {
  return (
    <section id="system" className="section infrastructure-section">
      <div className="infrastructure-container">
        <div className="intro-pill fade-in">OUR INFRASTRUCTURE</div>

        <h2 className="infrastructure-heading fade-in fade-in-stagger-1">
          Every system we build is backed by infrastructure we designed and run ourselves.
        </h2>

        <p className="infrastructure-body fade-in fade-in-stagger-2">
          We built our own agent infrastructure from the ground up &mdash; open source and purpose-designed for SMEs. Your systems aren&apos;t dependent on ChatGPT Enterprise, Claude, or any single provider. Your business can own and run it independently.
        </p>

        {/* Desktop: positioned graph layout */}
        <div className="infra-graph fade-in fade-in-stagger-3">
          {/* SVG connector lines */}
          <svg className="infra-connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodeCentres.map((node, i) => (
              <line
                key={i}
                x1={hubCentre.x}
                y1={hubCentre.y}
                x2={node.x}
                y2={node.y}
                stroke="rgba(46, 167, 130, 0.18)"
                strokeWidth="0.15"
              />
            ))}
          </svg>

          {/* Centre hub */}
          <div
            className="infra-graph-node infra-hub-node"
            style={{ left: `${hub.left}%`, top: `${hub.top}%` }}
          >
            <div className="infra-centre-card">
              <h3 className="infra-centre-name">Wingmen Suite</h3>
              <p className="infra-centre-role">
                The open-source agent infrastructure that powers everything we build. Five integrated components, one system.
              </p>
            </div>
          </div>

          {/* Component nodes */}
          {components.map((comp, i) => (
            <div
              key={comp.name}
              className="infra-graph-node"
              style={{ left: `${nodeLayout[i].left}%`, top: `${nodeLayout[i].top}%` }}
            >
              <div className="infrastructure-card">
                <h3 className="infrastructure-card-name">{comp.name}</h3>
                <p className="infrastructure-card-role">{comp.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked layout */}
        <div className="infra-stack fade-in fade-in-stagger-3">
          <div className="infra-centre-card">
            <h3 className="infra-centre-name">Wingmen Suite</h3>
            <p className="infra-centre-role">
              The open-source agent infrastructure that powers everything we build. Five integrated components, one system.
            </p>
          </div>
          {components.map((comp) => (
            <div key={comp.name} className="infrastructure-card">
              <h3 className="infrastructure-card-name">{comp.name}</h3>
              <p className="infrastructure-card-role">{comp.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
