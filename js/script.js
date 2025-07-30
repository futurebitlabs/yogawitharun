// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Newsletter form handling
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Simple email validation
    if (email && email.includes("@")) {
      // Show success message
      const button = this.querySelector("button");
      const originalText = button.textContent;
      button.textContent = "Subscribed!";
      button.style.background = "#27ae60";

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "#e67e22";
        this.reset();
      }, 2000);
    } else {
      alert("Please enter a valid email address");
    }
  });
}

// Contact form handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    if (name && email && message) {
      // Show success message
      const button = this.querySelector(".submit-button");
      const originalText = button.textContent;
      button.textContent = "Message Sent!";
      button.style.background = "#27ae60";

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "#e67e22";
        this.reset();
      }, 2000);
    } else {
      alert("Please fill in all fields");
    }
  });
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".class-card, .video-card, .contact-item, .stat, .gallery-item, .showcase-item, .testimonial-card"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Video card click handlers
document.querySelectorAll(".video-card").forEach((card) => {
  card.addEventListener("click", function () {
    const title = this.querySelector("h3").textContent;
    alert(
      `Video "${title}" would play here. In a real implementation, this would open a video player or redirect to YouTube.`
    );
  });
});

// Gallery lightbox functionality
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img");
    const src = img.src;
    const alt = img.alt;

    // Create lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${src}" alt="${alt}">
        <p>${alt}</p>
      </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";

    // Close lightbox
    const closeLightbox = () => {
      document.body.removeChild(lightbox);
      document.body.style.overflow = "auto";
    };

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  });
});

// Image loading and error handling
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Add loading state
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";

    // Handle successful load
    img.addEventListener("load", function () {
      this.style.opacity = "1";
      console.log(`✅ Image loaded successfully: ${this.src}`);
    });

    // Handle load errors
    img.addEventListener("error", function () {
      console.error(`❌ Failed to load image: ${this.src}`);
      this.style.opacity = "0.5";
      this.style.filter = "grayscale(100%)";

      // Add error indicator
      const errorDiv = document.createElement("div");
      errorDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.1);
        color: #e74c3c;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        z-index: 10;
      `;
      errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i><br>
        Image not found<br>
        <small>${this.src.split("/").pop()}</small>
      `;

      // Make parent relative for positioning
      if (this.parentElement) {
        this.parentElement.style.position = "relative";
        this.parentElement.appendChild(errorDiv);
      }
    });

    // Check if image is already loaded
    if (img.complete) {
      if (img.naturalHeight === 0) {
        // Image failed to load
        img.dispatchEvent(new Event("error"));
      } else {
        // Image loaded successfully
        img.dispatchEvent(new Event("load"));
      }
    }
  });
});

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });

  img.style.opacity = "0";
  img.style.transition = "opacity 0.3s ease";
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-img");

  if (heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Image showcase hover effects
document.querySelectorAll(".showcase-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Testimonial card interactions
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add CSS for mobile menu and lightbox
const style = document.createElement("style");
style.textContent = `
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      left: -100%;
      top: 70px;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.98);
      width: 100%;
      text-align: center;
      transition: 0.3s;
      box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
      padding: 2rem 0;
    }
    
    .nav-menu.active {
      left: 0;
    }
    
    .nav-menu li {
      margin: 1rem 0;
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
  
  /* Lightbox Styles */
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    text-align: center;
  }
  
  .lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  .lightbox-content p {
    color: white;
    margin-top: 1rem;
    font-size: 1.1rem;
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }
  
  .lightbox-close:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Enhanced hover effects */
  .gallery-item {
    cursor: pointer;
  }
  
  .gallery-item:hover {
    transform: translateY(-5px) scale(1.02);
  }
  
  .showcase-item:hover .showcase-overlay {
    transform: translateY(0);
  }
  
  .class-card:hover .class-image img {
    transform: scale(1.1);
  }
  
  .video-card:hover .video-thumbnail img {
    transform: scale(1.1);
  }
  
  /* Image error styling */
  img[src*=".jpg"]:not([src*="data:"]):not([src*="http"]):not([src*="https"]) {
    border: 2px dashed #e74c3c;
  }
`;
document.head.appendChild(style);
