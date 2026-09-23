import { useEffect } from "react";
import gsap from "gsap";
import { useScene } from "./motion";
import { prefersReducedMotion } from "@/core/responsive/viewport";
import { META, SHOTS, IMAGE_CREDITS } from "../assets/article";

/**
 * The opening: the Supreme Court of India under a darkening scrim, so the type
 * sits on near-ink and reads at full contrast. Eyebrow, headline, deck, one
 * action — and a single fact card: the lone exception.
 */
export default function Hero(): React.JSX.Element {
  const ref = useScene<HTMLElement>((root) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(root.querySelectorAll(".h-line"), { yPercent: 114, duration: 1.15, stagger: 0.09 })
      .from(root.querySelectorAll(".h-fade"), { opacity: 0, y: 18, duration: 0.95, stagger: 0.1 }, 0.4);
  });

  /* A soft ochre spotlight follows the cursor over the photograph — a quiet
     depth cue, pointer-fine only and never under reduced motion. */
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;
    if (typeof matchMedia !== "function" || !matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent): void => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [ref]);

  return (
    <header className="hero" ref={ref}>
      <img className="hero-video" src={SHOTS.supremeCourt} alt="" aria-hidden="true" loading="eager" decoding="async" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="nv-wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow h-fade">
            <span>EXPLAINER</span>
            <span className="hero-eyebrow-ta" lang="ta">தமிழ் · English · हिन्दी</span>
          </p>

          <h1 className="nv-hero-title">
            <span className="h-mask">
              <span className="h-line">Why Tamil Nadu Has</span>
            </span>
            <span className="h-mask">
              <span className="h-line h-line--accent">No Navodaya Schools</span>
            </span>
          </h1>

          <p className="hero-deck h-fade">{META.subtitle}</p>

          <div className="hero-foot h-fade">
            <a className="hero-go" href="#prologue">
              Begin reading
            </a>
            <p className="hero-meta">
              <span className="hero-byline">{META.byline}</span>
              {META.published} &middot; {META.readTime}
            </p>
          </div>
        </div>

        <figure className="hero-fig h-fade">
          {/* A rejected-stamp seal: Navodaya, struck through — the state's
              standing refusal, stated as a mark. */}
          <svg className="nv-seal" viewBox="0 0 220 220" role="img" aria-label="A seal reading Navodaya, struck through — Tamil Nadu has rejected the scheme.">
            <circle cx="110" cy="110" r="96" fill="none" stroke="#d33a2c" strokeWidth="3" />
            <circle cx="110" cy="110" r="82" fill="none" stroke="#d33a2c" strokeWidth="1.4" />
            <text className="nv-seal-top" x="110" y="70" textAnchor="middle">JAWAHAR</text>
            <text className="nv-seal-main" x="110" y="122" textAnchor="middle">NAVODAYA</text>
            <text className="nv-seal-sub" x="110" y="152" textAnchor="middle">VIDYALAYA SCHEME</text>
            <line x1="34" y1="176" x2="186" y2="44" stroke="#d33a2c" strokeWidth="7" strokeLinecap="round" />
          </svg>

          <div className="hero-fig-card">
            <p className="hero-fig-cap">The crux</p>
            <div className="nv-vs">
              <div className="nv-vs-side">
                <span className="nv-vs-num">2</span>
                <span className="nv-vs-who">Tamil Nadu</span>
                <span className="nv-vs-langs" lang="ta">Tamil · English</span>
              </div>
              <span className="nv-vs-div" aria-hidden="true">vs</span>
              <div className="nv-vs-side nv-vs-side--accent">
                <span className="nv-vs-num">3</span>
                <span className="nv-vs-who">Navodaya</span>
                <span className="nv-vs-langs">Regional · English · a third</span>
              </div>
            </div>
            <p className="hero-fig-note">
              A <b>two-language policy</b> against a <b>three-language formula</b> — that is the heart of the standoff.
            </p>
          </div>
        </figure>
      </div>

      <p className="hero-credit" aria-hidden="true">{IMAGE_CREDITS.supremeCourt}</p>
    </header>
  );
}
