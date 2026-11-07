/*
  Site behavior:
  1. Marks the current page in the nav
  2. Scroll reveal
*/
(function () {
  "use strict";

  /* 1. Current page in nav -------------------------------------------------- */
  var page = document.body.dataset.page;
  document.querySelectorAll(".nav a[data-page]").forEach(function (a) {
    if (a.dataset.page === page) a.setAttribute("aria-current", "page");
  });

  /* 2. Scroll reveal -------------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduceMotion) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.remove("pending");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  var selectors = [
    ".hero > *", ".feature", ".band", ".socials > li",
    ".page-intro", ".book", ".entry", ".photo",
    ".about .portrait-wrap", ".about > .stack > *"
  ].join(",");
  var gridParents = ".features, .book-grid, .entry-grid, .socials, .photo-grid";

  var fold = window.innerHeight;
  var counts = new Map();

  document.querySelectorAll("main " + selectors).forEach(function (el) {
    el.classList.add("reveal");

    // Stagger cards that share a grid
    var parent = el.parentElement;
    var i = counts.get(parent) || 0;
    counts.set(parent, i + 1);
    el.style.setProperty("--d", parent.matches(gridParents) ? (i % 4) * 90 + "ms" : "0ms");

    // Items already on screen stay visible; only below-fold items wait
    if (el.getBoundingClientRect().top >= fold) {
      el.classList.add("pending");
      io.observe(el);
    }
  });
})();
