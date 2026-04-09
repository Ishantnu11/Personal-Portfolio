@echo off
title Ishantnu Portfolio - FULL STACK LAUNCHER
color 0B

echo.
echo  =====================================================
echo.
echo    ██╗███████╗██╗  ██╗ █████╗ ███╗   ██╗████████╗███╗   ██╗██╗   ██╗
echo    ██║██╔════╝██║  ██║██╔══██╗████╗  ██║╚══██╔══╝████╗  ██║██║   ██║
echo    ██║███████╗███████║███████║██╔██╗ ██║   ██║   ██╔██╗ ██║██║   ██║
echo    ██║╚════██║██╔══██║██╔══██║██║╚██╗██║   ██║   ██║╚██╗██║██║   ██║
echo    ██║███████║██║  ██║██║  ██║██║ ╚████║   ██║   ██║ ╚████║╚██████╔╝
echo    ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝
echo.
echo   AI ENGINEER  //  DATA SCIENTIST  //  PORTFOLIO v1.0
echo.
echo  =====================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js is required but not found.
    echo  [INFO]  Download from: https://nodejs.org/en/download
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo  [OK] Node.js detected: %NODE_VER%
echo.

:: ── BACKEND SETUP ─────────────────────────────────────────────
echo  [1/4] Setting up backend...
cd /d "%~dp0backend"

if not exist ".env" (
    echo  [INFO] Creating .env from template...
    copy ".env.example" ".env" >nul 2>&1
    echo  [INFO] Edit backend\.env to configure email (optional)
)

if not exist "node_modules" (
    echo  [INFO] Installing backend packages (first time only)...
    call npm install --silent
    echo  [OK] Backend packages installed.
) else (
    echo  [OK] Backend packages already installed.
)

:: ── FRONTEND SETUP ────────────────────────────────────────────
echo.
echo  [2/4] Setting up frontend...
cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo  [INFO] Installing frontend packages (may take 2-3 mins first time)...
    call npm install --silent
    echo  [OK] Frontend packages installed.
) else (
    echo  [OK] Frontend packages already installed.
)

:: ── LAUNCH SERVERS ────────────────────────────────────────────
echo.
echo  [3/4] Launching backend on http://localhost:5000 ...
start "ISHANTNU-BACKEND" cmd /k "cd /d "%~dp0backend" && color 0A && echo  Backend running... && npm start"

echo  [4/4] Launching frontend on http://localhost:3000 ...
timeout /t 2 /nobreak >nul
start "ISHANTNU-FRONTEND" cmd /k "cd /d "%~dp0frontend" && color 0B && echo  Frontend starting... && npm start"

echo.
echo  =====================================================
echo   PORTFOLIO IS LAUNCHING!
echo  ─────────────────────────────────────────────────────
echo   Frontend  →  http://localhost:3000
echo   Backend   →  http://localhost:5000
echo   API Check →  http://localhost:5000/api/health
echo  ─────────────────────────────────────────────────────
echo   Two terminal windows have opened.
echo   Close them to stop the servers.
echo  =====================================================
echo.

timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"

pause
