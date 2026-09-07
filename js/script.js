"use strict";

// DEFINING CONST from document
// BOOKS CAROUSEL //
const wrapper = document.querySelector(".wrapper"); // wrapper around carousel
const carousel = document.querySelector(".books-container"); // carousel containing the cards
const arrowBtns = document.querySelectorAll(".wrapper button"); // left and right buttons
const firstCardWidth = carousel.querySelector(".book-item").offsetWidth; // width of first card
const carouselChildren = [...carousel.children]; // all carousel children (all cards) as an array

// MAP INFO BOX //
const markers = document.querySelectorAll(".marker-inside"); // get all markers
const infoBoxes = document.querySelectorAll(".info"); // get all info boxes

// DEFINING EMPTY VARIABLES
let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

// ************************************* //
// ************************************* //
// MAP INFO BOX - OPEN & CLOSE
// ************************************* //
// ************************************* //

function showInfoText(markerID) {
  const infoBoxID = `info-${markerID}`;
  const infoBox = document.getElementById(infoBoxID);

  if (infoBox) {
    infoBox.classList.toggle("hidden");
  }
}

markers.forEach((element) => {
  element.addEventListener("click", (event) => {
    showInfoText(event.target.id);
  });
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
    // Click is outside, so add the 'hidden' class to all InfoBoxes
    infoBoxes.forEach((infoBox) => {
      infoBox.classList.add("hidden");
    });
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
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    carousel.scrollLeft +=
      btn.id === "btn--left" ? -firstCardWidth : firstCardWidth; // if clicked button is left, then substract first card width from carousel scrollLeft, else add to it
  });
});

// ************************************* //
// 2.) DRAGGING
// ************************************* //

// mousedown starts dragging, sets it to true and adds the dragging class to the carousel
// sets startX to the position of the cursor on the page and startScrollLeft to left x of clicked card (400,800, etc.)
const dragStart = function (e) {
  isDragging = true;
  carousel.classList.add("dragging"); // sets cursor to grab, prevents selection and sets scroll behavior to auto
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

// mouseover triggers dragging function,  defines scrollLeft: starting x of clicked card - (current cursor position - starting cursor position)
const dragging = function (e) {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  console.log(startScrollLeft, e.pageX, startX);
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

// mouseup triggers dragStop, sets isDragging to false ans removes dragging class from carousel
const dragStop = function () {
  isDragging = false;
  carousel.classList.remove("dragging");
};

// ************************************* //
// 3.) AUTOPLAY
// ************************************* //

// set timeoutId to scroll by 1 card width every 2.5 seconds
const autoPlay = function () {
  if (window.innerWidth < 800) return; // return for small devices
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};

// initiate autoplay
// autoPlay();

// ************************************* //
// 4.) INFINITE SCROLLING
// ************************************* //

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth); // carousel width devided by single card width (equals 3)

// Insert copies of the last few cards to beginning of the carousel for infinite scrolling
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach(function (card) {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of the carousel for infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(function (card) {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// define infinite Scroll
const infiniteScroll = function () {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth; // scrollWidth = full width of hidden carousel; offsetWidth = wudth in viewport
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning (if scrollLeft is full length - seen length)
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth; // set scrollLeft to length of viewport
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if the mouse is not hovering over carousel
  //clearTimeout(timeoutId);
  //if (!wrapper.matches(":hover")) autoPlay();
};

// ADD EVENT LISTENERS

carousel.addEventListener("mousedown", dragStart); // trigger dragging to start
carousel.addEventListener("mousemove", dragging); // dragging
document.addEventListener("mouseup", dragStop); // trigger dragging to end
carousel.addEventListener("scroll", infiniteScroll); // define infinite scrolling

// wrapper.addEventListener("mouseenter", clearTimeout(timeoutId)); // only autoplay when hover is false
// wrapper.addEventListener("mouseleave", autoPlay); // reset to autoPlay after leaving with the mouse

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
    /* console.log(ent); */
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
// ************************************* //
// ANIMATED FLIPCARDS
// ************************************* //
// ************************************* //

// Select all quotes items
const flipCardItems = document.querySelectorAll(".flipcard-item");
const flipCardContainer = document.querySelectorAll(".flipcard-container");
const flipCardCount = flipCardItems.length;

console.log(flipCardItems);
console.log(flipCardContainer);
console.log(flipCardCount);

// Initialize currentIndex to keep track of which set of items to display
let currentIndex = 0;

// Flag to indicate whether any quotes-item is currently being hovered
let isHovered = false;
console.log(isHovered);

// Add event listeners to each quotes-item for hover detection
flipCardItems.forEach((item, index) => {
  item.addEventListener("mouseenter", function () {
    // Set the flag to true when the cursor is over the item
    isHovered = true;
    console.log(isHovered);
  });

  item.addEventListener("mouseleave", function () {
    // Set the flag to false when the cursor leaves the item
    isHovered = false;
    console.log(isHovered);
  });
});

// Function to toggle the visibility of quotes items
function toggleFlip() {
  // Skip the toggle if any item is currently hovered
  if (isHovered) {
    return;
  }

  flipCardItems.forEach((item, index) => {
    // Toggle flip for item at current index
    if (index === currentIndex) {
      flipCardContainer.forEach((container, containerIndex) => {
        if (containerIndex === currentIndex) {
          container.style["boxShadow"] = "0 0 0 #999999";
        } else {
          container.style.boxShadow = "0 3rem 2rem rgba(0, 0, 0, 0.1)";
        }
      });

      item.classList.toggle("flipcard-rotate");

      item.addEventListener("transitionend", function () {
        // Reset box shadow after the transition has ended
        flipCardContainer.forEach((container) => {
          container.style.boxShadow = "0 3rem 2rem rgba(0, 0, 0, 0.1)";
        });
      });
    }
  });

  // Update the currentIndex to switch to the next set of items
  currentIndex = (currentIndex + 1) % flipCardCount;

  /* flipCardContainer.forEach((item, index) => {
    item.style["boxShadow"] = " 0 3rem 2rem rgba(0, 0, 0, 0.1)";
  }); */
}

// Function to handle the timer for toggling quotes visibility
function handleTimer() {
  // Set an interval to check if the quotes gallery is in the viewport and toggle visibility
  setInterval(function () {
    if (isElementInViewport(flipCardItems[currentIndex])) {
      console.log("Yeah viewport!");
      toggleFlip();
    }
  }, 5000); // Change the interval (in milliseconds) as needed
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
