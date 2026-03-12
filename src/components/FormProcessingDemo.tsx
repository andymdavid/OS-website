import { useState, useEffect, useRef } from 'react';
import './FormProcessingDemo.css';

interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const terminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Analyzing document structure' },
  { type: 'code', content: 'detect_layout(page_1, confidence=0.94)' },
  { type: 'status', content: 'Found form with 6 fields' },
  { type: 'action', content: 'Extracting field values' },
  { type: 'code', content: 'ocr.extract(regions, lang="en")' },
  { type: 'code', content: 'validate_email("sarah.chen@meridian.co")' },
  { type: 'status', content: 'All fields validated' },
  { type: 'action', content: 'Checking for duplicates' },
  { type: 'code', content: 'crm.search(email="sarah.chen@meridian.co")' },
  { type: 'status', content: 'New contact confirmed' },
  { type: 'action', content: 'Creating CRM record' },
  { type: 'code', content: 'contacts.create(data, source="form")' },
  { type: 'status', content: 'Contact added successfully' },
];

const formFields = [
  { label: 'Name', value: 'Sarah Chen', handwritten: true },
  { label: 'Company', value: 'Meridian Logistics', handwritten: true },
  { label: 'Email', value: 'sarah.chen@meridian.co', handwritten: true },
  { label: 'Phone', value: '+44 7700 912847', handwritten: true },
  { label: 'Interest', value: 'Process automation', handwritten: true },
  { label: 'Source', value: 'Conference', handwritten: true },
];

const crmContact = {
  name: 'Sarah Chen',
  company: 'Meridian Logistics',
  email: 'sarah.chen@meridian.co',
  phone: '+44 7700 912847',
  interest: 'Process automation',
  source: 'Conference',
  status: 'New Lead',
};

type Phase =
  | 'waiting'
  | 'form'
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'crm-reveal'
  | 'crm-build'
  | 'hold'
  | 'fade-out';

export function FormProcessingDemo() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [displayedText, setDisplayedText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCRM, setShowCRM] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [crmBuildStep, setCrmBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Extract this enquiry form and add to CRM";
  const typingSpeed = 35;
  const codeTypingSpeed = 20;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('form');
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

    if (phase === 'form') {
      setShowForm(true);
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
        setShowForm(false);
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
        setShowCRM(true);
        setCrmBuildStep(1);
        setPhase('crm-reveal');
      }, 400);
    } else if (phase === 'crm-reveal') {
      timeout = setTimeout(() => setPhase('crm-build'), 300);
    } else if (phase === 'crm-build') {
      const maxSteps = 8; // header, avatar, name, company, then 4 detail rows
      if (crmBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setCrmBuildStep(prev => prev + 1);
        }, 200);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 2500);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('fade-out'), 2000);
    } else if (phase === 'fade-out') {
      setShowCRM(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowForm(false);
        setShowTerminal(false);
        setShowChat(false);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setCrmBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        setPhase('form');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, crmBuildStep]);

  return (
    <div className="form-demo-container" ref={containerRef}>
      <div className="form-demo">
        {/* Scanned Form Preview */}
        <div className={`fp-form ${showForm ? 'visible' : ''}`}>
          <div className="fp-form-header">
            <div className="fp-form-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="fp-form-title">enquiry_scan_0847.pdf</span>
          </div>
          <div className="fp-form-content">
            <div className="fp-form-letterhead">ENQUIRY FORM</div>
            {formFields.map((field, index) => (
              <div key={index} className="fp-form-field">
                <span className="fp-field-label">{field.label}:</span>
                <span className={`fp-field-value ${field.handwritten ? 'handwritten' : ''}`}>
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Panel */}
        <div className={`fp-terminal ${showTerminal ? 'visible' : ''}`}>
          <div className="fp-terminal-header">
            <span className="fp-terminal-title">Wingman</span>
            <span className="fp-terminal-status">
              <span className="fp-status-dot"></span>
              Processing
            </span>
          </div>
          <div className="fp-terminal-content" ref={terminalContentRef}>
            {terminalLines.map((line, index) => (
              <div key={index} className={`fp-terminal-line ${line.type}`}>
                {line.type === 'action' && <span className="fp-action-icon">●</span>}
                {line.type === 'status' && <span className="fp-status-icon">→</span>}
                {line.type === 'code' && <span className="fp-code-prefix">$</span>}
                <span className={line.type === 'code' ? 'fp-code-text' : ''}>
                  {line.content}
                </span>
              </div>
            ))}
            {currentCodeText && (
              <div className="fp-terminal-line code typing">
                <span className="fp-code-prefix">$</span>
                <span className="fp-code-text">{currentCodeText}</span>
                <span className="fp-cursor">▋</span>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className={`fp-chat-container ${showChat ? 'visible' : ''}`}>
          <div className="fp-chat-box">
            <div className="fp-chat-text">
              {displayedText}
              <span className={`fp-input-cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
            </div>
            <div className="fp-chat-footer">
              <button className="fp-attach-btn" aria-label="Attach file">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`fp-send-btn ${phase === 'sending' ? 'pressed' : ''}`}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* CRM Result */}
        <div className={`fp-crm ${showCRM ? 'visible' : ''}`}>
          <div className={`fp-crm-header ${crmBuildStep >= 1 ? 'visible' : ''}`}>
            <div className="fp-crm-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Contact Added</span>
            </div>
            <div className="fp-crm-badge">New Lead</div>
          </div>

          <div className={`fp-crm-profile ${crmBuildStep >= 2 ? 'visible' : ''}`}>
            <div className="fp-crm-avatar">SC</div>
            <div className="fp-crm-identity">
              <span className={`fp-crm-name ${crmBuildStep >= 3 ? 'visible' : ''}`}>{crmContact.name}</span>
              <span className={`fp-crm-company ${crmBuildStep >= 4 ? 'visible' : ''}`}>{crmContact.company}</span>
            </div>
          </div>

          <div className="fp-crm-details">
            <div className={`fp-crm-row ${crmBuildStep >= 5 ? 'visible' : ''}`}>
              <span className="fp-crm-label">Email</span>
              <span className="fp-crm-value">{crmContact.email}</span>
            </div>
            <div className={`fp-crm-row ${crmBuildStep >= 6 ? 'visible' : ''}`}>
              <span className="fp-crm-label">Phone</span>
              <span className="fp-crm-value">{crmContact.phone}</span>
            </div>
            <div className={`fp-crm-row ${crmBuildStep >= 7 ? 'visible' : ''}`}>
              <span className="fp-crm-label">Interest</span>
              <span className="fp-crm-value">{crmContact.interest}</span>
            </div>
            <div className={`fp-crm-row ${crmBuildStep >= 8 ? 'visible' : ''}`}>
              <span className="fp-crm-label">Source</span>
              <span className="fp-crm-value">{crmContact.source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
