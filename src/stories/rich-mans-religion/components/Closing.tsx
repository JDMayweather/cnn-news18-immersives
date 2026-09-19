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
        </div>
      </div>

      <div className="rm-wrap closing-sign">
        <p>{META.byline}</p>
        <p>{META.title}</p>
      </div>
    </footer>
  );
}
