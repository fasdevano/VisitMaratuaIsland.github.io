const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    document
      .getElementById("backToTop")
      .classList.toggle("show", window.scrollY > 400);
  },
  { passive: true }
);

// ── HERO LOAD ANIMATION ──
window.addEventListener("load", () => {
  document.getElementById("hero").classList.add("loaded");
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  const open = !mobileNav.classList.contains("open");
  hamburger.classList.toggle("active", open);
  mobileNav.classList.toggle("open", open);
});

// Close mobile nav on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("open");
  });
});

// ── DARK MODE ──
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("maratua-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  localStorage.setItem("maratua-theme", next);
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── LIGHTBOX ──
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

document
  .getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// ── BACK TO TOP ──
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── FORM SUBMIT ──
function handleSubmit(btn) {
  const fname = document.getElementById("fname").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!fname || !email) {
    alert("Mohon isi nama dan email Anda terlebih dahulu.");
    return;
  }
  btn.innerHTML = "<span>Terkirim! 🎉</span>";
  btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML =
      '<span>Kirim Pesan</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
    btn.style.background = "";
    btn.disabled = false;
  }, 3000);
}

// ── ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => (a.style.color = ""));
        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (active) active.style.color = "var(--aqua)";
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);
sections.forEach((s) => observer.observe(s));
