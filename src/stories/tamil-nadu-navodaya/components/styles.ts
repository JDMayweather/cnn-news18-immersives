import { theme } from "../theme";

const { colors: c, fonts: f, type: t, shadow: sh, radius: r, motion } = theme;

/**
 * Second half of the story stylesheet (chapter chrome, figures, hero, foot).
 * Injected once next to globalCss. No component emits its own <style> tag.
 */
export const componentCss = `
.nv-wrap { padding-inline: var(--nv-gutter); }
section.nv-chapter { max-width: none; padding-block: ${theme.space.sectionY}; padding-inline: 0; }
/* The shared sheet gives every svg a 1rem vertical margin. */
.il-svg, .bc, .merit, .geo, .ld-svg { margin: 0; }

/* The whole read is one dark broadsheet ground (set on .nv). Chapters are
   transparent so the ink shows through; the alternating light grounds of the
   other read are gone. A dark chapter deepens a touch to mark the pivot. */
.nv-chapter { background: transparent; }
.nv-chapter.nv-chapter--dark { background: linear-gradient(180deg, rgba(10, 15, 26, 0), #0a0f1a 12%, #0a0f1a 88%, rgba(10, 15, 26, 0)); }
.nv-chapter.nv-chapter--dark::before { opacity: 0.16; }

/* ---------- soft reveals ---------- */
.nv-rise { opacity: 0; transform: translateY(16px); }
.nv-rise.is-in { opacity: 1; transform: none; transition: opacity 1s ${motion.soft}, transform 1.1s ${motion.ease}; }
.nv-rise.is-in .nv-shot { animation: nv-settle 1.4s ${motion.ease} both; }
@keyframes nv-settle { from { transform: scale(1.035); } to { transform: scale(1); } }

/* ---------- prose, set line by line (Pretext) ----------
   Each measured line is its own block, so the paragraph arrives line by line
   and the word space is set per line rather than by the browser's justify. */
.nv-prose > p[data-lines] { text-align: left; }
.nv-prose > p.nv-solo[data-lines] { text-align: center; }
.nv-line {
  display: block;
  opacity: 0;
  transform: translateY(0.42em);
  transition: opacity 0.7s ${motion.soft}, transform 0.8s ${motion.ease};
  transition-delay: calc(var(--i, 0) * 55ms);
}
.nv-prose > p[data-shown] .nv-line { opacity: 1; transform: none; }

/* ---------- prose rhythm ----------
   Every block runs the full wrap width: the page reads as one column with the
   gutter as its only margin. Nothing is capped to a narrow measure. */
.nv-prose { position: relative; }
.nv-prose > h3,
.nv-prose > .nv-callout,
.nv-prose > .nv-note,
.nv-prose > .nv-fig { width: 100%; max-width: none; margin-block: clamp(1.8rem, 4.4vh, 2.9rem); }
/* Body copy stays auto-width: a 100%-wide block cannot sit beside a float and
   drops below it instead of wrapping. */
.nv-prose > p { max-width: none; margin-block: clamp(1.8rem, 4.4vh, 2.9rem); }
/* Quotes are uncapped too, but the bleed and screen variants keep their own
   full-viewport width — this rule must not flatten them into the column. */
.nv-prose > blockquote.nv-quote { max-width: none; }
.nv-prose > blockquote.nv-quote--bleed {
  margin-inline: calc(50% - 50vw);
  padding-inline: var(--nv-gutter);
}
/* The band runs the viewport; its text used to be capped at 30ch and ranged
   left, so the words sat in the left corner of an empty band. It now fills the
   band the way the prose fills the column, and the measure is held by the
   display size rather than by a box. */
.nv-prose > blockquote.nv-quote--bleed > p { max-width: none; width: 100%; text-wrap: pretty; }
.nv-prose > blockquote.nv-quote--bleed > footer { max-width: none; }

/* ---------- figure furniture ---------- */
.nv-shot-fig { margin-inline: 0; }
.nv-shot { border-radius: var(--nv-r); }
.planner { width: 100%; height: 980px; border: 1px solid ${c.line}; border-radius: var(--nv-r); display: block; background: #fff; box-shadow: ${sh.panel}; }
@media (max-width: 620px) { .planner { height: 1180px; } }

/* ---------- interlude panel: a dark exhibit on the broadsheet ---------- */
.il {
  position: relative;
  margin: clamp(2.6rem, 7vh, 4.5rem) 0;
  background: #0d1424;
  border: 1px solid ${c.onDarkLine};
  border-left: 4px solid ${c.clay};
  border-radius: 0;
  overflow: hidden;
}
.il-svg { display: block; width: 100%; aspect-ratio: 1440 / 340; }
.il-cap { display: grid; gap: 0.4rem; padding: 1.15rem clamp(1.2rem, 2.6vw, 1.9rem) 1.35rem; background: transparent; }
.il-label { font-family: ${f.display}; font-weight: 700; font-size: 1.15rem; letter-spacing: -0.01em; text-transform: uppercase; color: ${c.onDark}; margin: 0; }
.il-sub { font-family: ${f.sans}; font-size: 0.84rem; line-height: 1.6; color: ${c.onDarkFaint}; margin: 0; }
.il-key { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.3rem 1.6rem; }
.il-key li { position: relative; padding-left: 1.15rem; font-family: ${f.sans}; font-size: 0.85rem; line-height: 1.6; color: ${c.onDarkDim}; }
.il-key li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 0.6rem; height: 2px; border-radius: 2px; background: ${c.clay}; }
.il-num { font-family: ${f.display}; font-weight: 600; font-size: 26px; letter-spacing: -0.02em; fill: ${c.onDark}; }
.il-num--big { font-weight: 800; font-size: 62px; fill: ${c.clay}; }
.il-notes { list-style: none; margin: 0.15rem 0 0; padding: 0; display: grid; gap: 0.4rem; }
.il-notes li { position: relative; padding-left: 1.05rem; font-family: ${f.sans}; font-size: 0.84rem; line-height: 1.62; color: ${c.onDarkFaint}; }
.il-notes li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 0.5rem; height: 1px; background: ${c.clay}; }

.il:has(.il-olays) > .il-bars { padding-top: clamp(5.2rem, 10vw, 6rem); }
.il-bars { list-style: none; margin: 0; padding: clamp(1.1rem, 2.6vw, 1.7rem) clamp(1.2rem, 2.6vw, 1.9rem) 0.4rem; display: grid; gap: 0.85rem; background: transparent; }
.il-bar { display: grid; grid-template-columns: minmax(0, 1fr) minmax(6rem, 14rem) minmax(4.5rem, auto); align-items: center; gap: 1rem; }
.il-bar-label { font-family: ${f.sans}; font-size: 0.94rem; line-height: 1.5; color: ${c.onDarkDim}; }
.il-bar-track { position: relative; height: 0.85rem; border-radius: 0; background: ${c.onDarkLine}; overflow: hidden; }
.il-bar-fill { position: absolute; inset: 0 auto 0 0; border-radius: 0; background: ${c.clay}; }
.il-bar-value { font-family: ${f.display}; font-weight: 800; font-size: 1.3rem; letter-spacing: -0.01em; color: ${c.onDark}; text-align: right; font-variant-numeric: tabular-nums; }
@media (max-width: 720px) {
  .il-bar { grid-template-columns: 1fr; gap: 0.3rem; }
  .il-bar-value { text-align: left; }
  .il-bar-track { order: 3; }
}

/* ---------- witness rail ---------- */
.rail { overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 0.6rem; }
.rail:focus-visible { outline: 2px solid ${c.green}; outline-offset: 4px; }
.rail-track { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(15rem, 19rem); gap: 0.9rem; width: max-content; padding: 0.2rem; }
.slip { scroll-snap-align: start; padding: 1.4rem 1.5rem 1.6rem; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--nv-r); box-shadow: ${sh.panel}; display: grid; align-content: start; gap: 0.5rem; }
.slip-n { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.14em; color: ${c.green}; }
.slip-name { font-family: ${f.serif}; font-weight: 500; font-size: 1.65rem; letter-spacing: -0.02em; color: ${c.greenInk}; margin: 0; }
.slip-work { font-family: ${f.sans}; font-size: 0.8rem; line-height: 1.6; color: ${c.textDim}; margin: 0; }
.slip-rule { width: 40px; height: 2px; display: block; }
.slip-note { font-size: 1rem; line-height: 1.62; color: ${c.textBody}; margin: 0; }

/* ---------- names ---------- */
.names { margin: 0; }
.name-row { display: grid; grid-template-columns: minmax(0, 12rem) minmax(0, 1fr); gap: 0.35rem 1.4rem; padding: 1.05rem 1.2rem; border-radius: var(--nv-r-sm); }
.name-row:nth-child(odd) { background: ${c.moss}; }
.name-k { font-family: ${f.serif}; font-weight: 500; font-size: 1.12rem; letter-spacing: -0.01em; color: ${c.greenInk}; }
.name-v { margin: 0; font-size: 1rem; line-height: 1.62; color: ${c.textBody}; }
@media (max-width: 620px) { .name-row { grid-template-columns: 1fr; } }
/* The article's own sentence, one clause per row: no second column, so nothing
   has to be summarised to fit one. */
.name-row--one { grid-template-columns: 2rem minmax(0, 1fr); align-items: baseline; }
.name-v--solo { font-family: ${f.serif}; font-size: clamp(1.25rem, 3.2vw, 1.9rem); line-height: 1.25; letter-spacing: -0.01em; color: ${c.ink}; }
.name-n { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.12em; color: ${c.green}; }

/* ---------- cost ledger ---------- */
.ledger { background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--nv-r); padding: clamp(1.3rem, 3vw, 2rem); box-shadow: ${sh.panel}; }
.led-row { display: grid; grid-template-columns: minmax(0, 9.5rem) minmax(0, 1fr) 6.5rem; align-items: center; gap: 1rem; padding: 0.7rem 0; }
.led-k { font-family: ${f.serif}; font-weight: 500; font-size: 1rem; margin: 0; color: ${c.greenInk}; }
.led-bar { height: 12px; background: ${c.moss}; border-radius: ${r.pill}; overflow: hidden; }
.led-bar > i { display: block; height: 100%; border-radius: ${r.pill}; background: linear-gradient(90deg, ${c.leafMid}, ${c.green}); }
.led-v { font-family: ${f.sans}; font-size: 0.92rem; font-weight: 500; text-align: right; margin: 0; color: ${c.textDim}; }
.led-total { display: grid; gap: 0.3rem; margin-top: 1.1rem; padding-top: 1.4rem; border-top: 1px solid ${c.line}; }
.led-total .led-v--big { font-family: ${f.serif}; font-weight: 400; font-size: ${t.numeral}; line-height: 1; letter-spacing: -0.03em; color: ${c.green}; margin: 0; text-align: left; }
.led-note { font-family: ${f.sans}; font-size: 0.82rem; line-height: 1.65; color: ${c.textFaint}; margin: 0; }
@media (max-width: 620px) { .led-row { grid-template-columns: minmax(0, 1fr) 5.5rem; } .led-row .led-bar { grid-column: 1 / -1; order: 3; } }

/* ---------- support ladder ---------- */
.ladder { display: grid; gap: 0.75rem; }
.ld-step { display: grid; grid-template-columns: minmax(0, var(--w)) minmax(0, 1fr); gap: 1.4rem; align-items: center; }
.ld-rail { position: relative; }
.ld-svg { display: block; width: 100%; height: 4px; }
.ld-pip { display: none; }
.ld-k { font-family: ${f.serif}; font-weight: 500; font-size: 1.12rem; letter-spacing: -0.01em; margin: 0 0 0.2rem; color: ${c.greenInk}; }
.ld-v { font-size: 1rem; line-height: 1.66; color: ${c.textBody}; margin: 0; }
@media (max-width: 700px) { .ld-step { grid-template-columns: 1fr; gap: 0.4rem; } .ld-rail { display: none; } }

/* ---------- price waterfall ---------- */
.wf { background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--nv-r); padding: clamp(1.3rem, 3vw, 2rem); box-shadow: ${sh.panel}; }
.wf-row { display: grid; grid-template-columns: minmax(0, 11rem) minmax(0, 1fr) 6rem; gap: 0.3rem 1rem; align-items: center; padding: 0.6rem 0 0.15rem; }
.wf-k { font-family: ${f.serif}; font-weight: 500; font-size: 1rem; margin: 0; color: ${c.greenInk}; }
.wf-track { height: 18px; background: ${c.moss}; border-radius: ${r.pill}; overflow: hidden; }
.wf-fill { display: block; height: 100%; border-radius: ${r.pill}; background: ${c.leafMid}; }
.wf-fill--accent { background: linear-gradient(90deg, ${c.leaf}, ${c.green}); }
.wf-v { font-family: ${f.sans}; font-size: 0.92rem; font-weight: 500; text-align: right; margin: 0; color: ${c.textDim}; }
.wf-note { grid-column: 2 / 4; font-family: ${f.sans}; font-size: 0.78rem; line-height: 1.5; color: ${c.textFaint}; margin: 0; }
.wf-jump { position: relative; margin: 1.2rem 0 0.6rem; padding-left: 11rem; }
.wf-jump-line { position: absolute; left: 0; top: 0.6rem; width: 10rem; height: 1px; background: ${c.leaf}; }
.wf-jump-v { font-family: ${f.sans}; font-size: 0.84rem; font-weight: 500; color: ${c.green}; margin: 0; }
.wf-row--pay { border-top: 1px solid ${c.line}; padding-top: 0.9rem; }
@media (max-width: 700px) {
  .wf-row { grid-template-columns: minmax(0, 1fr) 5rem; }
  .wf-row .wf-track { grid-column: 1 / -1; order: 3; }
  .wf-note { grid-column: 1 / -1; }
  .wf-jump { padding-left: 0; }
  .wf-jump-line { display: none; }
}

/* ---------- willow line chart ---------- */
.bc { width: 100%; height: auto; display: block; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--nv-r); padding: clamp(0.9rem, 2vw, 1.6rem); box-shadow: ${sh.panel}; box-sizing: border-box; }
.bc-axis { font-family: ${f.sans}; font-size: 11px; font-weight: 500; fill: ${c.textFaint}; }
.bc-legend { display: flex; flex-wrap: wrap; gap: 0.4rem 1.6rem; margin-top: 0.9rem; }
.bc-key { font-family: ${f.sans}; font-size: 0.82rem; color: ${c.textDim}; }
.bc-key--en::before { content: ""; display: inline-block; width: 16px; height: 3px; border-radius: 2px; background: ${c.green}; margin-right: 0.55rem; vertical-align: middle; }
.bc-key--kw::before { content: ""; display: inline-block; width: 16px; height: 3px; border-radius: 2px; background: ${c.leafMid}; margin-right: 0.55rem; vertical-align: middle; }

/* ---------- exclusion tiles ---------- */
.band { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.9rem; }
.band-cell { padding: 1.4rem 1.4rem 1.6rem; border-radius: var(--nv-r); background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
.band-cell:nth-child(2n) { background: ${c.moss}; box-shadow: none; }
.band-value { font-family: ${f.serif}; font-weight: 400; font-size: clamp(2rem, 3.4vw, 3.1rem); letter-spacing: -0.03em; line-height: 0.98; margin: 0 0 0.85rem; color: ${c.green}; }
.band-meter { height: 8px; background: ${c.mossDeep}; border-radius: ${r.pill}; margin-bottom: 1rem; overflow: hidden; }
.band-meter > span { display: block; height: 100%; border-radius: ${r.pill}; }
.band-label { font-family: ${f.sans}; font-size: 0.94rem; font-weight: 600; letter-spacing: 0.06em; color: ${c.greenInk}; margin: 0 0 0.55rem; }
.band-context { font-size: 1rem; line-height: 1.62; color: ${c.textBody}; margin: 0; }
@media (max-width: 900px) { .band { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .band { grid-template-columns: 1fr; } }

/* ---------- talent gates ---------- */
.facts { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.7rem; }
.fact-row { display: grid; grid-template-columns: 2.6rem minmax(0, 13rem) minmax(0, 1fr); gap: 0.4rem 1rem; align-items: baseline; padding: 1.15rem 1.3rem; border-radius: var(--nv-r); background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
.fact-row:nth-child(even) { background: ${c.moss}; box-shadow: none; }
.fact-n { font-family: ${f.sans}; font-size: 0.92rem; font-weight: 600; letter-spacing: 0.1em; color: ${c.leaf}; }
.fact-k { font-family: ${f.serif}; font-weight: 500; font-size: 1.12rem; letter-spacing: -0.01em; margin: 0; color: ${c.greenInk}; }
.fact-v { font-size: 1rem; line-height: 1.66; color: ${c.textBody}; margin: 0; }
@media (max-width: 700px) { .fact-row { grid-template-columns: 1.8rem minmax(0, 1fr); } .fact-v { grid-column: 2; } }

/* ---------- geography ---------- */
.geo { width: 100%; height: auto; display: block; }
/* The country map reads as one panel: capped, centred, drawn on scroll. */
.geo--map { width: 100%; margin: 0; }
/* List left, map docked right. One column under 640px. */
.geo-split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 17rem); gap: 1.4rem; align-items: start; }
.geo-split .geo-list { margin-top: 0; }
@media (max-width: 640px) { .geo-split { grid-template-columns: 1fr; } }
.geo-list { list-style: none; margin: 1.2rem 0 0; padding: 0; display: grid; gap: 0.4rem; }
.geo-list li { display: grid; grid-template-columns: minmax(0, 9rem) minmax(0, 1fr); gap: 0.3rem 1.2rem; padding: 0.7rem 1rem; border-radius: var(--nv-r-sm); }
.geo-list li:nth-child(odd) { background: ${c.moss}; }
.geo-k { font-family: ${f.serif}; font-weight: 500; font-size: 1.06rem; color: ${c.greenInk}; }
.geo-v { font-size: 1rem; line-height: 1.62; color: ${c.textBody}; }
@media (max-width: 620px) { .geo-list li { grid-template-columns: 1fr; } }

/* ---------- merit ---------- */
.merit { width: 100%; height: auto; display: block; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--nv-r); padding: clamp(0.9rem, 2vw, 1.6rem); box-shadow: ${sh.panel}; box-sizing: border-box; }
.mt-step { font-family: ${f.sans}; font-size: 11px; font-weight: 500; fill: ${c.textFaint}; }
.mt-step--a { fill: ${c.green}; }
.mt-step--b { fill: ${c.clay}; }
.merit-pairs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.8rem; margin: 1.4rem 0 0; }
.merit-pairs > div { padding: 1.1rem 1.2rem; border-radius: var(--nv-r); background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
.merit-pairs > div:nth-child(2) { background: ${c.claySoft}; box-shadow: none; }
.merit-pairs dt { font-family: ${f.sans}; font-size: 0.92rem; font-weight: 600; letter-spacing: 0.08em; color: ${c.green}; margin-bottom: 0.5rem; }
.merit-pairs dd { margin: 0; font-size: 1rem; line-height: 1.64; color: ${c.textBody}; }
@media (max-width: 820px) { .merit-pairs { grid-template-columns: 1fr; } }

/* ---------- hero ---------- */
/* The whole hero is the video: it fills the section edge to edge, the scrim
   sits on top of it, and every text element is a light-on-dark token. */
.hero {
  position: relative;
  min-height: 100svh;
  height: 100svh;
  max-height: 100svh;
  display: flex;
  align-items: center;
  padding: clamp(4rem, 9vh, 6rem) 0 clamp(3rem, 7vh, 4.5rem);
  overflow: hidden;
  background: #0b1120;
  border-bottom: 1px solid ${c.onDarkLine};
  box-sizing: border-box;
}
.hero-video { position: absolute; inset: 0; width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 42%; z-index: 0; animation: nvKenBurns 30s ease-in-out infinite alternate; }
/* A slow push-in on the six: the frame breathes instead of sitting still. */
@keyframes nvKenBurns { from { transform: scale(1); } to { transform: scale(1.09); } }
/* Darkening overlay. The type reads against this, not against the frame, so
   contrast is constant across the whole shot. */
.hero-scrim {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(120% 90% at 82% 12%, rgba(184, 70, 31, 0.16) 0%, rgba(184, 70, 31, 0) 55%),
    linear-gradient(180deg, rgba(10, 15, 26, 0.82) 0%, rgba(10, 15, 26, 0.4) 34%, rgba(10, 15, 26, 0.66) 72%, rgba(10, 15, 26, 0.92) 100%),
    radial-gradient(125% 85% at 16% 58%, rgba(10, 15, 26, 0.62) 0%, rgba(10, 15, 26, 0.18) 60%, rgba(10, 15, 26, 0) 100%);
}
.hero-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: clamp(2rem, 5vw, 4.5rem); align-items: end; width: 100%; position: relative; z-index: 2; }
.hero-eyebrow { display: flex; align-items: center; gap: 1rem; margin: 0 0 1.5rem; flex-wrap: wrap; }
.hero-eyebrow span { font-family: ${f.sans}; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: ${c.onDarkAccent}; }
.hero-eyebrow span:first-child { background: ${c.clay}; color: ${c.onDark}; padding: 0.3rem 0.7rem; }
.nv-hero-title { font-family: ${f.display}; font-weight: 800; font-size: ${t.heroTitle}; line-height: 0.9; letter-spacing: -0.03em; margin: 0; color: ${c.onDark}; text-transform: uppercase; text-shadow: 0 2px 26px rgba(8, 12, 24, 0.55); }
.h-mask { display: block; overflow: hidden; padding-bottom: 0.14em; margin-bottom: -0.08em; }
.h-line { display: block; }
.h-line--accent { font-style: normal; color: ${c.clay}; }
.hero-deck { font-family: ${f.display}; font-weight: 500; font-size: clamp(1.15rem, 1.9vw, 1.6rem); line-height: 1.32; color: ${c.onDarkDim}; margin: 1.7rem 0 0; max-width: 34ch; text-shadow: 0 1px 14px rgba(8, 12, 24, 0.5); }
.hero-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 0.9rem 1.6rem; margin-top: clamp(1.8rem, 5vh, 3rem); }
.hero-go { font-family: ${f.sans}; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${c.onDark}; background: ${c.clay}; padding: 0.95rem 1.6rem; border-radius: 0; text-decoration: none; transition: transform 0.2s ${motion.ease}, background 0.2s ${motion.ease}; }
.hero-go:hover { background: ${c.onDarkAccent}; color: ${c.ink}; }
.hero-go:active { transform: translateY(1px); }
.hero-go:focus-visible { outline: 2px solid ${c.onDark}; outline-offset: 3px; }
.hero-meta { font-family: ${f.sans}; font-size: 0.82rem; line-height: 1.7; color: ${c.onDarkFaint}; margin: 0; }
.hero-byline { display: block; font-size: 1.1rem; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; color: ${c.onDark}; margin-bottom: 0.15rem; }
.hero-fig { margin: 0; display: flex; flex-direction: column; align-items: stretch; }
/* Rejected stamp: sits above the card, overlapping its top-right corner. */
.nv-seal { width: clamp(116px, 12vw, 164px); height: auto; display: block; margin: 0 0 -1.4rem auto; transform: rotate(-8deg); position: relative; z-index: 3; filter: drop-shadow(0 6px 14px rgba(8,12,24,0.5)); }
.nv-seal-top { font-family: ${f.sans}; font-weight: 600; font-size: 15px; letter-spacing: 3px; fill: #d33a2c; }
.nv-seal-main { font-family: ${f.display}; font-weight: 800; font-size: 30px; letter-spacing: 1px; fill: #d33a2c; }
.nv-seal-sub { font-family: ${f.sans}; font-weight: 500; font-size: 12px; letter-spacing: 2px; fill: #d33a2c; }
/* The crux, as a two-against-three. */
.nv-vs { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.9rem; margin: 0.5rem 0 1.1rem; }
.nv-vs-side { display: grid; gap: 0.12rem; }
.nv-vs-side--accent { text-align: right; }
.nv-vs-num { font-family: ${f.display}; font-weight: 800; font-size: clamp(2.6rem, 5vw, 3.8rem); line-height: 1; color: ${c.onDark}; }
.nv-vs-side--accent .nv-vs-num { color: ${c.clay}; }
.nv-vs-who { font-family: ${f.sans}; font-size: 0.76rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.onDarkAccent}; }
.nv-vs-langs { font-family: ${f.display}; font-weight: 500; font-size: 0.92rem; color: ${c.onDarkDim}; }
.nv-vs-div { font-family: ${f.sans}; font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.onDarkFaint}; }
/* A hard-edged exhibit card, filed against the seam — not a soft glass panel. */
.hero-fig-card { color: ${c.onDarkDim}; background: rgba(10, 15, 26, 0.72); border: 1px solid ${c.onDarkLine}; border-left: 4px solid ${c.clay}; border-radius: 0; padding: 1.4rem 1.5rem 1.6rem; box-shadow: 0 20px 50px rgba(8, 12, 24, 0.5); backdrop-filter: blur(10px); }
.hero-fig-cap { font-family: ${f.sans}; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${c.onDarkAccent}; margin: 0 0 0.9rem; }
.hero-fig-big { font-family: ${f.display}; font-weight: 800; font-size: clamp(3.4rem, 6vw, 5.5rem); line-height: 0.9; letter-spacing: -0.03em; color: ${c.onDark}; margin: 0 0 1rem; font-variant-numeric: tabular-nums; }
.hero-fig-big span { font-family: ${f.sans}; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${c.onDarkFaint}; margin-left: 0.5rem; }
.hero-dots { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; margin-bottom: 1.1rem; }
.hero-dot { aspect-ratio: 1; border-radius: 0; background: ${c.onDarkLine}; }
.hero-dot--on { background: ${c.clay}; box-shadow: 0 0 18px rgba(224, 161, 95, 0.55); }
.hero-fig-note { font-family: ${f.serif}; font-weight: 400; font-size: 1rem; line-height: 1.6; color: ${c.onDarkDim}; margin: 0; }
.hero-fig-note b { font-weight: 700; color: ${c.onDark}; }
/* The dossier: the case as a filed record — label / value rows, the last one
   flagged in ochre as the standing that makes it a story. */
.nv-dossier { margin: 0; display: grid; gap: 0; }
.nv-dossier-row { display: grid; grid-template-columns: minmax(5.5rem, 7rem) minmax(0, 1fr); gap: 0.4rem 1rem; align-items: baseline; padding: 0.7rem 0; border-top: 1px solid ${c.onDarkLine}; }
.nv-dossier-row:first-child { border-top: 0; }
.nv-dossier dt { font-family: ${f.sans}; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${c.onDarkFaint}; }
.nv-dossier dd { margin: 0; font-family: ${f.display}; font-weight: 500; font-size: 1.02rem; line-height: 1.25; color: ${c.onDark}; }
.nv-dossier-row--flag dd { font-weight: 700; }
.nv-dossier-row--flag dd b { color: ${c.clay}; }

/* Section kicker used in the closing. */
.nv-kicker { font-family: ${f.sans}; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${c.onDarkAccent}; margin: 0 0 1rem; }
@media (max-width: 860px) {
  .hero { height: auto; min-height: 100svh; max-height: none; padding: clamp(4rem, 10vh, 6rem) 0 clamp(2.5rem, 6vh, 4rem); }
  .hero-grid { grid-template-columns: 1fr; align-items: start; gap: 2.2rem; }
  .hero-deck { max-width: none; }
  .hero-fig { display: none; }
  .hero-dots { gap: 4px; }
  .hero-video { object-position: center 38%; }
}
@media (max-width: 860px) and (orientation: portrait) { .hero-video { object-position: center 34%; } }
/* No video (blocked, unsupported, reduced data): the scrim still holds the
   type at full contrast on the flat dark ground. */
@media (prefers-reduced-motion: reduce) { .hero-video { opacity: 0.9; } }

/* ---------- closing ---------- */
.closing { padding-block: clamp(3rem, 8vh, 5rem) clamp(2rem, 5vh, 3rem); background: #0d1424; border-top: 1px solid ${c.onDarkLine}; }
.closing-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(1.5rem, 4vw, 4rem); }
.closing-body { font-size: 1.04rem; line-height: 1.78; color: ${c.onDarkDim}; margin: 0; text-align: left; }
.closing-sources { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.closing-sources li { padding: 0.7rem 0 0.7rem 1rem; border-left: 2px solid ${c.onDarkLine}; font-size: 1rem; color: ${c.onDarkDim}; }
.closing-sources a { color: ${c.onDark}; text-decoration: none; border-bottom: 1px solid ${c.clay}; }
.closing-sources a:hover { color: ${c.onDarkAccent}; }
.closing-sources a:focus-visible { outline: 2px solid ${c.onDarkAccent}; outline-offset: 2px; }
.closing-fine { font-family: ${f.sans}; font-size: 0.78rem; line-height: 1.7; color: ${c.onDarkFaint}; margin: 1.2rem 0 0; }
/* The sign-off sits directly under the sources on the same ground — a filed
   footer line, not a separate coloured band sandwiched in. */
.closing-sign { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 0.5rem 2rem; margin-top: clamp(2.5rem, 6vh, 4rem); padding-top: 1.6rem; border-top: 1px solid ${c.onDarkLine}; }
.closing-sign p { font-family: ${f.sans}; font-size: 0.86rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: ${c.onDarkFaint}; margin: 0; }
.closing-sign .closing-byline { font-family: ${f.display}; font-size: 1.2rem; font-weight: 700; letter-spacing: 0.01em; text-transform: uppercase; color: ${c.onDark}; }
@media (max-width: 860px) { .closing-grid { grid-template-columns: 1fr; } }

/* Every reading column sits above the section ground, so nothing overlaps. */
.nv-wrap { position: relative; z-index: 2; }

/* ---------- chapter opener: an arrival, not a heading ---------- */
/* Openers are a beat, not a screen. They used to hold ~85svh of centred box,
   which put a viewport of empty space between one section and the next title.
   Now the box hugs its content, so the arrival is the numeral and the rule. */
.nv-open { position: relative; display: grid; gap: 0; min-height: auto; padding-block: clamp(1.4rem, 4vh, 3rem) clamp(0.6rem, 1.6vh, 1rem); align-content: start; margin-bottom: clamp(0.4rem, 1.4vh, 0.9rem); }
/* The case-marker: a numeral in a ruled box, a mono file tag, and a rule that
   runs to the edge — a docket line, not a display numeral. */
.nv-docket { display: flex; align-items: center; gap: 1rem; margin-bottom: clamp(1rem, 2.6vh, 1.6rem); }
.nv-docket-num { font-family: ${f.sans}; font-weight: 600; font-size: 1.05rem; letter-spacing: 0.02em; color: ${c.paper}; background: ${c.clay}; padding: 0.28rem 0.6rem; border-radius: var(--nv-r-sm); font-variant-numeric: tabular-nums; }
.nv-docket-tag { font-family: ${f.sans}; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.22em; color: ${c.textFaint}; white-space: nowrap; }
.nv-docket-rule { flex: 1; height: 0; border-top: 1px solid ${c.line}; }
.nv-open-copy { width: 100%; }
/* Untitled opening section: the docket alone, no heading row. */
.nv-open--bare { padding-block: clamp(1.2rem, 3.5vh, 2.4rem) clamp(0.6rem, 1.6vh, 1rem); }

/* ---------- pinned scene ---------- */
.nv-prose > .nv-fig.nv-scene-wrap { width: 100%; }
.nv-scene { position: relative; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(1.6rem, 4vw, 3.6rem); align-items: start; }
.nv-scene-stage { position: sticky; top: clamp(3.5rem, 9vh, 6rem); align-self: start; display: grid; gap: 0.9rem; }
.nv-scene-visual { display: grid; place-items: center; min-height: min(64svh, 34rem); }
.nv-scene-count { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.16em; color: ${c.textFaint}; margin: 0; text-align: center; font-variant-numeric: tabular-nums; }
.nv-scene-steps { list-style: none; margin: 0; padding: 0; display: grid; }
.nv-step { position: relative; min-height: 56svh; display: grid; align-content: center; gap: 0.5rem; padding-left: 1.9rem; opacity: 0.32; transition: opacity 0.55s ${motion.soft}; }
.nv-step.is-past { opacity: 0.58; }
.nv-step.is-on { opacity: 1; }
.nv-step-rail { position: absolute; left: 0; top: 12%; bottom: 12%; width: 1px; background: ${c.onDarkLine}; }
.nv-step-rail > i { position: absolute; left: -4px; top: 50%; width: 9px; height: 9px; border-radius: 0; background: ${c.onDarkFaint}; transform: translateY(-50%); transition: background 0.45s ${motion.soft}, box-shadow 0.45s ${motion.soft}; }
.nv-step.is-on .nv-step-rail > i { background: ${c.clay}; box-shadow: 0 0 0 5px rgba(184, 70, 31, 0.2); }
.nv-step-k { font-family: ${f.sans}; font-size: 0.94rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.onDarkFaint}; transition: color 0.45s ${motion.soft}; }
.nv-step.is-on .nv-step-k { color: ${c.clay}; }
.nv-step-v { font-family: ${f.display}; font-weight: 500; font-size: clamp(1.2rem, 2vw, 1.7rem); line-height: 1.35; color: ${c.onDarkFaint}; margin: 0; max-width: 34ch; transition: color 0.45s ${motion.soft}; }
.nv-step.is-on .nv-step-v { color: ${c.onDark}; }
.nv-step.is-past .nv-step-v { color: ${c.onDarkDim}; }

/* ---------- kit assembly ---------- */
.kit { display: grid; gap: 0.9rem; width: 100%; }
.kit-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.6rem; }
/* Three icon cells crush their labels on a phone; drop to two under 460px. */
@media (max-width: 460px) { .kit-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.kit-cell { position: relative; display: grid; justify-items: center; gap: 0.25rem; padding: 0.85rem 0.5rem 0.8rem; border-radius: 16px; background: rgba(251, 252, 244, 0.5); opacity: 0.5; transition: opacity 0.6s ${motion.soft}, background 0.6s ${motion.soft}, transform 0.6s ${motion.ease}; }
.kit-cell.is-on { opacity: 1; background: ${c.paperPanel}; box-shadow: ${sh.panel}; transform: translateY(-2px); }
.kit-cell.is-intangible { border: 1px dashed ${c.leafMid}; }
.kit-icon { width: clamp(38px, 4.2vw, 58px); height: auto; display: block; margin: 0; }
.kit-name { font-family: ${f.sans}; font-size: 0.86rem; font-weight: 600; letter-spacing: 0.03em; color: ${c.greenInk}; text-align: center; line-height: 1.25; }
.kit-price { font-family: ${f.sans}; font-size: 0.74rem; font-weight: 600; color: ${c.textFaint}; font-variant-numeric: tabular-nums; }
.kit-cell.is-on .kit-price { color: ${c.green}; }
.kit-again { position: absolute; top: -7px; left: 50%; transform: translateX(-50%); font-family: ${f.sans}; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em; color: ${c.paper}; background: ${c.green}; padding: 0.16rem 0.42rem; border-radius: ${r.pill}; white-space: nowrap; animation: nvPop 0.5s ${motion.ease} both; }
@keyframes nvPop { from { opacity: 0; transform: translateX(-50%) scale(0.75); } }
.kit-total { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: 0.85rem 1.1rem; border-radius: 16px; background: rgba(251, 252, 244, 0.75); }
.kit-total-k { font-family: ${f.sans}; font-size: 0.94rem; font-weight: 600; letter-spacing: 0.12em; color: ${c.green}; }
.kit-total-v { font-family: ${f.serif}; font-weight: 400; font-size: clamp(1.5rem, 2.8vw, 2.2rem); letter-spacing: -0.03em; color: ${c.greenInk}; font-variant-numeric: tabular-nums; }

/* ---------- two hundred children ---------- */
.twohundred { display: grid; gap: 0.9rem; width: 100%; }
.twohundred-svg { display: block; width: 100%; height: auto; margin: 0; border-radius: 24px; box-shadow: ${sh.panel}; }
/* The exclusion dial: capped so the ring never balloons on a wide column, and
   the arc sweeps to each step's share as the reader scrolls between them. */
.twohundred-dial { max-width: 30rem; margin-inline: auto; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; padding: 0.6rem; box-sizing: border-box; }
.th-arc { transition: stroke-dashoffset 0.75s ${motion.ease}; }
.twohundred-read { display: grid; gap: 0.35rem; justify-items: center; text-align: center; }
.twohundred-value { font-family: ${f.serif}; font-weight: 300; font-size: clamp(2.6rem, 6vw, 4.2rem); line-height: 1; letter-spacing: -0.035em; color: ${c.green}; font-variant-numeric: tabular-nums; }
.twohundred-note { font-family: ${f.sans}; font-size: 0.98rem; line-height: 1.6; color: ${c.textDim}; max-width: 34ch; }

/* ---------- divergence ---------- */
.diverge { display: grid; gap: 1rem; width: 100%; }
.diverge-svg { display: block; width: 100%; height: auto; margin: 0; }
.dv-lane { stroke-width: 3; stroke-linecap: round; transition: stroke 0.6s ${motion.soft}; }
.dv-lane--a { stroke: ${c.green}; }
.dv-lane--b { stroke: ${c.clay}; stroke-dasharray: 9 8; }
.dv-origin { fill: ${c.green}; }
.dv-node { fill: ${c.leafMid}; opacity: 0.28; transition: opacity 0.45s ${motion.soft}, fill 0.45s ${motion.soft}; }
.dv-node.is-on { fill: ${c.green}; opacity: 1; }
/* Who each lane belongs to. The steps beside the visual carry the article's
   own sentences; the visual only names its two ends, lighting each when its
   home arrives in the reading. */
.dv-names { display: flex; flex-wrap: wrap; gap: 0.4rem 1.6rem; margin: 0.2rem 0 0; }
.dv-names span { display: inline-flex; align-items: center; gap: 0.55rem; font-family: ${f.sans}; font-size: 0.94rem; font-weight: 600; letter-spacing: 0.04em; color: ${c.greenInk}; opacity: 0.38; transition: opacity 0.45s ${motion.soft}; }
.dv-names span.is-on { opacity: 1; }
.dv-swatch { width: 1.7rem; height: 0; border-top: 3px solid ${c.green}; border-radius: 2px; }
.dv-swatch--b { border-top: 3px dashed ${c.clay}; }
.diverge-lanes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.7rem; }
.dv-card { padding: 1rem 1.1rem 1.15rem; border-radius: var(--nv-r); background: rgba(251, 252, 244, 0.55); opacity: 0.45; transition: opacity 0.6s ${motion.soft}, background 0.6s ${motion.soft}; }
.dv-card.is-on { opacity: 1; background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
.dv-card--b.is-on { background: ${c.claySoft}; box-shadow: none; }
.dv-name { font-family: ${f.serif}; font-weight: 500; font-size: 1.1rem; letter-spacing: -0.012em; color: ${c.greenInk}; margin: 0 0 0.5rem; }
.dv-card ul { margin: 0; padding-left: 1rem; display: grid; gap: 0.35rem; }
.dv-card li { font-family: ${f.sans}; font-size: 0.8rem; line-height: 1.58; color: ${c.textBody}; }

/* ---------- a photograph that takes the screen ---------- */
/* ---------- photographs are shown whole ----------
   No box is filled by cropping: the frame keeps its own aspect ratio at
   whatever width it is given, and the caption sits underneath it. */
/* ---------- full-bleed "place": a photograph you step into ----------
   A near-full-viewport frame, image covering it, an ink scrim, and a mono
   docket caption filed bottom-left. The reader passes through a real place. */
.nv-prose > .nv-panel { width: 100vw; max-width: none; margin-inline: calc(50% - 50vw); }
.nv-panel { position: relative; display: block; margin-block: clamp(2.5rem, 7vh, 4.5rem); background: ${c.ink}; overflow: hidden; min-height: min(78svh, 640px); }
.nv-panel img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.nv-panel::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,15,26,0.35) 0%, rgba(10,15,26,0.1) 35%, rgba(10,15,26,0.72) 100%); pointer-events: none; }
.nv-panel-cap { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; display: grid; gap: 0.5rem; padding: clamp(1.4rem, 4vw, 3rem) var(--nv-gutter); border-left: 4px solid ${c.clay}; }
.nv-panel-line { font-family: ${f.display}; font-weight: 700; font-size: clamp(1.3rem, 3vw, 2.4rem); line-height: 1.14; letter-spacing: -0.02em; color: ${c.onDark}; text-transform: uppercase; max-width: 24ch; }
.nv-panel-credit { font-family: ${f.sans}; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: ${c.onDarkFaint}; }

/* ---------- a pair of photographs, one thought ----------
   Two frames side by side, short-cropped so the pair stays compact instead of
   two full-height panels stacked. Each is tagged (BCCI / IPL) and credited. */
.nv-duo { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(0.8rem, 2vw, 1.4rem); }
.nv-duo-item { margin: 0; display: grid; gap: 0.55rem; }
.nv-duo-img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: var(--nv-r); background: ${c.moss}; box-shadow: ${sh.panel}; }
.nv-duo-cap { display: grid; gap: 0.28rem; }
.nv-duo-tag { font-family: ${f.sans}; font-size: 0.86rem; font-weight: 600; letter-spacing: 0.14em; color: ${c.green}; }
.nv-duo-credit { font-family: ${f.sans}; font-size: 0.9rem; line-height: 1.5; color: ${c.textDim}; }
.nv-chapter.nv-chapter--dark .nv-duo-tag { color: ${c.onDarkAccent}; }
.nv-chapter.nv-chapter--dark .nv-duo-credit { color: ${c.onDarkFaint}; }
@media (max-width: 560px) { .nv-duo { grid-template-columns: 1fr; } .nv-duo-img { aspect-ratio: 16 / 9; } }

/* Portraits float and the copy wraps around them: Prose measures the float
   per line and narrows only the lines beside it, so the run keeps its full
   measure everywhere else. The whole frame is shown, caption underneath. */
.nv-float { width: min(28%, 22rem); margin: 0.3rem 0 1.1rem; }
.nv-float--right { float: right; margin-left: clamp(1.1rem, 2.3vw, 1.9rem); }
.nv-float--left { float: left; margin-right: clamp(1.1rem, 2.3vw, 1.9rem); }
.nv-float img { display: block; width: 100%; height: auto; border-radius: var(--nv-r-sm); background: ${c.moss}; box-shadow: ${sh.panel}; }
.nv-float-cap { display: grid; gap: 0.35rem; margin-top: 0.65rem; }
.nv-float-line { font-family: ${f.serif}; font-weight: 500; font-size: 1rem; line-height: 1.45; color: ${c.greenInk}; }
.nv-float-credit { font-family: ${f.sans}; font-size: 0.9rem; line-height: 1.5; color: ${c.textDim}; }
/* Figures, quotes, callouts and interludes establish their own block context,
   so their backgrounds never slide under a floated portrait: they sit beside
   it while it lasts, full width below it. */
.nv-prose > figure,
.nv-prose > blockquote,
.nv-prose > .nv-fig,
.nv-prose > .nv-callout,
.nv-prose > .nv-note,
.nv-prose > .il { display: flow-root; }
@media (max-width: 760px) {
  .nv-float, .nv-float--left, .nv-float--right { float: none; width: 100%; margin: 1.6rem 0; }
}
/* Nothing should run under a float at the end of a section. */
.nv-prose > :last-child { clear: both; }
/* The last block in a section never carries a trailing margin into the next
   one; the section padding is the whole break. */
.nv-prose > :last-child { margin-bottom: 0; }

/* ---------- a statement that takes the page ----------
   The article's heaviest question. It gets the whole column, the only weight
   500 on the page, and a moss band with a hairline top and bottom so it reads
   as the pivot it is — no narrow measure squeezing it into six short lines. */
/* A statement that takes the page: a full-bleed poster line, heavy grotesque,
   ranged left against the seam — the article's own voice, stated flat. */
.nv-prose > blockquote.nv-quote--screen {
  max-width: none; margin-inline: calc(50% - 50vw); width: 100vw; border: 0;
  padding: clamp(3rem, 9vh, 6rem) var(--nv-gutter);
  display: grid; align-content: center;
  margin-block: clamp(2.5rem, 6vh, 4rem);
  background: linear-gradient(180deg, rgba(10, 15, 26, 0), #0a0f1a 30%, #0a0f1a 70%, rgba(10, 15, 26, 0));
  border-top: 1px solid ${c.onDarkLine}; border-bottom: 1px solid ${c.onDarkLine};
  border-left: 6px solid ${c.clay};
}
.nv-prose > blockquote.nv-quote--screen::before { content: none; }
.nv-prose > blockquote.nv-quote--screen p::after { content: none; }
.nv-prose > blockquote.nv-quote--screen > p {
  max-width: 56rem;
  text-indent: 0;
  font-family: ${f.display};
  font-weight: 700;
  font-size: clamp(1.35rem, 2.6vw, 2.2rem);
  line-height: 1.2;
  letter-spacing: -0.015em;
  text-transform: none;
  color: ${c.onDark};
  margin-inline: 0;
  text-align: left;
  hyphens: none;
}
.nv-prose > blockquote.nv-quote--screen .nv-dline > span { text-align: left; }
.nv-prose > blockquote.nv-quote--screen > footer { max-width: none; margin: 1.4rem 0 0; text-align: left; }
/* Both screens sit on the same ink poster ground; the accent bar and heavy
   type carry them either way. */
.nv-prose > blockquote.nv-quote--screen-dark { background: linear-gradient(180deg, rgba(10, 15, 26, 0) 0, #080c18 20%, #080c18 80%, rgba(10, 15, 26, 0) 100%); border-top: 1px solid ${c.onDarkLine}; border-bottom: 1px solid ${c.onDarkLine}; }
.nv-prose > blockquote.nv-quote--screen-dark > p { color: ${c.onDark}; }


/* The embed is a scrolling viewport, identical to the native page: pinned
   scenes, reveals and scroll animations all run. No embed-only downgrades. */

/* ---------- narrow screens: the stage holds, the steps slide under it ------ */
@media (max-width: 900px) {
  /* On a phone the pinned "visual + steps" split breaks (a two-column card or a
     tall list cannot hold inside a short sticky stage). Un-pin it: the visual
     sits at natural size, the steps read straight down beneath it, all steps
     shown at full strength so nothing depends on a sticky highlight. */
  .nv-scene { grid-template-columns: 1fr; gap: 1rem; }
  .nv-scene-stage { position: static; top: auto; z-index: auto; gap: 0.6rem; padding: 0; background: transparent; border-bottom: 0; }
  .nv-scene-visual { min-height: 0; }
  .nv-scene-count { display: none; }
  .nv-step { min-height: 0; padding: 1.1rem 0 0 1.4rem; opacity: 1; }
  .nv-step-v { max-width: none; color: ${c.onDark}; }
  .nv-step-k { color: ${c.clay}; }
  .nv-step-rail > i { background: ${c.clay}; }
  .diverge-lanes { grid-template-columns: 1fr; }

  .nv-prose > blockquote.nv-quote--screen { padding-block: clamp(1.8rem, 5vh, 2.6rem); }
  .nv-prose > blockquote.nv-quote--screen > p { text-align: left; }
  .nv-prose > blockquote.nv-quote--screen .nv-dline:not(:last-child) > span { text-align: left; text-align-last: left; }
  .nv-open { min-height: auto; padding-block: clamp(1rem, 3.5vh, 1.8rem) clamp(0.5rem, 1.6vh, 0.9rem); }
  .nv-open--bare { min-height: auto; padding-block: 1.4rem 0.9rem; }

  /* The timeline visual is compact, so it can still pin on mobile: its stage
     holds at the top while the steps scroll past. (The language split is a
     tall two-column card and stays un-pinned above.) */
  .nv-scene-wrap--timeline .nv-scene { gap: 0; }
  .nv-scene-wrap--timeline .nv-scene-stage { position: sticky; top: 3.4rem; z-index: 3; padding: 0.7rem 0 0.6rem; background: ${c.ink}; border-bottom: 1px solid ${c.onDarkLine}; }
  .nv-scene-wrap--timeline .nv-scene-count { display: block; text-align: left; color: ${c.onDarkFaint}; }
  .nv-scene-wrap--timeline .nv-step { min-height: 46svh; }
  /* Keep the pinned spine compact so it does not fill the screen. */
  .nv-scene-wrap--timeline .nv-tl { padding-left: 2rem; gap: 0.7rem; }
  .nv-scene-wrap--timeline .nv-tl-year { font-size: clamp(1.3rem, 6vw, 1.7rem); }
  .nv-scene-wrap--timeline .nv-tl-label { font-size: 0.72rem; }
}

/* ---------- display type: Pretext line reveals for titles and screens ---
   DisplayText splits headings into the lines the browser would set, then each
   line slides up out of its own mask with a short stagger. Body copy never
   gets this treatment — only titles and the full-screen quotations. */
.nv-dline { display: block; overflow: hidden; padding-bottom: 0.09em; margin-bottom: -0.09em; }
.nv-dline > span {
  display: block;
  transform: translateY(112%);
  transition: transform 0.9s ${motion.ease};
  transition-delay: calc(var(--i, 0) * 70ms);
  will-change: transform;
}
[data-shown="on"] .nv-dline > span { transform: none; }

/* ---------- chapter rhythm: ghost numeral, drawn rule, alternating openers */
.nv-chapter { position: relative; }
.nv-chapter::before {
  content: attr(data-num);
  position: absolute;
  top: clamp(0.6rem, 3vh, 1.6rem);
  right: var(--nv-gutter);
  font-family: ${f.display};
  font-weight: 300;
  font-size: clamp(5rem, 15vw, 13rem);
  line-height: 1;
  color: ${c.green};
  opacity: 0.09;
  pointer-events: none;
  user-select: none;
}
/* The ghost drifts up and dissolves as its chapter scrolls past. View-linked,
   so no JavaScript runs it; static where timelines are unsupported. */
@supports (animation-timeline: view()) {
  .nv-chapter::before { animation: nvGhost linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  @keyframes nvGhost { from { transform: translateY(34px); opacity: 0.14; } to { transform: translateY(-70px); opacity: 0.03; } }
}
/* One-sentence paragraphs the article leaves standing alone: set big and
   centred, a held breath between sections. */
.nv-prose > p.nv-solo {
  font-family: ${f.display};
  font-weight: 700;
  font-size: clamp(1.6rem, 3.4vw, 2.6rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-align: left;
  text-wrap: balance;
  color: ${c.onDark};
  margin-block: clamp(2rem, 6vh, 3.4rem);
  padding-left: clamp(1.2rem, 2.5vw, 2rem);
  border-left: 4px solid ${c.clay};
  max-width: 58rem;
}
.nv-chapter--alt .nv-open-rule { background: linear-gradient(90deg, ${c.green}, rgba(0, 0, 0, 0)); }
.nv-rule { margin: 0 0 clamp(1.4rem, 3.6vh, 2.2rem); }
.nv-rule > i {
  display: block;
  height: 2px;
  background: linear-gradient(90deg, ${c.leafMid}, rgba(0, 0, 0, 0));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1.2s ${motion.ease};
}
.nv-rule.is-in > i { transform: none; }

/* ---------- interlude overlays: the figure of record, on the picture -----
   HTML badges over the SVG (never SVG text): a numeral too big to miss and
   the noun it counts, counting up on entry. The caption below still carries
   the full sentence, so nothing is claimed twice and nothing new is claimed. */
.il-olays {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  gap: 8px;
  pointer-events: none;
}
.il-olays:has(.il-olay--left) { left: 12px; justify-content: space-between; }
.il-olay {
  margin: 0;
  background: ${c.paperPanel};
  border-radius: var(--nv-r-sm);
  box-shadow: ${sh.panel};
  padding: 0.55rem 0.8rem 0.6rem;
  display: grid;
  gap: 0.1rem;
  min-width: 7.5rem;
}
.il-olay-num {
  font-family: ${f.serif};
  font-weight: 400;
  font-size: clamp(1.6rem, 2.6vw, 2.3rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${c.green};
  font-variant-numeric: tabular-nums;
}
.il-olay-note { font-family: ${f.sans}; font-size: 0.86rem; font-weight: 500; line-height: 1.45; color: ${c.textFaint}; }
/* On a phone the illustration band is only ~80px tall, so a badge floated over
   it covers the drawing. Drop the badges out of the overlay and set them as a
   row at the top of the panel, above the drawing, where nothing overlaps. */
@media (max-width: 620px) {
  .il-olays { position: static; padding: 0.9rem 0.9rem 0.2rem; flex-wrap: wrap; }
  .il-olay { min-width: 0; }
  .il:has(.il-olays) > .il-bars { padding-top: clamp(1.1rem, 2.6vw, 1.7rem); }
}

/* ---------- hero scroll cue ---------- */
.hero-scroll {
  position: absolute;
  left: 50%;
  bottom: 1.1rem;
  transform: translateX(-50%);
  z-index: 2;
  width: 26px;
  height: 42px;
  border: 1.5px solid ${theme.colors.onDarkFaint};
  border-radius: 999px;
  display: block;
}
.hero-scroll > span {
  display: block;
  width: 4px;
  height: 8px;
  border-radius: 999px;
  background: ${theme.colors.onDarkAccent};
  margin: 7px auto 0;
  animation: nvWheel 2.2s ${motion.soft} infinite;
}
@keyframes nvWheel { 0% { transform: translateY(0); opacity: 1; } 60% { transform: translateY(12px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }

/* ---------- grain: paper tooth over everything ---------- */
.nv-grain {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.55;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.11 0 0 0 0 0.18 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ---------- figure polish: depth, motion, number clarity ---------- */
/* Bars read as inset channels rather than flat pills. */
.il-bar-track, .wf-track, .led-bar, .band-meter { box-shadow: inset 0 1px 2px rgba(16, 23, 40, 0.1); }
/* Numerals align and never jitter as they count up. */
.band-value, .twohundred-value, .kit-total-v, .led-v--big, .il-olay-num, .hero-fig-big { font-variant-numeric: tabular-nums; }
/* Cards lift on hover where a real pointer exists; untouched on touch. */
@media (hover: hover) and (pointer: fine) {
  .band-cell, .fact-row, .merit-pairs > div, .slip {
    transition: transform 0.35s ${motion.ease}, box-shadow 0.35s ${motion.ease};
  }
  .band-cell:hover, .fact-row:hover, .merit-pairs > div:hover, .slip:hover {
    transform: translateY(-3px);
    box-shadow: ${sh.lift};
  }
}
/* A hairline between an illustrated panel's drawing and its caption, so the
   reading of the figure sits apart from the figure itself. */
.il-cap { border-top: 1px solid ${c.lineSoft}; }

/* ---------- ambient ground: a slow ink wash + drifting motes ----------
   No dawn→dusk temperature shift (that belonged to the other read). Here a
   fixed radial deepening keeps the broadsheet from reading flat, and faint
   ochre/indigo motes drift for depth. */
.nv-atmo { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.nv-atmo-layer { position: absolute; inset: 0; }
.nv-atmo-dawn { background: radial-gradient(120% 80% at 50% 0%, rgba(38, 48, 77, 0.35), rgba(20, 27, 46, 0) 60%); }
.nv-atmo-dusk { background: radial-gradient(100% 60% at 50% 100%, rgba(184, 70, 31, 0.1), rgba(20, 27, 46, 0) 55%); }

/* ---------- drifting motes: depth behind the column ---------- */
.nv-dust {
  position: absolute; inset: -8%;
  opacity: 0.6;
  background-image:
    radial-gradient(3px 3px at 15% 22%, rgba(224, 161, 95, 0.22), transparent 60%),
    radial-gradient(2px 2px at 68% 34%, rgba(184, 70, 31, 0.2), transparent 60%),
    radial-gradient(2.5px 2.5px at 42% 72%, rgba(129, 138, 166, 0.18), transparent 60%),
    radial-gradient(2px 2px at 84% 66%, rgba(129, 138, 166, 0.16), transparent 60%),
    radial-gradient(2px 2px at 28% 88%, rgba(184, 70, 31, 0.16), transparent 60%),
    radial-gradient(2.5px 2.5px at 92% 14%, rgba(224, 161, 95, 0.18), transparent 60%);
  animation: nv-dust 46s linear infinite alternate;
}
@keyframes nv-dust { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-2.5%, -2%, 0); } }

/* ---------- cursor-reactive screen statements ---------- */
.nv-prose > blockquote.nv-quote--screen > p {
  transform: translate(var(--qx, 0px), var(--qy, 0px)) rotate(var(--qr, 0deg));
  transition: transform 0.4s ${motion.soft};
  will-change: transform;
}

/* ---------- openable details ---------- */
.nv-details { margin-top: 1.2rem; border-top: 1px solid ${c.onDarkLine}; }
.nv-details > summary { cursor: pointer; list-style: none; padding: 0.85rem 0; font-family: ${f.sans}; font-size: 0.88rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: ${c.onDark}; display: flex; align-items: center; gap: 0.6rem; }
.nv-details > summary::-webkit-details-marker { display: none; }
.nv-details > summary::before { content: "+"; font-size: 1.15rem; line-height: 1; color: ${c.clay}; }
.nv-details[open] > summary::before { content: "\\2013"; }
.nv-details > summary:focus-visible { outline: 2px solid ${c.onDarkAccent}; outline-offset: 3px; }
.nv-details > p { margin: 0 0 1rem; }

/* ---------- ambient sound toggle ---------- */
.nv-sound { position: fixed; right: clamp(1rem, 3vw, 2rem); bottom: clamp(1rem, 3vw, 2rem); z-index: 82; width: 46px; height: 46px; display: flex; align-items: flex-end; justify-content: center; gap: 3px; padding-bottom: 14px; background: rgba(13, 21, 10, 0.6); border: 1px solid ${c.onDarkLine}; border-radius: 999px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); cursor: pointer; }
.nv-sound > span { width: 3px; height: 7px; border-radius: 2px; background: ${c.onDarkAccent}; opacity: 0.55; }
.nv-sound.is-on > span { animation: nv-eq 0.9s ${motion.soft} infinite alternate; }
.nv-sound.is-on > span:nth-child(2) { animation-delay: 0.15s; }
.nv-sound.is-on > span:nth-child(3) { animation-delay: 0.3s; }
.nv-sound.is-on > span:nth-child(4) { animation-delay: 0.45s; }
@keyframes nv-eq { from { height: 6px; opacity: 0.5; } to { height: 20px; opacity: 1; } }
.nv-sound:focus-visible { outline: 2px solid ${c.onDarkAccent}; outline-offset: 3px; }

/* ---------- photographic grade ----------
   The photographs come from many sources with clashing white balance. One
   gentle wanv-green grade makes them read as a single commissioned set. */
.nv-shot, .nv-panel img, .nv-float img {
  filter: saturate(0.9) contrast(1.05) brightness(0.99);
}

/* ---------- photo parallax ----------
   Full-bleed panels drift slowly as they cross the viewport. Scroll-linked, so
   no JavaScript runs it; the image is over-scaled so the drift never gaps. */
.nv-panel { overflow: hidden; }
@supports (animation-timeline: view()) {
  .nv-panel img {
    animation: nv-parallax linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
    will-change: transform;
  }
  @keyframes nv-parallax {
    from { transform: scale(1.12) translateY(-3.2%); }
    to { transform: scale(1.12) translateY(3.2%); }
  }
}
/* Diagonal wipe reveal, driven by an IntersectionObserver. Default state is
   FULLY VISIBLE — the hidden start is only applied once JS adds .nv-armed, so
   if anything about the reveal fails the photograph still shows. .is-revealed
   sweeps the slanted edge across over ~1.15s. */
.nv-panel.nv-armed { clip-path: polygon(0 0, 0 0, -40% 100%, -40% 100%); transition: clip-path 1.15s cubic-bezier(0.22, 1, 0.36, 1); }
.nv-panel.nv-armed.is-revealed { clip-path: polygon(0 0, 140% 0, 100% 100%, 0 100%); }
/* The caption rises in just after the wipe uncovers the frame. */
.nv-panel.nv-armed .nv-panel-cap { opacity: 0; transform: translateY(26px); transition: opacity 0.7s ${motion.ease} 0.4s, transform 0.7s ${motion.ease} 0.4s; }
.nv-panel.nv-armed.is-revealed .nv-panel-cap { opacity: 1; transform: none; }

/* ---------- chapter opener: a low warm light behind the numeral ---------- */
.nv-open { position: relative; }
.nv-open::before {
  content: "";
  position: absolute;
  left: -6%;
  top: -30%;
  width: 46%;
  height: 260%;
  background: radial-gradient(50% 50% at 30% 40%, rgba(74, 86, 128, 0.18), rgba(74, 86, 128, 0) 70%);
  pointer-events: none;
  z-index: 0;
}
.nv-chapter--dark .nv-open::before { background: radial-gradient(50% 50% at 30% 40%, rgba(224, 161, 95, 0.16), rgba(224, 161, 95, 0) 70%); }
.nv-open-plate, .nv-open-copy { position: relative; z-index: 1; }

/* ---------- chapter seam: a faint centred hairline between light chapters -- */
.nv-chapter + .nv-chapter:not(.nv-chapter--dark)::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(60%, 40rem);
  height: 1px;
  background: linear-gradient(90deg, rgba(16, 23, 40, 0), ${c.line}, rgba(16, 23, 40, 0));
  pointer-events: none;
}

/* ---------- hero extras (still photo) ---------- */
.hero-eyebrow-ta { font-family: ${f.tamil}; font-size: 0.92rem; letter-spacing: 0.03em; color: ${c.onDarkDim}; }
.hero-credit { position: absolute; left: var(--nv-gutter); bottom: 0.8rem; z-index: 2; margin: 0; max-width: 60%; font-family: ${f.sans}; font-size: 0.68rem; letter-spacing: 0.02em; color: ${c.onDarkFaint}; }
@media (max-width: 860px) { .hero-credit { display: none; } }

/* ---------- lone-exception map ---------- */
.nv-map-wrap { display: grid; grid-template-columns: minmax(0, 21rem) minmax(0, 1fr); gap: clamp(1.4rem, 4vw, 3rem); align-items: center; }
.nv-map-stage { position: relative; }
.nv-map { width: 100%; height: auto; display: block; max-width: 21rem; margin-inline: auto; }
.nv-map-pulse { animation: nv-pulse 2.8s ${motion.soft} infinite; transform-origin: center; transform-box: fill-box; }
@keyframes nv-pulse { 0% { transform: scale(1); opacity: 0.85; } 70% { transform: scale(2.3); opacity: 0; } 100% { opacity: 0; } }
.nv-map-tn { cursor: pointer; transition: r 0.2s ${motion.ease}; }
.nv-map-tn:hover, .nv-map-tn:focus-visible { outline: none; }
.nv-map-other { pointer-events: none; }
/* Click-to-open popover, filed over the map like an evidence tag. */
.nv-map-pop { position: absolute; left: 50%; top: 8%; transform: translate(-50%, -6px); width: min(20rem, 82%); display: grid; gap: 0.5rem; text-align: left; padding: 1rem 1.1rem; background: ${c.ink}; border: 1px solid ${c.onDarkLine}; border-left: 4px solid ${c.clay}; box-shadow: 0 20px 50px rgba(8, 12, 24, 0.55); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.28s ${motion.ease}, transform 0.28s ${motion.ease}; cursor: pointer; z-index: 3; }
.nv-map-pop.is-open { opacity: 1; visibility: visible; transform: translate(-50%, 0); pointer-events: auto; }
.nv-map-pop-tag { font-family: ${f.sans}; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${c.clay}; }
.nv-map-pop-note { font-family: ${f.serif}; font-weight: 400; font-size: 1rem; line-height: 1.5; color: ${c.onDarkDim}; }
.nv-map-pop-close { font-family: ${f.sans}; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: ${c.onDarkFaint}; }
.nv-map-hint { font-family: ${f.sans}; font-size: 0.78rem; letter-spacing: 0.06em; color: ${c.clay}; margin-top: 0.3rem; }
.nv-map-read { display: grid; gap: 0.55rem; }
.nv-map-tag { font-family: ${f.sans}; font-size: 0.94rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${c.clay}; }
.nv-map-note { font-family: ${f.serif}; font-weight: 500; font-size: clamp(1.1rem, 1.7vw, 1.5rem); line-height: 1.45; color: ${c.onDarkDim}; }
@media (max-width: 720px) { .nv-map-wrap { grid-template-columns: 1fr; } }

/* ---------- two languages, or three ---------- */
.nv-lang { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1rem, 3vw, 2.2rem); width: 100%; }
.nv-lang-col { background: ${c.paperPanel}; border: 1px solid ${c.line}; border-radius: var(--nv-r); padding: clamp(1.1rem, 2.6vw, 1.8rem); }
.nv-lang-col:last-child { border-color: ${c.clay}; }
.nv-lang-name { font-family: ${f.display}; font-weight: 500; font-size: clamp(1.3rem, 2.4vw, 2rem); letter-spacing: -0.01em; color: ${c.greenInk}; margin: 0; }
.nv-lang-col:last-child .nv-lang-name { color: ${c.clay}; }
.nv-lang-tag { font-family: ${f.sans}; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.14em; color: ${c.textFaint}; margin: 0.25rem 0 1.1rem; }
.nv-lang-rows { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
.nv-lang-row { display: grid; gap: 0.45rem; padding: 0.7rem 0; border-top: 1px solid ${c.lineSoft}; opacity: 0.28; transition: opacity 0.55s ${motion.soft}; }
.nv-lang-row.is-on { opacity: 1; }
.nv-lang-band { font-family: ${f.sans}; font-size: 0.76rem; font-weight: 600; letter-spacing: 0.1em; color: ${c.textDim}; }
.nv-lang-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.nv-chip { display: inline-flex; align-items: baseline; gap: 0.4rem; font-family: ${f.serif}; font-size: 1.02rem; padding: 0.34rem 0.7rem; border-radius: var(--nv-r-sm); background: ${c.moss}; color: ${c.greenInk}; }
.nv-chip b { font-family: ${f.tamil}; font-weight: 500; font-size: 0.9em; color: ${c.clay}; }
.nv-chip--english { background: ${c.leafSoft}; }
.nv-chip--third { background: ${c.claySoft}; color: ${c.clay}; }
@media (max-width: 620px) { .nv-lang { grid-template-columns: 1fr; } }

/* ---------- timeline ---------- */
.nv-tl { position: relative; list-style: none; margin: 0; padding: 0.4rem 0 0.4rem 2.4rem; display: grid; gap: clamp(1.4rem, 4vh, 2.6rem); }
.nv-tl-spine { position: absolute; left: 0.55rem; top: 0.5rem; bottom: 0.5rem; width: 2px; background: ${c.onDarkLine}; }
.nv-tl-spine::after { content: ""; position: absolute; inset: 0 0 auto 0; height: var(--fill, 0%); background: ${c.clay}; transition: height 0.6s ${motion.soft}; }
.nv-tl-node { position: relative; opacity: 0.35; transition: opacity 0.5s ${motion.soft}; }
.nv-tl-node.is-on, .nv-tl-node.is-past { opacity: 1; }
.nv-tl-dot { position: absolute; left: -2.4rem; top: 0.35rem; width: 12px; height: 12px; border-radius: 999px; background: ${c.ink}; border: 2px solid ${c.onDarkLine}; }
.nv-tl-node.is-on .nv-tl-dot, .nv-tl-node.is-past .nv-tl-dot { background: ${c.clay}; border-color: ${c.clay}; box-shadow: 0 0 0 5px rgba(184, 70, 31, 0.2); }
.nv-tl-year { display: block; font-family: ${f.display}; font-weight: 800; font-size: clamp(1.8rem, 3.4vw, 3rem); line-height: 1; letter-spacing: -0.02em; color: ${c.onDark}; }
.nv-tl-label { display: block; font-family: ${f.sans}; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: ${c.onDarkFaint}; margin-top: 0.3rem; }

/* ---------- three questions: the ones left open ---------- */
.nv-q-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
.nv-q-row { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 0.4rem 1.4rem; align-items: start; padding: clamp(1.6rem, 4vh, 2.8rem) 0; border-top: 1px solid ${c.onDarkLine}; overflow: hidden; }
.nv-q-row:last-child { border-bottom: 1px solid ${c.onDarkLine}; }
/* An oversized ghost question mark bleeding off the right — the doubt made visible. */
.nv-q-mark { position: absolute; right: -0.5rem; top: 50%; transform: translateY(-50%); font-family: ${f.display}; font-weight: 800; font-size: clamp(6rem, 16vw, 13rem); line-height: 1; color: ${c.clay}; opacity: 0.12; pointer-events: none; user-select: none; }
.nv-q-n { grid-row: span 2; font-family: ${f.display}; font-weight: 800; font-size: clamp(1.6rem, 3.4vw, 2.6rem); letter-spacing: -0.02em; color: ${c.clay}; font-variant-numeric: tabular-nums; }
.nv-q-text { font-family: ${f.display}; font-weight: 700; font-size: clamp(1.5rem, 3.2vw, 2.6rem); line-height: 1.16; letter-spacing: -0.02em; color: ${c.onDark}; text-wrap: pretty; max-width: 30ch; transition: color 0.4s ${motion.ease}; }
@media (hover: hover) and (pointer: fine) {
  .nv-q-row { transition: background 0.4s ${motion.ease}; }
  .nv-q-row:hover { background: rgba(184, 70, 31, 0.06); }
  .nv-q-row:hover .nv-q-mark { opacity: 0.22; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .nv-map-pulse { animation: none; }
  .band-cell, .fact-row, .merit-pairs > div, .slip { transition: none; }
  .th-arc { transition: none; }
  .nv-panel img { animation: none; transform: none; }
  .nv-panel-cap { animation: none; opacity: 1; transform: none; }
  .nv-dust { animation: none; }
  .nv-sound.is-on > span { animation: none; }
  .nv-prose > blockquote.nv-quote--screen > p { transition: none; }
  .hero-video { animation: none; }
  .nv-chapter::before { animation: none; }
  .nv-dline > span { transform: none !important; transition: none; }
  .nv-rule > i { transform: none !important; transition: none; }
  .hero-scroll > span { animation: none; }
  .nv-line { opacity: 1 !important; transform: none !important; transition: none; }
  .nv-rise { opacity: 1 !important; transform: none !important; }
  .nv-step { opacity: 1; }
  .hero-go { transition: none; }
  .rail { scroll-snap-type: none; }
  .nv-rise.is-in .nv-shot { animation: none; }
}
`;
