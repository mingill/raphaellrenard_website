"use strict";

const navBooks = document.querySelector(".nav-books");
const navMobile = document.querySelector(".nav-mobile");
const booksButton = document.querySelector(".books-button");
const navButton = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const navMobileLinks = Array.from(navMobile.querySelectorAll("a[href]"));
const isEnglishPage = document.documentElement.lang === "en";
const mobileNavOpenLabel = isEnglishPage ? "Close menu" : "Menü schließen";
const mobileNavClosedLabel = isEnglishPage ? "Open menu" : "Menü öffnen";

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

const setMobileNav = function (isOpen, returnFocus = false) {
  headerEl.classList.toggle("nav-open", isOpen);
  document.body.classList.toggle("mobile-nav-open", isOpen);
  navButton.setAttribute("aria-expanded", String(isOpen));
  navButton.setAttribute(
    "aria-label",
    isOpen ? mobileNavOpenLabel : mobileNavClosedLabel
  );
  navMobile.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen && navMobileLinks[0]) {
    navMobileLinks[0].focus();
  }

  if (!isOpen && returnFocus) {
    navButton.focus();
  }
};

setMobileNav(false);

navButton.addEventListener("click", () => {
  const isOpen = navButton.getAttribute("aria-expanded") === "true";
  setMobileNav(!isOpen);
});

navMobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMobileNav(false));
});

navMobile.addEventListener("click", (event) => {
  if (event.target === navMobile) {
    setMobileNav(false);
  }
});

window.addEventListener("resize", () => {
  // matchMedia guarded: on very old browsers the mobile nav simply stays
  // as-is on resize instead of throwing.
  if (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(min-width: 63.001em)").matches
  ) {
    setMobileNav(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (navButton.getAttribute("aria-expanded") !== "true") return;

  if (event.key === "Escape") {
    event.preventDefault();
    setMobileNav(false, true);
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = [navButton, ...navMobileLinks];
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

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
