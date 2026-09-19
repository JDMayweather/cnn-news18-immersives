import { Link } from "react-router-dom";
import { getAllStories } from "@/router/stories";

/**
 * Cross-link block for story footers: every immersive points home
 * and at its siblings. Hidden/tooling stories excluded.
 */
export default function MoreImmersives({ currentSlug }: { currentSlug: string }): React.JSX.Element | null {
  const others = getAllStories().filter(
    (s) => !s.metadata.hidden && s.metadata.slug !== currentSlug,
  );
  return (
    <nav
      aria-label="More immersive stories"
      style={{
        maxWidth: "68ch",
        margin: "0 auto",
        padding: "3rem 1.25rem 4rem",
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", color: "#e31e24", margin: "0 0 0.8rem" }}>
        MORE IMMERSIVES
      </p>
      {others.length === 0 ? (
        <Link to="/" style={{ color: "inherit", fontWeight: 700, textDecoration: "none" }}>
          ← All Immersives from CNN News18
        </Link>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.7rem" }}>
          {others.map((s) => (
            <li key={s.metadata.slug} style={{ borderTop: "1px solid rgba(128,128,128,0.35)", paddingTop: "0.7rem" }}>
              <Link to={`/${s.metadata.slug}`} style={{ color: "inherit", textDecoration: "none", fontWeight: 700, lineHeight: 1.4 }}>
                {s.metadata.title}
              </Link>
              {s.metadata.description && (
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.88rem", opacity: 0.75, lineHeight: 1.55 }}>
                  {s.metadata.description}
                </p>
              )}
            </li>
          ))}
          <li>
            <Link to="/" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#e31e24", textDecoration: "none" }}>
              ← All Immersives
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
