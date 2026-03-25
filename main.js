// Shared nav + footer injection
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
      <li class="nav-dropdown">
        <a href="#" class="dropdown-toggle" data-page="projets" id="dropToggle">Projets</a>
        <ul class="dropdown-menu">
          <li><a href="projet_scolaire.html">Projets scolaires</a></li>
          <li><a href="projets.html">Projets personnels</a></li>
          <li><a href="projet_entreprise.html">Projets en entreprise</a></li>
        </ul>
      </li>
      <li><a href="documentation.html" data-page="documentation">Documentation</a></li>
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
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  // Inject footer
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Active link
  const page = document.body.dataset.page || '';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // Mobile toggle
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Mobile dropdown
  document.getElementById('dropToggle')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.closest('.nav-dropdown').classList.toggle('open');
  });

  // Animate skill bars
  document.querySelectorAll('.skill-fill').forEach(el => {
    const w = el.dataset.width;
    setTimeout(() => el.style.width = w + '%', 100);
  });
});
