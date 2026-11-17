'use client';

import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, GithubIcon, AwardIcon, BookOpenIcon, FileTextIcon, SlidersIcon, LayersIcon } from './Icons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [latency, setLatency] = useState(0.04);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('festival');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Read initial theme
      const saved = localStorage.getItem('odcs_theme');
      if (saved) setCurrentTheme(saved);

      const handleThemeChange = (e) => {
        if (e.detail) setCurrentTheme(e.detail);
      };
      window.addEventListener('odcs_theme_changed', handleThemeChange);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('odcs_theme_changed', handleThemeChange);
      };
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-locked');
    } else {
      document.body.classList.remove('menu-locked');
    }
    return () => {
      document.body.classList.remove('menu-locked');
    };
  }, [menuOpen]);

  // Subtle telemetry jitter simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => +(0.03 + Math.random() * 0.03).toFixed(2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const toggleThemeNext = () => {
    const next = currentTheme === 'festival' ? 'cosmic' : currentTheme === 'cosmic' ? 'cyber' : 'festival';
    setCurrentTheme(next);
    localStorage.setItem('odcs_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new CustomEvent('odcs_theme_changed', { detail: next }));
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {menuOpen && (
        <div 
          onClick={closeMenu}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 998,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* Floating Modern Capsule Header */}
      <header className="main-header" style={{
        position: 'sticky',
        top: '12px',
        zIndex: 999,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto 2rem auto',
        padding: '0 1rem',
        boxSizing: 'border-box'
      }}>
        <div className="navbar-capsule" style={{
          background: 'rgba(10, 15, 30, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 240, 255, 0.12)',
          padding: '0.65rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          {/* Main Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            width: '100%'
          }}>
            {/* Brand & Creator Attribution */}
            <a href="#" className="brand-link" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              color: '#fff',
              minWidth: 0,
              flex: '1 1 auto'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(0, 240, 255, 0.2) 100%)',
                border: '1.5px solid rgba(251, 191, 36, 0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.15rem',
                boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)',
                flexShrink: 0
              }}>
                🌟
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span className="brand-title" style={{ fontSize: '1.08rem', fontWeight: 800, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
                  ODCS Foundation
                </span>
                <span className="brand-subtitle" style={{
                  fontSize: '0.62rem',
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '220px'
                }}>
                  ANIRUDHA PUTHRAYA · STANDARDS DIRECTOR
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="desktop-nav" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontWeight: 700
            }}>
              <a href="#star-sovereign-ui" className="nav-link" style={{ color: '#00f0ff', fontWeight: 800 }}>⭐ Star UI</a>
              <a href="#milestone-1" className="nav-link" style={{ color: '#fbbf24' }}>🏆 Milestone 1</a>
              <a href="#3d-diagram" className="nav-link">🧊 3D Diagram</a>
              <a href="#documents-hub" className="nav-link">📖 Full Docs</a>
              <a href="#articles-hub" className="nav-link">📰 Articles</a>
              <a href="#sovereign-engines" className="nav-link">⚡ Dual Engines</a>
              <a href="#downloads" className="nav-link">📦 Vault</a>
            </nav>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
              {/* Theme Toggle Button */}
              <button
                onClick={toggleThemeNext}
                className="btn btn-secondary btn-sm"
                style={{
                  borderRadius: '9999px',
                  padding: '0.25rem 0.65rem'
                }}
                title="Toggle Theme: Festival / Cosmic / Cyber"
              >
                <span>{currentTheme === 'festival' ? '🎆' : currentTheme === 'cosmic' ? '🌌' : '⚡'}</span>
                <span className="theme-btn-text" style={{ textTransform: 'capitalize' }}>{currentTheme}</span>
              </button>

              {/* Dynamic Offline / Telemetry Status Pill */}
              <div className="telemetry-pill" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: isOnline ? 'rgba(16, 185, 129, 0.12)' : 'rgba(251, 191, 36, 0.15)',
                border: isOnline ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(251, 191, 36, 0.45)',
                borderRadius: '9999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: isOnline ? '#10b981' : '#fbbf24'
              }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: isOnline ? '#10b981' : '#fbbf24',
                  boxShadow: isOnline ? '0 0 8px #10b981' : '0 0 8px #fbbf24',
                  display: 'inline-block'
                }} />
                <span className="telemetry-text">
                  {isOnline ? `ONLINE (${latency}ms)` : 'OFFLINE (PWA CACHED)'}
                </span>
              </div>

              {/* GitHub Button */}
              <a 
                href="https://github.com/Veyra-Programming/star-haven" 
                target="_blank" 
                rel="noreferrer"
                className="github-btn-header"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '0.38rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="mobile-hamburger-btn"
                aria-label="Toggle Navigation Menu"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  height: '34px',
                  padding: '0 0.85rem',
                  background: menuOpen ? 'rgba(244, 63, 94, 0.2)' : 'linear-gradient(135deg, rgba(0, 240, 255, 0.16) 0%, rgba(168, 85, 247, 0.16) 100%)',
                  border: menuOpen ? '1.5px solid #f43f5e' : '1.5px solid rgba(0, 240, 255, 0.55)',
                  borderRadius: '9999px',
                  color: menuOpen ? '#f43f5e' : '#00f0ff',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {menuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
                <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Drawer */}
          {menuOpen && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              marginTop: '0.85rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: 'calc(80vh - 70px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}>
              {/* Quick Action Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem'
              }}>
                <a
                  href="#milestone-1"
                  onClick={closeMenu}
                  style={{
                    background: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    padding: '0.65rem',
                    color: '#fbbf24',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}
                >
                  🏆 Milestone 1 GA
                </a>
                <a
                  href="#3d-diagram"
                  onClick={closeMenu}
                  style={{
                    background: 'rgba(0, 240, 255, 0.15)',
                    border: '1px solid #00f0ff',
                    borderRadius: '8px',
                    padding: '0.65rem',
                    color: '#00f0ff',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}
                >
                  🧊 3D Diagram
                </a>
              </div>

              {/* Links in drawer */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem' }}>
                {[
                  { hash: '#star-sovereign-ui', label: '⭐ Full Star UI' },
                  { hash: '#milestone-1', label: '🏆 1st Milestone' },
                  { hash: '#3d-diagram', label: '🧊 Real 3D Diagram' },
                  { hash: '#documents-hub', label: '📖 Full Public Docs' },
                  { hash: '#articles-hub', label: '📰 Architectural Articles' },
                  { hash: '#model-sandbox', label: '🏛️ Model Sandbox' },
                  { hash: '#sovereign-engines', label: '⚡ Dual Engines' },
                  { hash: '#crdt-mesh', label: '🌐 CRDT Mesh' },
                  { hash: '#english-studio', label: '🗣️ English Studio' },
                  { hash: '#benchmarks', label: '📊 Benchmarks' },
                  { hash: '#layers', label: '🧱 4 Layers' },
                  { hash: '#downloads', label: '📦 Release Vault' },
                ].map(item => (
                  <a
                    key={item.hash}
                    href={item.hash}
                    onClick={closeMenu}
                    style={{
                      display: 'block',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 700
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <style jsx>{`
        .nav-link {
          color: var(--text-dim);
          text-decoration: none;
          padding: 0.35rem 0.45rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          white-space: nowrap;
          font-size: 0.78rem;
        }
        .nav-link:hover {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.08);
        }
        @media (max-width: 1040px) {
          .desktop-nav {
            display: none !important;
          }
          .github-btn-header {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: inline-flex !important;
          }
          .telemetry-text {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .main-header {
            padding: 0 0.5rem !important;
            margin-bottom: 1.25rem !important;
          }
          .navbar-capsule {
            padding: 0.5rem 0.85rem !important;
            border-radius: 14px !important;
          }
          .brand-title {
            font-size: 0.98rem !important;
          }
          .brand-subtitle {
            max-width: 140px !important;
            font-size: 0.56rem !important;
          }
        }
        @media (max-width: 520px) {
          .main-header {
            padding: 0 0.35rem !important;
          }
          .navbar-capsule {
            padding: 0.4rem 0.65rem !important;
          }
          .brand-subtitle {
            display: none !important;
          }
          .telemetry-pill {
            display: none !important;
          }
          .theme-btn-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
