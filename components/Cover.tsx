import type { CoverKind } from "@/content/site";

// Generated poster covers for sample projects. Replace with real project imagery when available.
// Every cover is a dark poster so it reads as an object on the paper Works band.
const BG = "#141510";
const FG = "#eeede6";
const ACID = "#d7ff3b";

export function Cover({ kind, title }: { kind: CoverKind; title: string }) {
  return (
    <svg viewBox="0 0 400 500" width="100%" height="100%" role="img" aria-label={`Cover artwork for ${title}`} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill={kind === "stripe" ? ACID : BG} />
      {kind === "glyph" && (
        <g>
          <text x="-30" y="470" fontSize="560" fontWeight="900" fill={FG} style={{ fontFamily: "var(--font-sans)", fontVariationSettings: '"wdth" 130' }}>
            H
          </text>
          <path d="M0 132 H400 M0 360 H400" stroke={ACID} strokeWidth="2" />
          <text x="24" y="40" fontSize="14" fill={ACID} style={{ fontFamily: "var(--font-code)" }}>
            CAP 0.70 / X 0.52
          </text>
        </g>
      )}
      {kind === "interface" && (
        <g fill="none" stroke={FG} strokeOpacity="0.5">
          <rect x="32" y="40" width="336" height="420" />
          <path d="M32 84 H368 M120 84 V460" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x="48" y={104 + i * 28} width="56" height="10" fill={i === 1 ? ACID : FG} fillOpacity={i === 1 ? 1 : 0.25} stroke="none" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={`b${i}`} x={144 + i * 27} y={420 - (40 + ((i * 53) % 180))} width="16" height={40 + ((i * 53) % 180)} fill={i === 5 ? ACID : FG} fillOpacity={i === 5 ? 1 : 0.5} stroke="none" />
          ))}
          <path d="M144 132 H344" />
        </g>
      )}
      {kind === "plan" && (
        <g fill="none" stroke={FG} strokeWidth="2">
          <path d="M40 60 H360 V440 H40 Z" />
          <path d="M40 220 H200 V60 M200 300 H360 M200 220 V440 M120 220 V300 H40" />
          <path d="M200 260 A40 40 0 0 1 240 300" strokeWidth="1" />
          <path d="M60 470 H340" strokeWidth="1" />
          <circle cx="280" cy="140" r="14" fill={ACID} stroke="none" />
        </g>
      )}
      {kind === "orbit" && (
        <g fill="none" stroke={FG}>
          {Array.from({ length: 9 }).map((_, i) => (
            <ellipse key={i} cx="200" cy="250" rx={40 + i * 18} ry={20 + i * 22} transform={`rotate(${i * 14} 200 250)`} strokeOpacity={0.25 + i * 0.07} />
          ))}
          <circle cx="331" cy="181" r="10" fill={ACID} stroke="none" />
        </g>
      )}
      {kind === "stripe" && (
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x="0" y={i * 36} width="400" height={6 + (i % 4) * 6} fill={BG} />
          ))}
          <circle cx="200" cy="250" r="96" fill={ACID} />
          <circle cx="200" cy="250" r="96" fill="none" stroke={BG} strokeWidth="2" />
          <circle cx="200" cy="250" r="56" fill={BG} />
        </g>
      )}
      {kind === "grid" && (
        <g>
          {Array.from({ length: 80 }).map((_, i) => {
            const x = i % 8;
            const y = Math.floor(i / 8);
            const s = ((x * 7 + y * 13) % 10) / 10;
            return <rect key={i} x={24 + x * 44} y={30 + y * 44} width={36 * s + 4} height={36 * s + 4} fill={i === 27 ? ACID : FG} />;
          })}
        </g>
      )}
    </svg>
  );
}
