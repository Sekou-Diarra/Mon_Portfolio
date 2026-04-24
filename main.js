const NAV_HTML = `
<nav class="navbar">
  <div class="navbar-inner">
    <a href="index.html" class="navbar-brand">
      <img src="images/myself.png" alt="Sékou" class="avatar">
      <div>
        Sékou Diarra
        <span class="brand-sub">BTS SIO · SLAM</span>
      </div>
    </a>
    <button class="menu-toggle" id="menuToggle">☰</button>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" data-page="index">Accueil</a></li>
      <li><a href="profil.html" data-page="profil">Profil</a></li>
      <li class="nav-dropdown" id="navDropdown">
        <a href="#" class="dropdown-toggle" data-page="projets" id="dropToggle">Projets</a>
        <ul class="dropdown-menu" id="dropMenu">
          <li><a href="projet_scolaire.html">Projets scolaires</a></li>
          <li><a href="projets.html">Projets personnels</a></li>
          <li><a href="projet_entreprise.html">Projets en entreprise</a></li>
        </ul>
      </li>
      <li><a href="veille.html" data-page="veille">Veille</a></li>
      <li><a href="contact.html" data-page="contact">Contact</a></li>
    </ul>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <span class="footer-copy">© 2025 Sékou Mahamadou Zan DIARRA</span>
    <div class="footer-links">
      <a href="contact.html">Contact</a>
    </div>
    <div class="social-links">
      <a href="https://www.instagram.com/smzd10?igsh=MW01OGtsMTVjd3lwZg%3D%3D&utm_source=qr" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://www.linkedin.com/in/s%C3%A9kou-mahamadou-zan-diarra-b39846312" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Active link
  const page = document.body.dataset.page || '';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // Mobile menu toggle
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Dropdown — géré entièrement en JS, clic simple
  const dropToggle = document.getElementById('dropToggle');
  const dropMenu   = document.getElementById('dropMenu');
  const navDropdown = document.getElementById('navDropdown');

  dropToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = dropMenu.style.display === 'block';
    dropMenu.style.display = isOpen ? 'none' : 'block';
  });

  // Fermer en cliquant ailleurs
  document.addEventListener('click', (e) => {
    if (!navDropdown.contains(e.target)) {
      dropMenu.style.display = 'none';
    }
  });

  // Animate skill bars
  document.querySelectorAll('.skill-fill').forEach(el => {
    const w = el.dataset.width;
    setTimeout(() => el.style.width = w + '%', 100);
  });
});
// ===== CARROUSEL =====
document.querySelectorAll('.carousel').forEach(carousel => {
  const track         = carousel.querySelector('.carousel-track');
  const slides        = track.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.nextElementSibling; // .carousel-dots
  const caption       = dotsContainer.nextElementSibling; // .carousel-caption
  const prevBtn       = carousel.querySelector('.carousel-btn.prev');
  const nextBtn       = carousel.querySelector('.carousel-btn.next');
  let current = 0;
  let autoTimer = null;

  if (!slides.length) return;

  // Création des points de navigation
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
    if (caption) {
      caption.textContent = slides[current].dataset.caption || '';
    }
  }

  // Défilement automatique toutes les 4 secondes
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Pause au survol
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', () => startAuto());

  // Initialisation
  goTo(0);
  startAuto();
});

// Navigation clavier
let activeCarousel = null;
document.querySelectorAll('.carousel').forEach(carousel => {
  carousel.addEventListener('mouseenter', () => activeCarousel = carousel);
});
document.addEventListener('keydown', (e) => {
  if (!activeCarousel) return;
  const prev = activeCarousel.querySelector('.carousel-btn.prev');
  const next = activeCarousel.querySelector('.carousel-btn.next');
  if (e.key === 'ArrowLeft')  prev?.click();
  if (e.key === 'ArrowRight') next?.click();
});