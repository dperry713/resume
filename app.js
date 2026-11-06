/* ============================================================
   Dustin Perry — résumé site behaviour
   No dependencies. Every enhancement degrades gracefully:
   with JavaScript disabled the page is still fully readable,
   the résumé PDF link works, and Ctrl+P prints the résumé.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "dp-theme";

  /* ---------- theme toggle ---------- */
  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function syncToggle() {
    if (!toggle) return;
    var isDark = currentTheme() === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        /* Storage can be blocked (private mode, file:// quirks); the theme still applies. */
      }
    }
    syncToggle();
  }

  if (toggle) {
    syncToggle();
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  }

  /* Follow the OS preference while the visitor has not chosen a theme. */
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var onSystemChange = function (event) {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (error) {
      saved = null;
    }
    if (saved !== "dark" && saved !== "light") {
      applyTheme(event.matches ? "dark" : "light", false);
    }
  };
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onSystemChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onSystemChange);
  }

  /* ---------- print ---------- */
  var printButton = document.getElementById("print-button");
  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  /* ---------- header shadow after scrolling ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ---------- active section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  function markActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Map();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });
        if (!visible.size) return;
        var best = null;
        visible.forEach(function (ratio, id) {
          if (best === null || ratio > visible.get(best)) best = id;
        });
        if (best) markActive(best);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6, 1] }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- hide the PDF button only when the file is really missing ---------- */
  var pdfLink = document.getElementById("download-pdf");
  if (pdfLink && window.fetch) {
    fetch(pdfLink.getAttribute("href"), { method: "HEAD", cache: "no-store" })
      .then(function (response) {
        if (response.status === 404 || response.status === 410) {
          pdfLink.remove();
        }
      })
      .catch(function () {
        /* Offline, file://, or a blocked HEAD request: keep the link, the browser will resolve it. */
      });
  }
})();
