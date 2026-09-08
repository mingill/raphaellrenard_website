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

  /* ---------- flipcards: desktop manual, touch dwell-auto ----------
     Desktop (hover): click / Enter / Space flips, as before.
     Touch: no hover, so a card flips itself — but only after sitting
     FULLY in view, untouched, for 2.5s. Holds 4s, flips back, rests.
     Any scroll/touch/tap disturbs it and the dwell starts over. */
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
    card.addEventListener("click", function () {
      setFlip(card, !card.classList.contains("flipped"));
      coolUntil = Date.now() + 12000; // manual tap buys 12s of peace
    });
    card.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        setFlip(card, !card.classList.contains("flipped"));
        coolUntil = Date.now() + 12000;
      }
    });
  });

  var touchFlip = window.matchMedia("(hover: none)").matches;
  var coolUntil = 0;
  if (touchFlip && !reduceMotion && flipCards.length && "IntersectionObserver" in window) {
    var watched = null;
    var dwellT = 0;
    var holdT = 0;
    var rearmT = 0;
    var clearFlipTimers = function () {
      clearTimeout(dwellT);
      clearTimeout(holdT);
    };
    var armDwell = function () {
      clearFlipTimers();
      if (!watched || Date.now() < coolUntil) return;
      if (watched.classList.contains("flipped")) return;
      dwellT = setTimeout(function () {
        if (!watched || Date.now() < coolUntil) return;
        var card = watched;
        setFlip(card, true);
        holdT = setTimeout(function () {
          setFlip(card, false);
          coolUntil = Date.now() + 8000;
        }, 4000);
      }, 2500);
    };
    var disturb = function () {
      clearFlipTimers();
      clearTimeout(rearmT);
      coolUntil = Date.now() + 3000;
    };
    var scheduleRearm = function () {
      clearTimeout(rearmT);
      rearmT = setTimeout(armDwell, 3200);
    };
    var watcher = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.99) {
            watched = entry.target;
            armDwell();
          } else if (watched === entry.target) {
            watched = null;
            clearFlipTimers();
            setFlip(entry.target, false);
          }
        });
      },
      { threshold: [0, 0.99, 1] }
    );
    flipCards.forEach(function (card) {
      watcher.observe(card);
    });
    window.addEventListener(
      "scroll",
      function () {
        disturb();
        scheduleRearm();
      },
      { passive: true }
    );
    window.addEventListener("touchstart", disturb, { passive: true });
    window.addEventListener("touchend", scheduleRearm, { passive: true });
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
