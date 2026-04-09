import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      padding: '2rem',
      borderTop: '1px solid var(--border)',
      background: 'rgba(0,0,0,0.3)',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 900, letterSpacing: '0.25em', color: 'var(--cyan)', textShadow: '0 0 15px var(--cyan-glow)', marginBottom: '0.4rem' }}>
        ISH<span style={{ color: 'var(--magenta)' }}>ANTNU</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.2em' }}>
        &copy; {year} — AI ENGINEER &amp; DATA SCIENTIST
      </div>
      <div style={{ marginTop: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(200,230,255,0.2)' }}>
        BUILT WITH REACT + THREE.JS + FRAMER MOTION
      </div>
    </footer>
  );
}
