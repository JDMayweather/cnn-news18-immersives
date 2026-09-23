/**
 * Why Tamil Nadu Has No Navodaya Schools — design tokens.
 *
 * Design read: a civic-documentary explainer about a language standoff. The
 * register is the record — a dossier page, not a magazine spread. This theme
 * is deliberately its own identity, not the Rich Man read recoloured.
 *
 * Locks (documented so they do not drift):
 *  - Page theme lock: LIGHT, warm document stock. Dark chapters and the hero
 *    are the ink grounds, with their own on-dark type tokens.
 *  - Shape lock: hard-edged. Panels 6px, small elements 4px, tags pill only.
 *    Sharp corners read as filed paper, not soft cards.
 *  - Type lock: Spectral for the read, Noto Serif Tamil for Tamil script,
 *    IBM Plex Mono for every label, kicker and caption (the record's hand).
 *    Prose is ranged-left; titles are roman, never the italic display of the
 *    other read.
 *  - Colour lock, two hues with two jobs, never mixed:
 *      ink-indigo = the structure, the state system, the national side
 *      ochre/vermilion = the Tamil accent, the lone exception, emphasis
 */

export const theme = {
  colors: {
    /* paper: a warm document stock — a dossier page, not newsprint. */
    paper: "#f3efe4",
    paperAlt: "#ebe5d6",
    paperPanel: "#faf7ef",
    moss: "#e5ddca",
    mossDeep: "#d6ccb4",

    /* ink: deep navy, the register of the record and the state system */
    ink: "#141b2e",
    text: "#1e2438",
    textBody: "#333b52",
    textDim: "#565d73",
    textFaint: "#6c7288",

    /* structure */
    line: "rgba(22, 29, 49, 0.15)",
    lineSoft: "rgba(22, 29, 49, 0.07)",
    lineStrong: "rgba(22, 29, 49, 0.3)",

    /* "green" keeps its key but is now ink-indigo: the structure hue —
       kickers, section numbers, labels, the national/system side. */
    green: "#26304d",
    greenDeep: "#1b2440",
    greenInk: "#20283f",
    leaf: "#4a5680",
    leafMid: "#818aa6",
    leafSoft: "#d9dbe8",

    /* "clay" keeps its key but is now ochre/vermilion: the Tamil accent —
       the human voice, the lone exception, emphasis. */
    clay: "#b8461f",
    claySoft: "#f0dcc9",

    /* on the dark ground (hero scrim, dark chapters): light-on-ink tokens. */
    onDark: "#f4f1e8",
    onDarkDim: "rgba(244, 241, 232, 0.86)",
    onDarkFaint: "rgba(244, 241, 232, 0.66)",
    onDarkAccent: "#e0a15f",
    onDarkLine: "rgba(244, 241, 232, 0.16)",
  },

  fonts: {
    /* A bold, contemporary poster system — no serif. Anek Latin carries the
       display and the read; Anek Tamil shapes Tamil script in matching weights;
       IBM Plex Mono is the record's hand for every docket, label and caption. */
    serif: '"Anek Latin", "Anek Tamil", "Segoe UI", system-ui, sans-serif',
    display: '"Anek Latin", "Anek Tamil", "Segoe UI", system-ui, sans-serif',
    tamil: '"Anek Tamil", "Anek Latin", system-ui, sans-serif',
    sans: '"IBM Plex Mono", ui-monospace, "Cascadia Mono", "Segoe UI", monospace',
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
    heroTitle: "clamp(2.4rem, 6.2vw, 5.4rem)",
    chapterTitle: "clamp(2rem, 5vw, 3.9rem)",
    subhead: "clamp(1.3rem, 2.4vw, 2rem)",
    standfirst: "clamp(1.08rem, 1.8vw, 1.62rem)",
    body: "clamp(1.06rem, 1.15vw + 0.55rem, 1.32rem)",
    lead: "clamp(1.25rem, 2vw, 1.9rem)",
    quote: "clamp(1.35rem, 2.6vw, 2.4rem)",
    numeral: "clamp(2.4rem, 6vw, 4.8rem)",
    label: "0.95rem",
    caption: "1rem",
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

  radius: { panel: "6px", small: "4px", pill: "999px" },

  shadow: {
    panel: "0 8px 24px rgba(16, 23, 40, 0.09)",
    lift: "0 16px 40px rgba(16, 23, 40, 0.14)",
  },

  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    soft: "cubic-bezier(0.33, 0.9, 0.4, 1)",
  },
} as const;

export const SHAPE_RULE = `${theme.radius.panel} panels, ${theme.radius.small} small, pill tags, always rounded`;

