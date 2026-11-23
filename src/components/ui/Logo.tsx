/**
 * The AAG mark: a technical viewfinder frame around a signal pulse —
 * "Untamed Signal". Abstract and geometric, not the letters themselves.
 * It always sits on its own dark (Petrol Obsidian) plate, so its two
 * colours are fixed rather than theme-mapped.
 */
export function Logo({ height = 26 }: { height?: number }) {
  return (
    <span className="logo">
      <svg
        width={height} height={height} viewBox="0 0 100 100" fill="none"
        role="img" aria-label="AAG"
      >
        <path d="M10,32 V10 H32 M68,10 H90 V32 M90,68 V90 H68 M32,90 H10 V68"
          stroke="#D9D9C9" strokeWidth="7" strokeLinecap="square" />
        <path d="M18,52 H34 L44,26 L56,74 L66,52 H82"
          stroke="#C4D65E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  );
}
