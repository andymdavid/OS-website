import { useState, useEffect } from "react";
import "./capability-spread-demo.css";

type Phase = "idle" | "ops" | "sales" | "connect" | "finance" | "insight" | "hold";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  agent: string;
  activePhase: Phase;
}

const team: TeamMember[] = [
  { id: "ops", name: "Sarah", role: "Ops", initials: "SC", color: "#2ea782", agent: "Inbox Agent", activePhase: "ops" },
  { id: "sales", name: "Marcus", role: "Sales", initials: "MW", color: "#4a90d9", agent: "CRM Agent", activePhase: "sales" },
  { id: "finance", name: "Priya", role: "Finance", initials: "PS", color: "#d4a574", agent: "Invoice Agent", activePhase: "finance" },
];

export function CapabilitySpreadDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timeline: { phase: Phase; duration: number }[] = [
      { phase: "idle", duration: 800 },
      { phase: "ops", duration: 1200 },
      { phase: "sales", duration: 1200 },
      { phase: "connect", duration: 800 },
      { phase: "finance", duration: 1200 },
      { phase: "insight", duration: 2500 },
      { phase: "hold", duration: 1500 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentStep = 0;

    const runStep = () => {
      const step = timeline[currentStep];
      setPhase(step.phase);

      timeoutId = setTimeout(() => {
        currentStep++;
        if (currentStep >= timeline.length) {
          currentStep = 0;
          setCycle((c) => c + 1);
        }
        runStep();
      }, step.duration);
    };

    timeoutId = setTimeout(runStep, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  const isActive = (member: TeamMember) => {
    const phaseOrder: Phase[] = ["ops", "sales", "connect", "finance", "insight", "hold"];
    const memberIndex = phaseOrder.indexOf(member.activePhase);
    const currentIndex = phaseOrder.indexOf(phase);
    return currentIndex >= memberIndex && currentIndex > 0;
  };

  const showConnections = ["connect", "finance", "insight", "hold"].includes(phase);
  const showInsight = ["insight", "hold"].includes(phase);

  return (
    <div className="capability-spread-demo" key={cycle}>
      {/* Team members */}
      <div className="spread-team">
        {team.map((member) => (
          <div
            key={member.id}
            className={`spread-member ${isActive(member) ? "active" : ""}`}
          >
            <div
              className="spread-avatar"
              style={{ background: isActive(member) ? member.color : "#404040" }}
            >
              {member.initials}
            </div>
            <div className="spread-info">
              <span className="spread-name">{member.name}</span>
              <span className="spread-role">{member.role}</span>
            </div>
            {isActive(member) && (
              <div className="spread-agent">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{member.agent}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connection lines */}
      <svg className={`spread-connections ${showConnections ? "visible" : ""}`} viewBox="0 0 100 20">
        <path
          d="M 20 10 Q 50 -5 80 10"
          fill="none"
          stroke="rgba(46, 167, 130, 0.4)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <path
          d="M 20 10 L 50 10"
          fill="none"
          stroke="rgba(46, 167, 130, 0.4)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <path
          d="M 50 10 L 80 10"
          fill="none"
          stroke="rgba(46, 167, 130, 0.4)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Shared insight */}
      <div className={`spread-insight ${showInsight ? "visible" : ""}`}>
        <div className="spread-insight-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
          </svg>
        </div>
        <span className="spread-insight-text">
          "CRM sync pattern works for invoicing too"
        </span>
      </div>
    </div>
  );
}
