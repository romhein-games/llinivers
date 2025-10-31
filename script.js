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
});
