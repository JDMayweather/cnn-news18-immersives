import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isEmbedMode, prefersReducedMotion } from "@/core/responsive/viewport";

/**
 * Body copy, set line by line with Pretext.
 *
 * Pretext is a text *measurement* engine, not a renderer — it never draws
 * anything. What it gives us is the thing CSS refuses to expose: the exact
 * line boxes a paragraph will break into at a given width, as arithmetic,
 * without touching the DOM. Three things follow from that, and all three are
 * used here:
 *
 *  1. Every line is its own block, so the paragraph can be revealed line by
 *     line on entry instead of arriving as an 8-line slab.
 *  2. Word space is then set per line from the measured shortfall, which is
 *     justification the way a magazine does it — no rivers, no hyphenation,
 *     and the last line is never stretched.
 *  3. The opening paragraph's drop cap is a real float, so the lines beside it
 *     are measured against a narrower column (`layoutNextLineRange`) and the
 *     copy wraps around the letter rather than running under it.
 *
 * Everything degrades: if the module cannot load (it needs Intl.Segmenter and
 * canvas text measurement), or measurement throws, the paragraph renders as
 * plain text and the stylesheet's own justification applies. The words are the
 * same either way — the spans are only a rendering of them.
 */

type Pretext = typeof import("@chenglou/pretext");
type Prepared = ReturnType<Pretext["prepareWithSegments"]>;

type Line = {
  text: string;
  /** Measured width of the line's own text, in px. */
  width: number;
  /** Width this line must fill (narrower beside the drop cap). */
  target: number;
  /** Left over per word gap, in px. Zero on the last line and on phones. */
  wordSpacing: number;
  /** Optical margin: px this line hangs into the left margin because it opens
   *  with a quotation mark, so the first letter of the words lines up with the
   *  column. Zero for every other line. */
  hang: number;
  /** Separator between this line and the next: a space only if the source had
   *  whitespace at that break. */
  join: string;
};

/** A hair under the column, so a rounding error can never re-wrap a line. */
/**
 * Optical margin alignment.
 *
 * A line that opens with a quotation mark pushes its own first letter one
 * glyph to the right of every other line, and the eye reads the paragraph edge
 * as ragged. Set the mark outside the column and the words line up, which is
 * what a compositor does by hand ("hanging punctuation"). The mark's own width
 * is measured with the same canvas Pretext measures with, then folded back
 * into the line's slack so the right edge still lands where the other lines
 * end. Only the opening marks: a closing mark never starts a line, and hanging
 * a hyphen would read as a hyphenation fault rather than a choice.
 */
