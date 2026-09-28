const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const projectDialog = document.querySelector(".project-dialog");
const dialogImage = document.querySelector(".dialog-image");
const dialogCategory = document.querySelector(".dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector(".dialog-description");

const projects = {
  "soft-studio": {
    title: "Soft Studio",
    category: "Brand identity · 2025",
    description: "A quiet, confident identity for a more considered kind of wardrobe. The visual direction pairs tactile editorial imagery with a calm, flexible system designed to let each piece speak for itself.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    alt: "A considered edit of clothing in soft natural light",
  },
  "good-things": {
    title: "Good Things",
    category: "Digital · 2024",
    description: "A warm digital home for a community making everyday count. Clear navigation, generous space, and thoughtful content bring the community’s useful ideas into focus.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=85",
    alt: "A laptop displaying a clean digital product interface",
  },
  "form-and-field": {
    title: "Form & Field",
    category: "Strategy · 2024",
    description: "A fresh perspective and story for a studio shaping better spaces. The project brought a distinct point of view to the studio’s positioning, messaging, and visual language.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
    alt: "Sculptural modern architecture against a pale blue sky",
  },
};

document.documentElement.classList.add("js-ready");
document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNavigation.classList.toggle("is-open", !isOpen);
});

siteNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNavigation.classList.remove("is-open");
  }
});

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;

    dialogImage.src = project.image;
    dialogImage.alt = project.alt;
    dialogCategory.textContent = project.category;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    projectDialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const revealTargets = document.querySelectorAll(".section-label, .about-content, .skills-heading, .skill-item, .projects-heading, .project-card, .contact-content");
if ("IntersectionObserver" in window) {
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}