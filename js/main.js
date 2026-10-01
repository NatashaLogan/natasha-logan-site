/*
  Site behavior:
  1. Marks the current page in the nav
  2. Renders content-page grids from js/data.js
  3. Scroll reveal
*/
(function () {
  "use strict";

  /* 1. Current page in nav -------------------------------------------------- */
  var page = document.body.dataset.page;
  document.querySelectorAll(".nav a[data-page]").forEach(function (a) {
    if (a.dataset.page === page) a.setAttribute("aria-current", "page");
  });

  /* 2. Content grids -------------------------------------------------------- */
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function bookCard(b) {
    var art = b.image
      ? '<img src="' + esc(b.image) + '" alt="Cover of ' + esc(b.title) + '" loading="lazy">'
      : '<div class="cover" style="--c1:' + esc(b.c1) + '; --c2:' + esc(b.c2) + ';">' +
          '<span class="a">' + esc(b.type) + '</span>' +
          '<span class="t">' + esc(b.title) + '</span>' +
          '<span class="a">Natasha Logan</span>' +
        '</div>';
    return '<article class="book">' +
      '<a class="cover-link" href="' + esc(b.link) + '" target="_blank" rel="noopener" aria-label="' + esc(b.title) + '">' + art + '</a>' +
      '<span class="meta">' + esc(b.type) + ' · ' + esc(b.year) + '</span>' +
      '<h3>' + esc(b.title) + '</h3>' +
      '<p>' + esc(b.intro) + '</p>' +
      '<a class="link" href="' + esc(b.link) + '" target="_blank" rel="noopener">Learn more</a>' +
    '</article>';
  }

  function entryCard(e) {
    var art = e.image
      ? '<img src="' + esc(e.image) + '" alt="' + esc(e.title) + '" loading="lazy">'
      : '<div class="ph" style="--p1:' + esc(e.p1) + '; --p2:' + esc(e.p2) + ';"><span>Photo</span></div>';
    return '<article class="entry">' +
      '<a href="' + esc(e.link) + '" target="_blank" rel="noopener" aria-label="' + esc(e.title) + '">' + art + '</a>' +
      '<span class="meta">' + esc(e.meta) + '</span>' +
      '<h3>' + esc(e.title) + '</h3>' +
      '<p>' + esc(e.intro) + '</p>' +
      '<a class="link" href="' + esc(e.link) + '" target="_blank" rel="noopener">Read more</a>' +
    '</article>';
  }

  var data = window.SITE_DATA || {};
  document.querySelectorAll("[data-collection]").forEach(function (el) {
    var name = el.dataset.collection;
    var items = data[name] || [];
    var render = name === "books" ? bookCard : entryCard;
    el.innerHTML = items.map(render).join("");
  });

  /* 3. Scroll reveal -------------------------------------------------------- */
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
