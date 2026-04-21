import { useEffect, useState } from "react";
import "./capability-depth-demo.css";

type Phase = "baseline" | "first" | "second" | "third" | "hold";

const rows = [
  { label: "Response quality", before: "General", after: "Sharper" },
  { label: "Handoff rules", before: "Basic", after: "Current" },
  { label: "Exception handling", before: "Manual", after: "Covered" },
] as const;

export function CapabilityDepthDemo() {
  const [phase, setPhase] = useState<Phase>("baseline");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: Array<{ phase: Phase; duration: number }> = [
      { phase: "baseline", duration: 1200 },
      { phase: "first", duration: 900 },
      { phase: "second", duration: 900 },
      { phase: "third", duration: 900 },
      { phase: "hold", duration: 1800 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let step = 0;

    const run = () => {
      const current = timeline[step];
      setPhase(current.phase);

      timeoutId = setTimeout(() => {
        step += 1;
        if (step >= timeline.length) {
          step = 0;
          setCycle(value => value + 1);
        }
        run();
      }, current.duration);
    };

    timeoutId = setTimeout(run, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  const visibleCount =
    phase === "baseline" ? 0 :
    phase === "first" ? 1 :
    phase === "second" ? 2 :
    3;

  return (
    <div className="capability-depth-demo" key={cycle}>
      <div className="depth-list">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`depth-row ${visibleCount > index ? "is-visible" : ""}`}
          >
            <span className="depth-row-label">{row.label}</span>
            <div className="depth-row-values">
              <span className="depth-row-before">{row.before}</span>
              <span className="depth-row-arrow" aria-hidden="true">→</span>
              <strong>{visibleCount > index ? row.after : "Pending"}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className={`depth-note ${phase === "hold" ? "is-visible" : ""}`}>
        Updated for how the workflow is being run today
      </div>
    </div>
  );
}
