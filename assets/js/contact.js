/**
 * contact.js
 * Handles the contact form submission feedback.
 * Replace the body of handleSubmit with a real fetch() call to your backend
 * or a service like Formspree / EmailJS when you're ready to go live.
 */

export function initContact() {
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#2d6a4f';
  btn.disabled = true;

  // TODO: replace this timeout with a real API call, e.g.:
  // const data = Object.fromEntries(new FormData(e.target));
  // await fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: JSON.stringify(data) });

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}
