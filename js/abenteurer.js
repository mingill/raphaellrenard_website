"use strict";

// DEFINING CONST from document
const wrapper = document.querySelector(".wrapper--bookpage"); // wrapper around carousel
const carousel = document.querySelector(".books-container--bookpage"); // carousel containing the cards
const arrowBtns = document.querySelectorAll(".wrapper--bookpage button"); // left and right buttons
const firstCardWidth = carousel.querySelector(
  ".book-item--bookpage"
).offsetWidth; // width of first card

const rightButton = document.querySelector(".btn--right"); // select right button
const leftButton = document.querySelector(".btn--left"); // select right button

// ************************************* //
// 1.) LEFT & RIGHT BUTTON
// ************************************* //

// Add event listener for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    carousel.scrollLeft +=
      btn.id === "btn--left" ? -firstCardWidth : +firstCardWidth; // if clicked button is left, then substract first card width from carousel scrollLeft, else add to it

    // hide left button if scrollLeft is 0; hide right button if scrollLeft is 1 scrollWidth away from offsetWidth; else show both buttons
    setTimeout(function () {
      console.log(carousel.scrollLeft);

      if (carousel.scrollLeft === 0) {
        leftButton.classList.add("hidden");
      } else if (
        carousel.scrollLeft ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        rightButton.classList.add("hidden");
      } else {
        leftButton.classList.remove("hidden");
        rightButton.classList.remove("hidden");
      }
    }, 800);
  });
});

// add eventListener on scroll --> hide left and right button at the start or end
carousel.addEventListener("scroll", function () {
  if (carousel.scrollLeft === 0) {
    leftButton.classList.add("hidden");
  } else if (
    carousel.scrollLeft ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    rightButton.classList.add("hidden");
  } else {
    leftButton.classList.remove("hidden");
    rightButton.classList.remove("hidden");
  }
});
