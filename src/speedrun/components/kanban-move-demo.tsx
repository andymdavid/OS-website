import { useState, useEffect } from "react";
import "./kanban-move-demo.css";

// Simple phases: idle → moving → shifted → hold
type Phase = "idle" | "moving" | "shifted" | "hold";

export function KanbanMoveDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: { phase: Phase; duration: number }[] = [
      { phase: "idle", duration: 2500 },
      { phase: "moving", duration: 700 },
      { phase: "shifted", duration: 500 },
      { phase: "hold", duration: 3000 },
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

    timeoutId = setTimeout(runStep, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const taskMoving = phase === "moving" || phase === "shifted" || phase === "hold";
  const taskArrived = phase === "shifted" || phase === "hold";
  const otherShifted = phase === "shifted" || phase === "hold";

  return (
    <div className="kanban-move-demo" key={cycle}>
      {/* In Progress Column */}
      <div className="km-column">
        <div className="km-column-header">
          <span className="km-column-title">In Progress</span>
          <span className="km-column-count">{taskMoving ? 1 : 2}</span>
        </div>
        <div className="km-column-cards">
          <div className={`km-card ${taskMoving ? "fading-out" : ""}`}>
            <span className="km-card-title">Weekly summary</span>
            <span className="km-card-tag agent">Agent</span>
          </div>
          <div className={`km-card ${otherShifted ? "shifted-up" : ""}`}>
            <span className="km-card-title">Review quotes</span>
            <span className="km-card-tag">Ops</span>
          </div>
        </div>
      </div>

      {/* Done Column */}
      <div className="km-column">
        <div className="km-column-header">
          <span className="km-column-title">Done</span>
          <span className="km-column-count">{taskArrived ? 2 : 1}</span>
        </div>
        <div className="km-column-cards">
          <div className={`km-card done ${taskArrived ? "fading-in" : "hidden"}`}>
            <span className="km-card-title">Weekly summary</span>
            <span className="km-card-tag">Agent</span>
          </div>
          <div className="km-card done">
            <span className="km-card-title">Send invoices</span>
            <span className="km-card-tag">Finance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
