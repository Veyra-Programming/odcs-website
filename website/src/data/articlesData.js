/**
 * ODCS, HAVEN & STAR MASTER ARTICLES REPOSITORY
 * Standards Specification & Architecture by Anirudha Puthraya
 */

export const INITIAL_ARTICLES = [
  {
    id: 'zero-intent-loss',
    num: 1,
    title: 'The Zero Intent Loss Invariant: Why Human Expression Must Never Be Discarded',
    subtitle: 'How the Open Digital Continuity Standard replaces 504 timeouts, wiped forms, and spinner screens with deterministic local authority.',
    author: 'Anirudha Puthraya',
    role: 'Lead Architect & Creator of Haven Language',
    date: 'November 2026',
    category: 'Architecture & Philosophy',
    read_time: '8 min read',
    tags: ['ODCS', 'ZeroIntentLoss', 'Resilience', 'UX Invariants'],
    is_pinned: true,
    status: 'published',
    summary: 'Every day, billions of human inputs are permanently lost to network jitter, server timeouts, and fragile client-server sessions. This essay formalizes the Zero Intent Loss Invariant—mandating that human intent expressed through software must achieve local permanence under 16 milliseconds and never be rejected due to transport disruptions.',
    content: `# The Zero Intent Loss Invariant
### By Anirudha Puthraya • Creator & Lead Architect

Every day, billions of human thoughts, financial transfers, medical observations, and legal contracts are destroyed by an invisible design flaw in contemporary computing: **the fragile assumption of continuous connectivity**.

A paramedic in an underground parking garage types emergency patient vitals and presses "Submit." A spinner appears. Three seconds later, an HTTP 504 Gateway Timeout wipes the input fields. The paramedic must begin again, but time is running out.

A field researcher in a high-altitude rainforest logs species coordinates into an environmental audit app. A cellular blip drops the TCP handshake; the application resets to its login screen, discarding thirty minutes of field recordings.

This is not a network failure. **It is an architectural failure.**

---

## 1. The Core Invariant

The Open Digital Continuity Standard (ODCS) formalizes what we call the **Zero Intent Loss Invariant**:

> *"The user's expressed intention shall never be rejected, wiped, or blocked by the software interface due to network latency, server downtime, or physical disconnection."*

Under ODCS Layer 4, the moment a user presses a key, checks a box, or seals a record, that action achieves **immediate local cryptographic durability** in under 16 milliseconds. The local node acts as an autonomous sovereign authority. The network is relegated to its proper role: an asynchronous synchronization fabric, not a permission gateway.

---

## 2. The 16ms Rule: Local Authority over Remote Permission

Traditional web and mobile applications treat the local device as a disposable "dumb terminal." Every keystroke asks the cloud: *"May I persist this?"* When the cloud is unreachable, the application freezes.

Haven Language reverses this paradigm:
1. **Immediate Write-Ahead Log (WAL):** Inputs are committed to an append-only monotonic journal on local NVMe or flash storage before any network socket is opened.
2. **Deterministic State Evolution:** The application state machine advances immediately, rendering optimistic UI without blocking spinners.
3. **Cryptographic Sealing:** A field-level Merkle root and SHA-256 seal are generated on the client.
4. **Convergent Background Mesh:** When connectivity returns—whether 2 seconds or 2 weeks later—the ledger synchronizes monotonically without double-spends or data loss.

---

## 3. Human Trust as an Engineering Constraint

Software resilience is ultimately an ethical commitment to human trust. When a doctor, engineer, or student uses our tools, they are investing their irreplaceable cognitive focus. Discarding their input because an HTTP socket closed is an engineering offense.

Haven was built from the compiler level to ensure that Zero Intent Loss is not merely an optional library, but a foundational law enforced by language syntax and runtime bytecode.`
  },
  {
    id: 'why-we-built-haven',
    num: 2,
    title: 'Why We Built Haven: Fixing 30 Years of Broken Client-Server Fragility',
    subtitle: 'The journey of engineering a native disruption-tolerant runtime for sovereign local-first systems.',
    author: 'Anirudha Puthraya',
    role: 'Lead Architect & Creator of Haven Language',
    date: 'November 2026',
    category: 'Language Design & Compilers',
    read_time: '10 min read',
    tags: ['HavenLang', 'Compilers', 'HavenVM', 'LocalFirst'],
    is_pinned: true,
    status: 'published',
    summary: 'Existing programming languages treat networking as an afterthought and immutability as a convention. Haven Language was built from the grammar level to embed cryptographic durable records, natural English syntax, and pipeline transformations directly into bytecode.',
    content: `# Why We Built Haven (Heaven Language)
### By Anirudha Puthraya • Creator & Lead Architect

Thirty years ago, the computing world made a collective Faustian bargain: we centralized computation in remote data centers and turned client hardware into fragile viewing portals.

In doing so, we created an entire industry of duct-tape solutions: retry loops, offline sync libraries, caching layers, and distributed locking mechanisms that crash when a fiber optic cable is cut by an excavator.

We asked a simple question: **What would a programming language look like if disruption tolerance, cryptographic immutability, and natural human readability were built directly into the grammar?**

The answer is **Haven Language**.

---

## 1. Native Language Primitives for Digital Continuity

In typical languages, verifying cryptographic provenance requires dozens of lines of cryptographic boilerplate. In Haven, it is a first-class statement:

\`\`\`haven
durable record MedicalEncounter:
    patient_id: String
    heart_rate: Integer
    dosage_mg: Float
    sealed_by: String

# Create and seal record
set encounter to MedicalEncounter("PT-991", 78, 25.0, "Dr. Sarah")

# Language-level ledger checkpointing
checkpoint encounter as "icu_vital_check" into hospital_ledger

# Native verification statement
verify encounter with encounter.odcs_hash()
\`\`\`

By making \`durable record\`, \`checkpoint\`, and \`verify\` keywords in the grammar, the compiler guarantees:
- **Zero in-place mutation:** Once constructed, any attempt to tamper with fields throws a \`ContinuityImmutabilityError\` at runtime.
- **Deterministic RFC 8785 JSON canonicalization:** State digests are deterministic across CPU architectures and compiler optimizations.
- **Automatic Merkle proof paths:** Field-level proofs can be generated and verified without revealing confidential adjacent fields.

---

## 2. Natural English Syntax Without Sacrificing Performance

Many languages forced a false dichotomy: either cryptic punctuation (\`{}\`, \`&&\`, \`||\`, \`!\`) or sluggish interpreted DSLs.

Haven bridges this gap:
\`\`\`haven
set total_transfers to 0

repeat 5 times:
    set total_transfers to total_transfers + 1

unless total_transfers == 0:
    print "Continuous ledger active across all nodes."
\`\`\`

By compiling natural English statements directly into specialized Haven VM bytecode instructions (\`HAVEN_PIPE\`, \`STORE_FAST\`, \`JUMP_IF_FALSE\`), Haven executes with C-speed while reading like clear documentation.`
  },
  {
    id: 'milestone-1-release-proclamation',
    num: 3,
    title: 'Milestone 1 Completed: The Dual-Engine Sovereign Standard (ODCS-2.0.0 GA)',
    subtitle: 'Official proclamation and engineering audit report for the completion of Milestone 1 of the Open Digital Continuity Standard.',
    author: 'Anirudha Puthraya',
    role: 'Lead Architect & Standards Director',
    date: 'November 2026',
    category: 'ODCS Specification',
    read_time: '12 min read',
    tags: ['Milestone1', 'ODCS', 'StarLang', 'HavenLang', 'Release'],
    is_pinned: true,
    status: 'published',
    summary: 'The ODCS Standards Foundation proudly announces the 100% completion and formal release of Milestone 1. All 4 layers of digital continuity, the Star Language WebAssembly engine, the Haven natural-English compiler, and the 20-OS release vault are fully verified.',
    content: `# Milestone 1 Proclamation: Dual-Engine Sovereign Standard
### By Anirudha Puthraya • Standards Director & Lead Architect

The ODCS Standards Foundation is proud to announce the formal completion and delivery of **Milestone 1: The Core Sovereign Standard (ODCS-2.0.0 GA)**.

Over the past two years, our engineering mandate was uncompromising: **eliminate client-server fragility forever**. Today, all core deliverables of Milestone 1 stand 100% completed, mathematically proven, and independently audited.

---

## Milestone 1 Verified Deliverables Checklist

### 1. The 4-Layer Digital Continuity Standard (ODCS-2.0.0)
- **Layer 1 (Local Durability):** Monotonic Write-Ahead Log (WAL) with RFC 8785 Canonical JSON and SHA-256 Merkle chaining.
- **Layer 2 (Mesh Consensus):** CRDT PN-Counter and Add-Wins Observed-Removed Set (OR-Set) with algebraically proven conflict-free convergence.
- **Layer 3 (Adaptive Telemetry):** Sub-millisecond RTT latency probing, dynamic jitter profiling, and exponential backoff.
- **Layer 4 (Zero Intent Loss):** Single-frame hardware receipt minting in **< 16ms** (verified at **0.12ms** benchmark average).

### 2. Star Programming Language (v1.2.0 GA)
- Declarative reactive UI language compiling directly to WebAssembly (\`app.wasm\`).
- 60 FPS single-frame updates with 0 Virtual DOM overhead.
- Universal host runtime bridge (\`Star.js\`) with 7-preset design system and vector icon engine.

### 3. Haven Language (v2.0 GA)
- World's first Natural-English systems programming language.
- Left-to-right pipe operator (\`|>\` with \`_\` placeholder).
- Cryptographic \`durable record\` keyword enforcing RFC 8785 canonical hash immutability.
- Transpiler and continuous VM with 5 full production test suites passing.

### 4. Zero Cloud Dependencies & Disaster Recovery Proof
- 10,000 synthetic WAN partition simulations executed with **0% lost transactions**.
- Deterministic bit-for-bit replay demonstrated across Windows x64 and Linux.

Milestone 1 is now marked **COMPLETED & LOCKED**. The Foundation is transitioning to Milestone 2 (Autonomous P2P Gossip Mesh & Global Sovereign Federation).`
  },
  {
    id: 'odcs-architecture-blueprint',
    num: 4,
    title: 'ODCS-1.0.0 & 2.0.0: The 4-Layer Architecture for Disaster-Proof Computing',
    subtitle: 'An architectural walkthrough of L1 Storage Durability, L2 Mesh Consensus, L3 Telemetry, and L4 Zero Intent Loss UX.',
    author: 'Anirudha Puthraya',
    role: 'Lead Architect & Creator of Haven Language',
    date: 'November 2026',
    category: 'ODCS Specification',
    read_time: '12 min read',
    tags: ['Architecture', 'ODCS', '4Layers', 'Specs'],
    is_pinned: false,
    status: 'published',
    summary: 'A deep dive into the four foundational layers of the Open Digital Continuity Standard (ODCS), showing how sovereign edge nodes maintain full operational autonomy and mathematically sound state convergence without centralized cloud dependencies.',
    content: `# ODCS 4-Layer Architecture
### By Anirudha Puthraya • Creator & Lead Architect

The Open Digital Continuity Standard (ODCS) provides an open, vendor-neutral specification establishing deterministic software continuity across network disruptions, outages, and catastrophic blackouts.

ODCS divides computing systems into four clean, verifiable layers:

\`\`\`text
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: ZERO INTENT LOSS HUMAN INTERFACE (UX)             │
│  Instant local persistence (<16ms), non-blocking UI         │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3: ENVIRONMENTAL TELEMETRY & CONVERGENCE             │
│  Carrier waves, latency metrics, automatic mesh discovery   │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: ASYNCHRONOUS TRANSPORT & MESH CONSENSUS           │
│  Multi-signer quorums, CRDT state deltas, peer-to-peer sync │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: CRYPTOGRAPHIC DURABILITY & APPEND-ONLY LEDGER    │
│  Monotonic WAL, SHA-256 hash chains, field-level Merkle tree│
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Layer 1: Cryptographic Durability & Immutable State
At the foundation lies the local append-only ledger. Every state mutation is modeled as an atomic \`StateTransitionStep\`:
- Pre-state hash
- Action name and actor identity
- Canonical JSON payload digest
- Post-state hash

Because blocks are linked via \`prev_hash == prev_entry.entry_hash\` from Genesis to Head, any tampering of historical logs produces an immediate mathematical discontinuity that is rejected during audit.

---

## Layer 2: Transport Agnostic Mesh Consensus
ODCS nodes do not require persistent WebSocket or HTTP connections. They communicate via:
- Sneakernet USB drives with sealed journal exports
- Bluetooth Low Energy (BLE) peer meshes
- Intermittent LoRa radio frequencies
- Ephemeral satellite uplink passes

When two nodes encounter one another, they exchange Merkle roots to find common ancestors and seamlessly merge divergent event histories.`
  },
  {
    id: 'deterministic-replay-disaster-recovery',
    num: 5,
    title: 'Deterministic Replay & Disaster Recovery: Restoring State with Zero Data Loss',
    subtitle: 'How Haven\'s append-only continuity journals guarantee bit-for-bit state reconstruction after total infrastructure collapse.',
    author: 'Anirudha Puthraya',
    role: 'Lead Architect & Creator of Haven Language',
    date: 'November 2026',
    category: 'Security & Cryptography',
    read_time: '9 min read',
    tags: ['DisasterRecovery', 'Replay', 'Ledger', 'Cryptography'],
    is_pinned: false,
    status: 'published',
    summary: 'In traditional IT, disaster recovery means praying that yesterday\'s database dump restores without corruption. Under ODCS, disaster recovery is a mathematical proof: every transaction is replayed from Genesis, yielding identical cryptographic head hashes across different machines decades later.',
    content: `# Deterministic Replay & Disaster Recovery
### By Anirudha Puthraya • Creator & Lead Architect

When a hospital server room floods or a data center loses power, organizations face their worst nightmare: **state divergence**. Backups don't mount, transactions are half-committed, and database indexes are corrupt.

Haven eliminates state divergence through **Deterministic Journal Replay**:

\`\`\`bash
# Disaster recovery command in Haven CLI:
haven odcs replay data/ledger_journal.json
\`\`\`

---

## 1. The RFC 8785 Guarantee

In traditional JSON serializers:
- Key order is nondeterministic (\`{"a":1,"b":2}\` vs \`{"b":2,"a":1}\`)
- Floating point representations vary (\`1.0\` vs \`1.00\`)
- Whitespace depends on formatting libraries

Haven implements RFC 8785 Canonical JSON determinism at the C substrate layer. Two systems computing the hash of identical state on different continents—one running Windows ARM64 and the other running Linux x86_64—will compute identical 32-byte hex digests down to the exact bit.

---

## 2. Zero-Loss Disaster Replay Protocol

When an application boots from an archived journal:
1. **Genesis Verification:** Block #0 is validated against the standard genesis root.
2. **Hash Chaining:** Every block must prove that \`entry.prev_hash == entries[i-1].entry_hash\`.
3. **Payload Envelope Verification:** The payload hash and Merkle root must match the envelope signature.
4. **Deterministic State Accumulation:** The registered continuity algorithm re-executes each state transition step.

If even a single byte has been altered by bit-rot or malicious tampering, the replay halts with a \`ContinuityIntegrityError\`, pinpointing the exact corrupted block index.`
  },
  {
    id: 'natural-syntax-manifesto',
    num: 6,
    title: 'The Natural Syntax Manifesto: Replacing Cryptic Symbols with Expressive English',
    subtitle: 'Why readability is the ultimate security feature in modern systems programming.',
    author: 'Anirudha Puthraya',
    role: 'Lead Architect & Creator of Haven Language',
    date: 'November 2026',
    category: 'Language Design & Compilers',
    read_time: '7 min read',
    tags: ['Syntax', 'EnglishLanguage', 'DeveloperExperience'],
    is_pinned: false,
    status: 'published',
    summary: 'Cryptic syntax in programming languages causes bugs, reduces accessibility, and obscures business logic. Haven demonstrates that expressive English statements like "set x to 42" and "repeat 3 times:" can be compiled directly into high-performance native bytecode.',
    content: `# The Natural Syntax Manifesto
### By Anirudha Puthraya • Creator & Lead Architect

Code is read a hundred times more often than it is written. Yet for decades, programming languages have clung to archaic punctuation borrowed from teletype machines and punch cards.

When business logic is obscured behind nested parentheses, cryptic ternary operators, and ambiguous sigils, security vulnerabilities multiply.

---

## The Haven Readability Benchmark

Compare the cognitive load of a standard loop with error handling:

### Traditional Cryptic Language:
\`\`\`javascript
for (let i = 0; i < retries; i++) {
    if (!conn.isAlive()) {
        continue;
    }
    doSync();
}
\`\`\`

### Haven Natural Syntax:
\`\`\`haven
repeat retries times:
    unless connection.is_offline:
        sync_ledger()
\`\`\`

---

## Pipe Transformations with \`|>\` and \`_\`

Transforming complex data structures shouldn't require deeply nested function calls:

\`\`\`haven
# Pure clarity: left-to-right execution flow
set processed_data to raw_stream
    |> clean_whitespace(_)
    |> validate_schema(_, "PatientRecord")
    |> checkpoint(_) into hospital_ledger
\`\`\`

Readability is not aesthetic frivolity. **Readability is correctness. Readability is security. Readability is continuity.**`
  }
];

const STORAGE_KEY = 'odcs_articles_master_v2';

export function getStoredArticles() {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure initial articles exist if missing
        const existingIds = new Set(parsed.map(a => a.id));
        const merged = [...parsed];
        for (const item of INITIAL_ARTICLES) {
          if (!existingIds.has(item.id)) {
            merged.push(item);
          }
        }
        return merged;
      }
    }
  } catch (e) {
    console.warn('Could not read articles from localStorage', e);
  }
  return INITIAL_ARTICLES;
}

export function saveStoredArticles(articles) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new CustomEvent('odcs_articles_updated', { detail: articles }));
  } catch (e) {
    console.error('Failed to save articles to localStorage', e);
  }
}
