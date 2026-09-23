/**
 * Motion system — the single source of truth for timing and easing across the
 * site. Every animation picks a duration from one of three categories rather
 * than inventing its own number:
 *
 *   Micro     100–250ms  hover, buttons, nav, tags
 *   Editorial 500–900ms  image reveals, section entrances, story transitions
 *   Cinematic 1–2s       hero, chapter transitions, page entry
 *
 * Values are milliseconds; `S` mirrors them in seconds for GSAP.
 */
export const MOTION = {
  fast: 180,
  normal: 450,
  editorial: 700,
  cinematic: 1200,
} as const;

export const MOTION_S = {
  fast: MOTION.fast / 1000,
  normal: MOTION.normal / 1000,
  editorial: MOTION.editorial / 1000,
  cinematic: MOTION.cinematic / 1000,
} as const;

/** Standard easing curves. `standard` is the workhorse ease-out. */
export const EASING = {
  standard: "cubic-bezier(0.22, 1, 0.36, 1)",
  soft: "cubic-bezier(0.33, 0.9, 0.4, 1)",
  inOut: "cubic-bezier(0.76, 0, 0.24, 1)",
  gsap: "power3.out",
} as const;

export type MotionCategory = keyof typeof MOTION;

/** Reusable transition strings for CSS-in-TS stylesheets. */
export const PRESETS = {
  microColor: `color ${MOTION.fast}ms ${EASING.standard}`,
  editorialRise: `opacity ${MOTION.editorial}ms ${EASING.standard}, transform ${MOTION.editorial}ms ${EASING.standard}`,
  cinematicRise: `opacity ${MOTION.cinematic}ms ${EASING.inOut}, transform ${MOTION.cinematic}ms ${EASING.inOut}`,
} as const;

/**
 * CSS custom properties, injectable once at a root so plain stylesheets can use
 * the same tokens: `transition: transform var(--mo-editorial) var(--ease-std)`.
 */
export const MOTION_CSS_VARS = `
  --mo-fast: ${MOTION.fast}ms;
  --mo-normal: ${MOTION.normal}ms;
  --mo-editorial: ${MOTION.editorial}ms;
  --mo-cinematic: ${MOTION.cinematic}ms;
  --ease-std: ${EASING.standard};
  --ease-soft: ${EASING.soft};
  --ease-inout: ${EASING.inOut};
`;
