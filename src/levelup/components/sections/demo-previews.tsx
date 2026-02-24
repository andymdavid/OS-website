import { CollaborativeCursorsDemo } from "@/speedrun/components/collaborative-cursors-demo";
import { SessionTimelineDemo } from "@/speedrun/components/session-timeline-demo";
import { KanbanMoveDemo } from "@/speedrun/components/kanban-move-demo";
import { OutcomesChecklistDemo } from "@/speedrun/components/outcomes-checklist-demo";

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
      return <OutcomesChecklistDemo />;
    default:
      return null;
  }
}
