const body = document.body;
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const contactForm = document.querySelector(".contact-form");

if (hamburger && navMenu) {
  const toggleMenu = (isOpen) => {
    hamburger.classList.toggle("is-open", isOpen);
    navMenu.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  };

  hamburger.addEventListener("click", () => {
    toggleMenu(!navMenu.classList.contains("is-open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      toggleMenu(false);
    }
  });
}

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (galleryItems.length && lightbox && lightboxImage && lightboxCaption && lightboxClose) {
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const image = item.querySelector("img");

      if (!image) {
        return;
      }

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = image.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("lightbox-open");
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      return;
    }

    const subject = encodeURIComponent(`Yoga inquiry from ${name}`);
    const bodyText = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:journeytogether6@gmail.com?subject=${subject}&body=${bodyText}`;
  });
}
