/**
 * ==============================================================================
 * 🌟 ODCS Official Portal — Pure Sovereign Runtime Architecture
 * Zero Next.js • Zero React • Zero NPM Bloat • 100% Native Performance
 * Powers the First Working UI for the Star Programming Language (v1.2.0 GA)
 * Architect: Anirudha Puthraya · Veyra-Programming
 * ==============================================================================
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. MOBILE MENU & NAVIGATION SYSTEM
  // ============================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const hamburgerLabel = document.getElementById('hamburgerLabel');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    hamburgerBtn.classList.add('active');
    document.body.classList.add('menu-locked');
    hamburgerIcon.textContent = '✕';
    hamburgerLabel.textContent = 'CLOSE';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    document.body.classList.remove('menu-locked');
    hamburgerIcon.textContent = '☰';
    hamburgerLabel.textContent = 'MENU';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileMenu() {
    if (mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close menu on navigation link clicks inside drawer
  document.querySelectorAll('.mobile-drawer-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ============================================================================
  // 2. AMBIENT TELEMETRY PROBE JITTER SIMULATOR
  // ============================================================================
  const telemetryDisplay = document.getElementById('telemetryLatency');
  if (telemetryDisplay) {
    setInterval(() => {
      const jitter = (0.03 + Math.random() * 0.03).toFixed(2);
      telemetryDisplay.textContent = `${jitter}ms`;
    }, 2800);
  }

  // ============================================================================
  // 3. FIRST WORKING UI FOR STAR PROGRAMMING LANGUAGE (v1.2.0 GA)
  // ============================================================================
  const starState = {
    operatingMode: 'OPTIMAL_ONLINE',
    rttLatency: 0.04,
    stagedReceipts: 142,
    crdtCounter: 512,
    activeTab: 'live_ui',
    fps: 60
  };

  const receiptsFeed = [
    {
      id: 'zil_01933a7e-128f-7f51-b924-d2e67a421b8f',
      action: 'INIT_SOVEREIGN_NODE',
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      time: '0.08ms',
      block: 1048
    },
    {
      id: 'zil_01933a7f-3b4c-7c22-8df1-4a819c5b201a',
      action: 'STAGE_OFFLINE_INTENT',
      hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      time: '0.12ms',
      block: 1049
    }
  ];

  // 60 FPS Animation Loop
  let frameCount = 0;
  let lastFpsTime = performance.now();
  const fpsBadge = document.getElementById('starFpsBadge');

  function monitorFps(now) {
    frameCount++;
    if (now - lastFpsTime >= 1000) {
      starState.fps = frameCount;
      if (fpsBadge) {
        fpsBadge.textContent = `${frameCount} FPS (${(1000 / (frameCount || 60)).toFixed(1)}ms)`;
      }
      frameCount = 0;
      lastFpsTime = now;
    }
    requestAnimationFrame(monitorFps);
  }
  requestAnimationFrame(monitorFps);

  // Update UI DOM elements from Star State
  function renderStarState() {
    const modeEl = document.getElementById('starModeVal');
    const rttEl = document.getElementById('starRttVal');
    const receiptsEl = document.getElementById('starReceiptsVal');
    const crdtEl = document.getElementById('starCrdtVal');

    if (modeEl) {
      modeEl.textContent = starState.operatingMode;
      modeEl.style.color = starState.operatingMode === 'OPTIMAL_ONLINE' ? '#10b981' :
                           starState.operatingMode === 'DEGRADED_JITTER' ? '#fbbf24' : '#f43f5e';
    }

    if (rttEl) {
      rttEl.textContent = starState.rttLatency === Infinity ? '∞ (CARRIER CUT)' : `${starState.rttLatency}ms`;
    }

    if (receiptsEl) {
      receiptsEl.textContent = `#${starState.stagedReceipts} BLOCKS`;
    }

    if (crdtEl) {
      crdtEl.textContent = `${starState.crdtCounter} REPLICAS`;
    }

    renderWalFeed();
  }

  // Render WAL List
  function renderWalFeed() {
    const listEl = document.getElementById('walFeedList');
    if (!listEl) return;

    listEl.innerHTML = receiptsFeed.map(rcpt => `
      <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 10px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <span style="background: #00f0ff; color: #000; font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.4rem; border-radius: 4px;">
              BLOCK #${rcpt.block}
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.78rem; font-weight: 800; color: #fff;">
              ${rcpt.action}
            </span>
            <span style="font-size: 0.68rem; color: #10b981; font-family: var(--font-mono);">
              COMMITTED (${rcpt.time})
            </span>
          </div>
          <div style="font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-mono);">
            ID: ${rcpt.id}
          </div>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.68rem; color: #c084fc; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); padding: 0.25rem 0.6rem; border-radius: 6px;">
          SHA: ${rcpt.hash.substring(0, 24)}...
        </div>
      </div>
    `).join('');
  }

  // Action: Mint Layer 4 ZIL Receipt
  window.mintStarZilReceipt = function () {
    const hex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const uuid = `zil_01933a80-${Math.random().toString(36).substring(2, 6)}-7f11-a8b2-${Math.random().toString(36).substring(2, 14)}`;
    const nextBlock = receiptsFeed[0] ? receiptsFeed[0].block + 1 : 1050;

    receiptsFeed.unshift({
      id: uuid,
      action: 'MINT_ZIL_HARDWARE_RECEIPT',
      hash: hex,
      time: (0.08 + Math.random() * 0.05).toFixed(2) + 'ms',
      block: nextBlock
    });

    if (receiptsFeed.length > 8) receiptsFeed.pop();
    starState.stagedReceipts++;
    renderStarState();

    // Pulse notification
    showNotification('✓ Minted Layer 4 Zero Intent Loss Receipt in < 0.15ms!');
  };

  // Action: Simulate Satellite Jitter
  window.simulateStarJitter = function () {
    starState.operatingMode = 'DEGRADED_JITTER';
    starState.rttLatency = 480.25;
    renderStarState();
    showNotification('🛰️ Telemetry Mode shifted: DEGRADED_JITTER (480ms)');
  };

  // Action: Cut Carrier Link
  window.triggerStarBlackout = function () {
    starState.operatingMode = 'SEVERED_OFFLINE';
    starState.rttLatency = Infinity;
    renderStarState();
    showNotification('🛑 Carrier Cut: 100% Local Sovereign NVMe Authority Active');
  };

  // Action: Converge CRDT Mesh
  window.convergeStarMesh = function () {
    starState.operatingMode = 'OPTIMAL_ONLINE';
    starState.rttLatency = 0.04;
    starState.crdtCounter += 4;
    renderStarState();
    showNotification('🔄 CRDT Mesh Converged: Strong Eventual Consistency Achieved');
  };

  // Star Tabs Switcher
  window.setStarTab = function (tabName) {
    document.querySelectorAll('.star-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.star-tab-panel').forEach(panel => panel.style.display = 'none');

    const activeBtn = document.getElementById(`tabBtn_${tabName}`);
    const activePanel = document.getElementById(`tabPanel_${tabName}`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) activePanel.style.display = 'block';
  };

  // Copy Star Code
  window.copyStarSource = function () {
    const code = document.getElementById('starSourceCode')?.innerText || '';
    navigator.clipboard.writeText(code).then(() => {
      const copyBtn = document.getElementById('copyStarBtn');
      if (copyBtn) copyBtn.textContent = '✓ COPIED!';
      setTimeout(() => {
        if (copyBtn) copyBtn.textContent = 'COPY STAR CODE';
      }, 2000);
      showNotification('Copied main.star source to clipboard!');
    });
  };

  // Toast Notification System
  function showNotification(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(10, 15, 30, 0.95);
      border: 1px solid #00f0ff;
      color: #00f0ff;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.3);
      z-index: 10000;
      transition: opacity 0.3s ease, transform 0.3s ease;
      transform: translateY(10px);
      opacity: 0;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ============================================================================
  // 4. INTERACTIVE 3D TOPOLOGY CANVAS
  // ============================================================================
  const canvas = document.getElementById('topologyCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let angle = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const layers = [
      { name: 'Layer 4: Zero Intent Loss (Star UI)', color: '#fbbf24', y: 40 },
      { name: 'Layer 3: Telemetry & Sensing Probes', color: '#00f0ff', y: 90 },
      { name: 'Layer 2: CRDT Consensus & Mesh Sync', color: '#10b981', y: 140 },
      { name: 'Layer 1: Cryptographic Durability & WAL', color: '#a855f7', y: 190 }
    ];

    function drawTopology() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      angle += 0.015;

      const cx = rect.width / 2;

      layers.forEach((l, i) => {
        const offset = Math.sin(angle + i * 0.8) * 15;
        const width = rect.width * 0.75;
        const x = cx - width / 2 + offset;
        const y = l.y;

        // Draw Layer Slab
        ctx.fillStyle = l.color + '1a';
        ctx.strokeStyle = l.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x, y, width, 34, 8);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 12px ' + getComputedStyle(document.body).fontFamily;
        ctx.fillText(l.name, x + 16, y + 21);

        // Right Tag
        ctx.fillStyle = l.color;
        ctx.font = '800 10px monospace';
        ctx.fillText('ODCS-2.0.0', x + width - 85, y + 21);
      });

      requestAnimationFrame(drawTopology);
    }
    requestAnimationFrame(drawTopology);
  }

  // Initialize Initial State
  renderStarState();

})();
