'use client';

import React, { useState } from 'react';
import { CopyIcon, CheckIcon, ZapIcon, SmartphoneIcon, DownloadIcon } from './Icons';

export default function EnglishStudio() {
  const [inputText, setInputText] = useState("Create a mobile dashboard with an app bar titled 'Emergency Field Ops', a status card for 'Vitals Link: SEVERED', a metric 'ZIL Budget: < 0.15ms', and an action button 'Commit Offline Encounter'");
  const [activeTab, setActiveTab] = useState('ui');
  const [activePreset, setActivePreset] = useState('triage');
  const [copied, setCopied] = useState(false);
  const [zilFeedback, setZilFeedback] = useState('⏱️ Single-Frame Authority: < 0.12ms');

  const presets = {
    triage: {
      label: '📱 Mobile Telemetry Dashboard',
      text: "Create a mobile dashboard with an app bar titled 'Emergency Field Ops', a status card for 'Vitals Link: SEVERED', a metric 'ZIL Budget: < 0.15ms', and an action button 'Commit Offline Encounter'"
    },
    gateway: {
      label: '🌐 Continuity Gateway API',
      text: "Build a continuity gateway with an app bar titled 'ODCS Satellite Gateway', a status card for 'Link: ORBITAL JITTER', a metric 'Latency: 480ms (Mesh SEC)', and an action button 'Trigger CRDT Delta Sync'"
    },
    iot_mesh: {
      label: '🛰️ Satellite Mesh Node',
      text: "Setup an IoT node with an app bar titled 'Field Sensor Array', a status card for 'Consensus: CONVERGED', a metric 'Vector Clock: 512 Units', and an action button 'Seal Telemetry Record'"
    },
    pos: {
      label: '🛒 Off-Grid Checkout',
      text: "Create an off-grid checkout terminal with an app bar titled 'Disaster Relief Store', a status card for 'Network: 100% BLACKOUT', a metric 'Local WAL: 48 Blocks', and an action button 'Process Offline Ledger'"
    }
  };

  const loadPreset = (key) => {
    setActivePreset(key);
    setInputText(presets[key].text);
  };

  const simulateAction = (label) => {
    const hash = 'zil_' + Math.random().toString(16).slice(2, 10);
    setZilFeedback(`✓ Minted ${label}: ${hash} (0.11ms)`);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generated code templates
  const starUiCode = `# Sovereign Star Declarative UI — Compiled from Natural-English
# Standard: ODCS-2.0.0 · Dual-Engine Architecture

use UI

app ContinuityApp
    variable _operating_mode = "OPTIMAL_ONLINE"
    variable _zil_counter = 42

    AppBar(title = "Emergency Field Ops", elevation = 0)

    Column(padding = 16)
        Card(elevation = 2)
            Row(alignment = "spaceBetween")
                Text("Vitals Link: SEVERED", style = "headline6")
                Badge("L4_ZIL", color = "crimson")
            end
            Text("ZIL Budget: < 0.15ms", style = "caption")
        end

        Spacer(height = 12)

        Button("Commit Offline Encounter", onClick = function()
            _zil_counter = _zil_counter + 1
            mint_intent_receipt("Commit Offline Encounter")
        end)
    end
end`;

  const starBackendCode = `# Haven / Star Sovereign Continuity Backend
# Standard: ODCS-2.0.0 · RFC 8785 Canonical JSON Verification

use ContinuityLedger
use CRDT

record EmergencyEncounter
    encounter_id: String
    vital_status: String
    sealed_ms: Integer
end

define commit_offline_encounter(payload):
    let receipt = ZeroIntentLoss.preserve(payload, actor = "star-client")
    ContinuityLedger.checkpoint(receipt, label = "triage_vital")
    CRDT.increment_vector_clock(node_id = "alpha-01")
    give back receipt
end`;

  return (
    <section id="english-studio" style={{ marginBottom: '5rem' }}>
      <div className="section-header">
        <span className="section-tag" style={{ background: 'rgba(168, 85, 247, 0.15)', borderColor: 'rgba(168, 85, 247, 0.4)', color: '#c084fc' }}>
          Natural-English Compiler · ODCS-2.0.0
        </span>
        <h2 className="section-title">🗣️ Real English Sentences ➔ Star UI &amp; Star Backend</h2>
        <p className="section-desc">
          Type plain, normal English sentences to generate verified <strong>Star Declarative UI code</strong>, sovereign <strong>Haven/Star backend logic</strong>, and live interactive UI previews in real time.
        </p>
      </div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1rem, 2.5vw, 1.75rem)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(168, 85, 247, 0.15)'
      }}>
        {/* Prompt Input Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#c084fc' }}>
            <span>💬 ENTER NORMAL ENGLISH SENTENCE(S):</span>
            <span className="badge badge-emerald">VALID SYNTAX READY</span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              background: 'rgba(3, 7, 18, 0.75)',
              border: '1.5px solid rgba(168, 85, 247, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '0.95rem 1.15rem',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              resize: 'vertical',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />

          {/* Quick Presets */}
          <div style={{
            display: 'flex',
            gap: '0.45rem',
            overflowX: 'auto',
            paddingBottom: '0.35rem',
            WebkitOverflowScrolling: 'touch'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center', whiteSpace: 'nowrap' }}>Presets:</span>
            {Object.keys(presets).map(key => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                style={{
                  background: activePreset === key ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: activePreset === key ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: activePreset === key ? '#e9d5ff' : 'var(--text-dim)',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {presets[key].label}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            <button className="btn btn-violet btn-sm" onClick={() => simulateAction('Compile')}>
              <ZapIcon size={13} />
              <span>✨ Generate Star UI &amp; Backend</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => simulateAction('Action')}>
              <span>⚡ Run Live Simulator</span>
            </button>
            <div style={{ marginLeft: 'auto', fontSize: '0.76rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              {zilFeedback}
            </div>
          </div>
        </div>

        {/* Tabbed Code & Preview Output */}
        <div style={{
          background: 'rgba(3, 7, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-md)',
          padding: '1.15rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '0.65rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto' }}>
              <button
                onClick={() => setActiveTab('ui')}
                style={{
                  background: activeTab === 'ui' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                  border: activeTab === 'ui' ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'ui' ? '#00f0ff' : 'var(--text-dim)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                ⭐ Star Declarative UI (.star)
              </button>
              <button
                onClick={() => setActiveTab('backend')}
                style={{
                  background: activeTab === 'backend' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  border: activeTab === 'backend' ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'backend' ? '#c084fc' : 'var(--text-dim)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                🕊️ Star &amp; Haven Backend (.star / .hvn)
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                style={{
                  background: activeTab === 'preview' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: activeTab === 'preview' ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'preview' ? '#10b981' : 'var(--text-dim)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                📱 Live Phone Preview
              </button>
            </div>

            <button
              onClick={() => copyCode(activeTab === 'ui' ? starUiCode : starBackendCode)}
              style={{
                background: copied ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                border: copied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                color: copied ? '#020617' : '#ffffff',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
            </button>
          </div>

          {/* Panel Content */}
          {activeTab === 'ui' && (
            <pre style={{ margin: 0, maxHeight: '340px', overflowY: 'auto' }} className="code-pre">
              {starUiCode}
            </pre>
          )}

          {activeTab === 'backend' && (
            <pre style={{ margin: 0, maxHeight: '340px', overflowY: 'auto', color: '#c084fc' }} className="code-pre">
              {starBackendCode}
            </pre>
          )}

          {activeTab === 'preview' && (
            <div style={{
              maxWidth: '340px',
              margin: '0 auto',
              background: '#030712',
              border: '3px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '32px',
              padding: '1rem 0.85rem 1.5rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.2)'
            }}>
              {/* Phone Notch */}
              <div style={{
                width: '100px',
                height: '16px',
                background: '#0f172a',
                borderRadius: '0 0 10px 10px',
                margin: '-1rem auto 0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1e293b' }} />
                <div style={{ width: '35px', height: '4px', borderRadius: '2px', background: '#334155' }} />
              </div>

              {/* Dynamic UI Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.25)', paddingBottom: '0.5rem' }}>
                  <div>
                    <span className="badge badge-cyan" style={{ fontSize: '0.62rem', marginBottom: '0.2rem' }}>STAR RUNTIME</span>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: 800 }}>Emergency Field Ops</h4>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>60 FPS</span>
                </div>

                <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '10px', padding: '0.75rem' }}>
                  <span className="badge badge-rose" style={{ fontSize: '0.6rem' }}>STAGE 1 ZIL</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>Vitals Link: SEVERED</div>
                  <div style={{ fontSize: '0.78rem', color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>ZIL Budget: &lt; 0.15ms</div>
                </div>

                <button 
                  onClick={() => simulateAction('Commit Offline Encounter')}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', fontSize: '0.82rem' }}
                >
                  ⚡ Commit Offline Encounter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
