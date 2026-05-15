import React from 'react';
import './InfrastructureSection.css';

interface InfraComponent {
  tag: string;
  title: string;
  role: string;
  position: 'top-left' | 'top-right' | 'left' | 'right' | 'bottom';
}

const components: InfraComponent[] = [
  {
    tag: 'Flight Deck',
    title: 'Daily workspace',
    role: 'Where your team manages tasks, monitors agents, and stays in control of what\u2019s running \u2014 across desktop and mobile.',
    position: 'top-left',
  },
  {
    tag: 'Tower',
    title: 'Shared record',
    role: 'The encrypted data and record layer that sits underneath everything. Your business data stored securely and never shared with public models.',
    position: 'top-right',
  },
  {
    tag: 'Airspace',
    title: 'Business context',
    role: 'The knowledge layer that gives your agents the context they need \u2014 built from your own business data, not generic information.',
    position: 'left',
  },
  {
    tag: 'Autopilot',
    title: 'Workflow engine',
    role: 'Runs your automated workflows, connects to existing systems, and keeps everything moving without constant manual input.',
    position: 'bottom',
  },
  {
    tag: 'Wingman Agents',
    title: 'Review-gated help',
    role: 'The agent environment for running, managing and building on your AI systems, providing deeper control and the flexibility with your agents.',
    position: 'right',
  },
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

        {/* Desktop: system diagram layout */}
        <div className="infra-diagram fade-in fade-in-stagger-3">
          <span className="infra-connector infra-connector-top-left" aria-hidden="true" />
          <span className="infra-connector infra-connector-top-right" aria-hidden="true" />
          <span className="infra-connector infra-connector-left" aria-hidden="true" />
          <span className="infra-connector infra-connector-right" aria-hidden="true" />
          <span className="infra-connector infra-connector-bottom" aria-hidden="true" />

          <div className="infra-card-slot infra-card-slot-top-left">
            {components.filter((comp) => comp.position === 'top-left').map((comp) => (
              <div key={comp.tag} className="infrastructure-card">
                <div className="infrastructure-card-tag">{comp.tag}</div>
                <h3 className="infrastructure-card-name">{comp.title}</h3>
                <p className="infrastructure-card-role">{comp.role}</p>
              </div>
            ))}
          </div>

          <div className="infra-card-slot infra-card-slot-top-right">
            {components.filter((comp) => comp.position === 'top-right').map((comp) => (
              <div key={comp.tag} className="infrastructure-card">
                <div className="infrastructure-card-tag">{comp.tag}</div>
                <h3 className="infrastructure-card-name">{comp.title}</h3>
                <p className="infrastructure-card-role">{comp.role}</p>
              </div>
            ))}
          </div>

          <div className="infra-card-slot infra-card-slot-left">
            {components.filter((comp) => comp.position === 'left').map((comp) => (
              <div key={comp.tag} className="infrastructure-card">
                <div className="infrastructure-card-tag">{comp.tag}</div>
                <h3 className="infrastructure-card-name">{comp.title}</h3>
                <p className="infrastructure-card-role">{comp.role}</p>
              </div>
            ))}
          </div>

          <div className="infra-card-slot infra-card-slot-centre">
            <div className="infra-centre-card">
              <div className="infrastructure-card-tag">Centre</div>
              <h3 className="infra-centre-name">Your Operating Memory</h3>
              <p className="infra-centre-role">
                The open-source agent infrastructure that powers everything we build. Five integrated components, one system.
              </p>
            </div>
          </div>

          <div className="infra-card-slot infra-card-slot-right">
            {components.filter((comp) => comp.position === 'right').map((comp) => (
              <div key={comp.tag} className="infrastructure-card">
                <div className="infrastructure-card-tag">{comp.tag}</div>
                <h3 className="infrastructure-card-name">{comp.title}</h3>
                <p className="infrastructure-card-role">{comp.role}</p>
              </div>
            ))}
          </div>

          <div className="infra-card-slot infra-card-slot-bottom">
            {components.filter((comp) => comp.position === 'bottom').map((comp) => (
              <div key={comp.tag} className="infrastructure-card">
                <div className="infrastructure-card-tag">{comp.tag}</div>
                <h3 className="infrastructure-card-name">{comp.title}</h3>
                <p className="infrastructure-card-role">{comp.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="infra-stack fade-in fade-in-stagger-3">
          <div className="infra-centre-card">
            <div className="infrastructure-card-tag">Centre</div>
            <h3 className="infra-centre-name">Your Operating Memory</h3>
            <p className="infra-centre-role">
              The open-source agent infrastructure that powers everything we build. Five integrated components, one system.
            </p>
          </div>
          {components.map((comp) => (
            <div key={comp.tag} className="infrastructure-card">
              <div className="infrastructure-card-tag">{comp.tag}</div>
              <h3 className="infrastructure-card-name">{comp.title}</h3>
              <p className="infrastructure-card-role">{comp.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
