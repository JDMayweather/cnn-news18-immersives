export interface StoryModule {
  default: React.ComponentType<{}>;
  metadata: StoryMetadata;
}

export interface StoryMetadata {
  slug: string;
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  /** Internal/tooling stories: hidden from homepage lists and related blocks. */
  hidden?: boolean;
  /** Estimated read length, shown on cards. */
  readTimeMinutes?: number;
}

const storyRegistry = new Map<string, StoryModule>();

export function registerStory(slug: string, module: StoryModule): void {
  if (storyRegistry.has(slug)) {
    console.warn(`Story "${slug}" is already registered. Overwriting.`);
  }
  storyRegistry.set(slug, module);
}

export function getStory(slug: string): StoryModule | undefined {
  return storyRegistry.get(slug);
}

export function getAllStories(): StoryModule[] {
  return Array.from(storyRegistry.values());
}

export function getStorySlugs(): string[] {
  return Array.from(storyRegistry.keys());
}

export function isValidStorySlug(slug: string): boolean {
  return storyRegistry.has(slug);
}

export async function loadStory(slug: string): Promise<StoryModule | null> {
  const story = storyRegistry.get(slug);
  if (story) return story;
  return null;
}

export function createNotFoundStory(): React.ComponentType<{}> {
  return function NotFound() {
    const publicStories = Array.from(storyRegistry.values()).filter((s) => !s.metadata.hidden);
    return (
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
        background: "#ffffff",
        color: "#111318",
        fontFamily: '"Inter", system-ui, sans-serif'
      }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit", marginBottom: "1.5rem" }}>
          <img src="/News18.png" alt="News18" style={{ height: "34px", width: "auto" }} />
          <span style={{ fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.28em", color: "#e31e24" }}>IMMERSIVES</span>
        </a>
        <p style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.14em", color: "#e31e24", margin: "0 0 0.5rem" }}>404</p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", margin: "0 0 1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Story Not Found</h1>
        <p style={{ fontSize: "1rem", color: "#3f444d", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.6 }}>
          The immersive story you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        {publicStories.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "grid", gap: "0.6rem", maxWidth: "36rem", width: "100%" }}>
            {publicStories.map((s) => (
              <li key={s.metadata.slug} style={{ border: "1px solid #e5e7eb", borderRadius: "10px" }}>
                <a href={`/${s.metadata.slug}`} style={{ display: "block", padding: "0.9rem 1.1rem", textDecoration: "none", color: "#111318", fontWeight: 700 }}>
                  {s.metadata.title}
                </a>
              </li>
            ))}
          </ul>
        )}
        <a href="/" style={{ marginTop: "2rem", fontSize: "0.85rem", fontWeight: 700, color: "#e31e24", textDecoration: "none" }}>
          ← All Immersives
        </a>
      </section>
    );
  };
}