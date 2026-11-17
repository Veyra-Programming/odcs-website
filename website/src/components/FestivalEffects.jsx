'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function FestivalEffects() {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState('festival'); // 'festival', 'cosmic', 'cyber'
  const [showBanner, setShowBanner] = useState(true);
  const [particleCount, setParticleCount] = useState(0);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
      setIsAdminRoute(true);
    }
  }, []);

  useEffect(() => {
    // Check saved theme
    try {
      const saved = localStorage.getItem('odcs_theme');
      if (saved) {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'festival');
      }
    } catch (e) {}

    // Listen for custom theme change events
    const handleThemeChange = (e) => {
      if (e.detail) {
        setTheme(e.detail);
        document.documentElement.setAttribute('data-theme', e.detail);
      }
    };

    window.addEventListener('odcs_theme_changed', handleThemeChange);
    return () => window.removeEventListener('odcs_theme_changed', handleThemeChange);
  }, []);

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('odcs_theme', newTheme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', newTheme);
    window.dispatchEvent(new CustomEvent('odcs_theme_changed', { detail: newTheme }));
  };

  // Canvas particle engine: Fireworks, floating lanterns, and golden sparkles
  useEffect(() => {
    if (theme !== 'festival') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles array
    let particles = [];
    let lanterns = [];
    let fireworkRockets = [];

    // Initialize floating celebratory lanterns
    const lanternCount = 14;
    for (let i = 0; i < lanternCount; i++) {
      lanterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 14 + Math.random() * 16,
        speedY: 0.25 + Math.random() * 0.45,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        color: ['#fbbf24', '#f59e0b', '#f43f5e', '#a855f7', '#ffd700'][Math.floor(Math.random() * 5)],
        alpha: 0.6 + Math.random() * 0.35
      });
    }

    // Spawn a firework burst
    const spawnFirework = (targetX, targetY) => {
      const colors = ['#ffd700', '#fbbf24', '#f43f5e', '#00f0ff', '#10b981', '#c084fc', '#ffffff'];
      const burstColor = colors[Math.floor(Math.random() * colors.length)];
      const count = 35 + Math.floor(Math.random() * 25);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2);
        const speed = 1.5 + Math.random() * 4.5;
        particles.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: burstColor,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.016,
          size: 2 + Math.random() * 2.5
        });
      }
    };

    // Periodic fireworks interval
    const fwInterval = setInterval(() => {
      if (document.hidden) return;
      const x = canvas.width * 0.15 + Math.random() * (canvas.width * 0.7);
      const y = canvas.height * 0.08 + Math.random() * (canvas.height * 0.35);
      spawnFirework(x, y);
    }, 2800);

    // Initial festive burst
    setTimeout(() => {
      spawnFirework(canvas.width * 0.3, canvas.height * 0.2);
      spawnFirework(canvas.width * 0.7, canvas.height * 0.25);
    }, 500);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update floating lanterns
      for (let i = 0; i < lanterns.length; i++) {
        const l = lanterns[i];
        l.y -= l.speedY;
        l.swayOffset += l.swaySpeed;
        const currentX = l.x + Math.sin(l.swayOffset) * 20;

        if (l.y < -50) {
          l.y = canvas.height + 30;
          l.x = Math.random() * canvas.width;
        }

        // Lantern Outer Glow
        const grad = ctx.createRadialGradient(currentX, l.y, 2, currentX, l.y, l.size * 2);
        grad.addColorStop(0, l.color + 'aa');
        grad.addColorStop(0.5, l.color + '33');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(currentX, l.y, l.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Lantern Core (Warm lantern shape)
        ctx.save();
        ctx.fillStyle = '#fffbeb';
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.ellipse(currentX, l.y, l.size * 0.45, l.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Little lantern tassel
        ctx.strokeStyle = l.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(currentX, l.y + l.size * 0.6);
        ctx.lineTo(currentX, l.y + l.size * 0.95);
        ctx.stroke();
        ctx.restore();
      }

      // Render & update firework particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(fwInterval);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  if (isAdminRoute) return null;

  return (
    <>
      {/* Background Interactive Festive Canvas (Only active in festival theme) */}
      {theme === 'festival' && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.85
          }}
        />
      )}

      {/* Grand Festival Milestone 1 Celebration Top Banner */}
      {showBanner && (
        <div className="festival-banner-wrap" style={{
          position: 'relative',
          zIndex: 1000,
          background: theme === 'festival' 
            ? 'linear-gradient(90deg, #7c2d12 0%, #b45309 25%, #4c1d95 50%, #b45309 75%, #7c2d12 100%)'
            : 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmerBanner 8s ease infinite',
          borderBottom: '1px solid rgba(251, 191, 36, 0.4)',
          boxShadow: '0 4px 25px rgba(251, 191, 36, 0.25)',
          padding: '0.45rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: '#ffffff',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          {/* Left Celebration Announcement */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: '1 1 auto' }}>
            <span style={{ fontSize: '1.25rem', animation: 'sparkleSpin 3s linear infinite', flexShrink: 0 }}>🪔</span>
            <div style={{ minWidth: 0, wordBreak: 'break-word' }}>
              <strong style={{ color: '#ffd700', letterSpacing: '0.02em', fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)' }}>
                🎉 FESTIVAL CELEBRATION · 1ST MILESTONE COMPLETED &amp; DELIVERED!
              </strong>
              <span style={{ color: 'rgba(255, 255, 255, 0.85)', marginLeft: '0.5rem' }} className="festival-banner-sub">
                ODCS-2.0.0 GA Sovereign Standard, Star WASM Core &amp; Haven Language v2.0 Formally Sealed.
              </span>
            </div>
          </div>

          {/* Right Theme Selector Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 700 }}>THEME:</span>
            
            <button
              onClick={() => switchTheme('festival')}
              style={{
                background: theme === 'festival' ? '#ffd700' : 'rgba(0, 0, 0, 0.4)',
                color: theme === 'festival' ? '#000000' : '#ffd700',
                border: '1px solid #ffd700',
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>🎆</span>
              <span>Festival</span>
            </button>

            <button
              onClick={() => switchTheme('cosmic')}
              style={{
                background: theme === 'cosmic' ? '#00f0ff' : 'rgba(0, 0, 0, 0.4)',
                color: theme === 'cosmic' ? '#000000' : '#00f0ff',
                border: '1px solid #00f0ff',
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>🌌</span>
              <span>Cosmic</span>
            </button>

            <button
              onClick={() => switchTheme('cyber')}
              style={{
                background: theme === 'cyber' ? '#10b981' : 'rgba(0, 0, 0, 0.4)',
                color: theme === 'cyber' ? '#000000' : '#10b981',
                border: '1px solid #10b981',
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>⚡</span>
              <span>Cyber</span>
            </button>

            <button
              onClick={() => setShowBanner(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                fontSize: '1rem',
                marginLeft: '0.35rem',
                padding: '0 0.35rem'
              }}
              title="Dismiss announcement banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes shimmerBanner {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sparkleSpin {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @media (max-width: 820px) {
          .festival-banner-sub {
            display: none !important;
          }
        }

        /* Festival Theme Overrides */
        [data-theme="festival"] {
          --primary: #ffd700;
          --secondary: #f43f5e;
          --accent: #fbbf24;
          --border-glow: rgba(251, 191, 36, 0.45);
        }
        [data-theme="festival"] .section-title {
          background: linear-gradient(135deg, #ffffff 30%, #ffd700 70%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="festival"] .glow-orb-1 {
          background: radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, transparent 70%) !important;
        }
        [data-theme="festival"] .glow-orb-2 {
          background: radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%) !important;
        }

        /* Cyber Matrix Theme Overrides */
        [data-theme="cyber"] {
          --primary: #10b981;
          --secondary: #00f0ff;
          --accent: #34d399;
          --border-glow: rgba(16, 185, 129, 0.5);
        }
        [data-theme="cyber"] .glow-orb-1 {
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%) !important;
        }
      `}</style>
    </>
  );
}
