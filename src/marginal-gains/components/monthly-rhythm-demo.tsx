import { useState, useEffect } from "react";
import "./monthly-rhythm-demo.css";

type Phase = "idle" | "week1" | "week2" | "week3" | "week4" | "next" | "hold";

interface WeekItem {
  week: number;
  label: string;
  detail: string;
  icon: "session" | "deploy" | "peer" | "refine";
  phase: Phase;
}

const weeks: WeekItem[] = [
  { week: 1, label: "Working Session", detail: "Built: Invoice bot", icon: "session", phase: "week1" },
  { week: 2, label: "Deploy to Wingman", detail: "Status: Live", icon: "deploy", phase: "week2" },
  { week: 3, label: "Peer Exchange", detail: '"Try adding alerts"', icon: "peer", phase: "week3" },
  { week: 4, label: "Refinement", detail: "+2 automations", icon: "refine", phase: "week4" },
];

export function MonthlyRhythmDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [month, setMonth] = useState(3);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: { phase: Phase; duration: number }[] = [
      { phase: "idle", duration: 600 },
      { phase: "week1", duration: 1200 },
      { phase: "week2", duration: 1200 },
      { phase: "week3", duration: 1200 },
      { phase: "week4", duration: 1200 },
      { phase: "next", duration: 1000 },
      { phase: "hold", duration: 1500 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentStep = 0;

    const runStep = () => {
      const step = timeline[currentStep];
      setPhase(step.phase);

      if (step.phase === "next") {
        setMonth((m) => (m % 12) + 1);
      }

      timeoutId = setTimeout(() => {
        currentStep++;
        if (currentStep >= timeline.length) {
          currentStep = 0;
          setCycle((c) => c + 1);
        }
        runStep();
      }, step.duration);
    };

    timeoutId = setTimeout(runStep, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  const isVisible = (item: WeekItem) => {
    const phaseOrder: Phase[] = ["week1", "week2", "week3", "week4", "next", "hold"];
    const itemIndex = phaseOrder.indexOf(item.phase);
    const currentIndex = phaseOrder.indexOf(phase);
    return currentIndex >= itemIndex && phase !== "idle";
  };

  const getIcon = (type: WeekItem["icon"]) => {
    switch (type) {
      case "session":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "deploy":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      case "peer":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "refine":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
          </svg>
        );
    }
  };

  return (
    <div className="monthly-rhythm-demo" key={cycle}>
      {/* Month header */}
      <div className="rhythm-header">
        <span className="rhythm-month">Month {month}</span>
        <div className="rhythm-badge">In Progress</div>
      </div>

      {/* Timeline */}
      <div className="rhythm-timeline">
        {weeks.map((item) => (
          <div
            key={item.week}
            className={`rhythm-item ${isVisible(item) ? "visible" : ""}`}
          >
            <div className="rhythm-marker">
              <div className={`rhythm-dot ${isVisible(item) ? "active" : ""}`} />
              {item.week < 4 && <div className="rhythm-line" />}
            </div>
            <div className="rhythm-content">
              <div className="rhythm-week">
                <div className={`rhythm-icon ${isVisible(item) ? "active" : ""}`}>
                  {getIcon(item.icon)}
                </div>
                <span className="rhythm-label">Week {item.week}</span>
              </div>
              <span className="rhythm-title">{item.label}</span>
              <span className="rhythm-detail">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Next month indicator */}
      <div className={`rhythm-next ${phase === "next" || phase === "hold" ? "visible" : ""}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span>Month {(month % 12) + 1} begins...</span>
      </div>
    </div>
  );
}
