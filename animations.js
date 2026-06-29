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

  /* ──────────────────────────────────────────
     POPUP PAIEMENT
  ────────────────────────────────────────── */
  function initPaymentNotice() {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;

    var noticeHTML =
      '<div class="payment-notice-icon">$</div>' +
      '<div class="payment-notice-body">' +
        '<span class="payment-notice-label">Paiement</span>' +
        '<p class="payment-notice-text">' +
          'Seuls les paiements en <strong>CASH</strong> sont acceptés.<br>' +
          'Si vous êtes dans l\'impossibilité d\'avoir du <strong>CASH</strong>, ' +
          'les <strong>VIREMENTS</strong> sont acceptés avec des frais de <strong>5 $ SUPPLÉMENTAIRES</strong>.' +
        '</p>' +
      '</div>' +
      '<button class="payment-notice-close" aria-label="Fermer">&#x2715;</button>';

    var notice = document.createElement('div');
    notice.className = 'payment-notice';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.innerHTML = noticeHTML;
    document.body.appendChild(notice);

    function showNotice() {
      notice.classList.add('is-visible');
    }

    function hideNotice(onDone) {
      notice.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      notice.style.transform = 'translateY(calc(100% + 2rem))';
      notice.style.opacity = '0';
      setTimeout(function () {
        notice.style.transition = '';
        notice.style.transform = '';
        notice.style.opacity = '';
        notice.classList.remove('is-visible');
        if (onDone) onDone();
      }, 420);
    }

    if (isMobile) {
      /* ── MOBILE : bulle FAB ── */
      var fab = document.createElement('button');
      fab.className = 'payment-fab';
      fab.setAttribute('aria-label', 'Informations de paiement');
      fab.textContent = '$';
      document.body.appendChild(fab);

      setTimeout(function () {
        fab.classList.add('is-visible');
      }, 600);

      fab.addEventListener('click', function () {
        fab.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
        fab.style.transform = 'scale(0)';
        fab.style.opacity = '0';
        setTimeout(showNotice, 200);
      });

      notice.querySelector('.payment-notice-close').addEventListener('click', function () {
        hideNotice(function () {
          fab.style.transform = '';
          fab.style.opacity = '';
          fab.classList.add('is-visible');
        });
      });

    } else {
      /* ── DESKTOP : popup automatique ── */
      setTimeout(showNotice, 1900);

      notice.querySelector('.payment-notice-close').addEventListener('click', function () {
        hideNotice(function () {
          if (notice.parentNode) notice.parentNode.removeChild(notice);
        });
      });
    }
  }

  /* ── INIT ── */
  function init() {
    if (!prefersReducedMotion) initCurtain();
    initReveal();
    initPaymentNotice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
