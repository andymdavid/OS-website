import { useEffect, useRef, useState } from 'react';
import './ProposalBuilderDemo.css';

type Phase =
  | 'waiting'
  | 'source'
  | 'source-build'
  | 'source-hold'
  | 'pricing'
  | 'pricing-1'
  | 'pricing-2'
  | 'pricing-3'
  | 'pricing-total'
  | 'pricing-hold'
  | 'proposal'
  | 'proposal-1'
  | 'proposal-2'
  | 'proposal-3'
  | 'proposal-ready'
  | 'proposal-hold';

interface SourceLine {
  type: 'command' | 'status';
  content: string;
}

interface ProposalSection {
  title: string;
  detail: string;
  source: string;
}

const sourceLines: SourceLine[] = [
  { type: 'command', content: 'wingman load notes --account "Northern Construction"' },
  { type: 'status', content: 'Discovery notes found · 3 relevant threads' },
  { type: 'command', content: 'wingman match proposal --service "sales workflow automation"' },
  { type: 'status', content: 'Reference proposal: Mitchell rollout v2' },
  { type: 'command', content: 'wingman fetch rates --current --region uk' },
  { type: 'status', content: 'Rate card loaded · April 2026' },
];

const proposalSections: ProposalSection[] = [
  {
    title: 'Discovery workshop and workflow mapping',
    detail: 'Capture sales handoffs, approval points, and proposal bottlenecks.',
    source: 'From discovery notes',
  },
  {
    title: 'Proposal assembly workflow',
    detail: 'Build reusable sections, pricing logic, and approval routing.',
    source: 'Matched from prior proposal',
  },
  {
    title: 'CRM and evidence sync',
    detail: 'Pull case studies, proof points, and current rate card data into each draft.',
    source: 'From capability library',
  },
];

