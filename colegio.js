const menuButton = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  mainNavigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  mainNavigation.classList.toggle("is-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (
    mainNavigation.classList.contains("is-open") &&
    !mainNavigation.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealTargets = document.querySelectorAll(
    ".welcome-intro, .welcome-copy, .life-heading, .gallery-card, .section-heading, .info-card, .contact-copy, .contact-details"
  );

  document.body.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  revealTargets.forEach((target) => {
    target.dataset.reveal = "";
    revealObserver.observe(target);
  });
}
