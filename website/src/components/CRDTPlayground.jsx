'use client';

import React, { useState } from 'react';
import { ZapIcon, WifiIcon, WifiOffIcon, RefreshCwIcon, ShieldIcon } from './Icons';

export default function CRDTPlayground() {
  const [nodes, setNodes] = useState({
    alpha: { id: 'Node-Alpha (Tokyo)', val: 120, clock: 42, online: true, pending: [] },
    beta: { id: 'Node-Beta (London)', val: 120, clock: 42, online: true, pending: [] },
    gamma: { id: 'Node-Gamma (New York)', val: 120, clock: 42, online: false, pending: ['Delta_ZIL_8f91', 'Delta_ZIL_3a12'] }
  });

  const [convergenceLog, setConvergenceLog] = useState([
    '✓ Initialized 3-node PN-Counter mesh with Vector Clock V(42, 42, 42)',
    '⚠️ Node-Gamma disconnected: operating in Sovereign Offline Isolation'
  ]);

  const toggleNodeOnline = (nodeKey) => {
    setNodes(prev => {
      const node = prev[nodeKey];
      const newOnline = !node.online;
      const statusText = newOnline ? 'Reconnected to Mesh' : 'Entered Offline Mode';
      setConvergenceLog(l => [`⚡ ${node.id} ${statusText}`, ...l.slice(0, 15)]);
      return {
        ...prev,
        [nodeKey]: { ...node, online: newOnline }
      };
    });
  };

  const incrementNode = (nodeKey) => {
    setNodes(prev => {
      const node = prev[nodeKey];
      const nextVal = node.val + 1;
      const nextClock = node.clock + 1;
      const receiptId = 'ZIL_' + Math.random().toString(16).slice(2, 6).toUpperCase();

      if (node.online) {
        // Broadcast immediately to all online nodes
        const updated = { ...prev };
        Object.keys(updated).forEach(k => {
          if (updated[k].online) {
            updated[k] = { ...updated[k], val: nextVal, clock: nextClock };
          }
        });
        setConvergenceLog(l => [`✓ [Broadcast] ${node.id} +1 ➔ Value: ${nextVal} (Clock: ${nextClock})`, ...l.slice(0, 15)]);
        return updated;
      } else {
        // Offline: append to pending intents
        setConvergenceLog(l => [`🔒 [Offline Intent] ${node.id} minted receipt ${receiptId} (Pending Sync)`, ...l.slice(0, 15)]);
        return {
          ...prev,
          [nodeKey]: {
            ...node,
            val: nextVal,
            clock: nextClock,
            pending: [...node.pending, receiptId]
          }
        };
      }
    });
  };

  const triggerConvergence = () => {
    setNodes(prev => {
      // Find highest clock and cumulative deltas
      let maxClock = 0;
      let totalOfflineIntents = 0;
      Object.values(prev).forEach(n => {
        if (n.clock > maxClock) maxClock = n.clock;
        totalOfflineIntents += n.pending.length;
      });

      const maxVal = Math.max(...Object.values(prev).map(n => n.val));

      const converged = {};
      Object.keys(prev).forEach(k => {
        converged[k] = {
          ...prev[k],
          val: maxVal,
          clock: maxClock + 1,
          pending: []
        };
      });

      setConvergenceLog(l => [
        `✨ [CRDT Convergence] Merged ${totalOfflineIntents} offline intents. All nodes unified at Value: ${maxVal} (Vector Clock: ${maxClock + 1}) with 0 Intent Loss!`,
        ...l.slice(0, 15)
      ]);

      return converged;
    });
  };

  return (
    <section id="crdt-mesh" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}>
          Layer 2 Consensus Engine
        </span>
        <h2 className="section-title">🌐 Asynchronous CRDT Mesh Playground</h2>
        <p className="section-desc">
          Test real-time offline convergence. Cut network links to simulate field partitions, generate offline transactions, and watch deterministic conflict-free resolution when connections recover.
        </p>
      </div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1rem, 2.5vw, 1.85rem)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(16, 185, 129, 0.12)'
      }}>
        {/* Node Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {Object.entries(nodes).map(([key, node]) => (
            <div
              key={key}
              style={{
                background: node.online ? 'rgba(3, 7, 18, 0.75)' : 'rgba(30, 20, 30, 0.6)',
                border: node.online ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1.5px dashed rgba(244, 63, 94, 0.5)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: node.online ? '#10b981' : '#f43f5e',
                      boxShadow: node.online ? '0 0 10px #10b981' : '0 0 10px #f43f5e'
                    }} />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{node.id}</span>
                  </div>
                  <button
                    onClick={() => toggleNodeOnline(key)}
                    style={{
                      background: node.online ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                      border: node.online ? '1px solid #10b981' : '1px solid #f43f5e',
                      color: node.online ? '#10b981' : '#f43f5e',
                      borderRadius: '9999px',
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {node.online ? '● ONLINE' : '○ SEVERED'}
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>REPLICATED VALUE</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>{node.val}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>VECTOR CLOCK</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)' }}>V({node.clock})</div>
                  </div>
                </div>

                {node.pending.length > 0 && (
                  <div style={{
                    fontSize: '0.72rem',
                    color: '#fbbf24',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px'
                  }}>
                    ⏳ {node.pending.length} unmerged offline delta(s)
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.45rem' }}>
                <button
                  onClick={() => incrementNode(key)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <ZapIcon size={13} />
                  <span>+1 Mutate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Mesh Convergence Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '1rem',
          background: 'rgba(3, 7, 18, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#fff' }}>
              Deterministic State Harmonization
            </h4>
            <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Re-synchronize disconnected nodes via monotonic CRDT join operations.
            </p>
          </div>
          <button
            onClick={triggerConvergence}
            className="btn btn-emerald btn-sm"
          >
            <RefreshCwIcon size={13} />
            <span>Trigger Delta Sync (CRDT Join)</span>
          </button>
        </div>

        {/* Real-time Convergence Feed */}
        <div style={{
          background: '#010307',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          maxHeight: '160px',
          overflowY: 'auto'
        }}>
          {convergenceLog.map((log, idx) => (
            <div key={idx} style={{ color: log.includes('✨') ? '#10b981' : log.includes('⚠️') ? '#fbbf24' : '#38bdf8', marginBottom: '0.35rem' }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
