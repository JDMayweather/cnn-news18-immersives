import { Fragment } from "react";
import DisplayText from "./DisplayText";
import Interlude from "./Interlude";
import Prose from "./Prose";
import ScrollScene from "./ScrollScene";
import { Figure } from "./figures";
import { SCENES } from "./scenes";
import type { Block, Chapter as ChapterData } from "../assets/article";

/**
 * Chapter openers rotate between three arrival treatments so eight chapters do
 * not each begin the same way. Two of them are quiet typesetting; the third
 * puts the reader back down in the field.
 */
const OPENERS = ["low", "plate", "stack"] as const;

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
 * Wrap portraits are rendered by BlockView below (the `rm-float` figures) and
 * joined with their paragraphs in the chapter loop: the figure leads and the
 * run flows around it, with Prose narrowing only the lines beside the float.
 */

function BlockView({ block, dropCap }: { block: Block; dropCap?: boolean }): React.JSX.Element | null {
  switch (block.kind) {
    case "lead":
      return <Prose className="rm-lead" text={block.text} dropCap={dropCap} />;
    case "p":
      return <Prose text={block.text} dropCap={dropCap} className={block.solo ? "rm-solo" : undefined} justify={!block.solo} />;
    case "h3":
      return <h3 className="rm-h3">{block.text}</h3>;
    case "quote": {
      const cls = ["rm-quote", block.bleed ? "rm-quote--bleed" : "", block.screen ? "rm-quote--screen" : ""]
        .filter(Boolean)
        .join(" ");
      return (
        <blockquote className={cls}>
          <p>{block.text}</p>
          {/* No cite means the article asked the question in its own voice. */}
          {block.cite ? (
            <footer>
              {block.cite}
              {block.role ? <span className="rm-quote-role">{block.role}</span> : null}
            </footer>
          ) : null}
        </blockquote>
      );
    }
    case "screen":
      /* A paragraph the article asks in its own voice, set at screen scale —
         and revealed line by line, so the long sentence lands in beats. */
      return (
        <blockquote className={`rm-quote rm-quote--screen${block.tone === "dark" ? " rm-quote--screen-dark" : ""}`}>
          <p>
            <DisplayText text={block.text} />
          </p>
        </blockquote>
      );
    case "callout":
      return (
        <aside className="rm-callout">
          <h4>{block.label}</h4>
          <p>{block.text}</p>
        </aside>
      );
    case "ledger":
      return (
        <div className="rm-fig">
          {block.label ? <p className="rm-fig-label">{block.label}</p> : null}
          <ol className="rm-ledger">
            {block.rows.map((row, i) => (
              <li key={row.k} className="rm-rise">
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
        <div className="rm-fig rm-scene-wrap">
          <p className="rm-fig-label">{block.label}</p>
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
          <figure className={`rm-float rm-float--${block.layout === "float-left" ? "left" : "right"}`}>
            <Photo block={block} />
            <figcaption className="rm-float-cap">
              {block.line ? <span className="rm-float-line">{block.line}</span> : null}
              <span className="rm-float-credit">{block.credit}</span>
            </figcaption>
          </figure>
        );
      }
      return (
        <figure className="rm-panel">
          <Photo block={block} />
          <figcaption className="rm-panel-cap">
            {block.line ? <span className="rm-panel-line">{block.line}</span> : null}
            <span className="rm-panel-credit">{block.credit}</span>
          </figcaption>
        </figure>
      );
    case "shot":
      if (block.layout === "float-left" || block.layout === "float-right") {
        return (
          <figure className={`rm-float rm-float--${block.layout === "float-left" ? "left" : "right"}`}>
            <Photo block={block} />
            <figcaption className="rm-float-cap">
              <span className="rm-float-credit">{block.caption}</span>
            </figcaption>
          </figure>
        );
      }
      return (
        <figure className="rm-fig rm-shot-fig">
          <Photo block={block} className="rm-shot" />
          <figcaption className="rm-fig-cap">{block.caption}</figcaption>
        </figure>
      );
    case "note":
      return <p className="rm-note">{block.text}</p>;
    default:
      return null;
  }
}

export default function Chapter({ chapter, index }: { chapter: ChapterData; index: number }): React.JSX.Element {
  const opener = OPENERS[index % OPENERS.length];
  /* The stylesheet's ::first-letter lands on the first paragraph, so that is
     the one whose lines have to be measured around the drop cap. */
  const firstPara = chapter.blocks.findIndex((b) => b.kind === "p" || b.kind === "lead");

  /* Even chapters run on the moss band and carry their numeral as a
     ghost behind the opener; odd chapters stay on paper. Same words,
     alternating ground, so eight chapters never read as one long page. */
  const alt = index % 2 === 1;

  return (
    <section className={`rm-chapter${alt ? " rm-chapter--alt" : ""}${chapter.dark ? " rm-chapter--dark" : ""}`} id={chapter.id} data-num={chapter.num}>
      {/* data-chapter lives on the inner wrap, not the section: the shared
          stylesheet styles section[data-chapter] with its own padding. */}
      <div className="rm-wrap" data-chapter={chapter.title}>
        {/* A chapter the article leaves untitled (the witnesses who open the
            piece) gets a compact band, not a full-viewport plate holding one
            numeral on its own. */}
        <header className={`rm-open rm-open--${opener}${chapter.title ? "" : " rm-open--bare"}`}>
          <div className="rm-open-plate rm-rise">
            <span className="rm-open-num" aria-hidden="true">
              {chapter.num}
            </span>
            <span className="rm-open-rule" aria-hidden="true" />
          </div>
          {/* The article's own heading, or nothing where the section has none.
              Set line by line with Pretext: the title arrives in beats, and a
              long heading never re-wraps mid-reveal. */}
          {chapter.title ? (
            <div className="rm-open-copy">
              <h2 className="rm-h2">
                <DisplayText text={chapter.title} />
              </h2>
            </div>
          ) : null}
        </header>
        <div className="rm-rule rm-rise" aria-hidden="true" />

        <div className="rm-prose">
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
                      className={t.b.kind === "lead" ? "rm-lead" : undefined}
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
