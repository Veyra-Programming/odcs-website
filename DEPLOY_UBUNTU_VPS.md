# 🚀 ODCS Ubuntu Linux VPS Production Deployment Guide
**Star Programming Language UI (WASM) + Haven Language v2.0 Backend**
*Standard: ODCS-2.0.0 · Architect: Anirudha Puthraya*

---

## 🏛️ System Architecture on Ubuntu Linux

```
                           [ Internet / End Users ]
                                      │
                                      ▼
                           [ Port 80 / 443 HTTPS ]
                    ┌──────────────────────────────────┐
                    │          Nginx Web Server        │
                    │  • WASM MIME (application/wasm)  │
                    │  • Gzip / Brotli compression     │
                    │  • Static cache headers          │
                    │  • SSE streaming passthrough     │
                    └───────────────┬──────────────────┘
                                    │
               ┌────────────────────┴────────────────────┐
               │                                         │
               ▼                                         ▼
   [ Static Star Web UI ]                     [ Haven Backend Gateway ]
   /opt/odcs/build/web/                       http://127.0.0.1:8000
   ├── index.html                             (odcs-haven.service)
   ├── app.wasm                               ├── /healthz
   ├── Star.js                                ├── /api/v1/telemetry/probe
   ├── star_runtime.js                        ├── /api/v1/downloads
   └── styles.css                             ├── /api/v1/intent/preserve
                                              ├── /api/v1/sync (CRDT)
                                              └── /metrics (Prometheus)
```

---

## 📋 System Requirements
- **Operating System**: Ubuntu 20.04 LTS, 22.04 LTS, or 24.04 LTS (x86_64 or ARM64)
- **Privileges**: Root or `sudo` access
- **Memory**: 512 MB RAM minimum (1 GB recommended)
- **Disk**: 500 MB free storage

---

## ⚡ Option 1: Fast Automated 1-Click Deployment (Recommended)

Your VPS is pre-configured at: **`103.71.99.204`** (User: `odcs`).

