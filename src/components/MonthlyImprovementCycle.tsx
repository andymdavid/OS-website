import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import './MonthlyImprovementCycle.css';
import './MonthlyCycleScene.css';

type CycleTone = 'green' | 'orange';

type CycleMilestone = {
  label: string;
  position: number;
  week: number;
  active?: boolean;
};

type ImprovementTrack = {
  number: string;
  title: string;
  description: string;
  tone: CycleTone;
  start: number;
  milestones: CycleMilestone[];
};

const weeks = [
  { title: 'Week 1', description: 'Identify, build and deliver' },
  { title: 'Week 2', description: 'In use and feedback' },
  { title: 'Week 3', description: 'Refine and iterate' },
  { title: 'Week 4', description: 'Continue using' },
] as const;

const improvements: ImprovementTrack[] = [
  {
    number: '01',
    title: 'Improvement 1',
    description: 'Agreed in this cycle',
    tone: 'green',
    start: 3,
    milestones: [
      { label: 'Identify & build', position: 3, week: 1, active: true },
      { label: 'In use', position: 22, week: 2 },
      { label: 'Feedback', position: 41, week: 2 },
      { label: 'Refine', position: 62, week: 3 },
    ],
  },
  {
    number: '02',
    title: 'Improvement 2',
    description: 'Optional additional improvement',
    tone: 'orange',
    start: 37,
    milestones: [
      { label: 'Identify & build', position: 37, week: 2, active: true },
      { label: 'In use', position: 58, week: 3 },
      { label: 'Feedback and refine', position: 76, week: 4 },
    ],
  },
];

function DesktopCycle() {
  return (
    <div className="mg-cycle-scene" aria-hidden="true">
      <div className="mg-cycle-scene-glow" />
      <div className="mg-cycle-scene-heading">
        <span className="mg-cycle-scene-rule" />
        <span>Monthly improvement cycle</span>
        <span className="mg-cycle-scene-rule" />
      </div>

      <div className="mg-cycle-scene-axis">
        <div className="mg-cycle-scene-axis-spacer" />
        {weeks.map((week) => (
          <div className="mg-cycle-scene-week" key={week.title}>
            <span>{week.title}</span>
            <small>{week.description}</small>
          </div>
        ))}
        <div className="mg-cycle-scene-next">
          <span>Next month</span>
          <small>Agree priorities</small>
          <ArrowRight />
        </div>
      </div>

      <div className="mg-cycle-scene-body">
        <div className="mg-cycle-scene-grid" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
        {improvements.map((track) => (
          <div className={`mg-cycle-scene-row mg-cycle-tone-${track.tone}`} key={track.number}>
            <div className="mg-cycle-scene-label">
              <span className="mg-cycle-scene-label-index">{track.number}</span>
              <span className="mg-cycle-scene-label-dot" />
              <div>
                <strong>{track.title}</strong>
                <small>{track.description}</small>
              </div>
            </div>
            <div className="mg-cycle-scene-lane">
              <span
                className="mg-cycle-scene-line"
                style={{ '--mg-cycle-track-start': `${track.start}%` } as CSSProperties}
              />
              {track.milestones.map((milestone) => (
                <span
                  className={`mg-cycle-scene-milestone ${milestone.active ? 'is-active' : ''}`}
                  style={{ '--mg-cycle-position': `${milestone.position}%` } as CSSProperties}
                  key={`${track.number}-${milestone.label}`}
                >
                  <i />
                  <small>{milestone.label}</small>
                </span>
              ))}
              <span className="mg-cycle-scene-end"><ArrowRight /></span>
            </div>
            <span className="mg-cycle-scene-tail" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCycle() {
  return (
    <div className="mg-cycle-mobile" aria-hidden="true">
      <div className="mg-cycle-mobile-heading">Monthly improvement cycle</div>
      <ol className="mg-cycle-mobile-weeks">
        {weeks.map((week, weekIndex) => {
          const milestones = improvements.flatMap((track) =>
            track.milestones
              .filter((milestone) => milestone.week === weekIndex + 1)
              .map((milestone) => ({ ...milestone, track })),
          );

          return (
            <li className="mg-cycle-mobile-week" key={week.title}>
              <div className="mg-cycle-mobile-week-copy">
                <span>{week.title}</span>
                <small>{week.description}</small>
              </div>
              <div className="mg-cycle-mobile-events">
                {milestones.map(({ track, ...milestone }) => (
                  <div className={`mg-cycle-mobile-event mg-cycle-tone-${track.tone}`} key={`${track.number}-${milestone.label}`}>
                    <span className={`mg-cycle-mobile-dot ${milestone.active ? 'is-active' : ''}`} />
                    <div>
                      <span>{track.title}</span>
                      <small>{milestone.label}</small>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mg-cycle-mobile-next">
        <div>
          <span>Next month</span>
          <small>Agree priorities</small>
        </div>
        <i aria-hidden="true"><ArrowRight /></i>
      </div>
    </div>
  );
}

export function MonthlyImprovementCycle() {
  const cycleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cycle = cycleRef.current;
    if (!cycle || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        cycle.classList.add('mg-cycle-motion');
        observer.disconnect();
      },
      { threshold: 0.55, rootMargin: '0px 0px -14% 0px' },
    );

    observer.observe(cycle);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cycleRef} className="mg-cycle">
      <div className="mg-cycle-accessible">
        <span>Monthly improvement cycle.</span>
        <ol>
          {weeks.map((week) => (
            <li key={week.title}>{week.title}: {week.description}.</li>
          ))}
        </ol>
        <ul>
          {improvements.map((track) => (
            <li key={track.number}>
              {track.title}, {track.description}. {track.milestones.map((milestone) => milestone.label).join(', ')}.
            </li>
          ))}
        </ul>
        <span>Next month, agree priorities and begin the cycle again.</span>
      </div>
      <DesktopCycle />
      <MobileCycle />
    </div>
  );
}
