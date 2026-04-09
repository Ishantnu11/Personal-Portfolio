@echo off
title Ishantnu Portfolio - FRONTEND
color 0B

echo.
echo  =====================================================
echo   ISHANTNU PORTFOLIO  ^|  FRONTEND (React)
echo  =====================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found. Please install from https://nodejs.org
    pause
    exit /b 1
)

cd /d "%~dp0frontend"

:: Install dependencies if needed
if not exist "node_modules" (
    echo  [INFO] Installing frontend dependencies...
    echo  [INFO] This may take a few minutes on first run...
    echo.
    call npm install
    echo.
)

echo  [OK] Starting frontend on http://localhost:3000
echo  [OK] Browser will open automatically...
echo  [OK] Press CTRL+C to stop
echo.
call npm start

pause
