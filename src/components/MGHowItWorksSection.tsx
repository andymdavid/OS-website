import { useEffect, useRef, useState } from 'react';

import './MGHowItWorksSection.css';

const stages = [
  {
    number: '01',
    label: 'Free diagnostic',
    title: 'Free AI Audit',
    description:
      'A short questionnaire for your team followed by a working call to validate the findings and identify where the opportunity is clearest. You walk away with a prioritised view of where an AI system would have the biggest impact on your margins, capital, and risk and a clear picture of what building it would involve.',
    detailTitle: 'What comes out of it',
    detail:
      'A prioritised workflow, a clearer view of the commercial upside, and a practical recommendation on what to build first.',
  },
  {
    number: '02',
    label: 'First project',
    title: 'Develop Custom AI System',
    description:
      'We scope and build one focused AI system around a workflow identified in the audit. The engagement has a defined start, a defined end, and a working system delivered into your business as the output, and built around how your business actually operates.',
    detailTitle: 'What comes out of it',
    detail:
      'A working AI system delivered into your business, with clear scope, handover, and infrastructure your team can actually use.',
  },
  {
    number: '03',
    label: 'Ongoing relationship',
    title: 'Marginal Gains',
    description:
      'For businesses that want to keep going after the first system is live, Marginal Gains is how the work compounds. Existing systems get sharper, new workflows get brought into scope, and AI transformation happens through steady operational gains over time rather than one massive project.',
    detailTitle: 'What supports it',
    detail:
      'Ongoing system improvement, support as your operations evolve, and Wingmen Suite as the operating environment your systems run inside.',
  },
];

const stageVisualContent = {
  'Free AI Audit': {
    header: 'Audit Process',
    status: 'Step 1',
    items: [
      {
        number: '01',
        label: 'Team questionnaire',
        detail: 'Short input from your key people',
      },
      {
        number: '02',
        label: 'Working session',
        detail: 'Review the findings and test where the opportunity is clearest',
      },
      {
        number: '03',
        label: 'Our recommendations',
        detail: 'Leave with a clearer view of what to build first',
      },
    ],
    resultLabel: 'Output',
    resultDetail: 'Clear priority workflow and a practical next step',
    visualClassName: 'mg-audit-visual',
  },
  'Develop Custom AI System': {
    header: 'Project Structure',
    status: 'Step 2',
    items: [
      {
        number: '01',
        label: 'Scope',
        detail: 'Define one workflow, one system, and a clear delivery target',
      },
      {
        number: '02',
        label: 'Build',
        detail: 'Create the system around how the workflow actually operates',
      },
      {
        number: '03',
        label: 'Deliver',
        detail: 'Put a working system into the business with a defined endpoint',
      },
    ],
    resultLabel: 'Output',
    resultDetail: 'One working AI system delivered into the business',
    visualClassName: 'mg-build-visual',
  },
  'Marginal Gains': {
    header: 'Ongoing Relationship',
    status: 'Step 3',
    items: [
      {
        number: '01',
        label: 'Improve',
        detail: 'Sharpen the systems already running in the business',
      },
      {
        number: '02',
        label: 'Support',
        detail: 'Keep live systems reliable and useful as the business grows and evolves',
      },
      {
        number: '03',
        label: 'Build next',
        detail: 'Bring the next high-value workflow into scope over time',
      },
    ],
    resultLabel: 'Supported by',
    resultDetail: 'Wingmen Suite for visibility, support, and ongoing system development',
    visualClassName: 'mg-retainer-visual',
  },
} as const;

export function MGHowItWorksSection() {
  const [visibleCounts, setVisibleCounts] = useState<number[]>(() => stages.map(() => 0));
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const startedStages = useRef<Set<number>>(new Set());
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          const stageIndex = Number(entry.target.getAttribute('data-stage-index'));

          if (Number.isNaN(stageIndex) || startedStages.current.has(stageIndex)) {
            return;
          }

          startedStages.current.add(stageIndex);

          [1, 2, 3, 4].forEach((count, stepIndex) => {
            const timeoutId = window.setTimeout(() => {
              setVisibleCounts(current =>
                current.map((value, index) => (index === stageIndex ? count : value))
              );
            }, 260 + stepIndex * 420);

            timeoutsRef.current.push(timeoutId);
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.4,
      }
    );

    stageRefs.current.forEach((element, index) => {
      if (!element) {
        return;
      }

      element.setAttribute('data-stage-index', String(index));
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(timeoutId => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <section id="how-it-works" className="section mg-how-it-works-section">
      <div className="section-container-wide">
        <div className="mg-how-it-works-hero">
          <div className="intro-pill fade-in">HOW IT WORKS</div>
          <h2 className="section-heading fade-in fade-in-stagger-1">
            Start with a free AI audit of your business.
          </h2>
          <p className="mg-how-it-works-subpara fade-in fade-in-stagger-2">
            A structured look at how your business operates, where time and money are being lost,
            and where an AI system would have the clearest impact on your margins, capital, and
            risk.
          </p>
        </div>

        <div className="mg-how-it-works-flow">
          {stages.map((stage, index) => (
            <section
              key={stage.title}
              className={`mg-flow-stage ${index % 2 === 1 ? 'is-reversed' : ''}`}
            >
              <div className="mg-flow-copy">
                <div className="mg-flow-meta">
                  <span className="mg-flow-number">{stage.number}</span>
                  <span className="mg-flow-label">{stage.label}</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>

                <div className="mg-flow-detail-block">
                  <span className="mg-flow-detail-title">{stage.detailTitle}</span>
                  <p>{stage.detail}</p>
                </div>

                {stage.title === 'Free AI Audit' && (
                  <a href="/contact" className="mg-flow-cta">
                    Book a Free AI Audit
                  </a>
                )}
              </div>

              <div className="mg-flow-visual">
                {(() => {
                  const visual = stageVisualContent[stage.title as keyof typeof stageVisualContent];

                  return (
                    <div
                      ref={element => {
                        stageRefs.current[index] = element;
                      }}
                      className={visual.visualClassName}
                    >
                      <div className="mg-visual-header">
                        <span>{visual.header}</span>
                        <span className="mg-visual-status">{visual.status}</span>
                      </div>
                      <div className="mg-process-list">
                        {visual.items.map((item, itemIndex) => (
                          <div
                            key={item.number}
                            className={`mg-process-item ${
                              visibleCounts[index] > itemIndex ? 'is-visible' : ''
                            }`}
                          >
                            <span className="mg-process-item-number">{item.number}</span>
                            <div className="mg-process-item-copy">
                              <span>{item.label}</span>
                              <strong>{item.detail}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`mg-process-result ${
                          visibleCounts[index] > visual.items.length ? 'is-visible' : ''
                        }`}
                      >
                        <span>{visual.resultLabel}</span>
                        <strong>{visual.resultDetail}</strong>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
