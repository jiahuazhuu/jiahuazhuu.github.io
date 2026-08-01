const welcomeLayout = document.querySelector('.welcome-layout');
const welcomeCopy = document.querySelector('.welcome-copy');

if (welcomeLayout && welcomeCopy && !document.querySelector('.welcome-photo-card')) {
  const headingBlock = welcomeLayout.firstElementChild;
  const copyWrap = document.createElement('div');
  copyWrap.className = 'welcome-copy-wrap';
  if (headingBlock) copyWrap.appendChild(headingBlock);
  copyWrap.appendChild(welcomeCopy);

  const photoCard = document.createElement('div');
  photoCard.className = 'welcome-photo-card';
  photoCard.innerHTML = `
    <img class="profile-photo" src="assets/images/profile.svg" alt="Jiahua Zhu portrait">
    <div class="profile-links" aria-label="Academic and professional profiles">
      <a class="profile-link" href="https://scholar.google.com/citations?hl=en&tzom=-60&user=toXIuNwAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
      <a class="profile-link" href="https://www.linkedin.com/in/zhu-jiahua-0623587a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>`;

  welcomeLayout.replaceChildren(copyWrap, photoCard);
}

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-navigation');
const navLinks = document.querySelectorAll('.site-navigation a');

if (menuButton && navigation) {
  menuButton.setAttribute('aria-label', 'Toggle menu');
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const sections = Array.from(document.querySelectorAll('main section[id]'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 });

sections.forEach((section) => observer.observe(section));
