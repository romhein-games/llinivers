// === Effet Parallax ===
const bg = document.querySelector('main');
window.addEventListener('scroll', () => {
  const vitesse = 0.4; // Ajuste la vitesse du défilement
  const offset = window.scrollY * vitesse;
  bg.style.transform = `translateY(${offset}px)`;
});

// Scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Animation d’apparition au scroll
const elements = document.querySelectorAll(".game-card, .about, .hero");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));
