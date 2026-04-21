import { useEffect, useRef, useState } from 'react';
import './ProjectStatusReportsDemo.css';

type Phase =
  | 'waiting'
  | 'dashboard'
  | 'dashboard-1'
  | 'dashboard-2'
  | 'dashboard-3'
  | 'dashboard-hold'
  | 'report'
  | 'report-1'
  | 'report-2'
  | 'report-3'
  | 'report-4'
  | 'report-hold'
  | 'deliver'
  | 'deliver-1'
  | 'deliver-2'
  | 'deliver-3'
  | 'deliver-hold';

interface ReportSection {
  title: string;
  bullets: string[];
}

const reportSections: ReportSection[] = [
  {
    title: 'Progress this week',
    bullets: [
      'CRM field mapping workshop completed with ops team.',
      'Phase-one workflow automation delivered into staging.',
    ],
  },
  {
    title: 'Risks and blockers',
    bullets: [
      'Client sign-off still needed on reporting field definitions.',
      'One integration dependency may push testing by 2 days.',
    ],
  },
  {
    title: 'Budget and timeline health',
    bullets: [
      '52% of delivery budget used against 50% planned.',
      'Overall timeline remains on track for June handover.',
    ],
  },
  {
    title: 'Next steps',
    bullets: [
      'Complete UAT checklist with client project lead.',
      'Move rollout plan into live deployment review.',
    ],
  },
];

