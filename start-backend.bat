@echo off
title Ishantnu Portfolio - BACKEND
color 0B

echo.
echo  =====================================================
echo   ISHANTNU PORTFOLIO  ^|  BACKEND SERVER
echo  =====================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found. Please install from https://nodejs.org
    pause
    exit /b 1
)

cd /d "%~dp0backend"

:: Copy .env if not exists
if not exist ".env" (
    echo  [INFO] Creating .env from template...
    copy ".env.example" ".env" >nul
    echo  [INFO] .env created. Edit it to configure SMTP for email.
    echo.
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo  [INFO] Installing backend dependencies...
    echo.
    call npm install
    echo.
)

echo  [OK] Starting backend on http://localhost:5000
echo  [OK] Press CTRL+C to stop
echo.
call npm start

pause
