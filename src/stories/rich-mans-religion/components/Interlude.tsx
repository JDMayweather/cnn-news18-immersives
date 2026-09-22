import gsap from "gsap";
import { countUp, useScene, drawPaths } from "./motion";
import { theme } from "../theme";
import type { InterludeBar, InterludeVariant } from "../assets/article";

/**
 * The illustrated beats between chapters.
 *
 * Each one has to earn the space it takes, so the rule is: a panel carries a
 * figure the article states, and every number it uses is printed in words next
 * to the drawing. Two kinds live here:
 *
 *  - `bars` panels print the number and restate it as a bar. Real text, not SVG
 *    type, which would scale to six pixels on a phone.
 *  - drawn panels use the SVG for the thing a bar cannot show — twenty years of
 *    growth, eight people in a hundred, one start that forks into five.
 *
 * `notes` under either kind quote the sentences the figures come from, so the
 * reader can see where a number was said.
 */

const C = theme.colors;
const W = 1440;
const H = 340;

const HAIR = "rgba(31, 41, 23, 0.16)";
const MID = "rgba(31, 41, 23, 0.3)";

/* ------------------------------------------------------------------ scenes */

/**
 * Twenty years, drawn as three things a reader can name without being told:
 *
 *   1. the wait   — twenty marks on a baseline, one per growing year, gated
 *                   in fives and numbered, so the run can be counted;
 *   2. the trunk  — the same twenty as the tree records them, one ring each,
 *                   with the count printed in the middle;
 *   3. the bat    — carried out of the trunk, with a leader from the log.
 *
 * An earlier pass drew the rings and the bat side by side with nothing joining
 * them, which read as a medallion next to a cut-out. The leader, the printed
 * twenty and the numbered baseline are what make it a sentence.
 */
function Willow() {
  const STEP = 21;
  const T0 = 210;
  const BASE = H - 96;
  /* the log end, and the bat it is cut for */
  const lx = 806;
  const ly = H / 2 + 6;
  const rings = Array.from({ length: 20 }, (_, i) => 13 + i * 3.9);

  return (
    <>
      {/* 1 — the wait: one mark per year, taller every year */}
      <path className="il-draw" pathLength={1} d={`M${T0 - 26} ${BASE} H${T0 + 19 * STEP + 26}`} fill="none" stroke={HAIR} strokeWidth={1.2} />
      {Array.from({ length: 20 }, (_, i) => {
        const h = 11 + i * 2.5;
        const x = T0 + i * STEP;
        return (
          <path
            key={i}
            className="il-draw"
            pathLength={1}
            d={`M${x} ${BASE} V${BASE - h}`}
            fill="none"
            stroke={i === 19 ? C.green : C.leafMid}
            strokeWidth={i === 19 ? 2.8 : 1.5}
            strokeLinecap="round"
          />
        );
      })}
      {/* the growth itself, so the marks read as one rising run */}
      <path
        className="il-draw"
        pathLength={1}
        d={`M${T0} ${BASE - 14} C ${T0 + 130} ${BASE - 34}, ${T0 + 260} ${BASE - 58}, ${T0 + 19 * STEP} ${BASE - 63}`}
        fill="none"
        stroke={C.green}
        strokeWidth={1.6}
        opacity={0.7}
      />
      {/* numbered gates: 5, 10, 15, 20 */}
      {[4, 9, 14, 19].map((i) => (
        <g key={`g${i}`}>
          <path className="il-draw" pathLength={1} d={`M${T0 + i * STEP} ${BASE + 9} V${BASE + 20}`} fill="none" stroke={MID} strokeWidth={1.3} />
          <text className="il-num" x={T0 + i * STEP} y={BASE + 44} textAnchor="middle">
            {i + 1}
          </text>
        </g>
      ))}

      {/* the cut: from the standing run to the felled trunk */}
      <path className="il-draw" pathLength={1} d={`M650 ${BASE - 40} V36`} fill="none" stroke={HAIR} strokeWidth={1} strokeDasharray="3 7" />
      <path className="il-draw" pathLength={1} d={`M960 ${BASE - 40} V36`} fill="none" stroke={HAIR} strokeWidth={1} strokeDasharray="3 7" />

      {/* 2 — the trunk, cut: twenty rings, one per year, and the count */}
      <g className="il-rise">
        <circle className="il-draw" pathLength={1} cx={lx} cy={ly} r={94} fill={C.moss} stroke={C.greenDeep} strokeWidth={2.4} />
        {rings.map((r, i) => (
          <circle
            key={r}
            className="il-draw"
            pathLength={1}
            cx={lx}
            cy={ly}
            r={r}
            fill="none"
            stroke={i === rings.length - 1 ? C.green : HAIR}
            strokeWidth={i === rings.length - 1 ? 1.6 : 0.85}
          />
        ))}
      </g>
      <text className="il-num il-num--big" x={lx} y={ly + 13} textAnchor="middle">
        20
      </text>

      {/* 3 — the bat that comes out of it: the log feeds the blade */}
      <path className="il-draw" pathLength={1} d={`M${lx + 94} ${ly} H1198`} fill="none" stroke={C.green} strokeWidth={1.6} strokeDasharray="5 6" />
      <path className="il-draw" pathLength={1} d="M1186 168l12 8-12 8z" fill={C.green} stroke="none" />
      <g className="il-draw" pathLength={1}>
        {/* the grip, with three rings round it */}
        <path d="M1216 62v44" fill="none" stroke={C.greenDeep} strokeWidth={8} strokeLinecap="round" />
        {[74, 86, 98].map((y) => (
          <path key={y} d={`M1208 ${y}h16`} fill="none" stroke={C.leafSoft} strokeWidth={2} strokeLinecap="round" />
        ))}
        {/* splice and shoulders */}
        <path d="M1216 106l-9-8M1216 106l9-8" fill="none" stroke={C.greenDeep} strokeWidth={1.6} strokeLinecap="round" />
        {/* the blade, and its toe */}
        <path
          d="M1202 108h28v150a14 14 0 0 1-14 14 14 14 0 0 1-14-14z"
          fill={C.paperPanel}
          stroke={C.greenDeep}
          strokeWidth={2}
        />
        {/* the spine, so the face of the bat is not blank */}
        <path d="M1216 122v136" fill="none" stroke={HAIR} strokeWidth={1.2} />
      </g>
    </>
  );
}

