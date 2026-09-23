import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScene, drawPaths } from "./motion";
import { theme } from "../theme";
import { THREE_QUESTIONS, SHOTS, IMAGE_CREDITS, type FigureRef } from "../assets/article";

/**
 * Figures, restricted to what the article states: the map that shows Tamil
 * Nadu as the lone holdout, and the three questions the piece closes on.
 */

/* India outline: datameet boundary geometry, simplified once, offline, to a
   460x520 viewBox. Tamil Nadu is marked in the accent, alone. */
const INDIA_OUTLINE =
  "M155.8 68.8L161.3 69.1L161.7 67.8L164.8 67.9L166.0 65.4L173.8 63.4L174.6 61.9L177.1 62.8L181.5 61.7L183.5 63.7L184.7 63.0L186.6 66.6L190.7 67.2L191.5 69.7L193.7 67.5L196.6 68.9L194.8 70.7L193.6 77.2L191.8 79.8L187.7 80.9L187.9 83.0L183.8 83.4L185.2 86.4L182.3 89.7L175.1 90.1L177.9 94.9L175.4 95.1L175.8 98.5L178.2 101.0L182.4 101.2L181.3 103.8L184.4 108.4L182.5 110.6L180.5 110.1L176.2 113.2L173.5 111.2L173.0 108.1L168.1 110.5L169.4 114.1L173.5 118.0L172.5 120.7L174.5 123.5L172.7 124.9L173.5 127.6L175.2 128.0L178.1 125.6L182.7 131.7L185.2 132.9L188.9 132.4L194.1 135.4L193.8 138.0L205.3 142.7L195.9 149.7L196.5 151.8L194.2 154.0L194.9 157.4L192.8 158.8L191.8 162.7L198.0 166.6L198.8 164.6L207.8 169.3L209.3 172.5L211.1 172.1L217.3 176.4L219.9 175.4L225.3 178.9L228.9 178.3L229.3 181.4L235.7 182.0L237.5 183.8L238.5 181.7L245.2 183.6L245.0 182.2L249.3 181.2L251.3 183.0L255.9 183.7L256.2 187.8L260.7 189.0L261.6 190.5L263.9 190.3L264.2 191.8L270.1 190.2L273.3 194.5L275.7 193.1L280.0 193.8L285.6 196.6L290.5 194.3L290.7 196.2L294.2 197.6L302.0 195.7L303.7 197.4L306.2 192.1L305.4 188.7L303.4 186.8L306.3 177.3L305.2 175.5L312.5 172.7L315.3 174.1L316.1 176.4L314.3 180.5L316.4 184.3L314.1 186.4L315.8 186.9L315.9 189.2L316.5 188.5L319.5 191.2L323.0 190.4L329.8 192.6L336.7 189.8L341.8 191.7L355.6 191.2L358.4 189.6L360.7 190.6L361.6 189.0L360.5 184.8L361.7 184.4L360.2 181.7L355.0 181.6L353.8 179.5L354.9 177.7L358.9 178.3L363.4 175.9L366.4 177.3L370.2 174.7L369.5 172.2L372.9 171.5L380.0 165.0L384.1 165.0L391.8 161.2L393.3 159.9L392.3 158.1L397.0 156.1L399.5 157.9L405.9 159.3L417.1 154.8L420.6 157.5L419.0 159.7L421.0 158.7L425.2 164.0L422.1 167.2L423.4 168.3L423.3 166.7L426.4 165.7L429.4 169.4L432.2 169.2L435.5 171.5L434.8 173.5L436.0 174.2L435.6 176.1L433.9 175.8L428.9 179.9L432.4 187.2L428.6 185.8L428.8 184.8L426.3 183.2L419.6 184.5L408.3 192.7L404.3 193.9L403.1 196.2L404.8 201.5L402.4 204.0L402.9 205.9L400.8 208.7L397.1 211.1L396.2 213.6L398.6 214.9L398.2 217.6L393.7 223.9L390.3 232.9L384.7 230.7L381.2 231.5L378.7 229.6L380.2 235.2L379.5 242.9L378.2 244.7L375.8 244.2L375.5 251.5L376.9 255.2L376.2 256.4L374.6 256.2L374.1 259.1L373.3 258.5L372.7 259.8L369.8 256.7L368.4 259.2L363.9 234.7L360.6 235.7L359.3 234.5L359.5 238.1L356.6 240.6L357.6 243.5L354.6 245.7L352.2 241.2L351.2 241.9L351.7 243.9L350.7 243.4L350.3 239.8L348.1 236.2L351.1 229.2L354.1 229.7L355.2 227.4L356.6 228.7L356.3 227.2L358.5 228.8L358.8 226.0L362.2 224.8L364.1 220.4L363.2 218.0L367.0 218.4L365.9 216.2L360.8 214.0L338.0 214.6L329.5 212.5L329.2 205.1L330.1 203.3L327.2 199.2L325.8 203.0L322.7 202.4L319.8 200.6L318.9 196.9L316.3 196.8L318.4 199.1L312.9 198.8L314.1 197.6L309.2 193.7L308.2 195.7L310.4 196.0L310.9 197.5L306.0 200.5L305.0 205.1L307.3 205.2L311.2 209.5L315.0 209.3L315.4 211.5L317.8 212.9L316.6 214.3L309.8 213.7L309.2 217.4L308.2 218.5L305.5 217.5L306.0 218.6L303.7 221.3L308.2 225.4L313.9 226.8L314.4 231.0L311.7 232.7L311.4 235.7L314.8 237.8L313.7 241.2L317.6 241.8L315.5 244.7L317.2 247.0L316.8 251.0L319.0 256.7L317.4 260.4L319.0 264.0L316.5 264.1L315.7 262.1L315.5 264.3L313.7 263.5L314.5 258.7L312.6 257.9L311.4 261.5L310.8 259.7L310.0 260.4L309.9 264.4L309.5 262.9L309.1 264.7L309.2 262.9L307.4 262.7L307.0 265.1L305.7 259.6L306.5 256.8L303.8 255.8L306.2 257.5L300.8 263.2L290.7 265.5L288.2 268.3L287.0 271.1L289.1 275.6L287.6 276.2L290.4 277.0L285.7 279.6L285.3 281.4L286.5 281.8L284.8 283.0L286.6 282.2L282.7 284.5L281.3 287.1L279.8 287.3L280.6 287.8L268.9 291.4L261.8 295.7L249.0 311.0L240.9 315.0L236.1 321.1L223.3 328.9L222.5 331.2L224.0 331.9L223.7 329.6L224.2 330.7L222.7 333.6L224.1 333.5L223.3 335.1L222.6 333.8L223.2 335.6L214.9 339.2L212.7 338.3L208.6 339.4L204.0 347.6L202.5 347.7L202.1 345.7L200.3 345.1L194.5 348.1L191.4 356.6L193.5 363.6L192.5 370.8L195.6 381.8L193.0 393.4L189.0 399.4L187.4 404.5L189.1 423.7L185.7 423.0L180.8 424.4L180.4 427.6L175.3 435.4L176.1 437.4L179.3 438.3L174.7 438.7L166.3 442.0L163.5 451.0L156.2 455.3L152.9 454.6L148.6 451.4L142.1 443.6L143.8 442.3L142.0 443.1L139.4 437.1L138.2 427.7L137.5 428.1L137.3 425.4L133.1 417.0L132.5 412.3L127.9 404.0L123.1 399.9L117.8 388.1L116.0 381.0L116.3 376.8L112.2 367.8L113.5 368.3L112.1 367.7L110.2 361.7L107.8 360.8L108.5 359.6L104.9 356.4L104.7 353.0L103.1 351.9L104.5 351.6L102.4 349.3L103.2 348.4L102.4 349.0L98.5 342.8L97.2 338.2L98.7 337.7L97.3 338.0L96.5 336.3L98.3 336.5L96.6 335.1L97.7 334.8L96.4 333.3L96.7 329.9L95.7 328.8L96.7 328.9L94.8 325.2L96.3 325.3L94.5 323.8L94.0 321.6L95.1 321.1L94.0 320.8L92.5 316.0L93.3 315.5L91.1 312.3L91.6 311.4L93.5 313.3L93.3 310.8L92.5 311.6L91.0 310.4L90.8 307.7L92.2 308.7L90.1 305.5L91.2 303.7L92.3 305.2L90.8 302.7L93.0 300.9L92.1 301.2L91.9 298.6L89.3 302.7L89.1 296.9L90.8 297.2L88.5 294.7L90.5 293.8L88.3 293.8L87.2 289.5L90.7 279.7L89.9 276.6L91.1 276.4L89.6 275.9L89.9 273.4L88.7 274.0L88.3 273.1L89.9 272.6L87.9 271.8L89.1 270.5L87.0 271.9L87.0 270.1L88.4 270.2L86.4 268.8L88.7 266.7L87.1 266.7L87.5 266.0L91.0 263.5L85.5 263.7L86.7 260.3L88.5 259.3L85.5 260.4L85.1 259.3L86.2 256.0L88.7 256.5L90.8 255.2L85.5 254.6L84.0 256.1L82.6 254.6L82.2 257.5L80.5 258.6L81.5 260.0L80.3 259.5L82.3 264.2L79.2 268.6L79.5 270.2L70.1 274.9L61.4 277.4L52.0 272.3L34.8 254.6L36.6 252.2L36.2 253.4L38.4 253.0L38.9 255.3L42.4 254.3L42.9 252.9L45.1 254.4L45.9 252.2L47.1 253.3L49.6 251.3L52.2 251.3L56.1 245.3L53.8 245.6L52.9 244.1L52.9 245.5L48.1 246.1L45.7 248.5L42.0 248.0L40.8 246.5L38.4 247.1L30.5 242.5L31.7 242.9L29.7 241.6L31.2 240.6L27.9 238.1L28.2 237.1L27.6 237.7L29.3 234.8L33.0 232.4L28.8 234.3L27.6 233.3L26.5 236.6L24.0 236.1L26.5 234.5L24.2 234.6L26.6 231.1L32.2 231.1L33.0 226.3L33.8 227.7L34.9 226.5L35.7 227.6L44.1 226.6L46.0 228.3L50.1 228.3L51.3 226.6L57.7 224.8L57.8 227.2L59.8 227.7L65.6 225.1L63.8 224.5L63.7 222.3L65.2 221.0L62.3 214.6L59.1 211.0L59.1 206.7L53.6 206.6L51.2 203.4L52.2 194.8L47.3 194.2L42.9 192.1L43.9 185.9L55.0 174.2L58.1 174.2L60.2 178.0L62.1 178.5L76.5 174.9L83.5 163.5L91.3 159.9L96.0 152.2L97.7 146.9L105.8 143.4L104.5 141.1L105.2 139.2L107.2 138.8L112.0 132.9L116.0 131.0L113.4 130.2L113.9 126.9L115.4 126.0L113.0 122.0L114.7 119.5L118.6 117.2L123.7 116.7L125.5 114.8L121.7 111.2L115.8 111.0L116.1 106.1L115.2 107.4L111.4 107.1L105.1 103.4L101.0 102.5L100.4 91.3L97.7 84.4L98.5 81.7L101.3 81.8L102.3 79.0L106.8 77.2L108.0 74.0L102.6 72.5L101.8 70.7L103.1 68.3L97.8 68.2L96.7 66.3L93.8 65.5L94.6 63.5L86.0 63.6L85.7 58.3L91.6 54.8L92.9 51.7L104.1 51.4L101.5 48.6L106.7 49.8L112.1 47.4L114.1 47.9L115.9 46.1L118.0 46.5L118.9 48.3L122.3 47.0L126.2 48.0L126.7 51.3L130.6 50.9L134.8 55.4L144.5 59.3L146.2 63.5L153.4 65.5L155.8 68.8Z";

