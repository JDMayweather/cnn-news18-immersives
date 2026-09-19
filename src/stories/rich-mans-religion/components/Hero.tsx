import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useScene } from "./motion";
import { META } from "../assets/article";

/**
 * The opening: Dhoni's six running as the backdrop under a darkening scrim,
 * so the type sits on near-black and reads at full contrast. Four text
 * elements only: eyebrow, headline, deck, one action.
 */
export default function Hero(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  const ref = useScene<HTMLElement>((root) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(root.querySelectorAll(".h-line"), { yPercent: 114, duration: 1.15, stagger: 0.09 })
      .from(root.querySelectorAll(".h-fade"), { opacity: 0, y: 18, duration: 0.95, stagger: 0.1 }, 0.4)
        .from(
          root.querySelectorAll(".hero-dot"),
          { scale: 0, transformOrigin: "center", duration: 0.7, ease: "back.out(2)", stagger: 0.055 },
          0.5,
        );
  });

  /* React sets `muted` as a prop, not an attribute, and some browsers only
     honour autoplay from the attribute — set it imperatively to be sure. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => undefined);
    if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    }
  }, []);

  return (
    <header className="hero" ref={ref}>
      <video
        ref={videoRef}
        className="hero-video"
        src="/dhoni_six.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="rm-wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow h-fade">
            <img className="hero-brand" src="/News18.png" alt="News18" />
            <span>INVESTIGATION</span>
          </p>

          <h1 className="rm-hero-title">
            <span className="h-mask">
              <span className="h-line">Rich Man&rsquo;s</span>
            </span>
            <span className="h-mask">
              <span className="h-line h-line--accent">Religion</span>
            </span>
          </h1>

          {/* The article's own headline, split across title and deck. */}
          <p className="hero-deck h-fade">How Cricket&rsquo;s Cost Makes It Out-Of-Reach To Half Of India</p>

          <div className="hero-foot h-fade">
            <a className="hero-go" href="#prologue">
              Begin reading
            </a>
            <p className="hero-meta">
              {META.byline} &middot; {META.published} &middot; {META.readTime}
            </p>
          </div>
        </div>

        <figure className="hero-fig h-fade">
          <div className="hero-fig-card">
            <figcaption className="hero-fig-cap">THE TOP 10% OF EARNERS</figcaption>
            <p className="hero-fig-big">
              ₹25,000<span>/month</span>
            </p>
            <div className="hero-dots" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={i === 0 ? "hero-dot hero-dot--on" : "hero-dot"} />
              ))}
            </div>
            {/* The article's own sentence, not a summary of it. */}
            <p className="hero-fig-note">
              Add to it the actual cricket practice expenses, tournament fees, and travel, and the conservative costs of pursuing the sport
              professionally come to around <b>₹3,00,000</b> annually or about ₹25,000 a month.
            </p>
          </div>
        </figure>
      </div>
      <a className="hero-scroll h-fade" href="#prologue" aria-label="Scroll to the story">
        <span aria-hidden="true" />
      </a>
    </header>
  );
}
