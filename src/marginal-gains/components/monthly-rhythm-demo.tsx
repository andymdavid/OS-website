import { useEffect, useState } from "react";
import "./monthly-rhythm-demo.css";

type Phase = "baseline" | "promote" | "improve" | "hold";

const lanes = [
  {
    label: "Live systems",
    items: [
      { name: "Proposal Builder", note: "Pricing rules updated", state: "steady" },
      { name: "Inventory Alerts", note: "Thresholds reviewed", state: "improved" },
    ],
  },
  {
    label: "In progress",
    items: [
      { name: "Client Briefing agent", note: "Deployment this month", state: "active" },
    ],
  },
  {
    label: "Next up",
    items: [
      { name: "Project reporting workflow", note: "Ready to scope", state: "queued" },
    ],
  },
] as const;

export function MonthlyRhythmDemo() {
  const [phase, setPhase] = useState<Phase>("baseline");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: Array<{ phase: Phase; duration: number }> = [
      { phase: "baseline", duration: 1200 },
      { phase: "promote", duration: 1200 },
      { phase: "improve", duration: 1400 },
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

    timeoutId = setTimeout(run, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="monthly-rhythm-demo" key={cycle}>
      <div className="rhythm-board">
        <div className={`rhythm-lane rhythm-lane-live ${phase === "improve" || phase === "hold" ? "is-improved" : ""}`}>
          <span className="rhythm-lane-label">Live systems</span>
          <strong>Proposal Builder</strong>
          <span className="rhythm-lane-note">
            {phase === "improve" || phase === "hold" ? "Pricing rules updated" : "Running live"}
          </span>
        </div>

        <div className={`rhythm-lane rhythm-lane-progress ${phase === "promote" || phase === "improve" || phase === "hold" ? "is-promoted" : ""}`}>
          <span className="rhythm-lane-label">In progress</span>
          <strong>Project reporting workflow</strong>
          <span className="rhythm-lane-note">Active this month</span>
        </div>

        <div className={`rhythm-lane rhythm-lane-next ${phase === "promote" || phase === "improve" || phase === "hold" ? "is-muted" : ""}`}>
          <span className="rhythm-lane-label">Next up</span>
          <strong>Client briefing refresh</strong>
          <span className="rhythm-lane-note">Ready to scope</span>
        </div>
      </div>
    </div>
  );
}
