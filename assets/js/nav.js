/**
 * nav.js
 * Handles the mobile hamburger menu and active nav-link highlighting on scroll.
 */

export function initNav() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger  = document.querySelector('.hamburger');

  // ── Mobile menu toggle ─────────────────────────────────
  function toggleMenu() {
    mobileMenu.classList.toggle('open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
  }

  hamburger?.addEventListener('click', toggleMenu);

  mobileMenu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeMenu)
  );

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu?.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ── Active nav link on scroll ──────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function onScroll() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const top    = section.offsetTop - 90;
      const bottom = top + section.offsetHeight;
      const link   = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (!link) return;

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(a => (a.style.color = ''));
        link.style.color = 'var(--red)';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
