/**
 * WordPress-style scroll entrance animations.
 * Types: up, down, left, right, zoom-in, zoom-out, fade
 */
(function () {
  const STAGGER_PATTERNS = {
    'alternate-lr': ['reveal--left', 'reveal--right', 'reveal--zoom-in', 'reveal--left', 'reveal--right', 'reveal--zoom-in'],
    'alternate-zoom': ['reveal--zoom-in', 'reveal--up', 'reveal--zoom-in', 'reveal--up'],
    'slide-up': ['reveal--up'],
    'slide-left': ['reveal--left'],
    'slide-right': ['reveal--right'],
  };

  const TYPE_ALIASES = {
    up: 'reveal--up',
    down: 'reveal--down',
    left: 'reveal--left',
    right: 'reveal--right',
    'zoom-in': 'reveal--zoom-in',
    'zoom-out': 'reveal--zoom-out',
    fade: 'reveal--fade',
    'slide-up': 'reveal--up',
    'slide-down': 'reveal--down',
    'slide-left': 'reveal--left',
    'slide-right': 'reveal--right',
  };

  function revealEl(el) {
    if (!el.classList.contains('visible')) el.classList.add('visible');
  }

  function applyRevealType(el) {
    const dataType = el.dataset.reveal;
    if (dataType && TYPE_ALIASES[dataType]) {
      el.classList.add(TYPE_ALIASES[dataType]);
    }
    if (el.classList.contains('from-left')) el.classList.add('reveal--left');
    if (el.classList.contains('from-right')) el.classList.add('reveal--right');
    if (el.dataset.revealDelay) {
      el.style.setProperty('--reveal-delay', el.dataset.revealDelay);
    } else if (el.style.transitionDelay) {
      el.style.setProperty('--reveal-delay', el.style.transitionDelay);
    }
    if (el.dataset.revealDuration === 'slow') el.classList.add('reveal--slow');
    if (el.dataset.revealDuration === 'fast') el.classList.add('reveal--fast');
  }

  function setupStaggerGrids() {
    document.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
      const patternName = parent.dataset.revealStagger || 'alternate-lr';
      const pattern = STAGGER_PATTERNS[patternName] || STAGGER_PATTERNS['alternate-lr'];
      const selector = parent.dataset.revealChild || '.svc-card, .testi-card';
      const step = parseFloat(parent.dataset.revealStep) || 0.1;

      parent.classList.remove('reveal', 'visible');

      parent.querySelectorAll(selector).forEach((child, i) => {
        child.classList.add('reveal', pattern[i % pattern.length]);
        child.style.setProperty('--reveal-delay', `${(i * step).toFixed(2)}s`);
      });
    });
  }

  function initScrollReveal() {
    setupStaggerGrids();

    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    reveals.forEach(applyRevealType);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(revealEl);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealEl(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -5% 0px' }
    );

    reveals.forEach((el) => io.observe(el));

    function revealInView() {
      const vh = window.innerHeight;
      const edge = 40;
      reveals.forEach((el) => {
        if (el.classList.contains('visible')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh - edge && r.bottom > edge) {
          revealEl(el);
          io.unobserve(el);
        }
      });
    }

    requestAnimationFrame(revealInView);
    window.addEventListener('load', revealInView, { once: true });
    window.addEventListener('resize', () => requestAnimationFrame(revealInView), { passive: true });
  }

  window.initScrollReveal = initScrollReveal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
