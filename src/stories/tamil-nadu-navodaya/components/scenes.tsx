/**
 * The pinned visuals, driven by the active step of their ScrollScene. All type
 * is HTML, never SVG text, so labels stay sharp at any size.
 */

/* ------------------------------------------------------ two vs three ------ */

/**
 * Two-language against three-language, class by class. Tamil Nadu's column
 * resolves to Tamil and English; the Navodaya column adds the third-language
 * slot. Rows light as the reader moves through the steps.
 */
type Chip = { label: string; script?: string; kind: "tamil" | "english" | "third" };

const TN_ROWS: { band: string; chips: Chip[] }[] = [
  { band: "Classes 6–8", chips: [{ label: "Tamil", script: "தமிழ்", kind: "tamil" }] },
  { band: "Classes 9–10", chips: [{ label: "Tamil", script: "தமிழ்", kind: "tamil" }, { label: "English", kind: "english" }] },
];

const NV_ROWS: { band: string; chips: Chip[] }[] = [
  { band: "Classes 6–8", chips: [{ label: "Regional", script: "தமிழ்", kind: "tamil" }] },
  { band: "Classes 9–10", chips: [{ label: "Regional", script: "தமிழ்", kind: "tamil" }, { label: "English", kind: "english" }] },
  { band: "The third", chips: [{ label: "Third language", kind: "third" }] },
];

function Column({ name, tag, rows, revealed, thirdOn }: { name: string; tag: string; rows: { band: string; chips: Chip[] }[]; revealed: number; thirdOn: boolean }): React.JSX.Element {
  return (
    <div className="nv-lang-col">
      <p className="nv-lang-name">{name}</p>
      <p className="nv-lang-tag">{tag}</p>
      <ul className="nv-lang-rows">
        {rows.map((row, i) => {
          const isThird = row.band === "The third";
          const on = isThird ? thirdOn : i < revealed;
          return (
            <li key={row.band} className={`nv-lang-row${on ? " is-on" : ""}`}>
              <span className="nv-lang-band">{row.band}</span>
              <span className="nv-lang-chips">
                {row.chips.map((c) => (
                  <span key={c.label} className={`nv-chip nv-chip--${c.kind}`}>
                    {c.script ? <b lang="ta">{c.script}</b> : null}
                    {c.label}
                  </span>
                ))}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LanguageScene({ active }: { active: number }): React.JSX.Element {
  const revealed = Math.min(active + 1, 2); /* rows 6–8, then 9–10 */
  const thirdOn = active >= 2;
  return (
    <div className="nv-lang">
      <Column name="Tamil Nadu" tag="Two languages" rows={TN_ROWS} revealed={revealed} thirdOn={false} />
      <Column name="Navodaya" tag="Three languages" rows={NV_ROWS} revealed={revealed} thirdOn={thirdOn} />
    </div>
  );
}

/* ------------------------------------------------------------ timeline ---- */

const NODES = [
  { year: "1960s", label: "Anti-Hindi agitations" },
  { year: "2006", label: "Tamil Learning Act" },
  { year: "2017", label: "Madras High Court" },
  { year: "Sept 17", label: "Supreme Court" },
];

export function TimelineScene({ active }: { active: number }): React.JSX.Element {
  return (
    <ol className="nv-tl" aria-hidden="true">
      {NODES.map((n, i) => {
        const state = i < active ? " is-past" : i === active ? " is-on" : "";
        return (
          <li key={n.year} className={`nv-tl-node${state}`}>
            <span className="nv-tl-dot" />
            <span className="nv-tl-year">{n.year}</span>
            <span className="nv-tl-label">{n.label}</span>
          </li>
        );
      })}
      <span className="nv-tl-spine" style={{ ["--fill-n" as string]: `${Math.min(active, NODES.length - 1) / (NODES.length - 1)}` }} />
    </ol>
  );
}

export const SCENES = {
  language: LanguageScene,
  timeline: TimelineScene,
} as const;
