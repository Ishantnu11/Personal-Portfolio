import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PROJECTS = [
  {
    id: 1,
    title: 'RAG-Based AI Teaching Assistant',
    tag: 'AI / NLP / LLM',
    type: 'FEATURED',
    color: '#00d4ff',
    emoji: '🤖',
    description: 'End-to-end RAG pipeline that transforms raw course videos into an interactive AI Teaching Assistant. Combines semantic search with TF-IDF fallback for robust retrieval.',
    highlights: [
      'FFmpeg automated audio extraction & async transcription',
      'BGE-M3 embeddings via Ollama for semantic search',
      'TF-IDF fallback mechanism for API downtime resilience',
      'Custom JSON-to-Vector indexing with Joblib format',
      'Cosine Similarity for low-latency similarity mapping',
      'Time-stamped JSON chunks for "jump-to-timestamp" feature',
    ],
    stack: ['Python', 'LangChain', 'BGE-M3', 'Ollama', 'TF-IDF', 'Joblib', 'FFmpeg', 'Cosine Similarity'],
    github: 'https://github.com/Ishantnu11',
  },
  {
    id: 2,
    title: 'E-Commerce Sales & Customer Segmentation',
    tag: 'Data Analytics / BI',
    type: 'CAPSTONE',
    color: '#ff006e',
    emoji: '📊',
    description: 'Comprehensive retail analytics platform for identifying high-value customers, optimizing profitability, and uncovering shipping route inefficiencies via Pareto analysis.',
    highlights: [
      'Pareto Analysis (80/20) — top 20% customers → 80% revenue',
      'Feature engineering: calculated "Delivery Days" metric',
      'Interactive Power BI dashboard with regional heat maps',
      'Scatter plots for underperforming product identification',
      'Identified 15% profit leakage in specific shipping routes',
      'Inventory adjustment recommendations',
    ],
    stack: ['Python', 'Pandas', 'SQL', 'Power BI', 'Excel', 'Data Cleaning'],
    github: 'https://github.com/Ishantnu11',
  },
  {
    id: 3,
    title: 'Gurgaon Housing Price Predictor',
    tag: 'Machine Learning',
    type: 'ML',
    color: '#ffd60a',
    emoji: '🏠',
    description: 'Production-ready ML utility automating the transition from EDA to inference. Modular Python framework separating training logic from lightweight batch-processing inference.',
    highlights: [
      'Stratified shuffling for representative train/test splits',
      'Reduced sampling bias in price predictions',
      'Modular Python framework for clean separation of concerns',
      'CSV-based batch processing for deployment',
      'End-to-end: EDA → Feature Engineering → Inference',
    ],
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Joblib', 'Regression Analysis'],
    github: 'https://github.com/Ishantnu11',
  },
  {
    id: 4,
    title: 'OLA Monthly Performance Report',
    tag: 'Data Visualization',
    type: 'BI',
    color: '#00ff9f',
    emoji: '🚗',
    description: 'Comprehensive monthly reporting dashboard for ride-sharing metrics with 100% data accuracy, visualizing KPIs across ride volume, peak hours, and revenue trends.',
    highlights: [
      'Removed duplicates & standardized date formats',
      '100% data accuracy post-preprocessing',
      'KPI visualization: ride volume, peak hours, revenue',
      'Revenue trend analysis and forecasting charts',
    ],
    stack: ['Power BI', 'Python', 'Pandas', 'Excel', 'Data Cleaning'],
    github: 'https://github.com/Ishantnu11',
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="section-pad" ref={ref}>
      <div className="container">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-tag">// projects.log</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.6 }}
              className="holo-card"
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
              style={{ padding: '1.8rem', cursor: 'none', borderLeft: `2px solid ${p.color}40`, transition: 'all 0.3s' }}
            >
              <div className="corner tl" /><div className="corner br" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>{p.emoji}</div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  color: p.color, background: `${p.color}15`,
                  border: `1px solid ${p.color}30`, padding: '0.2rem 0.6rem',
                  letterSpacing: '0.1em',
                }}>
                  {p.type}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: p.color, letterSpacing: '0.05em', marginBottom: '0.4rem', textShadow: `0 0 15px ${p.color}50` }}>
                {p.title}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                {p.tag}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                {p.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                {p.stack.slice(0, 4).map(s => (
                  <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: p.color, background: `${p.color}10`, border: `1px solid ${p.color}20`, padding: '0.15rem 0.5rem' }}>{s}</span>
                ))}
                {p.stack.length > 4 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)', padding: '0.15rem 0.5rem' }}>+{p.stack.length - 4}</span>}
              </div>

              <button style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: p.color, letterSpacing: '0.1em' }}>
                {selected?.id === p.id ? '▲ COLLAPSE' : '▼ DETAILS'}
              </button>

              <AnimatePresence>
                {selected?.id === p.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}>
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${p.color}20` }}>
                      {p.highlights.map((h, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', alignItems: 'start' }}>
                          <div style={{ width: 5, height: 5, background: p.color, borderRadius: '50%', flexShrink: 0, marginTop: '0.4rem', boxShadow: `0 0 6px ${p.color}` }} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{h}</span>
                        </div>
                      ))}
                      <a href={p.github} target="_blank" rel="noreferrer" className="cyber-btn" style={{ fontSize: '0.58rem', padding: '0.5rem 1.2rem', display: 'inline-block', marginTop: '1rem' }}>
                        View on GitHub →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="https://github.com/Ishantnu11" target="_blank" rel="noreferrer" className="cyber-btn">
            View All on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
