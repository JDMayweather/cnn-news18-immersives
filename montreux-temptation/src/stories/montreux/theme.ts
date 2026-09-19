export const montreuxTheme = {
  colors: {
    background: "#05070b",
    text: "#eef1f4",
    muted: "#c6d2de",
    accent: "#e0862a",
    accentSecondary: "#c0392b",
    border: "#1d2735",
    cardBg: "#0d1117",
    overlay: "rgba(5,7,11,0.55)",
  },
  typography: {
    display: '"Arial Narrow", "Helvetica Neue", system-ui, sans-serif',
    body: "system-ui, sans-serif",
    kicker: '"Arial Narrow", "Helvetica Neue", system-ui, sans-serif',
  },
  spacing: {
    sectionPadding: "8vh 6vw",
    mobileSectionPadding: "4vh 5vw",
    containerMaxWidth: "1200px",
    proseMaxWidth: "68ch",
  },
  gradients: {
    hero: [
      "radial-gradient(60rem 30rem at 85% 4%, rgba(224,134,42,0.08), transparent 60%)",
      "radial-gradient(50rem 28rem at 8% 32%, rgba(80,140,200,0.07), transparent 60%)",
      "radial-gradient(55rem 30rem at 90% 62%, rgba(224,134,42,0.06), transparent 60%)",
      "radial-gradient(50rem 26rem at 10% 88%, rgba(80,140,200,0.06), transparent 60%)",
    ].join(", "),
    chapterMontreux: "linear-gradient(180deg, transparent, rgba(224,134,42,0.05) 30%, transparent)",
    chapterIndia: "linear-gradient(180deg, transparent, rgba(80,140,200,0.06) 40%, transparent)",
    chapterBrics: "linear-gradient(180deg, transparent, rgba(224,134,42,0.07))",
  },
};