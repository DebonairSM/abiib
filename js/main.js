/* ============================================================
   ABIIB – Language Toggle & Navigation
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Language data
     ---------------------------------------------------------- */
  var LANG_KEY = 'abiib_lang';

  /* ----------------------------------------------------------
     2. Initialise on DOM ready
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem(LANG_KEY) || 'pt';
    applyLang(saved);
    wireButtons(saved);
    wireHamburger();
    wireNavHighlight();
  });

  /* ----------------------------------------------------------
     3. Apply language class to <html>
     ---------------------------------------------------------- */
  function applyLang(lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    /* Show / hide translated elements */
    var ptEls = document.querySelectorAll('[data-pt]');
    var enEls = document.querySelectorAll('[data-en]');

    ptEls.forEach(function (el) {
      if (lang === 'pt') {
        el.textContent = el.getAttribute('data-pt');
      }
    });

    enEls.forEach(function (el) {
      if (lang === 'en') {
        el.textContent = el.getAttribute('data-en');
      }
    });

    /* Toggle .lang-pt / .lang-en blocks */
    document.querySelectorAll('.lang-pt, .lang-en').forEach(function (el) {
      var show = el.classList.contains('lang-' + lang);
      el.style.display = show ? '' : 'none';
    });

    localStorage.setItem(LANG_KEY, lang);
  }

  /* ----------------------------------------------------------
     4. Wire toggle buttons
     ---------------------------------------------------------- */
  function wireButtons(initial) {
    var btnPT = document.getElementById('btn-pt');
    var btnEN = document.getElementById('btn-en');
    if (!btnPT || !btnEN) return;

    markActive(initial, btnPT, btnEN);

    btnPT.addEventListener('click', function () {
      applyLang('pt');
      markActive('pt', btnPT, btnEN);
    });

    btnEN.addEventListener('click', function () {
      applyLang('en');
      markActive('en', btnPT, btnEN);
    });
  }

  function markActive(lang, btnPT, btnEN) {
    if (lang === 'pt') {
      btnPT.classList.add('active');
      btnEN.classList.remove('active');
    } else {
      btnEN.classList.add('active');
      btnPT.classList.remove('active');
    }
  }

  /* ----------------------------------------------------------
     5. Mobile hamburger
     ---------------------------------------------------------- */
  function wireHamburger() {
    var btn = document.querySelector('.nav-hamburger');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    /* Close on link click */
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     6. Highlight active nav link on scroll
     ---------------------------------------------------------- */
  function wireNavHighlight() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.style.borderBottomColor = '';
            link.style.color = '';
          });
          var active = document.querySelector(
            '.nav-links a[href="#' + entry.target.id + '"]'
          );
          if (active) {
            active.style.color = '#ffffff';
            active.style.borderBottomColor = 'var(--gold, #a07830)';
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

})();