const HANGING = /^["\u2018\u201c\u201e\u00ab\u2039']/;

/**
 * The headroom left under the column when lines are broken.
 *
 * Not a single hair, because the canvas/paint disagreement is not one number.
 * The probe below measures the average — about a quarter of a per cent — but
 * individual lines run up to one per cent out, so two lines of the same length
 * can be a dozen pixels apart in what they actually paint. A fixed 1.5px margin
 * let the wrong end of that spread wrap onto a second row. It is therefore a
 * proportion of the column — 15px at 1252 — which swallows the spread. Nothing
 * is lost visually: every justified line is stretched to the same target, so
 * the right edge stays even; the column is simply that much narrower than its
 * box, and no block but the text sits on the box.
 */
function safetyFor(width: number): number {
  return Math.min(20, Math.max(2, width * 0.012));
}
/** Never stretch a gap wider than this; it is a fix-up, not a design. */
const MAX_WORD_SPACING = 6;
/** Below this column width, justification stops looking intentional. */
const JUSTIFY_FROM = 640;

let pretextPromise: Promise<Pretext | null> | null = null;

/** Loaded once, lazily, and allowed to fail. */
function loadPretext(): Promise<Pretext | null> {
  if (!pretextPromise) {
    pretextPromise = import("@chenglou/pretext").catch(() => null);
  }
  return pretextPromise;
}

/**
 * prepare() is the one-time pass (segment, glue, measure every run with
 * canvas). It must not run twice for the same text and font, so the handles
 * are kept. A story is a fixed body of text; this map holds one entry per
 * paragraph.
 *
 * The generation counter is the important part: canvas measures whatever face
 * is installed at the moment it is asked. Measure before Newsreader lands and
 * every width is a fallback serif's — a couple of percent out, which is enough
 * to push a justified line onto a second row. Any cached handle from before
 * the fonts settled is therefore discarded, not reused.
 */
let fontGeneration = 0;
const preparedCache = new Map<string, Prepared>();

function bumpFontGeneration(): void {
  fontGeneration += 1;
  preparedCache.clear();
}

function preparedFor(pt: Pretext, text: string, font: string, letterSpacing: number): Prepared {
  const key = `${fontGeneration}|${font}|${letterSpacing}|${text}`;
  const hit = preparedCache.get(key);
  if (hit) return hit;
  const prepared = pt.prepareWithSegments(text, font, { letterSpacing });
  preparedCache.set(key, prepared);
  return prepared;
}

/**
 * The browser's own width for a line of text, asked of the page itself.
 *
 * This is the last word on how wide a line is, because it is the same
 * measurement the layout will make when it decides to wrap. Pretext's canvas
 * figure is what picks the break, but the *stretch* has to be built on this
 * one: canvas ran up to 14px narrow on a long line here (1.1%), and a stretch
 * computed from a short figure overshoots the column by exactly that much —
 * which is a line pushed onto a second row, mid-paragraph, in the middle of
 * the page.
 *
 * One throwaway span is parked in the paragraph for the duration of a layout
 * pass and its text is swapped per line, so every line is measured by the
 * engine that will paint it, at the font the paragraph actually carries.
 */
function naturalMeasurer(park: HTMLElement): (text: string) => number {
  const cache = new Map<string, number>();
  return (text: string): number => {
    const hit = cache.get(text);
    if (hit !== undefined) return hit;
    park.textContent = text;
    const width = park.getBoundingClientRect().width;
    cache.set(text, width);
    return width;
  };
}

/**
 * How much wider this browser paints a run of type than canvas measures it.
 *
 * Pretext measures with canvas; the page lays out with the engine's own
 * metrics, and the two disagree by a few tenths of a percent — which at a
 * 1252px column is up to ten pixels. That is the difference between a line
 * that fits and a line that wraps onto a second row, and it is why a justified
 * line would occasionally spill. The disagreement is measured directly: the
 * same string is set once in the page, once in canvas, and the ratio between
 * them is what the column is divided by before Pretext is asked to break it.
 *
 * Measured rather than guessed, so it holds for whatever face actually landed
 * — a fallback while Newsreader loads, a different weight, a different engine.
 */
const PROBE = "Hamburgefonstiv handgloves 0123456789 \u201cquoted\u201d";

let probeFontCanvas: HTMLCanvasElement | null = null;

function canvasWidth(font: string, text: string): number {
  if (typeof document === "undefined") return 0;
  if (!probeFontCanvas) probeFontCanvas = document.createElement("canvas");
  const cx = probeFontCanvas.getContext("2d");
  if (!cx) return 0;
  cx.font = font;
  const w = cx.measureText(text).width;
  return Number.isFinite(w) ? w : 0;
}

function paintRatio(el: HTMLElement, font: string, letterSpacing: number): number {
  if (typeof document === "undefined") return 1;
  const probe = document.createElement("span");
  probe.textContent = PROBE;
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;white-space:pre;visibility:hidden;pointer-events:none;";
  el.appendChild(probe);
  const painted = probe.getBoundingClientRect().width;
  el.removeChild(probe);
  const measured = canvasWidth(font, PROBE) + letterSpacing * PROBE.length;
  if (!(painted > 40) || !(measured > 40)) return 1;
  const ratio = painted / measured;
  /* Guard against a runaway correction from a mis-measured probe. */
  return ratio > 0.9 && ratio < 1.1 ? ratio : 1;
}

/** The canvas font shorthand has to describe the same type the CSS does. */
function canvasFont(cs: CSSStyleDeclaration, fontSizePx: number): string {
  const family = (cs.fontFamily.split(",")[0] || "serif").trim();
  const style = cs.fontStyle && cs.fontStyle !== "normal" ? `${cs.fontStyle} ` : "";
  return `${style}${cs.fontWeight} ${fontSizePx}px ${family}`;
}

function px(value: string, fallback = 0): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

function letterSpacingPx(cs: CSSStyleDeclaration): number {
  return cs.letterSpacing.endsWith("px") ? px(cs.letterSpacing) : 0;
}

function lineHeightPx(cs: CSSStyleDeclaration, fontSizePx: number): number {
  if (cs.lineHeight.endsWith("px")) return px(cs.lineHeight, fontSizePx * 1.6);
  const n = parseFloat(cs.lineHeight);
  return Number.isFinite(n) ? n * fontSizePx : fontSizePx * 1.6;
}

type Metrics = {
  width: number;
  lineHeight: number;
  font: string;
  letterSpacing: number;
};

/** Content-box width and the type metrics, all in px, unrounded. */
function measure(el: HTMLElement): Metrics | null {
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const width =
    rect.width -
    px(cs.paddingLeft) -
    px(cs.paddingRight) -
    px(cs.borderLeftWidth) -
    px(cs.borderRightWidth);
  if (!(width > 60) || !el.textContent) return null;

  const fontSize = px(cs.fontSize, 16);
  return {
    width,
    lineHeight: lineHeightPx(cs, fontSize),
    font: canvasFont(cs, fontSize),
    letterSpacing: letterSpacingPx(cs),
  };
}

/**
 * A band is narrower than the column for the lines that sit beside something
 * floated — a drop cap, or a portrait photograph. `bottom` is measured from
 * the paragraph's top, so it can be compared against each line's own top.
 */
type Band = { width: number; bottom: number };

/**
 * The floated ::first-letter, measured from the plain paragraph.
 *
 * `bandWidth` is the width the browser actually leaves beside the float: it is
 * taken from where the *second* character sits, not from the letter's own box,
 * because the float's padding is not part of the glyph's rect. Getting this
 * wrong by a few pixels lets the browser wrap a line one row further than
 * Pretext measured, which is the one failure this whole approach must avoid.
 */
type Cap = Band;

/**
 * Any floated photograph above this paragraph narrows the lines beside it. The
 * sibling is only read, never moved — this is the same band idea as the cap,
 * generalised to a picture. Below 760px the stylesheet drops the float, so
 * `float` reads as `none` here and the lines go back to full width.
 */
function measureFloatBand(el: HTMLElement): Band | null {
  const parent = el.parentElement;
  if (!parent) return null;
  const pr = el.getBoundingClientRect();
  let band: Band | null = null;

  for (const sib of Array.from(parent.children)) {
    if (sib === el) break;
    const cs = getComputedStyle(sib);
    const side = cs.float;
    if (side !== "left" && side !== "right") continue;
    const sr = sib.getBoundingClientRect();
    const bottom = sr.bottom - pr.top;
    if (bottom <= 1) continue;
    /* The text may run up to the float's margin edge, not its border box. */
    const gap = side === "right" ? px(cs.marginLeft) : px(cs.marginRight);
    const width =
      side === "right" ? sr.left - gap - pr.left : pr.right - sr.right - gap;
    const next: Band = { width: Math.max(140, width), bottom };
    band = band
      ? { width: Math.min(band.width, next.width), bottom: Math.max(band.bottom, next.bottom) }
      : next;
  }
  return band;
}

function measureDropCap(el: HTMLElement, lineHeight: number, width: number): Cap | null {
  /* The first text node, whether the paragraph is still plain or already set
     line by line — the block's ::first-letter float survives both. */
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const node = walker.nextNode();
  if (!node) return null;
  const text = node.textContent ?? "";
  if (text.length < 2) return null;
  try {
    const elRect = el.getBoundingClientRect();
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 1);
    const cap = range.getBoundingClientRect();
    /* A one-character range in body copy is one line tall; anything taller is
       the floated cap. (A lead paragraph neutralises the cap, so it lands here
       as a normal letter and is skipped.) */
    if (cap.height <= lineHeight * 1.25 || cap.width <= 0) return null;

    range.setStart(node, 1);
    range.setEnd(node, 2);
    const second = range.getBoundingClientRect();
    const textStart = second.width > 0 ? second.left - elRect.left : cap.right - elRect.left;

    return {
      width: Math.max(60, width - textStart),
      bottom: cap.bottom - elRect.top,
    };
  } catch {
    return null;
  }
}

