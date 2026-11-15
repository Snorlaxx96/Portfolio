// Line diagrams for each process stage. Every stroke uses pathLength=1 so it can be drawn on scroll.

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  pathLength: 1,
  vectorEffect: "non-scaling-stroke" as const,
  "data-draw": true,
};

export function Diagram({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden="true" focusable="false">
      {index === 0 && (
        <g>
          {[20, 44, 68, 92, 116].map((r) => (
            <circle key={r} cx="120" cy="120" r={r} {...common} />
          ))}
          <circle cx="120" cy="120" r="5" fill="var(--accent)" />
        </g>
      )}
      {index === 1 && (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={`v${i}`} d={`M${12 + i * 36} 12 V228`} {...common} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={`h${i}`} d={`M12 ${12 + i * 36} H228`} {...common} />
          ))}
          <rect x="48" y="48" width="108" height="72" fill="var(--accent)" />
        </g>
      )}
      {index === 2 && (
        <g>
          <rect x="24" y="24" width="120" height="120" {...common} />
          <circle cx="150" cy="150" r="66" {...common} />
          <path d="M24 216 L120 72 L216 216 Z" {...common} />
          <circle cx="150" cy="150" r="5" fill="var(--accent)" />
        </g>
      )}
      {index === 3 && (
        <g>
          <path d="M20 120 H220" {...common} />
          {Array.from({ length: 21 }).map((_, i) => (
            <path key={i} d={`M${20 + i * 10} ${i % 5 === 0 ? 100 : 110} V120`} {...common} />
          ))}
          <path d="M20 160 C80 160 100 200 160 200 S220 180 220 180" {...common} />
          <path d="M130 60 V220" {...common} />
          <rect x="126" y="114" width="8" height="12" fill="var(--accent)" />
        </g>
      )}
    </svg>
  );
}
