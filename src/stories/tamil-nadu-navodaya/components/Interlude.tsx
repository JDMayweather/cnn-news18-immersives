import gsap from "gsap";
import { useScene, drawPaths } from "./motion";
import { theme } from "../theme";
import type { InterludeBar, InterludeVariant } from "../assets/article";

/**
 * The illustrated beats between passages. Two kinds:
 *  - `reserve` (and any bars panel): prints the figure and restates it as a bar.
 *  - `kolam`: a drawn kolam divider — a dot lattice threaded by one line, the
 *    South Indian floor-drawing, used as a quiet rule between sections.
 * Every number is one the article states; labels are HTML, never SVG text.
 */

const C = theme.colors;
const W = 1440;
const H = 340;

/* A sikku-kolam ornament: a row of small looped units, each a continuous line
   weaving around five dots — the threshold floor-art of the Tamil household,
   used here purely as a cultural divider. Drawn stroke-on-scroll. */
function Kolam(): React.JSX.Element {
  const units = 5;
  const cy = H / 2;
  const gap = W / (units + 1);
  const s = 46; /* unit radius */
  const petal = (cx: number): string => {
    /* four loops around the centre, one continuous stroke */
    return [
      `M${cx} ${cy - s}`,
      `C ${cx + s} ${cy - s}, ${cx + s} ${cy + s}, ${cx} ${cy + s}`,
      `C ${cx - s} ${cy + s}, ${cx - s} ${cy - s}, ${cx} ${cy - s}`,
      `M${cx - s} ${cy}`,
      `C ${cx - s} ${cy - s}, ${cx + s} ${cy - s}, ${cx + s} ${cy}`,
      `C ${cx + s} ${cy + s}, ${cx - s} ${cy + s}, ${cx - s} ${cy}`,
    ].join(" ");
  };
  const dots = (cx: number): { x: number; y: number }[] => [
    { x: cx, y: cy }, { x: cx, y: cy - s }, { x: cx, y: cy + s }, { x: cx - s, y: cy }, { x: cx + s, y: cy },
  ];
  return (
    <>
      <path className="il-draw" pathLength={1} d={`M${gap * 0.4} ${cy} H${W - gap * 0.4}`} fill="none" stroke={C.onDarkLine} strokeWidth={1} />
      {Array.from({ length: units }, (_, i) => {
        const cx = gap * (i + 1);
        return (
          <g key={i}>
            <path className="il-draw" pathLength={1} d={petal(cx)} fill="none" stroke={C.clay} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
            {dots(cx).map((p, j) => (
              <circle key={j} className="il-rise" cx={p.x} cy={p.y} r={3.4} fill={C.onDarkAccent} />
            ))}
          </g>
        );
      })}
    </>
  );
}

const SCENES: Record<InterludeVariant, (() => React.JSX.Element) | null> = {
  kolam: Kolam,
  reserve: null, /* the bar carries it */
};

function Bars({ bars }: { bars: InterludeBar[] }): React.JSX.Element {
  const max = Math.max(...bars.map((b) => b.pct), 1);
  return (
    <ul className="il-bars">
      {bars.map((bar) => (
        <li className="il-bar" key={bar.label}>
          <span className="il-bar-label">{bar.label}</span>
          <span className="il-bar-track" aria-hidden="true">
            <span className="il-bar-fill" style={{ width: `${Math.max(1.5, (bar.pct / max) * 100)}%` }} />
          </span>
          <span className="il-bar-value">{bar.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Interlude({
  variant,
  label,
  sub,
  notes,
  bars,
}: {
  variant: InterludeVariant;
  label: string;
  sub?: string;
  notes?: string[];
  bars?: InterludeBar[];
}): React.JSX.Element {
  const ref = useScene<HTMLElement>((root) => {
    drawPaths(root, ".il-draw", { stagger: 0.05, duration: 1.2 });
    const rises = gsap.utils.toArray<SVGElement>(root.querySelectorAll(".il-rise"));
    if (rises.length) {
      gsap.from(rises, { opacity: 0, scale: 0, transformOrigin: "center", transformBox: "fill-box", duration: 0.8, ease: "power2.out", stagger: 0.04, scrollTrigger: { trigger: root, start: "top 86%", once: true } });
    }
    const fills = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".il-bar-fill"));
    if (fills.length) {
      gsap.from(fills, { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: root, start: "top 88%", once: true } });
    }
  });

  const known = variant in SCENES;
  if (!known) return <></>;
  const Scene = SCENES[variant];

  return (
    <aside ref={ref} className="il nv-rise" aria-label={label}>
      {Scene ? (
        <svg className="il-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
          <Scene />
        </svg>
      ) : null}
      {bars?.length ? <Bars bars={bars} /> : null}
      <div className="il-cap">
        <p className="il-label">{label}</p>
        {sub ? <p className="il-sub">{sub}</p> : null}
        {notes?.length ? (
          <ul className="il-notes">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
