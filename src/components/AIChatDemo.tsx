
import React, { useState, useEffect, useRef } from 'react';
import './AIChatDemo.css';

interface Scenario {
  message: string;
  agentSteps: string[];
  notification: {
    icon: string;
    title: string;
    subtitle: string;
  };
}

const scenarios: Scenario[] = [
  {
    message: "Pull together a quote for Horizon Media based on the scope we discussed last week",
    agentSteps: [
      '● Thinking...',
      '● Finding meeting notes from Horizon Media',
      '● Extracting scope items and quantities',
      '● Pulling current pricing from rate card',
      '● Calculating line items and totals',
      '● Generating quote document',
      '✓ Quote ready for review',
    ],
    notification: {
      icon: 'document',
      title: 'Quote generated: Horizon Media',
      subtitle: '$14,200 · 6 line items · Ready to send',
    },
  },
  {
    message: "Draft a proposal for Northern Construction covering the three phases we talked about",
    agentSteps: [
      '● Thinking...',
      '● Reviewing CRM notes for Northern Construction',
      '● Pulling scope from previous proposals',
      '● Structuring three-phase delivery plan',
      '● Adding pricing and timeline estimates',
      '● Formatting proposal document',
      '✓ Proposal draft ready',
    ],
    notification: {
      icon: 'document',
      title: 'Proposal draft: Northern Construction',
      subtitle: '3 phases · 12-week timeline · Ready to review',
    },
  },
  {
    message: "Check which quotes from this month haven't had a response and draft follow-ups",
    agentSteps: [
      '● Thinking...',
      '● Scanning quotes sent in April',
      '● Cross-referencing with reply activity',
      '● Found 4 quotes without response',
      '● Drafting personalised follow-ups',
      '● Queuing emails for review',
      '✓ 4 follow-ups drafted',
    ],
    notification: {
      icon: 'email',
      title: '4 follow-up emails drafted',
      subtitle: 'Pending quotes · Ready to send',
    },
  },
  {
    message: "Update the Mitchell proposal with the revised pricing and send it through",
    agentSteps: [
      '● Thinking...',
      '● Opening Mitchell proposal v2',
      '● Applying revised rate card',
      '● Recalculating totals across 4 line items',
      '● Updating PDF document',
      '● Sending to client via email',
      '✓ Proposal sent',
    ],
    notification: {
      icon: 'email',
      title: 'Proposal sent: Mitchell & Co',
      subtitle: 'Updated pricing · $9,800 · Delivered',
    },
  },
];

type Phase =
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'notification'
  | 'hold'
  | 'reset';

export function AIChatDemo() {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<Phase | 'waiting'>('waiting');
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const charIndexRef = useRef(0);
  const lineIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenario = scenarios[currentScenario];
  const typingSpeed = 35;
  const lineDelay = 400;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('typing');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'typing') {
      if (charIndexRef.current < scenario.message.length) {
        timeout = setTimeout(() => {
          setDisplayedText(scenario.message.slice(0, charIndexRef.current + 1));
          charIndexRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase('sending');
        }, 600);
      }
    } else if (phase === 'sending') {
      timeout = setTimeout(() => {
        setShowTerminal(true);
        setPhase('terminal-open');
      }, 400);
    } else if (phase === 'terminal-open') {
      timeout = setTimeout(() => {
        setPhase('terminal-running');
      }, 300);
    } else if (phase === 'terminal-running') {
      if (lineIndexRef.current < scenario.agentSteps.length) {
        timeout = setTimeout(() => {
          setTerminalLines(scenario.agentSteps.slice(0, lineIndexRef.current + 1));
          lineIndexRef.current += 1;
        }, lineDelay);
      } else {
        timeout = setTimeout(() => {
          setPhase('terminal-close');
        }, 800);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      timeout = setTimeout(() => {
        setShowNotification(true);
        setPhase('notification');
      }, 400);
    } else if (phase === 'notification') {
      timeout = setTimeout(() => {
        setPhase('hold');
      }, 3000);
    } else if (phase === 'hold') {
      timeout = setTimeout(() => {
        setPhase('reset');
      }, 2000);
    } else if (phase === 'reset') {
      // Clear visuals first
      setShowNotification(false);
      setShowTerminal(false);
      // Wait, then reset text and move to next scenario
      timeout = setTimeout(() => {
        setTerminalLines([]);
        setDisplayedText('');
        charIndexRef.current = 0;
        lineIndexRef.current = 0;
        setCurrentScenario((prev) => (prev + 1) % scenarios.length);
        setPhase('typing');
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, scenario.message, scenario.agentSteps]);

  return (
    <div className="ai-chat-demo-modal" ref={containerRef}>
      <div className="ai-chat-demo">
        {/* Terminal Panel */}
      <div className={`terminal-panel ${showTerminal ? 'visible' : ''}`}>
        <div className="terminal-header">
          <span className="terminal-title">Wingman</span>
          <span className="terminal-status">
            <span className="status-dot"></span>
            Processing
          </span>
        </div>
        <div className="terminal-content">
          {terminalLines.map((line, index) => (
            <div
              key={index}
              className={`terminal-line ${line.startsWith('✓') ? 'success' : ''}`}
            >
              {line}
            </div>
          ))}
          {phase === 'terminal-running' && lineIndexRef.current < scenario.agentSteps.length && (
            <span className="terminal-cursor">▋</span>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="chat-input-container">
        <div className="chat-input-box">
          <div className="chat-text">
            {displayedText}
            <span className={`cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
          </div>
          <div className="chat-input-footer">
            <button className="attach-btn" aria-label="Attach file">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`send-btn ${phase === 'sending' ? 'pressed' : ''}`}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      </div>

      {/* Notification - positioned relative to modal */}
      <div className={`notification-card ${showNotification ? 'visible' : ''}`}>
        <div className={`notification-icon ${scenario.notification.icon}-icon`}>
          {scenario.notification.icon === 'calendar' && <span>31</span>}
          {scenario.notification.icon === 'email' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {scenario.notification.icon === 'document' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {scenario.notification.icon === 'tasks' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="notification-content">
          <div className="notification-title">{scenario.notification.title}</div>
          <div className="notification-subtitle">{scenario.notification.subtitle}</div>
        </div>
        <div className="notification-time">now</div>
      </div>
    </div>
  );
}
