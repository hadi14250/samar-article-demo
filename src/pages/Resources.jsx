import { motion } from 'framer-motion'
import ResourceTabs from '../components/ResourceTabs'

export default function Resources() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section className="section" style={{ backgroundColor: '#0d1111', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '30%', right: '20%', width: 320, height: 320, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.05)', filter: 'blur(90px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Learning Materials</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Resources</h1>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
              Curated books, videos, and articles to deepen your cross-cultural understanding.
            </p>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section" style={{ backgroundColor: '#141717' }}>
        <div className="container">
          <ResourceTabs />
        </div>
      </section>
    </div>
  )
}
