export function isEmbedMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("embed");
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getViewportDimensions(): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  return { width: window.innerWidth, height: window.innerHeight };
}

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 640;
}

export function isTablet(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 640 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1024;
}

export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}

export function onReducedMotionChange(callback: (reduced: boolean) => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (event: MediaQueryListEvent) => callback(event.matches);
  query.addEventListener("change", handler);
  return () => query.removeEventListener("change", handler);
}