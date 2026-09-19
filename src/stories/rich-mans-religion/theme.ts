/**
 * Rich Man's Religion — design tokens.
 *
 * Design read: an emotional investigative read about children who cannot
 * afford to play a game played on grass. The page is quiet paper so the type
 * does the work; the opening is Dhoni's six on video, under a darkening scrim.
 *
 * Locks (documented so they do not drift):
 *  - Page theme lock: LIGHT, warm paper, for the whole story. The hero is the
 *    single dark ground, and it has its own on-dark type tokens.
 *  - Shape lock: soft. Panels 18px, small elements 10px, tags pill. No sharp
 *    corners and no mixed scale.
 *  - Type lock: Newsreader only, at weights 300-600. No bold-in-your-face
 *    display weights, no second display family. Karla carries labels.
 *  - Colour lock, two hues with two jobs, never mixed:
 *      green = the sport, the structure, the numbers
 *      clay  = the emotional register: what people said, and the ball itself
 */

export const theme = {
  colors: {
    /* paper: a cut strip of grass, not newsprint — every tone below carries a
       little olive, so the page reads green rather than cream. */
    paper: "#f2f5e6",
    paperAlt: "#edf2df",
    paperPanel: "#fbfcf4",
    moss: "#e2ebd0",
    mossDeep: "#cfdfb6",

    /* ink: deep olive, not black */
    ink: "#1f2917",
    text: "#26301b",
    textBody: "#3b452c",
    textDim: "#57603f",
    textFaint: "#626c4a",

    /* structure */
    line: "rgba(31, 41, 23, 0.15)",
    lineSoft: "rgba(31, 41, 23, 0.07)",
    lineStrong: "rgba(31, 41, 23, 0.3)",

    /* green: the sport, in the olive end of the field */
    green: "#4b7327",
    greenDeep: "#3a5a1f",
    greenInk: "#2c451a",
    leaf: "#668f39",
    leafMid: "#87ac5c",
    leafSoft: "#dce9c1",

    /* clay: the human voice, quotations only — the one warm note left */
    clay: "#965937",
    claySoft: "#f4ead8",

    /* on the video: the hero is the only dark ground, so its type gets its
       own tokens rather than borrowing ink that assumes paper underneath. */
    onDark: "#f4f6ea",
    onDarkDim: "rgba(244, 246, 234, 0.86)",
    onDarkFaint: "rgba(244, 246, 234, 0.68)",
    onDarkAccent: "#b7d98c",
    onDarkLine: "rgba(244, 246, 234, 0.16)",
  },

  fonts: {
    serif: '"Newsreader", "Iowan Old Style", Georgia, "Times New Roman", serif',
    display: '"Fraunces", "Newsreader", Georgia, serif',
    sans: '"Karla", "Segoe UI", system-ui, -apple-system, sans-serif',
  },

  /*
   * Type scales with the viewport, not against it.
   *
   * With the column unlocked, a fixed body size would set ~104 characters to
   * the line at 1440 and ~140 at 1920 — the eye loses its place on the way
   * back. So the body follows the same vw the column does: 22.3px at 1440,
   * 28px at 1920, which holds the measure between 76 and 86 characters across
   * every desktop width. Below 1440 the rem floor takes over (17.6px), so
   * phones and tablets are unchanged. Everything above the body is the same
   * curve, so the hierarchy is preserved rather than inverted.
   */
  type: {
    heroTitle: "clamp(3.4rem, 9vw, 7.6rem)",
    chapterTitle: "clamp(2rem, 5vw, 3.9rem)",
    subhead: "clamp(1.3rem, 2.4vw, 2rem)",
    standfirst: "clamp(1.08rem, 1.8vw, 1.62rem)",
    body: "clamp(1.06rem, 1.15vw + 0.55rem, 1.32rem)",
    lead: "clamp(1.25rem, 2vw, 1.9rem)",
    quote: "clamp(1.35rem, 2.6vw, 2.4rem)",
    numeral: "clamp(2.4rem, 6vw, 4.8rem)",
    label: "0.76rem",
    caption: "0.84rem",
  },

  space: {
    /* The column is the page. The wrap used to be capped at 76rem and centred,
       which left a 177px margin at 1440 and a 350px one at 1920 — the text read
       as a band in the middle of the screen rather than as the page. There is no
       cap now: the gutter is the only margin, and it is set in vw so the edge
       keeps its proportion as the window grows. */
    gutter: "clamp(1.15rem, 6vw, 9rem)",
    sectionY: "clamp(2.25rem, 4.4vh, 3.4rem)",
  },

  radius: { panel: "18px", small: "10px", pill: "999px" },

  shadow: {
    panel: "0 10px 30px rgba(47, 74, 30, 0.08)",
    lift: "0 18px 44px rgba(47, 74, 30, 0.12)",
  },

  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    soft: "cubic-bezier(0.33, 0.9, 0.4, 1)",
  },
} as const;

