import { useState, useEffect } from "react";
import "./capability-depth-demo.css";

type Phase = "week1" | "month2" | "month4" | "hold";

interface Step {
  label: string;
  phase: Phase;
}

const steps: Step[] = [
  { label: "Summarize thread", phase: "week1" },
  { label: "Draft response", phase: "month2" },
  { label: "Flag follow-ups", phase: "month2" },
  { label: "Update CRM", phase: "month4" },
  { label: "Schedule meeting", phase: "month4" },
];

const phaseLabels: Record<Phase, string> = {
  week1: "Week 1",
  month2: "Month 2",
  month4: "Month 4",
  hold: "Month 4",
};

export function CapabilityDepthDemo() {
  const [phase, setPhase] = useState<Phase>("week1");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: { phase: Phase; steps: number; duration: number }[] = [
      { phase: "week1", steps: 1, duration: 2000 },
      { phase: "month2", steps: 3, duration: 2500 },
      { phase: "month4", steps: 5, duration: 3000 },
      { phase: "hold", steps: 5, duration: 2000 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentStep = 0;

    const runStep = () => {
      const step = timeline[currentStep];
      setPhase(step.phase);
      setVisibleSteps(step.steps);

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

  return (
    <div className="capability-depth-demo" key={cycle}>
      {/* Header */}
      <div className="depth-header">
        <div className="depth-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <span className="depth-title">Email Agent</span>
        <span className="depth-phase">{phaseLabels[phase]}</span>
      </div>

      {/* Steps list */}
      <div className="depth-steps">
        {steps.slice(0, visibleSteps).map((step, index) => (
          <div
            key={step.label}
            className="depth-step"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="depth-step-icon">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="depth-step-label">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="depth-progress">
        <div className="depth-progress-bar">
          <div
            className="depth-progress-fill"
            style={{ width: `${(visibleSteps / steps.length) * 100}%` }}
          />
        </div>
        <span className="depth-progress-label">
          {visibleSteps} of {steps.length} capabilities
        </span>
      </div>
    </div>
  );
}
