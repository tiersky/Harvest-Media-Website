/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*==================== sticky navbar ====================*/
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*==================== scroll reveal ====================*/
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/*==================== typed js ====================*/
const typed = new Typed(".multiple-text", {
  strings: ["CONTENT", "SCENARIO INTEGRATION", "PRODUCT PLACEMENT"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
/*==================== Scroll Down Button Functionality ====================*/
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollDownBtn");

  // Function to check if the device is mobile
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  // Function to check if the site is loaded from the home screen (standalone mode)
  function isInStandaloneMode() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  // Show the button only if on a mobile device and on the home screen
  if (isMobileDevice() && isInStandaloneMode()) {
    scrollBtn.style.display = "block";
  }

  // Scroll down by one viewport height when the button is clicked
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });

  // Optionally hide the button after the user scrolls down a certain amount
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      // Adjust the value as needed
      scrollBtn.style.display = "none";
    }
  });
});
/*==================== PWA Service Worker Registration ====================*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      },
      function (err) {
        console.log("Service Worker registration failed:", err);
      }
    );
  });
}
