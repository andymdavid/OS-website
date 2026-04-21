import { useEffect, useRef, useState } from 'react';
import './PreMeetingBriefingsDemo.css';

type Phase =
  | 'waiting'
  | 'context'
  | 'context-build'
  | 'context-hold'
  | 'briefing'
  | 'briefing-1'
  | 'briefing-2'
  | 'briefing-3'
  | 'briefing-4'
  | 'briefing-hold'
  | 'delivery'
  | 'delivery-1'
  | 'delivery-2'
  | 'delivery-3'
  | 'delivery-hold';

interface ContextLine {
  type: 'command' | 'status';
  content: string;
}

interface BriefingSection {
  title: string;
  bullets: string[];
}

const contextLines: ContextLine[] = [
  { type: 'command', content: 'wingman load emails --account "Northern Construction"' },
  { type: 'status', content: 'Recent email thread found · 12 messages in 14 days' },
  { type: 'command', content: 'wingman fetch crm-notes --latest' },
  { type: 'status', content: 'CRM notes synced · quarterly review scheduled' },
  { type: 'command', content: 'wingman check open-actions --owner account-team' },
  { type: 'status', content: '3 unresolved actions and 1 delivery risk flagged' },
  { type: 'command', content: 'wingman load previous-meeting-summary' },
  { type: 'status', content: 'Last review summary attached to briefing context' },
];

const briefingSections: BriefingSection[] = [
  {
    title: 'Since last meeting',
    bullets: [
      'Client approved rollout scope for sales workflow automation.',
      'Delivery team completed discovery and integration planning.',
    ],
  },
  {
    title: 'Open issues',
    bullets: [
      'CRM field mapping still needs client confirmation.',
      'One reporting dependency may push onboarding by 3 days.',
    ],
  },
  {
    title: 'Talking points',
    bullets: [
      'Confirm timeline for CRM sign-off.',
      'Walk through phased rollout and ownership.',
      'Agree success metrics for the first 30 days.',
    ],
  },
  {
    title: 'Recommended next actions',
    bullets: [
      'Send revised delivery plan after the meeting.',
      'Book working session with ops lead and CRM admin.',
    ],
  },
];