type Cursor = { segmentIndex: number; graphemeIndex: number };
type RawLine = {
  text: string;
  width: number;
  target: number;
  /** The width this line may paint into, in painted px: the column, or the gap
   *  beside a float. Its own budget, because a line beside a picture is not
   *  stretched to the column's edge. */
  avail: number;
  start?: Cursor;
  end?: Cursor;
};

/**
 * A one-word last line is the one flaw justification cannot fix. Because the
 * line breaks are arithmetic here, the final two lines can simply be re-broken
 * at a narrower target until the last line pulls its weight — which is what a
 * compositor does by hand, and what CSS has no way to express.
 */
function balanceLastLine(pt: Pretext, prepared: Prepared, raw: RawLine[], full: number): void {
  if (raw.length < 2) return;
  const lastI = raw.length - 1;
  const prevI = lastI - 1;
  const last = raw[lastI];
  const prev = raw[prevI];
  if (!prev.start || !last.end) return;
  if (last.width >= full * 0.2) return; /* the last line already reads as a line */

  const floor = Math.max(full * 0.55, prev.target - full * 0.18);
  for (let w = prev.target - 6; w >= floor; w -= 4) {
    const range = pt.layoutNextLineRange(prepared, prev.start, w);
    if (!range) break;
    const nextRange = pt.layoutNextLineRange(prepared, range.end, full);
    if (!nextRange) continue;
    /* The re-break has to finish the paragraph: same end, no extra line. */
    if (
      nextRange.end.segmentIndex !== last.end.segmentIndex ||
      nextRange.end.graphemeIndex !== last.end.graphemeIndex
    ) {
      continue;
    }
    const newPrev = pt.materializeLineRange(prepared, range);
    const newLast = pt.materializeLineRange(prepared, nextRange);
    if (newLast.width < full * 0.3) continue;
    raw[prevI] = { ...prev, text: newPrev.text, width: newPrev.width, target: w };
    raw[lastI] = { ...last, text: newLast.text, width: newLast.width, target: full };
    return;
  }
}

