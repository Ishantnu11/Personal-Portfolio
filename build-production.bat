@echo off
title Ishantnu Portfolio - BUILD FOR PRODUCTION
color 0E

echo.
echo  =====================================================
echo   ISHANTNU PORTFOLIO  ^|  PRODUCTION BUILD
echo  =====================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found.
    pause & exit /b 1
)

cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo  [INFO] Installing frontend packages...
    call npm install
)

echo  [INFO] Building optimized production bundle...
echo  [INFO] This may take 1-2 minutes...
echo.
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo  =====================================================
    echo   BUILD SUCCESSFUL!
    echo  ─────────────────────────────────────────────────────
    echo   Output folder: frontend\build\
    echo   Deploy this folder to:
    echo     - Netlify: drag & drop the build folder
    echo     - Vercel:  vercel --prod
    echo     - GitHub Pages: use gh-pages package
    echo  =====================================================
) else (
    echo.
    echo  [ERROR] Build failed. Check errors above.
)

echo.
pause
