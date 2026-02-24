import { useState, useEffect } from "react";
import "./workflow-builder-demo.css";

// Diagonal staircase layout: New Email (top-left) → Update CRM (middle) → New Step (bottom-right)
type Phase = "idle" | "connecting" | "adding" | "complete";

export function WorkflowBuilderDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: { phase: Phase; duration: number }[] = [
      { phase: "idle", duration: 1500 },
      { phase: "connecting", duration: 800 },
      { phase: "adding", duration: 600 },
      { phase: "complete", duration: 2500 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentStep = 0;

    const runStep = () => {
      const step = timeline[currentStep];
      setPhase(step.phase);

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

  const showConnection = phase === "connecting" || phase === "adding" || phase === "complete";
  const showNewNode = phase === "adding" || phase === "complete";

  return (
    <div className="workflow-builder-demo" key={cycle}>
      {/* Grid background */}
      <div className="workflow-grid" />

      {/* Connection lines - L-shaped connectors */}
      <svg className="workflow-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* New Email → Update CRM: exit bottom, enter left-middle */}
        <path
          d="M 25 30 L 25 50 L 38 50"
          className="workflow-line"
          fill="none"
        />
        {/* Update CRM → New Step: exit bottom, enter left-middle (animated) */}
        <path
          d="M 50 58 L 50 78 L 63 78"
          className={`workflow-line ${showConnection ? "visible" : "hidden"} ${showNewNode ? "" : "dashed"}`}
          fill="none"
        />
      </svg>

      {/* Node 1: New Email (top-left) */}
      <div className="workflow-node" style={{ left: "25%", top: "22%" }}>
        <div className="workflow-node-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span className="workflow-node-label">New Email</span>
      </div>

      {/* Node 2: Update CRM (middle) */}
      <div className="workflow-node" style={{ left: "50%", top: "50%" }}>
        <div className="workflow-node-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <span className="workflow-node-label">Update CRM</span>
      </div>

      {/* Node 3: New Step (bottom-right, animated) */}
      <div
        className={`workflow-node new-step ${showNewNode ? "visible" : ""}`}
        style={{ left: "75%", top: "78%" }}
      >
        <div className="workflow-node-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </div>
        <span className="workflow-node-label">New Step</span>
      </div>
    </div>
  );
}
