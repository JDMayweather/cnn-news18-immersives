export interface EmbedConfig {
  storySlug: string;
  host: string;
  containerSelector: string;
  minHeight?: string;
  allowFullscreen?: boolean;
  loading?: "lazy" | "eager";
}

function isValidOrigin(origin: string, allowedHost: string): boolean {
  if (origin === allowedHost) return true;
  try {
    const hostname = new URL(origin).hostname;
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function buildIframeSrc(config: EmbedConfig, embed: boolean = true): string {
  const params = new URLSearchParams();
  if (embed) params.set("embed", "true");
  return `${config.host}/${config.storySlug}?${params.toString()}`;
}

function createIframe(config: EmbedConfig, lastHeight: number): HTMLIFrameElement {
  const iframe = document.createElement("iframe");
  iframe.src = buildIframeSrc(config);
  iframe.title = config.storySlug;
  iframe.style.width = "100%";
  iframe.style.minHeight = config.minHeight || "70vh";
  iframe.style.border = "0";
  iframe.style.display = "block";
  if (lastHeight > 0) iframe.style.height = `${lastHeight}px`;
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("loading", config.loading || "lazy");
  if (config.allowFullscreen) iframe.setAttribute("allowfullscreen", "true");
  return iframe;
}

function styleContainer(container: HTMLElement): void {
  const s = container.style;
  s.position = "relative";
  s.width = "100%";
  s.marginTop = "1.6em";
  s.marginBottom = "0.4em";
  s.overflow = "hidden";
  s.borderRadius = "8px";
  s.boxShadow = "0 2px 8px 0 rgba(63,69,81,0.16)";
}

function addCredit(container: HTMLElement, standaloneUrl: string, title: string, author: string): void {
  if (!container.parentNode) return;
  if (container.parentNode.querySelector("[data-immersive-credit]")) return;
  const p = document.createElement("p");
  p.setAttribute("data-immersive-credit", "true");
  p.style.fontSize = "0.85rem";
  p.style.margin = "0.4em 0 0.9em";
  const a = document.createElement("a");
  a.href = standaloneUrl;
  a.target = "_blank";
  a.rel = "noopener";
  a.textContent = title;
  p.appendChild(a);
  p.appendChild(document.createTextNode(` by ${author}`));
  container.parentNode.insertBefore(p, container.nextSibling);
}

function watchContainer(container: HTMLElement, config: EmbedConfig, maxRetries: number = 5): MutationObserver | null {
  if (!window.MutationObserver || !container.parentNode) return null;
  const target = container.parentNode;
  const retriesKey = "immersiveRetries";

  const observer = new MutationObserver(() => {
    const stillThere = container.querySelector("iframe");
    if (!stillThere) {
      const n = parseInt(container.dataset[retriesKey] || "0", 10);
      if (n < maxRetries) {
        container.dataset[retriesKey] = String(n + 1);
        container.appendChild(createIframe(config, 0));
      } else {
        observer.disconnect();
      }
    }
  });

  observer.observe(target, { childList: true, subtree: true });
  return observer;
}

let lastHeight = 0;
let mounted = false;

export function initEmbed(config: EmbedConfig): void {
  if (mounted) return;
  mounted = true;

  const containers = document.querySelectorAll<HTMLElement>(config.containerSelector);
  containers.forEach((container) => {
    if (container.dataset.immersiveMounted === "true") return;
    container.dataset.immersiveMounted = "true";
    container.dataset.immersiveRetries = "0";

    styleContainer(container);
    container.appendChild(createIframe(config, lastHeight));

    if (container.parentNode) {
      addCredit(
        container,
        `${config.host}/${config.storySlug}`,
        config.storySlug,
        "Anoshito Banerjee"
      );
      watchContainer(container, config);
    }
  });

  window.addEventListener("message", (event) => {
    if (!isValidOrigin(event.origin, config.host)) return;
    const data = event.data as { type?: string; height?: number };
    if (!data || data.type !== "IMMERSIVE_RESIZE") return;
    const height = data.height ?? 0;
    applyHeight(event.source, height);
  });
}

function applyHeight(source: MessageEventSource | null, height: number): void {
  const px = Number(height) > 0 ? Number(height) : 0;
  if (!px) return;
  lastHeight = px;
  const frames = document.querySelectorAll<HTMLIFrameElement>(".immersive-embed iframe");
  let hit = false;
  for (const frame of frames) {
    try {
      if (source && frame.contentWindow !== source) continue;
    } catch {
      continue;
    }
    frame.style.height = `${px}px`;
    hit = true;
  }
  if (!hit) {
    for (const frame of frames) frame.style.height = `${px}px`;
  }
}

function mountOnce(config: EmbedConfig): void {
  if (document.readyState === "complete") {
    setTimeout(() => initEmbed(config), 800);
  } else {
    window.addEventListener("load", () => setTimeout(() => initEmbed(config), 800));
    setTimeout(() => initEmbed(config), 4000);
  }
}

export function createEmbedLoader(config: EmbedConfig): void {
  mountOnce(config);
}