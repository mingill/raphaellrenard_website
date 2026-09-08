/* SAGA & SMOKE — pilot interactions (index + apt)
   Reveals, hero parallax, manual flipcards, carousel keyboard.
   Everything guarded by prefers-reduced-motion. No dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.classList.add("saga");

  /* ---------- scroll reveals ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-hero .hero, .section-books .wrapper, .feature, .author-box, " +
      ".quotes-item, .flipcard-container, .map, .section-book, .impressum, .datenschutz"
  );
  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("saga-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      el.classList.add("saga-reveal");
      observer.observe(el);
    });
  }

  /* ---------- hero parallax ---------- */
  var heroStrip = document.querySelector(".hero-img-box");
  if (heroStrip && !reduceMotion) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var y = window.scrollY;
            if (y < window.innerHeight) {
              heroStrip.style.transform = "translateY(" + y * 0.08 + "px)";
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ---------- flipcards: desktop manual, touch 5s metronome ----------
     Desktop (hover): click / Enter / Space flips, hover tips the card.
     Touch: no hover, so the card flips itself on a steady 5s rhythm —
     but only while fully in view and untouched. Any scroll, touch or
     tap resets the timer and pauses it; tap flips immediately. */
  var flipCards = Array.prototype.slice.call(
    document.querySelectorAll(".flipcard-container")
  );
  function setFlip(card, on) {
    var inner = card.querySelector(".flipcard-item");
    if (!inner) return;
    inner.classList.toggle("flipcard-rotate", on);
    card.classList.toggle("flipped", on);
    card.setAttribute("aria-pressed", on ? "true" : "false");
  }
  function tappedLink(ev) {
    return ev.target && ev.target.closest && ev.target.closest(".flipcard-link");
  }
  flipCards.forEach(function (card) {
    var inner = card.querySelector(".flipcard-item");
    if (!inner) return;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
    var label =
      card.querySelector(".flipcard-text")?.textContent?.trim().slice(0, 80) ||
      "quote card";
    card.setAttribute("aria-label", "Reveal quote: " + label);
    card.addEventListener("click", function (ev) {
      if (tappedLink(ev)) return; // book link navigates, card stays put
      setFlip(card, !card.classList.contains("flipped"));
      disturbFlip();
      scheduleFlipRearm();
    });
    card.addEventListener("keydown", function (ev) {
      if (tappedLink(ev)) return;
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        setFlip(card, !card.classList.contains("flipped"));
        disturbFlip();
        scheduleFlipRearm();
      }
    });
  });

  var touchFlip = window.matchMedia("(hover: none)").matches;
  var flipWatched = null;
  var flipQuiet = true;
  var flipT = 0;
  var flipRearmT = 0;
  function disturbFlip() {
    flipQuiet = false;
    clearTimeout(flipT);
    clearTimeout(flipRearmT);
  }
  function scheduleFlipRearm() {
    clearTimeout(flipRearmT);
    flipRearmT = setTimeout(function () {
      flipQuiet = true;
      scheduleFlipTick();
    }, 1500);
  }
  function scheduleFlipTick() {
    clearTimeout(flipT);
    if (!flipWatched) return;
    flipT = setTimeout(function () {
      if (flipWatched && flipQuiet) {
        setFlip(flipWatched, !flipWatched.classList.contains("flipped"));
      }
      scheduleFlipTick(); // steady 5s rhythm while in view
    }, 5000);
  }
  if (touchFlip && !reduceMotion && flipCards.length && "IntersectionObserver" in window) {
    var flipWatcher = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.99) {
            flipWatched = entry.target;
            if (flipQuiet) scheduleFlipTick();
          } else if (flipWatched === entry.target) {
            flipWatched = null;
            clearTimeout(flipT);
            setFlip(entry.target, false);
          }
        });
      },
      { threshold: [0, 0.99, 1] }
    );
    flipCards.forEach(function (card) {
      flipWatcher.observe(card);
    });
    window.addEventListener(
      "scroll",
      function () {
        disturbFlip();
        scheduleFlipRearm();
      },
      { passive: true }
    );
    window.addEventListener("touchstart", disturbFlip, { passive: true });
    window.addEventListener("touchend", scheduleFlipRearm, { passive: true });
  }

  /* ---------- carousel: arrow-key scrolling ---------- */
  document.querySelectorAll(".books-container").forEach(function (track) {
    track.setAttribute("tabindex", "0");
    track.setAttribute("role", "region");
    track.setAttribute("aria-label", "Book carousel, use arrow keys to browse");
    track.addEventListener("keydown", function (ev) {
      var step = 380;
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        track.scrollBy({ left: step, behavior: reduceMotion ? "auto" : "smooth" });
      } else if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        track.scrollBy({ left: -step, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });
  /* ---------- flipcards: scroll-driven color on touch devices ----------
     No hover on mobile, so images bloom with visibility instead:
     the more of a card is in view, the more saturated it gets. */
  var touchOnly = window.matchMedia("(hover: none)").matches;
  if (touchOnly && !reduceMotion) {
    var wakeCards = Array.prototype.slice.call(
      document.querySelectorAll(".flipcard-container")
    );
    if (wakeCards.length) {
      var waking = false;
      var wake = function () {
        waking = false;
        var vh = window.innerHeight;
        wakeCards.forEach(function (card) {
          var r = card.getBoundingClientRect();
          var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
          var ratio = Math.max(0, Math.min(1, vis / (r.height || 1)));
          if (card.classList.contains("flipped")) ratio = 1;
          var g = (0.6 * (1 - ratio)).toFixed(3);
          var s = (0.25 * (1 - ratio)).toFixed(3);
          card.querySelectorAll(".flipcard-img").forEach(function (img) {
            img.style.filter =
              "grayscale(" + g + ") sepia(" + s + ") contrast(1.05)";
          });
        });
      };
      var scheduleWake = function () {
        if (!waking) {
          waking = true;
          window.requestAnimationFrame(wake);
        }
      };
      window.addEventListener("scroll", scheduleWake, { passive: true });
      window.addEventListener("resize", scheduleWake);
      scheduleWake();
    }
  }
})();
