import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TIMELINE = [
  {
    type: 'work',
    color: '#00d4ff',
    icon: '💼',
    title: 'Summer Intern — Data Analyst',
    org: 'Vienna Advantage (India) Pvt. Ltd.',
    location: 'Mohali',
    period: 'Jun 2025 – Jul 2025',
    points: [
      'Cleaned and preprocessed large ERP datasets using Google Sheets and SQL, ensuring 100% data integrity for client reporting.',
      'Collaborated on developing internal data models to track key performance metrics (KPIs) across CRM and Supply Chain modules.',
      'Applied statistical techniques and Python libraries to analyze trends, delivering actionable business insights to stakeholders.',
    ],
  },
  {
    type: 'org',
    color: '#ff006e',
    icon: '👨‍💻',
    title: 'Tech Team Member',
    org: 'Google Developer Groups (GDG) on Campus',
    location: 'Gurugram University',
    period: '2024 – Present',
    points: [
      'Active member of the tech team, contributing to workshops, developer events, and technical initiatives on campus.',
      'Collaborated with peers on open-source projects and technology-driven community building.',
    ],
  },
  {
    type: 'org',
    color: '#ffd60a',
    icon: '🎓',
    title: 'Student Coordinator',
    org: 'Training and Placement Cell',
    location: 'Gurugram University',
    period: '2025 – Present',
    points: [
      'Coordinated placement activities, industry connect sessions, and student-industry interaction events.',
      'Facilitated communication between students and recruiters, supporting successful placement outcomes.',
    ],
  },
  {
    type: 'education',
    color: '#00ff9f',
    icon: '🎓',
    title: 'B.Tech — Artificial Intelligence',
    org: 'Gurugram University',
    location: 'Gurugram, Haryana',
    period: 'Aug 2023 – Jul 2027',
    points: [
      'Specialization in Artificial Intelligence with focus on ML pipelines, NLP, and data-driven systems.',
      'Active in GDG and Training & Placement Cell alongside academics.',
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="experience" className="section-pad" ref={ref} style={{ background: 'linear-gradient(180deg, transparent, rgba(255,0,110,0.02) 50%, transparent)' }}>
      <div className="container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-tag">// experience.log</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical timeline line */}
          <motion.div
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, var(--cyan), var(--magenta), var(--gold), var(--green))',
              transformOrigin: 'top',
              boxShadow: '0 0 10px var(--cyan-glow)',
            }}
          />

          {TIMELINE.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.2, duration: 0.6 }}
              style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? '2.5rem' : 0, paddingLeft: '2rem' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -2.5 - 2, top: 8,
                width: 14, height: 14, borderRadius: '50%',
                background: item.color,
                boxShadow: `0 0 15px ${item.color}, 0 0 30px ${item.color}50`,
                border: '2px solid var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.4rem',
              }} />

              <div className="holo-card" style={{ padding: '1.6rem', borderLeft: `2px solid ${item.color}40` }}>
                <div className="corner tl" /><div className="corner br" />

                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: item.color, letterSpacing: '0.05em', textShadow: `0 0 12px ${item.color}50` }}>
                      {item.title}
                    </h3>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text)', marginTop: '0.2rem' }}>
                      {item.org} <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>— {item.location}</span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: item.color,
                    background: `${item.color}10`, border: `1px solid ${item.color}30`,
                    padding: '0.3rem 0.8rem', height: 'fit-content', whiteSpace: 'nowrap',
                  }}>
                    {item.period}
                  </span>
                </div>

                {item.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.7rem', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: '0.45rem', boxShadow: `0 0 5px ${item.color}` }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