/* Tamil Nadu's approximate position in the 460x520 outline box. */
const TN = { cx: 168, cy: 430 };

export function LoneMap(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const ref = useScene<HTMLDivElement>((root) => {
    drawPaths(root, ".nv-map-draw", { stagger: 0.06, scrub: true });
  });

  /* Populate the map with Navodaya dots placed *inside* the outline — points
     are hit-tested against the path itself (isPointInFill), so nothing ever
     strays off the landmass. Tamil Nadu's region is left clear so its ochre
     mark reads as the lone exception. */
  useEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.isPointInFill !== "function") return;
    const svg = path.ownerSVGElement;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    const inside: { x: number; y: number }[] = [];
    for (let x = 30; x <= 440; x += 19) {
      for (let y = 55; y <= 465; y += 19) {
        pt.x = x;
        pt.y = y;
        if (path.isPointInFill(pt) && Math.hypot(x - TN.cx, y - TN.cy) > 48) {
          inside.push({ x, y });
        }
      }
    }
    const step = Math.max(1, Math.ceil(inside.length / 42));
    setDots(inside.filter((_, i) => i % step === 0));
  }, []);

  return (
    <div className="nv-fig nv-map-fig" ref={ref}>
      <p className="nv-fig-label">The lone exception</p>
      <div className="nv-map-wrap">
        <div className="nv-map-stage">
          <svg className="nv-map" viewBox="0 0 460 520" role="img" aria-label="A map of India. Every other state has Jawahar Navodaya Vidyalayas; Tamil Nadu, in the south, is the sole state that has not accepted the scheme.">
            <path ref={pathRef} className="nv-map-draw" pathLength={1} d={INDIA_OUTLINE} fill="#3a4568" stroke={theme.colors.leafMid} strokeWidth={1.6} strokeLinejoin="round" />
            {dots.map((d, i) => (
              <circle key={i} className="nv-map-dot" style={{ ["--i" as string]: i }} cx={d.x} cy={d.y} r={3.4} fill={theme.colors.onDark} />
            ))}
            <circle cx={TN.cx} cy={TN.cy} r={30} fill={theme.colors.clay} opacity={0.14} />
            <circle className="nv-map-pulse" cx={TN.cx} cy={TN.cy} r={14} fill="none" stroke={theme.colors.clay} strokeWidth={2} />
            <circle
              className="nv-map-tn"
              cx={TN.cx}
              cy={TN.cy}
              r={9}
              fill={theme.colors.clay}
              tabIndex={0}
              role="button"
              aria-label="Tamil Nadu — the lone exception. Activate for detail."
              onClick={() => setOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen((v) => !v);
                }
              }}
            />
          </svg>
          <button type="button" className={`nv-map-pop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden={!open}>
            <span className="nv-map-pop-tag">Tamil Nadu</span>
            <span className="nv-map-pop-note">The sole state that has never accepted the Navodaya Vidyalaya scheme. Setting up a JNV requires a proposal from the state — and Tamil Nadu has not consented.</span>
            <span className="nv-map-pop-close" aria-hidden="true">Tap to close</span>
          </button>
        </div>
        <p className="nv-map-read">
          <span className="nv-map-tag">Tamil Nadu</span>
          <span className="nv-map-note">Government records have repeatedly identified it as the sole state that has not accepted the scheme.</span>
          <span className="nv-map-hint">Tap the ochre mark to see why →</span>
        </p>
      </div>
    </div>
  );
}

/**
 * The closing questions, staged as a cinematic full-screen sequence: a sticky
 * stage holds the viewport while the reader scrolls through three tall step
 * spacers, and the active question cross-fades in — one at a time. The article's
 * three questions are shown verbatim. Reduced-motion / embed falls back to a
 * plain numbered list so nothing depends on the pin.
 */
export function ThreeQuestions(): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setPinned(false);
      return;
    }
    const nodes = steps.current.filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = nodes.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  if (!pinned) {
    return (
      <div className="nv-fig nv-q-fig">
        <p className="nv-fig-label">Three questions that will not disappear</p>
        <ol className="nv-q-list">
          {THREE_QUESTIONS.map((q, i) => (
            <li className="nv-q-row nv-rise" key={i} style={{ ["--i" as string]: i }}>
              <span className="nv-q-mark" aria-hidden="true">?</span>
              <span className="nv-q-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="nv-q-text">{q}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="nv-qseq" role="group" aria-label="Three questions that will not disappear">
      <div className="nv-qseq-stage">
        <p className="nv-qseq-kicker">Three questions that will not disappear</p>
        <div className="nv-qseq-frame">
          {THREE_QUESTIONS.map((q, i) => (
            <p key={i} className={`nv-qseq-q${i === active ? " is-on" : i < active ? " is-past" : ""}`}>
              {q}
            </p>
          ))}
        </div>
        <span className="nv-qseq-count" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / {String(THREE_QUESTIONS.length).padStart(2, "0")}
        </span>
      </div>
      <div className="nv-qseq-track" aria-hidden="true">
        {THREE_QUESTIONS.map((_, i) => (
          <span
            className="nv-qseq-step"
            key={i}
            ref={(el) => {
              steps.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Not just about Hindi: the article names three dimensions — language,
 * federalism and educational opportunity — that converge on one dispute. A
 * three-axis diagram draws the lines in on scroll and lands on the centre.
 * Every word here is one the article uses for these dimensions.
 */
export function ThreeAxis(): React.JSX.Element {
  const ref = useScene<HTMLDivElement>((root) => {
    drawPaths(root, ".nv-axis-draw", { stagger: 0.12, duration: 1 });
    gsap.from(root.querySelectorAll(".nv-axis-rise"), {
      opacity: 0,
      scale: 0.7,
      transformOrigin: "center",
      transformBox: "fill-box",
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
    });
  });
  const L = { x: 450, y: 74 };
  const F = { x: 130, y: 476 };
  const E = { x: 770, y: 476 };
  const C = { x: 450, y: 316 };
  return (
    <div className="nv-fig nv-axis" ref={ref}>
      <p className="nv-fig-label">Is this really about Hindi?</p>
      <svg className="nv-axis-svg" viewBox="0 0 900 560" role="img" aria-label="Three dimensions — language, federalism and educational opportunity — converging on one dispute.">
        {[[L, C], [F, C], [E, C], [L, F], [F, E], [E, L]].map(([a, b], i) => (
          <path key={i} className="nv-axis-draw" pathLength={1} d={`M${a.x} ${a.y} L${b.x} ${b.y}`} fill="none" stroke={theme.colors.onDarkLine} strokeWidth={1.4} />
        ))}
        {[L, F, E].map((p, i) => (
          <circle key={i} className="nv-axis-rise" cx={p.x} cy={p.y} r={9} fill={theme.colors.onDarkAccent} />
        ))}
        <circle className="nv-axis-rise" cx={C.x} cy={C.y} r={15} fill={theme.colors.clay} />
        <text className="nv-axis-label" x={L.x} y={L.y - 22} textAnchor="middle">LANGUAGE</text>
        <text className="nv-axis-label" x={F.x} y={F.y + 34} textAnchor="middle">FEDERALISM</text>
        <text className="nv-axis-label" x={E.x} y={E.y + 34} textAnchor="middle">EDUCATION</text>
        <text className="nv-axis-center" x={C.x} y={C.y + 46} textAnchor="middle">THE DISPUTE</text>
      </svg>
    </div>
  );
}

/**
 * The Supreme Court intervention, staged as a cinematic full-screen scene: it
 * opens near-black on the date, the Court "enters," the photograph emerges, and
 * two consequences land — the three-month extension and the call for dialogue.
 * The big lines are editorial framing (UI, not article body); the numbers and
 * the word "dialogue" are the article's own. The verbatim paragraph still runs
 * above this, unchanged. Reduced-motion / embed fall back to a plain list.
 */
const COURT_STEPS: { tag: string; kicker: string; big: string; sub?: string; img: string; credit: string }[] = [
  { tag: "The Court", kicker: "17 September 2026", big: "The Supreme Court has entered the dispute.", img: SHOTS.scInterior, credit: IMAGE_CREDITS.scInterior },
  { tag: "The order", kicker: "The direction stands", big: "Three months", sub: "The state was given more time to comply.", img: SHOTS.tamilScript, credit: IMAGE_CREDITS.tamilScript },
  { tag: "The instruction", kicker: "To both sides", big: "Dialogue", sub: "The Court urged the two sides to resolve their differences.", img: SHOTS.dravidian, credit: IMAGE_CREDITS.dravidian },
];

export function CourtScene(): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setPinned(false);
      return;
    }
    const nodes = steps.current.filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = nodes.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  if (!pinned) {
    return (
      <div className="nv-fig nv-court">
        <p className="nv-fig-label">The Court intervenes</p>
        <ol className="nv-court-list">
          {COURT_STEPS.map((s, i) => (
            <li className="nv-court-beat nv-rise" key={i} style={{ ["--i" as string]: i }}>
              <span className="nv-court-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="nv-court-big">{s.big}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="nv-court-cine" role="group" aria-label="The Supreme Court intervenes">
      <div className="nv-court-stage">
        {COURT_STEPS.map((s, i) => (
          <img
            key={i}
            className={`nv-court-img${i === active ? " is-on" : ""}`}
            src={s.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        ))}
        <span className="nv-court-veil" aria-hidden="true" />
        <span className="nv-court-plate" aria-hidden="true" />
        <span className="nv-court-year" aria-hidden="true">2026</span>
        <span className="nv-court-label" aria-hidden="true">The Court intervenes</span>
        <span className="nv-court-side" aria-hidden="true">§ 06 · Supreme Court</span>
        <div className="nv-court-frame">
          {COURT_STEPS.map((s, i) => (
            <div key={i} className={`nv-court-cine-beat${i === active ? " is-on" : i < active ? " is-past" : ""}`}>
              <span className="nv-court-tag">{s.tag}</span>
              <span className="nv-court-kicker">{s.kicker}</span>
              <span className="nv-court-cine-big">{s.big}</span>
              {s.sub && <span className="nv-court-cine-sub">{s.sub}</span>}
            </div>
          ))}
        </div>
        <div className="nv-court-foot">
          <span className="nv-court-credit">{COURT_STEPS[active]?.credit}</span>
          <span className="nv-court-rail" aria-hidden="true">
            {COURT_STEPS.map((_, i) => (
              <span key={i} className={`nv-court-tick${i === active ? " is-on" : i < active ? " is-past" : ""}`} />
            ))}
            <span className="nv-court-index">{String(active + 1).padStart(2, "0")} / {String(COURT_STEPS.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
      <div className="nv-court-track" aria-hidden="true">
        {COURT_STEPS.map((_, i) => (
          <span
            className="nv-court-step"
            key={i}
            ref={(el) => {
              steps.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ app */
export function Figure({ figure }: { figure: FigureRef }): React.JSX.Element | null {
  switch (figure) {
    case "loneMap":
      return <LoneMap />;
    case "threeQuestions":
      return <ThreeQuestions />;
    case "threeAxis":
      return <ThreeAxis />;
    case "court":
      return <CourtScene />;
    default:
      return null;
  }
}
