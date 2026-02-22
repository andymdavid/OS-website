
import React, { useState, useEffect, useRef } from 'react';
import './WingmanDemo.css';

interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const terminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Analysing spreadsheet structure' },
  { type: 'status', content: 'Found 847 rows, 12 columns' },
  { type: 'action', content: 'Detecting data types' },
  { type: 'code', content: 'schema = detect_columns(["SKU", "Name", "Qty", "Reorder"])' },
  { type: 'status', content: 'Mapped 4 core fields' },
  { type: 'action', content: 'Building database schema' },
  { type: 'code', content: 'db.create_table("inventory", schema)' },
  { type: 'action', content: 'Migrating data' },
  { type: 'code', content: 'inventory.import_csv(spreadsheet, validate=True)' },
  { type: 'status', content: 'Imported 847 products' },
  { type: 'action', content: 'Setting up reorder alerts' },
  { type: 'code', content: 'alerts.create_rule(qty < reorder_point)' },
  { type: 'status', content: 'Created 3 alert rules' },
  { type: 'action', content: 'Generating UI' },
  { type: 'status', content: 'App ready' },
];

const spreadsheetData = [
  ['SKU', 'Product Name', 'Qty', 'Min', 'Supplier', 'Notes'],
  ['A-2847', 'Widget Pro XL', '12', '25', 'Acme Co', 'reorder soon!!'],
  ['B-1923', 'Gadget Basic', '145', '50', 'SupplyCo', ''],
  ['C-0012', 'Component Kit', '8', '20', 'Parts Ltd', 'URGENT'],
  ['D-4455', 'Assembly Pack', '67', '30', 'Acme Co', 'check price'],
  ['E-7821', 'Fastener Set', '3', '15', 'FastenAll', 'OUT OF STOCK'],
];

const appInventory = [
  { sku: 'A-2847', name: 'Widget Pro XL', qty: 12, reorder: 25, status: 'low' },
  { sku: 'C-0012', name: 'Component Kit', qty: 8, reorder: 20, status: 'low' },
  { sku: 'E-7821', name: 'Fastener Set', qty: 3, reorder: 15, status: 'critical' },
];

type Phase =
  | 'spreadsheet'
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'app-reveal'
  | 'app-build'
  | 'hold'
  | 'fade-out';

export function WingmanDemo() {
  const [phase, setPhase] = useState<Phase | 'waiting'>('waiting');
  const [displayedText, setDisplayedText] = useState('');
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [appBuildStep, setAppBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Turn this into an inventory tracker with low stock alerts";
  const typingSpeed = 35;
  const codeTypingSpeed = 20;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('spreadsheet');
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

    if (phase === 'spreadsheet') {
      setShowSpreadsheet(true);
      timeout = setTimeout(() => {
        setShowChat(true);
        setPhase('typing');
      }, 1500);
    } else if (phase === 'typing') {
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
        setShowSpreadsheet(false);
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
        setShowApp(true);
        setAppBuildStep(1);
        setPhase('app-reveal');
      }, 400);
    } else if (phase === 'app-reveal') {
      timeout = setTimeout(() => setPhase('app-build'), 300);
    } else if (phase === 'app-build') {
      const maxSteps = 5; // header, search, 3 rows
      if (appBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setAppBuildStep(prev => prev + 1);
        }, 300);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 2500);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('fade-out'), 2000);
    } else if (phase === 'fade-out') {
      setShowApp(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowSpreadsheet(false);
        setShowTerminal(false);
        setShowChat(false);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setAppBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        setPhase('spreadsheet');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, appBuildStep]);

  return (
    <div className="wingman-demo-modal" ref={containerRef}>
      <div className="wingman-demo">
        {/* Spreadsheet Preview */}
        <div className={`wm-spreadsheet ${showSpreadsheet ? 'visible' : ''}`}>
          <div className="wm-spreadsheet-header">
            <div className="wm-spreadsheet-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="wm-spreadsheet-title">inventory_master_FINAL_v3.xlsx</span>
          </div>
          <div className="wm-spreadsheet-content">
            <table>
              <tbody>
                {spreadsheetData.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'header-row' : ''}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={cell.includes('!!') || cell.includes('URGENT') || cell.includes('OUT OF STOCK') ? 'messy' : ''}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terminal Panel */}
        <div className={`wm-terminal-panel ${showTerminal ? 'visible' : ''}`}>
          <div className="wm-terminal-header">
            <span className="wm-terminal-title">Wingman</span>
            <span className="wm-terminal-status">
              <span className="wm-status-dot"></span>
              Building
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

        {/* App Result */}
        <div className={`wm-app-result ${showApp ? 'visible' : ''}`}>
          <div className={`wm-app-header ${appBuildStep >= 1 ? 'visible' : ''}`}>
            <div className="wm-app-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Inventory Tracker</span>
            </div>
            <div className="wm-app-badge">Live</div>
          </div>

          <div className={`wm-app-search ${appBuildStep >= 2 ? 'visible' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Search inventory...</span>
          </div>

          <div className="wm-app-section-title">Low Stock Alerts</div>

          <div className="wm-app-inventory">
            {appInventory.map((item, index) => (
              <div key={index} className={`wm-inventory-row ${appBuildStep >= index + 3 ? 'visible' : ''}`}>
                <div className="wm-inventory-info">
                  <span className="wm-inventory-sku">{item.sku}</span>
                  <span className="wm-inventory-name">{item.name}</span>
                </div>
                <div className="wm-inventory-right">
                  <div className="wm-inventory-qty">
                    <span className="wm-qty-current">{item.qty}</span>
                    <span className="wm-qty-divider">/</span>
                    <span className="wm-qty-reorder">{item.reorder}</span>
                  </div>
                  <span className={`wm-status-badge ${item.status}`}>
                    {item.status === 'critical' ? 'Critical' : 'Low'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
