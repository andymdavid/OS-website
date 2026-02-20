
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
    message: "Create an event for Tuesday at 2:00 PM and attach all emails I haven't responded to yet but should.",
    agentSteps: [
      '● Thinking...',
      '● Reading calendar availability',
      '● Scanning inbox for pending replies',
      '● Found 3 emails requiring response',
      '● Creating event "Follow up time"',
      '● Attaching email threads',
      '✓ Event created successfully',
    ],
    notification: {
      icon: 'calendar',
      title: 'New event "Follow up time"',
      subtitle: 'scheduled for Tuesday at 2:00 PM',
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
  const [phase, setPhase] = useState<Phase>('typing');
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentScenario] = useState(0);
  const charIndexRef = useRef(0);
  const lineIndexRef = useRef(0);

  const scenario = scenarios[currentScenario];
  const typingSpeed = 35;
  const lineDelay = 400;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

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
      // Wait, then reset text and restart
      timeout = setTimeout(() => {
        setTerminalLines([]);
        setDisplayedText('');
        charIndexRef.current = 0;
        lineIndexRef.current = 0;
        setPhase('typing');
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, scenario.message, scenario.agentSteps]);

  return (
    <div className="ai-chat-demo">
      {/* Terminal Panel */}
      <div className={`terminal-panel ${showTerminal ? 'visible' : ''}`}>
        <div className="terminal-header">
          <span className="terminal-title">Agent Output</span>
          <span className="terminal-status">
            <span className="status-dot"></span>
            Running
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

      {/* Notification */}
      <div className={`notification-card ${showNotification ? 'visible' : ''}`}>
        <div className="notification-icon calendar-icon">
          <span>31</span>
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