function buildLines(
  pt: Pretext,
  text: string,
  m: Metrics,
  bands: Band[],
  cal: number,
  natural: (text: string) => number,
  justifyProp: boolean,
): Line[] {
  const prepared = preparedFor(pt, text, m.font, m.letterSpacing);
  const justify = justifyProp && m.width >= JUSTIFY_FROM;

  const raw: RawLine[] = [];

  /* Pretext measures with canvas; the browser lays out with its own metrics,
     and the two disagree about a run of glyphs by a fraction of a percent.
     `cal` is that disagreement, measured back off the painted page (see the
     calibration pass below), and the column Pretext is told about is divided
     by it — so the breaks it makes are the breaks the browser will make. */
  const width = m.width / cal;

  /* Every line is laid out to a hair less than the column, so a browser whose
     glyph advances differ from canvas measurement by a fraction can never
     wrap a line Pretext measured as fitting. */
  const safety = safetyFor(width);
  const full = Math.max(80, width - safety);

  if (bands.length) {
    /* Variable width, one line at a time: narrow beside whatever is floated
       (the opening letter, a photograph), full width underneath it. */
    let cursor: Cursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;
    for (let guard = 0; guard < 600; guard++) {
      let avail = m.width;
      for (const band of bands) if (y < band.bottom - 1) avail = Math.min(avail, band.width);
      const target = Math.max(80, avail / cal - safetyFor(avail));
      const range = pt.layoutNextLineRange(prepared, cursor, target);
      if (!range) break;
      const line = pt.materializeLineRange(prepared, range);
      raw.push({ text: line.text, width: line.width, target, avail, start: cursor, end: range.end });
      cursor = range.end;
      y += m.lineHeight;
    }
  } else {
    for (const line of pt.layoutWithLines(prepared, full, m.lineHeight).lines) {
      raw.push({ text: line.text, width: line.width, target: full, avail: m.width, start: line.start, end: line.end });
    }
  }

  balanceLastLine(pt, prepared, raw, width);

  /* Lines are separate blocks, so nothing joins them visually — but the text
     still has to read back as one string for copy, search and screen readers.
     A break can land where the source had no space (after a hyphen, inside a
     long word), and padding those with a space would corrupt the sentence. */
  const starts: number[] = [];
  let pos = 0;
  for (const line of raw) {
    const found = text.indexOf(line.text, pos);
    starts.push(found);
    if (found >= 0) pos = found + line.text.length;
  }

  return raw.map((line, i) => {
    const last = i === raw.length - 1;

    let join: string;
    if (last) {
      join = "";
    } else {
      const before = starts[i] + line.text.length;
      const after = starts[i + 1];
      join = before > 0 && after > before && /\s/.test(text.slice(before, after)) ? " " : "";
      /* Unfound text (should not happen) keeps the safe default. */
      if (after < 0) join = " ";
    }

    const rendered = line.text + join;
    const gaps = (rendered.match(/ /g) ?? []).length;
    const trail = /\s$/.test(rendered) ? 1 : 0;
    /* A hanging mark moves the line left by its own width, so the line has to
       stretch by the same amount to keep its right edge in the column. */
    const hang = HANGING.test(line.text) ? natural(line.text[0]) : 0;
    /* The line has to fill this: the column (or the gap beside a float, which
       is the line's own budget, not the page's), less a hair, plus whatever it
       hangs by. Both terms are the engine's own measurements — `line.avail`
       comes from the page, `natural()` from the page — so this is the same
       arithmetic the layout is about to do, and it can be trusted to the
       pixel. A trailing space is not painted at a line end, so neither the
       budget nor the gaps count it. */
    const painted = natural(line.text);
    const interiors = Math.max(0, gaps - trail);
    const slack = line.avail - 1 + hang - painted;
    const wordSpacing =
      justify && !last && interiors > 0 && slack > 0
        ? Math.min(slack / interiors, MAX_WORD_SPACING)
        : 0;

    return { ...line, wordSpacing, join, hang };
  });
}