export function PreMeetingBriefingsDemo() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [visibleContextLines, setVisibleContextLines] = useState(0);
  const [briefingStep, setBriefingStep] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [deliveryStep, setDeliveryStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('context');
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

    if (phase === 'context') {
      setVisibleContextLines(0);
      setBriefingStep(0);
      setActiveSectionIndex(null);
      setDeliveryStep(0);
      timeout = setTimeout(() => {
        setVisibleContextLines(1);
        setPhase('context-build');
      }, 750);
    } else if (phase === 'context-build') {
      if (visibleContextLines < contextLines.length) {
        timeout = setTimeout(() => {
          setVisibleContextLines((current) => current + 1);
        }, 320);
      } else {
        timeout = setTimeout(() => {
          setPhase('context-hold');
        }, 700);
      }
    } else if (phase === 'context-hold') {
      timeout = setTimeout(() => {
        setPhase('briefing');
      }, 650);
    } else if (phase === 'briefing') {
      timeout = setTimeout(() => {
        setBriefingStep(1);
        setActiveSectionIndex(0);
        setPhase('briefing-1');
      }, 550);
    } else if (phase === 'briefing-1') {
      timeout = setTimeout(() => {
        setBriefingStep(2);
        setActiveSectionIndex(1);
        setPhase('briefing-2');
      }, 850);
    } else if (phase === 'briefing-2') {
      timeout = setTimeout(() => {
        setBriefingStep(3);
        setActiveSectionIndex(2);
        setPhase('briefing-3');
      }, 850);
    } else if (phase === 'briefing-3') {
      timeout = setTimeout(() => {
        setBriefingStep(4);
        setActiveSectionIndex(3);
        setPhase('briefing-4');
      }, 850);
    } else if (phase === 'briefing-4') {
      timeout = setTimeout(() => {
        setActiveSectionIndex(null);
        setPhase('briefing-hold');
      }, 1100);
    } else if (phase === 'briefing-hold') {
      timeout = setTimeout(() => {
        setPhase('delivery');
      }, 650);
    } else if (phase === 'delivery') {
      timeout = setTimeout(() => {
        setDeliveryStep(1);
        setPhase('delivery-1');
      }, 500);
    } else if (phase === 'delivery-1') {
      timeout = setTimeout(() => {
        setDeliveryStep(2);
        setPhase('delivery-2');
      }, 700);
    } else if (phase === 'delivery-2') {
      timeout = setTimeout(() => {
        setDeliveryStep(3);
        setPhase('delivery-3');
      }, 700);
    } else if (phase === 'delivery-3') {
      timeout = setTimeout(() => {
        setPhase('delivery-hold');
      }, 1500);
    } else if (phase === 'delivery-hold') {
      timeout = setTimeout(() => {
        setPhase('context');
      }, 1400);
    }

    return () => clearTimeout(timeout);
  }, [phase, visibleContextLines]);

  const isContextScreen =
    phase === 'context' || phase === 'context-build' || phase === 'context-hold';
  const isBriefingScreen =
    phase === 'briefing' ||
    phase === 'briefing-1' ||
    phase === 'briefing-2' ||
    phase === 'briefing-3' ||
    phase === 'briefing-4' ||
    phase === 'briefing-hold';
  const isDeliveryScreen =
    phase === 'delivery' ||
    phase === 'delivery-1' ||
    phase === 'delivery-2' ||
    phase === 'delivery-3' ||
    phase === 'delivery-hold';

  return (
    <div className="briefings-demo-shell" ref={containerRef}>
      <div className="briefings-demo-panel">
        <div className="briefings-demo-header">
          <div>
            <h4>Pre-Meeting Context</h4>
          </div>
          <div className="briefings-demo-status">
            <span className="briefings-demo-status-dot"></span>
            Agent active
          </div>
        </div>

        <div className="briefings-stage-stack">
          <section className="briefings-stage-screen visible">
            {isContextScreen && (
              <>
                <div className="briefings-screen-title-row">
                  <span className="briefings-screen-label">Inputs</span>
                  <span className="briefings-screen-state">Context loading</span>
                </div>

                <div className="briefings-terminal-panel">
                  <div className="briefings-terminal-header">
                    <span>wingman session</span>
                    <span className="briefings-terminal-pill">assembling context</span>
                  </div>

                  <div className="briefings-terminal-body">
                    {contextLines.slice(0, visibleContextLines).map((line, index) => (
                      <div key={`${line.content}-${index}`} className={`briefings-terminal-line ${line.type}`}>
                        <span className="briefings-terminal-prefix">
                          {line.type === 'command' ? '$' : '✓'}
                        </span>
                        <span>{line.content}</span>
                      </div>
                    ))}

                    {visibleContextLines < contextLines.length && (
                      <div className="briefings-terminal-cursor-row">
                        <span className="briefings-terminal-prefix">$</span>
                        <span className="briefings-terminal-cursor">▋</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {isBriefingScreen && (
              <>
                <div className="briefings-screen-title-row">
                  <span className="briefings-screen-label">Briefing</span>
                  <span className="briefings-screen-state">
                    {briefingStep >= 4 ? 'Ready to share' : 'Briefing build'}
                  </span>
                </div>

                <div className="briefings-document-card">
                  <div className="briefings-document-top">
                    <div>
                      <span className="briefings-block-label">Client briefing</span>
                      <div className="briefings-client-name">Northern Construction</div>
                      <div className="briefings-meeting-name">Quarterly review · 14:30 today</div>
                    </div>
                    <div className={`briefings-document-badge ${briefingStep >= 4 ? 'ready' : ''}`}>
                      {briefingStep >= 4 ? 'Ready to send' : 'Building'}
                    </div>
                  </div>

                  <div className="briefings-meta-row">
                    <div className="briefings-meta-card">
                      <span>Attendees</span>
                      <strong>Account lead, ops director, CRM admin</strong>
                    </div>
                    <div className="briefings-meta-card">
                      <span>Last contact</span>
                      <strong>Email thread updated 2 hrs ago</strong>
                    </div>
                  </div>

                  <div className="briefings-sections-list">
                    {briefingSections.map((section, index) => {
                      const isVisible = briefingStep > index;
                      const isActive = activeSectionIndex === index;

                      return (
                        <div
                          key={section.title}
                          className={`briefings-section-card ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
                        >
                          <div className="briefings-section-title">{section.title}</div>
                          <div className="briefings-section-bullets">
                            {section.bullets.map((bullet) => (
                              <div key={bullet} className="briefings-section-bullet">
                                <span>•</span>
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {isDeliveryScreen && (
              <>
                <div className="briefings-screen-title-row">
                  <span className="briefings-screen-label">Delivery</span>
                  <span className="briefings-screen-state">Handoff</span>
                </div>

                <div className="briefings-delivery-card">
                  <div className="briefings-delivery-top">
                    <div>
                      <span className="briefings-block-label">Briefing dispatch</span>
                      <div className="briefings-delivery-title">Quarterly review prep completed</div>
                    </div>
                    <div className={`briefings-delivery-badge ${deliveryStep >= 3 ? 'ready' : ''}`}>
                      {deliveryStep >= 3 ? 'Ready 30 mins early' : 'Sending'}
                    </div>
                  </div>

                  <div className="briefings-delivery-list">
                    <div className={`briefings-delivery-item ${deliveryStep >= 1 ? 'visible' : ''}`}>
                      <div className="briefings-delivery-channel">Email</div>
                      <div className="briefings-delivery-copy">Briefing sent to account lead</div>
                      <div className="briefings-delivery-state">Sent</div>
                    </div>
                    <div className={`briefings-delivery-item ${deliveryStep >= 2 ? 'visible' : ''}`}>
                      <div className="briefings-delivery-channel">Calendar</div>
                      <div className="briefings-delivery-copy">Brief attached to event notes</div>
                      <div className="briefings-delivery-state">Attached</div>
                    </div>
                    <div className={`briefings-delivery-item ${deliveryStep >= 3 ? 'visible' : ''}`}>
                      <div className="briefings-delivery-channel">Slack</div>
                      <div className="briefings-delivery-copy">Delivery channel updated with talking points</div>
                      <div className="briefings-delivery-state">Posted</div>
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
