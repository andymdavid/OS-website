import { useState, useEffect } from "react";
import "./agent-activity-demo.css";

interface ActivityItem {
  id: number;
  agent: string;
  action: string;
  detail: string;
  status: "success" | "running" | "info";
}

const activityItems: ActivityItem[] = [
  { id: 1, agent: "Inbox Agent", action: "completed", detail: "Sorted 12 emails", status: "success" },
  { id: 2, agent: "Report Agent", action: "started", detail: "Weekly summary", status: "running" },
  { id: 3, agent: "CRM Agent", action: "updated", detail: "3 contacts synced", status: "success" },
  { id: 4, agent: "Slack Agent", action: "posted", detail: "Team standup reminder", status: "info" },
  { id: 5, agent: "Report Agent", action: "completed", detail: "Weekly summary", status: "success" },
];

export function AgentActivityDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      setVisibleCount((prev) => {
        if (prev >= activityItems.length) {
          // Hold then reset
          timeoutId = setTimeout(() => {
            setVisibleCount(0);
            setCycle((c) => c + 1);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });

      if (visibleCount < activityItems.length) {
        timeoutId = setTimeout(showNext, 900);
      }
    };

    timeoutId = setTimeout(showNext, 600);
    return () => clearTimeout(timeoutId);
  }, [cycle, visibleCount]);

  const getStatusIcon = (status: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
      case "running":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spinning">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
          </svg>
        );
      case "info":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="agent-activity-demo" key={cycle}>
      <div className="activity-header">
        <span className="activity-title">Agent Activity</span>
        <span className="activity-status">
          <span className="status-dot" />
          Live
        </span>
      </div>
      <div className="activity-feed">
        {activityItems.slice(0, visibleCount).map((item, index) => (
          <div
            key={`${item.id}-${cycle}`}
            className={`activity-item ${item.status}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`activity-icon ${item.status}`}>
              {getStatusIcon(item.status)}
            </div>
            <div className="activity-content">
              <span className="activity-agent">{item.agent}</span>
              <span className="activity-action">{item.action}</span>
              <span className="activity-detail">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
