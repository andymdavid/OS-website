import { useEffect, useRef, useState } from "react";
import "./AIAuditQuestionnaireDemo.css";

interface QuestionnaireStep {
  eyebrow: string;
  prompt: string;
  helper: string;
  answers: string[];
  progress: number;
}

const steps: QuestionnaireStep[] = [
  {
    eyebrow: "Workflow mapping",
    prompt: "Which workflow in your business consumes the most repeated manual time each week?",
    helper: "Choose the area where friction is most persistent.",
    answers: ["Quoting and proposals", "Enquiry handling and follow-up", "Reporting and admin handoff"],
    progress: 0.32,
  },
  {
    eyebrow: "Commercial impact",
    prompt: "Where would better automation create the clearest upside first?",
    helper: "We assess margin, capital, and operational reliability.",
    answers: ["Free up senior staff time", "Reduce delays and missed follow-up", "Improve visibility across jobs and cashflow"],
    progress: 0.61,
  },
  {
    eyebrow: "Operational risk",
    prompt: "What currently breaks down when this process gets busy?",
    helper: "This helps identify where a focused system would remove risk.",
    answers: ["Work sits in inboxes too long", "Knowledge depends on one person", "Manual updates get missed across teams"],
    progress: 0.88,
  },
];

export function AIAuditQuestionnaireDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleAnswers, setVisibleAnswers] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    setVisibleAnswers(0);
    const answerTimers = steps[activeStep].answers.map((_, index) =>
      window.setTimeout(() => {
        setVisibleAnswers(index + 1);
      }, 260 * (index + 1))
    );

    const stepTimer = window.setTimeout(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 4200);

    return () => {
      answerTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(stepTimer);
    };
  }, [activeStep, hasStarted]);

  const step = steps[activeStep];

  return (
    <div className="ai-audit-demo-shell" ref={containerRef}>
      <div className="ai-audit-demo-panel">
        <div className="ai-audit-demo-header">
          <h4>Questionnaire</h4>
        </div>

        <div className="ai-audit-demo-progress">
          <div
            className="ai-audit-demo-progress-bar"
            style={{ transform: `scaleX(${step.progress})` }}
          />
        </div>

        <div className="ai-audit-demo-card">
          <span className="ai-audit-demo-eyebrow">{step.eyebrow}</span>
          <h3>{step.prompt}</h3>
          <p>{step.helper}</p>

          <div className="ai-audit-demo-options">
            {step.answers.map((answer, index) => (
              <div
                key={`${step.prompt}-${answer}`}
                className={`ai-audit-demo-option ${index < visibleAnswers ? "visible" : ""}`}
              >
                <span className="ai-audit-demo-option-index">{index + 1}</span>
                <span>{answer}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
