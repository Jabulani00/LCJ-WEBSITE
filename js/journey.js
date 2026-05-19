/**
 * Journey navigation — eased scroll, path progress rail, and directional transitions.
 */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STOPS = [
    { id: 'hero', label: 'Start', nav: null },
    { id: 'about', label: 'Story', nav: '#about' },
    { id: 'services', label: 'Services', nav: '#services' },
    { id: 'journeyBanner', label: 'Pillars', nav: null },
    { id: 'team', label: 'Guides', nav: '#team' },
    { id: 'testimonials', label: 'Voices', nav: null },
    { id: 'membership', label: 'Plans', nav: '#membership' },
    { id: 'contact', label: 'Connect', nav: '#contact' },
  ];

  const curtain = document.getElementById('journeyCurtain');
  const curtainLabel = document.getElementById('journeyCurtainLabel');
  const rail = document.getElementById('journeyRail');
  const railStops = document.getElementById('journeyRailStops');
  const railFill = document.getElementById('journeyRailFill');
  const nav = document.getElementById('mainNav');

  let isTraveling = false;
  let activeIndex = 0;

  const sections = STOPS.map((stop) => ({
    ...stop,
    el: document.getElementById(stop.id),
  })).filter((s) => s.el);

  if (!sections.length) return;

  document.documentElement.classList.add('journey-enhanced');

  /* ── Build progress rail ── */
  function buildRail() {
    if (!railStops) return;

    railStops.innerHTML = sections
      .map((stop, i) => {
        const href = stop.nav || `#${stop.id}`;
        return `<li>
          <a href="${href}" class="journey-rail-stop" data-index="${i}" title="${stop.label}">
            <span class="journey-rail-dot" aria-hidden="true"></span>
            <span class="journey-rail-name">${stop.label}</span>
          </a>
        </li>`;
      })
      .join('');

    railStops.querySelectorAll('.journey-rail-stop').forEach((link) => {
      link.addEventListener('click', (e) => {
        const idx = Number(link.dataset.index);
        const target = sections[idx]?.el;
        if (!target) return;
        e.preventDefault();
        travelTo(target, idx);
      });
    });

    if (rail) {
      rail.removeAttribute('hidden');
    }
  }

  /* ── Eased scroll ── */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function getScrollTarget(el) {
    const offset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')
    ) || 120;
    return el.getBoundingClientRect().top + window.scrollY - offset + 4;
  }

  function animateScroll(targetY) {
    return new Promise((resolve) => {
      if (reduceMotion) {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        setTimeout(resolve, 400);
        return;
      }

      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = Math.min(1400, Math.max(700, Math.abs(distance) * 0.55));
      const t0 = performance.now();

      function frame(now) {
        const t = Math.min((now - t0) / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(t));
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }

      requestAnimationFrame(frame);
    });
  }

  /* ── Curtain transition ── */
  function showCurtain(direction, label) {
    if (!curtain || reduceMotion) return Promise.resolve();

    curtain.setAttribute('data-direction', direction);
    if (curtainLabel && label) curtainLabel.textContent = label;

    curtain.classList.add('is-active');
    document.body.classList.add('journey-scroll-lock');

    return new Promise((resolve) => {
      setTimeout(resolve, 380);
    });
  }

  function hideCurtain() {
    if (!curtain || reduceMotion) return;
    curtain.classList.remove('is-active');
    document.body.classList.remove('journey-scroll-lock');
  }

  /* ── Travel to section ── */
  async function travelTo(el, targetIndex) {
    if (!el || isTraveling) return;

    const idx =
      targetIndex ??
      sections.findIndex((s) => s.el === el || s.id === el.id);
    if (idx < 0) return;

    const direction = idx >= activeIndex ? 'forward' : 'back';
    const label =
      el.dataset?.journeyLabel ||
      sections[idx]?.label ||
      'Continuing your journey';

    isTraveling = true;

    await showCurtain(direction, label);
    await animateScroll(getScrollTarget(el));
    hideCurtain();

    setActiveStop(idx);
    el.classList.add('journey-arrived');
    isTraveling = false;
  }

  /* ── Active stop + nav sync ── */
  function setActiveStop(index) {
    activeIndex = index;

    railStops?.querySelectorAll('.journey-rail-stop').forEach((link, i) => {
      link.classList.toggle('is-current', i === index);
      link.setAttribute('aria-current', i === index ? 'step' : 'false');
    });

    const progress = sections.length > 1 ? index / (sections.length - 1) : 0;
    if (railFill) {
      railFill.style.height = `${progress * 100}%`;
    }

    const stop = sections[index];
    if (!stop?.nav) return;

    document.querySelectorAll('.nav-links a, #mobileMenu a').forEach((link) => {
      const match = link.getAttribute('href') === stop.nav;
      link.classList.toggle('is-current', match);
    });
  }

  function resolveActiveFromScroll() {
    const probe = window.scrollY + (parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')
    ) || 120) + 80;

    let current = 0;
    sections.forEach((section, i) => {
      if (section.el.offsetTop <= probe) current = i;
    });

    setActiveStop(current);
    sections[current]?.el?.classList.add('journey-arrived');
  }

  /* ── Anchor interception ── */
  function bindJourneyLinks() {
    document.querySelectorAll('a[href^="#"]:not(.journey-rail-stop)').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          travelTo(sections[0].el, 0);
        });
        return;
      }

      const target = document.querySelector(href);
      if (!target || !target.classList.contains('journey-section')) return;

      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        travelTo(target);
      });
    });
  }

  /* ── Section arrival observer ── */
  function observeSections() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('journey-arrived');
          }
        });
      },
      { threshold: 0.12, rootMargin: '-8% 0px -8% 0px' }
    );

    sections.forEach((s) => io.observe(s.el));
  }

  /* ── Bridge path draw on scroll ── */
  function observeBridges() {
    document.querySelectorAll('.journey-bridge').forEach((bridge) => {
      const path = bridge.querySelector('.journey-bridge-path');
      if (!path) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            bridge.classList.add('is-drawn');
            io.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      io.observe(bridge);
    });
  }

  /* ── Intro on first load ── */
  function playIntro() {
    if (reduceMotion) {
      document.body.classList.add('journey-ready');
      return;
    }

    document.body.classList.add('journey-loading');
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.remove('journey-loading');
        document.body.classList.add('journey-ready');
        sections[0]?.el?.classList.add('journey-arrived');
      }, 520);
    });
  }

  /* ── Init ── */
  buildRail();
  bindJourneyLinks();
  observeSections();
  observeBridges();
  playIntro();
  resolveActiveFromScroll();

  let scrollTicking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (isTraveling || scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        resolveActiveFromScroll();
        scrollTicking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener('resize', resolveActiveFromScroll);
  window.addEventListener('load', resolveActiveFromScroll);
})();
