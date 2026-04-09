import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const SOCIALS = [
  { label: 'Email', value: 'ishrewari242@gmail.com', icon: '📧', href: 'mailto:ishrewari242@gmail.com', color: '#00d4ff' },
  { label: 'Phone', value: '+91 9991317827', icon: '📱', href: 'tel:+919991317827', color: '#ff006e' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ishantnu108', icon: '🔗', href: 'https://linkedin.com/in/ishantnu108', color: '#00d4ff' },
  { label: 'GitHub', value: 'github.com/Ishantnu11', icon: '💻', href: 'https://github.com/Ishantnu11', color: '#ffd60a' },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'rgba(0,212,255,0.04)', border: '1px solid var(--border)',
    color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
    resize: 'none',
  };

  return (
    <section id="contact" className="section-pad" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.015))' }}>
      <div className="container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-tag">// contact.init()</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Open to internships, collaborations, and exciting AI projects. Let's build something intelligent together.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {SOCIALS.map((s, i) => (
                <motion.a key={s.label}
                  href={s.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  className="holo-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.2rem', textDecoration: 'none', cursor: 'none' }}
                >
                  <div className="corner tl" /><div className="corner br" />
                  <span style={{ fontSize: '1.3rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: s.color, letterSpacing: '0.2em', marginBottom: '0.1rem' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text)' }}>{s.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
            <div className="holo-card" style={{ padding: '2.5rem' }}>
              <div className="corner tl" /><div className="corner tr" /><div className="corner bl" /><div className="corner br" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.3em', marginBottom: '1.5rem' }}>
                &gt; SEND_MESSAGE.exe
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.4rem' }}>NAME</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required
                      style={inputStyle} onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 15px var(--cyan-dim)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.4rem' }}>EMAIL</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required
                      style={inputStyle} onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 15px var(--cyan-dim)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.4rem' }}>MESSAGE</label>
                  <textarea name="message" rows={6} value={form.message} onChange={handleChange} placeholder="Let's build something amazing together..." required
                    style={inputStyle} onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 15px var(--cyan-dim)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
                </div>
                <button type="submit" className="cyber-btn" disabled={status === 'sending'} style={{ width: '100%', textAlign: 'center', cursor: 'none' }}>
                  {status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(0,255,159,0.08)', border: '1px solid rgba(0,255,159,0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00ff9f', textAlign: 'center' }}>
                    ✓ MESSAGE TRANSMITTED SUCCESSFULLY
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(255,0,110,0.08)', border: '1px solid rgba(255,0,110,0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--magenta)', textAlign: 'center' }}>
                    ✗ TRANSMISSION FAILED — Try emailing directly
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: var(--text-dim); font-family: var(--font-body); }
      `}</style>
    </section>
  );
}
