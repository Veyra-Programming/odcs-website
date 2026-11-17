'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ZapIcon, ActivityIcon, ShieldIcon, WifiOffIcon } from './Icons';

export default function ConsoleHUD() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('OPTIMAL_ONLINE');
  const [latency, setLatency] = useState(0.04);
  const [targetLatency, setTargetLatency] = useState(0.04);
  const [walBlocks, setWalBlocks] = useState(142);
  const [walQueue, setWalQueue] = useState(0);
  const [crdtVector, setCrdtVector] = useState(512);
  const [logs, setLogs] = useState([
    { id: 1, time: '00:00:01', text: '✓ Star UI Engine (v1.2.0 GA) initialized with WebAssembly Target (app.wasm).', color: '#10b981' },
    { id: 2, time: '00:00:02', text: '✓ Layer 1 Local Durability: Connected to ODCS IndexedDB Vault (Block #142).', color: '#00f0ff' },
    { id: 3, time: '00:00:03', text: '✓ Layer 3 Network Probe: Optimal socket carrier connected (RTT 0.04ms).', color: '#38bdf8' }
  ]);

  const addLog = (text, color = '#38bdf8') => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setLogs(prev => [...prev.slice(-25), { id: Date.now() + Math.random(), time, text, color }]);
  };

  // Oscilloscope Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let waveData = new Array(80).fill(15);
    let phase = 0;
    let currLat = 0.04;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      currLat += (targetLatency - currLat) * 0.1;
      setLatency(+currLat.toFixed(2));

      phase += 0.15;
      let val;
      if (mode === 'OPTIMAL_ONLINE') {
        val = 20 + Math.sin(phase) * 6 + (Math.random() - 0.5) * 4;
      } else if (mode === 'DEGRADED_JITTER') {
        val = 50 + Math.sin(phase * 1.8) * 28 + (Math.random() - 0.5) * 22;
      } else {
        val = 5; // Flatline
      }
      waveData.push(val);
      waveData.shift();

      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
      ctx.moveTo(0, h / 4); ctx.lineTo(w, h / 4);
      ctx.moveTo(0, 3 * h / 4); ctx.lineTo(w, 3 * h / 4);
      ctx.stroke();

      // Trace
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      if (mode === 'OPTIMAL_ONLINE') {
        ctx.strokeStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
      } else if (mode === 'DEGRADED_JITTER') {
        ctx.strokeStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
      } else {
        ctx.strokeStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
      }

      ctx.beginPath();
      for (let i = 0; i < waveData.length; i++) {
        const x = (i / (waveData.length - 1)) * w;
        const y = h - (waveData[i] / 100) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mode, targetLatency]);

  const mintZil = () => {
    const hash = '0x' + Math.random().toString(16).slice(2, 10);
    setWalBlocks(prev => prev + 1);
    addLog(`⚡ Layer 4 ZIL Receipt Minted (${hash}) in 0.12ms. Checkpointed to Merkle Block #${walBlocks + 1}.`, '#10b981');
  };

  const simulateJitter = () => {
    setMode('DEGRADED_JITTER');
    setTargetLatency(480.00);
    addLog('🛰️ Layer 3 Carrier Shift: High-orbit cross-link degraded. Active RTT 480ms. Seamlessly buffering intents.', '#fbbf24');
  };

  const simulateBlackout = () => {
    setMode('SEVERED_OFFLINE');
    setTargetLatency(0.00);
    setWalQueue(prev => prev + 2);
    addLog('🛑 Network Interface: Disruption detected. Socket severed. ZERO Intent Loss engaged. Local queue active.', '#f43f5e');
  };

  const simulateReconnect = () => {
    setMode('OPTIMAL_ONLINE');
    setTargetLatency(0.04);
    setCrdtVector(prev => prev + walQueue);
    setWalQueue(0);
    addLog('🔄 Carrier Restored: Telemetry converged. Flushed local WAL outbox. CRDT Vector synchronized.', '#10b981');
  };

  return (
    <section id="console" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag">Interactive Simulation Console</span>
        <h2 className="section-title">⚡ Real-Time Digital Continuity Engine</h2>
        <p className="section-desc">
          Test real-time partition tolerance, trigger simulated orbital link blackouts, observe live RTT jitter waveforms, and verify deterministic CRDT convergence.
        </p>
      </div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(0, 240, 255, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1rem, 2.5vw, 1.75rem)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
      }}>
        {/* HUD Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '0.85rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ background: '#010307', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Carrier Link Mode</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: mode === 'OPTIMAL_ONLINE' ? '#00f0ff' : mode === 'DEGRADED_JITTER' ? '#fbbf24' : '#f43f5e', fontFamily: 'var(--font-mono)' }}>
              {mode}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RTT Latency: {latency} ms</div>
          </div>

          <div style={{ background: '#010307', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>IndexedDB Merkle Blocks</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>#{walBlocks}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>RFC 8785 Chain Verified</div>
          </div>

          <div style={{ background: '#010307', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Local WAL Outbox</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{walQueue} Pending</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Auto-drain synchronized</div>
          </div>

          <div style={{ background: '#010307', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>CRDT Mesh Vector</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)' }}>{crdtVector} Converged</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Add-Wins Strong Consistency</div>
          </div>
        </div>

        {/* Live Oscilloscope */}
        <div style={{
          background: '#010307',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.45rem' }}>
            <span>LIVE LATENCY &amp; JITTER OSCILLOSCOPE (ODCS-REL PROBE)</span>
            <span style={{ color: mode === 'OPTIMAL_ONLINE' ? '#00f0ff' : mode === 'DEGRADED_JITTER' ? '#fbbf24' : '#f43f5e' }}>
              MODE: {mode} · 60Hz
            </span>
          </div>
          <canvas ref={canvasRef} width={800} height={90} style={{ width: '100%', height: '90px', display: 'block' }} />
        </div>

        {/* Controls - Compact & Small Buttons */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <button onClick={mintZil} className="btn btn-primary btn-sm" style={{ flex: '1 1 auto' }}>
            <ZapIcon size={14} />
            <span>▶ Mint ZIL Receipt</span>
          </button>
          <button onClick={simulateJitter} className="btn btn-secondary btn-sm" style={{ flex: '1 1 auto', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}>
            <span>🛰️ 480ms Jitter</span>
          </button>
          <button onClick={simulateBlackout} className="btn btn-secondary btn-sm" style={{ flex: '1 1 auto', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
            <span>🛑 Sever Link</span>
          </button>
          <button onClick={simulateReconnect} className="btn btn-secondary btn-sm" style={{ flex: '1 1 auto', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10b981' }}>
            <span>🔄 Converge Mesh</span>
          </button>
          <button onClick={() => setLogs([])} className="btn btn-secondary btn-sm">
            <span>🧹 Clear</span>
          </button>
        </div>

        {/* Console Terminal Feed */}
        <div style={{
          background: '#010307',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          maxHeight: '180px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem'
        }}>
          {logs.map(log => (
            <div key={log.id} style={{ display: 'flex', gap: '0.75rem', lineHeight: 1.4 }}>
              <span style={{ color: 'var(--text-dim)' }}>[{log.time}]</span>
              <span style={{ color: log.color }}>{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
