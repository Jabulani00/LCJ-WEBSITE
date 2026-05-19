/**
 * LCJ Organic Tree — shareable canvas component
 *
 * Script tag:
 *   <link rel="stylesheet" href="css/organic-tree.css">
 *   <div id="tree"></div>
 *   <script src="js/organic-tree.js"></script>
 *   <script>
 *     new OrganicTree(document.getElementById('tree')).start();
 *   </script>
 *
 * Custom element:
 *   <link rel="stylesheet" href="css/organic-tree.css">
 *   <script src="js/organic-tree.js"></script>
 *   <lcj-organic-tree logo="assets/icon.png"></lcj-organic-tree>
 */
(function (global) {
  'use strict';

  const DEFAULT_COLORS = {
    primary: '#00293B',
    primaryDark: '#001a24',
    primaryLight: '#003d52',
    brand: '#DC014B',
    teal: '#29AAE0',
    accent: '#F9A003',
    maroon: '#711544',
    leafPalette: ['#29AAE0', '#DC014B', '#F9A003', '#00293B', '#711544', '#3A7F3D'],
  };

  const DEFAULT_LOGO_PATHS = ['assets/icon.png', 'assets/images/icon.png'];

  function mergeColors(overrides) {
    return { ...DEFAULT_COLORS, ...overrides, leafPalette: overrides.leafPalette || DEFAULT_COLORS.leafPalette };
  }

  function resolveLogoPath(path) {
    try {
      return new URL(path, document.baseURI).href;
    } catch {
      return path;
    }
  }

  function hexToRgb(hex) {
    const h = String(hex).replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function readCssTheme(container) {
    const root = container.closest('[data-organic-tree-theme]') || document.documentElement;
    const s = getComputedStyle(root);
    const pick = (name, fallback) => s.getPropertyValue(name).trim() || fallback;
    return {
      primary: pick('--primary', DEFAULT_COLORS.primary),
      primaryDark: pick('--primary-dark', DEFAULT_COLORS.primaryDark),
      primaryLight: pick('--primary-light', DEFAULT_COLORS.primaryLight),
      brand: pick('--brand', DEFAULT_COLORS.brand),
      teal: pick('--teal', DEFAULT_COLORS.teal),
      accent: pick('--accent', DEFAULT_COLORS.accent),
      maroon: pick('--maroon', DEFAULT_COLORS.maroon),
    };
  }

  class OrganicTree {
    /**
     * @param {HTMLElement} container
     * @param {object} [options]
     * @param {HTMLCanvasElement} [options.canvas]
     * @param {object} [options.colors]
     * @param {string|string[]} [options.logo]
     * @param {number} [options.seed]
     * @param {number} [options.trunkWidth]
     * @param {number} [options.maxLevel]
     * @param {number} [options.minHeight]
     * @param {number} [options.maxHeight]
     * @param {number} [options.heightRatio]
     * @param {boolean} [options.centered]
     * @param {boolean} [options.pauseWhenHidden]
     * @param {boolean} [options.reducedMotion]
     */
    constructor(container, options = {}) {
      if (!container || !(container instanceof HTMLElement)) {
        throw new TypeError('OrganicTree requires a container element');
      }

      this.container = container;
      this.options = options;
      this.colors = mergeColors({
        ...readCssTheme(container),
        ...(options.colors || {}),
      });

      this.canvas =
        options.canvas ||
        container.querySelector('canvas') ||
        (() => {
          const el = document.createElement('canvas');
          container.appendChild(el);
          return el;
        })();

      this.canvas.classList.add('lcj-organic-tree__canvas');
      this.container.classList.add('lcj-organic-tree');

      this.ctx = this.canvas.getContext('2d');
      const logoOpt = options.logo;
      const explicit = logoOpt
        ? (Array.isArray(logoOpt) ? logoOpt : [logoOpt]).filter(Boolean)
        : [];
      this.logoPaths = [...explicit];
      for (const p of DEFAULT_LOGO_PATHS) {
        if (!this.logoPaths.includes(p)) this.logoPaths.push(p);
      }
      this.seed = options.seed ?? 8321;
      this.trunkWidth = options.trunkWidth ?? 28;
      this.maxLevel = options.maxLevel ?? 8;
      this.minHeight = options.minHeight ?? 280;
      this.maxHeight = options.maxHeight ?? 420;
      this.heightRatio = options.heightRatio ?? 0.55;
      this.centered = options.centered !== false;
      this.pauseWhenHidden = options.pauseWhenHidden !== false;
      this.reducedMotion =
        options.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.maxFallers = this.reducedMotion ? 0 : (options.maxFallers ?? 10);
      this.growDuration = this.reducedMotion ? 0 : (options.growDuration ?? 2800);
      this.canopyStart = options.canopyStart ?? 2200;
      this.canopyFade = options.canopyFade ?? 750;
      this.spawnInterval = options.spawnInterval ?? 980;

      this.W = 680;
      this.H = 420;
      this.dpr = 1;
      this.midX = 0;
      this.baseY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.branches = [];
      this.tips = [];
      this.canopy = [];
      this.fallers = [];
      this.t0 = null;
      this.lastSpawn = -999;
      this.running = false;
      this.visible = true;
      this.rafId = null;
      this._rngSeed = this.seed;
      this.logoImg = new Image();
      this.logoReady = false;
      this._logoIndex = 0;

      this._onResize = () => this.resize();
      this._frame = (ts) => this._drawFrame(ts);
      this._resizeObserver = null;
      this._intersectionObserver = null;
    }

    _rng() {
      this._rngSeed ^= this._rngSeed << 13;
      this._rngSeed ^= this._rngSeed >> 17;
      this._rngSeed ^= this._rngSeed << 5;
      return (this._rngSeed >>> 0) / 0xffffffff;
    }

    _rand(a, b) {
      return a + this._rng() * (b - a);
    }

    _branchColor(lv) {
      const t = lv / this.maxLevel;
      const a = hexToRgb(this.colors.primaryDark);
      const c = hexToRgb(this.colors.primaryLight);
      return `rgb(${Math.round(a.r + (c.r - a.r) * t)},${Math.round(a.g + (c.g - a.g) * t)},${Math.round(a.b + (c.b - a.b) * t)})`;
    }

    _grow(x1, y1, angle, len, w, lv) {
      if (len < 8 || lv > this.maxLevel) {
        this.tips.push({ x: x1, y: y1 });
        return;
      }
      const x2 = x1 + Math.sin(angle) * len;
      const y2 = y1 - Math.cos(angle) * len;
      this.branches.push({ x1, y1, x2, y2, w, lv });
      const spread = 0.26 + this._rand(0, 0.2);
      this._grow(
        x2,
        y2,
        angle - spread + this._rand(-0.08, 0.08),
        len * this._rand(0.66, 0.75),
        w * this._rand(0.72, 0.78),
        lv + 1
      );
      this._grow(
        x2,
        y2,
        angle + spread + this._rand(-0.08, 0.08),
        len * this._rand(0.66, 0.75),
        w * this._rand(0.72, 0.78),
        lv + 1
      );
    }

    _centerTree() {
      if (!this.centered || !this.branches.length) return;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const b of this.branches) {
        minX = Math.min(minX, b.x1, b.x2);
        maxX = Math.max(maxX, b.x1, b.x2);
        minY = Math.min(minY, b.y1, b.y2);
        maxY = Math.max(maxY, b.y1, b.y2);
      }
      for (const leaf of this.canopy) {
        const pad = leaf.isLogo ? leaf.logoSize : leaf.r;
        minX = Math.min(minX, leaf.x - pad);
        maxX = Math.max(maxX, leaf.x + pad);
        minY = Math.min(minY, leaf.y - pad);
        maxY = Math.max(maxY, leaf.y + pad);
      }
      this.offsetX = this.W / 2 - (minX + maxX) / 2;
      this.offsetY = this.H / 2 - (minY + maxY) / 2;
    }

    build() {
      this._rngSeed = this.seed;
      this.branches = [];
      this.tips = [];
      this.canopy = [];
      this._grow(this.midX, this.baseY, 0, Math.min(this.H * 0.32, 130), this.trunkWidth, 0);
      this.tips.forEach((tip) => {
        for (let i = 0; i < 8; i++) {
          const a = this._rand(0, Math.PI * 2);
          const d = this._rand(4, 16);
          this.canopy.push({
            x: tip.x + Math.cos(a) * d,
            y: tip.y + Math.sin(a) * d * 0.62,
            r: this._rand(3, 6.5),
            color: this.colors.leafPalette[Math.floor(this._rand(0, this.colors.leafPalette.length))],
            phase: this._rand(0, Math.PI * 2),
            isLogo: this._logoDrawable() && this._rng() > 0.5,
            logoSize: this._rand(14, 22),
            rot: this._rand(-0.4, 0.4),
          });
        }
      });
      this._centerTree();
    }

    resize() {
      const wrap = this.container;
      this.W = wrap.clientWidth || 680;
      this.H = Math.max(this.minHeight, Math.min(this.maxHeight, this.W * this.heightRatio));
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = this.W * this.dpr;
      this.canvas.height = this.H * this.dpr;
      this.canvas.style.width = this.W + 'px';
      this.canvas.style.height = this.H + 'px';
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.midX = this.W / 2;
      this.baseY = this.H - 20;
      this.build();
    }

    _logoDrawable() {
      return this.logoReady && this.logoImg.complete && this.logoImg.naturalWidth > 0;
    }

    _onLogoReady() {
      if (!this.logoImg.naturalWidth) return false;
      this.logoReady = true;
      this.build();
      return true;
    }

    _tryLoadLogo() {
      if (this._logoIndex >= this.logoPaths.length) {
        this.logoReady = false;
        this.build();
        return;
      }
      this.logoImg.src = resolveLogoPath(this.logoPaths[this._logoIndex]);
      if (this.logoImg.complete && this.logoImg.naturalWidth > 0) {
        this._onLogoReady();
      }
    }

    _loadLogo() {
      return new Promise((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          resolve(this._logoDrawable());
        };

        this.logoImg.onload = () => {
          this._onLogoReady();
          finish();
        };
        this.logoImg.onerror = () => {
          this._logoIndex += 1;
          this.logoReady = false;
          if (this._logoIndex >= this.logoPaths.length) finish();
          else this._tryLoadLogo();
        };

        if (this._logoDrawable()) {
          finish();
          return;
        }
        this._tryLoadLogo();
        if (this._logoDrawable()) finish();
      });
    }

    _drawLogo(x, y, size, rot, alpha) {
      if (!this._logoDrawable()) return false;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.translate(x, y);
      this.ctx.rotate(rot);
      this.ctx.drawImage(this.logoImg, -size / 2, -size / 2, size, size);
      this.ctx.restore();
      return true;
    }

    _spawnLeaf() {
      if (this.fallers.length >= this.maxFallers || !this.tips.length) return;
      const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
      this.fallers.push({
        x: tip.x + (Math.random() - 0.5) * 28,
        y: tip.y,
        size: 14 + Math.random() * 12,
        color: this.colors.leafPalette[Math.floor(Math.random() * this.colors.leafPalette.length)],
        vx: 0,
        vy: 0.45 + Math.random() * 0.55,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.055,
        sway: Math.random() * Math.PI * 2,
        swayAmt: 0.45 + Math.random() * 1.4,
        swaySpeed: 0.016 + Math.random() * 0.026,
        alpha: 1,
        useLogo: this._logoDrawable(),
      });
    }

    _drawFrame(ts) {
      this.rafId = requestAnimationFrame(this._frame);

      if (!this.running || (this.pauseWhenHidden && !this.visible)) return;

      if (!this.t0) this.t0 = ts;
      const elapsed = ts - this.t0;

      this.ctx.clearRect(0, 0, this.W, this.H);
      this.ctx.save();
      this.ctx.translate(this.offsetX, this.offsetY);

      const growDur = this.growDuration;
      const prog = growDur === 0 ? 1 : Math.min(elapsed / growDur, 1);

      for (const b of this.branches) {
        const s = b.lv / (this.maxLevel + 1);
        const e = (b.lv + 1) / (this.maxLevel + 1);
        if (prog <= s) continue;
        const frac = Math.min((prog - s) / (e - s), 1);
        this.ctx.beginPath();
        this.ctx.moveTo(b.x1, b.y1);
        this.ctx.lineTo(b.x1 + (b.x2 - b.x1) * frac, b.y1 + (b.y2 - b.y1) * frac);
        this.ctx.strokeStyle = this._branchColor(b.lv);
        this.ctx.lineWidth = b.w;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
      }

      if (elapsed > this.canopyStart || growDur === 0) {
        const lp = growDur === 0 ? 1 : Math.min((elapsed - this.canopyStart) / this.canopyFade, 1);
        const time = ts * 0.001;
        for (const leaf of this.canopy) {
          const lx = leaf.x + Math.sin(time * 0.62 + leaf.phase) * 1.6;
          const ly = leaf.y + Math.cos(time * 0.48 + leaf.phase) * 0.9;
          if (leaf.isLogo && this._drawLogo(lx, ly, leaf.logoSize, leaf.rot + time * 0.15, lp * 0.9)) continue;
          this.ctx.globalAlpha = lp * 0.82;
          this.ctx.beginPath();
          this.ctx.ellipse(lx, ly, leaf.r, leaf.r * 0.68, 0, 0, Math.PI * 2);
          this.ctx.fillStyle = leaf.color;
          this.ctx.fill();
          this.ctx.globalAlpha = 1;
        }
      }

      if (this.maxFallers > 0 && prog >= 1 && elapsed - this.lastSpawn > this.spawnInterval) {
        this._spawnLeaf();
        this.lastSpawn = elapsed;
      }

      for (let i = this.fallers.length - 1; i >= 0; i--) {
        const f = this.fallers[i];
        f.sway += f.swaySpeed;
        f.vx = Math.sin(f.sway) * f.swayAmt * 0.48;
        f.x += f.vx;
        f.y += f.vy;
        f.vy = Math.min(f.vy + 0.021, 2);
        f.rot += f.rotSpeed;
        if (f.y > this.H + 28) {
          this.fallers.splice(i, 1);
          continue;
        }
        if (f.y > this.H - 65) f.alpha = Math.max(0, (this.H - f.y) / 65);
        if (this._drawLogo(f.x, f.y, f.size, f.rot, f.alpha)) continue;
        this.ctx.save();
        this.ctx.globalAlpha = f.alpha;
        this.ctx.translate(f.x, f.y);
        this.ctx.rotate(f.rot);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, f.size * 1.1, f.size * 0.5, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = f.color;
        this.ctx.fill();
        this.ctx.restore();
      }

      this.ctx.restore();
    }

    /** Begin animation and observers */
    start() {
      if (this.running) return this;
      this.running = true;
      this.visible = true;
      this.t0 = null;
      this.lastSpawn = -999;
      this.resize();

      window.addEventListener('resize', this._onResize, { passive: true });
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(() => this.resize());
        this._resizeObserver.observe(this.container);
      }

      if (this.pauseWhenHidden && typeof IntersectionObserver !== 'undefined') {
        this._intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.visible = entry.isIntersecting;
              if (!this.visible) this.fallers = [];
            });
          },
          { threshold: 0 }
        );
        requestAnimationFrame(() => {
          this._intersectionObserver.observe(this.container);
          const rect = this.container.getBoundingClientRect();
          this.visible = rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
        });
      }

      this._loadLogo().then(() => {
        if (this._logoDrawable()) this.build();
      });

      this.rafId = requestAnimationFrame(this._frame);
      return this;
    }

    /** Stop animation and detach observers */
    destroy() {
      this.running = false;
      if (this.rafId != null) cancelAnimationFrame(this.rafId);
      this.rafId = null;
      window.removeEventListener('resize', this._onResize);
      this._resizeObserver?.disconnect();
      this._intersectionObserver?.disconnect();
      this.fallers = [];
    }

    /** Rebuild geometry and reset growth animation */
    rebuild() {
      this.t0 = null;
      this.lastSpawn = -999;
      this.fallers = [];
      this.build();
    }
  }

  function optionsFromElement(el) {
    const num = (attr, fallback) => {
      const v = el.getAttribute(attr);
      return v == null || v === '' ? fallback : Number(v);
    };
    const bool = (attr, fallback) => {
      if (!el.hasAttribute(attr)) return fallback;
      const v = el.getAttribute(attr);
      return v === '' || v === 'true' || v === '1';
    };
    return {
      logo: el.getAttribute('logo') || undefined,
      seed: num('seed', undefined),
      trunkWidth: num('trunk-width', undefined),
      minHeight: num('min-height', undefined),
      maxHeight: num('max-height', undefined),
      heightRatio: num('height-ratio', undefined),
      centered: bool('centered', true),
      pauseWhenHidden: bool('pause-when-hidden', true),
      reducedMotion: bool('reduced-motion', undefined),
    };
  }

  class LCJOrganicTreeElement extends HTMLElement {
    connectedCallback() {
      if (this._instance) return;
      this._instance = new OrganicTree(this, optionsFromElement(this));
      this._instance.start();
    }

    disconnectedCallback() {
      this._instance?.destroy();
      this._instance = null;
    }
  }

  if (!customElements.get('lcj-organic-tree')) {
    customElements.define('lcj-organic-tree', LCJOrganicTreeElement);
  }

  global.OrganicTree = OrganicTree;
  global.LCJOrganicTreeElement = LCJOrganicTreeElement;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OrganicTree, LCJOrganicTreeElement };
  }
})(typeof window !== 'undefined' ? window : globalThis);