export const globalCss = `
.nv {
  --nv-gutter: ${theme.space.gutter};
  --nv-r: ${theme.radius.panel};
  --nv-r-sm: ${theme.radius.small};
  position: relative;
  background: ${theme.colors.ink};
  color: ${theme.colors.onDark};
  font-family: ${theme.fonts.serif};
  font-size: 100%;
  -webkit-font-smoothing: antialiased;
  font-optical-sizing: auto;
  text-rendering: optimizeLegibility;
  overflow-x: clip;
}
.nv ::selection { background: ${theme.colors.clay}; color: ${theme.colors.onDark}; }

/* ---------- layout ---------- */
.nv-wrap { width: 100%; max-width: none; padding-inline: var(--nv-gutter); }
.nv-chapter { position: relative; padding-block: ${theme.space.sectionY}; }

/* ---------- chapter head ---------- */
.nv-head { position: relative; margin: 0 0 clamp(2rem, 5vh, 3.4rem); }
.nv-num {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.16em;
  color: ${theme.colors.onDarkAccent};
  margin: 0 0 0.9rem;
}
.nv-h2 {
  font-family: ${theme.fonts.display};
  /* Heavy poster grotesque, tight and upright — a broadsheet headline, not a
     literary serif. Anek's 800 weight carries the confrontation. */
  font-style: normal;
  font-weight: 800;
  font-size: ${theme.type.chapterTitle};
  line-height: 0.98;
  letter-spacing: -0.02em;
  margin: 0;
  color: ${theme.colors.onDark};
  text-transform: uppercase;
  text-wrap: balance;
}
.nv-h2 em { font-style: normal; color: ${theme.colors.clay}; }
.nv-chapter { counter-reset: rmh3; }
.nv-h3 {
  counter-increment: rmh3;
  font-family: ${theme.fonts.display};
  font-weight: 700;
  font-size: ${theme.type.subhead};
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 2.4rem 0 0.9rem;
  padding-top: 1.1rem;
  border-top: 1px solid ${theme.colors.onDarkLine};
  color: ${theme.colors.onDark};
  text-wrap: balance;
}
/* Subheads carry their own section number in the mono hand — a filed marker. */
.nv-h3::before {
  content: "§ " counter(rmh3, decimal-leading-zero);
  display: block;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.16em;
  color: ${theme.colors.onDarkAccent};
  margin-bottom: 0.55rem;
}
.nv-standfirst {
  font-family: ${theme.fonts.serif};
  font-weight: 400;
  font-size: ${theme.type.standfirst};
  line-height: 1.55;
  color: ${theme.colors.onDarkDim};
  margin: 1.3rem 0 0;
  text-wrap: pretty;
}

/* ---------- prose ---------- */
.nv-prose { font-family: ${theme.fonts.serif}; }
.nv-prose > p {
  display: flow-root;
  font-size: ${theme.type.body};
  font-weight: 400;
  line-height: 1.72;
  color: ${theme.colors.onDarkDim};
  margin: 0 0 1.15rem;
  /* Ranged-left, hard left edge — a broadsheet column, never justified. */
  text-align: left;
  hyphens: none;
  text-wrap: pretty;
  max-width: 62rem;
}
.nv-prose > p + p { margin-top: 0; }
.nv-prose > p > strong:first-child { color: ${theme.colors.onDark}; }
.nv-prose > p.nv-lead {
  font-family: ${theme.fonts.display};
  font-weight: 500;
  font-size: ${theme.type.lead};
  line-height: 1.32;
  letter-spacing: -0.01em;
  color: ${theme.colors.onDark};
  margin-bottom: 1.6rem;
  max-width: 64rem;
}
.nv-prose > p:first-of-type::first-letter { font-size: inherit; float: none; color: inherit; padding: 0; font-weight: inherit; }
.nv-prose > p.nv-lead::first-letter { font-size: inherit; float: none; color: inherit; padding: 0; }
.nv-prose > p.nv-nocap::first-letter { font-size: inherit; float: none; color: inherit; padding: 0; }
.nv-prose a, .nv-callout a { color: ${theme.colors.onDarkAccent}; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; text-decoration-color: ${theme.colors.clay}; transition: text-decoration-color 0.3s ${theme.motion.ease}, text-underline-offset 0.3s ${theme.motion.ease}; }
.nv-prose a:hover, .nv-callout a:hover { text-decoration-color: ${theme.colors.onDark}; text-underline-offset: 5px; }
.nv-prose > p em, .nv-prose li em { font-style: italic; }
.nv-prose > p strong { font-weight: 700; color: ${theme.colors.onDark}; }

/* ---------- pull quote: a statement on the record, set as a poster ----------
   No decorative quotation glyphs. A heavy grotesque block under a short ochre
   rule, ranged left, with a mono attribution — the voice stated flat. */
.nv-quote { position: relative; margin: clamp(3rem, 7vh, 5rem) 0; padding: 0; }
.nv-quote::before { content: ""; display: block; width: 3rem; height: 3px; background: ${theme.colors.clay}; margin-bottom: clamp(1rem, 2.4vh, 1.5rem); }
.nv-quote p::after { content: none; }
.nv-quote p {
  font-family: ${theme.fonts.display};
  font-weight: 700;
  font-size: ${theme.type.quote};
  line-height: 1.16;
  letter-spacing: -0.02em;
  color: ${theme.colors.onDark};
  margin: 0;
  text-wrap: pretty;
  text-indent: 0;
  padding-left: 0;
}
.nv-quote footer {
  margin-top: 1.1rem;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 500;
  letter-spacing: 0.06em;
  color: ${theme.colors.onDarkAccent};
  text-transform: uppercase;
}
.nv-quote footer b { color: ${theme.colors.onDark}; font-weight: 600; }
.nv-quote-role { display: block; margin-top: 0.3rem; color: ${theme.colors.onDarkFaint}; }
.nv-quote--bleed {
  max-width: none;
  border-top: 1px solid ${theme.colors.onDarkLine};
  border-bottom: 1px solid ${theme.colors.onDarkLine};
  padding-block: clamp(2rem, 6vh, 3.4rem);
}
.nv-quote--bleed p { font-size: clamp(1.8rem, 4.5vw, 4.4rem); font-weight: 800; }

/* ---------- callout ---------- */
.nv-callout {
  background: ${theme.colors.moss};
  border-radius: var(--nv-r);
  padding: clamp(1.3rem, 3vw, 2rem) clamp(1.3rem, 3vw, 2.2rem);
  margin: clamp(1.8rem, 4vh, 2.6rem) 0;
}
.nv-callout h4 {
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.12em;
  color: ${theme.colors.greenDeep};
  margin: 0 0 0.6rem;
}
.nv-callout p { font-family: ${theme.fonts.serif}; font-weight: 300; font-size: 1.1rem; line-height: 1.72; color: ${theme.colors.textBody}; margin: 0; text-align: left; }
.nv-callout p em { font-style: italic; color: ${theme.colors.greenDeep}; }

/* ---------- inline ledger ---------- */
.nv-ledger { border-top: 1px solid ${theme.colors.line}; margin: clamp(2rem, 5vh, 3rem) 0; padding: 0; list-style: none; }
.nv-ledger li { display: grid; grid-template-columns: 2.4rem minmax(0, 12rem) minmax(0, 1fr); gap: 1rem; align-items: baseline; padding: 0.85rem 0; border-bottom: 1px solid ${theme.colors.lineSoft}; }
.nv-ledger .n { font-family: ${theme.fonts.sans}; font-size: ${theme.type.label}; font-weight: 600; color: ${theme.colors.green}; }
.nv-ledger .k { font-family: ${theme.fonts.serif}; font-weight: 500; font-size: 1.05rem; color: ${theme.colors.greenInk}; }
.nv-ledger .v { font-size: 1rem; line-height: 1.66; color: ${theme.colors.textDim}; }
@media (max-width: 640px) { .nv-ledger li { grid-template-columns: 1.8rem minmax(0, 1fr); } .nv-ledger .v { grid-column: 2; } }

/* ---------- figure furniture ---------- */
.nv-fig { margin: clamp(1.8rem, 4.4vh, 2.9rem) 0; }
.nv-fig-label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${theme.fonts.sans};
  font-size: ${theme.type.label};
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.onDarkAccent};
  margin: 0 0 1rem;
}
.nv-fig-label::after { content: ""; height: 1px; background: ${theme.colors.onDarkLine}; flex: 1; }
.nv-fig-cap { font-family: ${theme.fonts.sans}; font-size: ${theme.type.caption}; line-height: 1.62; color: ${theme.colors.onDarkFaint}; margin: 0.9rem 0 0; }
.nv-note {
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  line-height: 1.7;
  color: ${theme.colors.textDim};
  background: ${theme.colors.moss};
  border-radius: var(--nv-r-sm);
  padding: 1rem 1.2rem;
  margin: clamp(1.6rem, 4vh, 2.4rem) 0;
}

/* ---------- photographs ---------- */
.nv-shot { display: block; width: 100%; height: auto; border-radius: var(--nv-r); background: ${theme.colors.moss}; box-shadow: ${theme.shadow.panel}; }

/* ---------- progress ---------- */
.progress-wrap { position: fixed; inset: 0 0 auto 0; z-index: 80; pointer-events: none; }
.progress-track { height: 3px; background: ${theme.colors.onDarkLine}; }
.progress-bar { height: 100%; background: ${theme.colors.clay}; transform-origin: left; will-change: transform; }
.progress-label {
  position: absolute; top: 0.75rem; left: var(--nv-gutter);
  font-family: ${theme.fonts.sans}; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
  color: ${theme.colors.onDark};
  padding: 0.42rem 0.8rem;
  background: rgba(10, 15, 26, 0.6);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid ${theme.colors.onDarkLine};
  border-radius: 0;
}

@media (max-width: 640px) {
  .nv-prose > p, .nv-callout p, .closing-body { text-align: left; }
}
`;
