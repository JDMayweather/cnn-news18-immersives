import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/core/responsive/viewport";

gsap.registerPlugin(ScrollTrigger);

/**
 * Soft reveals. Every `.rm-rise` in the story fades up once, on entry, with a
 * short transition instead of a tween. Many quiet entrances read calmer than a
 * few loud ones, and there is no per-element effect to clean up.
 */
export function useRiseObserver(): void {
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".rm-rise:not(.is-in)"));
    if (!elements.length) return;

    if (prefersReducedMotion()) {
      elements.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * Runs a GSAP scene scoped to one element, and never in reduced-motion mode
 * (there the markup renders in its final state). The embed behaves like the
 * native page, so scenes run there too.
 */
export function useScene<T extends HTMLElement>(build: (root: T) => void): React.RefObject<T> {
  const ref = useRef<T | null>(null);
  const buildRef = useRef(build);
  buildRef.current = build;

  const reduced = prefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || typeof window === "undefined") return;
    const ctx = gsap.context(() => buildRef.current(root), root);
    return () => ctx.revert();
  }, [reduced]);

  return ref as React.RefObject<T>;
}

/**
 * Draws SVG strokes that carry `pathLength={1}`:
 * the element is drawn on as it enters the viewport, or scrubbed to scroll.
 */
export function drawPaths(
  root: HTMLElement,
  selector: string,
  opts: { stagger?: number; scrub?: boolean; start?: string; duration?: number } = {},
): void {
  const paths = gsap.utils.toArray<SVGGeometryElement>(root.querySelectorAll(selector));
  if (!paths.length) return;

  const { stagger = 0.12, scrub = false, start = "top 80%", duration = 1.1 } = opts;

  gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });

  paths.forEach((path, i) => {
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: scrub ? 1 : duration,
      ease: scrub ? "none" : "power2.inOut",
      delay: scrub ? 0 : i * stagger,
      scrollTrigger: {
        trigger: root,
        start: scrub ? "top bottom" : start,
        end: scrub ? "bottom top" : undefined,
        scrub: scrub ? 0.6 : false,
        once: !scrub,
      },
    });
  });
}

/** Counts a numeral up once, on entry. Falls back to the final value. */
export function countUp(
  root: HTMLElement,
  selector: string,
  opts: { duration?: number; start?: string; format?: (n: number) => string } = {},
): void {
  const { duration = 1.6, start = "top 85%", format = (n: number) => Math.round(n).toLocaleString("en-IN") } = opts;

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector)).forEach((el) => {
    const target = Number(el.dataset.value ?? "0");
    if (!Number.isFinite(target)) return;
    const state = { n: 0 };
    /* The tween renders once at progress 0 when the ScrollTrigger is created,
       which would leave a reported figure reading zero until the reader
       scrolls to it. Hold the markup's real number until playback starts. */
    let started = false;
    gsap.to(state, {
      n: target,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start, once: true },
      onStart: () => {
        started = true;
      },
      onUpdate: () => {
        if (!started) return;
        el.textContent = format(state.n);
      },
      onComplete: () => {
        el.textContent = format(target);
      },
    });
  });
}

/**
 * Trigger positions are measured before the webfonts land, and both faces
 * change line heights. Recompute once, after the fonts settle.
 */
export function refreshOnFonts(): void {
  if (typeof document === "undefined" || !document.fonts?.ready) return;
  document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
}

/** One parallax layer per scene, at most. Depth, not decoration. */
export function parallax(root: HTMLElement, selector: string, yPercent = 12): void {
  const el = root.querySelector<HTMLElement>(selector);
  if (!el) return;
  gsap.to(el, {
    yPercent,
    ease: "none",
    scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
  });
}
