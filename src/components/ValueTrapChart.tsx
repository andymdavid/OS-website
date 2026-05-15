import { useMemo, useState } from "react";
import "./ValueTrapChart.css";

type PhaseId = "1" | "2" | "3" | "4" | "all";

interface Phase {
  id: Exclude<PhaseId, "all">;
  name: string;
  startX: number;
  endX: number;
  detail: string;
}

interface Point {
  x: number;
  y: number;
}

interface AnnotationPoint {
  id: string;
  phase: Exclude<PhaseId, "all">;
  x: number;
  curve: "revenue" | "expenses";
  title: string;
  description: string;
}

const phases: Phase[] = [
  {
    id: "1",
    name: "Cost Reductions",
    startX: 0,
    endX: 1.5,
    detail:
      "Early adopters reduce operating costs fast while revenue holds. The first edge comes from removing labor-heavy drag from repeated workflows.",
  },
  {
    id: "2",
    name: "Growth",
    startX: 1.5,
    endX: 3,
    detail:
      "Lower costs create pricing power and more room to grow. The business can take on more work without the same increase in headcount.",
  },
  {
    id: "3",
    name: "Competition",
    startX: 3,
    endX: 4.5,
    detail:
      "As similar systems spread through the market, the edge starts to compress. Revenue comes under pressure as competitors catch up.",
  },
  {
    id: "4",
    name: "Mean Reversion",
    startX: 4.5,
    endX: 6,
    detail:
      "AI becomes table stakes. Costs stay structurally lower, but excess returns are competed away and the market settles into a new baseline.",
  },
];

const revenueData: Point[] = [
  { x: 0, y: 100 },
  { x: 0.5, y: 101 },
  { x: 1, y: 103 },
  { x: 1.5, y: 108 },
  { x: 2, y: 115 },
  { x: 2.5, y: 125 },
  { x: 3, y: 135 },
  { x: 3.5, y: 130 },
  { x: 4, y: 115 },
  { x: 4.5, y: 90 },
  { x: 5, y: 60 },
  { x: 5.5, y: 35 },
  { x: 6, y: 20 },
];

const expenseData: Point[] = [
  { x: 0, y: 90 },
  { x: 0.5, y: 70 },
  { x: 1, y: 55 },
  { x: 1.5, y: 45 },
  { x: 2, y: 38 },
  { x: 2.5, y: 32 },
  { x: 3, y: 28 },
  { x: 3.5, y: 25 },
  { x: 4, y: 22 },
  { x: 4.5, y: 20 },
  { x: 5, y: 17 },
  { x: 5.5, y: 15 },
  { x: 6, y: 13 },
];

