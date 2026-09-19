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
    return (
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
        background: "#05070b",
        color: "#eef1f4",
        fontFamily: "system-ui, sans-serif"
      }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", margin: "0 0 1rem", fontWeight: 900 }}>Story Not Found</h1>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#8a99ab", maxWidth: "40rem", margin: "0 auto" }}>
          The immersive story you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#5a6a7a" }}>
          Available stories: {getStorySlugs().join(", ") || "none"}
        </p>
      </section>
    );
  };
}