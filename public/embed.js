/* CNN Immersives embed loader.
 * Usage: <div class="immersive-embed" data-story="montreux"></div>
 *        <script async src="https://YOUR-DOMAIN/embed.js"></script>
 *
 * The data-story attribute determines which immersive to load.
 * Changing only data-story loads a different immersive from the same domain.
 */
(function () {
  "use strict";

  var DEFAULT_HOST = (function () {
    try {
      var script = document.currentScript || document.querySelector('script[src*="embed.js"]');
      if (script && script.src) {
        var url = new URL(script.src);
        return url.origin;
      }
    } catch (e) {}
    return "https://immersives.cnn.com";
  })();

  var FLAG = "immersiveMounted";
  var RETRIES = "immersiveRetries";
  var MAX_RETRIES = 5;
  var lastHeight = 0;

  function isAllowedOrigin(origin, host) {
    if (origin === host) return true;
    try {
      var h = new URL(origin).hostname;
      return h.endsWith(".vercel.app") || h.endsWith(".cnn.com") || h.endsWith(".news18.com");
    } catch (e) {
      return false;
    }
  }

  function getStorySlug(el) {
    return el.getAttribute("data-story") || "montreux";
  }

  function getHost(el) {
    return el.getAttribute("data-host") || DEFAULT_HOST;
  }

  function getStoryTitle(slug) {
    var titles = {
      montreux: "The Montreux Temptation",
    };
    return titles[slug] || slug;
  }

  function getStoryAuthor(slug) {
    var authors = {
      montreux: "Anoshito Banerjee",
    };
    return authors[slug] || "CNN";
  }

  function styleCard(el) {
    var s = el.style;
    s.position = "relative";
    s.width = "100%";
    s.marginTop = "1.6em";
    s.marginBottom = "0.4em";
    s.overflow = "hidden";
    s.borderRadius = "8px";
    s.boxShadow = "0 2px 8px 0 rgba(63,69,81,0.16)";
  }

  function addCredit(el, standaloneUrl, title, author) {
    if (!el.parentNode) return;
    if (el.parentNode.querySelector("[data-immersive-credit]")) return;
    var p = document.createElement("p");
    p.setAttribute("data-immersive-credit", "true");
    p.style.fontSize = "0.85rem";
    p.style.margin = "0.4em 0 0.9em";
    var a = document.createElement("a");
    a.href = standaloneUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = title;
    p.appendChild(a);
    p.appendChild(document.createTextNode(" by " + author));
    el.parentNode.insertBefore(p, el.nextSibling);
  }

  function buildIframeSrc(config, embed) {
    var params = new URLSearchParams();
    if (embed) params.set("embed", "true");
    return config.host + "/" + config.storySlug + "?" + params.toString();
  }

  function createIframe(config, lastHeight) {
    var iframe = document.createElement("iframe");
    iframe.src = buildIframeSrc(config, true);
    iframe.title = config.title;
    iframe.style.width = "100%";
    iframe.style.minHeight = config.minHeight || "70vh";
    iframe.style.border = "0";
    iframe.style.display = "block";
    if (lastHeight > 0) iframe.style.height = lastHeight + "px";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("loading", config.loading || "lazy");
    if (config.allowFullscreen) iframe.setAttribute("allowfullscreen", "true");
    return iframe;
  }

  function watchContainer(container, config) {
    if (!window.MutationObserver || !container.parentNode) return;
    var target = container.parentNode;
    var obs = new MutationObserver(function () {
      var stillThere = container.querySelector("iframe");
      if (!stillThere) {
        var n = parseInt(container.dataset[RETRIES] || "0", 10);
        if (n < MAX_RETRIES) {
          container.dataset[RETRIES] = String(n + 1);
          container.appendChild(createIframe(config, 0));
        } else if (obs) {
          obs.disconnect();
        }
      }
    });
    obs.observe(target, { childList: true, subtree: true });
  }

  function mountInto(el) {
    if (!el || el.dataset[FLAG] === "true") return;
    el.dataset[FLAG] = "true";
    el.dataset[RETRIES] = "0";

    var storySlug = getStorySlug(el);
    var host = getHost(el);
    var title = getStoryTitle(storySlug);
    var author = getStoryAuthor(storySlug);

    var config = {
      storySlug: storySlug,
      host: host,
      title: title,
      minHeight: "70vh",
      allowFullscreen: true,
      loading: "lazy",
    };

    styleCard(el);
    el.appendChild(createIframe(config, lastHeight));

    if (el.parentNode) {
      addCredit(el, host + "/" + storySlug, title, author);
      watchContainer(el, config);
    }
  }

  function mount() {
    var nodes = document.querySelectorAll(".immersive-embed");
    for (var i = 0; i < nodes.length; i++) mountInto(nodes[i]);
  }

  function applyHeight(source, height) {
    var px = Number(height) > 0 ? Number(height) : 0;
    if (!px) return;
    lastHeight = px;
    var frames = document.querySelectorAll(".immersive-embed iframe");
    var hit = false;
    for (var i = 0; i < frames.length; i++) {
      try {
        if (source && frames[i].contentWindow !== source) continue;
      } catch (e) {
        continue;
      }
      frames[i].style.height = px + "px";
      hit = true;
    }
    if (!hit) {
      for (var j = 0; j < frames.length; j++) frames[j].style.height = px + "px";
    }
  }

  window.addEventListener("message", function (e) {
    var host = DEFAULT_HOST;
    if (!isAllowedOrigin(e.origin, host)) return;
    var d = e.data;
    if (!d || d.type !== "IMMERSIVE_RESIZE") return;
    applyHeight(e.source, d.height);
  });

  var mounted = false;
  function mountOnce() {
    if (mounted) return;
    mounted = true;
    mount();
  }

  if (document.readyState === "complete") {
    window.setTimeout(mountOnce, 800);
  } else {
    window.addEventListener("load", function () {
      window.setTimeout(mountOnce, 800);
    });
    window.setTimeout(mountOnce, 4000);
  }
})();