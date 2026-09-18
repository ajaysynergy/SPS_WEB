// Change image paths here once; managed campus, logo and principal images update site-wide.
const imageBank = {
  campus: "assets/images/campus.jpg",
  logo: "assets/images/logo.jpg",
  principal: "assets/images/principal.png",
  students:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=82",
  classroom:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=82",
  tech: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=82",
  robotics:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=82",
  sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=82",
  activity:
    "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=82",
  project:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=82",
  library:
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=82",
};

function applyManagedImages() {
  document.documentElement.style.setProperty(
    "--campus-image",
    `url("${imageBank.campus}")`,
  );
  document.documentElement.style.setProperty(
    "--logo-image",
    `url("${imageBank.logo}")`,
  );
  const footerMark = document.querySelector(".site-footer .brand-mark");
  if (footerMark) {
    const footerLogo = document.createElement("img");
    footerLogo.className = "brand-logo";
    footerLogo.src = imageBank.logo;
    footerLogo.alt = "Suraj Public School logo";
    footerMark.replaceWith(footerLogo);
  }
  document.querySelectorAll("img").forEach((image) => {
    const description = (image.alt || "").toLowerCase();
    if (description.includes("principal")) image.src = imageBank.principal;
    if (
      description.includes("campus") ||
      description.includes("school building") ||
      description.includes("welcoming school")
    ) {
      image.src = imageBank.campus;
    }
  });
}
function initHeroSlider() {
  const hero = document.querySelector(".hero");
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dot")];
  if (!hero || slides.length < 2) return;
  slides.forEach((slide) => {
    slide.style.backgroundImage = `linear-gradient(90deg, rgba(5, 20, 40, 0.9) 0%, rgba(5, 20, 40, 0.58) 52%, rgba(5, 20, 40, 0.24) 100%), url("${slide.dataset.image}")`;
  });
  let current = 0;
  let timer;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) =>
      slide.classList.toggle("is-active", i === current),
    );
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
      dot.toggleAttribute("aria-current", i === current);
    });
  };
  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 6500);
  };
  dots.forEach((dot) =>
    dot.addEventListener("click", () => {
      show(Number(dot.dataset.heroDot));
      start();
    }),
  );
  hero.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
    show(current - 1);
    start();
  });
  hero.querySelector("[data-hero-next]")?.addEventListener("click", () => {
    show(current + 1);
    start();
  });
  hero.addEventListener("mouseenter", () => clearInterval(timer));
  hero.addEventListener("mouseleave", start);
  show(0);
  start();
}
function initHeroTypewriter() {
  const target = document.querySelector("#hero-typed-text");
  if (!target) return;
  const phrases = [
    "Welcome to Suraj Public School",
    "Where every learner finds a direction",
    "Growing curious minds with care",
    "A brighter beginning starts here",
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  const tick = () => {
    const phrase = phrases[phraseIndex];
    target.textContent = phrase.slice(0, characterIndex);
    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
      setTimeout(tick, 72);
      return;
    }
    if (!deleting) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
    if (characterIndex > 0) {
      characterIndex -= 1;
      setTimeout(tick, 38);
      return;
    }
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(tick, 420);
  };
  tick();
}
const navItems = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["our-teachers.html", "Our Teachers"],
  ["admissions.html", "Admissions"],
  ["activities.html", "Activities"],
  ["gallery.html", "Gallery"],
  ["contact.html", "Contact"],
];
function header() {
  const current = location.pathname.split("/").pop() || "index.html";
  return `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html" aria-label="Suraj Public School home"><img class="brand-logo" src="${imageBank.logo}" alt="Suraj Public School logo"><span class="brand-copy"><strong>Suraj Public School</strong><small>Kotkasim, Rajasthan</small></span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button><nav class="main-nav" aria-label="Primary navigation">${navItems.map(([url, label]) => `<a class="${current === url ? "active" : ""}" href="${url}">${label}</a>`).join("")}<a href="admissions.html#enquiry" class="btn btn--gold nav-cta">Enquire Now</a></nav></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">S</span><span class="brand-copy"><strong>Suraj Public School</strong><small>Kotkasim, Rajasthan</small></span></a><p>A trusted learning community shaping confident, thoughtful and future-ready learners through education, discipline and character.</p><div class="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ig</a><a href="#" aria-label="YouTube">▶</a></div></div><div><h3>Quick Links</h3><ul class="footer-links"><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="our-teachers.html">Our Teachers</a></li><li><a href="admissions.html">Admissions</a></li><li><a href="gallery.html">Gallery</a></li><li><a href="contact.html">Contact</a></li></ul></div><div><h3>School</h3><ul class="footer-links"><li><a href="principal.html">Principal</a></li><li><a href="activities.html">Activities</a></li><li><a href="coding-robotics.html">Coding & Robotics</a></li><li><a href="projects.html">Projects</a></li><li><a href="achievements.html">Achievements</a></li><li><a href="events.html">Events</a></li></ul></div><div><h3>Important</h3><ul class="footer-links"><li><a href="mandatory-disclosure.html">Mandatory Public Disclosure</a></li><li><a href="annual-report.html">Annual Report</a></li><li><a href="privacy-policy.html">Privacy Policy</a></li><li><a href="terms.html">Terms & Conditions</a></li></ul><p style="color:#b7c5d4;font-size:.85rem">Chowki Road, Kotkasim,<br>Rajasthan - 301702<br><a href="tel:9950711477">99507 11477</a></p></div></div><div class="container footer-bottom"><span>&copy; 2026 Suraj Public School, Kotkasim. All Rights Reserved.</span><span>CBSE Affiliation No. 1730355</span></div></footer>`;
}
function shell() {
  document.body.insertAdjacentHTML("afterbegin", header());
  document.body.insertAdjacentHTML("beforeend", footer());
  document.body.insertAdjacentHTML(
    "beforeend",
    '<a class="whatsapp" href="https://wa.me/919950711477?text=Hello%20Suraj%20Public%20School%2C%20I%20would%20like%20to%20enquire%20about%20admission%20and%20school%20information." target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">◔</a><button class="back-top" aria-label="Back to top">↑</button>',
  );
}
function initNav() {
  const headerEl = document.querySelector(".site-header"),
    toggle = document.querySelector(".menu-toggle"),
    nav = document.querySelector(".main-nav");
  window.addEventListener(
    "scroll",
    () => {
      headerEl.classList.toggle("scrolled", scrollY > 30);
      document
        .querySelector(".back-top")
        ?.classList.toggle("show", scrollY > 500);
    },
    { passive: true },
  );
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.classList.remove("open");
      document.body.style.overflow = "";
    }),
  );
  document.addEventListener("click", (e) => {
    if (
      nav?.classList.contains("open") &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
  document
    .querySelector(".back-top")
    ?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((i) => observer.observe(i));
}
function initFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const buttons = group.querySelectorAll("[data-filter]"),
      items = document.querySelectorAll(
        `[data-filter-item="${group.dataset.filterGroup}"]`,
      );
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        items.forEach(
          (item) =>
            (item.hidden =
              filter !== "all" && item.dataset.category !== filter),
        );
      }),
    );
  });
}
function initGallery() {
  const items = [...document.querySelectorAll(".gallery-item")],
    box = document.querySelector(".lightbox");
  if (!box || !items.length) return;
  let index = 0;
  const image = box.querySelector("img");
  const show = (i) => {
    index = (i + items.length) % items.length;
    image.src = items[index].querySelector("img").src;
    image.alt = items[index].querySelector("img").alt;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  items.forEach((item, i) => item.addEventListener("click", () => show(i)));
  box.querySelector(".lightbox-close").addEventListener("click", () => {
    box.classList.remove("open");
    document.body.style.overflow = "";
  });
  box
    .querySelector("[data-next]")
    .addEventListener("click", () => show(index + 1));
  box
    .querySelector("[data-prev]")
    .addEventListener("click", () => show(index - 1));
  box.addEventListener("click", (e) => {
    if (e.target === box) {
      box.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") box.querySelector(".lightbox-close").click();
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
}
function initModal() {
  const modal = document.querySelector(".modal");
  document.querySelectorAll("[data-project]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-project-card]");
      modal.querySelector("img").src = card.dataset.image;
      modal.querySelector("h2").textContent = card.dataset.title;
      modal.querySelector("p").textContent = card.dataset.description;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }),
  );
  modal?.querySelector(".modal-close")?.addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  });
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}
function initForms() {
  document.querySelectorAll("form[data-validate]").forEach((form) =>
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      if (form.hasAttribute("data-email-delivery")) return;
      e.preventDefault();
      form.reset();
      form.querySelector(".form-message").classList.add("show");
    }),
  );
  document.querySelectorAll("[data-whatsapp-enquiry]").forEach((button) =>
    button.addEventListener("click", () => {
      const form = button.closest("form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const value = (name) =>
        form.elements[name]?.value.trim() || "Not provided";
      const message = [
        "Hello Suraj Public School, I would like to make an admission enquiry.",
        `Student Name: ${value("student")}`,
        `Parent/Guardian Name: ${value("parent")}`,
        `Class Applying For: ${value("class")}`,
        `Mobile Number: ${value("mobile")}`,
        `Email: ${value("email")}`,
        `Message: ${value("message")}`,
      ].join("\n");
      window.open(
        `https://wa.me/919950711477?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener",
      );
    }),
  );
  document.querySelectorAll("[data-whatsapp-contact]").forEach((button) =>
    button.addEventListener("click", () => {
      const form = button.closest("form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      const message = form.elements.message.value.trim();
      const whatsappMessage = [
        "Hello Suraj Public School, I would like to send a message.",
        `Name: ${name}`,
        `Mobile Number: ${phone}`,
        `Message: ${message}`,
      ].join("\n");
      window.open(
        `https://wa.me/919950711477?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank",
        "noopener",
      );
    }),
  );
}
document.addEventListener("DOMContentLoaded", () => {
  shell();
  applyManagedImages();
  initNav();
  initHeroSlider();
  initHeroTypewriter();
  initReveal();
  initFilters();
  initGallery();
  initModal();
  initForms();
});
