import "./collaborative-cursors-demo.css";

interface Collaborator {
  name: string;
  color: string;
  initials: string;
  animationClass: string;
}

const collaborators: Collaborator[] = [
  {
    name: "Elisa",
    color: "#2ea782",
    initials: "EL",
    animationClass: "cursor-path-1",
  },
  {
    name: "Marcus",
    color: "#4a90d9",
    initials: "MA",
    animationClass: "cursor-path-2",
  },
  {
    name: "Sarah",
    color: "#d4a574",
    initials: "SA",
    animationClass: "cursor-path-3",
  },
];

export function CollaborativeCursorsDemo() {
  return (
    <div className="collab-cursors-demo">
      {collaborators.map((person, index) => (
        <div
          key={person.name}
          className={`collab-cursor ${person.animationClass}`}
          style={{ "--cursor-color": person.color } as React.CSSProperties}
        >
          {/* Cursor pointer */}
          <svg
            className="collab-cursor-pointer"
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
          >
            <path
              d="M1 1L1 15.5L5.5 11.5L8.5 18.5L11 17.5L8 10.5L14 10.5L1 1Z"
              fill={person.color}
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Name pill with avatar */}
          <div className="collab-cursor-label">
            <span className="collab-cursor-avatar">{person.initials}</span>
            <span className="collab-cursor-name">{person.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
