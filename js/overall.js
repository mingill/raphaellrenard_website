"use strict";

const navBooks = document.querySelector(".nav-books");
const navMobile = document.querySelector(".nav-mobile");
const booksButton = document.querySelector(".books-button");
const navButton = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

// ************************************* //
// ************************************* //
// Navigation - Flyout Books
// ************************************* //
// ************************************* //

const showBooksFlyout = function () {
  navBooks.classList.toggle("hidden");
};

booksButton.addEventListener("click", showBooksFlyout);

/* CLOSE MENU WHEN CLICK EVENT OUTSIDE THE MENU */
document.addEventListener("click", (event) => {
  if (!navBooks.contains(event.target) && !booksButton.contains(event.target)) {
    navBooks.classList.add("hidden");
  }
});

// ************************************* //
// ************************************* //
// MOBILE NAVIGATION MENU
// ************************************* //
// ************************************* //

const showMobileNav = function () {
  headerEl.classList.toggle("nav-open");
};

navButton.addEventListener("click", showMobileNav);
