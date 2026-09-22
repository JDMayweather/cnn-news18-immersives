import { useEffect, useRef, useState } from "react";

/**
 * An ambient bed from /Untitled.mp3, played low (25%). Muted by default —
 * the reader turns it on. Not offered when Save-Data is on. The control only
 * appears once the browser can actually decode the file.
 */
export default function AmbientAudio(): React.JSX.Element | null {
  const ref = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState(true);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
      if (conn?.saveData) {
        setAvailable(false);
        return;
      }
    }
    const a = ref.current;
    if (!a) return;
    a.volume = 0.25;
    const ok = (): void => setAvailable(true);
    const bad = (): void => setAvailable(false);
    a.addEventListener("canplay", ok);
    a.addEventListener("error", bad);
    return () => {
      a.removeEventListener("canplay", ok);
      a.removeEventListener("error", bad);
    };
  }, []);

  const toggle = (): void => {
    const a = ref.current;
    if (!a) return;
    a.volume = 0.25;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.play()
        .then(() => setOn(true))
        .catch(() => setOn(false));
    }
  };

  return (
    <>
      <audio ref={ref} src="/Untitled.mp3" loop preload="auto" />
      {available ? (
        <button
          type="button"
          className={`rm-sound${on ? " is-on" : ""}`}
          onClick={toggle}
          aria-pressed={on}
          aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
        >
          <span />
          <span />
          <span />
          <span />
        </button>
      ) : null}
    </>
  );
}