export function ProjectStatusReportsDemo() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [dashboardStep, setDashboardStep] = useState(0);
  const [reportStep, setReportStep] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [deliveryStep, setDeliveryStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setPhase('dashboard');
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

    if (phase === 'dashboard') {
      setDashboardStep(0);
      setReportStep(0);
      setActiveSectionIndex(null);
      setDeliveryStep(0);
      timeout = setTimeout(() => {
        setDashboardStep(1);
        setPhase('dashboard-1');
      }, 700);
    } else if (phase === 'dashboard-1') {
      timeout = setTimeout(() => {
        setDashboardStep(2);
        setPhase('dashboard-2');
      }, 700);
    } else if (phase === 'dashboard-2') {
      timeout = setTimeout(() => {
        setDashboardStep(3);
        setPhase('dashboard-3');
      }, 800);
    } else if (phase === 'dashboard-3') {
      timeout = setTimeout(() => {
        setPhase('dashboard-hold');
      }, 1200);
    } else if (phase === 'dashboard-hold') {
      timeout = setTimeout(() => {
        setPhase('report');
      }, 650);
    } else if (phase === 'report') {
      timeout = setTimeout(() => {
        setReportStep(1);
        setActiveSectionIndex(0);
        setPhase('report-1');
      }, 550);
    } else if (phase === 'report-1') {
      timeout = setTimeout(() => {
        setReportStep(2);
        setActiveSectionIndex(1);
        setPhase('report-2');
      }, 850);
    } else if (phase === 'report-2') {
      timeout = setTimeout(() => {
        setReportStep(3);
        setActiveSectionIndex(2);
        setPhase('report-3');
      }, 850);
    } else if (phase === 'report-3') {
      timeout = setTimeout(() => {
        setReportStep(4);
        setActiveSectionIndex(3);
        setPhase('report-4');
      }, 850);
    } else if (phase === 'report-4') {
      timeout = setTimeout(() => {
        setActiveSectionIndex(null);
        setPhase('report-hold');
      }, 1100);
    } else if (phase === 'report-hold') {
      timeout = setTimeout(() => {
        setPhase('deliver');
      }, 650);
    } else if (phase === 'deliver') {
      timeout = setTimeout(() => {
        setDeliveryStep(1);
        setPhase('deliver-1');
      }, 500);
    } else if (phase === 'deliver-1') {
      timeout = setTimeout(() => {
        setDeliveryStep(2);
        setPhase('deliver-2');
      }, 700);
    } else if (phase === 'deliver-2') {
      timeout = setTimeout(() => {
        setDeliveryStep(3);
        setPhase('deliver-3');
      }, 700);
    } else if (phase === 'deliver-3') {
      timeout = setTimeout(() => {
        setPhase('deliver-hold');
      }, 1500);
    } else if (phase === 'deliver-hold') {
      timeout = setTimeout(() => {
        setPhase('dashboard');
      }, 1400);
    }

    return () => clearTimeout(timeout);
  }, [phase]);

  const isDashboardScreen =
    phase === 'dashboard' ||
    phase === 'dashboard-1' ||
    phase === 'dashboard-2' ||
    phase === 'dashboard-3' ||
    phase === 'dashboard-hold';
  const isReportScreen =
    phase === 'report' ||
    phase === 'report-1' ||
    phase === 'report-2' ||
    phase === 'report-3' ||
    phase === 'report-4' ||
    phase === 'report-hold';
  const isDeliverScreen =
    phase === 'deliver' ||
    phase === 'deliver-1' ||
    phase === 'deliver-2' ||
    phase === 'deliver-3' ||
    phase === 'deliver-hold';

  return (
    <div className="status-demo-shell" ref={containerRef}>
      <div className="status-demo-panel">
        <div className="status-demo-header">
          <div>
            <h4>Live Project Reporting</h4>
          </div>
          <div className="status-demo-status">
            <span className="status-demo-status-dot"></span>
            Agent active
          </div>
        </div>

        <div className="status-stage-stack">
          <section className="status-stage-screen visible">
            {isDashboardScreen && (
              <>
                <div className="status-screen-title-row">
                  <span className="status-screen-label">Snapshot</span>
                  <span className="status-screen-state">Live delivery view</span>
                </div>

                <div className="status-dashboard-card">
                  <div className="status-dashboard-top">
                    <div>
                      <span className="status-block-label">Northern Construction rollout</span>
                      <div className="status-project-name">Weekly delivery snapshot</div>
                    </div>
                    <div className={`status-dashboard-badge ${dashboardStep >= 3 ? 'ready' : ''}`}>
                      {dashboardStep >= 3 ? 'Snapshot current' : 'Refreshing'}
                    </div>
                  </div>

                  <div className="status-dashboard-grid">
                    <div className={`status-metric-card ${dashboardStep >= 1 ? 'visible' : ''}`}>
                      <span>Overall status</span>
                      <strong>On track</strong>
                    </div>
                    <div className={`status-metric-card ${dashboardStep >= 1 ? 'visible' : ''}`}>
                      <span>Progress</span>
                      <strong>68% complete</strong>
                    </div>
                    <div className={`status-metric-card ${dashboardStep >= 2 ? 'visible' : ''}`}>
                      <span>Budget burn</span>
                      <strong>52% used</strong>
                    </div>
                    <div className={`status-metric-card ${dashboardStep >= 2 ? 'visible' : ''}`}>
                      <span>Open blockers</span>
                      <strong>1 blocker</strong>
                    </div>
                  </div>

                  <div className="status-dashboard-lower">
                    <div className={`status-dashboard-panel ${dashboardStep >= 2 ? 'visible' : ''}`}>
                      <div className="status-dashboard-panel-title">Completed this week</div>
                      <div className="status-dashboard-list">
                        <span>CRM field mapping workshop closed</span>
                        <span>Automation flow moved into staging</span>
                        <span>Client review pack updated</span>
                      </div>
                    </div>
                    <div className={`status-dashboard-panel ${dashboardStep >= 3 ? 'visible' : ''}`}>
                      <div className="status-dashboard-panel-title">Next milestone</div>
                      <div className="status-dashboard-next">UAT sign-off review · Thursday 15:00</div>
                      <div className="status-dashboard-sub">June handover remains on plan</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isReportScreen && (
              <>
                <div className="status-screen-title-row">
                  <span className="status-screen-label">Report</span>
                  <span className="status-screen-state">
                    {reportStep >= 4 ? 'Ready to send' : 'Report assembly'}
                  </span>
                </div>

                <div className="status-report-card">
                  <div className="status-report-top">
                    <div>
                      <span className="status-block-label">Weekly report</span>
                      <div className="status-project-name">Northern Construction rollout</div>
                      <div className="status-period-name">Reporting period: this week</div>
                    </div>
                    <div className={`status-report-badge ${reportStep >= 4 ? 'ready' : ''}`}>
                      {reportStep >= 4 ? 'Ready to send' : 'Building'}
                    </div>
                  </div>

                  <div className="status-health-row">
                    <div className="status-health-card">
                      <span>Overall status</span>
                      <strong>On track</strong>
                    </div>
                    <div className="status-health-card">
                      <span>Milestone health</span>
                      <strong>June handover remains on plan</strong>
                    </div>
                  </div>

                  <div className="status-sections-list">
                    {reportSections.map((section, index) => {
                      const isVisible = reportStep > index;
                      const isActive = activeSectionIndex === index;

                      return (
                        <div
                          key={section.title}
                          className={`status-section-card ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
                        >
                          <div className="status-section-title">{section.title}</div>
                          <div className="status-section-bullets">
                            {section.bullets.map((bullet) => (
                              <div key={bullet} className="status-section-bullet">
                                <span>•</span>
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {isDeliverScreen && (
              <>
                <div className="status-screen-title-row">
                  <span className="status-screen-label">Delivery</span>
                  <span className="status-screen-state">Distribution</span>
                </div>

                <div className="status-delivery-card">
                  <div className="status-delivery-top">
                    <div>
                      <span className="status-block-label">Report delivery</span>
                      <div className="status-delivery-title">Weekly project update dispatched</div>
                    </div>
                    <div className={`status-delivery-badge ${deliveryStep >= 3 ? 'ready' : ''}`}>
                      {deliveryStep >= 3 ? 'Delivered' : 'Sending'}
                    </div>
                  </div>

                  <div className="status-delivery-list">
                    <div className={`status-delivery-item ${deliveryStep >= 1 ? 'visible' : ''}`}>
                      <div className="status-delivery-channel">Email</div>
                      <div className="status-delivery-copy">Report sent to project sponsor and delivery lead</div>
                      <div className="status-delivery-state">Sent</div>
                    </div>
                    <div className={`status-delivery-item ${deliveryStep >= 2 ? 'visible' : ''}`}>
                      <div className="status-delivery-channel">Workspace</div>
                      <div className="status-delivery-copy">Report saved to client project folder</div>
                      <div className="status-delivery-state">Saved</div>
                    </div>
                    <div className={`status-delivery-item ${deliveryStep >= 3 ? 'visible' : ''}`}>
                      <div className="status-delivery-channel">Slack</div>
                      <div className="status-delivery-copy">Project channel updated with key risks and next steps</div>
                      <div className="status-delivery-state">Posted</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
