import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '0.8rem 2rem' : '1.2rem 2rem',
        background: scrolled ? 'rgba(2,2,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <button onClick={() => scrollTo('#hero')} style={{ background: 'none', border: 'none', cursor: 'none' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.2em', color: 'var(--cyan)', textShadow: '0 0 15px var(--cyan-glow)' }}>
          ISH<span style={{ color: 'var(--magenta)' }}>ANTNU</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.3em' }}>AI ENGINEER</div>
      </button>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="nav-links">
        {LINKS.map(l => (
          <button key={l.href} onClick={() => scrollTo(l.href)} style={{
            background: 'none', border: 'none', cursor: 'none',
            fontFamily: 'var(--font-display)', fontSize: '0.65rem',
            fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: active === l.href ? 'var(--cyan)' : 'var(--text-dim)',
            transition: 'color 0.3s',
            padding: '0.3rem 0', position: 'relative',
          }}>
            <span style={{ color: 'var(--magenta)', marginRight: '0.3rem', fontSize: '0.6rem' }}>_</span>
            {l.label}
            {active === l.href && <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />}
          </button>
        ))}
        <a href="https://github.com/Ishantnu11" target="_blank" rel="noreferrer" className="cyber-btn" style={{ fontSize: '0.6rem', padding: '0.5rem 1.2rem' }}>
          GitHub
        </a>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ham-btn"
        style={{ background: 'none', border: 'none', cursor: 'none', display: 'none', flexDirection: 'column', gap: 5 }}
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 24, height: 2, background: 'var(--cyan)', transition: 'all 0.3s' }} />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(2,2,10,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}
          >
            {LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: 'var(--font-display)', fontSize: '0.8rem',
                color: 'var(--text)', letterSpacing: '0.2em', textAlign: 'left',
                padding: '0.5rem 0', borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ color: 'var(--magenta)', marginRight: '0.5rem' }}>&gt;</span> {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
