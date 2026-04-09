/**
 * loader.js
 * Fetches each HTML partial and replaces its [data-section] placeholder.
 * After all sections are injected, the UI modules are initialised.
 */

import { initNav }        from './nav.js';
import { initAnimations } from './animations.js';
import { initContact }    from './contact.js';
import { initFooter }     from './footer.js';

const placeholders = document.querySelectorAll('[data-section]');

async function loadSection(el) {
  const file = el.getAttribute('data-section');
  const res  = await fetch(file);
  if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
  const html = await res.text();
  el.insertAdjacentHTML('afterend', html);
  el.remove();
}

async function init() {
  try {
    await Promise.all([...placeholders].map(loadSection));
  } catch (err) {
    console.error('[loader] Could not load a section partial:', err);
    return;
  }

  initNav();
  initAnimations();
  initContact();
  initFooter();
}

init();
