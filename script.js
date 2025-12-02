// 🔄 Au retour sur la page (pageshow), on recharge la langue stockée
window.addEventListener("pageshow", function () {
  const lang = localStorage.getItem("preferredLanguage");
  if (!lang) return;

  const isEnglishPage = window.location.pathname.startsWith("/en");

  // Si l'utilisateur veut EN mais se retrouve sur FR
  if (lang === "en" && !isEnglishPage) {
    window.location.href = "/en" + window.location.pathname;
  }

  // Si l'utilisateur veut FR mais se retrouve sur EN
  if (lang === "fr" && isEnglishPage) {
    window.location.href = window.location.pathname.replace("/en", "");
  }
});


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

  // Détecte le user-agent (pour éviter de rediriger les robots)
  const userAgent = navigator.userAgent.toLowerCase();
  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

  // Vérifie si l'utilisateur a déjà choisi une langue manuellement
  const userChoice = localStorage.getItem('preferredLanguage');
  
  // Si ce n’est pas un robot, et que la langue n’est pas le français,
  // et qu’on n’est pas déjà sur la version anglaise
  if (!isBot && !window.location.pathname.startsWith("/en") && (((!userChoice || userChoice === "en") && !userLang.startsWith("fr"))||(userChoice === "en" && userLang.startsWith("fr")))) {
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

      // Si le menu est ouvert, défile jusqu'en bas
      if (menu.classList.contains('show')) {
        // Attends un petit délai pour être sûr que le menu est visible avant de défiler
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight, // Défilement jusqu'en bas de la page
            behavior: 'smooth' // Ajoute une animation fluide pour le défilement
          });
        }, 200); // Délai de 200ms pour garantir que le menu a le temps de s'afficher
      }
      
    });

    // Quand on choisit une langue
    menu.addEventListener('click', (e) => {
    if (e.target.closest('li')) {
      const li = e.target.closest('li');
      const lang = li.dataset.lang;
      const flagSrc = li.querySelector('img').src;
      const text = lang.toUpperCase();

      // Change le bouton
      btn.querySelector('img').src = flagSrc;
      btn.querySelector('.text').textContent = text;

      // Ferme le menu
      menu.classList.remove('show');
      btn.classList.remove('open');

      // Enregistre le choix de langue de l'utilisateur
      console.log(lang);
      localStorage.setItem('preferredLanguage', lang);

      // Redirection en fonction de la langue choisie
      redirectToLanguageVersion(lang);
     }
    });
    
    // Ferme le menu si on clique ailleurs
    document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('show');
      btn.classList.remove('open');
     }
   });
  }

  // Fonction de redirection en fonction de la langue choisie
  function redirectToLanguageVersion(lang) {
    const currentPath = window.location.pathname;

    if (lang === 'fr') {
      // Si la langue est français, redirige vers la version en français
      if (currentPath.startsWith('/en/')) {
        // Si on est sur la version anglaise, on redirige vers la racine (version française)
        window.location.href = currentPath.replace('/en', '');
      } else {
        // Si on est déjà sur la version française, rien à changer
        window.location.href = currentPath;
      }
    } else if (lang === 'en') {
      // Si la langue est anglais, redirige vers la version anglaise
      if (!currentPath.startsWith('/en/')) {
        // Si on n'est pas déjà dans le dossier 'en', redirige vers la version anglaise
        window.location.href = `/en${currentPath}`;
      } else {
        // Si on est déjà sur la version anglaise, rien à changer
        window.location.href = currentPath;
      }
    }
  }

  // 👉 Fonction appliquant visuellement la langue (si tu veux changer du contenu)
  function applyLanguage(lang) {
    // Exemple minimal — à adapter
    document.documentElement.setAttribute("lang", lang);
  }

  // ---------------------------
  // 4️⃣ SLIDER D'IMAGES POUR .owlR-card
  // ---------------------------
  document.querySelectorAll('.owlR-card').forEach(card => {
    const images = card.querySelectorAll('.owlR-slider img');
    const nextBtn = card.querySelector('.owlR-next');
    const prevBtn = card.querySelector('.owlR-prev');
    const video = card.querySelector('.owlR-video video'); // Vidéo dans la carte
    
    //if (!images.length || !nextBtn || !prevBtn) return; // sécurité
    if (images.length) {
    let index = 0;

    const showImage = i => {
      images.forEach(img => img.classList.remove('active'));
      images[i].classList.add('active');
    };

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });
    }
    
    if (video) { // Si c'est une carte avec une vidéo
      let index = 0;

      const showVideo = i => {
      video.forEach(video => video.classList.remove('active'));
      video[i].classList.add('active');
    };
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % video.length;
        showVideo(index);
      });

      prevBtn.addEventListener('click', () => {
         index = (index - 1 + video.length) % video.length;
         showVideo(index);
      });
    } 
  });

  // ============================================================
  // 5️⃣ 6️⃣ 7️⃣ — SYSTÈME D’OVERLAY FACTORISÉ (MEN / CGU / POL / QR)
  // ============================================================

  // Fonction générique pour ouvrir un overlay
  function openOverlay(overlay) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Trouve le bloc qui scroll réellement
    const scrollable = overlay.querySelector('.overlay-content');
    if (scrollable) scrollable.scrollTop = 0;
  }

  // Fonction générique pour fermer un overlay
  function closeOverlay(overlay) {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Gestion automatique pour TOUS les overlays
  document.querySelectorAll("[data-overlay]").forEach(overlay => {
    overlay.querySelectorAll("[data-close]").forEach(btn => {
      btn.addEventListener("click", () => closeOverlay(overlay));
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay(overlay);
    });
  });

   // -------- MENTIONS
  const openMenButton = document.getElementById("openMenButton");
  if (openMenButton) {
    openMenButton.addEventListener("click", () => {
      openOverlay(document.getElementById("menOverlay"));
    });
  }
  
  // -------- CGU
  const openCguButton = document.getElementById("openCguButton");
  if (openCguButton) {
    openCguButton.addEventListener("click", () => {
      openOverlay(document.getElementById("cguOverlay"));
    });
  }

  // -------- POLITIQUE
  const openPolButton = document.getElementById("openPolButton");
  if (openPolButton) {
    openPolButton.addEventListener("click", () => {
      openOverlay(document.getElementById("polOverlay"));
    });
  }

  // -------- POLITIQUE DEPUIS CGU
  if (openPolButton) {
    document.getElementById("cguOverlay").addEventListener("click", (e) => {
      if (e.target && e.target.id === 'openPolButton') {
        closeOverlay(document.getElementById("cguOverlay"))
        openOverlay(document.getElementById("polOverlay"));
      }
    });
  }

  // -------- QR CODE DOWNLOAD
  const downloadBtn = document.getElementById('download-btn');
  const qrOverlay = document.getElementById('qrOverlay');
  const qrCodeImg = document.getElementById('qr-code');
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.test.jeu";

  function isMobileOrTablet() {
    return /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent);
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (isMobileOrTablet()) {
        window.location.href = playStoreUrl;
      } else {
        openOverlay(qrOverlay);
        qrCodeImg.src =
          `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(playStoreUrl)}&size=200x200`;
      }
    });
  }  
  
  // ============================================================
  // 8️⃣ SYSTÈME "LIRE LA SUITE" POUR LES NEWS
  // ============================================================
  
  document.querySelectorAll(".news-grid").forEach(news => {
    const fullText = news.querySelector(".full-text");
    const excerpt = news.querySelector(".excerpt");
    const link = news.querySelector(".read-more");

    if (!fullText || !excerpt || !link) return;

    // Effet de clic sur le bouton → applique un effet sur le GRID
    link.addEventListener("mousedown", () => {
        news.classList.add("grid-click");
    });

    link.addEventListener("mouseup", () => {
        news.classList.remove("grid-click");
    });

    link.addEventListener("mouseleave", () => {
        news.classList.remove("grid-click");
    });
    
    link.addEventListener("click", (e) => {
      e.preventDefault(); // évite de remonter en haut de la page
      const expanded = news.classList.toggle("expanded");

      if (expanded) {
        fullText.style.display = "block";
        link.textContent = link.dataset.less ?? "Lire moins";
      } else {
        fullText.style.display = "none";
        link.textContent = link.dataset.more ?? "Lire la suite";

        // Vérifie si aucune autre news n’est ouverte
       if (!container.querySelector(".news-grid.expanded")) {
        container.classList.remove("has-expanded");
       }
      }
    });
  });
});
