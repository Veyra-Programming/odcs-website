/**
 * ==============================================================================
 * 🏛️ ODCS Institutional Administrator Cockpit
 * Unrestricted Authority & Article Publishing Studio
 * Designed for Star & Haven Dual-Engine Standard Architecture
 * Architect: Anirudha Puthraya · Veyra-Programming
 * ==============================================================================
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. UNRESTRICTED PERMISSION ENGINE
  // ============================================================================
  const ADMIN_SESSION = {
    user: 'Anirudha Puthraya',
    role: 'STANDARDS_DIRECTOR_ROOT',
    permissions: 'ALL_UNRESTRICTED',
    accessLevel: 'ROOT_RING_0',
    authenticated: true
  };

  console.log('✓ ODCS Admin Cockpit: Unrestricted root privileges granted to', ADMIN_SESSION.user);

  // ============================================================================
  // 2. MASTER ARTICLES DATASET & LOCAL STORAGE PERSISTENCE
  // ============================================================================
  const STORAGE_KEY = 'ODCS_ADMIN_ARTICLES_v3';

  const DEFAULT_ARTICLES = [
  {
    "id": "star-haven-full-spec",
    "num": 1,
    "title": "The Sovereign Dual-Engine Architecture: Full Specification of Star Language & Haven Language",
    "subtitle": "From Declarative 60 FPS WebAssembly UI to Natural-English Zero-Intent-Loss Continuity Backends (All 235 Star Modules & Haven Subsystems).",
    "author": "Anirudha Puthraya",
    "role": "Standards Director & Creator",
    "date": "November 2026",
    "category": "Dual-Engine Specification",
    "read_time": "18 min read",
    "tags": [
      "StarLang",
      "HavenLang",
      "ODCS-2.0",
      "Packages",
      "ZeroIntentLoss",
      "WASM"
    ],
    "summary": "The authoritative technical specification of the ODCS Dual-Engine standard. Covers all 18 Star packages (235 modules), Haven natural-English grammar and continuity subsystems, and the official announcement of the upcoming Star and Haven sovereign package managers.",
    "content": "# The Sovereign Dual-Engine Architecture: Full Specification of Star Language & Haven Language\n### By Anirudha Puthraya \u2022 Standards Director, Author & Maintainer\n\n> **\ud83d\udce6 OFFICIAL ANNOUNCEMENT: SOVEREIGN PACKAGE MANAGERS COMING SOON!**\n> Decentralized package managers for both ecosystems (`star pkg` and `haven pkg`) are actively entering Phase 2 implementation.\n> Featuring `star.toml` and `haven.toml` sovereign project manifests, RFC 8785 canonical lockfiles (`star.lock` & `haven.lock`), SHA-256 integrity verification, zero-dependency offline artifact caching (`~/.star/packages` & `~/.haven/pkg_cache`), and decentralized registry publishing via `odcshosting` (https://odcshosting.in).\n\n---\n\n## 1. The Dual-Engine Paradigm\n\nFor three decades, modern computing has relied on the fragile client-server synchronous RPC paradigm. Applications developed under this model assume a permanent, low-latency connection to a centralized cloud. When network conditions degrade, users face spinner screens, 504 Gateway Timeouts, and wiped form inputs.\n\nThe **Open Digital Continuity Standard (ODCS-2.0.0)** completely replaces this paradigm with a **Sovereign Dual-Engine Architecture**:\n\n- **Star Programming Language (v1.2.0 GA):** High-speed WebAssembly frontend UI engine (`app.wasm`, 4.9 KB, 60 FPS).\n- **Haven Language (v2.0):** Natural-English continuity backend engine implementing Layer 1-4 resilience.\n\n---\n\n## 2. Complete Star Language Specification (All 18 Packages & 235 Modules)\n\nStar compiles directly to standalone WebAssembly without virtual-DOM or React dependencies. Its standard library contains 235 production modules across 18 domains:\n\n1. **math (15 modules):** vector2d, vector3d, matrix, quaternion, complex, stats, trig, calculus, geometry, random_dist, combinatorics, linear_algebra, interpolation, bigint, fraction.\n2. **collections (15 modules):** stack, queue, deque, linked_list, heap, priority_queue, binary_search_tree, trie, hash_table, bloom_filter, lru_cache, disjoint_set, graph, circular_buffer, multiset.\n3. **strings (15 modules):** str_utils, regex_lite, template, inflector, slugify, levenshtein, diff, tokenizer, formatter, parser_combinator, unicode_helper, ascii_table, base64_codec, rot13, soundex.\n4. **net (15 modules):** url, http_client, http_router, websocket, query_string, headers, ip_address, dns, socket_utils, mime, cors, cookie, sse, jwt_lite, oauth_lite.\n5. **formats (15 modules):** json_utils, csv, tsv, yaml_lite, xml_lite, toml_lite, ini, markdown_lite, binary_reader, binary_writer, hex_codec, protobuf_lite, msgpack_lite, tar_lite, zip_lite.\n6. **algorithms (15 modules):** sorting, searching, pathfinding, graph_traversal, dynamic_programming, compression_lite, cryptographic_sort, convex_hull, clustering_lite, knapsack, backtracking, string_matching, topological_sort, interval_tree, quadtree.\n7. **crypto (15 modules):** sha256_lite, md5_lite, hmac_lite, aes_lite, rsa_lite, uuid, totp, checksum, random_bytes, pbkdf2_lite, bcrypt_lite, caesar, vigenere, xtea, argon2_lite.\n8. **ui (15 modules):** box_model, color_palette, gradient, typography, grid_system, responsive, flexbox_lite, theme_manager, icon_set, dialog_builder, toast_notifier, badge, avatar, card_layout, form_builder.\n9. **mobile (15 modules):** haptic, sensors, geolocation, battery, device_info, orientation, clipboard, biometrics, torch, network_info, camera_mock, audio_player, volume_control, shake_detector, screen_metrics.\n10. **io (15 modules):** file_utils, path_utils, stream_reader, stream_writer, buffer, file_watcher, temp_file, directory_walker, line_reader, memory_stream, pipe, env_file, log_rotator, lockfile, glob_match.\n11. **game (15 modules):** game_loop, entity_component, collision_2d, tilemap, sprite_animation, particle_system, state_machine, behavior_tree, physics_world, camera_2d, input_manager, scene_manager, spatial_hash, raycast_2d, noise_generator.\n12. **sys (10 modules):** process_utils, args_parser, env_vars, signal_handler, terminal, ansi_colors, benchmark, system_info, time_utils, cron_parser.\n13. **async_tools (10 modules):** promise, task_queue, event_emitter, channel, semaphore, rate_limiter, debounce, throttle, retry, timeout.\n14. **validation (10 modules):** validator, schema, email_validator, url_validator, phone_validator, credit_card, sanitizer, type_guard, rule_engine, form_validator.\n15. **test (10 modules):** assertions, test_runner, mock, spy, fixture, benchmark_runner, snapshot, coverage_lite, test_suite, fake_data.\n16. **media (10 modules):** color_convert, pixel_buffer, image_filter, audio_synth, wav_writer, midi_lite, waveform, bitmap_font, svg_builder, canvas_2d.\n17. **storage (10 modules):** key_value_store, json_db, in_memory_db, cache_manager, transaction, table_storage, indexed_store, query_builder, migration_runner, document_store.\n18. **ai (10 modules):** neural_net_lite, linear_regression, logistic_regression, decision_tree_lite, kmeans, naive_bayes, matrix_math, activation_functions, vector_search, loss_functions.\n\n---\n\n## 3. Complete Haven Language Specification\n\nHaven uses natural-English syntax to maximize auditability while enforcing sub-16ms Zero Intent Loss:\n\n```haven\ndurable record EmergencyEncounter:\n    patient_id: String\n    heart_rate: Integer\n\nset encounter to EmergencyEncounter(\"PT-901\", 78)\ncheckpoint encounter as \"triage_vital\" into hospital_ledger\ngive back \"Sealed with Zero Intent Loss in under 0.15ms!\"\n```\n\n**Key Haven Modules:**\n- `haven.agents`: Sovereign decentralized agent orchestration and consensus routing.\n- `haven.continuity`: Local WAL management, Merkle root recomputation, tamper verification.\n- `haven.intent`: Sub-16ms Zero-Intent-Loss receipt minting and local hardware authority.\n- `haven.merkle`: RFC 8785 Canonical JSON & SHA-256 binary DAGs.\n- `haven.backend.*`: Microservices server, router, ORM, Ed25519 auth, vault.\n- `haven.cli.pkg`: Project manifest & decentralized registry CLI.\n- `odcs.crdt`: PN-Counter and Add-Wins OR-Set conflict-free data types.\n- `odcs.mesh`: Disruption-tolerant peer-to-peer gossip protocol.\n\n---\n\n## 4. Official Notice: Sovereign Package Managers Coming Soon\n\nBoth `star pkg` and `haven pkg` are launching in Phase 2:\n- `star.toml` and `haven.toml` manifest configuration.\n- RFC 8785 deterministically ordered lockfiles (`star.lock` and `haven.lock`).\n- Air-gapped offline caching in `~/.star/packages` and `~/.haven/pkg_cache`.\n- Hosted sovereign package registry at https://odcshosting.in."
  },
  {
    "id": "zero-intent-loss",
    "num": 2,
    "title": "The Zero Intent Loss Invariant: Why Human Expression Must Never Be Discarded",
    "subtitle": "How the Open Digital Continuity Standard replaces 504 timeouts, wiped forms, and spinner screens with deterministic local authority.",
    "author": "Anirudha Puthraya",
    "role": "Lead Architect & Creator of Haven Language",
    "date": "November 2026",
    "category": "Architecture & Philosophy",
    "read_time": "8 min read",
    "tags": [
      "ODCS",
      "ZeroIntentLoss",
      "Resilience",
      "UX Invariants"
    ],
    "summary": "Every day, billions of human inputs are permanently lost to network jitter, server timeouts, and fragile client-server sessions. This essay formalizes the Zero Intent Loss Invariant\u2014mandating that human intent expressed through software must achieve local permanence under 16 milliseconds.",
    "content": "# The Zero Intent Loss Invariant\n### By Anirudha Puthraya \u2022 Creator & Lead Architect\n\nEvery day, billions of human thoughts, financial transfers, medical observations, and legal contracts are destroyed by an invisible design flaw in contemporary computing: **the fragile assumption of continuous connectivity**.\n\nA paramedic in an underground parking garage types emergency patient vitals and presses \"Submit.\" A spinner appears. Three seconds later, an HTTP 504 Gateway Timeout wipes the input fields. The paramedic must begin again, but time is running out.\n\nThis is not a network failure. **It is an architectural failure.**\n\n---\n\n## 1. The Core Invariant\n\n> *\"The user's expressed intention shall never be rejected, wiped, or blocked by the software interface due to network latency, server downtime, or physical disconnection.\"*\n\nUnder ODCS Layer 4, the moment a user presses a key, checks a box, or seals a record, that action achieves **immediate local cryptographic durability** in under 16 milliseconds. The local node acts as an autonomous sovereign authority.\n\n---\n\n## 2. The 16ms Rule: Local Authority over Remote Permission\n\n1. **Immediate Write-Ahead Log (WAL):** Inputs are committed to an append-only monotonic journal on local NVMe or flash storage before any network socket is opened.\n2. **Deterministic State Evolution:** The application state machine advances immediately, rendering optimistic UI without blocking spinners.\n3. **Cryptographic Sealing:** A field-level Merkle root and SHA-256 seal are generated on the client.\n4. **Convergent Background Mesh:** When connectivity returns, the ledger synchronizes monotonically without double-spends or data loss."
  },
  {
    "id": "why-we-built-haven",
    "num": 3,
    "title": "Why We Built Haven: Fixing 30 Years of Broken Client-Server Fragility",
    "subtitle": "The journey of engineering a native disruption-tolerant runtime for sovereign local-first systems.",
    "author": "Anirudha Puthraya",
    "role": "Lead Architect & Creator of Haven Language",
    "date": "November 2026",
    "category": "Compilers & Language Design",
    "read_time": "12 min read",
    "tags": [
      "Haven",
      "LanguageDesign",
      "DistributedSystems",
      "WAL"
    ],
    "summary": "For three decades, web software has been authored under the assumption that the cloud is permanent. Haven Language is the first programming language designed from syntax to bytecode to treat connectivity as an asynchronous transport.",
    "content": "# Why We Built Haven: Fixing 30 Years of Broken Client-Server Fragility\n### By Anirudha Puthraya \u2022 Standards Director\n\nEvery programming language carries an implicit worldview. C views the computer as memory addresses and CPU registers. JavaScript views the computer as an event loop embedded inside a browser. Python views the computer as readable scripting.\n\n**Haven views the computer as an autonomous node in an untrusted, intermittent universe.**\n\n---\n\n## 1. Natural English as an Audit Primitive\n\nIn Haven, business rules and emergency triage logic are written in plain human English sentences:\n\n```haven\ndurable record EmergencyEncounter:\n    patient_id: String\n    heart_rate: Integer\n\nset encounter to EmergencyEncounter(\"PT-901\", 78)\ncheckpoint encounter as \"triage_vital\" into hospital_ledger\ngive back \"Sealed with Zero Intent Loss!\"\n```\n\nThis guarantees that medical staff, systems auditors, and engineers can verify mission-critical invariants directly without translation barriers."
  },
  {
    "id": "four-layer-standard",
    "num": 4,
    "title": "The 4-Layer ODC Standard: Unifying Durability, Mesh, Telemetry, and Intent",
    "subtitle": "A systematic architectural reference model for disruption-tolerant computing from silicon to human experience.",
    "author": "Anirudha Puthraya",
    "role": "Standards Director",
    "date": "November 2026",
    "category": "Standards & Protocols",
    "read_time": "10 min read",
    "tags": [
      "ODCS",
      "4Layers",
      "CRDT",
      "RFC8785"
    ],
    "summary": "Digital continuity cannot be solved with an isolated offline cache library. It requires a disciplined multi-layer standard spanning cryptographic durability, CRDT mesh synchronization, runtime telemetry, and optimistic UI authority.",
    "content": "# The 4-Layer ODC Standard\n### By Anirudha Puthraya \u2022 Standards Director\n\nJust as the OSI 7-Layer model unified telecommunications, the Open Digital Continuity Standard (ODCS) establishes 4 standardized layers for disruption-tolerant computing:\n\n- **Layer 4: Application & Zero Intent Loss (ZIL)** \u2014 Single-frame (<16.6ms) optimistic UI authority.\n- **Layer 3: Dynamic Telemetry Sensing** \u2014 Adaptive latency probing and exponential jitter backoff.\n- **Layer 2: Transport & CRDT Consensus** \u2014 Semi-lattice state convergence without centralized locks.\n- **Layer 1: Local Durability & Merkle WAL** \u2014 RFC 8785 Canonical JSON & SHA-256 hash chains."
  },
  {
    "id": "star-wasm-engine",
    "num": 5,
    "title": "From 4.9 KB WebAssembly to Multi-OS Vaults: The Star & Haven Toolchain",
    "subtitle": "How sovereign compilers eliminate Virtual DOM overhead and deliver single-frame 60 FPS performance.",
    "author": "Anirudha Puthraya",
    "role": "Standards Director & Creator of Star Language",
    "date": "November 2026",
    "category": "WebAssembly & Runtime",
    "read_time": "9 min read",
    "tags": [
      "StarLang",
      "WebAssembly",
      "ZeroVirtualDOM",
      "Performance"
    ],
    "summary": "Why do modern web applications require 50 megabytes of JavaScript just to render a button? Inside the Star Language compiler pipeline that compiles main.star to a standalone 4.9 KB WebAssembly binary running at 60 FPS.",
    "content": "# From 4.9 KB WebAssembly to Multi-OS Vaults\n### By Anirudha Puthraya \u2022 Creator of Star Language\n\nModern web development has succumbed to an epidemic of complexity. A standard web application pulls in thousands of transitive npm dependencies and megabytes of framework runtime.\n\nStar eliminates this completely: `main.star` compiles directly into pure WebAssembly (`app.wasm`, 4.9 KB), delivering single-frame 60 FPS reactive updates with zero virtual-DOM overhead and zero external dependencies."
  }
];

  function getArticles() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error, using defaults', e);
    }
    return DEFAULT_ARTICLES;
  }

  function saveArticles(articles) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
    renderArticlesTable();
  }

  // ============================================================================
  // 3. TAB CONTROLLER
  // ============================================================================
  window.setAdminTab = function (tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    const btn = document.getElementById(`tabBtn_${tabId}`);
    const panel = document.getElementById(`tabPanel_${tabId}`);

    if (btn) btn.classList.add('active');
    if (panel) panel.classList.add('active');
  };

  // ============================================================================
  // 4. ARTICLE WRITING & EDITING STUDIO
  // ============================================================================
  const titleInput = document.getElementById('artTitle');
  const subtitleInput = document.getElementById('artSubtitle');
  const categorySelect = document.getElementById('artCategory');
  const authorInput = document.getElementById('artAuthor');
  const tagsInput = document.getElementById('artTags');
  const contentInput = document.getElementById('artContent');
  const previewPane = document.getElementById('markdownPreview');
  let currentEditingId = null;

  // Simple Markdown to HTML Parser
  function parseMarkdown(md) {
    if (!md) return '<p style="color: var(--text-dim); font-style: italic;">Live preview will appear here as you type...</p>';
    
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Code blocks
    html = html.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code style="color: var(--cyan); background: rgba(0,240,255,0.1); padding: 0.1rem 0.35rem; border-radius: 4px;">$1</code>');

    // Bold & Italic
    html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>');

    // Horizontal Rule
    html = html.replace(/^---$/gim, '<hr style="border: none; border-top: 1px solid var(--border-subtle); margin: 1.5rem 0;" />');

    // Paragraphs
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';

    return html;
  }

  function updateLivePreview() {
    if (!previewPane) return;
    const title = titleInput?.value.trim() || 'Untitled Article';
    const subtitle = subtitleInput?.value.trim() || '';
    const author = authorInput?.value.trim() || 'Anirudha Puthraya';
    const content = contentInput?.value || '';

    const headerHtml = `
      <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <span class="badge badge-cyan" style="margin-bottom: 0.5rem;">${categorySelect?.value || 'Architecture'}</span>
        <h1 style="font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 0.4rem;">${title}</h1>
        ${subtitle ? `<p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.6rem;">${subtitle}</p>` : ''}
        <div style="font-size: 0.76rem; color: var(--cyan); font-family: var(--font-mono);">By ${author} · Published under ODCS-2.0.0</div>
      </div>
    `;

    previewPane.innerHTML = headerHtml + parseMarkdown(content);
  }

  if (contentInput) {
    contentInput.addEventListener('input', updateLivePreview);
    titleInput.addEventListener('input', updateLivePreview);
    subtitleInput.addEventListener('input', updateLivePreview);
    categorySelect.addEventListener('change', updateLivePreview);
    authorInput.addEventListener('input', updateLivePreview);
  }

  // Action: Publish Article
  window.publishArticle = function () {
    const title = titleInput?.value.trim();
    const content = contentInput?.value.trim();

    if (!title || !content) {
      alert('Please provide both an Article Title and Content.');
      return;
    }

    const articles = getArticles();
    const id = currentEditingId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const subtitle = subtitleInput?.value.trim() || '';
    const category = categorySelect?.value || 'Architecture & Philosophy';
    const author = authorInput?.value.trim() || 'Anirudha Puthraya';
    const tags = tagsInput?.value.split(',').map(t => t.trim()).filter(Boolean);

    const now = new Date();
    const dateStr = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Mint Layer 4 ZIL Receipt for the publication
    const hex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const uuid7 = `zil_art_${Math.random().toString(36).substring(2, 10)}`;

    const newArticle = {
      id,
      num: currentEditingId ? (articles.find(a => a.id === currentEditingId)?.num || articles.length) : articles.length + 1,
      title,
      subtitle,
      author,
      role: 'Standards Director & Lead Architect',
      date: dateStr,
      category,
      read_time: `${Math.max(2, Math.round(content.split(/\s+/).length / 200))} min read`,
      tags: tags.length ? tags : ['ODCS', 'Article'],
      summary: subtitle || content.substring(0, 180) + '...',
      content,
      zilReceipt: {
        intentId: uuid7,
        sealHash: hex,
        timestamp: now.toISOString()
      }
    };

    if (currentEditingId) {
      const idx = articles.findIndex(a => a.id === currentEditingId);
      if (idx !== -1) articles[idx] = newArticle;
    } else {
      articles.push(newArticle);
    }

    saveArticles(articles);
    clearArticleForm();
    showToast(`✓ Published Article "${title}" with ZIL Seal ${hex.substring(0, 16)}...`);
    window.setAdminTab('articles_list');
  };

  // Action: Edit Article
  window.editArticle = function (id) {
    const articles = getArticles();
    const art = articles.find(a => a.id === id);
    if (!art) return;

    currentEditingId = art.id;
    if (titleInput) titleInput.value = art.title;
    if (subtitleInput) subtitleInput.value = art.subtitle || '';
    if (categorySelect) categorySelect.value = art.category;
    if (authorInput) authorInput.value = art.author;
    if (tagsInput) tagsInput.value = (art.tags || []).join(', ');
    if (contentInput) contentInput.value = art.content;

    updateLivePreview();
    window.setAdminTab('write_article');
    document.getElementById('publishBtnLabel').textContent = 'UPDATE ARTICLE';
  };

  // Action: Delete Article
  window.deleteArticle = function (id) {
    if (!confirm('Are you sure you want to delete this article?')) return;
    let articles = getArticles();
    articles = articles.filter(a => a.id !== id);
    saveArticles(articles);
    showToast('✓ Deleted article.');
  };

  function clearArticleForm() {
    currentEditingId = null;
    if (titleInput) titleInput.value = '';
    if (subtitleInput) subtitleInput.value = '';
    if (tagsInput) tagsInput.value = '';
    if (contentInput) contentInput.value = '';
    if (document.getElementById('publishBtnLabel')) {
      document.getElementById('publishBtnLabel').textContent = 'PUBLISH ARTICLE';
    }
    updateLivePreview();
  }

  // Render Articles Table
  function renderArticlesTable() {
    const tbody = document.getElementById('articlesTableBody');
    if (!tbody) return;

    const articles = getArticles();
    tbody.innerHTML = articles.map(art => `
      <tr>
        <td style="font-family: var(--font-mono); color: var(--cyan); font-weight: 800;">#${art.num}</td>
        <td>
          <div style="font-weight: 800; color: #fff; margin-bottom: 0.2rem;">${art.title}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${art.subtitle || ''}</div>
        </td>
        <td><span class="badge badge-cyan">${art.category}</span></td>
        <td style="font-size: 0.78rem; color: var(--text-dim); font-family: var(--font-mono);">${art.author}</td>
        <td style="font-size: 0.78rem; color: var(--emerald); font-family: var(--font-mono);">${art.read_time}</td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button onclick="editArticle('${art.id}')" class="btn btn-secondary btn-sm" title="Edit">✏️ Edit</button>
            <button onclick="deleteArticle('${art.id}')" class="btn btn-danger btn-sm" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');

    const countEl = document.getElementById('articlesCountBadge');
    if (countEl) countEl.textContent = `${articles.length} Articles`;
  }

  // Export Articles as JSON
  window.exportArticlesJson = function () {
    const articles = getArticles();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `odcs_articles_backup_${Date.now()}.json`);
    dlAnchor.click();
    showToast('✓ Exported all articles as JSON!');
  };

  // ============================================================================
  // 5. UNRESTRICTED WEBSITE TELEMETRY & NETWORK CONTROLLER
  // ============================================================================
  window.adminSetMode = function (mode) {
    showToast(`✓ Admin Telemetry Override: Shifted to ${mode}`);
  };

  window.adminCutCarrier = function () {
    showToast('🛑 Admin Override: Severed Carrier Socket. Local WAL Durability Engaged.');
  };

  window.adminRestoreCarrier = function () {
    showToast('✓ Admin Override: Restored Carrier Socket. Re-converging CRDT Mesh.');
  };

  window.adminPurgeCache = function () {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    showToast('✓ Cleared browser Service Worker & HTTP Cache.');
  };

  // Toast Notification
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(10, 15, 30, 0.95);
      border: 1px solid #00f0ff;
      color: #00f0ff;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.3);
      z-index: 10000;
      transition: opacity 0.3s ease, transform 0.3s ease;
      transform: translateY(10px);
      opacity: 0;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Initial Boot
  renderArticlesTable();
  updateLivePreview();

})();