const annotationPoints: AnnotationPoint[] = [
  {
    id: "a1",
    phase: "1",
    x: 0.5,
    curve: "expenses",
    title: "Initial automation",
    description:
      "The first gains come from removing repeated manual work. Revenue is still steady, but operating expenses start dropping fast.",
  },
  {
    id: "a2",
    phase: "2",
    x: 2.4,
    curve: "revenue",
    title: "Growth decouples from headcount",
    description:
      "The business can take on more work without the same increase in labour. That is where the model starts to feel very different.",
  },
  {
    id: "a3",
    phase: "3",
    x: 3.7,
    curve: "revenue",
    title: "Competitive pressure arrives",
    description:
      "Once similar systems spread through the market, excess returns start getting competed away and pricing power tightens.",
  },
  {
    id: "a4",
    phase: "4",
    x: 5.2,
    curve: "expenses",
    title: "New baseline",
    description:
      "AI becomes table stakes. Costs remain structurally lower, but the market settles into a new equilibrium and margins revert.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getInterpolatedY(x: number, data: Point[]) {
  for (let index = 0; index < data.length - 1; index += 1) {
    const current = data[index];
    const next = data[index + 1];
    if (x === current.x) return current.y;
    if (x > current.x && x < next.x) {
      const ratio = (x - current.x) / (next.x - current.x);
      return current.y + (next.y - current.y) * ratio;
    }
  }
  return data[data.length - 1]?.y ?? 0;
}

function buildLinePath(data: Point[], xFrom: (value: number) => number, yFrom: (value: number) => number) {
  return data
    .map((point, index) => `${index === 0 ? "M" : "L"} ${xFrom(point.x)} ${yFrom(point.y)}`)
    .join(" ");
}

function buildAreaPath(data: Point[], xFrom: (value: number) => number, yFrom: (value: number) => number, baseline: number) {
  const line = buildLinePath(data, xFrom, yFrom);
  const last = data[data.length - 1];
  const first = data[0];
  return `${line} L ${xFrom(last.x)} ${baseline} L ${xFrom(first.x)} ${baseline} Z`;
}

function ChartFrame({
  phase,
  onPhaseChange,
  compact = false,
}: {
  phase: PhaseId;
  onPhaseChange: (value: PhaseId) => void;
  compact?: boolean;
}) {
  const [tooltip, setTooltip] = useState<{
    title: string;
    description: string;
    x: number;
    y: number;
  } | null>(null);
  const width = compact ? 760 : 1120;
  const height = compact ? 360 : 540;
  const margin = compact
    ? { top: 14, right: 18, bottom: 40, left: 42 }
    : { top: 18, right: 28, bottom: 48, left: 52 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const yMax = 150;

  const xDomain = useMemo<[number, number]>(() => {
    if (phase === "all") return [0, 6];
    const current = phases.find((entry) => entry.id === phase);
    return current ? [current.startX, current.endX] : [0, 6];
  }, [phase]);

  const xFrom = (value: number) => ((value - xDomain[0]) / (xDomain[1] - xDomain[0])) * innerWidth;
  const yFrom = (value: number) => innerHeight - (value / yMax) * innerHeight;

  const visiblePhase = phase === "all" ? null : phases.find((entry) => entry.id === phase) ?? null;

  return (
    <div className={`value-trap-chart${compact ? " is-compact" : " is-expanded"}`}>
      <div className="value-trap-chart-top">
        <div>
          <h3>The Value Trap</h3>
        </div>
        <div className="value-trap-chart-legend">
          <span className="revenue">Revenue</span>
          <span className="expenses">Operating expenses</span>
        </div>
      </div>

      <div className="value-trap-chart-controls">
        {phases.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={phase === entry.id ? "is-active" : undefined}
            onClick={() => onPhaseChange(entry.id)}
          >
            {entry.name}
          </button>
        ))}
        <button
          type="button"
          className={phase === "all" ? "is-active" : undefined}
          onClick={() => onPhaseChange("all")}
        >
          Full view
        </button>
      </div>

      <div className="value-trap-chart-shell">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Value trap chart">
          <defs>
            <linearGradient id="value-trap-revenue-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(91, 241, 160, 0.68)" />
              <stop offset="100%" stopColor="rgba(91, 241, 160, 0.04)" />
            </linearGradient>
            <linearGradient id="value-trap-expense-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(47, 212, 188, 0.58)" />
              <stop offset="100%" stopColor="rgba(47, 212, 188, 0.04)" />
            </linearGradient>
          </defs>

          <g transform={`translate(${margin.left} ${margin.top})`}>
            {phases.map((entry) => {
              const start = clamp(entry.startX, xDomain[0], xDomain[1]);
              const end = clamp(entry.endX, xDomain[0], xDomain[1]);
              if (end <= xDomain[0] || start >= xDomain[1]) return null;

              return (
                <g key={entry.id}>
                  {phase === entry.id ? (
                    <rect
                      x={xFrom(start)}
                      y={0}
                      width={Math.max(0, xFrom(end) - xFrom(start))}
                      height={innerHeight}
                      fill="rgba(255,255,255,0.03)"
                    />
                  ) : null}
                  {entry.startX > xDomain[0] && entry.startX < xDomain[1] ? (
                    <line
                      x1={xFrom(entry.startX)}
                      x2={xFrom(entry.startX)}
                      y1={0}
                      y2={innerHeight}
                      stroke="rgba(240,240,240,0.12)"
                      strokeDasharray="5 7"
                    />
                  ) : null}
                </g>
              );
            })}

            {[0, 50, 100, 150].map((tick) => (
              <g key={tick}>
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={yFrom(tick)}
                  y2={yFrom(tick)}
                  stroke="rgba(240,240,240,0.08)"
                />
                <text x={-12} y={yFrom(tick) + 4} textAnchor="end">
                  {tick}
                </text>
              </g>
            ))}

            {[0, 1, 2, 3, 4, 5, 6]
              .filter((tick) => tick >= xDomain[0] && tick <= xDomain[1])
              .map((tick) => (
                <text key={tick} x={xFrom(tick)} y={innerHeight + 26} textAnchor="middle">
                  {tick}
                </text>
              ))}

            <path
              d={buildAreaPath(revenueData, xFrom, yFrom, innerHeight)}
              fill="url(#value-trap-revenue-fill)"
            />
            <path
              d={buildAreaPath(expenseData, xFrom, yFrom, innerHeight)}
              fill="url(#value-trap-expense-fill)"
            />

            <path
              d={buildLinePath(revenueData, xFrom, yFrom)}
              fill="none"
              stroke="rgba(91, 241, 160, 0.95)"
              strokeWidth={compact ? 3 : 4}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d={buildLinePath(expenseData, xFrom, yFrom)}
              fill="none"
              stroke="rgba(19, 142, 126, 0.98)"
              strokeWidth={compact ? 3 : 4}
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {annotationPoints
              .filter((point) => phase === "all" || point.phase === phase)
              .filter((point) => point.x >= xDomain[0] && point.x <= xDomain[1])
              .map((point) => {
                const y = getInterpolatedY(
                  point.x,
                  point.curve === "revenue" ? revenueData : expenseData,
                );
                const cx = xFrom(point.x);
                const cy = yFrom(y);

                return (
                  <g key={point.id}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={compact ? 6 : 7}
                      fill={point.curve === "revenue" ? "rgba(91, 241, 160, 0.98)" : "rgba(19, 142, 126, 0.98)"}
                      stroke="rgba(12, 12, 12, 0.92)"
                      strokeWidth="2"
                      onMouseEnter={() =>
                        setTooltip({
                          title: point.title,
                          description: point.description,
                          x: cx,
                          y: cy,
                        })
                      }
                      onMouseLeave={() => setTooltip(null)}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={compact ? 12 : 14}
                      fill="transparent"
                      onMouseEnter={() =>
                        setTooltip({
                          title: point.title,
                          description: point.description,
                          x: cx,
                          y: cy,
                        })
                      }
                      onMouseLeave={() => setTooltip(null)}
                    />
                  </g>
                );
              })}

            <line
              x1={xFrom(0.5)}
              x2={xFrom(0.5)}
              y1={0}
              y2={innerHeight}
              stroke="rgba(255, 122, 122, 0.9)"
              strokeWidth="1.5"
            />
            <text
              x={xFrom(0.5)}
              y={8}
              textAnchor="middle"
              className="value-trap-chart-here"
            >
              We are here
            </text>
          </g>
        </svg>
        {tooltip ? (
          <div
            className="value-trap-chart-tooltip"
            style={{
              left: `${compact ? (tooltip.x / width) * 100 : (tooltip.x / width) * 100}%`,
              top: `${compact ? (tooltip.y / height) * 100 : (tooltip.y / height) * 100}%`,
            }}
          >
            <h5>{tooltip.title}</h5>
            <p>{tooltip.description}</p>
          </div>
        ) : null}
      </div>

      <div className="value-trap-chart-note">
        <p>
          {visiblePhase
            ? visiblePhase.detail
            : "Early adopters create a large edge through falling costs and growth. Over time that edge compresses as similar AI systems spread through the market."}
        </p>
      </div>
    </div>
  );
}

export function ValueTrapChart() {
  const [phase, setPhase] = useState<PhaseId>("all");
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="value-trap-embed">
        <div className="value-trap-embed-header">
          <button type="button" className="value-trap-expand-btn" onClick={() => setExpanded(true)}>
            Expand
          </button>
        </div>
        <ChartFrame phase={phase} onPhaseChange={setPhase} compact />
      </div>

      {expanded ? (
        <div className="value-trap-modal" role="dialog" aria-modal="true" aria-label="Expanded value trap chart">
          <div className="value-trap-modal-backdrop" onClick={() => setExpanded(false)} />
          <div className="value-trap-modal-panel">
            <button
              type="button"
              className="value-trap-close-btn"
              onClick={() => setExpanded(false)}
              aria-label="Close expanded chart"
            >
              Close
            </button>
            <ChartFrame phase={phase} onPhaseChange={setPhase} />
          </div>
        </div>
      ) : null}
    </>
  );
}
