"""
Official ODCS Web Build Script (Next.js 14 Modern Architecture)
1. Compiles sovereign Star Language application (main.star) into WebAssembly.
2. Builds the Next.js static production export (website/out).
3. Deploys the Next.js bundle & all 20-OS release artifacts into build/web.
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
    next_out_dir = os.path.join(website_dir, "out")
    
    os.makedirs(build_dir, exist_ok=True)

    print("=" * 70)
    print("🚀 BUILDING MODERN ODCS WEB PORTAL (NEXT.JS 14 APP ROUTER)")
    print("   Built & Maintained by Anirudha Puthraya")
    print("=" * 70)

    # 1. Compile Star Language main.star to WebAssembly
    print("\n1. Compiling main.star to WebAssembly...")
    if WebBuilder:
        wb = WebBuilder(project_dir=here)
        wb.build()
    else:
        star_bat = os.path.join(here, "star.bat")
        if os.path.exists(star_bat):
            subprocess.run([star_bat, "build", "web"], check=False)

    # Copy Star.js & app.wasm into website/public/ & website/public/downloads/
    website_public = os.path.join(website_dir, "public")
    website_downloads = os.path.join(website_public, "downloads")
    os.makedirs(website_downloads, exist_ok=True)

    star_js_src = os.path.join(star_sdk, "Star.js")
    if os.path.exists(star_js_src):
        shutil.copy2(star_js_src, os.path.join(website_public, "Star.js"))
        shutil.copy2(star_js_src, os.path.join(website_downloads, "Star.js"))

    app_wasm_src = os.path.join(here, "build", "web", "app.wasm")
    if os.path.exists(app_wasm_src):
        shutil.copy2(app_wasm_src, os.path.join(website_downloads, "app.wasm"))

    # Copy install.ps1 into website/public/
    install_src = os.path.join(here, "install.ps1")
    if os.path.exists(install_src):
        shutil.copy2(install_src, os.path.join(website_public, "install.ps1"))

    # 2. Build Next.js Static Export
    print("\n2. Building Next.js static site export...")
    # Run npm run build inside website
    npm_cmd = shutil.which("npm") or shutil.which("npm.bat") or shutil.which("npm.cmd") or "npm"
    result = subprocess.run([npm_cmd, "run", "build"], cwd=website_dir, capture_output=True, text=True, shell=True)
    if result.returncode != 0:
        print("[ERROR] Next.js build failed:")
        print(result.stdout)
        print(result.stderr)
        sys.exit(1)
    else:
        print("✓ Next.js build succeeded!")

    # 3. Clean build/web and copy Next.js out directory
    print("\n3. Deploying Next.js output to build/web/...")
    if os.path.exists(next_out_dir):
        # Clear old build/web contents
        for item in os.listdir(build_dir):
            item_path = os.path.join(build_dir, item)
            if os.path.isdir(item_path):
                shutil.rmtree(item_path, ignore_errors=True)
            else:
                try:
                    os.remove(item_path)
                except OSError:
                    pass

        # Copy all items from website/out to build/web
        for item in os.listdir(next_out_dir):
            s = os.path.join(next_out_dir, item)
            d = os.path.join(build_dir, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True)
            else:
                shutil.copy2(s, d)

    # 4. Copy Star.js and star_runtime.js if present
    if os.path.exists(star_js_src):
        shutil.copy2(star_js_src, os.path.join(build_dir, "Star.js"))

    print(f"\n✓ Modern Next.js ODCS Web Portal deployed successfully to '{build_dir}'!")
    for f in sorted(os.listdir(build_dir)):
        p = os.path.join(build_dir, f)
        if os.path.isfile(p):
            sz = os.path.getsize(p)
            print(f"   • {f:<25} ({sz:,} bytes)")
        else:
            print(f"   • {f}/ (directory)")

if __name__ == "__main__":
    build()
