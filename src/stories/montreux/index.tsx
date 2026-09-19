import Hero from "./sections/Hero";
import Question from "./sections/Question";
import WarTimeline from "./sections/WarTimeline";
import Montreux from "./sections/Montreux";
import TollTest from "./sections/TollTest";
import Sovereignty from "./sections/Sovereignty";
import India from "./sections/India";
import Brics from "./sections/Brics";
import ProgressIndicator from "@/components/ProgressIndicator";
import MoreImmersives from "@/components/MoreImmersives";
import { sendResizeMessage } from "@/core/messaging/iframe";
import { isEmbedMode } from "@/core/responsive/viewport";

export const metadata = {
  slug: "montreux",
  title: "The Montreux Temptation",
  description: "Can Iran Turn Hormuz Into A Treaty-Governed Toll Strait?",
  author: "Anoshito Banerjee",
  publishedAt: "2026-09-18",
  tags: ["Iran", "Strait of Hormuz", "Montreux Convention", "Geopolitics"],
  readTimeMinutes: 12,
};

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

  // Cleanup function (not used by React since this isn't a useEffect)
  const cleanup = () => {
    window.removeEventListener("resize", send);
    window.removeEventListener("load", onLoad);
    timeouts.forEach((t) => window.clearTimeout(t));
    ro?.disconnect();
  };

  // Store cleanup for potential manual cleanup if needed
  (window as any).__immersiveCleanup = cleanup;
}

export default function MontreuxStory(): React.JSX.Element {
  useEmbedResize();

  return (
    <main className="immersive">
      <ProgressIndicator />
      <Hero />
      <Question />
      <WarTimeline />
      <Montreux />
      <TollTest />
      <Sovereignty />
      <India />
      <Brics />
      <MoreImmersives currentSlug="montreux" />
      <footer className="footer">
        <div className="footer-inner">
          <p>Photographs credited individually. Maps and illustrations for editorial use.</p>
        </div>
      </footer>
      <div className="grain" aria-hidden="true" />
    </main>
  );
}