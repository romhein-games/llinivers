document.addEventListener('DOMContentLoaded', () => {
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.dataset.link;
      if(link) {
        window.location.href = link; // redirige vers jeu.html
      }
    });

    // Facultatif : supprime le focus après le clic (utile sur mobile)
    card.addEventListener('touchend', () => card.blur());
  });

  // Gestion des about
  const aboutSections = document.querySelectorAll('.about');
  aboutSections.forEach(section => {
    section.addEventListener('click', () => {
      const link = section.dataset.link;
      if(link) {
        window.location.href = link;
      }
    });
    section.addEventListener('touchend', () => section.blur());
  });
});

// Reset hover/focus au retour sur la page
window.addEventListener('pageshow', () => {
  // Supprime le hover/focus de tous les boutons
  document.querySelectorAll('.btn, .game-card, .about').forEach(el => {
    el.classList.remove('hover');
    el.blur(); // supprime le focus sur mobile
  });
});
