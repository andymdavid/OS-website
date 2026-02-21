
import React, { useState, useEffect, useRef } from 'react';
import './DataAnalysisDemo.css';

interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const terminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Connecting to Xero' },
  { type: 'status', content: 'Authenticated' },
  { type: 'action', content: 'Loading receivables' },
  { type: 'code', content: 'invoices = xero.get_invoices(status="AUTHORISED")' },
  { type: 'status', content: 'Retrieved 847 invoices' },
  { type: 'action', content: 'Calculating aging brackets' },
  { type: 'code', content: 'aged = invoices.groupby(aging_bucket).sum()' },
  { type: 'code', content: 'overdue = aged[aged.days > 30]' },
  { type: 'status', content: 'Found 23 overdue accounts' },
  { type: 'action', content: 'Analysing payment patterns' },
  { type: 'code', content: 'risk_score = model.predict_collection(overdue)' },
  { type: 'action', content: 'Prioritising follow-ups' },
  { type: 'code', content: 'priority = overdue.sort_values([\"risk\", \"amount\"])' },
  { type: 'status', content: 'Analysis complete' },
];

const accounts = [
  { name: 'Mitchell & Co', amount: 18400, days: 75, risk: 'high' },
  { name: 'Horizon Media', amount: 12200, days: 45, risk: 'medium' },
  { name: 'Northern Group', amount: 8600, days: 32, risk: 'low' },
];

const notifications = [
  { title: 'Payment reminder sent', subtitle: 'Mitchell & Co · $18,400 overdue' },
  { title: 'Follow-up email sent', subtitle: 'Horizon Media · $12,200 at 45 days' },
  { title: 'Invoice resent', subtitle: 'Northern Group · $8,600 due' },
  { title: 'Statement sent', subtitle: 'Coastal Supplies · $4,200 at 38 days' },
  { title: 'Payment reminder sent', subtitle: 'Summit Partners · $3,100 at 31 days' },
];

type Phase =
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'report'
  | 'report-hold'
  | 'notifications'
  | 'hold'
  | 'fade-out';

export function DataAnalysisDemo() {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportBuildStep, setReportBuildStep] = useState(0);
  const [visibleNotifications, setVisibleNotifications] = useState<number[]>([]);
  const [cycleCount, setCycleCount] = useState(0);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  const prompt = "Review our aged receivables and flag collection priorities";
  const typingSpeed = 35;
  const codeTypingSpeed = 20;

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalLines, currentCodeText]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

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
        timeout = setTimeout(() => {}, currentStep.type === 'action' ? 500 : 300);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      setShowChat(false);
      timeout = setTimeout(() => {
        setShowReport(true);
        setReportBuildStep(1);
        setPhase('report');
      }, 400);
    } else if (phase === 'report') {
      // Build report card progressively: header(1), section-title(2), accounts(3,4,5), insight(6)
      const maxSteps = 6;
      if (reportBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setReportBuildStep(prev => prev + 1);
        }, 350);
      } else {
        timeout = setTimeout(() => setPhase('report-hold'), 1500);
      }
    } else if (phase === 'report-hold') {
      setShowReport(false);
      timeout = setTimeout(() => setPhase('notifications'), 400);
    } else if (phase === 'notifications') {
      if (visibleNotifications.length < notifications.length) {
        timeout = setTimeout(() => {
          setVisibleNotifications(prev => [...prev, prev.length]);
        }, 600);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 500);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => {
        // Clear notifications and transition to fade-out phase
        setVisibleNotifications([]);
        setPhase('fade-out');
      }, 2500);
    } else if (phase === 'fade-out') {
      // Wait for notifications to fade, then reset
      timeout = setTimeout(() => {
        setShowReport(false);
        setShowTerminal(false);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setReportBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        setShowChat(true);
        setCycleCount(c => c + 1);
        setPhase('typing');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, reportBuildStep, cycleCount, visibleNotifications.length]);

  const totalOverdue = accounts.reduce((sum, acc) => sum + acc.amount, 0);

  return (
    <div className="data-analysis-demo-modal">
      <div className="data-analysis-demo">
        {/* Terminal Panel */}
        <div className={`da-terminal-panel ${showTerminal ? 'visible' : ''}`}>
          <div className="da-terminal-header">
            <span className="da-terminal-title">Agent Output</span>
            <span className="da-terminal-status">
              <span className="da-status-dot"></span>
              Running
            </span>
          </div>
          <div className="da-terminal-content" ref={terminalContentRef}>
            {terminalLines.map((line, index) => (
              <div key={index} className={`da-terminal-line ${line.type}`}>
                {line.type === 'action' && <span className="da-action-icon">●</span>}
                {line.type === 'status' && <span className="da-status-icon">→</span>}
                {line.type === 'code' && <span className="da-code-prefix">$</span>}
                <span className={line.type === 'code' ? 'da-code-text' : ''}>
                  {line.content}
                </span>
              </div>
            ))}
            {currentCodeText && (
              <div className="da-terminal-line code typing">
                <span className="da-code-prefix">$</span>
                <span className="da-code-text">{currentCodeText}</span>
                <span className="da-cursor">▋</span>
              </div>
            )}
            {phase === 'terminal-running' && !currentCodeText && stepIndexRef.current < terminalSequence.length && (
              <span className="da-cursor">▋</span>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className={`da-chat-input-container ${showChat ? 'visible' : ''}`}>
          <div className="da-chat-input-box">
            <div className="da-chat-text">
              {displayedText}
              <span className={`da-input-cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
            </div>
            <div className="da-chat-input-footer">
              <button className="da-attach-btn" aria-label="Attach file">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`da-send-btn ${phase === 'sending' ? 'pressed' : ''}`}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Report Card */}
        <div className={`da-report-card ${showReport ? 'visible' : ''}`}>
          <div className={`da-report-header ${reportBuildStep >= 1 ? 'visible' : ''}`}>
            <div className="da-report-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="da-report-title-block">
              <span className="da-report-title">Aged Receivables Report</span>
              <span className="da-report-subtitle">23 accounts · ${totalOverdue.toLocaleString()} overdue</span>
            </div>
          </div>

          <div className="da-report-section">
            <div className={`da-report-section-title ${reportBuildStep >= 2 ? 'visible' : ''}`}>Priority Follow-ups</div>
            <div className="da-accounts-list">
              {accounts.map((account, index) => (
                <div key={index} className={`da-account-row ${reportBuildStep >= index + 3 ? 'visible' : ''}`}>
                  <div className="da-account-info">
                    <span className="da-account-name">{account.name}</span>
                    <span className="da-account-days">{account.days} days overdue</span>
                  </div>
                  <div className="da-account-right">
                    <span className="da-account-amount">${account.amount.toLocaleString()}</span>
                    <span className={`da-risk-badge ${account.risk}`}>{account.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`da-report-insight ${reportBuildStep >= 6 ? 'visible' : ''}`}>
            <span className="da-insight-icon">💡</span>
            <span>Mitchell & Co last paid Feb 3. Consider direct call before escalation.</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="da-notifications-container">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`da-notification ${visibleNotifications.includes(index) ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="da-notification-icon email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="da-notification-content">
                <div className="da-notification-title">{notification.title}</div>
                <div className="da-notification-subtitle">{notification.subtitle}</div>
              </div>
              <div className="da-notification-time">now</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
