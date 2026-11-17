'use client';

import React from 'react';
import { StarIcon, DoveIcon, DownloadIcon, GithubIcon } from './Icons';

export default function DualEngines() {
  return (
    <section id="sovereign-engines" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag">Dual-Sovereign Technology Foundation</span>
        <h2 className="section-title">⭐ Star Language &amp; 🕊️ Haven Language Dual-Engine Architecture</h2>
        <p className="section-desc">
          The ODCS Foundation eliminated fragile legacy stacks (Node.js/React &amp; Python/Django). This entire website and computing model is powered exclusively by two purpose-built sovereign continuity languages.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1.5rem'
      }}>
        {/* Star Language Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(1.15rem, 2.5vw, 1.85rem)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 240, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1.25rem',
          minWidth: 0
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1.5px solid rgba(0, 240, 255, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}>
                ⭐
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Star Programming Language</h3>
                <div style={{ fontSize: '0.8rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>v1.2.0 GA · WebAssembly Core</div>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              The frontend UI is authored in pure Star declarative syntax and compiled to <code style={{ color: '#00f0ff' }}>app.wasm</code>. Delivers single-frame 60 FPS reactive updates with zero virtual-DOM overhead, zero React, and zero npm dependencies.
            </p>

            <div style={{
              background: '#010307',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#38bdf8',
              marginBottom: '1.25rem',
              lineHeight: 1.5
            }}>
              # Pure Star Declarative UI (main.star)<br />
              use UI<br /><br />
              app ODCSContinuityPortal<br />
              &nbsp;&nbsp;UI.title(&quot;🏛️ ODCS Foundation&quot;, 1, &#123; &quot;fg&quot;: &quot;#00f0ff&quot; &#125;)<br />
              &nbsp;&nbsp;UI.button(&quot;▶ Mint Layer 4 ZIL Receipt&quot;, function()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;show &quot;Minted Zero Intent Loss Cryptographic Receipt&quot;<br />
              &nbsp;&nbsp;end)<br />
              end
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff' }} />
                <span>Compiles to native WebAssembly bytecode (4.9 KB binary)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff' }} />
                <span>Single-frame 60Hz local rendering (&lt; 16.6ms frame budget)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff' }} />
                <span>Universal UI for Web, Windows, Linux, Android &amp; Flutter</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00f0ff' }} />
                <span>100% Offline-First execution in the browser</span>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <a href="/downloads/Star-1.2.0-Windows-x64-Setup.exe" download className="btn btn-primary" style={{ width: '100%' }}>
              <DownloadIcon size={16} />
              <span>Download Star Windows (.exe)</span>
            </a>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <a href="/downloads/Star-1.2.0-Windows-x64.zip" download className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
                <span>📦 Portable (.zip)</span>
              </a>
              <a href="/downloads/star-1.2.0-universal-sdk.tar.gz" download className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
                <span>🐧 Linux SDK</span>
              </a>
            </div>
            <a href="https://github.com/Veyra-Programming/star-haven/tree/main/star" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
              <GithubIcon size={16} />
              <span>Star GitHub Repository</span>
            </a>
          </div>
        </div>

        {/* Haven Language Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(1.15rem, 2.5vw, 1.85rem)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(168, 85, 247, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1.25rem',
          minWidth: 0
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1.5px solid rgba(168, 85, 247, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}>
                🕊️
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Haven (Heaven) Language</h3>
                <div style={{ fontSize: '0.8rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>v2.0 · Natural-English Continuity Engine</div>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              The continuity backend is authored in Haven Natural-English grammar. Features native ODCS Layer 1-4 primitives: RFC 8785 Canonical JSON, SHA-256 Merkle WAL trees, PN-Counter CRDT mesh convergence, and sub-16ms ZIL receipts.
            </p>

            <div style={{
              background: '#010307',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#c084fc',
              marginBottom: '1.25rem',
              lineHeight: 1.5
            }}>
              // Haven Natural-English Grammar (odcs_backend.hvn)<br />
              durable record EmergencyEncounter:<br />
              &nbsp;&nbsp;patient_id: String<br />
              &nbsp;&nbsp;heart_rate: Integer<br /><br />
              set encounter to EmergencyEncounter(&quot;PT-901&quot;, 78)<br />
              checkpoint encounter as &quot;triage_vital&quot; into hospital_ledger<br />
              give back &quot;Sealed with Zero Intent Loss!&quot;
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7' }} />
                <span>Human-readable syntax: set, remember, whenever, durable record</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7' }} />
                <span>Native ODCS Layer 1-4 continuity ledger &amp; CRDT mesh sync</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7' }} />
                <span>Sub-16ms hardware-sealed cryptographic receipt minting</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7' }} />
                <span>Zero external dependencies — runs directly on Ubuntu VPS bare-metal</span>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <a href="/downloads/Haven-1.0.0-win64-Setup.exe" download className="btn btn-violet" style={{ width: '100%' }}>
              <DownloadIcon size={16} />
              <span>Download Haven Windows (.exe)</span>
            </a>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <a href="/downloads/Haven-1.0.0-win64-portable.zip" download className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
                <span>📦 Portable (.zip)</span>
              </a>
              <a href="/downloads/odcs-vps-bundle-ubuntu.tar.gz" download className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
                <span>🐧 Ubuntu VPS Bundle</span>
              </a>
            </div>
            <a href="https://github.com/Veyra-Programming/star-haven/tree/main/haven" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
              <DoveIcon size={16} />
              <span>Haven GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
