import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const INFO = [
  { label: 'Name', value: 'Ishantnu' },
  { label: 'Email', value: 'ishrewari242@gmail.com' },
  { label: 'Phone', value: '+91 9991317827' },
  { label: 'Degree', value: 'B.Tech — Artificial Intelligence' },
  { label: 'University', value: 'Gurugram University (2023–2027)' },
  { label: 'Location', value: 'Gurugram, Haryana' },
  { label: 'GDG Role', value: 'Tech Team Member' },
  { label: 'TnP Role', value: 'Student Coordinator' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="section-pad" ref={ref}>
      <div className="container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-tag">// who_am_i.py</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left: Bio */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className="holo-card" style={{ padding: '2rem', borderRadius: 0 }}>
              <div className="corner tl" /><div className="corner tr" /><div className="corner bl" /><div className="corner br" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--magenta)', letterSpacing: '0.3em', marginBottom: '1.2rem' }}>&gt; PROFILE.md</div>
              <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Results-oriented B.Tech student specializing in <span style={{ color: 'var(--cyan)' }}>Artificial Intelligence</span>, with hands-on experience in building RAG-based systems and contextual AI dashboards.
              </p>
              <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Expert in leveraging <span style={{ color: 'var(--magenta)' }}>LLMs (Gemini, Llama)</span> and Vector Databases to transform unstructured video/audio data into actionable insights. Proficient in Python, Scikit-Learn, and Django.
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                Proven ability to engineer end-to-end ML pipelines and predictive models that solve complex real-world problems. Certified by <span style={{ color: 'var(--gold)' }}>IIT Bombay</span> (Robotics & AI) and <span style={{ color: 'var(--gold)' }}>Microsoft</span> (Generative AI).
              </p>

              {/* Languages */}
              <div style={{ marginTop: '1.8rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.3em', marginBottom: '0.8rem' }}>LANGUAGES_SPOKEN:</div>
                <div style={{ display: 'flex', gap: '0.7rem' }}>
                  {['English', 'Hindi', 'Punjabi'].map(l => (
                    <span key={l} className="tech-tag">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Data table */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {INFO.map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    padding: '0.7rem 1rem', transition: 'all 0.3s',
                  }}
                  className="holo-card"
                >
                  <div className="corner tl" /><div className="corner br" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.1em', minWidth: 100 }}>{item.label}:</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text)' }}>{item.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9, duration: 0.6 }}
              style={{ marginTop: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.3em', marginBottom: '0.8rem' }}>CERTIFICATIONS:</div>
              {['Robotics & AI Masterclass — IIT Bombay', 'Fundamentals of Generative AI — Microsoft', 'Data Science 101 — IBM SkillBuild', 'Power BI — Udemy'].map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: 6, height: 6, background: 'var(--cyan)', borderRadius: '50%', flexShrink: 0, boxShadow: '0 0 6px var(--cyan)' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-dim)' }}>{c}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
