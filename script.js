/* =================================================================
   Syed Ahan Ali — Portfolio Script
   Vanilla JavaScript: navbar, scroll reveal, active links, form
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  // Close menu when a link is clicked (mobile)
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });


  /* ---------- NAVBAR BACKGROUND ON SCROLL ---------- */
  const navbar = document.getElementById("navbar");

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run once on load


  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", highlightNav);


  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ---------- SKILL BAR ANIMATION ---------- */
  const skillBars = document.querySelectorAll(".skill-bar-fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level");
          entry.target.style.width = level + "%";
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));


  /* ---------- CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  function showError(errorEl, message) {
    errorEl.textContent = message;
  }

  function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";
  }

  function isValidEmail(email) {
    // Simple email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(nameError, "Please enter your name.");
      valid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailError, "Please enter your email.");
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailError, "Please enter a valid email address.");
      valid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(messageError, "Message must be at least 10 characters.");
      valid = false;
    }

    if (valid) {
      formSuccess.textContent =
        "Thank you, " +
        nameInput.value.trim() +
        "! Your message has been sent.";
      form.reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        formSuccess.textContent = "";
      }, 5000);
    }
  });

  // Clear field error on input
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errorId = input.id + "Error";
      const errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.textContent = "";
    });
  });


  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
