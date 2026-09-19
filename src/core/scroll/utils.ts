export function getScrollProgress(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

export function getScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY;
}

export function observeSectionVisibility(
  selector: string,
  callback: (id: string, isIntersecting: boolean) => void,
  options: IntersectionObserverInit = { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
): () => void {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return () => {};
  }
  const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!sections.length) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          callback(target.id || target.dataset.chapter || "", true);
        }
      }
    },
    options
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}

export function observeElementVisibility(
  element: HTMLElement,
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.2 }
): () => void {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    callback(true);
    return () => {};
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callback(entry.isIntersecting);
        if (entry.isIntersecting) observer.disconnect();
      }
    },
    options
  );
  observer.observe(element);
  return () => observer.disconnect();
}