/**
 * animations.js
 * Scroll-triggered fade-up animations using IntersectionObserver.
 * Cards inside grids get a staggered transition-delay for a cascade effect.
 */

export function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Stagger children inside grid containers
  document.querySelectorAll('.skills-grid, .projects-grid, .timeline').forEach(grid => {
    [...grid.querySelectorAll('.fade-up')].forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });
}
