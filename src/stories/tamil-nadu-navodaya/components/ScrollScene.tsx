import { useEffect, useRef, useState } from "react";
import type { SceneStep } from "../assets/article";

/**
 * A pinned scene: the visual holds still while the steps scroll past it, so a
 * number does not just sit on a page — it assembles while you read.
 *
 * The step nearest the middle of the viewport is the active one, which keeps
 * the visual in sync with whatever line the reader is actually looking at
 * instead of firing on a scroll percentage.
 */
export default function ScrollScene({
  label,
  steps,
  children,
}: {
  label: string;
  steps: SceneStep[];
  children: (active: number) => React.ReactNode;
}): React.JSX.Element {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = items.current.filter((n): n is HTMLLIElement => n !== null);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = nodes.indexOf(entry.target as HTMLLIElement);
          if (i >= 0) setActive(i);
        }
      },
      /* A thin band across the middle of the screen: one step can win at a time. */
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="nv-scene" role="group" aria-label={label}>
      <div className="nv-scene-stage">
        <div className="nv-scene-visual">{children(active)}</div>
        <p className="nv-scene-count" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </p>
      </div>

      <ol className="nv-scene-steps">
        {steps.map((step, i) => (
          <li
            key={step.k}
            ref={(el) => {
              items.current[i] = el;
            }}
            className={`nv-step${i === active ? " is-on" : i < active ? " is-past" : ""}`}
          >
            <span className="nv-step-rail" aria-hidden="true">
              <i />
            </span>
            <span className="nv-step-k">{step.k}</span>
            <span className="nv-step-v">{step.v}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
