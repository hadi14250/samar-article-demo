import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/images/hero-bg.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,23,23,0.92) 0%, rgba(20,23,23,0.75) 50%, rgba(20,23,23,0.45) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141717 0%, transparent 50%)' }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: 640 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 9999, backgroundColor: 'rgba(229,185,129,0.1)', border: '1px solid rgba(229,185,129,0.3)', marginBottom: '1.5rem' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#e5b981', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#e5b981', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>Cross-Cultural Consultant & Trainer</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '1.5rem', fontFamily: 'Quicksand, sans-serif' }}
          >
            What Makes Us{' '}
            <span className="gradient-text">Different?</span>
            <br />
            What Makes Us The Same?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 540 }}
          >
            Samar is a certified cross-cultural consultant and trainer with over two decades of experience. She has worked with expat families, corporate teams, and international students across the GCC and North Africa, helping them navigate cultural transitions with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
          >
            <Link to="/contact" className="btn-primary">
              Contact Me
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/cultural-hub" className="btn-outline">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: 1.5, height: 32, background: 'linear-gradient(to bottom, #e5b981, transparent)', borderRadius: 2 }}
        />
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
