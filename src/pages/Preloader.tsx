import { useEffect, useRef, useState } from "react";
import { getAllStories } from "@/router/stories";

/**
 * The homepage intro. A newswire "incoming" feed cycles the real immersive
 * headlines while a counter climbs 0→100; at full, an interlocking column
 * curtain (alternating up/down teeth) parts to reveal the page.
 *
 * Plays once per full page load (not on SPA back-navigation); reduced-motion
 * skips it entirely, and it self-removes on a hard timeout no matter what.
 */
const COLUMNS = 7;

let hasPlayed = false;

function shouldSkip(): boolean {
  if (typeof window === "undefined") return true;
  if (hasPlayed) return true;
  if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

const TITLES: string[] = (() => {
  try {
    return getAllStories()
      .filter((s) => !s.metadata.hidden)
      .map((s) => s.metadata.title.toUpperCase());
  } catch {
    return [];
  }
})();

export default function Preloader(): React.JSX.Element | null {
  const [gone, setGone] = useState<boolean>(() => shouldSkip());
  const [count, setCount] = useState(0);
  const [wire, setWire] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (gone) return;
    hasPlayed = true;
    document.documentElement.style.overflow = "hidden";

    const DURATION = 2400;
    const t0 = performance.now();
    const tick = (now: number): void => {
      const p = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setLeaving(true);
    };
    raf.current = requestAnimationFrame(tick);

    const wireTimer = TITLES.length
      ? window.setInterval(() => setWire((w) => (w + 1) % TITLES.length), 360)
      : 0;
    const kill = window.setTimeout(() => setLeaving(true), DURATION + 1600);
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearInterval(wireTimer);
      window.clearTimeout(kill);
      document.documentElement.style.overflow = "";
    };
  }, [gone]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => {
      setGone(true);
      document.documentElement.style.overflow = "";
    }, 1000);
    return () => window.clearTimeout(t);
  }, [leaving]);

  useEffect(() => {
    if (!gone) return;
    /* Tell the page the intro is over so staged entrances (the hero sequence)
       can begin — on skip this fires on mount, so the hero never waits. */
    document.documentElement.classList.add("intro-done");
    document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <div className={`preloader${leaving ? " is-leaving" : ""}`} aria-hidden="true">
      <div className="preloader-cols">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <span className="preloader-col" style={{ ["--i" as string]: i }} key={i} />
        ))}
      </div>
      <div className="preloader-inner">
        <span className="preloader-brand">
          <b>CNN NEWS18</b> IMMERSIVES
        </span>
        <span className="preloader-count" style={{ ["--count-fill" as string]: `${count}%` }}>
          {String(count).padStart(3, "0")}
        </span>
        <span className="preloader-wire">
          <i className="preloader-live" aria-hidden="true" /> INCOMING
          <span className="preloader-wire-title">{TITLES[wire] ?? "LOADING THE STORIES"}</span>
        </span>
      </div>
      <span className="preloader-scan" aria-hidden="true" />
    </div>
  );
}
