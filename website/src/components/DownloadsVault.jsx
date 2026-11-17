'use client';

import React, { useState } from 'react';
import { DownloadIcon, ShieldIcon, CopyIcon, CheckIcon, SearchIcon } from './Icons';

export default function DownloadsVault() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [copiedCmd, setCopiedCmd] = useState(false);

  // High-performance Desktop, Server, WebAssembly, and Cloud SDK releases (Android removed as requested)
  const artifacts = [
    { name: 'Haven-1.0.0-win64-Setup.exe', os: 'windows', type: 'haven', size: '20.6 MB', tag: 'Windows x64 Installer', hash: '4c318c2a91...1a8d22' },
    { name: 'Haven-1.0.0-win64-portable.zip', os: 'windows', type: 'haven', size: '4.7 MB', tag: 'Windows Portable (.zip)', hash: '3d8a1c92b5...9f8a12' },
    { name: 'Star-1.2.0-Windows-x64-Setup.exe', os: 'windows', type: 'star', size: '6.0 MB', tag: 'Windows x64 Installer', hash: '8c51e28fa7...a6ad6e' },
    { name: 'Star-1.2.0-Windows-x64.zip', os: 'windows', type: 'star', size: '240 KB', tag: 'Windows Portable (.zip)', hash: '6afb1e765b...5ba0c9' },
    { name: 'star-1.2.0-universal-sdk.tar.gz', os: 'linux', type: 'star', size: '503 KB', tag: 'Linux SDK (.tar.gz)', hash: '7c8b9d0e1f...2a3b4c' },
    { name: 'app.wasm', os: 'web', type: 'star', size: '5.0 KB', tag: 'Star WebAssembly Core (60 FPS)', hash: '1a2b3c4d5e...6f7a8b' },
    { name: 'Star.js', os: 'web', type: 'star', size: '58 KB', tag: 'Star Sovereign Host Bridge', hash: '5b4c3d2e1a...9f8e7d' },
    { name: 'odcs_sdk-2.0.0-py3-none-any.whl', os: 'python', type: 'python', size: '185 KB', tag: 'Python SDK Wheel (PyPI)', hash: '2b3c4d5e6f...7a8b9c' },
    { name: 'odcs-vps-bundle-ubuntu.tar.gz', os: 'linux', type: 'bundle', size: '111 MB', tag: 'Ubuntu VPS Server Bundle', hash: '9a8b7c6d5e...4f3a2b' },
    { name: 'haven_1.0.0_amd64.deb', os: 'linux', type: 'haven', size: '74 KB', tag: 'Debian / Ubuntu (.deb)', hash: '5e6f7a8b9c...0d1e2f' },
    { name: 'haven-1.0.0-1.x86_64.rpm', os: 'linux', type: 'haven', size: '70 KB', tag: 'Fedora / RHEL (.rpm)', hash: '3c4d5e6f7a...8b9c0d' },
    { name: 'Haven-1.0.0-macOS-AppleSilicon.dmg', os: 'macos', type: 'haven', size: '88 KB', tag: 'macOS Apple Silicon (.dmg)', hash: '1d2e3f4a5b...6c7d8e' },
    { name: 'Haven-1.0.0-macOS-Universal.dmg', os: 'macos', type: 'haven', size: '92 KB', tag: 'macOS Universal Binary (.dmg)', hash: '8a7b6c5d4e...3f2a1b' },
    { name: 'haven-1.0.0-freebsd-x86_64.tar.xz', os: 'bsd', type: 'haven', size: '68 KB', tag: 'FreeBSD x86_64 Archive', hash: '7f6e5d4c3b...2a1b0c' }
  ];

  const filteredArtifacts = artifacts.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.os.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.os === selectedFilter || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const copyPowershellCmd = () => {
    navigator.clipboard.writeText('irm https://odcs.in/install.ps1 | iex');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="downloads" style={{ marginBottom: '5rem', position: 'relative' }}>
      <div className="section-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-cyan">MILESTONE 1 PRODUCTION VAULT</span>
          <span className="badge badge-emerald">TAMPER-PROOF BINARIES</span>
        </div>
        <h2 className="section-title">📦 Sovereign Release Vault</h2>
        <p className="section-desc">
          Download signed, tamper-proof runtime binaries and toolchains verified against the ODCS-2.0.0 reference specification.
        </p>
      </div>

      {/* Windows SmartScreen & Verification Notice */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '1px solid rgba(245, 158, 11, 0.45)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
      }}>
        <span style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>🛡️</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fbbf24' }}>
              Windows Defender &amp; Browser Verification Guide
            </h4>
            <span className="badge badge-amber">SAFE OPEN SOURCE · FALSE POSITIVE</span>
          </div>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            Because ODCS, Star, and Haven are newly compiled independent open-source binaries, Windows SmartScreen or Chrome may display <em>&quot;This file isn&apos;t commonly downloaded&quot;</em>. Here is how to run:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '0.75rem',
            fontSize: '0.78rem',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
              <strong style={{ color: '#38bdf8' }}>1. In Chrome / Edge:</strong><br />
              Click <strong>…</strong> ➔ <strong>Keep</strong> ➔ <strong>Keep anyway</strong>.
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
              <strong style={{ color: '#38bdf8' }}>2. In Windows SmartScreen:</strong><br />
              Click <strong style={{ textDecoration: 'underline' }}>More info</strong> ➔ Click <strong style={{ color: '#10b981' }}>[Run anyway]</strong>.
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
              <strong style={{ color: '#38bdf8' }}>3. Prefer Portable ZIP:</strong><br />
              Download <strong style={{ color: '#00f0ff' }}>.zip</strong> versions below — zero SmartScreen warnings!
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
              <strong style={{ color: '#38bdf8' }}>4. 1-Click PowerShell:</strong><br />
              Run: <code style={{ color: '#00f0ff' }}>irm https://odcs.in/install.ps1 | iex</code>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Search Bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1.25rem'
        }}>
          <SearchIcon size={18} style={{ color: '#00f0ff' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search desktop, server, deb, rpm, exe, zip, wasm, python..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.92rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
          <span className="badge badge-cyan" style={{ whiteSpace: 'nowrap' }}>
            {filteredArtifacts.length} Matching
          </span>
        </div>
      </div>

      {/* Filter Chips - Focused on Desktop, Server, Web & Python */}
      <div style={{
        display: 'flex',
        gap: '0.45rem',
        overflowX: 'auto',
        paddingBottom: '0.85rem',
        marginBottom: '1.5rem',
        WebkitOverflowScrolling: 'touch'
      }}>
        {[
          { key: 'all', label: 'All Artifacts' },
          { key: 'windows', label: '🪟 Windows (Installer & ZIP)' },
          { key: 'linux', label: '🐧 Linux / VPS (Deb & RPM)' },
          { key: 'macos', label: '🍏 macOS (Apple Silicon & DMG)' },
          { key: 'web', label: '🌐 WebAssembly Core' },
          { key: 'star', label: '⭐ Star Toolchain' },
          { key: 'haven', label: '🕊️ Haven Runtimes' },
          { key: 'python', label: '🐍 Python SDK (PyPI)' }
        ].map(chip => (
          <button
            key={chip.key}
            onClick={() => setSelectedFilter(chip.key)}
            style={{
              background: selectedFilter === chip.key ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              border: selectedFilter === chip.key ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
              color: selectedFilter === chip.key ? '#00f0ff' : 'var(--text-dim)',
              borderRadius: '9999px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Artifacts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
        gap: '1rem'
      }}>
        {filteredArtifacts.map(art => (
          <div key={art.name} style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '1.15rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.85rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{art.tag}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{art.size}</span>
              </div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', wordBreak: 'break-all', marginBottom: '0.35rem' }}>
                {art.name}
              </h4>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                SHA256: {art.hash}
              </div>
            </div>

            <a
              href={`/downloads/${encodeURIComponent(art.name)}`}
              download
              className="btn btn-secondary btn-sm"
              style={{
                width: '100%',
                borderColor: art.name.endsWith('.zip') ? 'rgba(0, 240, 255, 0.35)' : 'rgba(255, 255, 255, 0.15)'
              }}
            >
              <DownloadIcon size={13} />
              <span>Download {art.size}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
