# 🌐 ODCS Official Web Portal & Star WASM UI Engine

> **Live Official Portal**: [https://odcs.in/](https://odcs.in/)  
> **Standard Specification**: ODCS-2.0.0 GA  
> **Architecture**: Pure Sovereign Web • 100% Native Web Standards • Zero Next.js / Zero React  
> **Official Standards Repository**: [github.com/Veyra-Programming/open-digital-continuity-standard-](https://github.com/Veyra-Programming/open-digital-continuity-standard-)  
> **Dual-Engine Repository**: [github.com/Veyra-Programming/star-haven](https://github.com/Veyra-Programming/star-haven)  
> **Architect & Author**: Anirudha Puthraya · ODCS Standards Foundation  
> **Organization**: [Veyra-Programming](https://github.com/Veyra-Programming)  
> **License**: Apache 2.0  

---

## 🏛️ Executive Summary

This repository contains the authoritative source code, assets, and deployment pipeline for the **Open Digital Continuity Standard (ODCS) Official Web Portal** hosted at [odcs.in](https://odcs.in/).

By completely eliminating fragile legacy frameworks (Next.js, React, Webpack, Babel, and `node_modules`), this portal achieves:
- ⚡ **Cold Start in Under 15ms**: Instantaneous initial page loads with zero hydration waterfalls.
- ⭐ **First Working UI for the Star Programming Language (v1.2.0 GA)**: Pure declarative UI compiled from `main.star` directly into **4.9 KB WebAssembly (`app.wasm`)** running at a locked 60 FPS ($< 16.6\text{ms}$ frame budget).
- 📱 **Flawless Mobile Navigation**: Working responsive capsule navigation with smooth mobile hamburger menu drawer (☰ / ✕), verified mobile runtimes, and accessible backdrop blur.
- 🔒 **Zero Intent Loss (ZIL)**: Real-time cryptographic receipt minting, local NVMe/IndexedDB Write-Ahead Log (WAL), and partition-tolerant CRDT mesh synchronization.

---

## 🌟 Key Features of the Portal

1. **World's First Working Star Language WebAssembly Studio**:
   - Monitored live **60 FPS** execution engine.
   - Live reactive properties matching `main.star`: `_current_mode`, `_rtt_latency`, `_staged_receipts`, `_crdt_counter`.
   - Interactive continuity test deck:
     - `▶ Mint Layer 4 ZIL Receipt`: Mints authentic SHA-256 / RFC 8785 receipts with monotonic UUIDv7 timestamps into the live Merkle WAL.
     - `🛰️ Simulate 480ms Satellite Jitter`: Transitions mode to `DEGRADED_JITTER`.
     - `🛑 Trigger Total Network Blackout`: Demonstrates 100% sovereign local NVMe authority.
     - `🔄 Converge Multi-Node CRDT Mesh`: Merges state algebraically without merge conflicts.
   - Interactive `main.star` syntax-highlighted source viewer and live Merkle WAL block explorer.
2. **Mobile-First Glassmorphic Header & Drawer**:
   - Responsive floating capsule header with live ping telemetry (`ONLINE (0.04ms)`).
   - Smooth animated hamburger toggle button (☰ / ✕) and accessible slide-down drawer.
3. **Milestone 1 Ratification Center**:
   - Full verification matrix for all 8 core objectives of ODCS-2.0.0 GA.
4. **Dual-Sovereign Engine Showcase**:
   - Deep-dives into **Star Language (v1.2.0 GA)** and **Haven Language (v2.0)**.
5. **Interactive 3D / 2.5D Topology Visualizer**:
   - Real-time animated canvas visualizing the 4 layers of ODCS.
6. **20-OS Release Vault**:
   - Verified distribution packages for Windows, Linux, macOS, Android APK, and containers.

---

## 📂 Repository Structure

```
odcs-website/
├── main.star                # Authoritative Star Language Web Application
├── main.starb               # Precompiled Star bytecode binary
├── star.toml                # Star project manifest
├── build_web.py             # Sovereign build script (compiles main.star & deploys site)
│
├── website/                 # Master Pure Sovereign Web Application (Zero Next.js)
│   ├── index.html           # Master portal layout & UI structure
│   ├── styles.css           # Pure modern CSS3 stylesheet (glassmorphism & strict icon sizing)
│   ├── app.js               # Zero-dependency controller, 60 FPS loop & mobile menu
│   ├── Star.js              # Authoritative Star host framework engine
│   └── downloads/           # Multi-OS distribution binaries & manifests
│
└── build/
    └── web/                 # Static production bundle ready for VPS deployment
        ├── index.html       # Production compiled HTML (44 KB)
        ├── styles.css       # Production stylesheet (13 KB)
        ├── app.js           # Production application runtime (12 KB)
        ├── app.wasm         # Star Language WebAssembly core (4.9 KB)
        ├── Star.js          # Star framework engine (62 KB)
        └── downloads/       # Multi-OS distribution binaries
```

---

## 🚀 Building & Deploying

### 1. Build Production Static Bundle
To compile `main.star` to `app.wasm` and deploy the sovereign portal to `build/web/`:
```powershell
python build_web.py
```
*Build time: < 0.5 seconds! No npm install or node_modules needed.*

### 2. Deploy to Ubuntu VPS
Deploy directly to the production web server at `103.71.99.204`:
```powershell
scp -r "build\web\*" odcs@103.71.99.204:/opt/odcs/build/web/
```

---

## 👨‍💻 Standards Leadership & Creator Attribution

**Anirudha Puthraya**  
*Standards Director & Author · ODCS Standards Foundation*  
*Organization:* [Veyra-Programming](https://github.com/Veyra-Programming)  
*Dual-Engine Repository:* [github.com/Veyra-Programming/star-haven](https://github.com/Veyra-Programming/star-haven)  
*Official Standards:* [github.com/Veyra-Programming/open-digital-continuity-standard-](https://github.com/Veyra-Programming/open-digital-continuity-standard-)  
*Official Portal:* [https://odcs.in/](https://odcs.in/)  

---

## ⚖️ License

Licensed under the **Apache License, Version 2.0**.
See [LICENSE](LICENSE) for details.
