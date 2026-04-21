import { useEffect, useState } from "react";
import "./discussion-thread-demo.css";

type Status = "open" | "reviewing" | "resolved";

export function DiscussionThreadDemo() {
  const [status, setStatus] = useState<Status>("open");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: Array<{ status: Status; duration: number }> = [
      { status: "open", duration: 1400 },
      { status: "reviewing", duration: 1400 },
      { status: "resolved", duration: 2200 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let step = 0;

    const run = () => {
      const current = timeline[step];
      setStatus(current.status);

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

  return (
    <div className="discussion-thread-demo" key={cycle}>
      <div className="support-ticket">
        <div className="support-ticket-header">
          <span className="support-ticket-title">Proposal pricing logic</span>
          <span className={`support-status support-status-${status}`}>
            {status === "open" ? "Open" : status === "reviewing" ? "Reviewing" : "Resolved"}
          </span>
        </div>

        <div className="support-ticket-body">
          <div className="support-line">
            <span className="support-line-label">Issue</span>
            <strong>Wrong rate card</strong>
          </div>

          <div className={`support-line ${status === "reviewing" || status === "resolved" ? "is-visible" : ""}`}>
            <span className="support-line-label">Action</span>
            <strong>Reviewing rule in context</strong>
          </div>

          <div className={`support-line ${status === "resolved" ? "is-visible support-line-resolved" : ""}`}>
            <span className="support-line-label">Outcome</span>
            <strong>Rule updated</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
