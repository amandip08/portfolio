const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const links = nav.querySelectorAll('a');

// Mobile menu
function closeMenu() {
  nav.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
links.forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Header background on scroll
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Highlight active nav link
const targets = { home: 'home', projects: 'projects', skills: 'skills', experience: 'experience', education: 'experience', contact: 'contact' };
const sections = ['home', 'projects', 'skills', 'experience', 'contact'].map(id => document.getElementById(id));
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
