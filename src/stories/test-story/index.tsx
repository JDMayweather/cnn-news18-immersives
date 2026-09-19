import Hero from "./sections/Hero";
import Content from "./sections/Content";
import ProgressIndicator from "@/components/ProgressIndicator";
import { sendResizeMessage } from "@/core/messaging/iframe";
import { isEmbedMode } from "@/core/responsive/viewport";

export const metadata = {
  slug: "test-story",
  title: "Architecture Test Story",
  description: "Validating the multi-story immersive publishing platform",
  author: "Test Author",
  publishedAt: "2026-09-18",
  tags: ["test", "architecture", "platform"],
  hidden: true,
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

  const cleanup = () => {
    window.removeEventListener("resize", send);
    window.removeEventListener("load", onLoad);
    timeouts.forEach((t) => window.clearTimeout(t));
    ro?.disconnect();
  };

  (window as any).__immersiveCleanup = cleanup;
}

export default function TestStory(): React.JSX.Element {
  useEmbedResize();

  return (
    <main className="immersive" style={{ background: "#f8fafc", color: "#1a1a2e" }}>
      <ProgressIndicator />
      <Hero />
      <Content />
      <footer style={{
        padding: "4rem 2rem",
        textAlign: "center",
        borderTop: "1px solid #e5e7eb",
        background: "#ffffff",
        color: "#9ca3af",
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: "0.875rem",
      }}>
        <p>Test story for architecture validation. Photographs and illustrations for editorial use.</p>
      </footer>
    </main>
  );
}