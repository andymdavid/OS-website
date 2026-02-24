import { CollaborativeCursorsDemo } from "@/speedrun/components/collaborative-cursors-demo";
import { SessionTimelineDemo } from "@/speedrun/components/session-timeline-demo";
import { KanbanMoveDemo } from "@/speedrun/components/kanban-move-demo";

interface DemoPreviewProps {
  demoKey: "teamRoles" | "timeline" | "kanban" | "outcomes";
}

export function DemoPreview({ demoKey }: DemoPreviewProps) {
  switch (demoKey) {
    case "teamRoles":
      return <CollaborativeCursorsDemo />;
    case "timeline":
      return <SessionTimelineDemo />;
    case "kanban":
      return <KanbanMoveDemo />;
    case "outcomes":
      return (
        <div className="demo-window">
          <div className="demo-window-header">
            <div className="demo-window-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="demo-window-title">Outcome</span>
          </div>
          <div className="demo-window-content">
            <div className="demo-task-app">
              <div className="demo-task-header">
                <span className="demo-task-title">Working tool</span>
                <span className="demo-add-btn">Ready</span>
              </div>
              <div className="demo-task-list">
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  App built in-session
                </div>
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  Team confident to extend
                </div>
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  Clear next steps
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
