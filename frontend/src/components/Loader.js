import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  'INITIALIZING NEURAL CORE...',
  'LOADING AI SUBSYSTEMS...',
  'SYNCING VECTOR DATABASE...',
  'CALIBRATING RAG PIPELINE...',
  'RENDERING HOLOGRAPHIC UI...',
  'BOOT SEQUENCE COMPLETE ✓',
];

export default function Loader() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 18 + 5, 100);
        const idx = Math.min(Math.floor((next / 100) * STEPS.length), STEPS.length - 1);
        setStep(idx);
        if (idx > logs.length - 1) {
          setLogs(prev => [...prev, STEPS[idx]]);
        }
        return next;
      });
    }, 380);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 10000, overflow: 'hidden',
      }}
    >
      {/* Rotating rings */}
      <div style={{ position: 'relative', width: 180, height: 180, marginBottom: '2.5rem' }}>
        {[160, 130, 100].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: size, height: size,
            transform: 'translate(-50%,-50%)',
            border: `1px solid ${i === 0 ? 'rgba(0,212,255,0.3)' : i === 1 ? 'rgba(255,0,110,0.3)' : 'rgba(0,212,255,0.5)'}`,
            borderTopColor: i === 0 ? 'var(--cyan)' : i === 1 ? 'var(--magenta)' : 'var(--cyan)',
            borderRadius: '50%',
            animation: `spin${i % 2 === 0 ? 'F' : 'R'} ${1.5 + i * 0.5}s linear infinite`,
          }} />
        ))}
        {/* Core */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 50, height: 50,
          background: 'radial-gradient(circle, rgba(0,212,255,0.8) 0%, rgba(0,212,255,0.1) 70%, transparent 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 30px var(--cyan), 0 0 60px rgba(0,212,255,0.3)',
          animation: 'corePulse 1.5s ease-in-out infinite',
        }} />
        <style>{`
          @keyframes spinF { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
          @keyframes spinR { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
          @keyframes corePulse { 0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.15)} }
        `}</style>
      </div>

      {/* Name */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontWeight: 900, letterSpacing: '0.3em', color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan-glow)', marginBottom: '0.4rem' }}>
        ISHANTNU
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--magenta)', letterSpacing: '0.4em', marginBottom: '2.5rem' }}>
        AI ENGINEER // DATA SCIENTIST
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(400px, 80vw)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>SYSTEM BOOT</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)' }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 3, background: 'rgba(0,212,255,0.1)', position: 'relative', overflow: 'visible' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--magenta))', position: 'relative' }}
            transition={{ ease: 'easeOut' }}
          >
            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(50%,-50%)', width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan)' }} />
          </motion.div>
        </div>
      </div>

      {/* Log console */}
      <div style={{
        width: 'min(400px, 80vw)',
        background: 'rgba(0,212,255,0.03)',
        border: '1px solid rgba(0,212,255,0.1)',
        padding: '0.8rem 1rem',
        height: 90,
        overflow: 'hidden',
      }}>
        {logs.slice(-4).map((l, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: i === logs.slice(-4).length - 1 ? 'var(--cyan)' : 'var(--text-dim)', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--magenta)', marginRight: '0.5rem' }}>&gt;</span>{l}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
