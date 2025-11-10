document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // 1️⃣ Gestion des éléments cliquables
  // ---------------------------
  // Sélectionne tous les éléments cliquables
  const clickableElements = document.querySelectorAll('.btn, .game-card, .community');

  clickableElements.forEach(el => {
    // Desktop : déclenchement au relâchement de la souris
    el.addEventListener('mouseup', () => {
      const link = el.dataset.link || el.getAttribute('href');
      if (link) window.location.href = link;
    });

    // Mobile / tactile : déclenchement au relâchement du toucher
    el.addEventListener('touchend', () => {
      const link = el.dataset.link || el.getAttribute('href');
      if (link) window.location.href = link;
    });

    // Supprime le focus / hover collant
    el.addEventListener('blur', () => el.classList.remove('hover'));
  });

  // Reset hover/focus au retour sur la page (back button)
  window.addEventListener('pageshow', () => {
    clickableElements.forEach(el => {
      el.classList.remove('hover');
      el.blur();
    });
  });

  // ---------------------------
  // 2️⃣ Redirection automatique en fonction de la langue
  // ---------------------------
  const userLang = navigator.language || navigator.userLanguage;
  // Si le navigateur n'est pas français et qu'on est sur la version française par défaut
  if (!userLang.startsWith("fr") && !window.location.pathname.startsWith("/en")) {
    window.location.href = "/en/"; // Redirige vers la version anglaise
  }

  // ---------------------------
  // 3️⃣ Menu de sélection de langue
  // ---------------------------
  const btn = document.getElementById('langButton');
  const menu = document.getElementById('langMenu');

  if (btn && menu) {
    // Ouvre / ferme le menu
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // empêche la fermeture immédiate par le listener global
      btn.classList.toggle('open');
      menu.classList.toggle('show');
    });
});
