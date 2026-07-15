import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Boxes,
  CheckCircle2,
  CloudCog,
  DatabaseZap,
  GitBranch,
  Layers3,
  Route,
  Scale3D,
  ShieldCheck,
  Shuffle,
} from 'lucide-react';
import './AIChatDemo.css';
import './HomeDuplicateWingmanBenefits.css';

interface TerminalWorkflowStep {
  type: 'agent' | 'human' | 'output' | 'code' | 'success';
  content: string;
}

const controlTerminalSequence: TerminalWorkflowStep[] = [
  { type: 'human', content: 'Run proposal_margin_review for Horizon Media' },
  { type: 'agent', content: 'Wingman received workflow request' },
  { type: 'code', content: 'policy = load_policy("commercial_work")' },
  { type: 'output', content: 'policy.data_boundary = private' },
  { type: 'output', content: 'policy.approval_required = true' },
  { type: 'agent', content: 'Classifying task requirements' },
  { type: 'code', content: 'requirements = classify(task)' },
  { type: 'output', content: 'needs: reasoning, pricing_context, low_latency' },
  { type: 'agent', content: 'Ranking available models' },
  { type: 'code', content: 'rank(models, by=["reasoning", "cost", "availability"])' },
  { type: 'output', content: 'primary_model unavailable: rate_limit_exceeded' },
  { type: 'code', content: 'route = failover("fallback_reasoning_model")' },
  { type: 'success', content: 'fallback route selected without workflow change' },
  { type: 'agent', content: 'Adding approval checkpoint before client send' },
  { type: 'code', content: 'approvals.create(stage="commercial_review")' },
  { type: 'success', content: 'audit trail written · ready for review' },
];

const leverageTerminalSequence: TerminalWorkflowStep[] = [
  { type: 'human', content: 'Prepare quote packs for open opportunities' },
  { type: 'agent', content: 'Wingman loaded quote_pack_workflow' },
  { type: 'code', content: 'records = crm.opportunities(stage="proposal")' },
  { type: 'output', content: 'found 18 open opportunities' },
  { type: 'code', content: 'context = gather(records, notes, rate_cards, files)' },
  { type: 'output', content: 'Horizon Media: scope notes + current rate card attached' },
  { type: 'output', content: 'Northern Group: discovery call + delivery assumptions attached' },
  { type: 'agent', content: 'Wingman drafting proposal packs' },
  { type: 'code', content: 'drafts = generate_quote_packs(context)' },
  { type: 'output', content: 'created /proposals/horizon-media/quote-pack-v1.pdf' },
  { type: 'output', content: 'created /proposals/northern-group/quote-pack-v1.pdf' },
  { type: 'agent', content: 'Wingman checking margin and risk' },
  { type: 'code', content: 'checks = margin_review(drafts, threshold=0.32)' },
  { type: 'output', content: '5 packs need commercial review before sending' },
  { type: 'code', content: 'approvals.queue(checks, owner="commercial")' },
  { type: 'success', content: '13 quote packs ready · 5 queued for approval' },
];

type TerminalWorkflowPhase =
  | 'waiting'
  | 'terminal-open'
  | 'terminal-running'
  | 'hold'
  | 'result'
  | 'result-hold'
  | 'reset';

function TerminalWorkflowDemo({
  sequence,
  title,
  status,
  result,
}: {
  sequence: TerminalWorkflowStep[];
  title: string;
  status: string;
  result?: ReactNode;
}) {
  const [phase, setPhase] = useState<TerminalWorkflowPhase>('waiting');
  const [terminalLines, setTerminalLines] = useState<TerminalWorkflowStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setShowTerminal(true);
          setPhase('terminal-open');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalLines, currentCodeText]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'terminal-open') {
      timeout = setTimeout(() => setPhase('terminal-running'), 350);
    } else if (phase === 'terminal-running') {
      const currentStep = sequence[stepIndexRef.current];

      if (!currentStep) {
        timeout = setTimeout(() => setPhase('hold'), 1400);
      } else if (currentStep.type === 'code') {
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, 18);
        } else {
          timeout = setTimeout(() => {
            setTerminalLines((prev) => [...prev, currentStep]);
            setCurrentCodeText('');
            codeCharIndexRef.current = 0;
            stepIndexRef.current += 1;
          }, 140);
        }
      } else {
        timeout = setTimeout(() => {
          setTerminalLines((prev) => [...prev, currentStep]);
          stepIndexRef.current += 1;
        }, currentStep.type === 'agent' ? 420 : 260);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => {
        if (result) {
          setShowTerminal(false);
          setPhase('result');
        } else {
          setPhase('reset');
        }
      }, result ? 650 : 2200);
    } else if (phase === 'result') {
      timeout = setTimeout(() => setPhase('result-hold'), 2600);
    } else if (phase === 'result-hold') {
      timeout = setTimeout(() => setPhase('reset'), 1800);
    } else if (phase === 'reset') {
      setShowTerminal(false);
      timeout = setTimeout(() => {
        setTerminalLines([]);
        setCurrentCodeText('');
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        setShowTerminal(true);
        setPhase('terminal-open');
      }, 520);
    }

    return () => clearTimeout(timeout);
  }, [phase, currentCodeText, terminalLines.length]);

  return (
    <div className="control-resilience-demo" ref={containerRef} aria-hidden="true">
      <div className="control-existing-demo">
        <div className={`terminal-panel control-existing-terminal ${showTerminal ? 'visible' : ''}`}>
          <div className="terminal-header">
            <span className="terminal-title">{title}</span>
            <span className="terminal-status">
              <span className="status-dot" />
              {status}
            </span>
          </div>
          <div className="terminal-content control-existing-terminal-content" ref={terminalContentRef}>
            {terminalLines.map((line, index) => (
              <div
                className={`terminal-line control-terminal-line control-terminal-line-${line.type} ${
                  line.type === 'success' ? 'success' : ''
                }`}
                key={`${line.content}-${index}`}
              >
                {line.type === 'code' && '$ '}
                {line.type === 'agent' && 'wingman > '}
                {line.type === 'human' && 'user > '}
                {line.type === 'output' && '  '}
                {line.type === 'success' && '✓ '}
                {line.content}
              </div>
            ))}
            {currentCodeText && (
              <div className="terminal-line control-existing-code-line">
                $ {currentCodeText}
                <span className="terminal-cursor">▋</span>
              </div>
            )}
            {phase === 'terminal-running' && !currentCodeText && stepIndexRef.current < sequence.length && (
              <span className="terminal-cursor">▋</span>
            )}
          </div>
        </div>

        {result && <div className={`wingman-work-result ${phase === 'result' || phase === 'result-hold' ? 'visible' : ''}`}>{result}</div>}
      </div>
    </div>
  );
}

