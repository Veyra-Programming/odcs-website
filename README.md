# 🌐 ODCS Official Web Portal & Star WASM UI Engine

> **Live Official Portal**: [https://odcs.in/](https://odcs.in/)  
> **Standard Specification**: ODCS-2.0.0 GA  
> **Official Standards Repository**: [github.com/Veyra-Programming/open-digital-continuity-standard-](https://github.com/Veyra-Programming/open-digital-continuity-standard-)  
> **Dual-Engine Repository**: [github.com/Veyra-Programming/star-haven](https://github.com/Veyra-Programming/star-haven)  
> **Architect & Author**: Anirudha Puthraya · ODCS Standards Foundation  
> **Organization**: [Veyra-Programming](https://github.com/Veyra-Programming)  
> **License**: Apache 2.0  

---

## 🏛️ Overview

This repository contains the authoritative source code, assets, and deployment pipeline for the **Open Digital Continuity Standard (ODCS) Official Web Portal** hosted at [odcs.in](https://odcs.in/).

The portal is architected with a **Dual-Sovereign Engine**:
1. **⭐ Star Programming Language (v1.2.0 GA)**: Powers the interactive client application (`main.star`), compiled directly into a **4.9 KB WebAssembly core (`app.wasm`)** and bridged with `Star.js` for single-frame 60 FPS reactive updates.
2. **⚡ Modern Next.js 14 App Router**: Provides high-performance static site generation (SSG), responsive layout structuring, and instant asset preloading.

---

## 🌟 Key Features of the Portal

- **⭐ Interactive Star Sovereign UI Studio**: A live, embedded StarVM WebAssembly player running at 60 FPS. Demonstrates real-time reactive mutations, satellite jitter simulation, network blackout resilience, and CRDT mesh convergence.
- **🧊 Interactive 3D Architecture Diagram**: Real-time 3D visualization of the 4 ODC layers and the ODA algorithm with 360° orbit controls.
- **🏆 Milestone 1 Verification Center**: Real-time status matrix verifying all 8 core objectives of ODCS-2.0.0 GA.
- **📖 Architectural Documentation Hub**: Complete offline-first RFCs, 4-layer technical specifications, and interactive code playgrounds.
- **📦 20-OS Release Vault**: Cryptographically verified download distributions for Windows, Linux, macOS, Android, and containers.
- **🔒 Zero Virtual-DOM / Zero NPM Overhead in Star UI**: All critical continuity state is evaluated locally with sub-16ms Zero Intent Loss (ZIL) guarantees.

---

## 📂 Repository Structure

```
odcs-website/
├── main.star                # Authoritative Star Language Web Application
├── main.starb               # Precompiled Star bytecode binary
├── star.toml                # Star project manifest
├── build_web.py             # Dual compiler: Star WASM + Next.js Static Export
├── package.json             # Root NPM scripts for building and testing
│
├── website/                 # Modern Next.js 14 App Router Source
│   ├── src/
│   │   ├── app/             # App Router pages, layout, and global CSS
│   │   ├── components/      # React & Star UI interactive components
│   │   │   ├── StarSovereignUI.jsx # Interactive Star WASM Studio
│   │   │   ├── MilestoneOneCompleted.jsx # Milestone 1 Verification Matrix
│   │   │   ├── Real3DDiagramODCS.jsx # Interactive 3D Model Visualizer
│   │   │   ├── DualEngines.jsx # Star & Haven dual-engine showcase
│   │   │   ├── DocumentationCenter.jsx # Comprehensive public docs
│   │   │   ├── Navbar.jsx   # Sticky glassmorphic capsule navigation
│   │   │   ├── Footer.jsx   # Standards & governance footer
│   │   │   └── ...
│   │   └── data/            # Article and specification datasets
│   ├── public/              # Static files, wasm, and 20-OS release vault
│   └── next.config.js       # Next.js static export configuration
│
└── build/
    └── web/                 # Static production bundle ready for VPS deployment
        ├── index.html       # Production compiled HTML
        ├── app.wasm         # Star Language WebAssembly binary (4.9 KB)
        ├── Star.js          # Authoritative host runtime bridge
        └── downloads/       # Multi-OS distribution binaries
```

---

## 🚀 Local Development & Build

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **Star Language CLI**: `star` (included via `star.bat` on Windows)

### 2. Install Dependencies
```bash
cd website
npm install
```

### 3. Run Development Server
```bash
cd website
npm run dev
```
Open `http://localhost:3000` to preview the portal locally with hot-reloading.

### 4. Build Production Static Bundle
To compile `main.star` to `app.wasm` and build the complete static site into `build/web/`:
```bash
python build_web.py
```

### 5. Run Conformance Tests
```bash
npm test
```

---

## 🌐 Deploy to Ubuntu VPS

Deploy the compiled production export directly to your production web server:

```powershell
scp -r "build\web\*" odcs@103.71.99.204:/opt/odcs/build/web/
```

Or run the automated deployment script:
```powershell
.\deploy_to_vps.bat
```

---

## 👨‍💻 Standards Leadership & Creator Attribution

**Anirudha Puthraya**  
*Standards Director & Author · ODCS Standards Foundation*  
*Organization:* [Veyra-Programming](https://github.com/Veyra-Programming)  
*Dual-Engine Repository:* [github.com/Veyra-Programming/star-haven](https://github.com/Veyra-Programming/star-haven)  
*Official Portal:* [https://odcs.in/](https://odcs.in/)  

---

## ⚖️ License

Licensed under the **Apache License, Version 2.0**.
See [LICENSE](LICENSE) for details.
