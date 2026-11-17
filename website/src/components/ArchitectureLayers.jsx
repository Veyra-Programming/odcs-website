'use client';

import React from 'react';

export default function ArchitectureLayers() {
  const layers = [
    {
      num: '4',
      name: 'Zero Intent Loss (ZIL)',
      badge: 'Single-Frame Authority',
      desc: 'Mints local cryptographic action receipts within 16ms of user interaction. Preserves intents into local WAL before any network socket transmission.',
      features: ['Local intent receipts', 'Sub-16ms frame budget', 'Hardware/crypto seal', 'Eliminates form wipeouts'],
      color: '#f43f5e'
    },
    {
      num: '3',
      name: 'Adaptive Network Telemetry',
      badge: 'Sub-RTT Sensing',
      desc: 'Continual active & passive carrier probes calculate RTT and edge jitter. Dynamically shifts states between Optimal Online, Degraded Jitter, and Severed Offline without throwing exceptions.',
      features: ['Dynamic state machine', '60Hz carrier probes', 'Zero-exception degradation', 'Automatic socket recovery'],
      color: '#fbbf24'
    },
    {
      num: '2',
      name: 'Partition-Tolerant Consensus',
      badge: 'Conflict-Free Sync',
      desc: 'State-based conflict-free replicated data types (CRDTs). Add-Wins sets and PN-Counters guarantee Strong Eventual Consistency across disconnected partitions.',
      features: ['CRDT state replication', 'Add-Wins semantics', 'Vector clock tracking', 'Commutative delta merges'],
      color: '#a855f7'
    },
    {
      num: '1',
      name: 'Durable Local Storage Engine',
      badge: 'Write-Ahead Log (WAL)',
      desc: 'Append-only ledger backed by IndexedDB and NVMe storage. Every intent is serialized using RFC 8785 Canonical JSON and hashed into a tamper-evident Merkle DAG.',
      features: ['Append-only WAL', 'IndexedDB / NVMe backed', 'RFC 8785 Canonical JSON', 'SHA-256 Merkle root verification'],
      color: '#00f0ff'
    }
  ];

  return (
    <section id="layers" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag">Architectural Hierarchy</span>
        <h2 className="section-title">🧱 The 4 Sovereign Layers of ODCS</h2>
        <p className="section-desc">
          Unlike legacy cloud architectures that crash when sockets disconnect, ODCS is strictly tiered into 4 decoupled, resilient authority layers.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
        gap: '1.25rem'
      }}>
        {layers.map(layer => (
          <div key={layer.num} style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${layer.color}33`,
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  color: layer.color
                }}>
                  L{layer.num}
                </span>
                <span style={{
                  background: `${layer.color}1a`,
                  border: `1px solid ${layer.color}55`,
                  color: layer.color,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px'
                }}>
                  {layer.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {layer.name}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {layer.desc}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                {layer.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: layer.color }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
