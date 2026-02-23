import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import "./animated-showcase-cards.css";

interface ShowcaseCard {
  id: string;
  title: string;
  label?: string;
  emphasis?: boolean;
  metaTags?: string[];
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryNote?: string;
}

interface AnimatedShowcaseCardsProps {
  title: string;
  body: string;
  cards: ShowcaseCard[];
  defaultActiveId?: string;
}

export function AnimatedShowcaseCards({
  title,
  body,
  cards,
  defaultActiveId,
}: AnimatedShowcaseCardsProps) {
  // Ensure we always have an active card - default to first card if no defaultActiveId
  const initialActiveId = defaultActiveId || cards[0]?.id || "speedrun";
  const [activeId, setActiveId] = useState<string>(initialActiveId);

  // Update activeId if defaultActiveId changes (e.g., on props update)
  useEffect(() => {
    if (defaultActiveId && activeId !== defaultActiveId) {
      setActiveId(defaultActiveId);
    }
  }, [defaultActiveId]);

  return (
    <section className="showcase-section">
      <div className="showcase-header">
        <h2 className="showcase-title">{title}</h2>
        <p className="showcase-body">{body}</p>
      </div>

      <div className="showcase-cards-container">
        {cards.map((card, index) => {
          const isActive = card.id === activeId;
          const isSpeedrun = index === 0;

          return (
            <motion.article
              key={card.id}
              className={`showcase-card ${isActive ? "active" : "inactive"} ${isSpeedrun ? "speedrun" : "speedrun-applied"}`}
              onClick={() => setActiveId(card.id)}
              layout
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Dot grid overlay */}
              <div className="showcase-card-dots" />

              {/* Card content - two column layout when active */}
              <div className={`showcase-card-inner ${isActive ? "two-column" : ""}`}>
                {/* Left column: Text content */}
                <div className="showcase-card-text">
                  <div className="showcase-card-top">
                    {card.label && (
                      <span className={`showcase-label ${card.emphasis ? "emphasis" : ""}`}>
                        {card.label}
                      </span>
                    )}
                    <h3 className="showcase-card-title">{card.title}</h3>
                  </div>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        className="showcase-card-bottom"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {card.metaTags && card.metaTags.length > 0 && (
                          <div className="showcase-meta-tags">
                            {card.metaTags.map((tag, i) => (
                              <span key={i} className="showcase-meta-tag">{tag}</span>
                            ))}
                          </div>
                        )}

                        <p className="showcase-card-description">{card.description}</p>

                        {card.cta && (
                          <Button
                            variant="primary"
                            onClick={() => {
                              window.location.href = card.cta?.href ?? "#";
                            }}
                          >
                            {card.cta.label}
                          </Button>
                        )}

                        {card.secondaryNote && (
                          <p className="showcase-secondary-note">{card.secondaryNote}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right column: Demo animation */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      className="showcase-card-demo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {isSpeedrun ? (
                        <KanbanBuilderDemo />
                      ) : (
                        <ProjectStatusDemo />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

// Terminal sequence for Kanban builder
interface TerminalStep {
  type: 'action' | 'status' | 'code';
  content: string;
}

const kanbanTerminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Creating components/KanbanBoard.tsx' },
  { type: 'code', content: 'export function KanbanBoard() {' },
  { type: 'code', content: '  const [columns] = useState([' },
  { type: 'code', content: '    "To Do", "In Progress", "Done"' },
  { type: 'code', content: '  ])' },
  { type: 'status', content: 'Added 4 lines' },
  { type: 'action', content: 'Adding drag handler' },
  { type: 'code', content: '  const onDragEnd = (result) => {' },
  { type: 'code', content: '    moveTask(result.source, result.destination)' },
  { type: 'code', content: '  }' },
  { type: 'status', content: 'Added 3 lines' },
  { type: 'action', content: 'Building render output' },
  { type: 'code', content: '  return (' },
  { type: 'code', content: '    <DragDropContext onDragEnd={onDragEnd}>' },
  { type: 'code', content: '      {columns.map(col => <Column />)}' },
  { type: 'code', content: '    </DragDropContext>' },
  { type: 'code', content: '  )' },
  { type: 'code', content: '}' },
  { type: 'status', content: 'Added 6 lines' },
];

// Sample tasks for the Kanban board
const kanbanTasks = {
  todo: [
    { id: 1, title: 'Design landing page', tag: 'Design' },
    { id: 2, title: 'Write API docs', tag: 'Docs' },
  ],
  inProgress: [
    { id: 3, title: 'Build auth flow', tag: 'Dev' },
  ],
  done: [
    { id: 4, title: 'Set up database', tag: 'Dev' },
    { id: 5, title: 'Create wireframes', tag: 'Design' },
  ],
};

type KanbanPhase =
  | 'waiting'
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'kanban-reveal'
  | 'kanban-build'
  | 'hold'
  | 'fade-out';

// Animated Kanban Builder Demo
function KanbanBuilderDemo() {
  const [phase, setPhase] = useState<KanbanPhase>('waiting');
  const [displayedText, setDisplayedText] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [kanbanBuildStep, setKanbanBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [tick, setTick] = useState(0); // Used to force re-renders

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Build me a Kanban board with To Do, In Progress, Done columns";
  const typingSpeed = 35;
  const codeTypingSpeed = 18;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setShowChat(true);
          setPhase('typing');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalLines, currentCodeText]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'typing') {
      if (charIndexRef.current < prompt.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prompt.slice(0, charIndexRef.current + 1));
          charIndexRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('sending'), 600);
      }
    } else if (phase === 'sending') {
      timeout = setTimeout(() => {
        setShowTerminal(true);
        setPhase('terminal-open');
      }, 400);
    } else if (phase === 'terminal-open') {
      timeout = setTimeout(() => setPhase('terminal-running'), 300);
    } else if (phase === 'terminal-running') {
      const currentStep = kanbanTerminalSequence[stepIndexRef.current];

      if (!currentStep) {
        timeout = setTimeout(() => setPhase('terminal-close'), 600);
      } else if (currentStep.type === 'code') {
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, codeTypingSpeed);
        } else {
          // Finished typing this code line - add it and move to next
          setTerminalLines(prev => [...prev, currentStep]);
          setCurrentCodeText('');
          codeCharIndexRef.current = 0;
          stepIndexRef.current += 1;
          timeout = setTimeout(() => setTick(t => t + 1), 80);
        }
      } else {
        setTerminalLines(prev => [...prev, currentStep]);
        stepIndexRef.current += 1;
        timeout = setTimeout(() => setTick(t => t + 1), currentStep.type === 'action' ? 400 : 250);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      setShowChat(false);
      timeout = setTimeout(() => {
        setShowKanban(true);
        setKanbanBuildStep(1);
        setPhase('kanban-reveal');
      }, 400);
    } else if (phase === 'kanban-reveal') {
      timeout = setTimeout(() => setPhase('kanban-build'), 200);
    } else if (phase === 'kanban-build') {
      const maxSteps = 9; // header + 3 columns + 5 cards
      if (kanbanBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setKanbanBuildStep(prev => prev + 1);
        }, 180);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 2500);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('fade-out'), 2000);
    } else if (phase === 'fade-out') {
      setShowKanban(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowTerminal(false);
        setShowChat(false);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setKanbanBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        // Restart
        setShowChat(true);
        setPhase('typing');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, kanbanBuildStep, tick]);

  return (
    <div className="kanban-demo" ref={containerRef}>
      {/* Chat Input */}
      <div className={`kb-chat-container ${showChat ? 'visible' : ''}`}>
        <div className="kb-chat-box">
          <div className="kb-chat-text">
            {displayedText}
            <span className={`kb-cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
          </div>
          <button className={`kb-send-btn ${phase === 'sending' ? 'pressed' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Terminal Panel */}
      <div className={`kb-terminal ${showTerminal ? 'visible' : ''}`}>
        <div className="kb-terminal-header">
          <span className="kb-terminal-title">Wingman</span>
          <span className="kb-terminal-status">
            <span className="kb-status-dot"></span>
            Building
          </span>
        </div>
        <div className="kb-terminal-content" ref={terminalContentRef}>
          {terminalLines.map((line, index) => {
            // Count code lines up to this point for line numbers
            const codeLinesBefore = terminalLines.slice(0, index).filter(l => l.type === 'code').length;
            return (
              <div key={index} className={`kb-terminal-line ${line.type}`}>
                {line.type === 'action' && (
                  <>
                    <span className="kb-line-icon">●</span>
                    <span className="kb-action-text">{line.content}</span>
                  </>
                )}
                {line.type === 'status' && (
                  <>
                    <span className="kb-line-gutter" />
                    <span className="kb-status-text">{line.content}</span>
                  </>
                )}
                {line.type === 'code' && (
                  <>
                    <span className="kb-line-number">{codeLinesBefore + 1}</span>
                    <span className="kb-line-plus">+</span>
                    <span className="kb-code-text">{line.content}</span>
                  </>
                )}
              </div>
            );
          })}
          {currentCodeText && (
            <div className="kb-terminal-line code typing">
              <span className="kb-line-number">{terminalLines.filter(l => l.type === 'code').length + 1}</span>
              <span className="kb-line-plus">+</span>
              <span className="kb-code-text">{currentCodeText}</span>
              <span className="kb-cursor">▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Kanban Board Result */}
      <div className={`kb-board ${showKanban ? 'visible' : ''}`}>
        <div className={`kb-board-header ${kanbanBuildStep >= 1 ? 'visible' : ''}`}>
          <span className="kb-board-title">My Kanban Board</span>
          <span className="kb-board-badge">Live</span>
        </div>
        <div className="kb-columns">
          {/* To Do Column */}
          <div className={`kb-column ${kanbanBuildStep >= 2 ? 'visible' : ''}`}>
            <div className="kb-column-header">
              <span className="kb-column-title">To Do</span>
              <span className="kb-column-count">{kanbanTasks.todo.length}</span>
            </div>
            <div className="kb-column-cards">
              {kanbanTasks.todo.map((task, idx) => (
                <div
                  key={task.id}
                  className={`kb-card ${kanbanBuildStep >= 4 + idx ? 'visible' : ''}`}
                >
                  <span className="kb-card-title">{task.title}</span>
                  <span className="kb-card-tag">{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
          {/* In Progress Column */}
          <div className={`kb-column ${kanbanBuildStep >= 3 ? 'visible' : ''}`}>
            <div className="kb-column-header">
              <span className="kb-column-title">In Progress</span>
              <span className="kb-column-count">{kanbanTasks.inProgress.length}</span>
            </div>
            <div className="kb-column-cards">
              {kanbanTasks.inProgress.map((task, idx) => (
                <div
                  key={task.id}
                  className={`kb-card ${kanbanBuildStep >= 6 + idx ? 'visible' : ''}`}
                >
                  <span className="kb-card-title">{task.title}</span>
                  <span className="kb-card-tag">{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Done Column */}
          <div className={`kb-column ${kanbanBuildStep >= 4 ? 'visible' : ''}`}>
            <div className="kb-column-header">
              <span className="kb-column-title">Done</span>
              <span className="kb-column-count">{kanbanTasks.done.length}</span>
            </div>
            <div className="kb-column-cards">
              {kanbanTasks.done.map((task, idx) => (
                <div
                  key={task.id}
                  className={`kb-card ${kanbanBuildStep >= 7 + idx ? 'visible' : ''}`}
                >
                  <span className="kb-card-title">{task.title}</span>
                  <span className="kb-card-tag done">{task.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Terminal sequence for Project Status Aggregator
const statusTerminalSequence: TerminalStep[] = [
  { type: 'action', content: 'Connecting to GitHub' },
  { type: 'code', content: 'GET /repos/acme/webapp/commits?since=7d' },
  { type: 'code', content: '→ Found 23 commits across 4 contributors' },
  { type: 'status', content: 'Repository scanned' },
  { type: 'action', content: 'Pulling Linear tickets' },
  { type: 'code', content: 'GET /issues?team=engineering&updated=7d' },
  { type: 'code', content: '→ 8 completed, 3 in progress, 2 blocked' },
  { type: 'status', content: 'Tickets aggregated' },
  { type: 'action', content: 'Analyzing patterns' },
  { type: 'code', content: 'Velocity: 34 points (+12% vs last week)' },
  { type: 'code', content: 'Blockers: API rate limits, design review' },
  { type: 'status', content: 'Analysis complete' },
  { type: 'action', content: 'Generating summary report' },
];

// Report data for Project Status
const statusReport = {
  title: 'Weekly Engineering Update',
  period: 'Feb 17 - Feb 23',
  metrics: [
    { label: 'Commits', value: '23', trend: 'up' },
    { label: 'PRs Merged', value: '8', trend: 'up' },
    { label: 'Velocity', value: '34 pts', trend: 'up' },
  ],
  highlights: [
    'Auth flow shipped to production',
    'Database migration completed',
    'API response time improved 40%',
  ],
};

type StatusPhase =
  | 'waiting'
  | 'typing'
  | 'sending'
  | 'terminal-open'
  | 'terminal-running'
  | 'terminal-close'
  | 'report-reveal'
  | 'report-build'
  | 'notification'
  | 'hold'
  | 'fade-out';

// Animated Project Status Demo
function ProjectStatusDemo() {
  const [phase, setPhase] = useState<StatusPhase>('waiting');
  const [displayedText, setDisplayedText] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalStep[]>([]);
  const [currentCodeText, setCurrentCodeText] = useState('');
  const [reportBuildStep, setReportBuildStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [tick, setTick] = useState(0);

  const charIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const codeCharIndexRef = useRef(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prompt = "Compile this week's project updates into a summary";
  const typingSpeed = 35;
  const codeTypingSpeed = 15;

  // Start animation when scrolled into view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setShowChat(true);
          setPhase('typing');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalLines, currentCodeText]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'waiting') {
      return;
    }

    if (phase === 'typing') {
      if (charIndexRef.current < prompt.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prompt.slice(0, charIndexRef.current + 1));
          charIndexRef.current += 1;
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('sending'), 600);
      }
    } else if (phase === 'sending') {
      timeout = setTimeout(() => {
        setShowTerminal(true);
        setPhase('terminal-open');
      }, 400);
    } else if (phase === 'terminal-open') {
      timeout = setTimeout(() => setPhase('terminal-running'), 300);
    } else if (phase === 'terminal-running') {
      const currentStep = statusTerminalSequence[stepIndexRef.current];

      if (!currentStep) {
        timeout = setTimeout(() => setPhase('terminal-close'), 600);
      } else if (currentStep.type === 'code') {
        if (codeCharIndexRef.current < currentStep.content.length) {
          timeout = setTimeout(() => {
            setCurrentCodeText(currentStep.content.slice(0, codeCharIndexRef.current + 1));
            codeCharIndexRef.current += 1;
          }, codeTypingSpeed);
        } else {
          setTerminalLines(prev => [...prev, currentStep]);
          setCurrentCodeText('');
          codeCharIndexRef.current = 0;
          stepIndexRef.current += 1;
          timeout = setTimeout(() => setTick(t => t + 1), 80);
        }
      } else {
        setTerminalLines(prev => [...prev, currentStep]);
        stepIndexRef.current += 1;
        timeout = setTimeout(() => setTick(t => t + 1), currentStep.type === 'action' ? 400 : 250);
      }
    } else if (phase === 'terminal-close') {
      setShowTerminal(false);
      setShowChat(false);
      timeout = setTimeout(() => {
        setShowReport(true);
        setReportBuildStep(1);
        setPhase('report-reveal');
      }, 400);
    } else if (phase === 'report-reveal') {
      timeout = setTimeout(() => setPhase('report-build'), 200);
    } else if (phase === 'report-build') {
      const maxSteps = 7; // header + period + 3 metrics + highlights header + highlights
      if (reportBuildStep < maxSteps) {
        timeout = setTimeout(() => {
          setReportBuildStep(prev => prev + 1);
        }, 200);
      } else {
        timeout = setTimeout(() => setPhase('notification'), 400);
      }
    } else if (phase === 'notification') {
      setShowNotification(true);
      timeout = setTimeout(() => setPhase('hold'), 2000);
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('fade-out'), 2000);
    } else if (phase === 'fade-out') {
      setShowReport(false);
      setShowNotification(false);
      timeout = setTimeout(() => {
        // Reset everything
        setShowTerminal(false);
        setShowChat(false);
        setTerminalLines([]);
        setDisplayedText('');
        setCurrentCodeText('');
        setReportBuildStep(0);
        charIndexRef.current = 0;
        stepIndexRef.current = 0;
        codeCharIndexRef.current = 0;
        // Restart
        setShowChat(true);
        setPhase('typing');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayedText, terminalLines, currentCodeText, reportBuildStep, tick]);

  return (
    <div className="status-demo" ref={containerRef}>
      {/* Chat Input */}
      <div className={`ps-chat-container ${showChat ? 'visible' : ''}`}>
        <div className="ps-chat-box">
          <div className="ps-chat-text">
            {displayedText}
            <span className={`ps-cursor ${phase === 'typing' ? 'blinking' : ''}`}>|</span>
          </div>
          <button className={`ps-send-btn ${phase === 'sending' ? 'pressed' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Terminal Panel */}
      <div className={`ps-terminal ${showTerminal ? 'visible' : ''}`}>
        <div className="ps-terminal-header">
          <span className="ps-terminal-title">Wingman</span>
          <span className="ps-terminal-status">
            <span className="ps-status-dot"></span>
            Working
          </span>
        </div>
        <div className="ps-terminal-content" ref={terminalContentRef}>
          {terminalLines.map((line, index) => (
            <div key={index} className={`ps-terminal-line ${line.type}`}>
              {line.type === 'action' && (
                <>
                  <span className="ps-line-icon">●</span>
                  <span className="ps-action-text">{line.content}</span>
                </>
              )}
              {line.type === 'status' && (
                <>
                  <span className="ps-line-icon check">✓</span>
                  <span className="ps-status-text">{line.content}</span>
                </>
              )}
              {line.type === 'code' && (
                <>
                  <span className="ps-line-indent" />
                  <span className="ps-code-text">{line.content}</span>
                </>
              )}
            </div>
          ))}
          {currentCodeText && (
            <div className="ps-terminal-line code typing">
              <span className="ps-line-indent" />
              <span className="ps-code-text">{currentCodeText}</span>
              <span className="ps-cursor">▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Report Result */}
      <div className={`ps-report ${showReport ? 'visible' : ''}`}>
        <div className={`ps-report-header ${reportBuildStep >= 1 ? 'visible' : ''}`}>
          <span className="ps-report-title">{statusReport.title}</span>
        </div>
        <div className={`ps-report-period ${reportBuildStep >= 2 ? 'visible' : ''}`}>
          {statusReport.period}
        </div>

        <div className="ps-metrics">
          {statusReport.metrics.map((metric, idx) => (
            <div key={idx} className={`ps-metric ${reportBuildStep >= 3 + idx ? 'visible' : ''}`}>
              <span className="ps-metric-value">{metric.value}</span>
              <span className="ps-metric-label">{metric.label}</span>
              <span className="ps-metric-trend up">↑</span>
            </div>
          ))}
        </div>

        <div className={`ps-highlights ${reportBuildStep >= 6 ? 'visible' : ''}`}>
          <div className="ps-highlights-title">Highlights</div>
          {statusReport.highlights.map((item, idx) => (
            <div key={idx} className={`ps-highlight-item ${reportBuildStep >= 7 ? 'visible' : ''}`}>
              <span className="ps-highlight-check">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      <div className={`ps-notification ${showNotification ? 'visible' : ''}`}>
        <span className="ps-notif-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="ps-notif-text">Sent to #engineering</span>
      </div>
    </div>
  );
}
