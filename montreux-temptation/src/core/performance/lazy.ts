export function createIntersectionObserver(
  elements: HTMLElement[],
  callback: (element: HTMLElement) => void,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "50px" }
): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    elements.forEach(callback);
    return null;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      }
    },
    options
  );
  elements.forEach((el) => observer.observe(el));
  return observer;
}

export function preloadFont(fontFamily: string, weight?: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  return document.fonts.load(`${weight || "400"} 1rem "${fontFamily}"`);
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): T {
  let inThrottle = false;
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}