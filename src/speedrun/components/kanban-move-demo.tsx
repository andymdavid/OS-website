import { useState, useEffect } from "react";
import "./kanban-move-demo.css";

interface Task {
  id: string;
  title: string;
  tag: string;
}

const inProgressTasks: Task[] = [
  { id: "task-1", title: "Weekly summary", tag: "Agent" },
  { id: "task-2", title: "Review quotes", tag: "Ops" },
];

const doneTasks: Task[] = [
  { id: "task-3", title: "Send invoices", tag: "Finance" },
];

export function KanbanMoveDemo() {
  const [phase, setPhase] = useState<"idle" | "moving" | "done">("idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline = [
      { phase: "idle" as const, duration: 3000 },
      { phase: "moving" as const, duration: 800 },
      { phase: "done" as const, duration: 4000 },
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

    // Initial delay before starting
    timeoutId = setTimeout(runStep, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const isTaskMoving = phase === "moving" || phase === "done";

  return (
    <div className="kanban-move-demo" key={cycle}>
      {/* In Progress Column */}
      <div className="km-column">
        <div className="km-column-header">
          <span className="km-column-title">In Progress</span>
          <span className="km-column-count">{isTaskMoving ? 1 : 2}</span>
        </div>
        <div className="km-column-cards">
          {/* The moving task */}
          <div className={`km-card km-card-moving ${isTaskMoving ? "moved" : ""}`}>
            <span className="km-card-title">{inProgressTasks[0].title}</span>
            <span className="km-card-tag agent">{inProgressTasks[0].tag}</span>
          </div>
          {/* Static task */}
          <div className="km-card">
            <span className="km-card-title">{inProgressTasks[1].title}</span>
            <span className="km-card-tag">{inProgressTasks[1].tag}</span>
          </div>
        </div>
      </div>

      {/* Done Column */}
      <div className="km-column">
        <div className="km-column-header">
          <span className="km-column-title">Done</span>
          <span className="km-column-count">{isTaskMoving ? 2 : 1}</span>
        </div>
        <div className="km-column-cards">
          {/* Placeholder for moved task */}
          <div className={`km-card-placeholder ${isTaskMoving ? "visible" : ""}`}>
            <div className="km-card done">
              <span className="km-card-title">{inProgressTasks[0].title}</span>
              <span className="km-card-tag agent">{inProgressTasks[0].tag}</span>
            </div>
          </div>
          {/* Existing done task */}
          <div className="km-card done">
            <span className="km-card-title">{doneTasks[0].title}</span>
            <span className="km-card-tag">{doneTasks[0].tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
