
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        const target = document.querySelector(targetId);

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });

          navbar?.classList.remove("active");
          menuToggle?.classList.remove("active");
        }
      }
    });
  });

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  const revealElements = document.querySelectorAll(
    ".about-content, .exhibition-card, .explore-card, .visit-content"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });

  const backToTop = document.createElement("button");

  backToTop.className = "back-to-top";
  backToTop.textContent = "↑";
  backToTop.setAttribute("aria-label", "Back to top");

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const footer = document.querySelector(".footer-bottom");

  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(
      /\d{4}/,
      new Date().getFullYear()
    );
  }
});
