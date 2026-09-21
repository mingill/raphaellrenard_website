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

  /* ---------- flipcards: explicit face controls ---------- */
  var flipCards = Array.prototype.slice.call(
    document.querySelectorAll(".flipcard-container")
  );
  function setFaceAccessibility(face, visible) {
    if (!face) return;
    face.setAttribute("aria-hidden", visible ? "false" : "true");
    face.querySelectorAll("a, button").forEach(function (control) {
      control.tabIndex = visible ? 0 : -1;
    });
  }
  function setFlip(card, on, moveFocus) {
    var inner = card.querySelector(".flipcard-item");
    var front = card.querySelector(".flipcard-front");
    var back = card.querySelector(".flipcard-back");
    if (!inner) return;

    var hiddenFace = on ? front : back;
    var visibleFace = on ? back : front;
    inner.classList.toggle("flipcard-rotate", on);
    card.classList.toggle("flipped", on);
    setFaceAccessibility(front, !on);
    setFaceAccessibility(back, on);
    card.querySelectorAll(".flipcard-toggle").forEach(function (button) {
      button.setAttribute("aria-expanded", on ? "true" : "false");
    });

    var activeElement = document.activeElement;
    var focusHiddenControl =
      moveFocus || (activeElement && hiddenFace && hiddenFace.contains(activeElement));
    if (focusHiddenControl && visibleFace) {
      var visibleToggle = visibleFace.querySelector(".flipcard-toggle");
      if (visibleToggle) visibleToggle.focus();
    }
  }
  flipCards.forEach(function (card) {
    var inner = card.querySelector(".flipcard-item");
    if (!inner) return;
    card.querySelectorAll(".flipcard-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        setFlip(card, !card.classList.contains("flipped"), true);
        disturbFlip();
        scheduleFlipRearm();
      });
    });
    setFlip(card, false, false);
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
    if (!track.hasAttribute("aria-label")) {
      track.setAttribute("aria-label", "Book carousel, use arrow keys to browse");
    }
    track.addEventListener("keydown", function (ev) {
      if (ev.target !== track) return;

      var card = track.querySelector(".book-item");
      var styles = window.getComputedStyle(track);
      var gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0;
      var step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
      var maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        track.scrollTo({
          left: Math.min(maxScroll, track.scrollLeft + step),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } else if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        track.scrollTo({
          left: Math.max(0, track.scrollLeft - step),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } else if (ev.key === "Home") {
        ev.preventDefault();
        track.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
      } else if (ev.key === "End") {
        ev.preventDefault();
        track.scrollTo({
          left: maxScroll,
          behavior: reduceMotion ? "auto" : "smooth",
        });
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
