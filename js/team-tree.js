/**
 * Organic LCJ tree — matches organic_tree_simulation.html physics.
 * Logo icons for canopy + falling leaves; loop always runs when section visible.
 */
(function () {
  const canvas = document.getElementById('teamTreeCanvas');
  const section = document.getElementById('team');
  const stage = document.getElementById('teamTreeStage');
  const treeCol = document.getElementById('teamTreeColTree');
  const canvasWrap = canvas.parentElement;

  if (!canvas || !section || !stage || !canvasWrap || !treeCol) return;

  const ctx = canvas.getContext('2d');
  const ICON_PATHS = ['assets/icon.png', 'assets/images/icon.png'];
  const logoImg = new Image();
  let logoReady = false;
  let iconPathIndex = 0;

  const LEAF_PALETTE = ['#29AAE0', '#DC014B', '#F9A003', '#00293B', '#711544', '#3A7F3D'];

  function tryLoadLogo() {
    if (iconPathIndex >= ICON_PATHS.length) return;
    logoImg.src = ICON_PATHS[iconPathIndex];
  }

  logoImg.onload = () => {
    logoReady = true;
    buildTreeGeometry();
  };
  logoImg.onerror = () => {
    iconPathIndex += 1;
    if (iconPathIndex < ICON_PATHS.length) tryLoadLogo();
    else buildTreeGeometry();
  };
  tryLoadLogo();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 680;
  let H = 400;
  let dpr = 1;
  let midX;
  let baseY;
  let padTop = 64;
  let padBottom = 32;
  let branches = [];
  let tips = [];
  let canopy = [];
  let fallers = [];
  let anchors = [];
  let t0 = null;
  let lastSpawn = -999;
  let sectionVisible = false;
  let theme = {};

  const MAX_LV = 8;
  const MAX_FALLERS = prefersReduced ? 0 : 10;
  const SPAWN_INTERVAL = 980;
  const GROW_DURATION = 2800;
  const CANOPY_START = 2200;
  const CANOPY_FADE = 750;

  function readTheme() {
    const s = getComputedStyle(document.documentElement);
    theme = {
      primary: s.getPropertyValue('--primary').trim() || '#00293B',
      primaryDark: s.getPropertyValue('--primary-dark').trim() || '#001a24',
      primaryLight: s.getPropertyValue('--primary-light').trim() || '#003d52',
      brand: s.getPropertyValue('--brand').trim() || '#DC014B',
      teal: s.getPropertyValue('--teal').trim() || '#29AAE0',
      accent: s.getPropertyValue('--accent').trim() || '#F9A003',
      maroon: s.getPropertyValue('--maroon').trim() || '#711544',
    };
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function branchColor(lv) {
    const t = lv / MAX_LV;
    const a = hexToRgb(theme.primaryDark);
    const c = hexToRgb(theme.primaryLight);
    return `rgb(${Math.round(a.r + (c.r - a.r) * t)},${Math.round(a.g + (c.g - a.g) * t)},${Math.round(a.b + (c.b - a.b) * t)})`;
  }

  let _seed = 8321;
  function rng() {
    _seed ^= _seed << 13;
    _seed ^= _seed >> 17;
    _seed ^= _seed << 5;
    return (_seed >>> 0) / 0xffffffff;
  }
  const rand = (a, b) => a + rng() * (b - a);

  function grow(x1, y1, angle, len, w, lv) {
    if (len < 8 || lv > MAX_LV) {
      tips.push({ x: x1, y: y1 });
      return;
    }
    const x2 = x1 + Math.sin(angle) * len;
    const y2 = y1 - Math.cos(angle) * len;
    branches.push({ x1, y1, x2, y2, w, lv });
    const spread = 0.26 + rand(0, 0.2);
    grow(x2, y2, angle - spread + rand(-0.08, 0.08), len * rand(0.66, 0.75), w * rand(0.62, 0.7), lv + 1);
    grow(x2, y2, angle + spread + rand(-0.08, 0.08), len * rand(0.66, 0.75), w * rand(0.62, 0.7), lv + 1);
  }

  /** Rebuild branches only — never reset animation clock or fallers */
  function buildTreeGeometry() {
    _seed = 8321;
    branches = [];
    tips = [];
    canopy = [];

    const usable = baseY - padTop;
    const trunkH = Math.min(usable * 0.36, 118);
    grow(midX, baseY, 0, trunkH, 15, 0);

    tips.forEach((tip) => {
      for (let i = 0; i < 8; i++) {
        const a = rand(0, Math.PI * 2);
        const d = rand(4, 16);
        canopy.push({
          x: tip.x + Math.cos(a) * d,
          y: tip.y + Math.sin(a) * d * 0.62,
          r: rand(3, 6.5),
          color: LEAF_PALETTE[Math.floor(rand(0, LEAF_PALETTE.length))],
          isLogo: logoReady && rng() > 0.5,
          logoSize: rand(14, 22),
          phase: rand(0, Math.PI * 2),
          rot: rand(-0.4, 0.4),
        });
      }
    });

    fitTreeInView();
  }

  function fitTreeInView() {
    let minY = baseY;
    for (const t of tips) minY = Math.min(minY, t.y);
    for (const c of canopy) minY = Math.min(minY, c.y - c.logoSize * 0.55);
    const ceiling = padTop + 10;
    if (minY >= ceiling) return;
    const dy = ceiling - minY;
    branches.forEach((b) => {
      b.y1 += dy;
      b.y2 += dy;
    });
    tips.forEach((t) => {
      t.y += dy;
    });
    canopy.forEach((c) => {
      c.y += dy;
    });
  }

  function drawAnchors() {
    anchors = [];
    const canvasRect = canvas.getBoundingClientRect();
    if (!canvasRect.width) return;

    stage.querySelectorAll('.team-node').forEach((node) => {
      const r = node.getBoundingClientRect();
      const side = node.dataset.side || 'left';
      const color =
        getComputedStyle(node).getPropertyValue('--leaf-color').trim() || theme.teal;
      const ax =
        side === 'left'
          ? r.right - canvasRect.left - 6
          : r.left - canvasRect.left + 6;
      anchors.push({
        x: ax,
        y: r.top - canvasRect.top + 18,
        side,
        color,
      });
    });
  }

  function nearestTip(ax, ay, side) {
    let best = null;
    let minD = Infinity;
    for (const t of tips) {
      if (side === 'left' && t.x > midX + 36) continue;
      if (side === 'right' && t.x < midX - 36) continue;
      const d = (t.x - ax) ** 2 + (t.y - ay) ** 2;
      if (d < minD) {
        minD = d;
        best = t;
      }
    }
    if (best) return best;
    for (const t of tips) {
      const d = (t.x - ax) ** 2 + (t.y - ay) ** 2;
      if (d < minD) {
        minD = d;
        best = t;
      }
    }
    return best || { x: midX, y: baseY - 80 };
  }

  function resize() {
    const stageRect = stage.getBoundingClientRect();
    const treeRect = treeCol.getBoundingClientRect();
    W = Math.max(stageRect.width, 320);
    padTop = Math.max(56, W * 0.07);
    padBottom = 36;
    const treeArea = Math.max(260, Math.min(400, treeRect.width * 0.95));
    H = Math.max(stageRect.height, treeArea + padTop + padBottom);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    midX = treeRect.left - stageRect.left + treeRect.width / 2;
    baseY = H - padBottom;
    buildTreeGeometry();
    drawAnchors();
  }

  function drawLogo(x, y, size, rot, alpha) {
    if (!logoReady) return false;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.drawImage(logoImg, -size / 2, -size / 2, size, size);
    ctx.restore();
    return true;
  }

  function drawColorLeaf(x, y, size, rot, alpha, color) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 1.1, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function pickSpawnPoint() {
    if (tips.length) {
      const t = tips[Math.floor(Math.random() * tips.length)];
      return { x: t.x + (Math.random() - 0.5) * 28, y: t.y };
    }
    if (canopy.length) {
      const c = canopy[Math.floor(Math.random() * canopy.length)];
      return { x: c.x, y: c.y };
    }
    return null;
  }

  function spawnLeaf() {
    if (fallers.length >= MAX_FALLERS) return;
    const pt = pickSpawnPoint();
    if (!pt) return;
    fallers.push({
      x: pt.x,
      y: pt.y,
      size: 14 + Math.random() * 12,
      color: LEAF_PALETTE[Math.floor(Math.random() * LEAF_PALETTE.length)],
      useLogo: logoReady,
      vx: 0,
      vy: 0.45 + Math.random() * 0.55,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.055,
      sway: Math.random() * Math.PI * 2,
      swayAmt: 0.45 + Math.random() * 1.4,
      swaySpeed: 0.016 + Math.random() * 0.026,
      alpha: 1,
    });
  }

  function updateFallers() {
    for (let i = fallers.length - 1; i >= 0; i--) {
      const f = fallers[i];
      f.sway += f.swaySpeed;
      f.vx = Math.sin(f.sway) * f.swayAmt * 0.48;
      f.x += f.vx;
      f.y += f.vy;
      f.vy = Math.min(f.vy + 0.021, 2);
      f.rot += f.rotSpeed;
      if (f.y > H + 28) {
        fallers.splice(i, 1);
        continue;
      }
      if (f.y > H - 65) f.alpha = Math.max(0, (H - f.y) / 65);
      if (f.useLogo && drawLogo(f.x, f.y, f.size, f.rot, f.alpha)) continue;
      drawColorLeaf(f.x, f.y, f.size, f.rot, f.alpha, f.color);
    }
  }

  function drawConnectors(prog) {
    if (prog < 0.7 || !anchors.length) return;
    const fade = Math.min((prog - 0.7) / 0.3, 1);
    for (const a of anchors) {
      const tip = nearestTip(a.x, a.y, a.side);
      const bend = a.side === 'right' ? 0.12 : -0.12;
      const mx = (tip.x + a.x) / 2 + (tip.x - a.x) * bend;
      const my = (tip.y + a.y) / 2 - 12;
      ctx.beginPath();
      ctx.moveTo(tip.x, tip.y);
      ctx.quadraticCurveTo(mx, my, a.x, a.y);
      const rgb = hexToRgb(a.color);
      ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${0.35 * fade})`;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  function frame(ts) {
    if (!sectionVisible) {
      requestAnimationFrame(frame);
      return;
    }

    if (!t0) t0 = ts;
    const elapsed = ts - t0;

    ctx.clearRect(0, 0, W, H);

    const growDur = prefersReduced ? 0 : GROW_DURATION;
    const prog = prefersReduced ? 1 : Math.min(elapsed / growDur, 1);

    for (const b of branches) {
      const s = b.lv / (MAX_LV + 1);
      const e = (b.lv + 1) / (MAX_LV + 1);
      if (prog <= s) continue;
      const frac = Math.min((prog - s) / (e - s), 1);
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(b.x1 + (b.x2 - b.x1) * frac, b.y1 + (b.y2 - b.y1) * frac);
      ctx.strokeStyle = branchColor(b.lv);
      ctx.lineWidth = b.w;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    drawConnectors(prog);

    if (elapsed > CANOPY_START || prefersReduced) {
      const lp = prefersReduced ? 1 : Math.min((elapsed - CANOPY_START) / CANOPY_FADE, 1);
      const time = ts * 0.001;
      for (const leaf of canopy) {
        const lx = leaf.x + Math.sin(time * 0.62 + leaf.phase) * 1.6;
        const ly = leaf.y + Math.cos(time * 0.48 + leaf.phase) * 0.9;
        if (leaf.isLogo && drawLogo(lx, ly, leaf.logoSize, leaf.rot + time * 0.15, lp * 0.9)) continue;
        ctx.globalAlpha = lp * 0.82;
        ctx.beginPath();
        ctx.ellipse(lx, ly, leaf.r, leaf.r * 0.68, 0, 0, Math.PI * 2);
        ctx.fillStyle = leaf.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const canSpawn = !prefersReduced && prog >= 1 && (tips.length || canopy.length);
    if (canSpawn && elapsed - lastSpawn > SPAWN_INTERVAL) {
      spawnLeaf();
      lastSpawn = elapsed;
    }

    updateFallers();

    requestAnimationFrame(frame);
  }

  function onSectionShow() {
    sectionVisible = true;
    if (!t0) lastSpawn = -999;
    drawAnchors();
  }

  function onSectionHide() {
    sectionVisible = false;
    fallers = [];
  }

  readTheme();
  resize();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onSectionShow();
        else onSectionHide();
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.05 }
  );
  io.observe(section);

  if (section.getBoundingClientRect().top < window.innerHeight && section.getBoundingClientRect().bottom > 0) {
    onSectionShow();
  }

  window.addEventListener(
    'resize',
    () => {
      readTheme();
      resize();
    },
    { passive: true }
  );

  new ResizeObserver(() => resize()).observe(stage);

  requestAnimationFrame(frame);
})();
