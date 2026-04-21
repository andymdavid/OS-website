
import React, { useState, useEffect, useRef } from 'react';
import './WingmanDemo.css';

interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const terminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Searching knowledge base for Sarah Chen' },
  { type: 'code', content: 'knowledge.query(owner="sarah.chen", status="active")' },
  { type: 'status', content: 'Found 4 active accounts' },
  { type: 'action', content: 'Pulling pending actions' },
  { type: 'code', content: 'tasks.filter(assignee="sarah.chen", due < "2026-04-25")' },
  { type: 'status', content: '6 tasks due before return' },
  { type: 'action', content: 'Retrieving process notes' },
  { type: 'code', content: 'docs.search(tag="sarah", type="process_note")' },
  { type: 'status', content: 'Linked 3 process documents' },
  { type: 'action', content: 'Compiling handover brief' },
  { type: 'code', content: 'handover.generate(owner="sarah.chen", period="2026-04-21")' },
  { type: 'status', content: 'Handover brief ready' },
];

interface HandoverAccount {
  name: string;
  status: string;
  deadline: string;
  note: string;
}

const handoverAccounts: HandoverAccount[] = [
  { name: 'Horizon Media', status: 'Proposal sent', deadline: 'Follow up Apr 22', note: 'Awaiting sign-off on phase 2 scope' },
  { name: 'Northern Construction', status: 'Active project', deadline: 'Milestone Apr 23', note: 'Weekly check-in moved to Tuesday' },
  { name: 'Redline Services', status: 'Onboarding', deadline: 'Kickoff Apr 21', note: 'Contract signed — setup docs in shared drive' },
  { name: 'Coastline Freight', status: 'Renewal due', deadline: 'Expires Apr 28', note: 'Spoke to Nina about extending 6 months' },
];

type Phase =
  | 'waiting'
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'brief-reveal'
  | 'brief-build'
  | 'hold'
  | 'fade-out';

export function WingmanDemo() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [displayedText, setDisplayedText] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showBrief, setShowBrief] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [briefBuildStep, setBriefBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Sarah's off next week — pull together a handover for her accounts";
  const typingSpeed = 35;
  const codeTypingSpeed = 20;

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

  // Auto-scroll terminal
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

    if (phase === 'typing') {
      if (charIndexRef.current < prompt.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prompt.slice(0, charIndexRef.current + 1));
          charIndexRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('sending'), 600);
      }
    } else if (phase === 'sending') {
      timeout = setTimeout(() => {
        setShowTerminal(true);
        setPhase('terminal-open');
      }, 400);
    } else if (phase === 'terminal-open') {
      timeout = setTimeout(() => setPhase('terminal-running'), 300);
    } else if (phase === 'terminal-running') {
      const currentStep = terminalSequence[stepIndexRef.current];

      if (!currentStep) {
        timeout = setTimeout(() => setPhase('terminal-close'), 600);
      } else if (currentStep.type === 'code') {
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, codeTypingSpeed);
        } else {
          setTerminalLines(prev => [...prev, currentStep]);
          setCurrentCodeText('');
          codeCharIndexRef.current = 0;
          stepIndexRef.current += 1;
          timeout = setTimeout(() => {}, 150);
        }
      } else {
        setTerminalLines(prev => [...prev, currentStep]);
        stepIndexRef.current += 1;
        timeout = setTimeout(() => {}, currentStep.type === 'action' ? 400 : 250);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      setShowChat(false);
      timeout = setTimeout(() => {
        setShowBrief(true);
        setBriefBuildStep(1);
        setPhase('brief-reveal');
      }, 400);
    } else if (phase === 'brief-reveal') {
      timeout = setTimeout(() => setPhase('brief-build'), 300);
    } else if (phase === 'brief-build') {
      const maxSteps = 6; // header, summary, 4 account rows
      if (briefBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setBriefBuildStep(prev => prev + 1);
        }, 300);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 2500);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('fade-out'), 2000);
    } else if (phase === 'fade-out') {
      setShowBrief(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowTerminal(false);
        setShowChat(true);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setBriefBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        setPhase('typing');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, briefBuildStep]);

  return (
    <div className="wingman-demo-modal" ref={containerRef}>
      <div className="wingman-demo">
        {/* Terminal Panel */}
        <div className={`wm-terminal-panel ${showTerminal ? 'visible' : ''}`}>
          <div className="wm-terminal-header">
            <span className="wm-terminal-title">Wingman</span>
            <span className="wm-terminal-status">
              <span className="wm-status-dot"></span>
              Processing
            </span>
          </div>
          <div className="wm-terminal-content" ref={terminalContentRef}>
            {terminalLines.map((line, index) => (
              <div key={index} className={`wm-terminal-line ${line.type}`}>
                {line.type === 'action' && <span className="wm-action-icon">●</span>}
                {line.type === 'status' && <span className="wm-status-icon">→</span>}
                {line.type === 'code' && <span className="wm-code-prefix">$</span>}
                <span className={line.type === 'code' ? 'wm-code-text' : ''}>
                  {line.content}
                </span>
              </div>
            ))}
            {currentCodeText && (
              <div className="wm-terminal-line code typing">
                <span className="wm-code-prefix">$</span>
                <span className="wm-code-text">{currentCodeText}</span>
                <span className="wm-cursor">▋</span>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className={`wm-chat-input-container ${showChat ? 'visible' : ''}`}>
          <div className="wm-chat-input-box">
            <div className="wm-chat-text">
              {displayedText}
              <span className={`wm-input-cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
            </div>
            <div className="wm-chat-input-footer">
              <button className="wm-attach-btn" aria-label="Attach file">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`wm-send-btn ${phase === 'sending' ? 'pressed' : ''}`}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Handover Brief Result */}
        <div className={`wm-app-result ${showBrief ? 'visible' : ''}`}>
          <div className={`wm-app-header ${briefBuildStep >= 1 ? 'visible' : ''}`}>
            <div className="wm-app-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Handover Brief</span>
            </div>
            <div className="wm-app-badge">Ready</div>
          </div>

          <div className={`wm-brief-summary ${briefBuildStep >= 2 ? 'visible' : ''}`}>
            <div className="wm-brief-summary-row">
              <span className="wm-brief-label">Covering for</span>
              <span className="wm-brief-value">Sarah Chen</span>
            </div>
            <div className="wm-brief-summary-row">
              <span className="wm-brief-label">Period</span>
              <span className="wm-brief-value">21–25 Apr</span>
            </div>
            <div className="wm-brief-summary-row">
              <span className="wm-brief-label">Active accounts</span>
              <span className="wm-brief-value">4</span>
            </div>
          </div>

          <div className="wm-brief-accounts">
            {handoverAccounts.map((account, index) => (
              <div key={index} className={`wm-brief-account ${briefBuildStep >= index + 3 ? 'visible' : ''}`}>
                <div className="wm-brief-account-top">
                  <span className="wm-brief-account-name">{account.name}</span>
                  <span className="wm-brief-account-status">{account.status}</span>
                </div>
                <div className="wm-brief-account-detail">
                  <span className="wm-brief-account-deadline">{account.deadline}</span>
                  <span className="wm-brief-account-note">{account.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
