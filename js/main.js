/* Terrance Lamonte, Jr. portfolio: Surprise me button, logo scroller, photo viewer and contact form. No dependencies. */

/* CONTACT FORM
   GitHub Pages can't receive form submissions on its own. To switch the form on,
   create a form at a form service that accepts a standard POST (Formspree is one),
   then paste the endpoint address it gives you between the quotes below.
   While this is empty, the form stays hidden and the page shows the booking email and social links. */
var FORM_ENDPOINT = '';

(function () {
  'use strict';

  /* ---------- Surprise me: a random 90s / early-00s pop-up, gone in seconds ---------- */
  var fxBtn = document.getElementById('fx-btn');
  var fxLayer = document.getElementById('fx');
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  function make(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }
  function rand(min, max) { return min + Math.random() * (max - min); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = copy[i]; copy[i] = copy[j]; copy[j] = t;
    }
    return copy;
  }
  var PARTY = ['#ff3cac', '#ff8a00', '#ffe600', '#39ff14', '#00d1ff', '#8f5bff'];

  // The graffiti font loads only when someone reaches for the button.
  var markerFont = null;
  function loadMarker() {
    if (!markerFont) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap';
      document.head.appendChild(link);
      markerFont = new Promise(function (resolve) {
        link.onload = function () {
          if (document.fonts && document.fonts.load) {
            document.fonts.load('400 100px "Permanent Marker"').then(resolve, resolve);
          } else { resolve(); }
        };
        link.onerror = resolve;
      });
    }
    return markerFont;
  }

  var effects = {
    slime: function (stage) {
      [[-2, 11, .18], [7, 10, .42], [15, 12, .05], [25, 9, .34], [32, 12, .22], [42, 10, .48],
       [50, 11, .1], [59, 10, .38], [67, 12, 0], [77, 9, .28], [84, 11, .45], [93, 10, .15]].forEach(function (d) {
        var drip = make('i');
        drip.style.left = d[0] + '%'; drip.style.width = d[1] + '%'; drip.style.animationDelay = d[2] + 's';
        stage.appendChild(drip);
      });
      stage.appendChild(make('b', '', 'Slimed!'));
      return 4900;
    },

    graffiti: function (stage) {
      var tag = make('div', 'fx-tag');
      tag.appendChild(make('span', 'fx-tag__main', 'TLJ'));
      tag.appendChild(make('span', 'fx-tag__sub', 'was here'));
      for (var i = 0; i < 7; i++) {
        var drip = make('span', 'fx-tag__drip');
        drip.style.left = rand(10, 88) + '%';
        drip.style.setProperty('--h', Math.round(rand(40, 140)) + 'px');
        drip.style.setProperty('--c', pick(['#ff3cac', '#ff8a00', '#ffb000']));
        drip.style.setProperty('--d', rand(.7, 1.2).toFixed(2) + 's');
        tag.appendChild(drip);
      }
      stage.appendChild(tag);
      for (var k = 0; k < 46; k++) {
        var dot = make('span', 'fx-dot');
        var angle = rand(0, Math.PI * 2), dist = rand(18, 46);
        dot.style.left = (50 + Math.cos(angle) * dist) + '%';
        dot.style.top = (46 + Math.sin(angle) * dist * .75) + '%';
        dot.style.setProperty('--s', Math.round(rand(3, 11)) + 'px');
        dot.style.setProperty('--c', pick(PARTY));
        dot.style.setProperty('--d', rand(0, .8).toFixed(2) + 's');
        stage.appendChild(dot);
      }
      return 3800;
    },

    popups: function (stage) {
      var messages = shuffle([
        ['warn', 'CONGRATULATIONS!!! You are the 1,000,000th visitor!', ['Claim prize', 'OK']],
        ['warn', 'Warning: this site contains one (1) very manly muppet.', ['OK']],
        ['info', 'comedy.exe has finished downloading.', ['Open', 'Open harder']],
        ['info', 'Install the TLJ Toolbar?', ['Yes', 'Also yes']],
        ['warn', 'Your session is too fun. Please do not refresh.', ['OK']],
        ['info', 'A new booking request is waiting. It could be yours.', ['OK']],
        ['warn', 'Ctrl+Alt+Laugh detected.', ['OK', 'Cancel']]
      ]).slice(0, 5);
      messages.forEach(function (m, i) {
        var win = make('div', 'fx-win');
        win.style.setProperty('--x', (.08 + i * .19 + rand(-.05, .05)).toFixed(3));
        win.style.setProperty('--y', (.1 + i * .17 + rand(-.04, .04)).toFixed(3));
        win.style.setProperty('--d', (i * .32).toFixed(2) + 's');
        var bar = make('div', 'fx-win__bar');
        bar.appendChild(make('span', '', m[0] === 'warn' ? 'Warning' : 'Message'));
        bar.appendChild(make('span', 'fx-win__x', '×'));
        var body = make('div', 'fx-win__body');
        body.appendChild(make('span', 'fx-win__icon' + (m[0] === 'warn' ? ' fx-win__icon--warn' : ''), m[0] === 'warn' ? '!' : 'i'));
        body.appendChild(make('p', '', m[1]));
        var btns = make('div', 'fx-win__btns');
        m[2].forEach(function (label) { btns.appendChild(make('span', 'fx-win__btn', label)); });
        win.appendChild(bar); win.appendChild(body); win.appendChild(btns);
        stage.appendChild(win);
      });
      return 4200;
    },

    construction: function (stage) {
      ['a', 'b'].forEach(function (side) {
        var tape = make('div', 'fx-tape fx-tape--' + side);
        for (var i = 0; i < 4; i++) tape.appendChild(make('span', '', 'UNDER CONSTRUCTION'));
        stage.appendChild(tape);
      });
      var counter = make('div', 'fx-counter', 'You are visitor number');
      var digits = make('div', 'fx-counter__digits');
      var cells = [];
      for (var d = 0; d < 6; d++) { var cell = make('b', '', '0'); cells.push(cell); digits.appendChild(cell); }
      counter.appendChild(digits);
      counter.appendChild(make('span', 'fx-new', 'NEW!'));
      stage.appendChild(counter);
      var target = 1337, start = null;
      function paint(value) {
        var text = ('000000' + value).slice(-6);
        cells.forEach(function (c, i) { c.textContent = text.charAt(i); });
      }
      if (calm && calm.matches) { paint(target); return 3800; }
      function tick(now) {
        if (start === null) start = now + 500;
        var p = Math.max(0, Math.min(1, (now - start) / 1300));
        paint(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1 && stage.isConnected) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      return 3800;
    },

    wordart: function (stage) {
      var word = pick(['BOOYAH!', 'DA BOMB!', 'ALL THAT!', 'OFF THE HOOK!', 'TOTALLY RAD!', 'WORD UP!']);
      var wrap = make('div', 'fx-wa');
      var n = 0;
      word.split(' ').forEach(function (part) {
        var group = make('span', 'fx-wa__word'); // keeps each word on one line
        part.split('').forEach(function (ch) {
          var letter = make('span', '', ch);
          letter.style.setProperty('--c', PARTY[n % PARTY.length]);
          letter.style.setProperty('--d', (-n * .12).toFixed(2) + 's');
          group.appendChild(letter);
          n++;
        });
        wrap.appendChild(group);
      });
      stage.appendChild(wrap);
      for (var k = 0; k < 12; k++) {
        var spark = make('span', 'fx-spark');
        spark.style.left = rand(6, 92) + '%';
        spark.style.top = (rand(0, 1) < .5 ? rand(18, 36) : rand(62, 80)) + '%';
        spark.style.setProperty('--s', Math.round(rand(16, 42)) + 'px');
        spark.style.setProperty('--c', pick(['#ffe600', '#ffffff', '#00d1ff', '#ff3cac']));
        spark.style.setProperty('--d', rand(0, .6).toFixed(2) + 's');
        stage.appendChild(spark);
      }
      return 3600;
    }
  };

  if (fxBtn && fxLayer) {
    var bag = [];
    var lastFx = null;
    var busy = false;
    function nextEffect() {
      if (!bag.length) {
        bag = shuffle(Object.keys(effects));
        if (bag[0] === lastFx) bag.push(bag.shift());
      }
      lastFx = bag.shift();
      return lastFx;
    }
    function play(name) {
      var stage = make('div', 'fx-stage fx-' + name);
      fxLayer.appendChild(stage);
      var ms = effects[name](stage);
      if (calm && calm.matches) {
        stage.classList.add('fx-reduced');
        stage.style.setProperty('--dur', ms + 'ms');
      }
      setTimeout(function () {
        stage.remove();
        busy = false;
        fxBtn.disabled = false;
      }, ms);
    }
    fxBtn.hidden = false;
    ['pointerenter', 'focus', 'touchstart'].forEach(function (type) {
      fxBtn.addEventListener(type, loadMarker, { once: true, passive: true });
    });
    fxBtn.addEventListener('click', function () {
      if (busy) return;
      busy = true;
      fxBtn.disabled = true;
      var name = nextEffect();
      if (name === 'graffiti') {
        // Wait briefly for the marker font so the tag doesn't flash in a fallback font.
        Promise.race([loadMarker(), new Promise(function (r) { setTimeout(r, 700); })]).then(function () { play(name); });
      } else {
        play(name);
      }
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
