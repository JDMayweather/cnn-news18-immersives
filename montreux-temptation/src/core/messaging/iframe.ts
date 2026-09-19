export interface ResizeMessage {
  type: "IMMERSIVE_RESIZE";
  height: number;
}

export interface MessagePayload {
  type: string;
  [key: string]: unknown;
}

const ALLOWED_ORIGINS = [
  "https://news18.com",
  "https://www.news18.com",
  "https://*.news18.com",
  "https://*.cnnnews18.com",
];

export function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.some((allowed) => {
    if (allowed.includes("*")) {
      const pattern = allowed.replace(/\*/g, ".*");
      return new RegExp(`^${pattern}$`).test(origin);
    }
    return allowed === origin;
  });
}

export function sendResizeMessage(height: number, targetOrigin: string = "*"): void {
  if (typeof window === "undefined" || typeof window.parent === "undefined") return;
  const message: ResizeMessage = { type: "IMMERSIVE_RESIZE", height };
  window.parent.postMessage(message, targetOrigin);
}

export function onResizeMessage(
  handler: (height: number, event: MessageEvent) => void,
  allowedOrigins: string[] = ALLOWED_ORIGINS
): () => void {
  if (typeof window === "undefined") return () => {};

  const listener = (event: MessageEvent) => {
    if (!allowedOrigins.some((o) => (o.includes("*") ? new RegExp(`^${o.replace(/\*/g, ".*")}$`).test(event.origin) : o === event.origin))) {
      return;
    }
    const data = event.data as MessagePayload | undefined;
    if (!data || data.type !== "IMMERSIVE_RESIZE") return;
    const height = Number(data.height);
    if (Number.isFinite(height) && height > 0) {
      handler(height, event);
    }
  };

  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}