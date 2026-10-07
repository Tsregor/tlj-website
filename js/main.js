/* Terrance Lamonte, Jr. portfolio: slime button and contact form. No dependencies. */

/* CONTACT FORM
   GitHub Pages can't receive form submissions on its own. To switch the form on,
   create a form at a form service that accepts a standard POST (Formspree is one),
   then paste the endpoint address it gives you between the quotes below.
   While this is empty, the form stays hidden and the page shows the social links only. */
var FORM_ENDPOINT = '';

(function () {
  'use strict';

  /* ---------- Slime ---------- */
  var slimeBtn = document.getElementById('slime-btn');
  var slime = document.getElementById('slime');
  var SLIME_MS = 4900; // matches the animation length in css/styles.css

  if (slimeBtn && slime) {
    var slimeTimer = null;
    slimeBtn.hidden = false;
    slimeBtn.addEventListener('click', function () {
      if (slimeTimer) return;
      slime.classList.add('is-on');
      slimeBtn.disabled = true;
      slimeTimer = setTimeout(function () {
        slime.classList.remove('is-on');
        slimeBtn.disabled = false;
        slimeTimer = null;
      }, SLIME_MS);
    });
  }

  /* ---------- Contact form ---------- */
  var wrap = document.getElementById('contact-form-wrap');
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  var done = document.getElementById('contact-done');

  if (!wrap || !form || !FORM_ENDPOINT) return;
  wrap.hidden = false;
  form.action = FORM_ENDPOINT;

  function say(text, state) {
    status.textContent = text;
    if (state) { status.setAttribute('data-state', state); } else { status.removeAttribute('data-state'); }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      say('Please add your name, a valid email and a message.', 'error');
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    say('Sending…');

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed: ' + response.status);
        form.hidden = true;
        done.hidden = false;
      })
      .catch(function () {
        button.disabled = false;
        say('That didn’t send. Please try again, or reach me through one of the links on this page.', 'error');
      });
  });
})();
