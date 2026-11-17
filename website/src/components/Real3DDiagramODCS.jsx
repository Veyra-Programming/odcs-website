'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LayersIcon, RefreshCwIcon, ZapIcon, ShieldIcon, ActivityIcon, BookOpenIcon } from './Icons';

export default function Real3DDiagramODCS() {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('model'); // 'model' (4 Layers) or 'algorithm' (ODA Algorithm)
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1.0);
  const [selectedElement, setSelectedElement] = useState(3); // Layer 4 default
  const [isDragging, setIsDragging] = useState(false);

  // Rotation angles (radians)
  const rotationRef = useRef({ yaw: 0.6, pitch: 0.35 });
  const mouseRef = useRef({ lastX: 0, lastY: 0 });

  // Layer details for ODCS 4-Layer Model
  const layersData = [
    {
      id: 0,
      layer: 'Layer 1',
      name: 'Cryptographic Durability & Append-Only WAL',
      color: '#a855f7',
      rgb: [168, 85, 247],
      desc: 'Monotonic append-only journal running on local NVMe or IndexedDB. Uses RFC 8785 Canonical JSON and SHA-256 Merkle DAG chaining. Guarantees 100% bit-for-bit replay without remote databases.',
      specs: ['RFC 8785 Canonical JSON', 'SHA-256 Merkle DAG', 'fsync() NVMe Durability', '0% Data Drift']
    },
    {
      id: 1,
      layer: 'Layer 2',
      name: 'Asynchronous Mesh & CRDT Consensus',
      color: '#10b981',
      rgb: [16, 185, 129],
      desc: 'Conflict-Free Replicated Data Types (CRDTs) commuting state deltas algebraically. PN-Counters and Add-Wins OR-Sets merge over Bluetooth, LoRa, or intermittent TCP/UDP with zero merge conflicts.',
      specs: ['PN-Counter Monotonicity', 'Add-Wins OR-Set', 'Dual Wire: REL + DGM', 'Zero Distributed Locks']
    },
    {
      id: 2,
      layer: 'Layer 3',
      name: 'Environmental Telemetry & Adaptive Probing',
      color: '#00f0ff',
      rgb: [0, 240, 255],
      desc: 'Dynamic latency probes continuously classify network connectivity (Optimal Online, Cellular Jitter, Partitioned Offline, Reconnection Mesh) and throttle replication with exponential jitter backoff.',
      specs: ['Sub-1ms RTT Probing', 'Jitter Classification', 'Exponential Backoff', 'Carrier Wave Sensing']
    },
    {
      id: 3,
      layer: 'Layer 4',
      name: 'Zero Intent Loss (<16ms Single-Frame Authority)',
      color: '#fbbf24',
      rgb: [251, 191, 36],
      desc: 'Tamper-evident hardware receipts are minted and cryptographically sealed on the client before upstream sockets are opened. Completely eliminates 504 timeouts, spinner freezes, and wiped forms.',
      specs: ['< 16.66ms Frame Budget', 'Hardware Intent Receipts', '100% Local Authority', 'Zero Form Discards']
    }
  ];

  // ODA Algorithm Nodes
  const algorithmNodes = [
    { id: 0, title: '1. Intent Capture', sub: '< 16ms Frame Budget', desc: 'User interaction (click, keypress, form commit) is immediately captured into memory.' },
    { id: 1, title: '2. RFC 8785 Canonicalize', sub: 'Deterministic Serialization', desc: 'Keys sorted lexicographically, floats normalized to prevent architecture-dependent state divergence.' },
    { id: 2, title: '3. Mint ZIL Receipt', sub: 'SHA-256 Leaf Seal', desc: 'Receipt is signed and linked to previous local block with monotonic timestamp.' },
    { id: 3, title: '4. Local WAL Commit', sub: 'NVMe / IndexedDB fsync', desc: 'Written to append-only durable journal on local disk before opening any network sockets.' },
    { id: 4, title: '5. Telemetry Sensing', sub: 'Sub-1ms RTT Probe', desc: 'Layer 3 probe senses network carrier state and determines whether socket transport is viable.' },
    { id: 5, title: '6. Asynchronous Gossip', sub: 'ODCS-REL / BLE / LoRa', desc: 'When peers or gateways appear, state deltas are gossiped opportunistically.' },
    { id: 6, title: '7. CRDT Commutative Merge', sub: 'Algebraic Reconcile', desc: 'Concurrent replicas compute least upper bound (join semi-lattice) with zero user merge conflicts.' },
    { id: 7, title: '8. Replay & Audit Proof', sub: 'Bit-for-Bit Provenance', desc: 'Entire history replayed from Genesis block proves zero loss of human intent across decades.' }
  ];

  // 3D Engine Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

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

    // 3D Matrix Utilities
    const project = (x, y, z, cx, cy, fov = 420) => {
      const { yaw, pitch } = rotationRef.current;

      // Rotate around Y axis (Yaw)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate around X axis (Pitch)
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y2 = y * cosP - z1 * sinP;
      const z2 = y * sinP + z1 * cosP;

      // Perspective projection with camera distance
      const distance = 600;
      const scale = (fov * zoom) / (distance + z2);

      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale,
        depth: z2
      };
    };

    // Particle streams flowing between slabs in 3D
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 220,
      z: (Math.random() - 0.5) * 160,
      vy: -0.8 - Math.random() * 1.2,
      color: ['#00f0ff', '#10b981', '#fbbf24', '#c084fc'][Math.floor(Math.random() * 4)],
      size: 1.5 + Math.random() * 2
    }));

    let packetAngle = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      if (autoRotate && !isDragging) {
        rotationRef.current.yaw += 0.006;
      }

      // Draw subtle 3D space grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 220;
      for (let g = -gridSize; g <= gridSize; g += 55) {
        const p1 = project(g, 150, -gridSize, cx, cy);
        const p2 = project(g, 150, gridSize, cx, cy);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project(-gridSize, 150, g, cx, cy);
        const p4 = project(gridSize, 150, g, cx, cy);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      if (viewMode === 'model') {
        // ====================================================================
        // MODE 1: ODCS 4-LAYER 3D STACK VISUALIZATION
        // ====================================================================
        const slabs = [
          { id: 0, y: 110, color: '#a855f7', name: 'L1: STORAGE & MERKLE WAL' },
          { id: 1, y: 35, color: '#10b981', name: 'L2: MESH CRDT CONSENSUS' },
          { id: 2, y: -40, color: '#00f0ff', name: 'L3: TELEMETRY PROBES' },
          { id: 3, y: -115, color: '#fbbf24', name: 'L4: ZERO INTENT LOSS (ZIL)' }
        ];

        // Collect 3D draw items to depth-sort
        const drawItems = [];

        // Vertical corner conduit columns
        const corners = [
          { x: -110, z: -85 },
          { x: 110, z: -85 },
          { x: 110, z: 85 },
          { x: -110, z: 85 }
        ];

        corners.forEach((c) => {
          const top = project(c.x, -140, c.z, cx, cy);
          const bottom = project(c.x, 130, c.z, cx, cy);
          drawItems.push({
            depth: (top.depth + bottom.depth) / 2,
            draw: () => {
              ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(top.x, top.y);
              ctx.lineTo(bottom.x, bottom.y);
              ctx.stroke();
            }
          });
        });

        // Add slabs to drawItems
        slabs.forEach((slab) => {
          const w = 125;
          const d = 95;
          const h = 10;
          const isSelected = selectedElement === slab.id;

          // 8 vertices of each 3D slab
          const v = [
            project(-w, slab.y - h, -d, cx, cy),
            project(w, slab.y - h, -d, cx, cy),
            project(w, slab.y - h, d, cx, cy),
            project(-w, slab.y - h, d, cx, cy),
            project(-w, slab.y + h, -d, cx, cy),
            project(w, slab.y + h, -d, cx, cy),
            project(w, slab.y + h, d, cx, cy),
            project(-w, slab.y + h, d, cx, cy)
          ];

          const centerP = project(0, slab.y, 0, cx, cy);

          drawItems.push({
            depth: centerP.depth,
            draw: () => {
              // Slab Top Face
              ctx.fillStyle = isSelected 
                ? `${slab.color}35` 
                : `${slab.color}15`;
              ctx.strokeStyle = isSelected ? '#ffffff' : slab.color;
              ctx.lineWidth = isSelected ? 2.5 : 1.2;

              ctx.beginPath();
              ctx.moveTo(v[0].x, v[0].y);
              ctx.lineTo(v[1].x, v[1].y);
              ctx.lineTo(v[2].x, v[2].y);
              ctx.lineTo(v[3].x, v[3].y);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Slab Front Face
              ctx.fillStyle = `${slab.color}25`;
              ctx.beginPath();
              ctx.moveTo(v[3].x, v[3].y);
              ctx.lineTo(v[2].x, v[2].y);
              ctx.lineTo(v[6].x, v[6].y);
              ctx.lineTo(v[7].x, v[7].y);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Slab Right Face
              ctx.beginPath();
              ctx.moveTo(v[1].x, v[1].y);
              ctx.lineTo(v[2].x, v[2].y);
              ctx.lineTo(v[6].x, v[6].y);
              ctx.lineTo(v[5].x, v[5].y);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Inner Hologram Ring on Slab
              ctx.strokeStyle = `${slab.color}60`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              const ringP = project(0, slab.y - h, 0, cx, cy);
              ctx.arc(ringP.x, ringP.y, 25 * ringP.scale, 0, Math.PI * 2);
              ctx.stroke();

              // Text Label on Slab Front
              ctx.fillStyle = isSelected ? '#ffffff' : slab.color;
              ctx.font = `800 ${Math.max(9, Math.floor(11 * centerP.scale))}px JetBrains Mono, monospace`;
              ctx.textAlign = 'center';
              ctx.shadowColor = slab.color;
              ctx.shadowBlur = isSelected ? 15 : 6;
              ctx.fillText(slab.name, centerP.x, centerP.y - 4);
              ctx.shadowBlur = 0;
            }
          });
        });

        // Moving vertical energy particles
        particles.forEach((p) => {
          p.y += p.vy;
          if (p.y < -130) p.y = 120;
          const pos = project(p.x, p.y, p.z, cx, cy);
          drawItems.push({
            depth: pos.depth,
            draw: () => {
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(pos.x, pos.y, p.size * pos.scale, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        });

        // Depth sort and draw all items
        drawItems.sort((a, b) => b.depth - a.depth);
        drawItems.forEach(item => item.draw());

      } else {
        // ====================================================================
        // MODE 2: ODA ALGORITHM 3D SPATIAL CYCLIC GRAPH
        // ====================================================================
        packetAngle += 0.02;
        const radius = 150;
        const count = algorithmNodes.length;
        const nodes3D = [];

        for (let i = 0; i < count; i++) {
          const theta = (Math.PI * 2 * i) / count;
          // Helical vertical displacement
          const y = Math.sin(theta * 2) * 35;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          const p = project(x, y, z, cx, cy);
          nodes3D.push({ ...algorithmNodes[i], ...p, rawX: x, rawY: y, rawZ: z, idx: i });
        }

        // Draw connecting 3D spline lines between nodes
        for (let i = 0; i < count; i++) {
          const next = (i + 1) % count;
          const n1 = nodes3D[i];
          const n2 = nodes3D[next];

          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }

        // Animated traveling packets along the algorithmic ring
        for (let k = 0; k < 3; k++) {
          const curA = packetAngle + (k * (Math.PI * 2 / 3));
          const px = Math.cos(curA) * radius;
          const py = Math.sin(curA * 2) * 35;
          const pz = Math.sin(curA) * radius;
          const pos = project(px, py, pz, cx, cy);

          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 4.5 * pos.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Depth sort nodes
        nodes3D.sort((a, b) => b.depth - a.depth);

        // Render nodes
        nodes3D.forEach((n) => {
          const isSelected = selectedElement === n.idx;
          const nodeColor = isSelected ? '#fbbf24' : '#00f0ff';

          // Outer halo
          ctx.fillStyle = isSelected ? 'rgba(251, 191, 36, 0.25)' : 'rgba(0, 240, 255, 0.12)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 18 * n.scale, 0, Math.PI * 2);
          ctx.fill();

          // Node Core
          ctx.fillStyle = nodeColor;
          ctx.shadowColor = nodeColor;
          ctx.shadowBlur = isSelected ? 18 : 8;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8 * n.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Text Label
          ctx.fillStyle = isSelected ? '#ffffff' : 'var(--text-main)';
          ctx.font = `700 ${Math.max(9, Math.floor(10 * n.scale))}px Plus Jakarta Sans, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(n.title, n.x, n.y - (14 * n.scale));
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [viewMode, autoRotate, zoom, selectedElement, isDragging]);

  // Mouse & Touch Drag Handlers for 3D Camera Rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - mouseRef.current.lastX;
    const dy = e.clientY - mouseRef.current.lastY;
    rotationRef.current.yaw += dx * 0.008;
    rotationRef.current.pitch += dy * 0.008;
    // Constrain pitch
    rotationRef.current.pitch = Math.max(-1.4, Math.min(1.4, rotationRef.current.pitch));
    mouseRef.current.lastX = e.clientX;
    mouseRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      mouseRef.current.lastX = e.touches[0].clientX;
      mouseRef.current.lastY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - mouseRef.current.lastX;
    const dy = e.touches[0].clientY - mouseRef.current.lastY;
    rotationRef.current.yaw += dx * 0.008;
    rotationRef.current.pitch += dy * 0.008;
    rotationRef.current.pitch = Math.max(-1.4, Math.min(1.4, rotationRef.current.pitch));
    mouseRef.current.lastX = e.touches[0].clientX;
    mouseRef.current.lastY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => setIsDragging(false);

  const resetCamera = () => {
    rotationRef.current = { yaw: 0.6, pitch: 0.35 };
    setZoom(1.0);
  };

  return (
    <section id="3d-diagram" style={{ marginBottom: '5rem', position: 'relative' }}>
      <div className="section-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-cyan">INTERACTIVE 3D PROJECTION</span>
          <span className="badge badge-amber">REAL SPATIAL VISUALIZATION</span>
        </div>
        <h2 className="section-title">
          🧊 Real 3D Diagram of ODCS Model &amp; ODA Algorithm
        </h2>
        <p className="section-desc">
          Interactive full-dimension 3D visualization. Click and drag in any direction to rotate the 3D perspective,
          switch between the 4-Layer architectural stack and the ODA algorithmic state machine, and inspect cryptographic components in space.
        </p>
      </div>

      {/* Main 3D Container Card */}
      <div style={{
        background: 'rgba(10, 15, 30, 0.88)',
        border: '1.5px solid rgba(0, 240, 255, 0.35)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 240, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Top Control Bar */}
        <div style={{
          padding: '1rem 1.75rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setViewMode('model'); setSelectedElement(3); }}
              className="btn btn-sm"
              style={{
                background: viewMode === 'model' ? 'rgba(0, 240, 255, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: viewMode === 'model' ? '1.5px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                color: viewMode === 'model' ? '#00f0ff' : 'var(--text-muted)'
              }}
            >
              <LayersIcon size={14} />
              <span>🏛️ 4-Layer ODCS Model 3D</span>
            </button>

            <button
              onClick={() => { setViewMode('algorithm'); setSelectedElement(0); }}
              className="btn btn-sm"
              style={{
                background: viewMode === 'algorithm' ? 'rgba(251, 191, 36, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: viewMode === 'algorithm' ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                color: viewMode === 'algorithm' ? '#fbbf24' : 'var(--text-muted)'
              }}
            >
              <ZapIcon size={14} />
              <span>⚡ ODA Algorithm Flow 3D</span>
            </button>
          </div>

          {/* 3D Interaction Control Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {/* Auto-Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="btn btn-secondary btn-sm"
              style={{
                background: autoRotate ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                borderColor: autoRotate ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                color: autoRotate ? '#10b981' : 'var(--text-dim)'
              }}
            >
              <RefreshCwIcon size={12} className={autoRotate ? 'animate-spin' : ''} />
              <span>{autoRotate ? 'AUTO-ROTATE ON' : 'PAUSED'}</span>
            </button>

            {/* Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                onClick={() => setZoom(z => Math.max(0.6, +(z - 0.15).toFixed(2)))}
                className="btn btn-secondary btn-xs"
                style={{ width: '26px', height: '26px', padding: 0 }}
                title="Zoom Out"
              >
                −
              </button>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', minWidth: '36px', textAlign: 'center' }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(z => Math.min(2.0, +(z + 0.15).toFixed(2)))}
                className="btn btn-secondary btn-xs"
                style={{ width: '26px', height: '26px', padding: 0 }}
                title="Zoom In"
              >
                +
              </button>
            </div>

            {/* Reset Camera */}
            <button
              onClick={resetCamera}
              className="btn btn-secondary btn-sm"
            >
              Reset 3D
            </button>
          </div>
        </div>

        {/* 3D Canvas Area & Floating Inspector Overlay */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 46vh, 480px)',
          background: 'radial-gradient(circle at center, #090e1c 0%, #030712 100%)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />

          {/* Interactive Layer / Node Selector Pills */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            display: 'flex',
            gap: '0.35rem',
            overflowX: 'auto',
            padding: '0.4rem',
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 10,
            WebkitOverflowScrolling: 'touch'
          }}>
            {viewMode === 'model' ? (
              layersData.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setSelectedElement(layer.id)}
                  style={{
                    background: selectedElement === layer.id ? `${layer.color}25` : 'rgba(255, 255, 255, 0.04)',
                    border: selectedElement === layer.id ? `1.5px solid ${layer.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: selectedElement === layer.id ? '#ffffff' : 'var(--text-dim)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <span style={{ color: layer.color }}>●</span> {layer.layer}
                </button>
              ))
            ) : (
              algorithmNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedElement(node.id)}
                  style={{
                    background: selectedElement === node.id ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: selectedElement === node.id ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: selectedElement === node.id ? '#fbbf24' : 'var(--text-dim)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {node.title}
                </button>
              ))
            )}
          </div>

          {/* Floating Drag Hint Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '9999px',
            padding: '0.2rem 0.65rem',
            fontSize: '0.66rem',
            color: '#00f0ff',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            pointerEvents: 'none'
          }}>
            CLICK &amp; DRAG TO ROTATE 3D
          </div>
        </div>

        {/* Selected Layer / Node Inspector Drawer Bottom Bar */}
        <div style={{
          padding: 'clamp(1rem, 2.5vw, 1.5rem)',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {viewMode === 'model' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="badge" style={{
                    background: `${layersData[selectedElement].color}20`,
                    border: `1px solid ${layersData[selectedElement].color}60`,
                    color: layersData[selectedElement].color
                  }}>
                    {layersData[selectedElement].layer}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {layersData[selectedElement].name}
                  </h3>
                </div>
                <span className="badge badge-cyan">MATHEMATICALLY PROVEN INVARIANT</span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 0.85rem 0' }}>
                {layersData[selectedElement].desc}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {layersData[selectedElement].specs.map((spec, i) => (
                  <span key={i} style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: layersData[selectedElement].color
                  }}>
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span className="badge badge-amber">ODA ALGORITHM STEP #{selectedElement + 1}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {algorithmNodes[selectedElement].title}
                  </h3>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
                  {algorithmNodes[selectedElement].sub}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {algorithmNodes[selectedElement].desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
