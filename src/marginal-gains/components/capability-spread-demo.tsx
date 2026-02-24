import { useState, useEffect, useRef } from "react";
import "./capability-spread-demo.css";

interface TerminalStep {
  type: "action" | "status" | "code";
  content: string;
}

const terminalSequence: TerminalStep[] = [
  { type: "action", content: "Checking Wingman deployments" },
  { type: "code", content: "agents = wingman.get_active(org_id)" },
  { type: "status", content: "Found 4 active agents across 3 teams" },
  { type: "action", content: "Analyzing usage patterns" },
  { type: "code", content: "usage = agents.aggregate_metrics(period=\"30d\")" },
  { type: "status", content: "127 tasks automated this month" },
  { type: "action", content: "Identifying cross-team adoption" },
  { type: "code", content: "patterns = usage.find_shared_workflows()" },
  { type: "status", content: "3 patterns adopted across teams" },
  { type: "action", content: "Generating capability summary" },
];

const reportData = {
  title: "Capability Report",
  period: "February 2025",
  metrics: [
    { label: "Active Agents", value: "4" },
    { label: "Tasks Automated", value: "127" },
    { label: "Teams Using", value: "3" },
  ],
  insight: "Invoice sync pattern now adopted by Ops, Sales, and Finance",
};

type Phase =
  | "waiting"
  | "typing"
  | "sending"
  | "terminal-open"
  | "terminal-running"
  | "terminal-close"
  | "report"
  | "hold"
  | "fade-out";

export function CapabilitySpreadDemo() {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<Phase>("waiting");
  const [showChat, setShowChat] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [reportBuildStep, setReportBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Review what agents we've deployed and share the wins";
  const typingSpeed = 35;
  const codeTypingSpeed = 18;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase("typing");
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

    if (phase === "waiting") {
      return;
    }

    if (phase === "typing") {
      if (charIndexRef.current < prompt.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prompt.slice(0, charIndexRef.current + 1));
          charIndexRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("sending"), 600);
      }
    } else if (phase === "sending") {
      timeout = setTimeout(() => {
        setShowTerminal(true);
        setPhase("terminal-open");
      }, 400);
    } else if (phase === "terminal-open") {
      timeout = setTimeout(() => setPhase("terminal-running"), 300);
    } else if (phase === "terminal-running") {
      const currentStep = terminalSequence[stepIndexRef.current];

      if (!currentStep) {
        timeout = setTimeout(() => setPhase("terminal-close"), 600);
      } else if (currentStep.type === "code") {
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, codeTypingSpeed);
        } else {
          setTerminalLines((prev) => [...prev, currentStep]);
          setCurrentCodeText("");
          codeCharIndexRef.current = 0;
          stepIndexRef.current += 1;
          timeout = setTimeout(() => {}, 100);
        }
      } else {
        setTerminalLines((prev) => [...prev, currentStep]);
        stepIndexRef.current += 1;
        timeout = setTimeout(() => {}, currentStep.type === "action" ? 450 : 300);
      }
    } else if (phase === "terminal-close") {
      setShowTerminal(false);
      setShowChat(false);
      timeout = setTimeout(() => {
        setShowReport(true);
        setReportBuildStep(1);
        setPhase("report");
      }, 400);
    } else if (phase === "report") {
      const maxSteps = 5; // header, 3 metrics, insight
      if (reportBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setReportBuildStep((prev) => prev + 1);
        }, 300);
      } else {
        timeout = setTimeout(() => setPhase("hold"), 2500);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("fade-out"), 2000);
    } else if (phase === "fade-out") {
      setShowReport(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowTerminal(false);
        setShowChat(true);
        setTerminalLines([]);
        setDisplayedText("");
        setCurrentCodeText("");
        setReportBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        setPhase("typing");
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, reportBuildStep]);

  return (
    <div className="capability-spread-demo" ref={containerRef}>
      {/* Terminal Panel */}
      <div className={`cs-terminal ${showTerminal ? "visible" : ""}`}>
        <div className="cs-terminal-header">
          <span className="cs-terminal-title">Wingman</span>
          <span className="cs-terminal-status">
            <span className="cs-status-dot" />
            Running
          </span>
        </div>
        <div className="cs-terminal-content" ref={terminalContentRef}>
          {terminalLines.map((line, index) => (
            <div key={index} className={`cs-terminal-line ${line.type}`}>
              {line.type === "action" && <span className="cs-line-icon">●</span>}
              {line.type === "status" && <span className="cs-line-icon status">→</span>}
              {line.type === "code" && <span className="cs-code-prefix">$</span>}
              <span className={line.type === "code" ? "cs-code-text" : ""}>
                {line.content}
              </span>
            </div>
          ))}
          {currentCodeText && (
            <div className="cs-terminal-line code typing">
              <span className="cs-code-prefix">$</span>
              <span className="cs-code-text">{currentCodeText}</span>
              <span className="cs-cursor">▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className={`cs-chat-container ${showChat ? "visible" : ""}`}>
        <div className="cs-chat-box">
          <div className="cs-chat-text">
            {displayedText}
            <span className={`cs-input-cursor ${phase === "typing" ? "blinking" : ""}`}>|</span>
          </div>
          <div className="cs-chat-footer">
            <button className="cs-attach-btn" aria-label="Attach file">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`cs-send-btn ${phase === "sending" ? "pressed" : ""}`}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 19V5m0 0l-7 7m7-7l7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Report Card */}
      <div className={`cs-report ${showReport ? "visible" : ""}`}>
        <div className={`cs-report-header ${reportBuildStep >= 1 ? "visible" : ""}`}>
          <div className="cs-report-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3v18h18M7 16v-3M12 16V9M17 16v-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="cs-report-title-block">
            <span className="cs-report-title">{reportData.title}</span>
            <span className="cs-report-subtitle">{reportData.period}</span>
          </div>
        </div>

        <div className="cs-report-metrics">
          {reportData.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`cs-metric ${reportBuildStep >= index + 2 ? "visible" : ""}`}
            >
              <span className="cs-metric-value">{metric.value}</span>
              <span className="cs-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className={`cs-report-insight ${reportBuildStep >= 5 ? "visible" : ""}`}>
          <span className="cs-insight-icon">💡</span>
          <span>{reportData.insight}</span>
        </div>
      </div>
    </div>
  );
}
