/* Navbar scroll + hero clearance below fixed header */
const nav = document.getElementById('mainNav');

function syncNavOffset() {
  if (!nav) return;
  const gap = 20;
  document.documentElement.style.setProperty('--nav-offset', `${nav.offsetHeight + gap}px`);
}

syncNavOffset();
window.addEventListener('resize', syncNavOffset);
window.addEventListener('load', syncNavOffset);

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
  syncNavOffset();
});

/* Mobile menu */
const mobileMenu = document.getElementById('mobileMenu');
const burgerBtn = document.getElementById('burgerBtn');
const mobileClose = document.getElementById('mobileClose');

function setMobileMenuOpen(open) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('mobile-menu-open', open);
}

if (burgerBtn) burgerBtn.addEventListener('click', () => setMobileMenuOpen(true));
if (mobileClose) mobileClose.addEventListener('click', () => setMobileMenuOpen(false));
document.querySelectorAll('#mobileMenu a').forEach((a) => {
  a.addEventListener('click', () => setMobileMenuOpen(false));
});

/* Hero headline animation */
const headlines = ['Transform', 'Your', 'Life,', 'Elevate', 'Your', 'Journey.'];
const h1 = document.getElementById('heroHeadline');
headlines.forEach((w, i) => {
  const span = document.createElement('span');
  span.className = 'word';
  span.innerHTML = (w === 'Journey.' ? '<em>' + w + '</em>' : w) + '&nbsp;';
  span.style.animationDelay = (0.4 + i * 0.13) + 's';
  h1.appendChild(span);
});

/* Hero parallax (winding road) */
const heroBg = document.getElementById('heroLayerBg');
const heroGlow = document.getElementById('heroGlow');
const heroSection = document.getElementById('hero');

const heroBaseScale = 1.12;

function updateHeroParallax() {
  if (!heroSection || !heroBg) return;
  const sy = window.scrollY;
  const heroH = heroSection.offsetHeight;
  const progress = Math.min(sy / heroH, 1);
  heroBg.style.transform =
    `scale(${heroBaseScale + progress * 0.05}) translateY(${sy * 0.32}px)`;
}

window.addEventListener('scroll', updateHeroParallax, { passive: true });
updateHeroParallax();

if (heroSection && heroBg) {
  heroSection.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    const sy = window.scrollY;
    heroBg.style.transform =
      `scale(${heroBaseScale}) translate(${xPct * -22}px, ${sy * 0.32 + yPct * -14}px)`;
    if (heroGlow) {
      heroGlow.style.transform = `translate(${xPct * 24}px, ${yPct * 16}px)`;
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    updateHeroParallax();
    if (heroGlow) heroGlow.style.transform = '';
  });
}

/* Services accordion grid */
const svcCards = document.querySelectorAll('.svc-card');

function closeSvcCard(card) {
  card.classList.remove('is-open');
  const body = card.querySelector('.svc-card-body');
  const toggle = card.querySelector('.svc-card-toggle');
  if (body) body.hidden = true;
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function openSvcCard(card) {
  svcCards.forEach((c) => {
    if (c !== card) closeSvcCard(c);
  });
  card.classList.add('is-open');
  const body = card.querySelector('.svc-card-body');
  const toggle = card.querySelector('.svc-card-toggle');
  if (body) body.hidden = false;
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
}

svcCards.forEach((card) => {
  const toggle = card.querySelector('.svc-card-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    if (card.classList.contains('is-open')) {
      closeSvcCard(card);
    } else {
      openSvcCard(card);
    }
  });
});

/* Tilt cards */
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* Testimonials accordion grid */
const testiCards = document.querySelectorAll('.testi-card');

function closeTestiCard(card) {
  card.classList.remove('is-open');
  const body = card.querySelector('.testi-card-body');
  const toggle = card.querySelector('.testi-card-toggle');
  if (body) body.hidden = true;
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function openTestiCard(card) {
  testiCards.forEach((c) => {
    if (c !== card) closeTestiCard(c);
  });
  card.classList.add('is-open');
  const body = card.querySelector('.testi-card-body');
  const toggle = card.querySelector('.testi-card-toggle');
  if (body) body.hidden = false;
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
}

testiCards.forEach((card) => {
  const toggle = card.querySelector('.testi-card-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    if (card.classList.contains('is-open')) {
      closeTestiCard(card);
    } else {
      openTestiCard(card);
    }
  });
});

/* Contact form */
document.querySelector('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.innerHTML = 'Sent! <i class="bi bi-check-lg"></i>';
  btn.style.background = 'var(--teal)';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

/* Image fallback for missing service photos */
document.querySelectorAll('img[data-fallback]').forEach((img) => {
  img.addEventListener('error', function onError() {
    const color = this.dataset.fallback || '#00293B';
    const media = this.closest('.svc-card-media');
    const card = this.closest('.svc-card');

    if (media) {
      media.style.background = `linear-gradient(135deg, ${color}, #001a24)`;
      this.style.display = 'none';
    } else if (this.closest('.svc-card-thumb')) {
      this.style.display = 'none';
      const thumb = this.closest('.svc-card-thumb');
      if (thumb && card) {
        thumb.classList.add('svc-card-thumb-icon');
        thumb.innerHTML = '<i class="bi bi-image" aria-hidden="true"></i>';
      }
    } else {
      this.style.background = `linear-gradient(135deg, ${color}, #001a24)`;
      this.style.minHeight = this.classList.contains('service-card-img') ? '180px' : '100%';
    }

    this.alt = this.alt || 'Image coming soon';
    this.removeAttribute('src');
    this.removeEventListener('error', onError);
  });
});
