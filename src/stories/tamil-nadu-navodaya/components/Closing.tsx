import { META } from "../assets/article";

/**
 * Sources and credits. Every figure and quotation on the page is one the
 * article itself carries; this footer only points to where they came from.
 */
export default function Closing(): React.JSX.Element {
  return (
    <footer className="closing">
      <div className="nv-wrap closing-grid">
        <div>
          <p className="nv-kicker">Sources and further reading</p>
          <ul className="closing-sources">
            {META.sources.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ) : (
                  <span>{s.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="nv-kicker">Credits</p>
          <p className="closing-fine">Photographs are credited individually.</p>
          <p className="closing-fine">Quotations and figures are as filed.</p>

          <details className="nv-details">
            <summary>What the courts said</summary>
            <p className="closing-fine">
              In 2017 the Madras High Court found the scheme could accommodate Tamil and did not, on that basis, violate the
              state’s Tamil Learning Act. On September 17 the Supreme Court refused to recall its direction to identify land in
              every district, gave Tamil Nadu three more months, and urged the state and the Centre to resolve their differences
              through dialogue.
            </p>
          </details>

          <details className="nv-details">
            <summary>How to read this</summary>
            <p className="closing-fine">
              Every claim on this page is one the article reports. The map, the language comparison and the timeline restate
              sentences from the piece rather than adding facts of their own.
            </p>
          </details>
        </div>
      </div>

      <div className="nv-wrap closing-sign">
        <p className="closing-byline">{META.byline}</p>
        <p>{META.title}</p>
      </div>
    </footer>
  );
}
