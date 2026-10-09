import './HomeDuplicateComparison.css';
import { CAL_DISCOVERY_URL } from '../lib/links';
import { BookCallContent } from './BookCallContent';
import { useState } from 'react';

type FitValue = 'yes' | 'partial' | 'no';

interface ComparisonRow {
  label: string;
  note?: string;
  values: [FitValue, FitValue, FitValue, FitValue];
}

const columns = ['SaaS', 'Agency', 'Full-time Hire', 'Other Stuff'];

const rows: ComparisonRow[] = [
  {
    label: 'Working in weeks, not months',
    values: ['partial', 'no', 'no', 'yes'],
  },
  {
    label: 'Month to month, cancel anytime',
    values: ['yes', 'no', 'no', 'yes'],
  },
  {
    label: 'Built around how you work',
    values: ['no', 'yes', 'yes', 'yes'],
  },
  {
    label: 'AI agents doing real work',
    values: ['no', 'partial', 'partial', 'yes'],
  },
  {
    label: 'Knows your business',
    values: ['no', 'partial', 'partial', 'yes'],
  },
  {
    label: 'A person signs off before anything goes out',
    values: ['partial', 'partial', 'partial', 'yes'],
  },
  {
    label: 'Your team trained to run it',
    values: ['no', 'partial', 'no', 'yes'],
  },
  {
    label: 'Custom software when you need it',
    values: ['no', 'yes', 'partial', 'yes'],
  },
  {
    label: 'Open source, no lock-in',
    values: ['no', 'partial', 'partial', 'yes'],
  },
];

const valueLabels: Record<FitValue, string> = {
  yes: 'Included',
  partial: 'Depends or costs extra',
  no: 'Usually no',
};

const valueSymbols: Record<FitValue, string> = {
  yes: '✓',
  partial: '◐',
  no: '–',
};

export function HomeDuplicateComparison() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  return (
    <section className="section home-comparison-section">
      <div className="section-container-wide">
        <div className="home-comparison-intro">
          <div className="home-comparison-heading">
            <div className="intro-pill fade-in">WHY THIS MODEL</div>
            <h2 className="section-heading fade-in fade-in-stagger-1">
              A better way to bring AI
              <br />
              into your business.
            </h2>
          </div>

          <div className="home-comparison-intro-copy">
            <p className="home-comparison-copy fade-in fade-in-stagger-2">
              Software subscriptions don&apos;t know your business. Agencies want a big project before
              you see anything work. A new hire is expensive and slow to get up to speed. We start
              small and show you results in the first month.
            </p>
            <a
              className="home-comparison-cta book-call-button fade-in fade-in-stagger-3"
              href={CAL_DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookCallContent />
            </a>
          </div>
        </div>

        <div className="home-comparison-table-shell fade-in fade-in-stagger-3">
          <div className="home-comparison-scroll-cue" aria-hidden="true">
            <span>Swipe to compare</span>
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M14 7l5 5-5 5" />
            </svg>
          </div>
          <div className="home-comparison-table-wrap">
            <table className="home-comparison-table">
            <colgroup>
              <col className="comparison-criteria-col" />
              <col className="comparison-standard-col" />
              <col className="comparison-standard-col" />
              <col className="comparison-standard-col" />
              <col className="comparison-other-col" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" aria-label="Comparison criteria"></th>
                {columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  onMouseEnter={(event) => {
                    if (!row.note) return;
                    setTooltip({ text: row.note, x: event.clientX, y: event.clientY });
                  }}
                  onMouseMove={(event) => {
                    if (!row.note) return;
                    setTooltip({ text: row.note, x: event.clientX, y: event.clientY });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <th scope="row">
                    <span className="comparison-row-label">{row.label}</span>
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${columns[index]}`}
                      className={`comparison-value comparison-value-${value}`}
                    >
                      <span aria-label={`${columns[index]}: ${valueLabels[value]}`}>
                        {valueSymbols[value]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
        {tooltip && (
          <div
            className="home-comparison-tooltip"
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            {tooltip.text}
          </div>
        )}

        <div className="home-comparison-legend" aria-label="Comparison legend">
          <span><b className="comparison-value-yes">✓</b> Included</span>
          <span><b className="comparison-value-partial">◐</b> Depends or costs extra</span>
          <span><b className="comparison-value-no">–</b> Usually no</span>
        </div>
      </div>
    </section>
  );
}
