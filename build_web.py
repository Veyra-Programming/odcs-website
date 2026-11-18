"""
Official ODCS Web Build Script (Pure Sovereign Architecture)
1. Compiles sovereign Star Language application (main.star) into WebAssembly (app.wasm).
2. Packages the pure, high-performance web portal (zero Next.js, zero React, zero npm bloat).
3. Deploys the static bundle & multi-OS release artifacts into build/web.
"""
import os
import sys
import shutil
import subprocess

here = os.path.dirname(os.path.abspath(__file__))
star_sdk = os.environ.get("STAR_SDK", r"E:\Star Language")

if os.path.isdir(star_sdk):
    sys.path.insert(0, star_sdk)

try:
    from star_backend.wasm.builder import WebBuilder
except ImportError:
    WebBuilder = None

def build():
    build_dir = os.path.join(here, "build", "web")
    website_dir = os.path.join(here, "website")
    
    os.makedirs(build_dir, exist_ok=True)

    print("=" * 70)
    print("🚀 BUILDING SOVEREIGN ODCS WEB PORTAL (PURE STAR WASM ARCHITECTURE)")
    print("   Built & Maintained by Anirudha Puthraya · Zero Next.js Bloat")
    print("=" * 70)

    # 1. Compile Star Language main.star to WebAssembly
    print("\n1. Compiling main.star to WebAssembly...")
    if WebBuilder:
        try:
            wb = WebBuilder(project_dir=here)
            wb.build()
            print("✓ WebBuilder compilation succeeded!")
        except Exception as e:
            print(f"WebBuilder note: {e}")
    else:
        star_bat = os.path.join(here, "star.bat")
        if os.path.exists(star_bat):
            subprocess.run([star_bat, "build", "web"], check=False)

    # Copy Star.js from Star SDK if present
    star_js_src = os.path.join(star_sdk, "Star.js")
    if os.path.exists(star_js_src):
        shutil.copy2(star_js_src, os.path.join(website_dir, "Star.js"))
        shutil.copy2(star_js_src, os.path.join(build_dir, "Star.js"))

    # Copy app.wasm if present in build/web or project root
    app_wasm_src = os.path.join(here, "build", "web", "app.wasm")
    if not os.path.exists(app_wasm_src):
        app_wasm_src = os.path.join(website_dir, "public", "app.wasm")

    # 2. Deploy website assets directly into build/web/
    print("\n2. Deploying pure sovereign web assets to build/web/...")
    
    # Copy root website files (index.html, styles.css, app.js, privacy-policy.html, terms.html, contribute.html, etc.)
    for f in ["index.html", "styles.css", "app.js", "Star.js", "privacy-policy.html", "terms.html", "contribute.html"]:
        src_file = os.path.join(website_dir, f)
        if os.path.exists(src_file):
            shutil.copy2(src_file, os.path.join(build_dir, f))

    # Copy sub-directories (admin, privacy-policy, terms, contribute, images)
    for sub in ["admin", "privacy-policy", "terms", "contribute", "images"]:
        src_sub = os.path.join(website_dir, sub)
        dst_sub = os.path.join(build_dir, sub)
        if os.path.exists(src_sub):
            shutil.copytree(src_sub, dst_sub, dirs_exist_ok=True)

    # Copy downloads directory
    src_downloads = os.path.join(website_dir, "public", "downloads")
    if not os.path.exists(src_downloads):
        src_downloads = os.path.join(website_dir, "downloads")
    
    dst_downloads = os.path.join(build_dir, "downloads")
    if os.path.exists(src_downloads):
        shutil.copytree(src_downloads, dst_downloads, dirs_exist_ok=True)

    # Copy install.ps1
    install_src = os.path.join(here, "install.ps1")
    if os.path.exists(install_src):
        shutil.copy2(install_src, os.path.join(build_dir, "install.ps1"))

    print(f"\n✓ Sovereign ODCS Web Portal deployed successfully to '{build_dir}'!")
    for f in sorted(os.listdir(build_dir)):
        p = os.path.join(build_dir, f)
        if os.path.isfile(p):
            sz = os.path.getsize(p)
            print(f"   • {f:<25} ({sz:,} bytes)")
        else:
            print(f"   • {f}/ (directory)")

if __name__ == "__main__":
    build()
