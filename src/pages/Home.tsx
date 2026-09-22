import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllStories } from "@/router/stories";
import "./Home.css";

interface StoryMeta {
  slug: string;
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  hidden?: boolean;
  readTimeMinutes?: number;
}

type Cover =
  | { kind: "img"; src: string; alt: string }
  | { kind: "video"; src: string; posterImg: string; alt: string };

const COVERS: Record<string, Cover> = {
  montreux: {
    kind: "img",
    src: "/bahri.jpeg",
    alt: "Oil tanker transiting the Strait of Hormuz",
  },
  "rich-mans-religion": {
    kind: "video",
    src: "/kids_gully_cricket.mp4",
    posterImg: "/cricket-poster.jpg",
    alt: "Cricketer hitting a six",
  },
};

const SECTIONS = [
  { label: "Immersives", to: "/", active: true },
  { label: "India", href: "https://www.news18.com/india/" },
  { label: "World", href: "https://www.news18.com/world/" },
  { label: "Cricket", href: "https://www.news18.com/cricket/" },
  { label: "Business", href: "https://www.news18.com/business/" },
  { label: "Tech", href: "https://www.news18.com/tech/" },
  { label: "Showsha", href: "https://www.news18.com/movies/" },
];

/* Video loads nothing until tapped: poster first, click-to-play after. */
function CoverVideo({ src, posterImg, alt }: { src: string; posterImg: string; alt: string }) {
  const [playing, setPlaying] = useState(false);
  if (!playing) {
    return (
      <button
        type="button"
        className="cover-play"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${alt}`}
      >
        <img className="card-art" src={posterImg} alt={alt} loading="lazy" decoding="async" />
        <span className="cover-play-btn" aria-hidden="true">▶</span>
      </button>
    );
  }
  return (
    <video
      className="card-art"
      src={src}
      poster={posterImg}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="none"
      aria-label={alt}
    />
  );
}

function Cover({ meta, eager }: { meta: StoryMeta; eager?: boolean }) {
  const cover = COVERS[meta.slug];
  if (!cover) return <div className="card-art card-art--fallback" aria-hidden="true" />;
  if (cover.kind === "video") {
    return <CoverVideo src={cover.src} posterImg={cover.posterImg} alt={cover.alt} />;
  }
  return (
    <img
      className="card-art"
      src={cover.src}
      alt={cover.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function Byline({ meta, short }: { meta: StoryMeta; short?: boolean }) {
  return (
    <div className="byline">
      {meta.author && <span className="byline-author">By {meta.author}</span>}
      {meta.publishedAt && (
        <time
          className="byline-date"
          dateTime={meta.publishedAt}
        >
          {new Date(meta.publishedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: short ? "short" : "long",
            year: "numeric",
          })}
        </time>
      )}
      {meta.readTimeMinutes && (
        <span className="byline-rt">{meta.readTimeMinutes} min read</span>
      )}
    </div>
  );
}

function Share({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/${slug}` : `/${slug}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <span className="share" role="group" aria-label={`Share: ${title}`}>
      <button type="button" className="share-btn" onClick={copy}>
        {copied ? "Copied!" : "Copy link"}
      </button>
      <a
        className="share-btn"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
      <a
        className="share-btn"
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </span>
  );
}

export default function Home(): React.JSX.Element {
  const [stories, setStories] = useState<{ metadata: StoryMeta }[]>([]);
  const [activeTag, setActiveTag] = useState<string>("All");

  useEffect(() => {
    setStories(
      getAllStories()
        .filter((s) => !s.metadata.hidden)
        .map((s) => ({ metadata: s.metadata })),
    );
  }, []);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => s.metadata.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [stories]);

  const visible = useMemo(
    () => (activeTag === "All" ? stories : stories.filter((s) => s.metadata.tags?.includes(activeTag))),
    [stories, activeTag],
  );

  const [lead, ...rest] = stories;

  return (
    <div className="home-page">
      {/* Utility strip */}
      <div className="top-strip">
        <div className="wrap top-strip-inner">
          <span className="top-date">{today} | English Edition</span>
          <span className="top-links">
            <a href="https://www.news18.com/livetv/" target="_blank" rel="noreferrer">
              <i className="dot" aria-hidden="true" /> Live TV
            </a>
            <a href="https://www.news18.com" target="_blank" rel="noreferrer">
              News18.com
            </a>
          </span>
        </div>
      </div>

      {/* Masthead */}
      <header className="masthead">
        <div className="wrap masthead-inner">
          <Link to="/" className="brand" aria-label="CNN News18 Immersives home">
            <img src="/News18.png" alt="News18" className="brand-logo" />
            <span className="brand-stack">
              <span className="brand-name">CNN News18</span>
              <span className="brand-sub">IMMERSIVES</span>
            </span>
          </Link>
          <p className="brand-tag">
            Long-form visual stories. Beyond the headline.
          </p>
        </div>
        <nav className="section-nav" aria-label="Sections">
          <div className="wrap section-nav-inner">
            {SECTIONS.map((s) =>
              s.to ? (
                <Link key={s.label} to={s.to} className="section-link active" aria-current="page">
                  {s.label}
                </Link>
              ) : (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="section-link">
                  {s.label}
                </a>
              ),
            )}
          </div>
        </nav>
      </header>

      {/* Breaking ticker */}
      {stories.length > 0 && (
        <div className="ticker" role="marquee" aria-label="Latest immersive stories">
          <div className="wrap ticker-inner">
            <span className="ticker-label">Latest</span>
            <div className="ticker-window">
              <div className="ticker-track">
                {[...stories, ...stories].map((s, i) => (
                  <Link key={`${s.metadata.slug}-${i}`} to={`/${s.metadata.slug}`} className="ticker-item" tabIndex={i < stories.length ? 0 : -1} aria-hidden={i >= stories.length}>
                    {s.metadata.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="wrap site-main">
        {/* Hero: lead + latest rail */}
        {lead && (
          <section className="hero" aria-labelledby="hero-title">
            <div className="lead-wrap">
              <Link to={`/${lead.metadata.slug}`} className="lead-card">
                <span className="kicker kicker--live">Lead Immersive</span>
                <div className="lead-media">
                  <Cover meta={lead.metadata} eager />
                </div>
                <h1 id="hero-title" className="lead-title">{lead.metadata.title}</h1>
                {lead.metadata.description && (
                  <p className="lead-dek">{lead.metadata.description}</p>
                )}
                <Byline meta={lead.metadata} />
              </Link>
              <Share slug={lead.metadata.slug} title={lead.metadata.title} />
            </div>
            <aside className="rail" aria-label="More immersive stories">
              <h2 className="rail-heading">More Immersives</h2>
              {rest.length === 0 ? (
                <p className="rail-empty">More visual investigations dropping soon.</p>
              ) : (
                rest.map((s) => (
                  <Link key={s.metadata.slug} to={`/${s.metadata.slug}`} className="rail-item">
                    <span className="rail-thumb">
                      <Cover meta={s.metadata} />
                    </span>
                    <span className="rail-text">
                      <span className="kicker">Immersive</span>
                      <span className="rail-title">{s.metadata.title}</span>
                      <Byline meta={s.metadata} short />
                    </span>
                  </Link>
                ))
              )}
              <div className="rail-about">
                <h3>What is an Immersive?</h3>
                <p>Scrolly storytelling, data visuals and on-ground reporting — one story, told end to end.</p>
              </div>
            </aside>
          </section>
        )}

        {/* All immersives */}
        <section className="all" aria-labelledby="all-heading">
          <div className="section-head">
            <h2 id="all-heading">All Immersives</h2>
            <span className="count">{visible.length} {visible.length === 1 ? "story" : "stories"}</span>
          </div>
          {allTags.length > 2 && (
            <div className="chips" role="group" aria-label="Filter by topic">
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`chip${activeTag === t ? " chip--on" : ""}`}
                  aria-pressed={activeTag === t}
                  onClick={() => setActiveTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          {visible.length === 0 ? (
            <p className="empty">No immersive stories published yet.</p>
          ) : (
            <div className="grid" role="list">
              {visible.map((s) => (
                <article key={s.metadata.slug} className="card" role="listitem">
                  <Link to={`/${s.metadata.slug}`} className="card-link">
                    <span className="card-media">
                      <Cover meta={s.metadata} />
                    </span>
                    <span className="card-body">
                      <span className="kicker">Immersive</span>
                      <span className="card-title">{s.metadata.title}</span>
                      {s.metadata.description && (
                        <span className="card-dek">{s.metadata.description}</span>
                      )}
                      <Byline meta={s.metadata} short />
                      {s.metadata.tags && s.metadata.tags.length > 0 && (
                        <span className="tags">
                          {s.metadata.tags.slice(0, 3).map((t) => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </span>
                      )}
                    </span>
                  </Link>
                  <span className="card-foot">
                    <Share slug={s.metadata.slug} title={s.metadata.title} />
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer" role="contentinfo">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src="/News18.png" alt="News18" className="footer-logo" />
            <p className="footer-name">CNN News18 Immersives</p>
            <p className="footer-note">Visual investigations from the CNN News18 newsroom.</p>
          </div>
          <nav aria-label="Sections">
            <h3>Sections</h3>
            <Link to="/">All Immersives</Link>
            <a href="https://www.news18.com/india/" target="_blank" rel="noreferrer">India</a>
            <a href="https://www.news18.com/world/" target="_blank" rel="noreferrer">World</a>
            <a href="https://www.news18.com/cricket/" target="_blank" rel="noreferrer">Cricket</a>
          </nav>
          <nav aria-label="Network">
            <h3>Network</h3>
            <a href="https://www.news18.com" target="_blank" rel="noreferrer">News18.com</a>
            <a href="https://www.news18.com/livetv/" target="_blank" rel="noreferrer">Live TV</a>
            <a href="https://www.moneycontrol.com" target="_blank" rel="noreferrer">Moneycontrol</a>
            <a href="https://www.firstpost.com" target="_blank" rel="noreferrer">Firstpost</a>
          </nav>
        </div>
        <div className="wrap footer-base">
          <span>© {new Date().getFullYear()} CNN News18. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
