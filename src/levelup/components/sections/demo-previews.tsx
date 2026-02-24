import { CollaborativeCursorsDemo } from "@/speedrun/components/collaborative-cursors-demo";
import { SessionTimelineDemo } from "@/speedrun/components/session-timeline-demo";
import { KanbanMoveDemo } from "@/speedrun/components/kanban-move-demo";
import { OutcomesChecklistDemo } from "@/speedrun/components/outcomes-checklist-demo";
import { WorkflowBuilderDemo } from "@/marginal-gains/components/workflow-builder-demo";
import { AgentActivityDemo } from "@/marginal-gains/components/agent-activity-demo";
import { DiscussionThreadDemo } from "@/marginal-gains/components/discussion-thread-demo";
import { ProductGraphDemo } from "@/marginal-gains/components/product-graph-demo";
import { CapabilityDepthDemo } from "@/marginal-gains/components/capability-depth-demo";
import { CapabilitySpreadDemo } from "@/marginal-gains/components/capability-spread-demo";
import { MonthlyRhythmDemo } from "@/marginal-gains/components/monthly-rhythm-demo";

interface DemoPreviewProps {
  demoKey: "teamRoles" | "timeline" | "kanban" | "outcomes" | "workflowBuilder" | "agentActivity" | "discussionThread" | "productGraph" | "capabilityDepth" | "capabilitySpread" | "monthlyRhythm";
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
    case "discussionThread":
      return <DiscussionThreadDemo />;
    case "productGraph":
      return <ProductGraphDemo />;
    case "capabilityDepth":
      return <CapabilityDepthDemo />;
    case "capabilitySpread":
      return <CapabilitySpreadDemo />;
    case "monthlyRhythm":
      return <MonthlyRhythmDemo />;
    default:
      return null;
  }
}
