import { useEffect, useRef, useState } from "react";
import "./AIAuditFitDemo.css";

type Phase =
  | "waiting"
  | "summary"
  | "signal-1"
  | "signal-2"
  | "signal-3"
  | "impact"
  | "hold"
  | "reset";

const signals = [
  {
    label: "Workflow fit",
    value: "High",
    detail: "Recurring admin and coordination work",
    meter: 0.9,
  },
  {
    label: "Primary constraint",
    value: "Team time",
    detail: "Senior staff absorbed by repeated tasks",
    meter: 0.82,
  },
  {
    label: "Best first opportunity",
    value: "Sales follow-up",
    detail: "Manual lead handling slows response",
    meter: 0.76,
  },
];

const impacts = ["Increase margins", "Lift conversion", "Reduce admin load"];

export function AIAuditFitDemo() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [visibleSignals, setVisibleSignals] = useState(0);
  const [activeSignal, setActiveSignal] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showImpacts, setShowImpacts] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          setPhase("summary");
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "waiting") return;

    if (phase === "summary") {
      setShowSummary(true);
      setVisibleSignals(0);
      setActiveSignal(null);
      setShowImpacts(false);
      timeout = setTimeout(() => {
        setVisibleSignals(1);
        setActiveSignal(0);
        setPhase("signal-1");
      }, 700);
    } else if (phase === "signal-1") {
      timeout = setTimeout(() => {
        setVisibleSignals(2);
        setActiveSignal(1);
        setPhase("signal-2");
      }, 850);
    } else if (phase === "signal-2") {
      timeout = setTimeout(() => {
        setVisibleSignals(3);
        setActiveSignal(2);
        setPhase("signal-3");
      }, 850);
    } else if (phase === "signal-3") {
      timeout = setTimeout(() => {
        setActiveSignal(null);
        setShowImpacts(true);
        setPhase("impact");
      }, 950);
    } else if (phase === "impact") {
      timeout = setTimeout(() => setPhase("hold"), 2200);
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("reset"), 1400);
    } else if (phase === "reset") {
      setShowSummary(false);
      setShowImpacts(false);
      setVisibleSignals(0);
      setActiveSignal(null);
      timeout = setTimeout(() => setPhase("summary"), 450);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="ai-audit-fit-demo-shell" ref={containerRef}>
      <div className="ai-audit-fit-demo-panel">
        <div className="ai-audit-fit-demo-header">
          <span className="ai-audit-fit-demo-kicker">Opportunity snapshot</span>
          <h4>Harbour Ridge Wealth</h4>
        </div>

        <div className={`ai-audit-fit-demo-summary ${showSummary ? "is-visible" : ""}`}>
          <div className="ai-audit-fit-demo-badge">Recommended</div>
          <p>Repeated workflows are consuming team capacity and slowing growth.</p>
        </div>

        <div className="ai-audit-fit-demo-grid">
          {signals.map((item, index) => {
            const isVisible = index < visibleSignals;
            const isActive = activeSignal === index;

            return (
              <article
                key={item.label}
                className={`ai-audit-fit-demo-card ${isVisible ? "is-visible" : ""} ${isActive ? "is-active" : ""}`}
              >
                <div className="ai-audit-fit-demo-card-top">
                  <span className="ai-audit-fit-demo-label">{item.label}</span>
                  <span className="ai-audit-fit-demo-metric">{Math.round(item.meter * 100)}%</span>
                </div>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
                <div className="ai-audit-fit-demo-meter">
                  <div
                    className="ai-audit-fit-demo-meter-fill"
                    style={{ transform: isVisible ? `scaleX(${item.meter})` : "scaleX(0)" }}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className={`ai-audit-fit-demo-impact ${showImpacts ? "is-visible" : ""}`}>
          <span className="ai-audit-fit-demo-label">Likely impact areas</span>
          <div className="ai-audit-fit-demo-impact-list">
            {impacts.map((area, index) => (
              <div
                key={area}
                className="ai-audit-fit-demo-pill"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
