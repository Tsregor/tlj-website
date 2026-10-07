/* Terrance Lamonte, Jr. portfolio: slime button, logo scroller, photo viewer and contact form. No dependencies. */

/* CONTACT FORM
   GitHub Pages can't receive form submissions on its own. To switch the form on,
   create a form at a form service that accepts a standard POST (Formspree is one),
   then paste the endpoint address it gives you between the quotes below.
   While this is empty, the form stays hidden and the page shows the booking email and social links. */
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

  /* ---------- Logo scroller: pause / play ---------- */
  var logos = document.getElementById('logos');
  var logosToggle = document.getElementById('logos-toggle');

  if (logos && logosToggle) {
    logosToggle.hidden = false;
    logosToggle.addEventListener('click', function () {
      var paused = logos.classList.toggle('is-paused');
      logosToggle.setAttribute('aria-pressed', String(paused));
      logosToggle.textContent = paused ? 'Play' : 'Pause';
    });
  }

  /* ---------- Gallery: full-screen photo viewer ---------- */
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var boxCap = document.getElementById('lightbox-cap');
  var photos = Array.prototype.slice.call(document.querySelectorAll('.gallery__grid a'));
  var current = 0;
  var opener = null;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    var link = photos[current];
    var thumb = link.querySelector('img');
    boxImg.src = link.getAttribute('href');
    boxImg.alt = thumb ? thumb.alt : '';
    boxCap.textContent = link.getAttribute('data-caption') || '';
  }

  // Without <dialog> support the links simply open the large photo.
  if (box && boxImg && photos.length && typeof box.showModal === 'function') {
    photos.forEach(function (link, index) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        opener = link;
        showPhoto(index);
        box.showModal();
      });
    });
    box.addEventListener('click', function (event) {
      var button = event.target.closest('[data-action]');
      if (button) {
        var action = button.getAttribute('data-action');
        if (action === 'close') box.close();
        if (action === 'prev') showPhoto(current - 1);
        if (action === 'next') showPhoto(current + 1);
      } else if (event.target === box) {
        box.close(); // a click on the dark area around the photo
      }
    });
    box.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') showPhoto(current - 1);
      if (event.key === 'ArrowRight') showPhoto(current + 1);
    });
    box.addEventListener('close', function () {
      boxImg.removeAttribute('src');
      if (opener) opener.focus();
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
