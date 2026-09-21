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

const setBooksFlyout = function (isOpen, returnFocus = false) {
  navBooks.classList.toggle("hidden", !isOpen);
  booksButton.setAttribute("aria-expanded", String(isOpen));

  if (!isOpen && returnFocus) {
    booksButton.focus();
  }
};

booksButton.addEventListener("click", () => {
  const isOpen = booksButton.getAttribute("aria-expanded") === "true";
  setBooksFlyout(!isOpen);
});

/* CLOSE MENU WHEN CLICK EVENT OUTSIDE THE MENU */
document.addEventListener("click", (event) => {
  if (!navBooks.contains(event.target) && !booksButton.contains(event.target)) {
    setBooksFlyout(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    booksButton.getAttribute("aria-expanded") === "true"
  ) {
    event.preventDefault();
    setBooksFlyout(false, true);
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

// ************************************* //
// ************************************* //
// LANGUAGE SWITCHER - REMEMBER CHOICE
// ************************************* //
// ************************************* //
// No auto-redirect: if the stored language differs from the current page,
// gently pulse the switcher as a hint. Choice is stored on click.

try {
  const storedLang = localStorage.getItem("rl-lang");
  const pageLang = document.documentElement.lang;
  if (storedLang && storedLang !== pageLang) {
    document
      .querySelectorAll(".lang-switch")
      .forEach((el) => el.classList.add("lang-hint"));
  }
  document.querySelectorAll(".lang-link").forEach((a) =>
    a.addEventListener("click", () => {
      try {
        localStorage.setItem("rl-lang", a.dataset.lang);
      } catch (e) {}
    })
  );
} catch (e) {}
