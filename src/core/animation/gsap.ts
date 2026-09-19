import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function createScrollReveal(
  targets: HTMLElement[],
  options: {
    trigger?: HTMLElement;
    start?: string;
    end?: string;
    once?: boolean;
    scrub?: boolean | number;
    stagger?: number;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
  } = {}
): gsap.Context {
  const {
    trigger,
    start = "top 82%",
    end = "bottom top",
    once = true,
    scrub = false,
    stagger = 0.08,
    from = { opacity: 0, y: 28 },
    to = { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
  } = options;

  return gsap.context(() => {
    gsap.fromTo(targets, from, {
      ...to,
      stagger,
      overwrite: "auto",
      scrollTrigger: {
        trigger: trigger || targets[0],
        start,
        end,
        once,
        scrub,
      },
    });
  });
}

export function createStaggerReveal(
  container: HTMLElement,
  childSelector: string,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    trigger?: HTMLElement;
    start?: string;
    once?: boolean;
  } = {}
): gsap.Context {
  const children = container.querySelectorAll<HTMLElement>(childSelector);
  if (!children.length) return gsap.context(() => {});

  const { from = { opacity: 0, y: 32 }, to = { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, stagger = 0.09, trigger, start = "top 80%", once = true } = options;

  return gsap.context(() => {
    gsap.fromTo(children, from, {
      ...to,
      stagger,
      overwrite: "auto",
      scrollTrigger: { trigger: trigger || container, start, once },
    });
  });
}

export function createParallax(
  element: HTMLElement,
  options: {
    yPercent?: number;
    opacity?: number;
    trigger?: HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
): gsap.Context {
  const { yPercent = 14, opacity = 0.25, trigger, start = "top top", end = "bottom top", scrub = true } = options;

  return gsap.context(() => {
    gsap.to(element, {
      yPercent,
      opacity,
      ease: "none",
      scrollTrigger: { trigger: trigger || element, start, end, scrub },
    });
  });
}

export function createResizeObserver(
  element: HTMLElement,
  callback: () => void
): ResizeObserver | null {
  if (typeof ResizeObserver === "undefined") return null;
  const ro = new ResizeObserver(callback);
  ro.observe(element);
  return ro;
}