import { useEffect, useRef, useState } from "react";
import { theme } from "../theme";

/**
 * The pinned visuals. Each one is driven by the active step of its ScrollScene,
 * so the graphic assembles while the reader scrolls rather than sitting there
 * already finished.
 *
 * All type in these figures is HTML, never SVG text: an SVG scales with its
 * container, so a label set inside one turns to six pixels on a phone.
 */

const C = theme.colors;

/** Money counts up to the next step. Skipped under reduced motion. */
function useCountUp(target: number, ms = 640): number {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const still = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = from.current;
    if (still || start === target) {
      from.current = target;
      setValue(target);
      return;
    }

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number): void => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);

  return value;
}

function rupees(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ------------------------------------------------------------------ kit --- */

/**
 * The kit. The article names every item and gives one number for the year, so
 * the figure names every item and shows one number. An earlier build priced
 * each piece individually; those prices were not in the reporting.
 */
const YEARLY_TOTAL = 300000;

interface KitItem {
  /** Step index at which this item joins the bag. */
  at: number;
  label: string;
  /** The article says the bat and the gloves are the parts that wear out. */
  again?: boolean;
  /** True for the two things that are not equipment. */
  intangible?: boolean;
  icon: (tone: string, tint: string) => React.JSX.Element;
}

const KIT: KitItem[] = [
  {
    at: 0,
    label: "Bat",
    again: true,
    icon: (tone, tint) => (
      <g transform="rotate(-15)">
        <rect x="-6" y="-56" width="12" height="46" rx="6" fill={tone} />
        <rect x="-14" y="-14" width="28" height="64" rx="10" fill={tone} />
        <rect x="-9" y="-8" width="18" height="26" rx="6" fill={tint} opacity="0.45" />
      </g>
    ),
  },
  {
    at: 0,
    label: "Batting pads",
    icon: (tone, tint) => (
      <g>
        <rect x="-40" y="-46" width="29" height="92" rx="13" fill={tone} />
        <rect x="11" y="-46" width="29" height="92" rx="13" fill={tone} />
        <rect x="-34" y="-30" width="17" height="4" rx="2" fill={tint} opacity="0.5" />
        <rect x="-34" y="-18" width="17" height="4" rx="2" fill={tint} opacity="0.5" />
        <rect x="17" y="-30" width="17" height="4" rx="2" fill={tint} opacity="0.5" />
        <rect x="17" y="-18" width="17" height="4" rx="2" fill={tint} opacity="0.5" />
      </g>
    ),
  },
  {
    at: 0,
    label: "Gloves",
    again: true,
    icon: (tone, tint) => (
      <g>
        <path d="M-44 -26h18a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10h-18a10 10 0 0 1-10-10v-34a10 10 0 0 1 10-10z" fill={tone} />
        <path d="M26 -26h18a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10h-18a10 10 0 0 1-10-10v-34a10 10 0 0 1 10-10z" fill={tone} />
        <rect x="-48" y="-18" width="26" height="4" rx="2" fill={tint} opacity="0.45" />
        <rect x="22" y="-18" width="26" height="4" rx="2" fill={tint} opacity="0.45" />
      </g>
    ),
  },
  {
    at: 0,
    label: "Helmet",
    icon: (tone, tint) => (
      <g>
        <path d="M-44 6a44 44 0 0 1 88 0v6h-88z" fill={tone} />
        <rect x="-48" y="12" width="96" height="11" rx="5" fill={tone} />
        <path d="M-20 23v18M0 23v21M20 23v18" stroke={tint} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M-30 -14a30 30 0 0 1 60 0" stroke={tint} strokeWidth="4" strokeLinecap="round" opacity="0.35" fill="none" />
      </g>
    ),
  },
  {
    at: 0,
    label: "Spikes",
    icon: (tone, tint) => (
      <g>
        <path d="M-46 8c0-13 11-18 23-21l15-19c4-4 12-3 14 3l4 17c13 4 22 11 22 20z" fill={tone} />
        <rect x="-48" y="8" width="96" height="11" rx="5" fill={tone} />
        <path d="M-34 19l-3 7M-12 19l-2 7M12 19l-1 7M34 19l1 7" stroke={tint} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
      </g>
    ),
  },
  {
    at: 0,
    label: "Protective guards",
    icon: (tone, tint) => (
      <g>
        <ellipse cx="-16" cy="2" rx="26" ry="34" fill={tone} />
        <rect x="20" y="-32" width="26" height="68" rx="12" fill={tone} />
        <ellipse cx="-16" cy="2" rx="12" ry="18" fill={tint} opacity="0.4" />
      </g>
    ),
  },
  {
    at: 0,
    label: "Kit bag",
    icon: (tone, tint) => (
      <g>
        <path d="M-28 -28h56a9 9 0 0 1 9 9v44a11 11 0 0 1-11 11h-52a11 11 0 0 1-11-11v-44a9 9 0 0 1 9-9z" fill={tone} />
        <path d="M-15 -28v-8a15 15 0 0 1 30 0v8" stroke={tone} strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="-36" y="-4" width="72" height="5" rx="2.5" fill={tint} opacity="0.5" />
      </g>
    ),
  },
  {
    at: 3,
    label: "Nutrition and strength and conditioning",
    intangible: true,
    icon: (tone, tint) => (
      <g>
        <rect x="-42" y="-22" width="19" height="44" rx="9" fill={tone} />
        <rect x="23" y="-22" width="19" height="44" rx="9" fill={tone} />
        <rect x="-17" y="-10" width="34" height="20" rx="8" fill={tone} />
        <rect x="-32" y="-52" width="64" height="4" rx="2" fill={tint} opacity="0.4" />
        <rect x="-26" y="34" width="22" height="28" rx="8" fill={tone} opacity="0.7" />
        <rect x="6" y="30" width="26" height="32" rx="9" fill={tint} opacity="0.55" />
      </g>
    ),
  },
  {
    at: 4,
    label: "Practice expenses, tournament fees, travel",
    intangible: true,
    icon: (tone, tint) => (
      <g>
        <path d="M-26 -44h52v14a26 26 0 0 1-52 0z" fill={tone} />
        <rect x="-5" y="-30" width="10" height="22" rx="4" fill={tone} />
        <rect x="-22" y="-10" width="44" height="11" rx="5" fill={tone} />
        <path d="M-36 -40a11 11 0 0 0 11 11M36 -40a11 11 0 0 1-11 11" stroke={tone} strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="-40" y="22" width="80" height="24" rx="7" fill={tint} opacity="0.5" />
        <path d="M0 22v24" stroke={C.mossDeep} strokeWidth="2" strokeDasharray="3 3" />
      </g>
    ),
  },
];

/**
 * "What the bag has to hold" — the kit in the article's own list, then the two
 * things that are not equipment. The year's total lands only when the reader
 * reaches the step where the article gives it.
 */
export function KitAssembly({ active }: { active: number }): React.JSX.Element {
  const worn = active >= 1;
  const showTotal = active >= 4;
  /* The figure shows one number, because the article gives one number. */
  const total = useCountUp(showTotal ? YEARLY_TOTAL : 0);

  return (
    <div className="kit">
      <div className="kit-grid">
        {KIT.map((item) => {
          const on = active >= item.at;
          const again = worn && item.again;
          return (
            <div
              key={item.label}
              className={`kit-cell${on ? " is-on" : ""}${item.intangible ? " is-intangible" : ""}`}
            >
              <svg className="kit-icon" viewBox="-56 -62 112 122" aria-hidden="true" focusable="false">
                {item.icon(on ? (item.intangible ? C.leaf : C.green) : "#b9d2b5", on ? C.paper : C.moss)}
              </svg>
              <span className="kit-name">{item.label}</span>
              {again ? <span className="kit-again">wears out in a year</span> : null}
            </div>
          );
        })}
      </div>

      {showTotal ? (
        <p className="kit-total">
          <span className="kit-total-k">A year of it</span>
          <span className="kit-total-v">{rupees(total)}</span>
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- dial gauge --- */

/**
 * The exclusion, read four ways -- but each figure has its own denominator, so
 * a single field of two hundred "children" was the wrong container: the dots
 * meant a different population every step. Instead one dial sweeps to each
 * step's share, and the read-out names what that share is *of*. The ring is the
 * whole (100%); the arc is the part; the number and its denominator are printed
 * plainly beside it, so nothing is left for the reader to decode.
 */
const DIAL_STEPS = [
  { pct: 0.12, value: "0.12%", sub: "Adivasi share of IPL players — they are 9% of India" },
  { pct: 83, value: "5 in 6", sub: "of India’s poorest are from ST, SC or OBC households" },
  { pct: 34, value: "34%", sub: "of rural primary schools have no playground" },
  { pct: 4, value: "under 5%", sub: "of primary schools have a PE teacher" },
];

const DIAL_R = 150;
const DIAL_CIRC = 2 * Math.PI * DIAL_R;

/**
 * One dial, four readings. The arc length is the step's percentage of the whole
 * ring, so 0.12% is a bare nub and five-in-six is most of the circle -- the
 * contrast across steps is the point. Value and denominator are HTML, never SVG
 * text, so they stay sharp at any size.
 */
export function ExclusionsField({ active }: { active: number }): React.JSX.Element {
  const step = DIAL_STEPS[Math.min(active, DIAL_STEPS.length - 1)];
  const offset = DIAL_CIRC * (1 - Math.min(step.pct, 100) / 100);

  return (
    <div className="twohundred">
      <svg
        className="twohundred-svg twohundred-dial"
        viewBox="0 0 900 400"
        role="img"
        aria-label={`${step.value}: ${step.sub}`}
      >
        <circle cx={450} cy={200} r={DIAL_R} fill="none" stroke={C.moss} strokeWidth={36} />
        <circle
          className="th-arc"
          cx={450}
          cy={200}
          r={DIAL_R}
          fill="none"
          stroke={C.green}
          strokeWidth={36}
          strokeLinecap="round"
          strokeDasharray={DIAL_CIRC}
          strokeDashoffset={offset}
          transform="rotate(-90 450 200)"
        />
      </svg>

      <div className="twohundred-read">
        <span className="twohundred-value">{step.value}</span>
        <span className="twohundred-note">{step.sub}</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- divergence --- */

/**
 * Two boys, one coach, and then two very different homes to go back to. The
 * lanes are drawn as support, not as results — the article's point is that the
 * talent was never the difference.
 */
export function Divergence({ active }: { active: number }): React.JSX.Element {
  return (
    <div className="diverge">
      <svg
        className="diverge-svg"
        viewBox="0 0 900 340"
        role="img"
        aria-label="One starting point in 1988 dividing into two different homes."
      >
        <path d="M90 170C300 170 330 56 880 56" className="dv-lane dv-lane--a" fill="none" />
        <path d="M90 170C300 170 330 284 880 284" className="dv-lane dv-lane--b" fill="none" />

        <circle className="dv-origin" cx="90" cy="170" r="9" />
        <circle className={active >= 1 ? "dv-node is-on" : "dv-node"} cx="248" cy="170" r="6" />
        <circle className={active >= 2 ? "dv-node is-on" : "dv-node"} cx="716" cy="56" r="7" />
        <circle className={active >= 3 ? "dv-node is-on" : "dv-node"} cx="716" cy="284" r="7" />
      </svg>

      {/* Who each lane is: the steps beside this carry the article's own
          sentences, so the visual only names the two ends. */}
      <p className="dv-names" aria-hidden="true">
        <span className={active >= 2 ? "is-on" : ""}>
          <i className="dv-swatch" />Sachin Tendulkar
        </span>
        <span className={active >= 3 ? "is-on" : ""}>
          <i className="dv-swatch dv-swatch--b" />Vinod Kambli
        </span>
      </p>

      {/* The two homes, in the article's own words: each card lights when its
          lane arrives in the reading. */}
      <div className="diverge-lanes">
        <div className={`dv-card${active >= 2 ? " is-on" : ""}`}>
          <p className="dv-name">Sachin Tendulkar</p>
          <ul>
            <li>a poet-professor father and a government employee mother</li>
            <li>parents&rsquo; emotional support was crucial for talented cricketers</li>
          </ul>
        </div>
        <div className={`dv-card dv-card--b${active >= 3 ? " is-on" : ""}`}>
          <p className="dv-name">Vinod Kambli</p>
          <ul>
            <li>travel from and back to a confrontational room of 17 others</li>
            <li>an abusive father, a mechanic</li>
            <li>a loving mother who died when he was 20</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const SCENES = {
  kit: KitAssembly,
  exclusions: ExclusionsField,
  divergence: Divergence,
} as const;
