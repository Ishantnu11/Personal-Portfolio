# ISHANTNU — Futuristic AI Portfolio

> Personal portfolio website for **Ishantnu** — AI Engineer & Data Scientist  
> Built with React, Canvas WebGL particles, Framer Motion, and Express.js

---

## 🚀 Quick Start (Windows)

### One-click launch:
```
Double-click  →  START-PORTFOLIO.bat
```
This installs all dependencies (first run only) and opens both servers + browser automatically.

---

## 📁 Project Structure

```
portfolio/
├── START-PORTFOLIO.bat       ← Launch everything (recommended)
├── start-frontend.bat        ← Frontend only
├── start-backend.bat         ← Backend only
├── build-production.bat      ← Create production build
│
├── frontend/                 ← React App
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js            ← Root component
│   │   ├── App.css           ← Global futuristic design system
│   │   ├── components/
│   │   │   ├── Loader.js     ← Animated boot sequence
│   │   │   ├── CustomCursor.js
│   │   │   ├── Navbar.js
│   │   │   ├── ParticleCanvas.js  ← WebGL particle universe
│   │   │   └── Footer.js
│   │   └── sections/
│   │       ├── Hero.js       ← 3D rotating hexagon + typewriter
│   │       ├── About.js      ← Info grid + certifications
│   │       ├── Skills.js     ← Animated skill bars + hex orbs
│   │       ├── Projects.js   ← Expandable project cards
│   │       ├── Experience.js ← Animated timeline
│   │       └── Contact.js    ← Contact form + social links
│   └── package.json
│
└── backend/                  ← Express.js API
    ├── server.js             ← Main API server
    ├── .env.example          ← Environment template
    └── package.json
```

---

## 🌐 URLs

| Service   | URL                             |
|-----------|---------------------------------|
| Frontend  | http://localhost:3000           |
| Backend   | http://localhost:5000           |
| API Check | http://localhost:5000/api/health |

---

## ✉️ Email Configuration (Optional)

To enable the contact form to actually send emails:

1. Copy `backend/.env.example` → `backend/.env`
2. Fill in your Gmail credentials:

```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
RECIPIENT_EMAIL=ishrewari242@gmail.com
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords

Without SMTP configured, contact form submissions are logged to the backend console.

---

## 🎨 Features

- **Futuristic Boot Loader** — animated ring system with progress console
- **Custom Magnetic Cursor** — glowing dot + trailing ring
- **WebGL Particle Universe** — interactive particles with mouse connections
- **3D Rotating Hexagon** — canvas-drawn on Hero section
- **Typewriter Role Text** — cycles through AI roles
- **Hexagonal Skill Orbs** — animated skill visualization
- **Expandable Project Cards** — click to reveal full details
- **Animated Timeline** — experience with colored connectors
- **Contact API** — backend form with email support
- **Scanline Overlay** — CRT monitor aesthetic
- **Glitch Text Effect** — on main name
- **Responsive** — works on mobile too

---

## 🚢 Deploy to Production

### Frontend → Netlify (free)
1. Run `build-production.bat`
2. Go to [netlify.com](https://netlify.com)
3. Drag & drop the `frontend/build` folder
4. Done!

### Backend → Railway / Render (free)
1. Push project to GitHub
2. Connect repo to [railway.app](https://railway.app) or [render.com](https://render.com)
3. Set root directory to `backend`
4. Add environment variables from `.env.example`

---

## 🛠 Requirements

- **Node.js** v18+ → https://nodejs.org
- **npm** (comes with Node.js)
- Windows 10/11 (for .bat files) or use `npm start` manually on Mac/Linux

---

## 📬 Contact

- **Email**: ishrewari242@gmail.com  
- **GitHub**: https://github.com/Ishantnu11  
- **LinkedIn**: https://linkedin.com/in/ishantnu108