/**
 * Two hundred children, and the twenty the academy carries. One dot per child,
 * ten to a row: the filled block is a tenth of the whole, which is the figure
 * the article gives.
 */
/* One child, drawn as a small figure holding a bat, so the academy reads as
   people rather than tokens. `on` colours the one who gets a free place. */
const HEAD = "M0 -46 a16 16 0 1 0 0.1 0 z";
const BODY = "M-20 -8 h40 a7 7 0 0 1 7 7 v40 a13 13 0 0 1 -13 13 h-28 a13 13 0 0 1 -13 -13 v-40 a7 7 0 0 1 7 -7 z";
const BAT = "M20 -2 L58 -40";

function ChildFigure({ x, y = 168, scale = 1, on }: { x: number; y?: number; scale?: number; on: boolean }): React.JSX.Element {
  const stroke = on ? C.green : C.leafMid;
  const fill = on ? C.green : "none";
  const op = on ? 0.95 : 0.6;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={op}>
      <path className="il-draw" pathLength={1} d={HEAD} fill={fill} stroke={stroke} strokeWidth={on ? 0 : 2.2} />
      <path className="il-draw" pathLength={1} d={BODY} fill={fill} stroke={stroke} strokeWidth={on ? 0 : 2.2} />
      <path className="il-draw" pathLength={1} d={BAT} fill="none" stroke={stroke} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

/* A banknote, for the share of wealth — a different unit from the people, so a
   different mark. `on` fills it green; open notes are the rest. */
function MoneyNote({ x, y, on }: { x: number; y: number; on: boolean }): React.JSX.Element {
  const stroke = on ? C.green : C.leafMid;
  return (
    <g transform={`translate(${x} ${y})`} opacity={on ? 0.95 : 0.6}>
      <rect className="il-draw" pathLength={1} x={-36} y={-22} width={72} height={44} rx={8} fill={on ? C.green : "none"} stroke={on ? "none" : stroke} strokeWidth={on ? 0 : 2.2} />
      <circle className="il-draw" pathLength={1} cx={0} cy={0} r={11} fill="none" stroke={on ? C.paper : stroke} strokeWidth={2} opacity={0.6} />
    </g>
  );
}

/**
 * Twenty of two hundred children get a free place — exactly one in ten. Rather
 * than two hundred tokens, the panel shows the rate: ten children in a row, the
 * one on a free place solid and held in an enclosure, the other nine open. The
 * exact figures (20 of 200) stay in the overlay and caption; the drawing
 * carries the proportion a reader can hold in their head.
 */
function Blades() {
  const count = 10;
  const x0 = 190;
  const step = (1440 - x0 * 2) / (count - 1);
  const boxPad = 40;
  return (
    <>
      {/* the enclosure that holds the one on a free place */}
      <rect
        x={x0 - boxPad}
        y={168 - 68}
        width={boxPad * 2}
        height={158}
        rx={20}
        fill={C.leafSoft}
        fillOpacity={0.6}
        stroke={C.green}
        strokeWidth={2}
      />
      {/* the baseline the ten stand on */}
      <path className="il-draw" pathLength={1} d={`M${x0 - 70} 246 H1370`} fill="none" stroke={HAIR} strokeWidth={1.2} />
      {Array.from({ length: count }, (_, i) => (
        <ChildFigure key={i} x={x0 + i * step} on={i === 0} />
      ))}
    </>
  );
}

/** Five places, five children: no invented crowd, just the five the article counts. */
function Selection() {
  const base = H - 78;
  const five = [300, 560, 820, 1080, 1290];
  return (
    <>
      <path className="il-draw" pathLength={1} d={`M120 ${base} H1320`} fill="none" stroke={HAIR} strokeWidth={1} />
      {five.map((x, i) => (
        <g key={x} className="il-rise">
          <path className="il-draw" pathLength={1} d={`M${x} ${base} V${base - 96 - i * 4}`} fill="none" stroke={C.leafMid} strokeWidth={1.4} />
          <circle cx={x} cy={base - 108 - i * 4} r={13} fill={C.green} opacity={0.9} />
        </g>
      ))}
      {/* the registration fee, to scale against a year's cost: a stub */}
      <rect x={150} y={base - 6} width={26} height={6} rx={2} fill={C.clay} opacity={0.85} />
    </>
  );
}

/**
 * Seven or eight people in every hundred, and the seventy they hold. Two real
 * hundreds, dotted — the only way a share this lopsided can be read honestly
 * without a chart axis.
 */
/**
 * Few people, most of the wealth. Two rows of ten, in two units so the reader
 * never confuses them: the top row is people (figures), the bottom is wealth
 * (banknotes). About one figure filled against seven notes filled makes the
 * lopsidedness the point of the panel. The exact shares — 8 of 100 people, 70
 * of 100 of the wealth — stay in the overlay and the key.
 */
function Comparison() {
  const n = 10;
  const x0 = 230;
  const step = (W - x0 * 2) / (n - 1);
  const peopleY = 108;
  const wealthY = 250;
  const peopleOn = 1; /* ~8% — fewer than one in ten */
  const wealthOn = 7; /* 70% — seven in ten */
  return (
    <>
      {/* the one in the people row, held, so the sliver is not lost */}
      <rect
        x={x0 - 46}
        y={peopleY - 62}
        width={92}
        height={132}
        rx={18}
        fill={C.leafSoft}
        fillOpacity={0.6}
        stroke={C.green}
        strokeWidth={2}
      />
      {Array.from({ length: n }, (_, i) => (
        <ChildFigure key={`p${i}`} x={x0 + i * step} y={peopleY} scale={0.62} on={i < peopleOn} />
      ))}
      {Array.from({ length: n }, (_, i) => (
        <MoneyNote key={`w${i}`} x={x0 + i * step} y={wealthY} on={i < wealthOn} />
      ))}
    </>
  );
}

/**
 * One flat line, then five that will not stay on it. The paper says the start
 * is the same; the article names five things that differ, and each gets a
 * lane. Labels live in the HTML key below, never as SVG text.
 */
function Sunrise() {
  const x0 = 110;
  const y0 = H - 60;
  return (
    <>
      {/* the paper: one start, level */}
      <path className="il-draw" pathLength={1} d={`M${x0} ${y0} H1360`} fill="none" stroke={C.green} strokeWidth={2} strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => {
        const to = y0 - 34 - i * 38;
        const bend = 500 + i * 60;
        return (
          <g key={i}>
            <path
              className="il-draw"
              pathLength={1}
              d={`M${x0} ${y0} C ${x0 + 240} ${y0 - 8 - i * 4}, ${bend} ${to}, 1360 ${to}`}
              fill="none"
              stroke={C.leafMid}
              strokeWidth={1.6}
              strokeLinecap="round"
            />
            <circle cx={1360} cy={to} r={6} fill={C.green} opacity={0.85} />
          </g>
        );
      })}
      <circle cx={x0} cy={y0} r={6} fill={C.green} />
    </>
  );
}

