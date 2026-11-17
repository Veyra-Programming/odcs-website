'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CopyIcon, CheckIcon, ZapIcon, DownloadIcon, BookOpenIcon, AwardIcon, SlidersIcon, StarIcon } from './Icons';

export default function Hero() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('windows');
  const [copied, setCopied] = useState(false);
  const [packetCount, setPacketCount] = useState(142);

  const commands = {
    windows: {
      cmd: 'irm https://odcs.in/install.ps1 | iex',
      desc: 'Automates Star CLI, Haven v2.0 Runtime, Python SDK & PATH registration'
    },
    ubuntu: {
      cmd: 'curl -fsSL https://odcs.in/install.sh | bash',
      desc: 'Installs Star native compiler, Haven continuous VM, and Linux systemd services'
    },
    python: {
      cmd: 'pip install odcs-sdk',
      desc: 'Python SDK for sub-16ms ZIL receipts & Merkle WAL integration'
    },
    star: {
      cmd: 'star run main.star',
      desc: 'Direct execution of Star sovereign declarative UI in browser WebAssembly'
    },
    haven: {
      cmd: 'python heaven/haven_lang.py run server.hvn',
      desc: 'Execute Haven Natural-English backend with continuous VM'
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Live Canvas Mesh Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 460;
    const h = rect.height || 240;

    const nodes = [
      { id: 'Alpha', label: 'Edge Node A', x: w * 0.22, y: h * 0.32, color: '#00f0ff', r: 7 },
      { id: 'Beta', label: 'Relay Node B', x: w * 0.78, y: h * 0.30, color: '#a855f7', r: 7 },
      { id: 'Gamma', label: 'Satellite Mesh', x: w * 0.30, y: h * 0.75, color: '#38bdf8', r: 6 },
      { id: 'Delta', label: 'Sovereign Hub', x: w * 0.72, y: h * 0.78, color: '#10b981', r: 8 }
    ];

    let packets = [];

    const interval = setInterval(() => {
      if (nodes.length >= 2) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        let toIdx = Math.floor(Math.random() * nodes.length);
        while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * nodes.length);
        packets.push({
          from: nodes[fromIdx],
          to: nodes[toIdx],
          progress: 0,
          speed: 0.015 + Math.random() * 0.015,
          color: nodes[fromIdx].color
        });
      }
    }, 850);

    const render = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);

      // Draw mesh links
      ctx.lineWidth = 1.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          grad.addColorStop(0, n1.color + '33');
          grad.addColorStop(1, n2.color + '33');
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Draw and animate packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }
        const px = p.from.x + (p.to.x - p.from.x) * p.progress;
        const py = p.from.y + (p.to.y - p.from.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - n.r - 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const triggerPulse = () => {
    setPacketCount(prev => prev + 1);
  };

  return (
    <section style={{ marginBottom: '4rem', position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(245, 158, 11, 0.15) 100%)',
              border: '1px solid #fbbf24',
              color: '#fbbf24',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <AwardIcon size={13} />
              <span>1ST MILESTONE COMPLETED · ODCS-2.0.0 GA</span>
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>ZERO CLOUD DEPENDENCIES</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3.1rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.8px',
            color: '#ffffff'
          }}>
            Digital experiences that endure without the network.
          </h1>

          <p style={{
            fontSize: '0.96rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '560px'
          }}>
            A sovereign, offline-first computing architecture eliminating connection fragility through
            local-first durability, asynchronous CRDT convergence, and single-frame cryptographic intent guarantees.
          </p>

          {/* Author & Maintainer Spotlight Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: '16px',
            padding: '0.35rem 0.85rem 0.35rem 0.5rem',
            boxShadow: '0 4px 15px rgba(0, 240, 255, 0.12)',
            width: 'fit-content',
            maxWidth: '100%',
            flexWrap: 'wrap',
            boxSizing: 'border-box'
          }}>
            <div style={{
              fontSize: '1.1rem',
              background: 'rgba(0, 240, 255, 0.15)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              👨‍💻
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0, flex: '1 1 auto' }}>
              <span style={{ fontWeight: 800, fontSize: '0.84rem', color: '#ffffff' }}>Anirudha Puthraya</span>
              <span style={{ fontSize: '0.66rem', color: '#00f0ff', fontFamily: 'var(--font-mono)', wordBreak: 'break-word', lineHeight: 1.3 }}>Standards Director, Author &amp; Maintainer · ODCS / Star / Haven</span>
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
              color: '#020617',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '0.15rem 0.45rem',
              borderRadius: '9999px',
              letterSpacing: '0.04em'
            }}>
              VERIFIED CREATOR
            </span>
          </div>

          {/* Action Buttons - Small, Sleek & Mobile Friendly */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
            <a href="#star-sovereign-ui" className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)', color: '#020617', fontWeight: 800 }}>
              <StarIcon size={13} />
              <span>Star UI Engine</span>
            </a>
            <a href="#milestone-1" className="btn btn-secondary btn-sm" style={{ borderColor: '#fbbf24', color: '#fbbf24', fontWeight: 800 }}>
              <AwardIcon size={13} />
              <span>Milestone 1 GA</span>
            </a>
            <a href="#3d-diagram" className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(0, 240, 255, 0.45)', color: '#00f0ff' }}>
              <span>🧊 3D Diagram</span>
            </a>
            <a href="#documents-hub" className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(168, 85, 247, 0.45)', color: '#c084fc' }}>
              <BookOpenIcon size={13} />
              <span>Public Docs</span>
            </a>
            <a href="#downloads" className="btn btn-secondary btn-sm">
              <DownloadIcon size={13} />
              <span>Vault</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Mesh Card & Quickstart Terminal */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.15)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Card Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#10b981' }}>
                LIVE TOPOLOGY MESH · 4 PARTITIONS
              </span>
            </div>
            <span style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: '#f43f5e',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px'
            }}>
              &lt; 0.15ms ZIL
            </span>
          </div>

          {/* Canvas Wrapper */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            background: '#030712',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          {/* Footer stats & pulse button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>NODES</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>4 PARTITIONS</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>MERKLE WAL</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>#{packetCount} BLOCKS</div>
            </div>
            <button 
              onClick={triggerPulse}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '9999px' }}
            >
              <ZapIcon size={13} />
              <span>Pulse Intent</span>
            </button>
          </div>

          {/* Quickstart Terminal Card */}
          <div style={{
            background: '#030712',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '0.35rem 0.65rem',
              overflowX: 'auto'
            }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {Object.keys(commands).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      background: activeTab === key ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                      border: activeTab === key ? '1px solid rgba(0, 240, 255, 0.35)' : 'none',
                      color: activeTab === key ? '#00f0ff' : 'var(--text-dim)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                1-CLICK RUN
              </span>
            </div>

            <div style={{
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              overflowX: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                <span style={{ color: '#a855f7', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>$</span>
                <code style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                  {commands[activeTab].cmd}
                </code>
              </div>
              <button
                onClick={() => copyToClipboard(commands[activeTab].cmd)}
                className="btn btn-secondary btn-xs"
                style={{
                  background: copied ? '#10b981' : 'rgba(0, 240, 255, 0.12)',
                  borderColor: copied ? '#10b981' : 'rgba(0, 240, 255, 0.35)',
                  color: copied ? '#020617' : '#00f0ff'
                }}
              >
                {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
