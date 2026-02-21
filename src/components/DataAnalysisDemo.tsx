
import React, { useState, useEffect, useRef } from 'react';
import './DataAnalysisDemo.css';

interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const terminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Loading support_tickets.csv' },
  { type: 'status', content: 'Reading 847 records...' },
  { type: 'action', content: 'Analysing patterns' },
  { type: 'code', content: 'categories = df.groupby(\'category\').count()' },
  { type: 'code', content: 'resolution_times = df[\'resolved_at\'] - df[\'created_at\']' },
  { type: 'code', content: 'top_issues = categories.nlargest(5)' },
  { type: 'status', content: 'Pattern analysis complete' },
  { type: 'action', content: 'Generating insights' },
  { type: 'code', content: 'insights = model.summarize(top_issues, resolution_times)' },
  { type: 'status', content: 'Done' },
];

const insights = [
  { label: 'Onboarding', value: 67, color: '#2ea782' },
  { label: 'Billing', value: 18, color: '#4a9eff' },
  { label: 'Technical', value: 15, color: '#f59e0b' },
];

const insightText = "67% of tickets relate to onboarding issues. Most common: password resets and account setup. Recommend updating FAQ and adding in-app guidance.";

type Phase =
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'insights'
  | 'hold'
  | 'reset';

export function DataAnalysisDemo() {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [showInsights, setShowInsights] = useState(false);
  const [insightDisplayText, setInsightDisplayText] = useState('');
  const [showChart, setShowChart] = useState(false);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const insightCharIndexRef = useRef(0);

  const prompt = "Analyse our support tickets from last month and identify patterns";
  const typingSpeed = 35;
  const codeTypingSpeed = 25;
  const insightTypingSpeed = 20;

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
        // All steps done
        timeout = setTimeout(() => setPhase('terminal-close'), 800);
      } else if (currentStep.type === 'code') {
        // Type out code character by character
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, codeTypingSpeed);
        } else {
          // Code line complete, add to terminal and move to next step
          setTerminalLines(prev => [...prev, currentStep]);
          setCurrentCodeText('');
          codeCharIndexRef.current = 0;
          stepIndexRef.current += 1;
          timeout = setTimeout(() => {}, 200);
        }
      } else {
        // Action or status - show immediately
        setTerminalLines(prev => [...prev, currentStep]);
        stepIndexRef.current += 1;
        timeout = setTimeout(() => {}, currentStep.type === 'action' ? 600 : 400);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      timeout = setTimeout(() => {
        setShowInsights(true);
        setPhase('insights');
      }, 400);
    } else if (phase === 'insights') {
      if (insightCharIndexRef.current < insightText.length) {
        timeout = setTimeout(() => {
          setInsightDisplayText(insightText.slice(0, insightCharIndexRef.current + 1));
          insightCharIndexRef.current += 1;
          // Show chart when we're partway through
          if (insightCharIndexRef.current === 30) {
            setShowChart(true);
          }
        }, insightTypingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 1000);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('reset'), 3000);
    } else if (phase === 'reset') {
      setShowInsights(false);
      setShowTerminal(false);
      setShowChart(false);
      timeout = setTimeout(() => {
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setInsightDisplayText('');
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        insightCharIndexRef.current = 0;
        setPhase('typing');
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, insightDisplayText]);

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
          <div className="da-terminal-content">
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
        <div className="da-chat-input-container">
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

        {/* Insights Card */}
        <div className={`da-insights-card ${showInsights ? 'visible' : ''}`}>
          <div className="da-insights-header">
            <div className="da-insights-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 14l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="da-insights-title">Support Ticket Analysis</span>
          </div>

          <div className={`da-insights-chart ${showChart ? 'visible' : ''}`}>
            {insights.map((item, index) => (
              <div key={index} className="da-chart-bar-container">
                <div className="da-chart-label">{item.label}</div>
                <div className="da-chart-bar-bg">
                  <div
                    className="da-chart-bar"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                      transitionDelay: `${index * 150}ms`
                    }}
                  />
                </div>
                <div className="da-chart-value">{item.value}%</div>
              </div>
            ))}
          </div>

          <div className="da-insights-text">
            {insightDisplayText}
            {phase === 'insights' && <span className="da-insight-cursor">|</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