/**
 * What the drawing is, in words, under the drawing.
 *
 * A figure that takes a third of a screen has to say what it is: an unlabelled
 * ring, a cut-out bat and a field of dots ask the reader to guess. Each panel
 * therefore names its own parts in one line apiece, and every line is built
 * from the words the article already uses for that figure — the number, the
 * denominator and the noun. Panels whose figure is a bar chart need no key,
 * because the bar is already labelled.
 */
const KEYS: Partial<Record<InterludeVariant, string[]>> = {
  willow: ["Twenty years, one mark a year", "Twenty rings in the trunk", "The bat cut from it"],
  blades: ["Each figure is one in ten children in the academy", "The one held in green is on a free place — 20 of the 200"],
  selection: ["Five hopefuls", "About \u20b91,500 to be seen, against \u20b91\u20131.5 lakhs for the year"],
  comparison: ["Each figure a share of the people — fewer than one in ten", "Each note a share of the wealth — seven in ten"],
  clock: ["45 minutes of the school day", "The 1\u20131.5 hours other sports ask for"],
  /* One lane per thing the article says differs. */
  sunrise: ["Time", "Emotional support", "Stress", "Fallback options", "The need to make it"],
};

/**
 * The figure of record, printed large over the drawing.
 *
 * Every panel already prints its number in the caption — but a reader meets
 * the drawing first, and an unlabelled field of dots asks to be decoded. The
 * overlay puts the article's own number on the picture itself: one numeral and
 * the noun it counts, in HTML (never SVG text, which shrinks to six pixels on
 * a phone). Nothing here is a new claim; each pair restates the keys below.
 */
