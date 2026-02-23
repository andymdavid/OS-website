interface DemoPreviewProps {
  demoKey: "teamRoles" | "timeline" | "kanban" | "outcomes";
}

export function DemoPreview({ demoKey }: DemoPreviewProps) {
  switch (demoKey) {
    case "teamRoles":
      return (
        <div className="demo-window">
          <div className="demo-window-header">
            <div className="demo-window-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="demo-window-title">Team roles</span>
          </div>
          <div className="demo-window-content">
            <div className="demo-task-app">
              <div className="demo-task-header">
                <span className="demo-task-title">Roles & workflows</span>
                <span className="demo-add-btn">No code</span>
              </div>
              <div className="demo-task-list">
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  Ops — weekly planning
                </div>
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  Sales — follow-ups
                </div>
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  Finance — monthly close
                </div>
                <div className="demo-task-item">
                  <span className="demo-checkbox checked" />
                  Support — inbox triage
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "timeline":
      return (
        <div className="demo-window">
          <div className="demo-window-header">
            <div className="demo-window-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="demo-window-title">Session flow</span>
          </div>
          <div className="demo-window-content">
            <div className="demo-workflow">
              <div className="demo-workflow-stage active">
                <span className="demo-stage-label">Intro & setup</span>
                <span className="demo-stage-status complete">15 mins</span>
              </div>
              <div className="demo-workflow-connector" />
              <div className="demo-workflow-stage active">
                <span className="demo-stage-label">Build the app</span>
                <span className="demo-stage-status running">
                  <span className="demo-pulse" />
                  90 mins
                </span>
              </div>
              <div className="demo-workflow-connector" />
              <div className="demo-workflow-stage">
                <span className="demo-stage-label">Add an agent</span>
                <span className="demo-stage-status">45 mins</span>
              </div>
              <div className="demo-workflow-connector dim" />
              <div className="demo-workflow-stage dim">
                <span className="demo-stage-label">Review & next steps</span>
                <span className="demo-stage-status">30 mins</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "kanban":
      return (
        <div className="demo-window">
          <div className="demo-window-header">
            <div className="demo-window-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="demo-window-title">Ops Kanban</span>
          </div>
          <div className="demo-window-content">
            <div className="kanban-demo demo-preview-scale demo-preview-kanban">
              <div className="kb-board visible">
                <div className="kb-board-header visible">
                  <span className="kb-board-title">Ops Kanban</span>
                  <span className="kb-board-badge">Live</span>
                </div>
                <div className="kb-columns">
                  <div className="kb-column visible">
                    <div className="kb-column-header">
                      <span className="kb-column-title">To Do</span>
                      <span className="kb-column-count">2</span>
                    </div>
                    <div className="kb-column-cards">
                      <div className="kb-card visible">
                        <span className="kb-card-title">Supplier emails</span>
                        <span className="kb-card-tag">Ops</span>
                      </div>
                      <div className="kb-card visible">
                        <span className="kb-card-title">Team roster</span>
                        <span className="kb-card-tag">Ops</span>
                      </div>
                    </div>
                  </div>
                  <div className="kb-column visible">
                    <div className="kb-column-header">
                      <span className="kb-column-title">In‑progress</span>
                      <span className="kb-column-count">1</span>
                    </div>
                    <div className="kb-column-cards">
                      <div className="kb-card visible">
                        <span className="kb-card-title">Weekly summary</span>
                        <span className="kb-card-tag">Agent</span>
                      </div>
                    </div>
                  </div>
                  <div className="kb-column visible">
                    <div className="kb-column-header">
                      <span className="kb-column-title">Done</span>
                      <span className="kb-column-count">1</span>
                    </div>
                    <div className="kb-column-cards">
                      <div className="kb-card visible">
                        <span className="kb-card-title">Draft update</span>
                        <span className="kb-card-tag done">Agent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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
