import { theme } from "../theme";

const { colors: c, fonts: f, type: t, shadow: sh, radius: r, motion } = theme;

/**
 * Second half of the story stylesheet (chapter chrome, figures, hero, foot).
 * Injected once next to globalCss. No component emits its own <style> tag.
 */
export const componentCss = `
.rm-wrap { padding-inline: var(--rm-gutter); }
section.rm-chapter { max-width: none; padding-block: ${theme.space.sectionY}; padding-inline: 0; }
/* The shared sheet gives every svg a 1rem vertical margin. */
.il-svg, .bc, .merit, .geo, .ld-svg { margin: 0; }

/* Chapter ground tones, so the long read has terrain rather than one flat
   sheet: paper, then a paler moss hold, then paper again. */
.rm-chapter:nth-of-type(even) { background: ${c.paperAlt}; }
.rm-chapter#support, .rm-chapter#talent { background: linear-gradient(180deg, ${c.paperAlt}, ${c.moss}); }
.rm-chapter#exclusion { background: linear-gradient(180deg, ${c.moss}, ${c.paperAlt}); }
.rm-chapter#merit { background: linear-gradient(180deg, ${c.paperAlt}, ${c.paper}); }

/* ---------- dark ground: the heaviest chapter ----------
   Doubled classes outrank the alternating grounds above. Light figures,
   panels and interludes sit on it unchanged and pop; running type, labels,
   quotes and captions switch to on-dark tokens. */
.rm-chapter.rm-chapter--dark,
.rm-chapter.rm-chapter--dark#exclusion,
.rm-chapter.rm-chapter--dark#merit {
  /* Feathered into the neighbouring light grounds: transparent at both
     edges over the paper base, full dark through the middle. */
  background: linear-gradient(180deg, rgba(242, 245, 230, 0) 0, #0e160b 2.5rem, #0a1108 50%, #0e160b calc(100% - 2.5rem), rgba(242, 245, 230, 0) 100%);
}
.rm-chapter.rm-chapter--dark::before { opacity: 0.16; }
.rm-chapter.rm-chapter--dark .rm-open-num { color: ${c.onDarkAccent}; opacity: 0.9; }
.rm-chapter.rm-chapter--dark .rm-open-rule { background: linear-gradient(90deg, ${c.onDarkLine}, rgba(0, 0, 0, 0)); }
.rm-chapter.rm-chapter--dark .rm-h2 { color: ${c.onDark}; }
.rm-chapter.rm-chapter--dark .rm-h3 { color: ${c.onDarkAccent}; border-top-color: ${c.onDarkLine}; }
.rm-chapter.rm-chapter--dark .rm-h3::before { color: ${c.onDarkAccent}; }
.rm-chapter.rm-chapter--dark .rm-standfirst { color: ${c.onDarkDim}; }
.rm-chapter.rm-chapter--dark .rm-prose > p { color: ${c.onDarkDim}; }
.rm-chapter.rm-chapter--dark .rm-prose > p strong { color: ${c.onDark}; }
.rm-chapter.rm-chapter--dark .rm-prose a { color: ${c.onDarkAccent}; }
.rm-chapter.rm-chapter--dark .rm-quote p { color: ${c.claySoft}; }
.rm-chapter.rm-chapter--dark .rm-quote footer, .rm-chapter.rm-chapter--dark .rm-quote-role { color: ${c.onDarkFaint}; }
/* On the dark ground the washed green mark all but vanishes; the on-dark
   accent keeps the opening and closing marks highly visible over near-black. */
.rm-chapter.rm-chapter--dark .rm-quote::before,
.rm-chapter.rm-chapter--dark .rm-quote p::after { color: ${c.onDarkAccent}; opacity: 0.9; }
.rm-chapter.rm-chapter--dark .rm-fig-label { color: ${c.onDarkAccent}; }
.rm-chapter.rm-chapter--dark .rm-fig-label::after { background: ${c.onDarkLine}; }
.rm-chapter.rm-chapter--dark .rm-fig-cap { color: ${c.onDarkFaint}; }
.rm-chapter.rm-chapter--dark .rm-float-line { color: ${c.onDark}; }
.rm-chapter.rm-chapter--dark .rm-float-credit { color: ${c.onDarkFaint}; }
.rm-chapter.rm-chapter--dark .rm-note { background: rgba(244, 246, 234, 0.08); color: ${c.onDarkDim}; }
.rm-chapter.rm-chapter--dark .rm-step-v { color: ${c.onDark}; }
.rm-chapter.rm-chapter--dark .rm-step-k { color: ${c.onDarkAccent}; }
.rm-chapter.rm-chapter--dark .rm-step-rail { background: ${c.onDarkLine}; }
.rm-chapter.rm-chapter--dark .rm-scene-count { color: ${c.onDarkFaint}; }
.rm-chapter.rm-chapter--dark .rm-rule > i { background: linear-gradient(90deg, ${c.leafMid}, rgba(0, 0, 0, 0)); }

/* ---------- soft reveals ---------- */
.rm-rise { opacity: 0; transform: translateY(16px); }
.rm-rise.is-in { opacity: 1; transform: none; transition: opacity 1s ${motion.soft}, transform 1.1s ${motion.ease}; }
.rm-rise.is-in .rm-shot { animation: rm-settle 1.4s ${motion.ease} both; }
@keyframes rm-settle { from { transform: scale(1.035); } to { transform: scale(1); } }

/* ---------- prose, set line by line (Pretext) ----------
   Each measured line is its own block, so the paragraph arrives line by line
   and the word space is set per line rather than by the browser's justify. */
.rm-prose > p[data-lines] { text-align: left; }
.rm-prose > p.rm-solo[data-lines] { text-align: center; }
.rm-line {
  display: block;
  opacity: 0;
  transform: translateY(0.42em);
  transition: opacity 0.7s ${motion.soft}, transform 0.8s ${motion.ease};
  transition-delay: calc(var(--i, 0) * 55ms);
}
.rm-prose > p[data-shown] .rm-line { opacity: 1; transform: none; }

/* ---------- prose rhythm ----------
   Every block runs the full wrap width: the page reads as one column with the
   gutter as its only margin. Nothing is capped to a narrow measure. */
.rm-prose { position: relative; }
.rm-prose > h3,
.rm-prose > .rm-callout,
.rm-prose > .rm-note,
.rm-prose > .rm-fig { width: 100%; max-width: none; margin-block: clamp(1.8rem, 4.4vh, 2.9rem); }
/* Body copy stays auto-width: a 100%-wide block cannot sit beside a float and
   drops below it instead of wrapping. */
.rm-prose > p { max-width: none; margin-block: clamp(1.8rem, 4.4vh, 2.9rem); }
/* Quotes are uncapped too, but the bleed and screen variants keep their own
   full-viewport width — this rule must not flatten them into the column. */
.rm-prose > blockquote.rm-quote { max-width: none; }
.rm-prose > blockquote.rm-quote--bleed {
  margin-inline: calc(50% - 50vw);
  padding-inline: var(--rm-gutter);
}
/* The band runs the viewport; its text used to be capped at 30ch and ranged
   left, so the words sat in the left corner of an empty band. It now fills the
   band the way the prose fills the column, and the measure is held by the
   display size rather than by a box. */
.rm-prose > blockquote.rm-quote--bleed > p { max-width: none; width: 100%; text-wrap: pretty; }
.rm-prose > blockquote.rm-quote--bleed > footer { max-width: none; }

/* ---------- figure furniture ---------- */
.rm-shot-fig { margin-inline: 0; }
.rm-shot { border-radius: var(--rm-r); }
.planner { width: 100%; height: 980px; border: 1px solid ${c.line}; border-radius: var(--rm-r); display: block; background: #fff; box-shadow: ${sh.panel}; }
@media (max-width: 620px) { .planner { height: 1180px; } }

/* ---------- interlude panel ---------- */
.il {
  position: relative;
  margin: clamp(2.6rem, 7vh, 4.5rem) 0;
  background: linear-gradient(168deg, ${c.moss} 0%, ${c.mossDeep} 100%);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: ${sh.panel};
}
.il-svg { display: block; width: 100%; aspect-ratio: 1440 / 340; }
.il-cap { display: grid; gap: 0.4rem; padding: 1.15rem clamp(1.2rem, 2.6vw, 1.9rem) 1.35rem; background: rgba(251, 252, 244, 0.6); }
.il-label { font-family: ${f.serif}; font-weight: 500; font-size: 1.06rem; letter-spacing: -0.008em; color: ${c.greenInk}; margin: 0; }
.il-sub { font-family: ${f.sans}; font-size: 0.84rem; line-height: 1.6; color: ${c.textDim}; margin: 0; }
/* The sentences the figures come from. Quoted, never paraphrased. */
/* The reading of the drawing, in words, directly under it. A figure this big
   has to say what it is; the key names its parts, the notes quote the article. */
.il-key { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.3rem 1.6rem; }
.il-key li { position: relative; padding-left: 1.15rem; font-family: ${f.sans}; font-size: 0.85rem; line-height: 1.6; color: ${c.greenInk}; }
.il-key li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 0.6rem; height: 2px; border-radius: 2px; background: ${c.green}; }
/* Numerals set inside a drawing. They scale with the panel like everything
   else in the svg, so on a phone they are marks rather than words — which is
   what the key under the drawing is for. */
.il-num { font-family: ${f.serif}; font-weight: 400; font-size: 26px; letter-spacing: -0.02em; fill: ${c.greenInk}; }
.il-num--big { font-weight: 500; font-size: 62px; fill: ${c.green}; }
.il-notes { list-style: none; margin: 0.15rem 0 0; padding: 0; display: grid; gap: 0.4rem; }
.il-notes li { position: relative; padding-left: 1.05rem; font-family: ${f.sans}; font-size: 0.84rem; line-height: 1.62; color: ${c.textFaint}; }
.il-notes li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 0.5rem; height: 1px; background: ${c.leafMid}; }

/* A bars-only panel with an overlay badge: the badge floats top-right, so the
   bars start below it instead of under it. */
.il:has(.il-olays) > .il-bars { padding-top: clamp(5.2rem, 10vw, 6rem); }
/* A printed proportion: the value is the record, the bar is the feel of it. */
.il-bars { list-style: none; margin: 0; padding: clamp(1.1rem, 2.6vw, 1.7rem) clamp(1.2rem, 2.6vw, 1.9rem) 0.4rem; display: grid; gap: 0.85rem; background: linear-gradient(180deg, rgba(251, 252, 244, 0.1), rgba(251, 252, 244, 0.55)); }
.il-bar { display: grid; grid-template-columns: minmax(0, 1fr) minmax(6rem, 14rem) minmax(4.5rem, auto); align-items: center; gap: 1rem; }
.il-bar-label { font-family: ${f.sans}; font-size: 0.94rem; line-height: 1.5; color: ${c.textBody}; }
.il-bar-track { position: relative; height: 0.85rem; border-radius: 999px; background: rgba(31, 41, 23, 0.08); overflow: hidden; }
.il-bar-fill { position: absolute; inset: 0 auto 0 0; border-radius: 999px; background: linear-gradient(90deg, ${c.leaf}, ${c.green}); }
.il-bar-value { font-family: ${f.serif}; font-weight: 600; font-size: 1.2rem; letter-spacing: -0.01em; color: ${c.greenInk}; text-align: right; font-variant-numeric: tabular-nums; }
@media (max-width: 720px) {
  .il-bar { grid-template-columns: 1fr; gap: 0.3rem; }
  .il-bar-value { text-align: left; }
  .il-bar-track { order: 3; }
}

/* ---------- witness rail ---------- */
.rail { overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 0.6rem; }
.rail:focus-visible { outline: 2px solid ${c.green}; outline-offset: 4px; }
.rail-track { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(15rem, 19rem); gap: 0.9rem; width: max-content; padding: 0.2rem; }
.slip { scroll-snap-align: start; padding: 1.4rem 1.5rem 1.6rem; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--rm-r); box-shadow: ${sh.panel}; display: grid; align-content: start; gap: 0.5rem; }
.slip-n { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.14em; color: ${c.green}; }
.slip-name { font-family: ${f.serif}; font-weight: 500; font-size: 1.65rem; letter-spacing: -0.02em; color: ${c.greenInk}; margin: 0; }
.slip-work { font-family: ${f.sans}; font-size: 0.8rem; line-height: 1.6; color: ${c.textDim}; margin: 0; }
.slip-rule { width: 40px; height: 2px; display: block; }
.slip-note { font-size: 1rem; line-height: 1.62; color: ${c.textBody}; margin: 0; }

/* ---------- names ---------- */
.names { margin: 0; }
.name-row { display: grid; grid-template-columns: minmax(0, 12rem) minmax(0, 1fr); gap: 0.35rem 1.4rem; padding: 1.05rem 1.2rem; border-radius: var(--rm-r-sm); }
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
.ledger { background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--rm-r); padding: clamp(1.3rem, 3vw, 2rem); box-shadow: ${sh.panel}; }
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
.wf { background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--rm-r); padding: clamp(1.3rem, 3vw, 2rem); box-shadow: ${sh.panel}; }
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
.bc { width: 100%; height: auto; display: block; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--rm-r); padding: clamp(0.9rem, 2vw, 1.6rem); box-shadow: ${sh.panel}; box-sizing: border-box; }
.bc-axis { font-family: ${f.sans}; font-size: 11px; font-weight: 500; fill: ${c.textFaint}; }
.bc-legend { display: flex; flex-wrap: wrap; gap: 0.4rem 1.6rem; margin-top: 0.9rem; }
.bc-key { font-family: ${f.sans}; font-size: 0.82rem; color: ${c.textDim}; }
.bc-key--en::before { content: ""; display: inline-block; width: 16px; height: 3px; border-radius: 2px; background: ${c.green}; margin-right: 0.55rem; vertical-align: middle; }
.bc-key--kw::before { content: ""; display: inline-block; width: 16px; height: 3px; border-radius: 2px; background: ${c.leafMid}; margin-right: 0.55rem; vertical-align: middle; }

/* ---------- exclusion tiles ---------- */
.band { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.9rem; }
.band-cell { padding: 1.4rem 1.4rem 1.6rem; border-radius: var(--rm-r); background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
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
.fact-row { display: grid; grid-template-columns: 2.6rem minmax(0, 13rem) minmax(0, 1fr); gap: 0.4rem 1rem; align-items: baseline; padding: 1.15rem 1.3rem; border-radius: var(--rm-r); background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
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
.geo-list li { display: grid; grid-template-columns: minmax(0, 9rem) minmax(0, 1fr); gap: 0.3rem 1.2rem; padding: 0.7rem 1rem; border-radius: var(--rm-r-sm); }
.geo-list li:nth-child(odd) { background: ${c.moss}; }
.geo-k { font-family: ${f.serif}; font-weight: 500; font-size: 1.06rem; color: ${c.greenInk}; }
.geo-v { font-size: 1rem; line-height: 1.62; color: ${c.textBody}; }
@media (max-width: 620px) { .geo-list li { grid-template-columns: 1fr; } }

/* ---------- merit ---------- */
.merit { width: 100%; height: auto; display: block; background: ${c.paperPanel}; border: 1px solid ${c.lineSoft}; border-radius: var(--rm-r); padding: clamp(0.9rem, 2vw, 1.6rem); box-shadow: ${sh.panel}; box-sizing: border-box; }
.mt-step { font-family: ${f.sans}; font-size: 11px; font-weight: 500; fill: ${c.textFaint}; }
.mt-step--a { fill: ${c.green}; }
.mt-step--b { fill: ${c.clay}; }
.merit-pairs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.8rem; margin: 1.4rem 0 0; }
.merit-pairs > div { padding: 1.1rem 1.2rem; border-radius: var(--rm-r); background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
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
  display: flex;
  align-items: center;
  padding: 5.5rem 0 12rem;
  overflow: hidden;
  background: #0c1409;
  border-bottom: 1px solid ${c.lineSoft};
}
.hero-video { position: absolute; inset: 0; width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 42%; z-index: 0; animation: rmKenBurns 30s ease-in-out infinite alternate; }
/* A slow push-in on the six: the frame breathes instead of sitting still. */
@keyframes rmKenBurns { from { transform: scale(1); } to { transform: scale(1.09); } }
/* Darkening overlay. The type reads against this, not against the frame, so
   contrast is constant across the whole shot. */
.hero-scrim {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(120% 90% at 82% 12%, rgba(150, 89, 55, 0.16) 0%, rgba(150, 89, 55, 0) 55%),
    linear-gradient(180deg, rgba(10, 17, 7, 0.82) 0%, rgba(10, 17, 7, 0.4) 34%, rgba(10, 17, 7, 0.66) 72%, rgba(10, 17, 7, 0.92) 100%),
    radial-gradient(125% 85% at 16% 58%, rgba(10, 17, 7, 0.62) 0%, rgba(10, 17, 7, 0.18) 60%, rgba(10, 17, 7, 0) 100%);
}
.hero-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: clamp(2rem, 5vw, 4.5rem); align-items: end; width: 100%; position: relative; z-index: 2; }
.hero-eyebrow { display: flex; align-items: center; gap: 0.9rem; margin: 0 0 1.5rem; }
/* The mark keeps its own colours inside a light chip, so it stays legible on
   any frame without repainting the brand. */
.hero-brand { height: 26px; width: auto; display: block; padding: 5px 9px; background: rgba(244, 246, 234, 0.95); border-radius: 6px; }
.hero-eyebrow span { font-family: ${f.sans}; font-size: 0.92rem; font-weight: 600; letter-spacing: 0.2em; color: ${c.onDarkAccent}; }
.rm-hero-title { font-family: ${f.display}; font-weight: 400; font-size: ${t.heroTitle}; line-height: 0.98; letter-spacing: -0.02em; margin: 0; color: ${c.onDark}; text-shadow: 0 2px 26px rgba(7, 14, 9, 0.55); }
.h-mask { display: block; overflow: hidden; padding-bottom: 0.14em; margin-bottom: -0.08em; }
.h-line { display: block; }
.h-line--accent { font-style: italic; color: ${c.onDarkAccent}; }
.hero-deck { font-family: ${f.serif}; font-weight: 300; font-size: clamp(1.12rem, 1.8vw, 1.5rem); line-height: 1.54; color: ${c.onDarkDim}; margin: 1.7rem 0 0; max-width: 30ch; text-shadow: 0 1px 14px rgba(7, 14, 9, 0.5); }
.hero-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 0.9rem 1.6rem; margin-top: clamp(1.8rem, 5vh, 3rem); }
.hero-go { font-family: ${f.sans}; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; color: #f4f6ea; background: ${c.green}; padding: 0.9rem 1.5rem; border-radius: ${r.pill}; text-decoration: none; box-shadow: 0 10px 26px rgba(7, 14, 9, 0.45); transition: transform 0.25s ${motion.ease}, background 0.25s ${motion.ease}; }
.hero-go:hover { background: ${c.leaf}; }
.hero-go:active { transform: translateY(1px); }
.hero-go:focus-visible { outline: 2px solid ${c.onDark}; outline-offset: 3px; }
.hero-meta { font-family: ${f.sans}; font-size: 0.86rem; line-height: 1.7; color: ${c.onDarkFaint}; margin: 0; }
/* The byline carries the author: set larger and brighter than the date and
   read-time beside it, on its own line above them. */
.hero-byline { display: block; font-size: 1.15rem; font-weight: 600; letter-spacing: 0.01em; color: ${c.onDark}; margin-bottom: 0.15rem; }
.hero-fig { margin: 0; }
.hero-fig-card { color: ${c.onDarkDim}; background: rgba(10, 20, 13, 0.62); border: 1px solid ${c.onDarkLine}; border-radius: var(--rm-r); padding: 1.3rem 1.4rem 1.5rem; box-shadow: 0 20px 50px rgba(7, 14, 9, 0.45); backdrop-filter: blur(10px); }
.hero-fig-cap { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.1em; color: ${c.onDarkAccent}; margin: 0 0 0.9rem; }
.hero-fig-big { font-family: ${f.display}; font-weight: 400; font-size: clamp(2.6rem, 4.5vw, 4rem); line-height: 1; letter-spacing: -0.02em; color: ${c.onDark}; margin: 0 0 1rem; font-variant-numeric: tabular-nums; }
.hero-fig-big span { font-family: ${f.sans}; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; color: ${c.onDarkFaint}; margin-left: 0.5rem; }
.hero-dots { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; margin-bottom: 1.1rem; }
.hero-dot { aspect-ratio: 1; border-radius: 999px; background: ${c.onDarkLine}; }
.hero-dot--on { background: linear-gradient(180deg, ${c.onDarkAccent}, ${c.leaf}); box-shadow: 0 0 18px rgba(183, 217, 140, 0.55); }
.hero-fig-note { font-family: ${f.serif}; font-size: 1rem; line-height: 1.68; color: ${c.onDarkDim}; margin: 0; }
.hero-fig-note b { font-weight: 600; color: ${c.onDark}; }
@media (max-width: 860px) {
  .hero { min-height: auto; padding: 4.5rem 0 8.5rem; }
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
.closing { padding-block: clamp(3rem, 8vh, 5rem) clamp(2rem, 6vh, 3.5rem); background: linear-gradient(180deg, ${c.moss}, ${c.paperAlt}); }
.closing-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(1.5rem, 4vw, 4rem); }
.closing-body { font-size: 1.04rem; line-height: 1.78; color: ${c.textBody}; margin: 0; text-align: justify; text-justify: inter-word; }
.closing-sources { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.closing-sources li { padding: 0.7rem 0 0.7rem 1rem; border-left: 2px solid ${c.leafSoft}; font-size: 1rem; color: ${c.textBody}; }
.closing-sources a { color: ${c.greenInk}; text-decoration: none; border-bottom: 1px solid ${c.leafMid}; }
.closing-sources a:hover { color: ${c.green}; }
.closing-sources a:focus-visible { outline: 2px solid ${c.green}; outline-offset: 2px; }
.closing-fine { font-family: ${f.sans}; font-size: 0.78rem; line-height: 1.7; color: ${c.textFaint}; margin: 1.2rem 0 0; }
.closing-sign { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 2rem; margin: clamp(2.5rem, 6vh, 4rem) calc(50% - 50vw) 0; padding: 2.2rem var(--rm-gutter) 1.6rem; border-top: 0; background: linear-gradient(180deg, rgba(19, 29, 14, 0), #131d0e 12%, #0d150a); }
.closing-sign p { font-family: ${f.sans}; font-size: 0.92rem; font-weight: 500; letter-spacing: 0.08em; color: ${c.onDarkFaint}; margin: 0; }
.closing-sign .closing-byline { font-size: 1.15rem; font-weight: 600; letter-spacing: 0.02em; color: ${c.onDark}; }
@media (max-width: 860px) { .closing-grid { grid-template-columns: 1fr; } }

/* Every reading column sits above the section ground, so nothing overlaps. */
.rm-wrap { position: relative; z-index: 2; }

/* ---------- chapter opener: an arrival, not a heading ---------- */
/* Openers are a beat, not a screen. They used to hold ~85svh of centred box,
   which put a viewport of empty space between one section and the next title.
   Now the box hugs its content, so the arrival is the numeral and the rule. */
.rm-open { position: relative; display: grid; gap: 0; min-height: auto; padding-block: clamp(0.35rem, 1.2vh, 0.9rem) clamp(0.8rem, 2.4vh, 1.5rem); align-content: start; margin-bottom: clamp(0.6rem, 1.8vh, 1.1rem); }
.rm-open-plate { display: flex; align-items: center; gap: 1.4rem; margin-bottom: 1.1rem; }
.rm-open-num { font-family: ${f.display}; font-weight: 300; font-size: clamp(2.4rem, 6.5vw, 5rem); line-height: 0.85; letter-spacing: -0.02em; color: ${c.leafMid}; }
.rm-open-rule { flex: 1; height: 1px; background: linear-gradient(90deg, ${c.leafSoft}, rgba(0, 0, 0, 0)); }
.rm-open-copy { width: 100%; }
.rm-open--stack { padding-top: clamp(0.75rem, 3vh, 1.6rem); }
.rm-open--stack .rm-open-num { display: block; font-size: clamp(3.6rem, 11vw, 8rem); line-height: 1; color: ${c.leafSoft}; margin-bottom: -0.06em; }
.rm-open--stack .rm-open-plate { display: block; }
.rm-open--stack .rm-open-rule { display: none; }
/* Untitled opening section: a compact band, so a lone numeral never holds a
   whole screen on its own. */
.rm-open--bare, .rm-open--low.rm-open--bare { min-height: auto; align-content: start; padding-block: clamp(0.9rem, 3vh, 1.7rem) clamp(0.8rem, 2.4vh, 1.4rem); margin-bottom: clamp(0.8rem, 2.4vh, 1.3rem); }
.rm-open--bare .rm-open-num { font-size: clamp(2.2rem, 5.5vw, 3.6rem); }
.rm-open--bare .rm-open-plate { margin-bottom: 0; }
.rm-open--low { align-content: start; min-height: auto; }
.rm-open--low .rm-open-num { color: ${c.green}; opacity: 0.55; }

/* ---------- pinned scene ---------- */
.rm-prose > .rm-fig.rm-scene-wrap { width: 100%; }
.rm-scene { position: relative; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(1.6rem, 4vw, 3.6rem); align-items: start; }
.rm-scene-stage { position: sticky; top: clamp(3.5rem, 9vh, 6rem); align-self: start; display: grid; gap: 0.9rem; }
.rm-scene-visual { display: grid; place-items: center; min-height: min(64svh, 34rem); }
.rm-scene-count { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.16em; color: ${c.textFaint}; margin: 0; text-align: center; font-variant-numeric: tabular-nums; }
.rm-scene-steps { list-style: none; margin: 0; padding: 0; display: grid; }
.rm-step { position: relative; min-height: 56svh; display: grid; align-content: center; gap: 0.5rem; padding-left: 1.9rem; opacity: 0.32; transition: opacity 0.55s ${motion.soft}; }
.rm-step.is-past { opacity: 0.58; }
.rm-step.is-on { opacity: 1; }
.rm-step-rail { position: absolute; left: 0; top: 12%; bottom: 12%; width: 1px; background: ${c.lineSoft}; }
.rm-step-rail > i { position: absolute; left: -4px; top: 50%; width: 9px; height: 9px; border-radius: ${r.pill}; background: ${c.leafSoft}; transform: translateY(-50%); transition: background 0.45s ${motion.soft}, box-shadow 0.45s ${motion.soft}; }
.rm-step.is-on .rm-step-rail > i { background: ${c.green}; box-shadow: 0 0 0 5px ${c.leafSoft}; }
.rm-step-k { font-family: ${f.sans}; font-size: 0.94rem; font-weight: 600; letter-spacing: 0.12em; color: ${c.green}; }
.rm-step-v { font-family: ${f.serif}; font-weight: 300; font-size: clamp(1.15rem, 1.9vw, 1.5rem); line-height: 1.5; color: ${c.text}; margin: 0; max-width: 30ch; }

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
.kit-again { position: absolute; top: -7px; left: 50%; transform: translateX(-50%); font-family: ${f.sans}; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em; color: ${c.paper}; background: ${c.green}; padding: 0.16rem 0.42rem; border-radius: ${r.pill}; white-space: nowrap; animation: rmPop 0.5s ${motion.ease} both; }
@keyframes rmPop { from { opacity: 0; transform: translateX(-50%) scale(0.75); } }
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
.dv-card { padding: 1rem 1.1rem 1.15rem; border-radius: var(--rm-r); background: rgba(251, 252, 244, 0.55); opacity: 0.45; transition: opacity 0.6s ${motion.soft}, background 0.6s ${motion.soft}; }
.dv-card.is-on { opacity: 1; background: ${c.paperPanel}; box-shadow: ${sh.panel}; }
.dv-card--b.is-on { background: ${c.claySoft}; box-shadow: none; }
.dv-name { font-family: ${f.serif}; font-weight: 500; font-size: 1.1rem; letter-spacing: -0.012em; color: ${c.greenInk}; margin: 0 0 0.5rem; }
.dv-card ul { margin: 0; padding-left: 1rem; display: grid; gap: 0.35rem; }
.dv-card li { font-family: ${f.sans}; font-size: 0.8rem; line-height: 1.58; color: ${c.textBody}; }

/* ---------- a photograph that takes the screen ---------- */
/* ---------- photographs are shown whole ----------
   No box is filled by cropping: the frame keeps its own aspect ratio at
   whatever width it is given, and the caption sits underneath it. */
.rm-prose > .rm-panel { width: 100vw; max-width: none; margin-inline: calc(50% - 50vw); }
.rm-panel { display: block; margin-block: clamp(1.8rem, 4.4vh, 2.9rem); background: ${c.moss}; }
.rm-panel img { display: block; width: 100%; height: auto; }
.rm-panel-cap { display: grid; gap: 0.4rem; padding: 0.85rem var(--rm-gutter) 0; }
.rm-panel-line { font-family: ${f.serif}; font-weight: 300; font-size: clamp(1.05rem, 1.7vw, 1.45rem); line-height: 1.42; color: ${c.textBody}; }
.rm-panel-credit { font-family: ${f.sans}; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.06em; color: ${c.textDim}; }

/* ---------- a pair of photographs, one thought ----------
   Two frames side by side, short-cropped so the pair stays compact instead of
   two full-height panels stacked. Each is tagged (BCCI / IPL) and credited. */
.rm-duo { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(0.8rem, 2vw, 1.4rem); }
.rm-duo-item { margin: 0; display: grid; gap: 0.55rem; }
.rm-duo-img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: var(--rm-r); background: ${c.moss}; box-shadow: ${sh.panel}; }
.rm-duo-cap { display: grid; gap: 0.28rem; }
.rm-duo-tag { font-family: ${f.sans}; font-size: 0.86rem; font-weight: 600; letter-spacing: 0.14em; color: ${c.green}; }
.rm-duo-credit { font-family: ${f.sans}; font-size: 0.9rem; line-height: 1.5; color: ${c.textDim}; }
.rm-chapter.rm-chapter--dark .rm-duo-tag { color: ${c.onDarkAccent}; }
.rm-chapter.rm-chapter--dark .rm-duo-credit { color: ${c.onDarkFaint}; }
@media (max-width: 560px) { .rm-duo { grid-template-columns: 1fr; } .rm-duo-img { aspect-ratio: 16 / 9; } }

/* Portraits float and the copy wraps around them: Prose measures the float
   per line and narrows only the lines beside it, so the run keeps its full
   measure everywhere else. The whole frame is shown, caption underneath. */
.rm-float { width: min(28%, 22rem); margin: 0.3rem 0 1.1rem; }
.rm-float--right { float: right; margin-left: clamp(1.1rem, 2.3vw, 1.9rem); }
.rm-float--left { float: left; margin-right: clamp(1.1rem, 2.3vw, 1.9rem); }
.rm-float img { display: block; width: 100%; height: auto; border-radius: var(--rm-r-sm); background: ${c.moss}; box-shadow: ${sh.panel}; }
.rm-float-cap { display: grid; gap: 0.35rem; margin-top: 0.65rem; }
.rm-float-line { font-family: ${f.serif}; font-weight: 500; font-size: 1rem; line-height: 1.45; color: ${c.greenInk}; }
.rm-float-credit { font-family: ${f.sans}; font-size: 0.9rem; line-height: 1.5; color: ${c.textDim}; }
/* Figures, quotes, callouts and interludes establish their own block context,
   so their backgrounds never slide under a floated portrait: they sit beside
   it while it lasts, full width below it. */
.rm-prose > figure,
.rm-prose > blockquote,
.rm-prose > .rm-fig,
.rm-prose > .rm-callout,
.rm-prose > .rm-note,
.rm-prose > .il { display: flow-root; }
@media (max-width: 760px) {
  .rm-float, .rm-float--left, .rm-float--right { float: none; width: 100%; margin: 1.6rem 0; }
}
/* Nothing should run under a float at the end of a section. */
.rm-prose > :last-child { clear: both; }
/* The last block in a section never carries a trailing margin into the next
   one; the section padding is the whole break. */
.rm-prose > :last-child { margin-bottom: 0; }

/* ---------- a statement that takes the page ----------
   The article's heaviest question. It gets the whole column, the only weight
   500 on the page, and a moss band with a hairline top and bottom so it reads
   as the pivot it is — no narrow measure squeezing it into six short lines. */
.rm-prose > blockquote.rm-quote--screen {
  max-width: none; margin-inline: calc(50% - 50vw); width: 100vw; border: 0;
  padding: clamp(2.2rem, 6.5vh, 4rem) var(--rm-gutter);
  display: grid; align-content: center;
  margin-block: clamp(2rem, 5.5vh, 3.4rem);
  background: linear-gradient(180deg, rgba(226, 235, 208, 0), ${c.moss} 42%, rgba(226, 235, 208, 0));
  border-top: 1px solid ${c.lineSoft}; border-bottom: 1px solid ${c.lineSoft};
}
/* The screen statements are the article's own voice, not quotations, so they
   carry no decorative quote marks — and their long measure is justified. */
.rm-prose > blockquote.rm-quote--screen::before { content: none; }
.rm-prose > blockquote.rm-quote--screen p::after { content: none; }
.rm-prose > blockquote.rm-quote--screen > p {
  max-width: none;
  text-indent: 0;
  font-weight: 500;
  font-size: clamp(1.55rem, 3.5vw, 3rem);
  line-height: 1.26;
  letter-spacing: -0.02em;
  color: ${c.greenInk};
  margin-inline: auto;
  text-align: justify;
  text-justify: inter-word;
  hyphens: none;
  /* The pull-quote left inset does not apply to the full-width statements. */
  padding-left: 0;
}
/* DisplayText sets each line as its own block, so a plain text-align:justify on
   the paragraph cannot stretch them. Justify every line but the last by
   forcing its single line to fill the measure (text-align-last). The last line
   stays ragged, as justified text should. */
.rm-prose > blockquote.rm-quote--screen .rm-dline:not(:last-child) > span {
  text-align: justify;
  text-align-last: justify;
  text-justify: inter-word;
}
.rm-prose > blockquote.rm-quote--screen > footer { max-width: none; margin: 1.2rem auto 0; text-align: center; }
/* The dark pivot: the merit question lands on near-black, the only dark
   ground outside the hero. On-dark tokens carry it. */
.rm-prose > blockquote.rm-quote--screen-dark {
  background: linear-gradient(180deg, rgba(13, 21, 10, 0) 0, #0d150a 4%, #182511 55%, #0d150a 96%, rgba(13, 21, 10, 0) 100%);
  border-top: 0;
  border-bottom: 0;
}
.rm-prose > blockquote.rm-quote--screen-dark > p { color: ${c.onDark}; }

/* ---------- embed ---------- */
.embed .hero { min-height: auto; padding-block: 3.5rem 5rem; }
.embed .il { margin-block: 2.4rem; }
/* An embed has no pinned scroll of its own: the scene unsticks and reads down. */
.embed .rm-open { min-height: auto; padding-block: 1.4rem 2rem; }
.embed .rm-scene { grid-template-columns: 1fr; }
.embed .rm-scene-stage { position: static; }
.embed .rm-scene-count { display: none; }
.embed .rm-step { min-height: auto; padding: 1.1rem 0 0 1.5rem; opacity: 1; }

.embed .rm-prose > blockquote.rm-quote--screen { min-height: auto; padding-block: 3rem; }

/* ---------- narrow screens: the stage holds, the steps slide under it ------ */
@media (max-width: 900px) {
  .rm-scene { grid-template-columns: 1fr; gap: 0; }
  .rm-scene-stage { top: 0; z-index: 3; gap: 0.45rem; padding: 0.7rem 0 0.5rem; background: ${c.paper}; border-bottom: 1px solid ${c.lineSoft}; }
  .rm-scene-visual { min-height: 36svh; }
  .rm-scene-count { text-align: left; }
  .rm-step { min-height: 58svh; padding: 2rem 0 0 1.5rem; }
  .rm-step-v { max-width: none; }
  .diverge-lanes { grid-template-columns: 1fr; }

  .rm-prose > blockquote.rm-quote--screen { padding-block: clamp(1.8rem, 5vh, 2.6rem); }
  .rm-prose > blockquote.rm-quote--screen > p { text-align: left; }
  /* On a narrow measure, forcing each line flush both edges opens rivers, so
     the statements read ranged-left like the body copy does here. */
  .rm-prose > blockquote.rm-quote--screen .rm-dline:not(:last-child) > span { text-align: left; text-align-last: left; }
  .rm-open, .rm-open--low { min-height: auto; padding-block: clamp(0.8rem, 3vh, 1.4rem) clamp(0.7rem, 2.4vh, 1.2rem); }
  .rm-open--bare, .rm-open--low.rm-open--bare { min-height: auto; padding-block: 1.6rem 1.2rem; }
  .rm-open--stack .rm-open-num { font-size: clamp(4rem, 22vw, 7rem); }
}

/* ---------- display type: Pretext line reveals for titles and screens ---
   DisplayText splits headings into the lines the browser would set, then each
   line slides up out of its own mask with a short stagger. Body copy never
   gets this treatment — only titles and the full-screen quotations. */
.rm-dline { display: block; overflow: hidden; padding-bottom: 0.09em; margin-bottom: -0.09em; }
.rm-dline > span {
  display: block;
  transform: translateY(112%);
  transition: transform 0.9s ${motion.ease};
  transition-delay: calc(var(--i, 0) * 70ms);
  will-change: transform;
}
[data-shown="on"] .rm-dline > span { transform: none; }

/* ---------- chapter rhythm: ghost numeral, drawn rule, alternating openers */
.rm-chapter { position: relative; }
.rm-chapter::before {
  content: attr(data-num);
  position: absolute;
  top: clamp(0.6rem, 3vh, 1.6rem);
  right: var(--rm-gutter);
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
  .rm-chapter::before { animation: rmGhost linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  @keyframes rmGhost { from { transform: translateY(34px); opacity: 0.14; } to { transform: translateY(-70px); opacity: 0.03; } }
}
/* One-sentence paragraphs the article leaves standing alone: set big and
   centred, a held breath between sections. */
.rm-prose > p.rm-solo {
  font-family: ${f.display};
  font-weight: 400;
  font-size: clamp(1.45rem, 2.6vw, 2.2rem);
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-align: center;
  text-wrap: balance;
  color: ${c.greenInk};
  margin-block: clamp(2rem, 6vh, 3.4rem);
}
.rm-chapter--alt .rm-open-rule { background: linear-gradient(90deg, ${c.green}, rgba(0, 0, 0, 0)); }
.rm-rule { margin: 0 0 clamp(1.4rem, 3.6vh, 2.2rem); }
.rm-rule > i {
  display: block;
  height: 2px;
  background: linear-gradient(90deg, ${c.leafMid}, rgba(0, 0, 0, 0));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1.2s ${motion.ease};
}
.rm-rule.is-in > i { transform: none; }

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
  border-radius: var(--rm-r-sm);
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
  animation: rmWheel 2.2s ${motion.soft} infinite;
}
@keyframes rmWheel { 0% { transform: translateY(0); opacity: 1; } 60% { transform: translateY(12px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }
.embed .hero-scroll { display: none; }

/* ---------- grain: paper tooth over everything ---------- */
.rm-grain {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.55;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.24 0 0 0 0 0.12 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}
.embed .rm-grain { display: none; }

/* ---------- figure polish: depth, motion, number clarity ---------- */
/* Bars read as inset channels rather than flat pills. */
.il-bar-track, .wf-track, .led-bar, .band-meter { box-shadow: inset 0 1px 2px rgba(31, 41, 23, 0.1); }
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

/* ---------- ambient light wash: dawn to dusk ----------
   A fixed, scroll-linked colour temperature behind the whole read — cool at the
   hopeful open, warming and lowering toward the heavy close. Soft-light so it
   tints the grounds without touching the legibility of the type above it. */
.rm-atmo { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
.rm-atmo-layer { position: absolute; inset: 0; mix-blend-mode: soft-light; will-change: opacity; }
.rm-atmo-dawn { opacity: 0.5; background: linear-gradient(180deg, #b9d2e6 0%, #e9f0dd 55%, ${c.paper} 100%); }
.rm-atmo-dusk { opacity: 0; background: linear-gradient(180deg, #f4c98e 0%, #cf8a56 45%, #4a3120 100%); }
@supports (animation-timeline: scroll()) {
  .rm-atmo-dawn { animation: rm-dawn linear both; animation-timeline: scroll(root); }
  .rm-atmo-dusk { animation: rm-dusk linear both; animation-timeline: scroll(root); }
  @keyframes rm-dawn { from { opacity: 0.5; } to { opacity: 0; } }
  @keyframes rm-dusk { 0%, 55% { opacity: 0; } 100% { opacity: 0.42; } }
}
.embed .rm-atmo { display: none; }
/* The wash tints the light grounds only. The hero and the dark chapters sit
   above it (z-index 2), so their near-black backgrounds stay as they were. */
.hero { z-index: 2; }
.rm-chapter.rm-chapter--dark { z-index: 2; }

/* ---------- drifting dust: depth behind the column ---------- */
.rm-dust {
  position: absolute; inset: -8%;
  opacity: 0.5;
  background-image:
    radial-gradient(3px 3px at 15% 22%, rgba(75, 115, 39, 0.2), transparent 60%),
    radial-gradient(2px 2px at 68% 34%, rgba(150, 89, 55, 0.18), transparent 60%),
    radial-gradient(2.5px 2.5px at 42% 72%, rgba(75, 115, 39, 0.16), transparent 60%),
    radial-gradient(2px 2px at 84% 66%, rgba(75, 115, 39, 0.14), transparent 60%),
    radial-gradient(2px 2px at 28% 88%, rgba(150, 89, 55, 0.14), transparent 60%),
    radial-gradient(2.5px 2.5px at 92% 14%, rgba(75, 115, 39, 0.16), transparent 60%);
  animation: rm-dust 46s linear infinite alternate;
}
@keyframes rm-dust { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-2.5%, -2%, 0); } }

/* ---------- cursor-reactive screen statements ---------- */
.rm-prose > blockquote.rm-quote--screen > p {
  transform: translate(var(--qx, 0px), var(--qy, 0px)) rotate(var(--qr, 0deg));
  transition: transform 0.4s ${motion.soft};
  will-change: transform;
}

/* ---------- openable details ---------- */
.rm-details { margin-top: 1.2rem; border-top: 1px solid ${c.line}; }
.rm-details > summary { cursor: pointer; list-style: none; padding: 0.85rem 0; font-family: ${f.sans}; font-size: 0.88rem; font-weight: 600; letter-spacing: 0.06em; color: ${c.greenInk}; display: flex; align-items: center; gap: 0.6rem; }
.rm-details > summary::-webkit-details-marker { display: none; }
.rm-details > summary::before { content: "+"; font-size: 1.15rem; line-height: 1; color: ${c.green}; }
.rm-details[open] > summary::before { content: "\\2013"; }
.rm-details > summary:focus-visible { outline: 2px solid ${c.green}; outline-offset: 3px; }
.rm-details > p { margin: 0 0 1rem; }

/* ---------- ambient sound toggle ---------- */
.rm-sound { position: fixed; right: clamp(1rem, 3vw, 2rem); bottom: clamp(1rem, 3vw, 2rem); z-index: 82; width: 46px; height: 46px; display: flex; align-items: flex-end; justify-content: center; gap: 3px; padding-bottom: 14px; background: rgba(13, 21, 10, 0.6); border: 1px solid ${c.onDarkLine}; border-radius: 999px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); cursor: pointer; }
.rm-sound > span { width: 3px; height: 7px; border-radius: 2px; background: ${c.onDarkAccent}; opacity: 0.55; }
.rm-sound.is-on > span { animation: rm-eq 0.9s ${motion.soft} infinite alternate; }
.rm-sound.is-on > span:nth-child(2) { animation-delay: 0.15s; }
.rm-sound.is-on > span:nth-child(3) { animation-delay: 0.3s; }
.rm-sound.is-on > span:nth-child(4) { animation-delay: 0.45s; }
@keyframes rm-eq { from { height: 6px; opacity: 0.5; } to { height: 20px; opacity: 1; } }
.rm-sound:focus-visible { outline: 2px solid ${c.onDarkAccent}; outline-offset: 3px; }
.embed .rm-sound { display: none; }

/* ---------- photographic grade ----------
   The photographs come from many sources with clashing white balance. One
   gentle warm-green grade makes them read as a single commissioned set. */
.rm-shot, .rm-panel img, .rm-float img {
  filter: saturate(0.95) contrast(1.03) sepia(0.1) hue-rotate(12deg);
}

/* ---------- photo parallax ----------
   Full-bleed panels drift slowly as they cross the viewport. Scroll-linked, so
   no JavaScript runs it; the image is over-scaled so the drift never gaps. */
.rm-panel { overflow: hidden; }
@supports (animation-timeline: view()) {
  .rm-panel img {
    animation: rm-parallax linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
    will-change: transform;
  }
  @keyframes rm-parallax {
    from { transform: scale(1.12) translateY(-3.2%); }
    to { transform: scale(1.12) translateY(3.2%); }
  }
}

/* ---------- chapter opener: a low warm light behind the numeral ---------- */
.rm-open { position: relative; }
.rm-open::before {
  content: "";
  position: absolute;
  left: -6%;
  top: -30%;
  width: 46%;
  height: 260%;
  background: radial-gradient(50% 50% at 30% 40%, rgba(102, 143, 57, 0.18), rgba(102, 143, 57, 0) 70%);
  pointer-events: none;
  z-index: 0;
}
.rm-chapter--dark .rm-open::before { background: radial-gradient(50% 50% at 30% 40%, rgba(183, 217, 140, 0.16), rgba(183, 217, 140, 0) 70%); }
.rm-open-plate, .rm-open-copy { position: relative; z-index: 1; }

/* ---------- chapter seam: a faint centred hairline between light chapters -- */
.rm-chapter + .rm-chapter:not(.rm-chapter--dark)::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(60%, 40rem);
  height: 1px;
  background: linear-gradient(90deg, rgba(31, 41, 23, 0), ${c.line}, rgba(31, 41, 23, 0));
  pointer-events: none;
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .band-cell, .fact-row, .merit-pairs > div, .slip { transition: none; }
  .th-arc { transition: none; }
  .rm-panel img { animation: none; transform: none; }
  .rm-dust { animation: none; }
  .rm-sound.is-on > span { animation: none; }
  .rm-prose > blockquote.rm-quote--screen > p { transition: none; }
  .hero-video { animation: none; }
  .rm-chapter::before { animation: none; }
  .rm-dline > span { transform: none !important; transition: none; }
  .rm-rule > i { transform: none !important; transition: none; }
  .hero-scroll > span { animation: none; }
  .rm-line { opacity: 1 !important; transform: none !important; transition: none; }
  .rm-rise { opacity: 1 !important; transform: none !important; }
  .rm-step { opacity: 1; }
  .hero-go { transition: none; }
  .rail { scroll-snap-type: none; }
  .rm-rise.is-in .rm-shot { animation: none; }
}
`;
