"use strict";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const carouselTracks = document.querySelectorAll(".books-container");
const isEnglishHomepage = document.documentElement.lang === "en";

function getCarouselStep(track) {
  const firstCard = track.querySelector(".book-item");
  if (!firstCard) return track.clientWidth;

  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0;
  return firstCard.getBoundingClientRect().width + gap;
}

function getCarouselMaxScroll(track) {
  return Math.max(0, track.scrollWidth - track.clientWidth);
}

function getVisibleBookCount(track) {
  const cards = track.querySelectorAll(".book-item");
  const firstCard = cards[0];
  if (!firstCard) return 0;

  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0;
  const step = getCarouselStep(track);
  const visibleCount = Math.floor((track.clientWidth + gap + 1) / step);

  return Math.min(cards.length, Math.max(1, visibleCount));
}

function updateCarouselButtons(track) {
  const wrapper = track.closest(".wrapper");
  if (!wrapper) return;

  const maxScroll = getCarouselMaxScroll(track);
  const atStart = track.scrollLeft <= 1;
  const atEnd = track.scrollLeft >= maxScroll - 1;
  const leftButton = wrapper.querySelector(".btn--left");
  const rightButton = wrapper.querySelector(".btn--right");
  const buttons = [leftButton, rightButton].filter(Boolean);
  const cards = track.querySelectorAll(".book-item");
  const allBooksVisible =
    track.closest("#books") && getVisibleBookCount(track) >= cards.length;

  buttons.forEach((button) => {
    button.hidden = Boolean(allBooksVisible);
    button.style.display = allBooksVisible ? "none" : "";
  });

  if (allBooksVisible) return;

  if (leftButton) {
    leftButton.disabled = atStart;
    leftButton.setAttribute("aria-disabled", String(atStart));
    leftButton.setAttribute(
      "aria-label",
      isEnglishHomepage ? "Previous books" : "Vorherige Bücher"
    );
  }
  if (rightButton) {
    rightButton.disabled = atEnd;
    rightButton.setAttribute("aria-disabled", String(atEnd));
    rightButton.setAttribute(
      "aria-label",
      isEnglishHomepage ? "Next books" : "Nächste Bücher"
    );
  }
}

function scrollCarousel(track, direction) {
  const maxScroll = getCarouselMaxScroll(track);
  const target = Math.min(
    maxScroll,
    Math.max(0, track.scrollLeft + direction * getCarouselStep(track))
  );

  if (typeof track.scrollTo === "function") {
    track.scrollTo({
      left: target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  } else {
    track.scrollLeft = target;
  }
}

function alignPrimaryCarousel(track) {
  if (!track.closest("#books")) return;

  const target =
    getVisibleBookCount(track) === 1
      ? Math.min(getCarouselMaxScroll(track), getCarouselStep(track))
      : 0;

  if (Math.abs(track.scrollLeft - target) <= 1) return;

  track.scrollLeft = target;
}

carouselTracks.forEach((track, index) => {
  if (!track.id) track.id = `books-carousel-${index + 1}`;
  track.setAttribute("tabindex", "0");
  track.setAttribute("role", "region");
  track.setAttribute(
    "aria-label",
    isEnglishHomepage
      ? index === 0
        ? "English book collection carousel"
        : "German-language book collection carousel"
      : "Book collection carousel"
  );

  const wrapper = track.closest(".wrapper");
  const buttons = wrapper
    ? wrapper.querySelectorAll(".btn--left, .btn--right")
    : [];

  buttons.forEach((button) => {
    button.type = "button";
    button.setAttribute("aria-controls", track.id);
    button.addEventListener("click", () => {
      scrollCarousel(track, button.classList.contains("btn--left") ? -1 : 1);
    });
  });

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  track.addEventListener("mousedown", (event) => {
    isDragging = true;
    track.classList.add("dragging");
    startX = event.pageX;
    startScrollLeft = track.scrollLeft;
  });

  track.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    track.scrollLeft = startScrollLeft - (event.pageX - startX);
  });

  const stopDragging = () => {
    isDragging = false;
    track.classList.remove("dragging");
  };

  track.addEventListener("mouseleave", stopDragging);
  track.addEventListener("scroll", () => updateCarouselButtons(track));
  document.addEventListener("mouseup", stopDragging);
  alignPrimaryCarousel(track);
  updateCarouselButtons(track);
});

window.addEventListener("resize", () => {
  carouselTracks.forEach((track) => {
    alignPrimaryCarousel(track);
    updateCarouselButtons(track);
  });
});

// MAP INFO BOX //
const markers = document.querySelectorAll(".marker"); // get all markers
const infoBoxes = document.querySelectorAll(".info"); // get all info boxes

// ************************************* //
// ************************************* //
// MAP INFO BOX - OPEN & CLOSE
// ************************************* //
// ************************************* //

function getMarkerForInfo(infoBox) {
  return document.querySelector(`[aria-controls="${infoBox.id}"]`);
}

