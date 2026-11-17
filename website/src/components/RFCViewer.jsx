'use client';

import React, { useState } from 'react';
import { BookOpenIcon, CopyIcon, CheckIcon, ShieldIcon } from './Icons';

export default function RFCViewer() {
  const [activeTab, setActiveTab] = useState('rfc101');
  const [copied, setCopied] = useState(false);

  const rfcs = {
    rfc101: {
      id: 'ODCS-RFC-101',
      title: 'Zero Intent Loss (ZIL) & Single-Frame Authority',
      track: 'Standards Track · Core Invariant',
      date: 'November 2026',
      summary: 'Specifies the sub-16ms cryptographic commitment requirement. User interactions must transition to immutable local authority within a single 60Hz display frame.',
      specText: `[ODCS-RFC-101: MANDATORY INVARIANT SPECIFICATION]

1. FRAME BUDGET INVARIANT:
   Let T_user be the timestamp of physical user interaction (touch/click/key).
   The client runtime MUST mint a cryptographic receipt R within:
   
       Δt = T_receipt - T_user < 16.66 ms (1 display refresh at 60 FPS)

2. RECEIPT MINTING FORMULA:
   R = {
       "intent_id": UUIDv7(monotonic_timestamp),
       "action": String,
       "payload": Canonical_RFC8785(Data),
       "actor": String,
       "receipt_hash": SHA256(canonical_payload + prev_block_hash)
   }

3. LOCAL NON-BLOCKING COMMITMENT:
   Network socket state MUST NOT gate receipt minting. Even under 100% WAN blackout,
   the receipt is immediately persisted into the local Write-Ahead Log (WAL).`
    },
    rfc102: {
      id: 'ODCS-RFC-102',
      title: 'Append-Only Merkle DAG & Durable WAL',
      track: 'Standards Track · Storage Invariant',
      date: 'November 2026',
      summary: 'Defines the append-only ledger structure guaranteeing tamper-evident ordering and offline non-repudiation without central consensus.',
      specText: `[ODCS-RFC-102: DURABLE STORAGE SPECIFICATION]

1. APPEND-ONLY MERKLE DAG:
   Every committed transaction produces an immutable Block B_n:
   
       B_n = {
           "height": n,
           "timestamp_ms": MonotonicClock.now(),
           "prev_hash": Hash(B_{n-1}),
           "intent_receipt": R_n,
           "merkle_root": MerkleRoot(Leaf_1 ... Leaf_n)
       }

2. ATOMIC BATCH PERSISTENCE:
   Under browser WebAssembly: Persisted to IndexedDB via atomic transactions.
   Under native Linux/Windows: Written directly to fsync-protected journal files.

3. INTEGRITY RECOVERY:
   If a client crashes mid-frame, recovery executes from B_{n-1} hash validation.
   Zero partially written states are accepted.`
    },
    rfc103: {
      id: 'ODCS-RFC-103',
      title: 'Asynchronous CRDT State Convergence',
      track: 'Standards Track · Synchronization Invariant',
      date: 'November 2026',
      summary: 'Specifies conflict-free replicated data type (CRDT) mechanics, vector clocks, and deterministic join semi-lattices across disconnected nodes.',
      specText: `[ODCS-RFC-103: REPLICATION & CONVERGENCE SPECIFICATION]

1. VECTOR CLOCK FORMAL DEFINITION:
   For a mesh of N nodes {n_1, n_2, ... n_k}, each node maintains Vector V:
   
       V = <c_1, c_2, ... c_k> where c_i = local sequence counter for node i.

2. MONOTONIC JOIN OPERATION (SEMI-LATTICE):
   When two partitions reconcile after network severance, the merge function:
   
       V_merged = V_local ⊔ V_remote
       where ∀ i ∈ [1..k]: V_merged[i] = max(V_local[i], V_remote[i])

3. LWW-REGISTER & PN-COUNTER INVARIANTS:
   Concurrent edits resolve deterministically by monotonic timestamps and node rank.
   No coordinator, no leader election, and 0 data conflicts.`
    },
    rfc104: {
      id: 'ODCS-RFC-104',
      title: 'Sovereign Star WASM & Haven Execution Model',
      track: 'Standards Track · Runtime Architecture',
      date: 'November 2026',
      summary: 'Specifies the dual-engine architecture: pure Star Declarative UI compiled to 4.9 KB WebAssembly, coupled with the Haven v2.0 Natural-English continuous backend.',
      specText: `[ODCS-RFC-104: DUAL-ENGINE ARCHITECTURE SPECIFICATION]

1. FRONTEND: STAR LANGUAGE CORE:
   - Compiled binary: app.wasm (4.9 KB)
   - Zero Virtual-DOM, zero npm dependencies, zero JavaScript runtime overhead.
   - Declarative reactive tree updating in single-frame 60Hz intervals.

2. BACKEND: HAVEN LANGUAGE v2.0 RUNTIME:
   - Authored in verified Natural-English sentences.
   - Continuous background telemetry sensing & self-healing gateway services.
   - Fully compliant with RFC 8785 Canonical JSON standards.`
    }
  };

  const current = rfcs[activeTab];

  const copySpec = () => {
    navigator.clipboard.writeText(current.specText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture-rfc" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag" style={{ background: 'rgba(168, 85, 247, 0.15)', borderColor: 'rgba(168, 85, 247, 0.4)', color: '#c084fc' }}>
          Official Standards Track
        </span>
        <h2 className="section-title">📐 ODCS-2.0.0 RFC Specifications Browser</h2>
        <p className="section-desc">
          Read the formal open specifications that define the mathematical and cryptographic guarantees of Digital Continuity.
        </p>
      </div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1rem, 2.5vw, 1.85rem)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.12)'
      }}>
        {/* RFC Navigation Pills */}
        <div style={{
          display: 'flex',
          gap: '0.45rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          {Object.entries(rfcs).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="btn btn-sm"
              style={{
                background: activeTab === key ? 'rgba(168, 85, 247, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: activeTab === key ? '1.5px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                color: activeTab === key ? '#e9d5ff' : 'var(--text-dim)',
                borderRadius: '9999px'
              }}
            >
              {item.id}
            </button>
          ))}
        </div>

        {/* RFC Document Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="badge badge-violet">{current.id}</span>
              <span className="badge badge-cyan">{current.track}</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{current.date}</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: '0.35rem 0' }}>
              {current.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '780px' }}>
              {current.summary}
            </p>
          </div>

          <button
            onClick={copySpec}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
            <span>{copied ? 'COPIED RFC' : 'COPY SPEC'}</span>
          </button>
        </div>

        {/* Spec Terminal Window */}
        <div style={{
          background: '#010307',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: '#38bdf8',
          lineHeight: 1.6,
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {current.specText}
        </div>
      </div>
    </section>
  );
}