function QuotePackResult() {
  return (
    <div className="quote-pack-result">
      <div className="quote-pack-header">
        <span>Quote Pack</span>
        <em>Ready</em>
      </div>

      <div className="quote-pack-title">
        <strong>Horizon Media</strong>
        <p>Proposal pack assembled from CRM notes, rate card, scope files, and margin rules.</p>
      </div>

      <div className="quote-pack-lines">
        <div>
          <span>Scope Summary</span>
          <b>Attached</b>
        </div>
        <div>
          <span>Commercial Terms</span>
          <b>Checked</b>
        </div>
        <div>
          <span>Margin Review</span>
          <b>Approved</b>
        </div>
      </div>

      <div className="quote-pack-footer">
        <span>/proposals/horizon-media/quote-pack-v1.pdf</span>
        <b>CRM updated</b>
      </div>
    </div>
  );
}

const sections = [
  {
    title: 'Control & Resilience',
    description:
      'Wingman gives your AI work a durable operating layer, so the business is not trapped inside one model, one vendor, or one fragile workflow.',
    variant: 'control',
    visual: <TerminalWorkflowDemo sequence={controlTerminalSequence} title="Autopilot" status="Routing" />,
    visualImage: '/grid-internal-knowledge.webp',
    benefits: [
      {
        icon: Shuffle,
        title: 'Model choice',
        description: 'Use the right model for each task.',
      },
      {
        icon: GitBranch,
        title: 'No provider lock-in',
        description: 'Switch models without rebuilding workflows.',
      },
      {
        icon: CloudCog,
        title: 'Open source foundation',
        description: 'Keep control of the infrastructure your AI work depends on.',
      },
      {
        icon: ShieldCheck,
        title: 'Human approval',
        description: 'Keep people in control of consequential work.',
      },
      {
        icon: Scale3D,
        title: 'Failover ready',
        description: 'Keep work moving through outages and limits.',
      },
    ],
  },
  {
    title: 'Operating Leverage',
    description:
      'Wingman turns agents, records, approvals, tools, and workflows into reusable infrastructure instead of isolated AI experiments.',
    variant: 'leverage',
    visual: (
      <TerminalWorkflowDemo
        sequence={leverageTerminalSequence}
        title="Autopilot"
        status="Running"
        result={<QuotePackResult />}
      />
    ),
    visualImage: '/grid-finance-billing.webp',
    benefits: [
      {
        icon: Layers3,
        title: 'Reusable workflows',
        description: 'Build once, then reuse across teams.',
      },
      {
        icon: DatabaseZap,
        title: 'Business memory',
        description: 'Ground AI in records, context, and decisions.',
      },
      {
        icon: Boxes,
        title: 'Tool connections',
        description: 'Connect agents to the systems your team uses.',
      },
      {
        icon: Route,
        title: 'Multi-step work',
        description: 'Chain research, drafting, approval, and delivery.',
      },
      {
        icon: CheckCircle2,
        title: 'Workflow scale',
        description: 'Run defined work across hundreds of records.',
      },
    ],
  },
];

export function HomeDuplicateWingmanBenefits() {
  return (
    <section className="home-duplicate-wingman-benefits">
      {sections.map((section, index) => {
        const isReversed = index === 1;

        return (
          <article
            className={`wingman-benefits-screen wingman-benefits-screen-${section.variant}`}
            key={section.title}
          >
            <div className="section-container-wide">
              {index === 0 && (
                <div className="wingman-benefits-section-intro">
                  <div className="intro-pill fade-in">WHY WINGMAN</div>
                  <h2 className="section-heading fade-in fade-in-stagger-1">
                    The operating layer behind practical AI work.
                  </h2>
                  <p className="fade-in fade-in-stagger-2">
                    Wingman gives your business a stable foundation for using AI safely, reliably, and
                    repeatedly across the work that matters.
                  </p>
                </div>
              )}

              <div className={`wingman-benefits-layout ${isReversed ? 'wingman-benefits-layout-reversed' : ''}`}>
                <div
                  className="wingman-benefits-visual-frame fade-in"
                  style={{ '--benefit-bg': `url('${section.visualImage}')` } as React.CSSProperties}
                >
                  {section.visual}
                </div>

                <div className="wingman-benefits-copy fade-in fade-in-stagger-1">
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>

                  <div className="wingman-benefits-list">
                    {section.benefits.map((benefit) => {
                      const Icon = benefit.icon;

                      return (
                        <div className="wingman-benefit-row" key={benefit.title}>
                          <div className="wingman-benefit-row-icon" aria-hidden="true">
                            <Icon />
                          </div>
                          <div>
                            <h4>{benefit.title}</h4>
                            <p>{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
