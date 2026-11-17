'use client';

import React from 'react';
import { GithubIcon, ExternalLinkIcon, ShieldIcon } from './Icons';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(3, 7, 18, 0.8)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem) 6rem',
      margin: '4rem 0 0 0',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Col 1: Brand & Creator Bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🌟</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>ODCS Foundation</span>
              <span style={{ fontSize: '0.68rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                BUILT &amp; MAINTAINED BY ANIRUDHA PUTHRAYA
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            The Open Digital Continuity Standard (ODCS-2.0.0) is a sovereign architectural standard ensuring zero intent loss, sub-16ms local authority, and partition-tolerant offline-first resilience.
          </p>

          {/* Creator Spotlight Box */}
          <div style={{
            background: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '12px',
            padding: '0.85rem 1rem'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
              👨‍💻 Creator &amp; Maintainer: <span style={{ color: '#00f0ff' }}>Anirudha Puthraya</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
              Author of ODCS-2.0.0, Star Programming Language &amp; Haven Language v2.0 Runtime.
            </div>
          </div>
        </div>

        {/* Col 2: Official Repositories */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
            Official GitHub &amp; Specs
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem' }}>
            <li>
              <a href="https://github.com/Veyra-Programming/star-haven" target="_blank" rel="noreferrer" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s' }}>
                🌟 Star &amp; Haven Dual Repo
              </a>
            </li>
            <li>
              <a href="https://github.com/Veyra-Programming/star-haven/tree/main/star" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                ⭐ Star Language Compiler
              </a>
            </li>
            <li>
              <a href="https://github.com/Veyra-Programming/star-haven/tree/main/haven" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                🕊️ Haven Continuity Runtime
              </a>
            </li>
            <li>
              <a href="https://github.com/Veyra-Programming/open-digital-continuity-standard-" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                🐙 ODCS Standard Specification
              </a>
            </li>
            <li>
              <a href="https://github.com/Veyra-Programming/star-haven/issues" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                📋 Issue Tracker &amp; Roadmap
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Specifications */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
            Standards &amp; RFC
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem' }}>
            <li><a href="#architecture" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>📐 ODCS-2.0.0 Specification</a></li>
            <li><a href="#layers" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🧱 4-Layer Hierarchy RFC</a></li>
            <li><a href="#haven" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🕊️ Haven Natural-English Grammar</a></li>
            <li><a href="#downloads" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>📦 20-OS Release Vault</a></li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.78rem',
        color: 'var(--text-dim)'
      }}>
        <div>
          Licensed under Apache 2.0 Open Standard License · All Rights Reserved © {new Date().getFullYear()}
          <a href="/admin/" style={{ color: 'rgba(255, 255, 255, 0.2)', textDecoration: 'none', marginLeft: '0.85rem', fontSize: '0.72rem' }} title="ODCS Governance & Editorial Console">Director Portal</a>
        </div>
        <div>
          Built with Star Language WASM Core &amp; Next.js SSR
        </div>
      </div>
    </footer>
  );
}
