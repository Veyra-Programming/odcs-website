'use client';

import React from 'react';

export default function MobileBottomDock() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="mobile-dock" style={{
      display: 'none',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '62px',
      background: 'rgba(10, 15, 30, 0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0, 240, 255, 0.35)',
      boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.15)',
      zIndex: 1050,
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 0.5rem',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)'
    }}>
      <button onClick={() => scrollTo('#milestone-1')} className="dock-btn" style={{ color: '#fbbf24' }}>
        <span style={{ fontSize: '1.2rem' }}>🏆</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>M1 GA</span>
      </button>

      <button onClick={() => scrollTo('#documents-hub')} className="dock-btn" style={{ color: '#00f0ff' }}>
        <span style={{ fontSize: '1.2rem' }}>📖</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>Docs</span>
      </button>

      <button onClick={() => scrollTo('#articles-hub')} className="dock-btn" style={{ color: '#38bdf8' }}>
        <span style={{ fontSize: '1.2rem' }}>📰</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>Articles</span>
      </button>

      <button onClick={() => scrollTo('#3d-diagram')} className="dock-btn" style={{ color: '#00f0ff' }}>
        <span style={{ fontSize: '1.2rem' }}>🧊</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>3D Model</span>
      </button>

      <button onClick={() => scrollTo('#downloads')} className="dock-btn" style={{ color: '#10b981' }}>
        <span style={{ fontSize: '1.2rem' }}>📦</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>Vault</span>
      </button>

      <style jsx>{`
        .dock-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          gap: 2px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          text-decoration: none;
          padding: 6px 8px;
          border-radius: 8px;
          flex: 1;
          max-width: 75px;
          transition: all 0.2s;
        }
        .dock-btn:active {
          transform: scale(0.95);
          background: rgba(255, 255, 255, 0.08);
        }
        @media (max-width: 900px) {
          .mobile-dock {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
