import { Fragment } from "react";
import DisplayText from "./DisplayText";
import Interlude from "./Interlude";
import Prose from "./Prose";
import ScrollScene from "./ScrollScene";
import { Figure } from "./figures";
import { SCENES } from "./scenes";
import type { Block, Chapter as ChapterData } from "../assets/article";

/* A case file has no rotating openers or ghost numerals: every section starts
   the same way — a ruled docket line, a numeral, the heading — because a record
   is uniform by design. */

/**
 * Every photograph carries its intrinsic size. The browser then reserves the
 * right box before the file arrives, so nothing shifts — and the line layout
 * in Prose never measures a float that is still zero-height.
 */
function Photo({
  block,
  className,
}: {
  block: { src: string; alt: string; w?: number; h?: number };
  className?: string;
}): React.JSX.Element {
  return (
    <img
      className={className}
      src={block.src}
      alt={block.alt}
      width={block.w}
      height={block.h}
      loading="lazy"
      decoding="async"
    />
  );
}

/**
 * Wrap portraits are rendered by BlockView below (the `nv-float` figures) and
 * joined with their paragraphs in the chapter loop: the figure leads and the
 * run flows around it, with Prose narrowing only the lines beside the float.
 */

/**
 * Pull quotes carry the big green opening and closing marks as decoration, so
 * the literal double quotation marks in the text are redundant. Strip every
 * double quote (curly and straight); apostrophes and nested single quotes are
 * left alone. Applied at render time only — the source text stays verbatim.
 */
