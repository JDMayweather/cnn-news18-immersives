import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion, isEmbedMode } from "@/core/responsive/viewport";

export default function Content() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = prefersReducedMotion();
  const embed = isEmbedMode();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || embed || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".test-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, embed]);

  return (
    <main ref={rootRef} style={{ padding: "0 2rem" }}>
      <style>{`
        @media (max-width: 768px) {
          .test-section { padding: 3rem 1.5rem !important; }
          .test-quote { font-size: 1.5rem !important; padding: 1.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .test-section { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <section className="test-section" style={{
        maxWidth: "800px",
        margin: "0 auto 4rem",
        padding: "4rem 2rem",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.03)",
        border: "1px solid #e5e7eb",
      }}>
        <h2 style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#1a1a2e",
          margin: "0 0 1.5rem",
        }}>
          The Architecture Works
        </h2>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#374151",
          margin: "0 0 1.5rem",
        }}>
          This test story demonstrates that the multi-story immersive publishing platform successfully separates the reusable engineering infrastructure from story-specific creative decisions.
        </p>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#374151",
          margin: "0 0 1.5rem",
        }}>
          Key architectural principles validated:
        </p>
        <ul style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#374151",
          margin: "0 0 1.5rem",
          paddingLeft: "1.5rem",
        }}>
          <li style={{ marginBottom: "0.75rem" }}>Shared engine: routing, embed system, scroll handling, animation utilities</li>
          <li style={{ marginBottom: "0.75rem" }}>Story isolation: each story has its own sections, assets, theme, and components</li>
          <li style={{ marginBottom: "0.75rem" }}>Design freedom: this story uses a light theme with serif typography — completely different from Montreux's dark theme</li>
          <li style={{ marginBottom: "0.75rem" }}>Lazy loading: stories can be code-split so only the active story loads</li>
        </ul>
      </section>

      <section className="test-section" style={{
        maxWidth: "800px",
        margin: "0 auto 4rem",
        padding: "4rem 2rem",
        background: "#f9fafb",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}>
        <h2 style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#1a1a2e",
          margin: "0 0 1.5rem",
        }}>
          Independent Visual Identity
        </h2>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#374151",
          margin: "0 0 1.5rem",
        }}>
          Notice how this story shares zero visual DNA with Montreux: different color system, different typography, different spacing, different layout rhythm. The platform provides engineering primitives, not a design system.
        </p>
        <blockquote className="test-quote" style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontStyle: "italic",
          lineHeight: 1.4,
          color: "#1a1a2e",
          borderLeft: "4px solid #2563eb",
          padding: "2rem",
          margin: "2rem 0",
          background: "#eff6ff",
          borderRadius: "0 8px 8px 0",
        }}>
          "The platform should share engineering, not creative direction."
        </blockquote>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#6b7280",
          margin: 0,
          fontStyle: "italic",
        }}>
          — Architecture Principle
        </p>
      </section>

      <section className="test-section" style={{
        maxWidth: "800px",
        margin: "0 auto 6rem",
        padding: "4rem 2rem",
        background: "#1a1a2e",
        borderRadius: "12px",
        color: "#f9fafb",
      }}>
        <h2 style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#ffffff",
          margin: "0 0 1.5rem",
        }}>
          Ready for Production
        </h2>
        <p style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#d1d5db",
          margin: "0 0 1.5rem",
        }}>
          The platform is ready for new immersives. To add a new story:
        </p>
        <ol style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "1.125rem",
          lineHeight: 1.75,
          color: "#d1d5db",
          margin: "0 0 1.5rem",
          paddingLeft: "1.5rem",
        }}>
          <li style={{ marginBottom: "0.75rem" }}>Create <code style={{ background: "#374151", padding: "0.125rem 0.5rem", borderRadius: "4px" }}>src/stories/your-story/</code></li>
          <li style={{ marginBottom: "0.75rem" }}>Build sections as React components</li>
          <li style={{ marginBottom: "0.75rem" }}>Add a <code style={{ background: "#374151", padding: "0.125rem 0.5rem", borderRadius: "4px" }}>theme.ts</code> for your visual language</li>
          <li style={{ marginBottom: "0.75rem" }}>Create <code style={{ background: "#374151", padding: "0.125rem 0.5rem", borderRadius: "4px" }}>index.tsx</code> composing your sections</li>
          <li style={{ marginBottom: "0.75rem" }}>Register in <code style={{ background: "#374151", padding: "0.125rem 0.5rem", borderRadius: "4px" }}>src/App.tsx</code></li>
          <li style={{ marginBottom: "0.75rem" }}>Deploy — available at <code style={{ background: "#374151", padding: "0.125rem 0.5rem", borderRadius: "4px" }}>{`/{your-story-slug}`}</code></li>
        </ol>
      </section>
    </main>
  );
}