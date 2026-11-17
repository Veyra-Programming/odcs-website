'use client';

import React, { useState } from 'react';
import { StarIcon, DoveIcon, BookOpenIcon, CopyIcon, CheckIcon, TerminalIcon, ShieldIcon, SearchIcon, DownloadIcon, LayersIcon, ZapIcon } from './Icons';

export default function DocumentationCenter() {
  const [activeLang, setActiveLang] = useState('star'); // 'star', 'haven', 'rfcs', 'downloads'
  const [starSection, setStarSection] = useState('overview'); // 'overview', 'ui_primitives', 'state', 'wasm', 'cli'
  const [havenSection, setHavenSection] = useState('overview'); // 'overview', 'grammar', 'pipelines', 'durable', 'stdlib', 'examples'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHavenExample, setActiveHavenExample] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const havenExamples = [
    {
      name: '01_hello_english.hvn',
      title: 'Natural English Core Syntax',
      code: `// Haven Language v2.0 • Example 01: Natural English Core
// Write resilient programs cleanly like everyday English.

set system_name to "ODCS Continuity Node"
set replica_count to 4
set latency_ms to 12.5
remember region as "Bengaluru-Edge"

say "Booting {system_name} in region {region}..."

repeat replica_count times:
    set node_id to "NODE-" + String(iteration)
    say "Synchronizing replica {node_id} [OK]"

increase replica_count by 2
say "Scaled active cluster to {replica_count} replicas."

unless latency_ms is greater than 20.0:
    say "Latency status: OPTIMAL ({latency_ms}ms < 20ms)"
otherwise:
    say "Warning: Latency boundary exceeded!"`
    },
    {
      name: '02_pipelines_and_crypto.hvn',
      title: 'Functional Pipelines (|>) & Cryptography',
      code: `// Haven Language v2.0 • Example 02: Native Pipelining & Cryptography
// Chain transformations cleanly from left to right using '|>' and '_'.

define tag_genesis(clean_str):
    give back "ODCS-GENESIS:" + clean_str

define inspect_digest(digest_hex):
    say "Sealed SHA-256 Digest: {digest_hex}"
    give back digest_hex

say "Running Native Haven Continuity Pipeline..."

set sealed to "   alpha-continuum-telemetry-packet   "
    |> trim(_)
    |> uppercase(_)
    |> tag_genesis(_)
    |> seal_hash(_)
    |> inspect_digest(_)

whenever sealed is not equal to nothing:
    say "Pipeline cryptographic verification complete!"`
    },
    {
      name: '03_durable_records.hvn',
      title: 'Durable Immutable Records',
      code: `// Haven Language v2.0 • Example 03: Durable Immutable Records
// Cryptographically tamper-evident data structures enforced by the compiler.

durable record TelemetryPacket:
    packet_id: String
    sensor: String
    ambient_temp_c: Float
    battery_pct: Integer
    sealed_by: String

set sample to TelemetryPacket(
    packet_id: "PKT-2026-9901",
    sensor: "BARO-METRIC-04",
    ambient_temp_c: 24.85,
    battery_pct: 98,
    sealed_by: "Node-Sovereign-Edge"
)

say "Telemetry Packet Created: {sample.packet_id}"
say "Cryptographic Merkle Seal: {sample.odcs_hash()}"

// Native verify statement
verify sample with sample.odcs_hash()
say "Audit Verification Passed: 100% Bit-for-Bit Provenance"`
    },
    {
      name: '04_continuity_mesh.hvn',
      title: 'CRDT Mesh Consensus',
      code: `// Haven Language v2.0 • Example 04: Asynchronous CRDT Convergence
// PN-Counters merge algebraically without centralized database locks.

set cluster_node_a to PNCounter("BLR-Edge-01")
set cluster_node_b to PNCounter("NYC-Gateway-02")

say "Simulating Disconnected Mutations..."
cluster_node_a.increment(15)
cluster_node_b.increment(30)
cluster_node_a.decrement(3)

say "Node A Counter: {cluster_node_a.value()}"
say "Node B Counter: {cluster_node_b.value()}"

say "Partition Restored: Merging CRDT Monotonic Mesh..."
cluster_node_a.merge(cluster_node_b)

say "Final Converged Counter Value: {cluster_node_a.value()}"
ensure cluster_node_a.value() == 42 otherwise "Convergence Error!"
say "Mesh Convergence Verified Algebraic Consistency [PASSED]"`
    },
    {
      name: '05_adaptive_telemetry.hvn',
      title: 'Zero Intent Loss & Adaptive Telemetry',
      code: `// Haven Language v2.0 • Example 05: Adaptive Telemetry & ZIL
// Sub-16ms single-frame receipts prevent intent loss during outages.

preserve intent "MedicalCheckin" with {
    "patient_id": "PT-771",
    "priority": "HIGH",
    "bp": "120/80"
} as receipt

say "Minted Local Receipt ID: {receipt['intent_id']}"
say "Receipt Hash: {receipt['receipt_hash']}"
say "Local Authority Status: Durably Sealed on NVMe (0ms WAN latency)"

// Inspect telemetry classification
set network_state to TelemetryProbe.classify(280.0, 45)
say "Current Network Mode: {network_state}"`
    }
  ];

  const starSampleCode = `# Master ODCS Web Application in Pure Star Language
# Specification: ODCS-2.0.0 · Toolchain: Star v1.2.0 GA
# Architect: Anirudha Puthraya · ODCS Standards Foundation

use UI

app ODCSContinuityPortal

    # 1. State & Reactive Authority Properties
    variable _current_mode = "OPTIMAL_ONLINE"
    variable _rtt_latency = 0.04
    variable _staged_receipts = 142
    variable _crdt_counter = 512
    variable _active_tab = 0

    # 2. Brand & Header Bar
    UI.row(
        UI.title("🏛️ ODCS v2.0", 1, { "fg": "#00f0ff" }),
        UI.spacer(),
        UI.badge("STANDARD: ODCS-2.0.0", "primary"),
        UI.badge("FRONTEND: STAR v1.2", "success"),
        UI.badge("BACKEND: HAVEN v2.0", "warning")
    )

    UI.text("Open Digital Continuity Standard — Digital experiences that endure without the network.", { "fg": "#94a3b8" })
    UI.divider()

    # 3. Disruption Status HUD (The 4 Layers of ODCS)
    UI.row(
        UI.card(
            UI.badge("LAYER 1 · LOCAL DURABILITY", "primary"),
            UI.title("IndexedDB / NVMe WAL", 3),
            UI.text("RFC 8785 Canonical JSON SHA-256 Merkle Chain Active"),
            UI.text("Status: 100% Bit-for-Bit Replay Verified", { "fg": "#00ffaa" })
        ),
        UI.card(
            UI.badge("LAYER 2 · MESH CONSENSUS", "success"),
            UI.title("CRDT Strong Consistency", 3),
            UI.text("PN-Counter Replicas & Add-Wins OR-Sets Converged"),
            UI.text("Dual Wire: ODCS-REL + ODCS-DGM", { "fg": "#00f0ff" })
        ),
        UI.card(
            UI.badge("LAYER 3 · TELEMETRY SENSING", "accent"),
            UI.title("Adaptive Latency Probe", 3),
            UI.text("Real-time RTT Sensing: 0.04ms (Optimal Online)")
        ),
        UI.card(
            UI.badge("LAYER 4 · ZERO INTENT LOSS", "warning"),
            UI.title("< 16ms Local Authority", 3),
            UI.text("Tamper-Evident Receipts Minted Before Upstream Sockets"),
            UI.text("Zero Form Wipes · Zero Blocked UIs", { "fg": "#f43f5e" })
        )
    )`;

  const downloadDocsMarkdown = (type) => {
    let md = '';
    let filename = '';

    if (type === 'star') {
      filename = 'Star-Language-v1.2-Public-Manual.md';
      md = `# ⭐ Star Programming Language (v1.2.0 GA) — Official Public Developer Manual
Architect: Anirudha Puthraya · ODCS Standards Foundation

## 1. Architectural Philosophy
Star is a declarative reactive language compiling directly to WebAssembly (app.wasm).
Delivers single-frame 60 FPS user interfaces with zero Virtual DOM overhead and zero external npm runtime dependencies.

## 2. Syntax & Reactive State
\`\`\`star
use UI
app SovereignApp
    variable _counter = 0
    variable _node = "BLR-Edge-01"

    UI.row(
        UI.title("Node Status: " + _node, 2),
        UI.badge("ONLINE", "success")
    )
\`\`\`

## 3. Toolchain CLI
- star check <file.star>
- star compile <file.star> -> <file.starb>
- star build web -> build/web/
- star preview <file.star>
- star doctor
`;
    } else if (type === 'haven') {
      filename = 'Haven-Language-v2.0-Public-Manual.md';
      md = `# 🕊️ Haven (Heaven Language v2.0 GA) — Official Public Developer Manual
Architect: Anirudha Puthraya · ODCS Standards Foundation

## 1. Natural English Philosophy
Haven allows software engineers and mission-critical teams to author disruption-tolerant software using everyday English grammar.

## 2. Left-to-Right Pipelines (|>)
\`\`\`haven
set processed to raw_data
    |> trim(_)
    |> uppercase(_)
    |> seal_hash(_)
\`\`\`

## 3. Durable Immutable Records
\`\`\`haven
durable record TelemetryPacket:
    packet_id: String
    sensor: String
    ambient_temp_c: Float
\`\`\`
`;
    } else {
      filename = 'ODCS-Star-Haven-Full-Documentation.md';
      md = `# Open Digital Continuity Standard (ODCS-2.0.0 GA)
## Complete Public Documentation for Star Language & Haven Language
Architect: Anirudha Puthraya

### ⭐ Star Language Reference
\`\`\`star
${starSampleCode}
\`\`\`

### 🕊️ Haven Language Examples
`;
      havenExamples.forEach(ex => {
        md += `\n#### ${ex.title} (${ex.name})\n\`\`\`haven\n${ex.code}\n\`\`\`\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="documents-hub" style={{ marginBottom: '5rem', position: 'relative' }}>
      <div className="section-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-cyan">PUBLIC DEVELOPER VAULT</span>
          <span className="badge badge-amber">FULL SPECIFICATIONS UNLOCKED</span>
        </div>
        <h2 className="section-title">
          📖 Full Public Available Documentation: Haven &amp; Star
        </h2>
        <p className="section-desc">
          Complete, open-access manuals, language grammar specifications, toolchain CLI handbooks,
          and production code examples. Fully readable, searchable, and exportable offline.
        </p>
      </div>

      {/* Main Container */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.88)',
        border: '1.5px solid rgba(0, 240, 255, 0.35)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1rem, 2.5vw, 1.85rem)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75), 0 0 35px rgba(0, 240, 255, 0.12)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Top Language Switcher Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '1.25rem'
        }}>
          {/* Main Language Tabs - Small, Sleek & Touch-Friendly */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveLang('star')}
              className="btn btn-sm"
              style={{
                background: activeLang === 'star' ? 'rgba(0, 240, 255, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: activeLang === 'star' ? '1.5px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                color: activeLang === 'star' ? '#00f0ff' : 'var(--text-muted)'
              }}
            >
              <StarIcon size={14} />
              <span>⭐ Star Language v1.2 GA Docs</span>
            </button>

            <button
              onClick={() => setActiveLang('haven')}
              className="btn btn-sm"
              style={{
                background: activeLang === 'haven' ? 'rgba(168, 85, 247, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: activeLang === 'haven' ? '1.5px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.1)',
                color: activeLang === 'haven' ? '#c084fc' : 'var(--text-muted)'
              }}
            >
              <DoveIcon size={14} />
              <span>🕊️ Haven Language v2.0 GA Docs</span>
            </button>

            <button
              onClick={() => setActiveLang('rfcs')}
              className="btn btn-sm"
              style={{
                background: activeLang === 'rfcs' ? 'rgba(251, 191, 36, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: activeLang === 'rfcs' ? '1.5px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                color: activeLang === 'rfcs' ? '#fbbf24' : 'var(--text-muted)'
              }}
            >
              <BookOpenIcon size={14} />
              <span>📐 ODCS 4-Layer RFC Specs</span>
            </button>
          </div>

          {/* Quick Download Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => downloadDocsMarkdown('all')}
              className="btn btn-secondary btn-sm"
            >
              <DownloadIcon size={13} />
              <span>Download Docs (.md)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: STAR PROGRAMMING LANGUAGE COMPLETE PUBLIC MANUAL */}
        {activeLang === 'star' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Sub-navigation bar inside Star */}
            <div style={{
              display: 'flex',
              gap: '0.45rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {[
                { id: 'overview', label: '1. Overview & WASM' },
                { id: 'ui_primitives', label: '2. UI Primitives Catalog' },
                { id: 'state', label: '3. Signals & Reactive State' },
                { id: 'wasm', label: '4. WebAssembly Engine' },
                { id: 'cli', label: '5. Toolchain CLI Handbook' }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setStarSection(sec.id)}
                  style={{
                    background: starSection === sec.id ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: starSection === sec.id ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: starSection === sec.id ? '#00f0ff' : 'var(--text-dim)',
                    borderRadius: '8px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Sub-section 1: Overview */}
            {starSection === 'overview' && (
              <div>
                <div style={{
                  background: 'rgba(0, 240, 255, 0.06)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#00f0ff', marginBottom: '0.35rem' }}>
                    ⭐ Chapter 1: The Sovereign Declarative Paradigm
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                    The <strong>Star Programming Language</strong> is engineered from first principles for single-frame local authority. Unlike legacy frameworks (React, Angular) that suffer from Virtual DOM re-render churn and network waterfalls, Star compiles declarative UI trees directly into WebAssembly (<strong>app.wasm</strong>), running at a guaranteed 60 FPS under sub-16ms frame budgets.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.2rem' }}>
                    <div style={{ color: '#00f0ff', fontWeight: 800, marginBottom: '0.35rem' }}>Zero Virtual DOM</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Direct memory writes execute mutations instantly in display memory without diffing or reconciliation passes.</p>
                  </div>
                  <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.2rem' }}>
                    <div style={{ color: '#00f0ff', fontWeight: 800, marginBottom: '0.35rem' }}>Native WebAssembly Target</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Compiles to a compact 5.0 KB WebAssembly binary (app.wasm) with a universal host bridge runtime (Star.js).</p>
                  </div>
                  <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.2rem' }}>
                    <div style={{ color: '#00f0ff', fontWeight: 800, marginBottom: '0.35rem' }}>Zero Cloud Dependencies</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Reads and writes execute locally against client NVMe / IndexedDB Write-Ahead Logs before touching sockets.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-section 2: UI Primitives */}
            {starSection === 'ui_primitives' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  🎨 Chapter 2: Built-In Star UI Component Catalog
                </h3>
                <div className="table-scroll-container" style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', overflowX: 'auto', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#00f0ff' }}>Primitive</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#ffffff' }}>Syntax Signature</th>
                        <th style={{ padding: '0.75rem 1rem', color: 'var(--text-dim)' }}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'UI.title', sig: 'UI.title(text, level, [options])', desc: 'Renders semantic headings (H1-H4) with theme styling and glowing color overrides.' },
                        { name: 'UI.badge', sig: 'UI.badge(label, variant)', desc: 'Capsule status badges ("primary", "success", "warning", "accent", "danger").' },
                        { name: 'UI.card', sig: 'UI.card(...children)', desc: 'Glassmorphic card surface with 1px border glow and depth shadows.' },
                        { name: 'UI.row', sig: 'UI.row(...children)', desc: 'Responsive flexbox row with automatic column wrapping and gap distribution.' },
                        { name: 'UI.column', sig: 'UI.column(...children)', desc: 'Vertical layout container for structured form fields and stacked elements.' },
                        { name: 'UI.button', sig: 'UI.button(label, handler, [options])', desc: 'Single-frame interactive button with zero-lag tactile click response.' },
                        { name: 'UI.stat', sig: 'UI.stat(value, label, [trend])', desc: 'Telemetry HUD metric card displaying real-time counter and trend direction.' },
                        { name: 'UI.divider', sig: 'UI.divider()', desc: 'Horizontal subtle border separating logical application layers.' },
                        { name: 'UI.spacer', sig: 'UI.spacer()', desc: 'Flex-grow spacer pushing adjacent elements to opposite edges.' }
                      ].map((p, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '0.65rem 1rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700 }}>{p.name}</td>
                          <td style={{ padding: '0.65rem 1rem', fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>{p.sig}</td>
                          <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-section 3: Signals & Reactive State */}
            {starSection === 'state' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  ⚡ Chapter 3: Signals &amp; Fine-Grained Reactive State
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  In Star, state variables are defined using the <code style={{ color: '#00f0ff' }}>variable</code> keyword. When a variable is mutated, only the specific DOM nodes reading that variable update within the next 16ms animation frame.
                </p>
                <div style={{ background: '#030712', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '10px', padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#38bdf8' }}>
                  <pre style={{ margin: 0 }}>
{`use UI

app CounterAuthority
    # Fine-grained reactive state
    variable _counter = 0
    variable _status = "LOCAL_ACTIVE"

    define increment():
        _counter = _counter + 1
        _status = "MUTATION_RECORDED"

    UI.row(
        UI.stat(_counter, "Total Staged Intents"),
        UI.button("Pulse Intent (+1)", increment)
    )`}
                  </pre>
                </div>
              </div>
            )}

            {/* Sub-section 4: WASM Engine */}
            {starSection === 'wasm' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  ⚙️ Chapter 4: Star WebAssembly (<code style={{ color: '#00f0ff' }}>app.wasm</code>) Compilation Pipeline
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  The Star compiler translates AST node graphs into compact bytecode (<code style={{ color: '#38bdf8' }}>main.starb</code>) and then links into binary WebAssembly:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ color: '#00f0ff', fontWeight: 800 }}>Stage 1: main.star</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '0.35rem' }}>Declarative Star UI Source</div>
                  </div>
                  <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ color: '#a855f7', fontWeight: 800 }}>Stage 2: main.starb</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '0.35rem' }}>Compact Bytecode Binary (14 KB)</div>
                  </div>
                  <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ color: '#10b981', fontWeight: 800 }}>Stage 3: app.wasm</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '0.35rem' }}>Deployable WebAssembly Core (5.0 KB)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-section 5: CLI Handbook */}
            {starSection === 'cli' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  💻 Chapter 5: Star Language CLI Toolchain Handbook
                </h3>
                <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1rem' }}>
                  {[
                    { cmd: 'star check main.star', desc: 'Validates Star syntax and produces AST diagnostics.' },
                    { cmd: 'star compile main.star', desc: 'Compiles Star source code to optimized bytecode (main.starb).' },
                    { cmd: 'star build web', desc: 'Compiles WebAssembly app.wasm and copies host bridge Star.js to build/web/.' },
                    { cmd: 'star preview main.star', desc: 'Launches local live terminal TUI preview for testing components.' },
                    { cmd: 'star doctor', desc: 'Runs toolchain environment diagnostics and validates PATH registrations.' }
                  ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <code style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>$ {c.cmd}</code>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Reference Code for main.star */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Authoritative Reference Implementation: <code style={{ color: '#00f0ff' }}>main.star</code>
                </h4>
                <button
                  onClick={() => copyCode(starSampleCode)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    background: copiedCode ? '#10b981' : 'rgba(0, 240, 255, 0.15)',
                    borderColor: copiedCode ? '#10b981' : 'rgba(0, 240, 255, 0.4)',
                    color: copiedCode ? '#020617' : '#00f0ff'
                  }}
                >
                  {copiedCode ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                  <span>{copiedCode ? 'COPIED' : 'COPY STAR SOURCE'}</span>
                </button>
              </div>

              <div style={{
                background: '#030712',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                borderRadius: '10px',
                padding: '1.25rem',
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                maxHeight: '380px',
                overflowY: 'auto'
              }}>
                <pre style={{ color: '#38bdf8', margin: 0 }}>
                  {starSampleCode}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HAVEN LANGUAGE COMPLETE PUBLIC MANUAL */}
        {activeLang === 'haven' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Sub-navigation bar inside Haven */}
            <div style={{
              display: 'flex',
              gap: '0.45rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {[
                { id: 'overview', label: '1. English Philosophy' },
                { id: 'grammar', label: '2. Natural Grammar Table' },
                { id: 'pipelines', label: '3. Pipelines (|>) & Records' },
                { id: 'stdlib', label: '4. Cryptographic Stdlib' },
                { id: 'examples', label: '5. Production Examples' }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setHavenSection(sec.id)}
                  style={{
                    background: havenSection === sec.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                    border: havenSection === sec.id ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: havenSection === sec.id ? '#c084fc' : 'var(--text-dim)',
                    borderRadius: '8px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Sub-section 1: Overview */}
            {havenSection === 'overview' && (
              <div>
                <div style={{
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.35rem' }}>
                    🕊️ Chapter 1: Natural English Systems Programming
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                    <strong>Haven (Heaven Language v2.0)</strong> is designed so engineers can read and write sovereign, partition-tolerant backend software like <strong>plain English</strong>, while having cryptographic immutability, Merkle trees, and CRDT primitives built directly into bytecode.
                  </p>
                </div>
              </div>
            )}

            {/* Sub-section 2: Grammar Table */}
            {havenSection === 'grammar' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  🗣️ Chapter 2: Natural English Statements &amp; Keywords
                </h3>
                <div className="table-scroll-container" style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', overflowX: 'auto', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#c084fc' }}>Construct</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#00f0ff' }}>Haven English Expression</th>
                        <th style={{ padding: '0.75rem 1rem', color: 'var(--text-dim)' }}>Traditional Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Variable Binding', haven: 'set node to "BLR-01" / let port be 8000', trad: 'node = "BLR-01"' },
                        { name: 'Number Modification', haven: 'increase replicas by 2 / decrease quota by 1', trad: 'replicas += 2' },
                        { name: 'Console Output', haven: 'say "Node {node} active" / show status', trad: 'print(f"Node {node} active")' },
                        { name: 'Repeat Loop', haven: 'repeat 5 times: (provides iteration)', trad: 'for iteration in range(1, 6):' },
                        { name: 'Collection Loop', haven: 'for each peer in peers:', trad: 'for peer in peers:' },
                        { name: 'Conditionals', haven: 'whenever latency is less than 50: / unless offline:', trad: 'if latency < 50: / if not offline:' },
                        { name: 'Invariants / Asserts', haven: 'ensure height >= 0 otherwise "Negative height"', trad: 'assert height >= 0, "..."' },
                        { name: 'Resilience Recovery', haven: 'try: ... on error as err: say "Recovered"', trad: 'try: ... except Exception as err:' },
                        { name: 'Functions', haven: 'define sync_peer(peer): give back true', trad: 'def sync_peer(peer): return True' }
                      ].map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '0.65rem 1rem', fontWeight: 700, color: '#fff' }}>{row.name}</td>
                          <td style={{ padding: '0.65rem 1rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{row.haven}</td>
                          <td style={{ padding: '0.65rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{row.trad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-section 3: Pipelines & Records */}
            {havenSection === 'pipelines' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  ⛓️ Chapter 3: Left-to-Right Pipelines (<code style={{ color: '#c084fc' }}>|&gt;</code>) and Durable Records
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ background: '#030712', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '10px', padding: '1.2rem', minWidth: 0 }}>
                    <h4 style={{ color: '#c084fc', marginBottom: '0.5rem' }}>Pipeline Operator (|&gt;)</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chain transformations cleanly from top to bottom with the <code style={{ color: '#c084fc' }}>_</code> placeholder:</p>
                    <pre style={{ fontSize: '0.76rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
{`set digest = raw_payload
    |> trim(_)
    |> uppercase(_)
    |> seal_hash(_)
    |> show(_)`}
                    </pre>
                  </div>

                  <div style={{ background: '#030712', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '10px', padding: '1.2rem', minWidth: 0 }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Durable Immutable Records</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cryptographically sealed structures that throw on mutation:</p>
                    <pre style={{ fontSize: '0.76rem', color: '#fbbf24', fontFamily: 'var(--font-mono)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
{`durable record MedicalEvent:
    event_id: String
    heart_rate: Integer

set ev = MedicalEvent("EV-1", 72)
say ev.odcs_hash()`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-section 4: Standard Library */}
            {havenSection === 'stdlib' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                  🛡️ Chapter 4: Cryptographic Standard Library Reference
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                  gap: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  {[
                    { fn: 'seal_hash(val)', desc: 'Computes SHA-256 seal digest over Canonical RFC 8785 representation.' },
                    { fn: 'canonical_json(obj)', desc: 'Deterministic key-sorted JSON serializer matching C-substrate.' },
                    { fn: 'merkle_root(list)', desc: 'Computes cryptographic binary Merkle tree root hash from leaf digests.' },
                    { fn: 'uuid7()', desc: 'Monotonically ordered UUIDv7 generator embedding millisecond epoch.' },
                    { fn: 'PNCounter(id)', desc: 'Positive-Negative conflict-free counter for peer mesh replication.' },
                    { fn: 'ContinuityLedger.open(uri)', desc: 'Mounts local append-only Write-Ahead Log journal.' },
                    { fn: 'TelemetryProbe.classify(rtt, loss)', desc: 'Classifies network resilience mode.' }
                  ].map((s, idx) => (
                    <div key={idx} style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '1rem' }}>
                      <div style={{ color: '#c084fc', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.84rem' }}>{s.fn}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-section 5: Examples */}
            {havenSection === 'examples' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Official Production Scripts ({havenExamples.length} Runnable Files)
                  </h4>
                  <button
                    onClick={() => copyCode(havenExamples[activeHavenExample].code)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      background: copiedCode ? '#10b981' : 'rgba(168, 85, 247, 0.15)',
                      borderColor: copiedCode ? '#10b981' : 'rgba(168, 85, 247, 0.45)',
                      color: copiedCode ? '#020617' : '#c084fc'
                    }}
                  >
                    {copiedCode ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                    <span>{copiedCode ? 'COPIED' : 'COPY SCRIPT'}</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                  {havenExamples.map((ex, idx) => (
                    <button
                      key={ex.name}
                      onClick={() => setActiveHavenExample(idx)}
                      style={{
                        background: activeHavenExample === idx ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: activeHavenExample === idx ? '1px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: activeHavenExample === idx ? '#c084fc' : 'var(--text-dim)',
                        borderRadius: '8px',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {ex.name}
                    </button>
                  ))}
                </div>

                <div style={{
                  background: '#030712',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  maxHeight: '380px',
                  overflowY: 'auto'
                }}>
                  <div style={{ color: '#fbbf24', fontSize: '0.74rem', marginBottom: '0.5rem' }}>
                    // {havenExamples[activeHavenExample].title}
                  </div>
                  <pre style={{ color: '#c084fc', margin: 0 }}>
                    {havenExamples[activeHavenExample].code}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ODCS RFC SPECIFICATIONS */}
        {activeLang === 'rfcs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.25rem' }}>
                📐 ODCS Standards Track RFCs (ODCS-2.0.0 GA)
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                Formal mathematical invariants for digital continuity across offline blackouts and transport outages.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>RFC-101</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>Zero Intent Loss (ZIL)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Sub-16ms single-frame local authority requirement. User actions achieve local cryptographic immutability before any socket attempt.
                </p>
              </div>

              <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>RFC-102</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>Durable Merkle WAL</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Monotonic append-only Write-Ahead Log using RFC 8785 Canonical JSON and SHA-256 Merkle proofs, guaranteeing bit-for-bit replay.
                </p>
              </div>

              <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>RFC-103</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>Algebraic CRDT Mesh</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Commutative state replication. PN-Counters and Add-Wins Observed-Removed Sets merge monotonically over BLE, LoRa, or WAN.
                </p>
              </div>

              <div style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>RFC-104</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>Adaptive Telemetry</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Continuous environmental probes sense RTT, jitter, and carrier waves, dynamically throttling replication with exponential backoff.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
