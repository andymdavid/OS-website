import { useEffect, useRef, useState } from 'react';
import './InventoryDemo.css';

type StockStatus = 'ok' | 'low-stock' | 'clearance' | 'incoming';
type Phase =
  | 'waiting'
  | 'table'
  | 'scan-low'
  | 'reorder'
  | 'reorder-exit'
  | 'scan-clearance'
  | 'notify'
  | 'notify-exit'
  | 'summary'
  | 'hold'
  | 'reset';

interface ProductRow {
  id: string;
  name: string;
  sku: string;
  stock: string;
  velocity: number;
  velocityLabel: string;
  status: StockStatus;
}

const baseRows: ProductRow[] = [
  {
    id: 'marine-filter',
    name: 'Marine Filter Kit',
    sku: 'MF-204',
    stock: '128 units',
    velocity: 76,
    velocityLabel: '76 / wk',
    status: 'ok',
  },
  {
    id: 'pressure-valve',
    name: 'Pressure Valve Set',
    sku: 'PV-118',
    stock: '12 units',
    velocity: 91,
    velocityLabel: '91 / wk',
    status: 'ok',
  },
  {
    id: 'sensor-pack',
    name: 'Sensor Pack XL',
    sku: 'SP-410',
    stock: '46 units',
    velocity: 58,
    velocityLabel: '58 / wk',
    status: 'incoming',
  },
  {
    id: 'cable-reel',
    name: 'Cable Reel Pro',
    sku: 'CR-082',
    stock: '83 units',
    velocity: 12,
    velocityLabel: '12 / wk',
    status: 'ok',
  },
  {
    id: 'housing-case',
    name: 'Housing Case Mini',
    sku: 'HC-067',
    stock: '31 units',
    velocity: 34,
    velocityLabel: '34 / wk',
    status: 'ok',
  },
];

function updateRowStatus(rows: ProductRow[], rowId: string, status: StockStatus): ProductRow[] {
  return rows.map((row) => (
    row.id === rowId ? { ...row, status } : row
  ));
}

export function InventoryDemo() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [rows, setRows] = useState<ProductRow[]>(baseRows);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [showReorderCard, setShowReorderCard] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('table');
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'table') {
      setRows(baseRows);
      setActiveRowId(null);
      setShowReorderCard(false);
      setShowToast(false);
      setShowSummary(false);
      timeout = setTimeout(() => {
        setActiveRowId('pressure-valve');
        setPhase('scan-low');
      }, 1100);
    } else if (phase === 'scan-low') {
      timeout = setTimeout(() => {
        setRows((currentRows) => updateRowStatus(currentRows, 'pressure-valve', 'low-stock'));
        setShowReorderCard(true);
        setPhase('reorder');
      }, 900);
    } else if (phase === 'reorder') {
      timeout = setTimeout(() => {
        setShowReorderCard(false);
        setPhase('reorder-exit');
      }, 1700);
    } else if (phase === 'reorder-exit') {
      timeout = setTimeout(() => {
        setActiveRowId('cable-reel');
        setPhase('scan-clearance');
      }, 450);
    } else if (phase === 'scan-clearance') {
      timeout = setTimeout(() => {
        setRows((currentRows) => updateRowStatus(currentRows, 'cable-reel', 'clearance'));
        setShowToast(true);
        setPhase('notify');
      }, 900);
    } else if (phase === 'notify') {
      timeout = setTimeout(() => {
        setShowToast(false);
        setPhase('notify-exit');
      }, 1550);
    } else if (phase === 'notify-exit') {
      timeout = setTimeout(() => {
        setActiveRowId(null);
        setShowSummary(true);
        setPhase('summary');
      }, 450);
    } else if (phase === 'summary') {
      timeout = setTimeout(() => {
        setPhase('hold');
      }, 2600);
    } else if (phase === 'hold') {
      timeout = setTimeout(() => {
        setShowSummary(false);
        setPhase('reset');
      }, 1600);
    } else if (phase === 'reset') {
      timeout = setTimeout(() => {
        setRows(baseRows);
        setActiveRowId(null);
        setPhase('table');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="inventory-demo-shell" ref={containerRef}>
      <div className="inventory-demo-panel">
        <div className="inventory-demo-header">
          <div>
            <h4>Live Stock Monitor</h4>
          </div>
          <div className="inventory-demo-agent-status">
            <span className="inventory-agent-dot"></span>
            Agent active
          </div>
        </div>

        <div className="inventory-table-card">
          <div className="inventory-table-head">
            <span>Product</span>
            <span>Stock</span>
            <span>Velocity</span>
            <span>Status</span>
          </div>

          <div className="inventory-table-body">
            {rows.map((row) => {
              const isActive = activeRowId === row.id;

              return (
                <div
                  key={row.id}
                  className={`inventory-row inventory-row-${row.status} ${isActive ? 'is-active' : ''}`}
                >
                  <div className="inventory-product-cell">
                    <span className="inventory-product-name">{row.name}</span>
                    <span className="inventory-product-sku">{row.sku}</span>
                  </div>

                  <div className="inventory-stock-cell">{row.stock}</div>

                  <div className="inventory-velocity-cell">
                    <div className="inventory-velocity-track">
                      <div
                        className="inventory-velocity-fill"
                        style={{ width: `${row.velocity}%` }}
                      ></div>
                    </div>
                    <span>{row.velocityLabel}</span>
                  </div>

                  <div className="inventory-status-cell">
                    <span className={`inventory-status-badge inventory-status-${row.status}`}>
                      {row.status === 'ok' && 'OK'}
                      {row.status === 'low-stock' && 'Low Stock'}
                      {row.status === 'clearance' && 'Clearance'}
                      {row.status === 'incoming' && 'Incoming'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`inventory-reorder-card ${showReorderCard ? 'visible' : ''}`}>
          <div className="inventory-overlay-label">Action in progress</div>
          <div className="inventory-overlay-title">PO #4821 sent to Acme Supply</div>
          <div className="inventory-overlay-meta">
            <span>Pressure Valve Set</span>
            <span>200 units</span>
            <span>ETA 4 days</span>
          </div>
        </div>

        <div className={`inventory-toast ${showToast ? 'visible' : ''}`}>
          <span className="inventory-toast-badge">Sales notified</span>
          <span className="inventory-toast-text">Cable Reel Pro moved to clearance pricing</span>
        </div>

        <div className={`inventory-summary-card ${showSummary ? 'visible' : ''}`}>
          <div className="inventory-summary-header">
            <span className="inventory-summary-label">Summary</span>
            <span className="inventory-summary-period">Current cycle</span>
          </div>
          <div className="inventory-summary-metrics">
            <div className="inventory-summary-metric">
              <span className="inventory-summary-value">4</span>
              <span className="inventory-summary-copy">reorders placed</span>
            </div>
            <div className="inventory-summary-metric">
              <span className="inventory-summary-value">2</span>
              <span className="inventory-summary-copy">slow movers actioned</span>
            </div>
          </div>
          <div className="inventory-summary-checks">
            <div className="inventory-summary-check">
              <span>✓</span>
              Purchase orders confirmed
            </div>
            <div className="inventory-summary-check">
              <span>✓</span>
              Sales team updates sent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