### 1-Click Windows Deployment Script:
From your local terminal in `e:\ODCS models`, run:
```powershell
.\deploy_to_vps.bat
```
*(Or double-click [`deploy_to_vps.bat`](file:///e:/ODCS%20models/deploy_to_vps.bat))*.

This script automatically:
1. Packages the lean **3.5 MB** bundle (`vps/dist/odcs-vps-bundle-ubuntu.tar.gz`).
2. Uploads it via SCP to `odcs@103.71.99.204:~/`.
3. Connects via SSH, extracts the bundle, and executes `sudo bash install_ubuntu.sh` with all runtime files present!

---

### Convenient Windows Shortcut Scripts:
| Script | Command | Purpose |
|:---|:---|:---|
| **Deploy / Re-deploy** | [`deploy_to_vps.bat`](file:///e:/ODCS%20models/deploy_to_vps.bat) | Uploads bundle & deploys to `103.71.99.204` |
| **Instant SSH Terminal** | [`ssh_vps.bat`](file:///e:/ODCS%20models/ssh_vps.bat) | Connects directly to `odcs@103.71.99.204` |
| **Live Health Check** | [`status_vps.bat`](file:///e:/ODCS%20models/status_vps.bat) | Queries Nginx, `/healthz`, and `/api/v1/telemetry/probe` |
| **Stream Live Logs** | [`logs_vps.bat`](file:///e:/ODCS%20models/logs_vps.bat) | Streams `journalctl -u odcs-haven -f` from the VPS |

---

## 💻 Option 2: Manual Terminal Commands

### Step 1: Copy Deployment Bundle to your Ubuntu VPS
From your local machine, copy the bundle to your VPS:
```bash
scp vps/dist/odcs-vps-bundle-ubuntu.tar.gz odcs@103.71.99.204:~/
```

### Step 2: SSH into your VPS & Run Installer
```bash
ssh odcs@103.71.99.204

# Extract bundle
tar -xzf ~/odcs-vps-bundle-ubuntu.tar.gz
cd ~/odcs-vps-bundle-ubuntu

# Run automated production installer
sudo ./install_ubuntu.sh
```

# Run automated production installer
sudo bash install_ubuntu.sh
```

The installer executes automatically and performs:
1. ✅ Installs system packages: `python3`, `python3-pip`, `nginx`, `curl`, `git`, `ufw`, `tar`.
2. ✅ Creates dedicated, sandboxed system user `odcs` with home `/opt/odcs`.
3. ✅ Deploys Star Language SDK and Haven Language Runtime.
4. ✅ Installs global CLI commands: `/usr/local/bin/star` and `/usr/local/bin/haven`.
5. ✅ Registers and starts `odcs-haven.service` under systemd with auto-restart.
6. ✅ Configures Nginx virtual host with WebAssembly support and reverse proxy.
7. ✅ Configures UFW firewall (allows SSH, HTTP, HTTPS).
8. ✅ Runs automated health checks and prints public IP access URLs.

---

## 🐳 Option 2: Docker & Docker Compose Deployment

If your Ubuntu VPS has Docker installed, you can launch the containerized stack instantly:

```bash
# Clone or copy workspace
cd /opt
git clone <repo-url> odcs && cd odcs

# Start container in detached mode
docker compose up -d

# Verify container health
docker compose ps
curl http://localhost:8000/healthz
```

---

## 🛠️ Global CLI Toolchains on Ubuntu

Both the Star Language and Haven Language CLIs are globally registered in `/usr/local/bin`:

### ⭐ Star Language CLI (`star`)
```bash
# Check version and environment
star --version

# Validate a Star source file
star check main.star

# Compile Star source into bytecode (.starb)
star compile main.star

# Run a Star application
star run main.star
```

### 🕊️ Haven Language CLI (`haven`)
```bash
# Display Haven command options
haven --help

# Validate Haven syntax without executing
haven lint /opt/odcs/heaven/odcs_backend.hvn

# Transpile Haven natural-English to Python
haven compile /opt/odcs/heaven/odcs_backend.hvn

# Run a Haven script or backend
haven run /opt/odcs/heaven/odcs_backend.hvn 8000

# Launch interactive Haven REPL
haven repl
```

---

## 🔒 Enable Free SSL / HTTPS (Let's Encrypt Certbot)

To secure your production domain with a free SSL certificate:

```bash
# 1. Install Certbot for Nginx
sudo apt-get install -y certbot python3-certbot-nginx

# 2. Obtain and configure certificate (replace with your domain)
sudo certbot --nginx -d odcs.yourdomain.com

# 3. Verify auto-renewal timer
sudo systemctl status certbot.timer
```

Certbot will automatically update `/etc/nginx/sites-available/odcs.conf` with HTTPS directives, HTTP/2, and auto-renewal.

---

## 📋 Operational & Maintenance Commands

### Managing the Haven Backend Service
```bash
# Check service status
sudo systemctl status odcs-haven

# Follow live backend logs in real time
sudo journalctl -u odcs-haven -f

# Restart backend service
sudo systemctl restart odcs-haven

# Stop backend service
sudo systemctl stop odcs-haven
```

### Managing Nginx
```bash
# Test Nginx configuration syntax
sudo nginx -t

# Reload Nginx without downtime
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx
```

### Applying Zero-Downtime Updates
When you update Star Web assets or Haven backend files, run:
```bash
cd /root/odcs-vps-bundle-ubuntu
sudo bash update.sh
```

### Complete Uninstallation
To remove the service, Nginx configuration, and CLI wrappers:
```bash
sudo bash uninstall_ubuntu.sh

# Or completely purge all files and the odcs user:
sudo bash uninstall_ubuntu.sh --purge
```

---

## 🔍 Verification & Health Checking

Test your live endpoints directly from terminal or browser:

| Endpoint | Method | Expected Output | Purpose |
|:---|:---:|:---|:---|
| `http://<IP>/` | `GET` | Star Web UI HTML (`200 OK`) | Master ODCS Continuity Portal |
| `http://<IP>/app.wasm` | `GET` | WebAssembly Binary (`200 OK`) | Star Compiled WebAssembly core |
| `http://<IP>/healthz` | `GET` | JSON (`{"status": "HEALTHY"}`) | Haven Backend Node Health |
| `http://<IP>/api/v1/telemetry/probe` | `GET` | JSON (`{"telemetry": {...}}`) | Real-time RTT & Jitter Telemetry |
| `http://<IP>/api/v1/downloads` | `GET` | JSON (Release Vault) | 20-OS Release Catalog |
| `http://<IP>/metrics` | `GET` | Prometheus text format | WAL Height & CRDT Metrics |
| `http://<IP>/api/v1/events` | `GET` | `text/event-stream` | Real-time Server-Sent Events |

---

## 🛡️ Production Security Hardening Included

1. **Least-Privilege Execution**: The Haven daemon runs under a restricted `odcs:odcs` system user with `/bin/bash` disabled or unprivileged.
2. **Systemd Sandboxing**:
   - `NoNewPrivileges=true` prevents privilege escalation.
   - `ProtectSystem=full` mounts `/usr`, `/boot`, and `/etc` as read-only for the process.
   - `ProtectHome=true` shields `/root` and `/home`.
   - `PrivateTmp=true` isolates `/tmp`.
3. **UFW Protection**: Only ports `22` (SSH), `80` (HTTP), and `443` (HTTPS) are exposed. Backend port `8000` is shielded behind the Nginx reverse proxy.

