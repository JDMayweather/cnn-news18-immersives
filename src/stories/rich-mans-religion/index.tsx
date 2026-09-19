import { useEffect } from "react";
import Hero from "./components/Hero";
import { refreshOnFonts, useRiseObserver } from "./components/motion";
import Chapter from "./components/Chapter";
import Closing from "./components/Closing";
import ProgressIndicator from "@/components/ProgressIndicator";
import MoreImmersives from "@/components/MoreImmersives";
import { sendResizeMessage } from "@/core/messaging/iframe";
import { isEmbedMode } from "@/core/responsive/viewport";
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

export default function RichMansReligion(): React.JSX.Element {
  useDocumentTitle();
  useEmbedResize();
  useRiseObserver();
  useEffect(() => refreshOnFonts(), []);

  return (
    <main className="immersive rm">
      <style id="rm-styles">{globalCss + componentCss}</style>
      <div className="rm-grain" aria-hidden="true" />
      <ProgressIndicator />
      <Hero />
      {CHAPTERS.map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i} />
      ))}
      <Closing />
      <MoreImmersives currentSlug="rich-mans-religion" />
    </main>
  );
}
