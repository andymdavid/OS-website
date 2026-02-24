import "./session-timeline-demo.css";

interface TimelineStage {
  label: string;
  duration: string;
  isMain?: boolean;
}

const stages: TimelineStage[] = [
  { label: "Intro & setup", duration: "15 mins" },
  { label: "Build the app", duration: "90 mins", isMain: true },
  { label: "Add an agent", duration: "45 mins" },
  { label: "Review & next steps", duration: "30 mins" },
];

export function SessionTimelineDemo() {
  return (
    <div className="session-timeline-demo">
      <div className="session-timeline-stages">
        {stages.map((stage, index) => (
          <div key={stage.label} className="session-timeline-item">
            {index > 0 && <div className="session-timeline-connector" />}
            <div className={`session-timeline-stage ${stage.isMain ? "main" : ""}`}>
              <span className="session-stage-label">{stage.label}</span>
              <span className="session-stage-duration">
                {stage.isMain && <span className="session-stage-pulse" />}
                {stage.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
