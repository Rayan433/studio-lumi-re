(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────────────────────────────────
     RIDEAU D'OUVERTURE
  ────────────────────────────────────────── */
  function initCurtain() {
    var curtain = document.createElement('div');
    curtain.className = 'curtain';
    curtain.setAttribute('aria-hidden', 'true');
    curtain.innerHTML =
      '<div class="curtain-panel curtain-panel--left"></div>' +
      '<div class="curtain-panel curtain-panel--right"></div>' +
      '<div class="curtain-logo">Studio&nbsp;<span class="accent">Lumière</span></div>';

    document.body.appendChild(curtain);
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
      curtain.classList.add('is-open');
      document.body.style.overflow = '';

      setTimeout(function () {
        if (curtain.parentNode) curtain.parentNode.removeChild(curtain);
      }, 1200);
    }, 450);
  }

  /* ──────────────────────────────────────────
     FADE-IN AU SCROLL
  ────────────────────────────────────────── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.stats, .why-us, .promise, .services, .process, .testimonials, .cta-final'
    );
    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ── INIT ── */
  function init() {
    if (!prefersReducedMotion) initCurtain();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
