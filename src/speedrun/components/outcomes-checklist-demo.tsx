import { useState, useEffect } from "react";
import "./outcomes-checklist-demo.css";

const checklistItems = [
  "App built in-session",
  "Team confident to extend",
  "Clear next steps",
];

export function OutcomesChecklistDemo() {
  const [checkedCount, setCheckedCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timings = [
      { count: 0, duration: 1500 },  // All unchecked
      { count: 1, duration: 800 },   // First checked
      { count: 2, duration: 800 },   // Second checked
      { count: 3, duration: 2500 },  // All checked, hold
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let step = 0;

    const runStep = () => {
      setCheckedCount(timings[step].count);

      timeoutId = setTimeout(() => {
        step++;
        if (step >= timings.length) {
          step = 0;
          setCycle((c) => c + 1);
        }
        runStep();
      }, timings[step].duration);
    };

    timeoutId = setTimeout(runStep, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="outcomes-checklist-demo" key={cycle}>
      <div className="outcomes-list">
        {checklistItems.map((item, index) => {
          const isChecked = index < checkedCount;
          return (
            <div key={index} className={`outcomes-item ${isChecked ? "checked" : ""}`}>
              <span className={`outcomes-checkbox ${isChecked ? "checked" : ""}`}>
                {isChecked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="outcomes-text">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