export default function Prose({
  text,
  className,
  dropCap = false,
  justify = true,
}: {
  text: string;
  className?: string;
  dropCap?: boolean;
  /** Ranged-left-centre moments (solo lines) skip justification stretch. */
  justify?: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLParagraphElement>(null);
  const capRef = useRef<Cap | null>(null);
  /** What the cached cap band was measured against, so it can be re-measured. */
  const capKeyRef = useRef("");
  const [lines, setLines] = useState<Line[] | null>(null);
  const [shown, setShown] = useState(false);
  /* Calibration between canvas measurement and this browser's layout. */
  const cal = useRef(1);
  /** Extra narrowing, applied when a painted line is still seen to wrap. */
  const shrink = useRef(1);
  const [pass, setPass] = useState(0);
  /** True once the paragraph has proved too short to carry a drop cap. */
  const [capOff, setCapOff] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let cancelled = false;
    let pt: Pretext | null = null;
    let frame = 0;


    const run = (): void => {
      if (!pt || cancelled) return;
      const m = measure(el);
      if (!m) return;
      /* Re-measured on every pass: it is one line of type, and it is the only
         thing standing between a measured line and a wrapped one. */
      cal.current = paintRatio(el, m.font, m.letterSpacing) * shrink.current;
      /* Re-measured whenever the column or the paragraph changes. Neither is a
         constant: the scrollbar arriving takes 15px off every paragraph after
         the first paint, and the band is derived from the width of one glyph,
         so it differs paragraph to paragraph. A band cached across either of
         those was a word too long, which is a wrapped line at the top of a
         chapter. */
      const capKey = `${m.width.toFixed(1)}|${text.slice(0, 24)}`;
      if (dropCap && !capOff && capKeyRef.current !== capKey) {
        capRef.current = measureDropCap(el, m.lineHeight, m.width);
        capKeyRef.current = capKey;
      }
      const bands: Band[] = [];
      if (capRef.current && capRef.current.bottom > m.lineHeight) bands.push(capRef.current);
      const floatBand = measureFloatBand(el);
      if (floatBand) bands.push(floatBand);
      /* Park the measuring span, lay the paragraph out against the page's own
         line widths, then take it away again. */
      const park = document.createElement("span");
      park.setAttribute("aria-hidden", "true");
      park.style.cssText =
        "position:absolute;left:-9999px;top:0;white-space:pre;visibility:hidden;pointer-events:none;";
      el.appendChild(park);
      try {
        const next = buildLines(pt, text, m, bands, cal.current, naturalMeasurer(park), justify);
        setLines(next.length ? next : null);
      } catch {
        setLines(null);
      } finally {
        park.remove();
      }
    };

    /* Only the cheap layout() half re-runs on resize; prepare() is cached. */
    const schedule = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    };

    /* Measure only once the faces are in place, then again if the browser
       swaps a face later (a late weight, or a fallback that resolves). */
    const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    const onFontsDone = (): void => {
      bumpFontGeneration();
      schedule();
    };
    document.fonts?.addEventListener("loadingdone", onFontsDone);

    Promise.all([loadPretext(), fontsReady]).then(([mod]) => {
      if (cancelled || !mod) return;
      pt = mod;
      run();
    });

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    ro?.observe(el);
    window.addEventListener("resize", schedule);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ro?.disconnect();
      document.fonts?.removeEventListener("loadingdone", onFontsDone);
      window.removeEventListener("resize", schedule);
    };
  }, [text, dropCap, justify, pass, capOff]);

  /*
   * The last check, and the only one that is not arithmetic.
   *
   * The probe above corrects for the *average* disagreement between canvas and
   * paint. Individual lines vary around it, and a line at the wrong end of the
   * spread can still be one word too long — the sink of a whole paragraph's
   * layout being three pixels out. Rather than guess a bigger margin (which
   * would leave every line short of the column for the sake of one), the
   * painted lines are inspected: if any of them occupies two rows, the column
   * is narrowed by half a per cent and the paragraph is laid out again. That
   * direction can only shorten lines, so it always settles, and it is capped at
   * three passes.
   */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !lines?.length || pass >= 3) return;
    const spans = el.querySelectorAll(".nv-line");
    if (spans.length !== lines.length) return;
    const cs = getComputedStyle(el);
    const lh = lineHeightPx(cs, px(cs.fontSize, 16));
    let wrapped = false;
    for (const span of Array.from(spans)) {
      if (span.getBoundingClientRect().height > lh * 1.2) {
        wrapped = true;
        break;
      }
    }
    if (wrapped) {
      shrink.current *= 0.996;
      setPass((p) => p + 1);
      return;
    }
    /* One line of text cannot hold a cap that is two lines tall. */
    if (dropCap && !capOff && lines.length < 2) setCapOff(true);
  }, [lines, pass, dropCap, capOff]);

  /* A new paragraph starts uncorrected. */
  useEffect(() => {
    shrink.current = 1;
    setPass(0);
    setCapOff(false);
  }, [text, dropCap]);

  /* The line reveal. Nothing animates in embed mode or under reduced motion,
     and if the observer is unavailable the paragraph is simply visible. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !lines) return;
    if (prefersReducedMotion() || isEmbedMode() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lines]);

  return (
    <p
      className={capOff ? `${className ? `${className} ` : ""}nv-nocap` : className}
      ref={ref}
      data-lines={lines ? "on" : undefined}
      data-shown={shown ? "on" : undefined}
    >
      {lines
        ? lines.map((line, i) => (
            <span
              className="nv-line"
              key={i}
              style={
                {
                  "--i": Math.min(i, 8),
                  /* The block is shifted left, and widened by the same amount,
                     so the line still ends on the column's right edge. */
                  marginLeft: line.hang ? `${(-line.hang).toFixed(2)}px` : undefined,
                  wordSpacing: line.wordSpacing ? `${line.wordSpacing.toFixed(3)}px` : undefined,
                } as React.CSSProperties
              }
            >
              {line.text}
              {line.join}
            </span>
          ))
        : text}
    </p>
  );
}
