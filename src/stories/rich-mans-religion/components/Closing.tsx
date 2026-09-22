import { META } from "../assets/article";

/**
 * Sources and credits only. There is deliberately no "how this was reported"
 * paragraph and no fine print about methodology: the article carries its own
 * reporting note in the body, and this build does not add sentences to it.
 */
export default function Closing(): React.JSX.Element {
  return (
    <footer className="closing">
      <div className="rm-wrap closing-grid">
        <div>
          <p className="rm-kicker">Sources and further reading</p>
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
          <p className="rm-kicker">Credits</p>
          <p className="closing-fine">Photographs are credited individually.</p>
          <p className="closing-fine">Figures in rupees, as reported.</p>

          <details className="rm-details">
            <summary>Who spoke to News18</summary>
            <p className="closing-fine">
              Coaches Ashif Haque, Surendra Rathore, Badruddin Siddiqui, Sukhwinder Bawa and Irfan Sait;
              entrepreneur Saroj Yadhuvanshi; manufacturer Varun Kumar; cricketers Mohul Bhowmick, Manzoor Pandav,
              Waseem Mirza and Ashwini Maurya; teacher Sanjay Pathak; and researchers Dr. Biju Philip and Dr. Mary Ann Dove.
            </p>
          </details>

          <details className="rm-details">
            <summary>How to read the figures</summary>
            <p className="closing-fine">
              Every number on this page is one the article itself reports. Rupee amounts are shown as filed, and each
              figure and chart restates a sentence from the reporting rather than adding an estimate of its own.
            </p>
          </details>
        </div>
      </div>

      <div className="rm-wrap closing-sign">
        <p className="closing-byline">{META.byline}</p>
        <p>{META.title}</p>
      </div>
    </footer>
  );
}
