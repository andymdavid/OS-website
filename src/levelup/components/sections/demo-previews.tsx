import { CollaborativeCursorsDemo } from "@/speedrun/components/collaborative-cursors-demo";
import { SessionTimelineDemo } from "@/speedrun/components/session-timeline-demo";
import { KanbanMoveDemo } from "@/speedrun/components/kanban-move-demo";
import { OutcomesChecklistDemo } from "@/speedrun/components/outcomes-checklist-demo";
import { WorkflowBuilderDemo } from "@/marginal-gains/components/workflow-builder-demo";
import { AgentActivityDemo } from "@/marginal-gains/components/agent-activity-demo";

interface DemoPreviewProps {
  demoKey: "teamRoles" | "timeline" | "kanban" | "outcomes" | "workflowBuilder" | "agentActivity";
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
    case "workflowBuilder":
      return <WorkflowBuilderDemo />;
    case "agentActivity":
      return <AgentActivityDemo />;
    default:
      return null;
  }
}
