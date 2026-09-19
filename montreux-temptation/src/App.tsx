import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ProgressIndicator from "./components/ProgressIndicator";
import { registerStory, getStory, createNotFoundStory, isValidStorySlug } from "./router/stories";
import { isEmbedMode, prefersReducedMotion } from "./core/responsive/viewport";
import { sendResizeMessage } from "./core/messaging/iframe";
import MontreuxStory, { metadata as montreuxMetadata } from "./stories/montreux";
import "./styles/immersive.css";

gsap.registerPlugin(ScrollTrigger);

registerStory("montreux", {
  default: MontreuxStory,
  metadata: montreuxMetadata,
});

function useLenis(): void {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    document.documentElement.classList.add("js");
    if (isEmbedMode() || prefersReducedMotion()) {
      document.documentElement.classList.add("no-motion");
      return;
    }
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number): void => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

function useScrollReveal(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isEmbedMode()) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".chapter").forEach((section) => {
        const kids = section.querySelectorAll(":scope > h2, :scope > p, :scope > .cards, :scope > .fig");
        if (!kids.length) return;
        gsap.fromTo(
          kids,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.09,
            overwrite: "auto",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".cards .card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotate: i === 0 ? -1.5 : 1.5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
}

function useEmbedResize(): void {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (!isEmbedMode()) return;
    document.documentElement.classList.add("embed");
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
    return () => {
      window.removeEventListener("resize", send);
      window.removeEventListener("load", onLoad);
      timeouts.forEach((t) => window.clearTimeout(t));
      ro?.disconnect();
    };
  }, []);
}

function StoryWrapper({ slug }: { slug: string }) {
  const story = getStory(slug);
  const NotFound = createNotFoundStory();
  const Component = story?.default ?? NotFound;
  return <Component />;
}

function AppRoutes() {
  const location = useLocation();
  const slug = location.pathname.slice(1) || "montreux";

  if (!isValidStorySlug(slug)) {
    return <createNotFoundStory() />;
  }

  return <StoryWrapper slug={slug} />;
}

export default function App(): React.JSX.Element {
  useLenis();
  useScrollReveal();
  useEmbedResize();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}