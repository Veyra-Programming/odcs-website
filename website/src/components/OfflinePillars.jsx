'use client';

import React from 'react';
import { ShieldIcon, ActivityIcon, CpuIcon, ZapIcon } from './Icons';

export default function OfflinePillars() {
  const tableData = [
    {
      capability: 'Network Disruption',
      cloud: 'Throws socket exceptions, freezes client UI, displays loading spinners or offline errors.',
      odcs: 'Seamless zero-exception degradation. Continues operating locally with zero intent loss.'
    },
    {
      capability: 'User Intent Durability',
      cloud: 'Lost in memory if page is refreshed or app crashes before network acknowledgment.',
      odcs: 'Immediate write-ahead log (WAL) persistence with RFC 8785 canonical hash verification.'
    },
    {
      capability: 'State Synchronization',
      cloud: 'Centralized server database locks or last-write-wins (LWW) with data overwrites.',
      odcs: 'Commutative CRDT mesh sync guaranteeing Strong Eventual Consistency (SEC).'
    },
    {
      capability: 'Cloud Independence',
      cloud: '100% dependent on AWS / GCP / Azure central API gateways and microservices.',
      odcs: 'Zero cloud dependencies. Runs autonomously on bare-metal devices, edge nodes, and local memory.'
    }
  ];

  return (
    <section id="offline-first" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag">Core Principles</span>
        <h2 className="section-title">📶 Built for Complete Network Independence</h2>
        <p className="section-desc">
          Compare the resilience of the Open Digital Continuity Standard against legacy cloud-first assumptions.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="table-scroll-container" style={{
        background: 'rgba(10, 15, 30, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 'var(--radius-lg)',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        <table style={{
          width: '100%',
          minWidth: '580px',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.88rem'
        }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <th style={{ padding: '1rem 1.25rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem', width: '25%' }}>Capability</th>
              <th style={{ padding: '1rem 1.25rem', color: '#f43f5e', textTransform: 'uppercase', fontSize: '0.75rem', width: '37.5%' }}>Traditional Cloud-First</th>
              <th style={{ padding: '1rem 1.25rem', color: '#00f0ff', textTransform: 'uppercase', fontSize: '0.75rem', width: '37.5%' }}>ODCS-2.0.0 Architecture</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={row.capability} style={{
                borderBottom: idx === tableData.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.04)',
                background: idx % 2 === 1 ? 'rgba(255, 255, 255, 0.015)' : 'transparent'
              }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#ffffff' }}>{row.capability}</td>
                <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{row.cloud}</td>
                <td style={{ padding: '1rem 1.25rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>✓ </span>{row.odcs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
