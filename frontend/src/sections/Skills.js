import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SKILL_GROUPS = [
  {
    category: 'AI & Machine Learning',
    icon: '🧠',
    color: '#00d4ff',
    skills: [
      { name: 'Python (Pandas, NumPy, Scikit-Learn)', level: 90 },
      { name: 'RAG Systems & LangChain', level: 85 },
      { name: 'NLP & Deep Learning', level: 78 },
      { name: 'LLMs (Gemini, Llama, Ollama)', level: 82 },
      { name: 'Vector Databases & Embeddings', level: 80 },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: '📊',
    color: '#ff006e',
    skills: [
      { name: 'Microsoft Power BI', level: 88 },
      { name: 'SQL & MySQL', level: 85 },
      { name: 'Excel (Advanced)', level: 82 },
      { name: 'Data Cleaning & EDA', level: 90 },
      { name: 'Statistical Analysis', level: 78 },
    ],
  },
  {
    category: 'Development & Tools',
    icon: '⚙️',
    color: '#ffd60a',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'Django / Python Web', level: 70 },
      { name: 'Google Cloud Platform', level: 65 },
      { name: 'R Programming', level: 70 },
      { name: 'MongoDB', level: 68 },
    ],
  },
];

const TECH_BADGES = ['Python','LangChain','Scikit-Learn','Power BI','SQL','NumPy','Pandas','Ollama','BGE-M3','TF-IDF','Joblib','FFmpeg','GCP','Git','Django','R','MongoDB','Matplotlib','Excel','Google Sheets'];

function SkillBar({ name, level, color, delay, inView }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color }}>
          {inView ? `${level}%` : '0%'}
        </span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}88)`, position: 'relative' }}
        >
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(50%,-50%)', width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="section-pad" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.02) 50%, transparent)' }}>
      <div className="container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-tag">// skills_matrix.json</span>
          <h2 className="section-title">Skill Matrix</h2>
          <div className="section-line" />
        </motion.div>

        {/* Tab selector */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {SKILL_GROUPS.map((g, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              background: active === i ? `${g.color}18` : 'transparent',
              border: `1px solid ${active === i ? g.color : 'var(--border)'}`,
              color: active === i ? g.color : 'var(--text-dim)',
              fontFamily: 'var(--font-display)', fontSize: '0.65rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '0.6rem 1.4rem', cursor: 'none',
              transition: 'all 0.3s',
              boxShadow: active === i ? `0 0 20px ${g.color}30` : 'none',
            }}>
              {g.icon} {g.category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
          <motion.div key={active}
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}
            className="holo-card" style={{ padding: '2rem' }}>
            <div className="corner tl" /><div className="corner tr" /><div className="corner bl" /><div className="corner br" />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: SKILL_GROUPS[active].color, letterSpacing: '0.3em', marginBottom: '1.5rem' }}>
              &gt; {SKILL_GROUPS[active].category.toUpperCase()}
            </div>
            {SKILL_GROUPS[active].skills.map((s, i) => (
              <SkillBar key={s.name} {...s} color={SKILL_GROUPS[active].color} delay={0.1 + i * 0.1} inView={inView} />
            ))}
          </motion.div>

          {/* Hex visualization */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', alignContent: 'start' }}>
            {SKILL_GROUPS[active].skills.map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                style={{
                  aspectRatio: '1',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: `radial-gradient(circle, ${SKILL_GROUPS[active].color}10 0%, transparent 70%)`,
                  border: `1px solid ${SKILL_GROUPS[active].color}30`,
                  padding: '1rem',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  cursor: 'none',
                }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, color: SKILL_GROUPS[active].color, textShadow: `0 0 10px ${SKILL_GROUPS[active].color}` }}>
                  {s.level}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '0.2rem' }}>%</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech badge cloud */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '1.2rem' }}>TECH_STACK:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {TECH_BADGES.map((t, i) => (
              <motion.span key={t} className="tech-tag"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 + i * 0.04 }}
                whileHover={{ scale: 1.05, borderColor: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan-dim)' }}>
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills .container > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