export function ProposalBuilderDemo() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [visibleSourceLines, setVisibleSourceLines] = useState(0);
  const [pricingStep, setPricingStep] = useState(0);
  const [proposalStep, setProposalStep] = useState(0);
  const [activeProposalIndex, setActiveProposalIndex] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('source');
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'source') {
      setVisibleSourceLines(0);
      setPricingStep(0);
      setProposalStep(0);
      setActiveProposalIndex(null);
      timeout = setTimeout(() => {
        setVisibleSourceLines(1);
        setPhase('source-build');
      }, 750);
    } else if (phase === 'source-build') {
      if (visibleSourceLines < sourceLines.length) {
        timeout = setTimeout(() => {
          setVisibleSourceLines((current) => current + 1);
        }, 340);
      } else {
        timeout = setTimeout(() => {
          setPhase('source-hold');
        }, 700);
      }
    } else if (phase === 'source-hold') {
      timeout = setTimeout(() => {
        setPhase('pricing');
      }, 650);
    } else if (phase === 'pricing') {
      timeout = setTimeout(() => {
        setPricingStep(1);
        setPhase('pricing-1');
      }, 550);
    } else if (phase === 'pricing-1') {
      timeout = setTimeout(() => {
        setPricingStep(2);
        setPhase('pricing-2');
      }, 420);
    } else if (phase === 'pricing-2') {
      timeout = setTimeout(() => {
        setPricingStep(3);
        setPhase('pricing-3');
      }, 420);
    } else if (phase === 'pricing-3') {
      timeout = setTimeout(() => {
        setPricingStep(4);
        setPhase('pricing-total');
      }, 620);
    } else if (phase === 'pricing-total') {
      timeout = setTimeout(() => {
        setPhase('pricing-hold');
      }, 1200);
    } else if (phase === 'pricing-hold') {
      timeout = setTimeout(() => {
        setPhase('proposal');
      }, 600);
    } else if (phase === 'proposal') {
      timeout = setTimeout(() => {
        setProposalStep(1);
        setActiveProposalIndex(0);
        setPhase('proposal-1');
      }, 550);
    } else if (phase === 'proposal-1') {
      timeout = setTimeout(() => {
        setProposalStep(2);
        setActiveProposalIndex(1);
        setPhase('proposal-2');
      }, 800);
    } else if (phase === 'proposal-2') {
      timeout = setTimeout(() => {
        setProposalStep(3);
        setActiveProposalIndex(2);
        setPhase('proposal-3');
      }, 800);
    } else if (phase === 'proposal-3') {
      timeout = setTimeout(() => {
        setActiveProposalIndex(null);
        setPhase('proposal-ready');
      }, 950);
    } else if (phase === 'proposal-ready') {
      timeout = setTimeout(() => {
        setPhase('proposal-hold');
      }, 1600);
    } else if (phase === 'proposal-hold') {
      timeout = setTimeout(() => {
        setPhase('source');
      }, 1400);
    }

    return () => clearTimeout(timeout);
  }, [phase, visibleSourceLines]);

  const isSourceScreen =
    phase === 'source' || phase === 'source-build' || phase === 'source-hold';
  const isPricingScreen =
    phase === 'pricing' ||
    phase === 'pricing-1' ||
    phase === 'pricing-2' ||
    phase === 'pricing-3' ||
    phase === 'pricing-total' ||
    phase === 'pricing-hold';
  const isProposalScreen =
    phase === 'proposal' ||
    phase === 'proposal-1' ||
    phase === 'proposal-2' ||
    phase === 'proposal-3' ||
    phase === 'proposal-ready' ||
    phase === 'proposal-hold';

  return (
    <div className="proposal-builder-shell" ref={containerRef}>
      <div className="proposal-builder-panel">
        <div className="proposal-builder-header">
          <div>
            <h4>Proposal for Review</h4>
          </div>
          <div className="proposal-builder-status">
            <span className="proposal-builder-status-dot"></span>
            Agent active
          </div>
        </div>

        <div className="proposal-stage-stack">
          <section className="proposal-stage-screen visible">
            {isSourceScreen && (
              <>
                <div className="proposal-screen-title-row">
                  <span className="proposal-screen-label">Inputs</span>
                  <span className="proposal-screen-state">Source loading</span>
                </div>

                <div className="proposal-terminal-panel">
                  <div className="proposal-terminal-header">
                    <span>wingman session</span>
                    <span className="proposal-terminal-pill">loading inputs</span>
                  </div>

                  <div className="proposal-terminal-body">
                    {sourceLines.slice(0, visibleSourceLines).map((line, index) => (
                      <div key={`${line.content}-${index}`} className={`proposal-terminal-line ${line.type}`}>
                        <span className="proposal-terminal-prefix">
                          {line.type === 'command' ? '$' : '✓'}
                        </span>
                        <span>{line.content}</span>
                      </div>
                    ))}

                    {visibleSourceLines < sourceLines.length && (
                      <div className="proposal-terminal-cursor-row">
                        <span className="proposal-terminal-prefix">$</span>
                        <span className="proposal-terminal-cursor">▋</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {isPricingScreen && (
              <>
                <div className="proposal-screen-title-row">
                  <span className="proposal-screen-label">Pricing Summary</span>
                  <span className="proposal-screen-state">Pricing build</span>
                </div>

                <div className="proposal-pricing-screen-card">
                  <div className="proposal-pricing-head">
                    <div>
                      <span className="proposal-block-label">Northern Construction</span>
                      <div className="proposal-pricing-title">Sales workflow automation system</div>
                    </div>
                    <div className={`proposal-pricing-status ${pricingStep >= 4 ? 'ready' : ''}`}>
                      {pricingStep >= 4 ? 'Draft value set' : 'Calculating'}
                    </div>
                  </div>

                  <div className="proposal-pricing-list">
                    <div className={`proposal-pricing-line ${pricingStep >= 1 ? 'visible' : ''}`}>
                      <span>Strategy & design</span>
                      <span>$2,400</span>
                    </div>
                    <div className={`proposal-pricing-line ${pricingStep >= 2 ? 'visible' : ''}`}>
                      <span>Workflow build</span>
                      <span>$5,800</span>
                    </div>
                    <div className={`proposal-pricing-line ${pricingStep >= 3 ? 'visible' : ''}`}>
                      <span>CRM integration</span>
                      <span>$3,100</span>
                    </div>
                  </div>

                  <div className={`proposal-timeline-chip ${pricingStep >= 3 ? 'visible' : ''}`}>
                    Delivery timeline: 5 weeks
                  </div>

                  <div className={`proposal-proof-inline ${pricingStep >= 4 ? 'visible' : ''}`}>
                    <span className="proposal-proof-label">Case study attached</span>
                    <span className="proposal-proof-copy">Reduced reporting admin by 11 hrs/week for a similar ops team.</span>
                  </div>

                  <div className={`proposal-total-row ${pricingStep >= 4 ? 'visible' : ''}`}>
                    <span>Total draft value</span>
                    <strong>$11,300</strong>
                  </div>
                </div>
              </>
            )}

            {isProposalScreen && (
              <>
                <div className="proposal-screen-title-row">
                  <span className="proposal-screen-label">Draft</span>
                  <span className="proposal-screen-state">
                    {phase === 'proposal-ready' || phase === 'proposal-hold' ? 'Ready for review' : 'Draft assembly'}
                  </span>
                </div>

                <div className="proposal-document-card">
                  <div className="proposal-document-top">
                    <div>
                      <span className="proposal-block-label">Proposal draft</span>
                      <div className="proposal-client-name">Northern Construction</div>
                      <div className="proposal-project-name">Sales workflow automation proposal</div>
                    </div>
                    <div className={`proposal-document-badge ${proposalStep >= 3 ? 'ready' : ''}`}>
                      {proposalStep >= 3 ? 'Ready for review' : 'Building'}
                    </div>
                  </div>

                  <div className="proposal-document-section">
                    <div className="proposal-document-heading">
                      <span>Scope of work</span>
                      <span>{proposalStep}/3 sections</span>
                    </div>

                    <div className="proposal-document-list">
                      {proposalSections.map((section, index) => {
                        const isVisible = proposalStep > index;
                        const isActive = activeProposalIndex === index;

                        return (
                          <div
                            key={section.title}
                            className={`proposal-document-item ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
                          >
                            <div className="proposal-document-copy">
                              <div className="proposal-document-item-title">{section.title}</div>
                              <div className="proposal-document-item-detail">{section.detail}</div>
                            </div>
                            <div className="proposal-document-meta">
                              <span className="proposal-document-source">{section.source}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`proposal-document-footer ${proposalStep >= 3 ? 'visible' : ''}`}>
                    <div className="proposal-document-footer-item">
                      <span>Pricing imported</span>
                      <strong>$11,300 total</strong>
                    </div>
                    <div className="proposal-document-footer-item">
                      <span>Supporting evidence</span>
                      <strong>1 case study attached</strong>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
