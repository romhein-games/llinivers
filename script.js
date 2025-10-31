document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les éléments cliquables
  const clickableElements = document.querySelectorAll('.btn, .game-card, .about');

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
});