const OVERLAYS: Partial<
  Record<InterludeVariant, { value: number; note: string; pos?: "left" | "right" }[]>
> = {
  willow: [{ value: 20, note: "years, one ring each" }],
  blades: [{ value: 20, note: "of 200 children — one in ten — on free places" }],
  selection: [{ value: 5, note: "hopefuls" }],
  comparison: [
    { value: 8, note: "of 100 people", pos: "left" },
    { value: 70, note: "of 100 of the wealth", pos: "right" },
  ],
  clock: [{ value: 45, note: "minutes of PE in the school day" }],
  sunrise: [{ value: 5, note: "things vastly different" }],
};

const SCENES: Record<InterludeVariant, (() => React.JSX.Element) | null> = {
  willow: Willow,
  blades: Blades,
  schools: null, /* the bar panel is the whole figure */
  selection: Selection,
  clock: null, /* the bars carry it: 45 minutes against the 1–1.5 hours */
  fees: null,
  nets: null,
  comparison: Comparison,
  sunrise: Sunrise,
};

/* ------------------------------------------------------------------ shell */

/**
 * A proportion, as a printed value and a bar that restates it. The value is
 * the figure of record; the bar is there so the size can be felt, and every
 * pair traces to a sentence in the article.
 */
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
    drawPaths(root, ".il-draw", { stagger: 0.035, duration: 1.2 });

    const rises = gsap.utils.toArray<SVGGElement>(root.querySelectorAll(".il-rise"));
    if (rises.length) {
      gsap.set(rises, { transformOrigin: "center bottom", transformBox: "fill-box", scaleY: 0 });
      gsap.to(rises, { scaleY: 1, duration: 1, ease: "power2.out", stagger: 0.12, scrollTrigger: { trigger: root, start: "top 86%", once: true } });
    }

    /* Overlay numerals count up to their printed value. Under reduced
       motion or embed the build never runs, so the markup's real number
       stands — the tween only ever confirms it. */
    countUp(root, ".il-olay-num", { start: "top 88%" });

    const fills = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".il-bar-fill"));
    if (fills.length) {
      gsap.from(fills, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      });
    }
  });

  /* The map is keyed by the union, but a dev-server update can briefly pair a
     new variant in article.ts with an older copy of this file. Blank the panel
     and say so, rather than throwing and taking the chapter down. */
  const known = variant in SCENES;
  if (!known) {
    console.warn(`[rich-man] no interlude scene for variant "${variant}"`);
    return <></>;
  }
  const Scene = SCENES[variant];
  const keys = KEYS[variant];
  const overlays = OVERLAYS[variant];

  return (
    <aside ref={ref} className="il rm-rise" aria-label={label}>
      {overlays?.length ? (
        <div className="il-olays" aria-hidden="true">
          {overlays.map((o, i) => (
            <p key={i} className={`il-olay${o.pos ? ` il-olay--${o.pos}` : ""}`}>
              <span className="il-olay-num" data-value={o.value}>
                {o.value}
              </span>
              <span className="il-olay-note">{o.note}</span>
            </p>
          ))}
        </div>
      ) : null}
      {Scene ? (
        <svg className="il-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" role="img" aria-label={label}>
          <Scene />
        </svg>
      ) : null}
      {bars?.length ? <Bars bars={bars} /> : null}
      <div className="il-cap">
        <p className="il-label">{label}</p>
        {sub ? <p className="il-sub">{sub}</p> : null}
        {Scene && keys?.length ? (
          <ul className="il-key">
            {keys.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        ) : null}
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
