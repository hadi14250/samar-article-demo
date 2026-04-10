import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const features = [
  'Youth Intercultural Training',
  'Family Relocation Programs',
  'Corporate Workshops',
  'Arabic Language for Expats',
  'Children Intercultural Training',
]

const cards = [
  { title: 'Youth Training', icon: '🎓', accent: '#e5b981' },
  { title: 'Family Relocation', icon: '🏠', accent: '#6baed6' },
  { title: 'Workshops', icon: '💼', accent: '#9b7fe8' },
  { title: 'Public Speaking', icon: '🎤', accent: '#52c97a' },
]

export default function CulturalHubPreview() {
  return (
    <section className="section" style={{ backgroundColor: '#0d1111', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle glow */}
      <div style={{ position: 'absolute', top: '50%', right: '-10%', width: 400, height: 400, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.04)', filter: 'blur(80px)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', alignItems: 'center' }} className="hub-grid">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Programs & Services</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Explore The{' '}
              <span className="gradient-text">Cultural Hub</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 480 }}>
              Tailored training programs designed for expats, families, and professionals navigating cross-cultural environments.
            </p>

            {/* Feature list */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2.5rem' }}>
              {features.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.68)', fontSize: '0.95rem' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="11" fill="none" viewBox="0 0 12 12" stroke="#e5b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/cultural-hub" className="btn-primary">
              Explore Now
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Right – card grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="glass"
                  style={{ borderRadius: '1rem', padding: '1.5rem', background: `linear-gradient(135deg, ${card.accent}18 0%, ${card.accent}05 100%)` }}
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>{card.icon}</span>
                  <h3 style={{ color: '#fff', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{card.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hub-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
