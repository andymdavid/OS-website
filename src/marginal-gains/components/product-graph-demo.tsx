import { useState, useEffect } from "react";
import "./product-graph-demo.css";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  isNew?: boolean;
}

interface Edge {
  from: string;
  to: string;
  isNew?: boolean;
}

const nodes: Node[] = [
  { id: "flight-deck", label: "Flight Deck", x: 25, y: 35 },
  { id: "tower", label: "Tower", x: 50, y: 20 },
  { id: "airspace", label: "Airspace", x: 75, y: 35 },
  { id: "agents", label: "Agents", x: 38, y: 70 },
  { id: "workflows", label: "Workflows", x: 65, y: 75, isNew: true },
];

const edges: Edge[] = [
  { from: "flight-deck", to: "tower" },
  { from: "tower", to: "airspace" },
  { from: "flight-deck", to: "agents" },
  { from: "tower", to: "agents" },
  { from: "airspace", to: "agents" },
  { from: "agents", to: "workflows", isNew: true },
  { from: "tower", to: "workflows", isNew: true },
  { from: "airspace", to: "workflows", isNew: true },
];

export function ProductGraphDemo() {
  const [showNewNode, setShowNewNode] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const sequence = () => {
      // Show base graph, then add new node
      timeoutId = setTimeout(() => {
        setShowNewNode(true);
      }, 1500);

      // Hold, then reset
      timeoutId = setTimeout(() => {
        setShowNewNode(false);
        setCycle((c) => c + 1);
      }, 5000);
    };

    sequence();
    return () => clearTimeout(timeoutId);
  }, [cycle]);

  const getNodePos = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="product-graph-demo" key={cycle}>
      {/* Edges */}
      <svg className="graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map((edge) => {
          const from = getNodePos(edge.from);
          const to = getNodePos(edge.to);
          const isVisible = !edge.isNew || showNewNode;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={`graph-edge ${isVisible ? "visible" : ""} ${edge.isNew ? "new" : ""}`}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isVisible = !node.isNew || showNewNode;
        return (
          <div
            key={node.id}
            className={`graph-node ${isVisible ? "visible" : ""} ${node.isNew ? "new" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className="graph-node-label">{node.label}</span>
          </div>
        );
      })}

      {/* New badge */}
      {showNewNode && (
        <div className="graph-new-badge" style={{ left: "65%", top: "60%" }}>
          Live
        </div>
      )}
    </div>
  );
}
