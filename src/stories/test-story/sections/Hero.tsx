import { useEffect, useRef } from "react";
import { prefersReducedMotion, isEmbedMode } from "@/core/responsive/viewport";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = prefersReducedMotion();
  const embed = isEmbedMode();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || embed || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".test-hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".test-hero-meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, embed]);

  return (
    <header
      ref={rootRef}
      className="test-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        background: "linear-gradient(135deg, #dbeafe 0%, #f0fdf4 100%)",
        color: "#1a1a2e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .test-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
        @media (prefers-reduced-motion: reduce) {
          .test-hero-title, .test-hero-subtitle, .test-hero-meta {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        <p className="test-hero-kicker" style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "0.875rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#2563eb",
          marginBottom: "1.5rem",
        }}>
          Test Story — Architecture Validation
        </p>
        <h1 className="test-hero-title" style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          margin: "0 0 1.5rem",
          color: "#1a1a2e",
        }}>
          A Completely Different Visual Design
        </h1>
        <p className="test-hero-subtitle" style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
          lineHeight: 1.6,
          color: "#6b7280",
          margin: "0 0 2rem",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          This story uses a light theme, serif display type, and a clean editorial layout — proving the platform imposes no visual constraints.
        </p>
        <div className="test-hero-meta" style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "0.875rem",
          color: "#9ca3af",
        }}>
          <span>By Test Author</span>
          <span>2026</span>
          <span>5 min read</span>
        </div>
      </div>
    </header>
  );
}