@echo off
setlocal enabledelayedexpansion
title ODCS Production VPS Deployment (103.71.99.204)

echo ==============================================================================
echo   ODCS AUTOMATED VPS DEPLOYMENT - UBUNTU LINUX (103.71.99.204)
echo   Star Language UI (WASM) + Haven Language v2.0 Backend
echo ==============================================================================
echo.

set VPS_IP=103.71.99.204
set VPS_USER=odcs

if not "%~1"=="" set VPS_IP=%~1
if not "%~2"=="" set VPS_USER=%~2

echo Target VPS: %VPS_USER%@%VPS_IP%
echo.

echo [Step 1/3] Packaging latest Star SDK, Haven Runtime and WebAssembly UI...
python vps\package_vps_bundle.py
if errorlevel 1 (
    echo.
    echo [ERROR] Packaging failed. Please check Python installation.
    pause
    exit /b 1
)

echo.
echo [Step 2/3] Uploading odcs-vps-bundle-ubuntu.tar.gz to %VPS_USER%@%VPS_IP%:~/ ...
echo (Enter password for %VPS_USER% when prompted)
echo.
scp -o StrictHostKeyChecking=accept-new "vps\dist\odcs-vps-bundle-ubuntu.tar.gz" %VPS_USER%@%VPS_IP%:~/
if errorlevel 1 (
    echo.
    echo [ERROR] SCP upload failed. Please verify password and network.
    pause
    exit /b 1
)

echo.
echo [Step 3/3] Extracting bundle and executing installer on %VPS_IP%...
echo (Enter sudo password if prompted by the installer)
echo.
ssh -t %VPS_USER%@%VPS_IP% "tar -xzf ~/odcs-vps-bundle-ubuntu.tar.gz && cd odcs-vps-bundle-ubuntu && sudo bash install_ubuntu.sh"

echo.
echo ==============================================================================
echo   DEPLOYMENT FINISHED!
echo   Public Portal: http://%VPS_IP%/
echo   Health Check:  http://%VPS_IP%/healthz
echo ==============================================================================
echo.
pause