function stripDoubleQuotes(text: string): string {
  return text.replace(/[“”‟″"]/g, "").replace(/\s{2,}/g, " ").trim();
}

function BlockView({ block, dropCap }: { block: Block; dropCap?: boolean }): React.JSX.Element | null {
  switch (block.kind) {
    case "lead":
      return <Prose className="nv-lead" text={block.text} dropCap={dropCap} />;
    case "p":
      return <Prose text={block.text} dropCap={dropCap} className={block.solo ? "nv-solo" : undefined} justify={!block.solo} />;
    case "h3":
      return <h3 className="nv-h3">{block.text}</h3>;
    case "quote": {
      const cls = ["nv-quote", block.bleed ? "nv-quote--bleed" : "", block.screen ? "nv-quote--screen" : ""]
        .filter(Boolean)
        .join(" ");
      return (
        <blockquote className={cls}>
          <p>{stripDoubleQuotes(block.text)}</p>
          {/* No cite means the article asked the question in its own voice. */}
          {block.cite ? (
            <footer>
              {block.cite}
              {block.role ? <span className="nv-quote-role">{block.role}</span> : null}
            </footer>
          ) : null}
        </blockquote>
      );
    }
    case "screen":
      /* A paragraph the article asks in its own voice, set at screen scale —
         and revealed line by line, so the long sentence lands in beats. */
      return (
        <blockquote className={`nv-quote nv-quote--screen${block.tone === "dark" ? " nv-quote--screen-dark" : ""}`}>
          <p>
            <DisplayText text={block.text} />
          </p>
        </blockquote>
      );
    case "callout":
      return (
        <aside className="nv-callout">
          <h4>{block.label}</h4>
          <p>{block.text}</p>
        </aside>
      );
    case "ledger":
      return (
        <div className="nv-fig">
          {block.label ? <p className="nv-fig-label">{block.label}</p> : null}
          <ol className="nv-ledger">
            {block.rows.map((row, i) => (
              <li key={row.k} className="nv-rise">
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="k">{row.k}</span>
                <span className="v">{row.v}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "figure":
      return <Figure figure={block.ref} />;
    case "interlude":
      return (
        <Interlude variant={block.variant} label={block.label} sub={block.sub} notes={block.notes} bars={block.bars} />
      );
    case "scene": {
      const Visual = SCENES[block.ref];
      /* Same guard as the interludes: an unknown ref should cost one panel,
         not the rest of the story. */
      if (!Visual) {
        console.warn(`[rich-man] no pinned scene for ref "${block.ref}"`);
        return null;
      }
      return (
        <div className={`nv-fig nv-scene-wrap nv-scene-wrap--${block.ref}`}>
          <p className="nv-fig-label">{block.label}</p>
          <ScrollScene label={block.label} steps={block.steps}>
            {(active) => <Visual active={active} />}
          </ScrollScene>
        </div>
      );
    }
    case "panel":
      /* Landscape runs the full width; a portrait is set beside the copy it
         belongs to. Either way the whole frame is shown — nothing is cropped
         to fill a box, and the caption sits under the picture. */
      if (block.layout === "float-left" || block.layout === "float-right") {
        return (
          <figure className={`nv-float nv-float--${block.layout === "float-left" ? "left" : "right"}`}>
            <Photo block={block} />
            <figcaption className="nv-float-cap">
              {block.line ? <span className="nv-float-line">{block.line}</span> : null}
              <span className="nv-float-credit">{block.credit}</span>
            </figcaption>
          </figure>
        );
      }
      return (
        <figure className="nv-panel nv-rise">
          <Photo block={block} />
          <figcaption className="nv-panel-cap">
            {block.line ? <span className="nv-panel-line">{block.line}</span> : null}
            <span className="nv-panel-credit">{block.credit}</span>
          </figcaption>
        </figure>
      );
    case "shot":
      if (block.layout === "float-left" || block.layout === "float-right") {
        return (
          <figure className={`nv-float nv-float--${block.layout === "float-left" ? "left" : "right"}`}>
            <Photo block={block} />
            <figcaption className="nv-float-cap">
              <span className="nv-float-credit">{block.caption}</span>
            </figcaption>
          </figure>
        );
      }
      return (
        <figure className="nv-fig nv-shot-fig">
          <Photo block={block} className="nv-shot" />
          <figcaption className="nv-fig-cap">{block.caption}</figcaption>
        </figure>
      );
    case "duo":
      /* Two frames to one thought: a short-cropped pair, each tagged and
         credited, that sits in the column rather than bleeding the viewport. */
      return (
        <div className="nv-fig nv-duo-fig">
          {block.label ? <p className="nv-fig-label">{block.label}</p> : null}
          <div className="nv-duo">
            {block.items.map((it) => (
              <figure className="nv-duo-item" key={it.src}>
                <img className="nv-duo-img" src={it.src} alt={it.alt} loading="lazy" decoding="async" />
                <figcaption className="nv-duo-cap">
                  <span className="nv-duo-tag">{it.tag}</span>
                  <span className="nv-duo-credit">{it.credit}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
    case "note":
      return <p className="nv-note">{block.text}</p>;
    default:
      return null;
  }
}

export default function Chapter({ chapter, index }: { chapter: ChapterData; index: number }): React.JSX.Element {
  const firstPara = chapter.blocks.findIndex((b) => b.kind === "p" || b.kind === "lead");
  const alt = index % 2 === 1;

  return (
    <section className={`nv-chapter${alt ? " nv-chapter--alt" : ""}${chapter.dark ? " nv-chapter--dark" : ""}`} id={chapter.id} data-num={chapter.num}>
      <div className="nv-wrap" data-chapter={chapter.title}>
        {/* The case-marker: a ruled docket line carrying the section number and
            a mono file tag, then the heading. Uniform for every section — a
            record, not a magazine with rotating openers. */}
        <header className={`nv-open${chapter.title ? "" : " nv-open--bare"}`}>
          <div className="nv-docket nv-rise">
            <span className="nv-docket-num" aria-hidden="true">{chapter.num}</span>
            <span className="nv-docket-tag" aria-hidden="true">§ SECTION {chapter.num}</span>
            <span className="nv-docket-rule" aria-hidden="true" />
          </div>
          {chapter.title ? (
            <div className="nv-open-copy">
              <h2 className="nv-h2">
                <DisplayText text={chapter.title} />
              </h2>
            </div>
          ) : null}
        </header>

        <div className="nv-prose">
          {(() => {
            type TextRef = { b: Extract<Block, { kind: "p" } | { kind: "lead" }>; i: number };
            type Node =
              | { t: "b"; b: Block; i: number }
              | { t: "w"; fig: Block; texts: TextRef[] };
            const isText = (b: Block): b is TextRef["b"] => b.kind === "p" || b.kind === "lead";
            const nodes: Node[] = [];
            for (let i = 0; i < chapter.blocks.length; i++) {
              const block = chapter.blocks[i];
              const isPortrait =
                (block.kind === "panel" || block.kind === "shot") &&
                (block.layout === "float-left" || block.layout === "float-right");
              if (!isPortrait) {
                nodes.push({ t: "b", b: block, i });
                continue;
              }
              /* The portrait leads and the run flows around it: up to 3
                 preceding paragraphs are pulled below the figure and up to 3
                 following ones stay, so every line Pretext sets is measured
                 against the float beside it (bands) — full wrap, no column. */
              const prev: TextRef[] = [];
              let k = i - 1;
              while (k >= 0 && prev.length < 3 && isText(chapter.blocks[k])) {
                prev.unshift({ b: chapter.blocks[k] as TextRef["b"], i: k });
                k--;
              }
              const attached =
                prev.length &&
                nodes.length >= prev.length &&
                prev.every((p, n) => {
                  const nd = nodes[nodes.length - prev.length + n];
                  return nd.t === "b" && nd.i === p.i;
                });
              const texts: TextRef[] = [];
              if (attached) {
                nodes.splice(nodes.length - prev.length, prev.length);
                texts.push(...prev);
              }
              let j = i + 1;
              while (j < chapter.blocks.length && texts.length < 6 && isText(chapter.blocks[j])) {
                texts.push({ b: chapter.blocks[j] as TextRef["b"], i: j });
                j++;
              }
              if (!texts.length) {
                nodes.push({ t: "b", b: block, i });
                continue;
              }
              nodes.push({ t: "w", fig: block, texts });
              i = j - 1;
            }
            return nodes.map((n, nI) =>
              n.t === "w" ? (
                <Fragment key={`${chapter.id}-w${nI}`}>
                  <BlockView block={n.fig} />
                  {n.texts.map((t) => (
                    <Prose
                      key={t.i}
                      text={t.b.text}
                      className={t.b.kind === "lead" ? "nv-lead" : undefined}
                      dropCap={t.i === firstPara}
                    />
                  ))}
                </Fragment>
              ) : (
                <BlockView key={`${chapter.id}-${n.i}`} block={n.b} dropCap={n.i === firstPara} />
              ),
            );
          })()}
        </div>
      </div>
    </section>
  );
}