function setInfoBox(infoBox, isOpen, returnFocus = false) {
  const marker = getMarkerForInfo(infoBox);
  if (!marker) return;

  if (isOpen) {
    infoBoxes.forEach((otherInfoBox) => {
      if (otherInfoBox !== infoBox) {
        otherInfoBox.classList.add("hidden");
        otherInfoBox.setAttribute("aria-hidden", "true");

        const otherMarker = getMarkerForInfo(otherInfoBox);
        if (otherMarker) otherMarker.setAttribute("aria-expanded", "false");
      }
    });
  }

  infoBox.classList.toggle("hidden", !isOpen);
  infoBox.setAttribute("aria-hidden", String(!isOpen));
  marker.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    const closeButton = infoBox.querySelector(".info-close");
    if (closeButton) closeButton.focus();
  } else if (returnFocus) {
    marker.focus();
  }
}

markers.forEach((marker) => {
  const infoBox = document.getElementById(marker.getAttribute("aria-controls"));
  if (!infoBox) return;

  marker.addEventListener("click", () => {
    const isOpen = marker.getAttribute("aria-expanded") === "true";
    setInfoBox(infoBox, !isOpen);
  });
});

infoBoxes.forEach((infoBox) => {
  const closeButton = infoBox.querySelector(".info-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      setInfoBox(infoBox, false, true);
    });
  }
});

/* CLOSE INFO BOX WHEN CLICK EVENT OUTSIDE THE INFO BOX */
// Add a click event listener to the document
document.addEventListener("click", function (event) {
  const target = event.target;

  // Check if the click target is not inside any InfoBox or Marker
  if (
    !Array.from(infoBoxes).some((infoBox) => infoBox.contains(target)) &&
    !Array.from(markers).some((marker) => marker.contains(target))
  ) {
    infoBoxes.forEach((infoBox) => setInfoBox(infoBox, false));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const openInfoBox = Array.from(infoBoxes).find(
    (infoBox) => !infoBox.classList.contains("hidden")
  );

  if (openInfoBox) {
    event.preventDefault();
    setInfoBox(openInfoBox, false, true);
  }
});

// ************************************* //
// ************************************* //
// BOOKS SECTION - CAROUSEL
// ************************************* //
// ************************************* //

// ************************************* //
// 1.) LEFT & RIGHT BUTTON
// ************************************* //

// Add event listener for the arrow buttons to scroll the carousel left and right

// ************************************* //
// 2.) DRAGGING
// ************************************* //

// ************************************* //
// ************************************* //
// STICKY NAVIGATION
// ************************************* //
// ************************************* //

const sectionHeroEl = document.querySelector(".section-hero");

// create an intersection observer, which watches for an intersection of the viewport with the section-hero-Element
const obs = new IntersectionObserver(
  // this function will be called when the hero-section enters or exists the viewport
  function (entries) {
    const ent = entries[0]; //gets the first and only entry of the section-hero-element
    // if we don't see the hero_section, add class sticky
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    // if we see the hero_section, remove class sticky
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport - options for intersection observer
    root: null, // means the viewport
    threshold: 0, // defines percentage of visibility of hero_section
    rootMargin: "-80px", // because header is 8rem in height
  }
);
obs.observe(sectionHeroEl);

// ************************************* //
/* NOTE: flipcard animation now lives in saga.js (single system).
   The old 5s auto-flip block was removed: it fought the manual/dwell
   logic and caused mid-scroll flashes. */

/* 
// Select all quotes items
const quotesItems = document.querySelectorAll(".quotes-item");

// Initial setup: Display the first 4 items, hide the rest
/* quotesItems.forEach((item, index) => {
  if (index % 2 === 0) {
    item.style.display = "grid"; // Assuming your quotes items use grid
  } else {
    item.style.display = "none";
  }
}); 

// Initialize currentIndex to keep track of which set of items to display
let currentIndex = 0;

// Flag to indicate whether any quotes-item is currently being hovered
let isHovered = false;

// Add event listeners to each quotes-item for hover detection
quotesItems.forEach((item, index) => {
  item.addEventListener("mouseenter", function () {
    // Set the flag to true when the cursor is over the item
    isHovered = true;
  });

  item.addEventListener("mouseleave", function () {
    // Set the flag to false when the cursor leaves the item
    isHovered = false;
  });
});

// Function to toggle the visibility of quotes items
function toggleQuotesVisibility() {
  // Skip the toggle if any item is currently hovered
  if (isHovered) {
    return;
  }

  quotesItems.forEach((item, index) => {
    // Toggle visibility for items at currentIndex and currentIndex + 4
    if (index === currentIndex || index === (currentIndex + 1) % 8) {
      // Toggle the hide class to initiate the transition
      setTimeout(() => {
        item.classList.toggle("hide");
      }, 1000);
      // If the hide class is added, wait for the transition to complete before setting display to none
      /* if (item.classList.contains("hide")) {
        setTimeout(() => {
          item.style.display = "none";
        }, 250); // Adjust the duration of the fade effect (in milliseconds) as needed
      } else {
        // If the hide class is removed, set display to grid immediately
        setTimeout(() => {
          item.style.display = "grid";
        }, 250);
      } 
    }
  });
  // Update the currentIndex to switch to the next set of items
  currentIndex = (currentIndex + 2) % 8;
}

// Function to handle the timer for toggling quotes visibility
function handleTimer() {
  // Set an interval to check if the quotes gallery is in the viewport and toggle visibility
  setInterval(function () {
    if (isElementInViewport(document.querySelector(".quotes-gallery"))) {
      toggleQuotesVisibility();
    }
  }, 2000); // Change the interval (in milliseconds) as needed
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Call the timer function to start quotes gallery animation
handleTimer();
 */
