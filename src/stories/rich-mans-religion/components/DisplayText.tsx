import { useEffect, useRef, useState } from "react";
import { isEmbedMode, prefersReducedMotion } from "@/core/responsive/viewport";

/**
 * Display type, set line by line with Pretext.
 *
 * Prose.tsx already uses @chenglou/pretext to measure body copy; this is the
 * same engine pointed at display moments instead — chapter titles and the
 * full-screen quotations. The module is loaded lazily and shared (Prose keeps
 * the same dynamic import), so this adds no new dependency and no new network
 * cost beyond what the story already pays.
 *
 * Why Pretext rather than a SplitText-style splitter: the lines it returns are
 * the lines the browser would set at this width, so a staggered line reveal
 * never re-wraps mid-animation. The words are identical either way — if the
 * module cannot load, or measurement throws, the text renders whole.
 *
 * Body copy is never animated beyond Prose's quiet entry reveal. Only display
 * text gets the kinetic treatment.
 */

type Pretext = typeof import("@chenglou/pretext");

export default function DisplayText({
  text,
  className,
}: {
  text: string;
  className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (prefersReducedMotion() || isEmbedMode() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    let cancelled = false;
    let frame = 0;
    let lastWidth = 0;

    const compute = async (): Promise<void> => {
      try {
        const mod: Pretext = await import("@chenglou/pretext");
        if (cancelled || !ref.current) return;
        const cs = getComputedStyle(ref.current);
        const width = ref.current.getBoundingClientRect().width;
        if (!(width > 60)) return;
        lastWidth = width;
        const size = parseFloat(cs.fontSize) || 16;
        const family = (cs.fontFamily.split(",")[0] || "serif").trim();
        const font = `${cs.fontWeight} ${size}px ${family}`;
        const lh = cs.lineHeight.endsWith("px") ? parseFloat(cs.lineHeight) : size * 1.2;
        const prepared = mod.prepareWithSegments(text, font, {});
        const laid = mod.layoutWithLines(prepared, Math.max(80, width - 2), lh);
        /* A single line needs no split — plain text reveals as one block. */
        if (!cancelled) setLines(laid.lines.length > 1 ? laid.lines.map((l) => l.text) : null);
      } catch {
        if (!cancelled) setLines(null);
      }
    };

    compute();
    const schedule = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = ref.current?.getBoundingClientRect().width ?? 0;
        if (Math.abs(w - lastWidth) > 2) {
          setLines(null);
          compute();
        }
      });
    };
    window.addEventListener("resize", schedule);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      io.disconnect();
    };
  }, [text]);

  return (
    <span ref={ref} className={className} data-shown={shown ? "on" : undefined}>
      {lines
        ? lines.map((line, i) => (
            <span key={i} className="rm-dline" aria-hidden={i > 0}>
              <span style={{ "--i": Math.min(i, 8) } as React.CSSProperties}>{line}</span>
            </span>
          ))
        : text}
    </span>
  );
}