export const SHAPE_RULE = `${theme.radius.panel} panels, ${theme.radius.small} small, pill tags, always rounded`;

export const globalCss = `
.rm {
  --rm-gutter: ${theme.space.gutter};
  --rm-r: ${theme.radius.panel};
  --rm-r-sm: ${theme.radius.small};
  position: relative;
  background: ${theme.colors.paper};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.serif};
  font-size: 100%;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}
.rm ::selection { background: ${theme.colors.leafSoft}; color: ${theme.colors.greenInk}; }

/* ---------- layout ---------- */
.rm-wrap { width: 100%; max-width: none; padding-inline: var(--rm-gutter); }
.rm-chapter { position: relative; padding-block: ${theme.space.sectionY}; }

/* ---------- chapter head ---------- */
.rm-head { position: relative; margin: 0 0 clamp(2rem, 5vh, 3.4rem); }
.rm-num {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.16em;
  color: ${theme.colors.green};
  margin: 0 0 0.9rem;
}
.rm-h2 {
  font-family: ${theme.fonts.display};
  font-weight: 400;
  font-size: ${theme.type.chapterTitle};
  line-height: 1.02;
  letter-spacing: -0.01em;
  margin: 0;
  color: ${theme.colors.greenInk};
  text-wrap: balance;
}
.rm-h2 em { font-style: italic; color: ${theme.colors.green}; }
/* Alternate chapters stay full-width like every other chapter: the ground
   alternates, the measure never does, so no paragraph reads indented. */
.rm-chapter--alt .rm-h2 { font-style: italic; }
.rm-chapter { counter-reset: rmh3; }
.rm-h3 {
  counter-increment: rmh3;
  font-family: ${theme.fonts.serif};
  font-weight: 500;
  font-size: ${theme.type.subhead};
  line-height: 1.28;
  letter-spacing: -0.01em;
  margin: 2.4rem 0 0.9rem;
  padding-top: 1.1rem;
  border-top: 1px solid ${theme.colors.lineSoft};
  color: ${theme.colors.greenDeep};
  text-wrap: balance;
}
/* Subheads carry their own section number, set in the label face — chrome,
   not copy: a § mark and a numeral, no words. */
.rm-h3::before {
  content: "§ " counter(rmh3, decimal-leading-zero);
  display: block;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.16em;
  color: ${theme.colors.green};
  margin-bottom: 0.55rem;
}
.rm-standfirst {
  font-family: ${theme.fonts.serif};
  font-weight: 300;
  font-size: ${theme.type.standfirst};
  line-height: 1.62;
  color: ${theme.colors.textDim};
  margin: 1.3rem 0 0;
  text-wrap: pretty;
}

/* ---------- prose ---------- */
/* Direct children only: descendant selectors here flatten every figure. */
.rm-prose { font-family: ${theme.fonts.serif}; }
.rm-prose > p {
  /* A drop cap is a float, and a float taller than its paragraph is not
     contained by it: it spills into the paragraph below and steals its first
     line, which is a line of type the layout cannot account for. flow-root
     makes the paragraph contain its own cap. */
  display: flow-root;
  font-size: ${theme.type.body};
  line-height: 1.7;
  color: ${theme.colors.textBody};
  margin: 0 0 1.15rem;
  /* Body copy runs the full page width and is justified; long measures keep
     the word spaces even, so no hyphenation is needed. */
  text-align: justify;
  text-justify: inter-word;
  hyphens: none;
  text-wrap: pretty;
}
.rm-prose > p + p { margin-top: 0; }
.rm-prose > p > strong:first-child { color: ${theme.colors.greenInk}; }
.rm-prose > p.rm-lead {
  font-family: ${theme.fonts.display};
  font-weight: 300;
  font-size: ${theme.type.lead};
  line-height: 1.42;
  letter-spacing: -0.005em;
  color: ${theme.colors.text};
  margin-bottom: 1.6rem;
}
/* A two-line drop cap, built to land on the line grid: the cap is 3.4em of the
   body size with a 0.76 line box, and 0.25em of bottom padding brings its
   float to exactly two body lines — so the copy under it returns to the
   column's edge instead of stepping in. Prose measures this box either way. */
.rm-prose > p:first-of-type::first-letter {
  font-family: ${theme.fonts.display};
  font-weight: 500;
  font-size: 3.6em;
  line-height: 0.78;
  float: left;
  padding: 0.06em 0.1em 0.22em 0;
  color: ${theme.colors.green};
}
.rm-prose > p.rm-lead::first-letter { font-size: inherit; float: none; color: inherit; padding: 0; }
/* A paragraph too short to hold the cap (one line) has none: the letter would
   stand beside a single line and push the rest of the page down. */
.rm-prose > p.rm-nocap::first-letter { font-size: inherit; float: none; color: inherit; padding: 0; }
.rm-prose a, .rm-callout a { color: ${theme.colors.greenDeep}; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; text-decoration-color: ${theme.colors.leafMid}; }
.rm-prose > p em, .rm-prose li em { font-style: italic; }
.rm-prose > p strong { font-weight: 600; color: ${theme.colors.ink}; }

/* ---------- pull quote: the human voice, in clay ---------- */
.rm-quote { position: relative; margin: clamp(1.8rem, 4.4vh, 2.9rem) 0; padding: 0; border-left: 0; }
/* A cut mark behind the words: punctuation, not copy. One glyph, oversized,
   in washed green, so every voice on the page opens under the same sign. */
.rm-quote::before {
  content: "\\201C";
  position: absolute;
  left: -0.08em;
  top: -0.42em;
  font-family: ${theme.fonts.serif};
  font-weight: 300;
  font-size: clamp(4rem, 7vw, 6.5rem);
  line-height: 1;
  color: ${theme.colors.green};
  opacity: 0.16;
  pointer-events: none;
  user-select: none;
}
/* Hanging punctuation. Every quotation on the page opens with a mark, and a
   mark set inside the column pushes the first word one glyph right of every
   other line, so the eye reads the edge as ragged. The mark is set outside it
   instead. 0.424em is the measured advance of the opening double quote in
   Newsreader at this weight, so the words after it start exactly on the
   column. */
.rm-quote p {
  font-family: ${theme.fonts.display};
  font-weight: 400;
  font-size: ${theme.type.quote};
  line-height: 1.3;
  letter-spacing: -0.008em;
  color: ${theme.colors.clay};
  margin: 0;
  text-wrap: balance;
  text-indent: -0.424em;
}
.rm-quote footer {
  margin-top: 1.1rem;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${theme.colors.textFaint};
}
.rm-quote footer b { color: ${theme.colors.green}; font-weight: 600; }
.rm-quote-role { display: block; margin-top: 0.3rem; color: ${theme.colors.textFaint}; }
.rm-quote--bleed {
  max-width: none;
  border-top: 1px solid ${theme.colors.line};
  border-bottom: 1px solid ${theme.colors.line};
  padding-block: clamp(2rem, 6vh, 3.4rem);
}
.rm-quote--bleed p { font-size: clamp(1.6rem, 4.1vw, 4rem); font-weight: 300; }

/* ---------- callout ---------- */
.rm-callout {
  background: ${theme.colors.moss};
  border-radius: var(--rm-r);
  padding: clamp(1.3rem, 3vw, 2rem) clamp(1.3rem, 3vw, 2.2rem);
  margin: clamp(1.8rem, 4vh, 2.6rem) 0;
}
.rm-callout h4 {
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.12em;
  color: ${theme.colors.greenDeep};
  margin: 0 0 0.6rem;
}
.rm-callout p { font-family: ${theme.fonts.serif}; font-weight: 300; font-size: 1.1rem; line-height: 1.72; color: ${theme.colors.textBody}; margin: 0; text-align: left; }
.rm-callout p em { font-style: italic; color: ${theme.colors.greenDeep}; }

/* ---------- inline ledger ---------- */
.rm-ledger { border-top: 1px solid ${theme.colors.line}; margin: clamp(2rem, 5vh, 3rem) 0; padding: 0; list-style: none; }
.rm-ledger li { display: grid; grid-template-columns: 2.4rem minmax(0, 12rem) minmax(0, 1fr); gap: 1rem; align-items: baseline; padding: 0.85rem 0; border-bottom: 1px solid ${theme.colors.lineSoft}; }
.rm-ledger .n { font-family: ${theme.fonts.sans}; font-size: ${theme.type.label}; font-weight: 600; color: ${theme.colors.green}; }
.rm-ledger .k { font-family: ${theme.fonts.serif}; font-weight: 500; font-size: 1.05rem; color: ${theme.colors.greenInk}; }
.rm-ledger .v { font-size: 1rem; line-height: 1.66; color: ${theme.colors.textDim}; }
@media (max-width: 640px) { .rm-ledger li { grid-template-columns: 1.8rem minmax(0, 1fr); } .rm-ledger .v { grid-column: 2; } }

/* ---------- figure furniture ---------- */
.rm-fig { margin: clamp(1.8rem, 4.4vh, 2.9rem) 0; }
.rm-fig-label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${theme.colors.green};
  margin: 0 0 1rem;
}
.rm-fig-label::after { content: ""; height: 1px; background: ${theme.colors.lineSoft}; flex: 1; }
.rm-fig-cap { font-family: ${theme.fonts.sans}; font-size: ${theme.type.caption}; line-height: 1.62; color: ${theme.colors.textFaint}; margin: 0.9rem 0 0; }
.rm-note {
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  line-height: 1.7;
  color: ${theme.colors.textDim};
  background: ${theme.colors.moss};
  border-radius: var(--rm-r-sm);
  padding: 1rem 1.2rem;
  margin: clamp(1.6rem, 4vh, 2.4rem) 0;
}

/* ---------- photographs ---------- */
.rm-shot { display: block; width: 100%; height: auto; border-radius: var(--rm-r); background: ${theme.colors.moss}; box-shadow: ${theme.shadow.panel}; }

/* ---------- progress ---------- */
.progress-wrap { position: fixed; inset: 0 0 auto 0; z-index: 80; pointer-events: none; }
.progress-track { height: 3px; background: ${theme.colors.lineSoft}; }
.progress-bar { height: 100%; background: ${theme.colors.leaf}; transform-origin: left; will-change: transform; }
.progress-label {
  position: absolute; top: 0.9rem; left: var(--rm-gutter);
  font-family: ${theme.fonts.sans}; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em;
  color: ${theme.colors.textFaint};
}.embed .progress-wrap { display: none; }

/* Justification needs a long measure to keep word spaces even. On a phone the
   column is about 40 characters, so it drops back to ranged-left. */
@media (max-width: 640px) {
  .rm-prose > p, .rm-callout p { text-align: left; }
}
`;
