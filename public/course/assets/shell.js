/* Site shell for the course: the app's header (brand, links, theme toggle).
   Inserted synchronously where the script tag sits so the header is first in the body. */
(function () {
  var sun = '<svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"></circle><path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56"></path></svg>';
  var moon = '<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.1A8.4 8.4 0 0 1 8.9 4a8.4 8.4 0 1 0 11.1 11.1Z"></path></svg>';
  var html =
    '<nav class="site-nav" aria-label="Primary navigation">' +
    '<a class="site-brand" href="/">Tarot Arcana</a>' +
    '<div class="site-nav-actions"><div class="site-nav-links">' +
    '<a class="site-nav-link" href="/">Today</a>' +
    '<a class="site-nav-link" href="/readings">Readings</a>' +
    '<a class="site-nav-link" href="/notes">Notes</a>' +
    '</div>' +
    '<button class="theme-toggle" type="button" aria-label="Toggle light and dark mode" title="Toggle light and dark mode">' + sun + moon + '</button>' +
    '</div></nav>';
  var script = document.currentScript;
  if (!script) return;
  script.insertAdjacentHTML("afterend", html);

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f2efe8" : "#20232f");
  }

  var toggle = script.nextElementSibling.querySelector(".theme-toggle");
  toggle.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("tarot-arcana:theme", next); } catch {}
  });
})();
