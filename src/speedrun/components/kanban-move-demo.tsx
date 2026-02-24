import { useState, useEffect } from "react";
import "./kanban-move-demo.css";

type Phase = "idle" | "lifting" | "dragging" | "dropped" | "settled";

export function KanbanMoveDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: { phase: Phase; duration: number }[] = [
      { phase: "idle", duration: 2500 },
      { phase: "lifting", duration: 300 },
      { phase: "dragging", duration: 600 },
      { phase: "dropped", duration: 300 },
      { phase: "settled", duration: 3000 },
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

  // Determine animation states
  const isIdle = phase === "idle";
  const isLifted = phase === "lifting" || phase === "dragging";
  const isMoving = phase === "dragging";
  const hasLanded = phase === "dropped" || phase === "settled";
  const cardHasMoved = phase === "dragging" || phase === "dropped" || phase === "settled";

  return (
    <div className="kanban-move-demo" key={cycle}>
      {/* The dragging card - positioned absolutely, hidden in idle */}
      {!isIdle && (
        <div
          className={`km-drag-card ${isLifted ? "lifted" : ""} ${isMoving ? "moving" : ""} ${hasLanded ? "landed" : ""}`}
        >
          <span className="km-card-title">Weekly summary</span>
          <span className="km-card-tag agent">Agent</span>
        </div>
      )}

      {/* In Progress Column */}
      <div className="km-column">
        <div className="km-column-header">
          <span className="km-column-title">In Progress</span>
          <span className="km-column-count">{cardHasMoved ? 1 : 2}</span>
        </div>
        <div className="km-column-cards">
          {/* Ghost placeholder - visible only in idle, hidden once lifting starts */}
          <div className={`km-card km-card-ghost ${!isIdle ? "hidden" : ""}`}>
            <span className="km-card-title">Weekly summary</span>
            <span className="km-card-tag agent">Agent</span>
          </div>
          {/* Review quotes - shifts up when card is dragged */}
          <div className={`km-card km-card-shifter ${cardHasMoved ? "shifted" : ""}`}>
            <span className="km-card-title">Review quotes</span>
            <span className="km-card-tag">Ops</span>
          </div>
        </div>
      </div>

      {/* Done Column */}
      <div className="km-column">
        <div className="km-column-header">
          <span className="km-column-title">Done</span>
          <span className="km-column-count">{hasLanded ? 2 : 1}</span>
        </div>
        <div className="km-column-cards">
          {/* Space for landed card */}
          <div className={`km-card-landing ${hasLanded ? "visible" : ""}`} />
          {/* Existing done task */}
          <div className="km-card done">
            <span className="km-card-title">Send invoices</span>
            <span className="km-card-tag">Finance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
