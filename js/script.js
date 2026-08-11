// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Float the header only once the page has scrolled
const siteHeader = document.querySelector('.site-header');
const setHeaderScrolled = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 0);
};
setHeaderScrolled();
window.addEventListener('scroll', setHeaderScrolled, { passive: true });
