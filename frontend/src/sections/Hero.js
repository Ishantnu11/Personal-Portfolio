import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = ['AI Engineer', 'Data Scientist', 'RAG Systems Builder', 'ML Pipeline Developer', 'LLM Integrator'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const canvasRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (!deleting && charIdx < role.length) {
      timeout = setTimeout(() => { setDisplayed(role.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 80);
    } else if (!deleting && charIdx === role.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(role.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  // 3D rotating hexagon on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0, raf;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      angle += 0.008;

      // Outer hex rings
      for (let ring = 0; ring < 3; ring++) {
        const r = 80 + ring * 40;
        const sides = 6;
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
          const a = (i / sides) * Math.PI * 2 + angle * (ring % 2 === 0 ? 1 : -1);
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a) * 0.5;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0,212,255,${0.3 - ring * 0.07})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Rotating dots on outer ring
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + angle;
        const x = cx + 160 * Math.cos(a);
        const y = cy + 80 * Math.sin(a);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(0,212,255,0.8)' : 'rgba(255,0,110,0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = i % 2 === 0 ? '#00d4ff' : '#ff006e';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Inner core
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      grad.addColorStop(0, 'rgba(0,212,255,0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Cross lines
      ctx.strokeStyle = 'rgba(0,212,255,0.15)';
      ctx.lineWidth = 0.5;
      [-1, 0, 1].forEach(off => {
        ctx.beginPath();
        ctx.moveTo(cx + off * 20, 0);
        ctx.lineTo(cx + off * 20, H);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, cy + off * 20);
        ctx.lineTo(W, cy + off * 20);
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '5rem' }}>
      {/* Background radial glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,0,110,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Left: Text */}
        <div>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--magenta)', letterSpacing: '0.4em', marginBottom: '1rem' }}>
              &gt; HELLO_WORLD.exe
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="glitch" data-text="ISHANTNU"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, letterSpacing: '0.06em', lineHeight: 1.0, color: 'var(--cyan)', textShadow: '0 0 30px var(--cyan-glow)', marginBottom: '0.5rem' }}
          >
            ISHANTNU
          </motion.h1>

          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem,2.5vw,1.3rem)', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text)', marginBottom: '1.5rem', minHeight: '1.8rem' }}>
            <span style={{ color: 'var(--magenta)' }}>// </span>
            <span style={{ color: 'var(--cyan)' }}>{displayed}</span>
            <span style={{ color: 'var(--cyan)', animation: 'blink 1s step-end infinite' }}>_</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 480, marginBottom: '2.5rem' }}>
            B.Tech AI student at Gurugram University. Building <span style={{ color: 'var(--cyan)' }}>RAG-based systems</span>, LLM integrations, and end-to-end ML pipelines. Member of <span style={{ color: 'var(--magenta)' }}>Google Developer Groups</span> on Campus.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="cyber-btn" onClick={() => scrollTo('#projects')}>View Projects</button>
            <button className="cyber-btn-alt" onClick={() => scrollTo('#contact')}>Contact Me</button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
            style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[
              { val: '3+', label: 'AI Projects' },
              { val: 'RAG', label: 'Systems Built' },
              { val: 'GDG', label: 'Tech Team' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--cyan)', textShadow: '0 0 15px var(--cyan-glow)' }}>{stat.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginTop: '0.2rem' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Canvas */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <canvas ref={canvasRef} width={380} height={380} style={{ maxWidth: '100%' }} />
          {/* Floating badges */}
          {[
            { label: 'Python', icon: '🐍', pos: { top: '5%', right: '5%' } },
            { label: 'LangChain', icon: '🔗', pos: { bottom: '20%', left: '0%' } },
            { label: 'Power BI', icon: '📊', pos: { top: '35%', right: '0%' } },
          ].map(b => (
            <motion.div key={b.label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', ...b.pos,
                background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)',
                backdropFilter: 'blur(12px)', padding: '0.5rem 0.9rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)',
                display: 'flex', gap: '0.4rem', alignItems: 'center',
              }}>
              {b.icon} {b.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.3em' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 1, height: 40, background: 'linear-gradient(var(--cyan), transparent)' }} />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #hero .container { grid-template-columns: 1fr !important; text-align: center; }
          #hero canvas { width: 260px !important; height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
