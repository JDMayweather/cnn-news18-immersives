import { useEffect } from "react";
import Hero from "./components/Hero";
import { refreshOnFonts, useRiseObserver } from "./components/motion";
import Chapter from "./components/Chapter";
import Closing from "./components/Closing";
import Atmosphere from "./components/Atmosphere";
import AmbientAudio from "./components/AmbientAudio";
import ProgressIndicator from "@/components/ProgressIndicator";
import MoreImmersives from "@/components/MoreImmersives";
import { sendResizeMessage } from "@/core/messaging/iframe";
import { isEmbedMode, prefersReducedMotion } from "@/core/responsive/viewport";
import { CHAPTERS } from "./assets/article";
import { globalCss } from "./theme";
import { componentCss } from "./components/styles";

export const metadata = {
  slug: "rich-mans-religion",
  /* The source's own opening line, word for word. */
  title: "Rich Man's Religion: How Cricket's Cost Makes It Out-Of-Reach To Half Of India",
  description:
    "An investigation into how the rising cost of cricket equipment, training, and infrastructure excludes millions of talented youngsters from marginalised communities.",
  author: "Rudransh Khurana",
  publishedAt: "2026-09-18",
  tags: ["Cricket", "Inequality", "Sports", "Caste", "Economics", "Youth"],
  readTimeMinutes: 26,
};

/* The shell never touches document.title; this story carries the article's
   own headline into the tab. */
function useDocumentTitle(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = metadata.title;
  }, []);
}

function useEmbedResize(): void {
  const embed = isEmbedMode();
  if (typeof window === "undefined" || !embed) return;

  const send = (): void => {
    const h = Math.min(document.documentElement?.scrollHeight ?? 0, 40000);
    sendResizeMessage(h);
  };

  send();

  let ro: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined" && document.body) {
    ro = new ResizeObserver(send);
    ro.observe(document.body);
  }

  const onLoad = () => send();
  window.addEventListener("resize", send);
  window.addEventListener("load", onLoad);

  const timeouts = [500, 2500, 5000, 8000, 12000].map((t) => window.setTimeout(send, t));
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => send()).catch(() => undefined);
  }

  const cleanup = (): void => {
    window.removeEventListener("resize", send);
    window.removeEventListener("load", onLoad);
    timeouts.forEach((t) => window.clearTimeout(t));
    ro?.disconnect();
  };

  (window as unknown as { __immersiveCleanup?: () => void }).__immersiveCleanup = cleanup;
}

/* The full-screen statements lean a little toward the cursor — a slow, small
   parallax that gives the pivots life without moving the type off its axis.
   Pointer-fine only, and never under reduced motion or in an embed. */
function useQuoteTilt(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isEmbedMode() || prefersReducedMotion()) return;
    if (typeof matchMedia !== "function" || !matchMedia("(pointer: fine)").matches) return;

    const quotes = Array.from(document.querySelectorAll<HTMLElement>(".rm-quote--screen"));
    const cleanups: Array<() => void> = [];
    for (const q of quotes) {
      const p = q.querySelector<HTMLElement>("p");
      if (!p) continue;
      const move = (e: PointerEvent): void => {
        const r = q.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        p.style.setProperty("--qx", `${(dx * 12).toFixed(2)}px`);
        p.style.setProperty("--qy", `${(dy * 7).toFixed(2)}px`);
        p.style.setProperty("--qr", `${(dx * 1.1).toFixed(2)}deg`);
      };
      const leave = (): void => {
        p.style.setProperty("--qx", "0px");
        p.style.setProperty("--qy", "0px");
        p.style.setProperty("--qr", "0deg");
      };
      q.addEventListener("pointermove", move);
      q.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        q.removeEventListener("pointermove", move);
        q.removeEventListener("pointerleave", leave);
      });
    }
    return () => cleanups.forEach((c) => c());
  }, []);
}

export default function RichMansReligion(): React.JSX.Element {
  useDocumentTitle();
  useEmbedResize();
  useRiseObserver();
  useQuoteTilt();
  useEffect(() => refreshOnFonts(), []);

  return (
    <main className="immersive rm">
      <style id="rm-styles">{globalCss + componentCss}</style>
      <Atmosphere />
      <div className="rm-grain" aria-hidden="true" />
      <ProgressIndicator />
      <Hero />
      {CHAPTERS.map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i} />
      ))}
      <Closing />
      <AmbientAudio />
      <MoreImmersives currentSlug="rich-mans-religion" />
    </main>
  );
}
