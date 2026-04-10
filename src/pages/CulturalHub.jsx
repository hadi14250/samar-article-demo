import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    id: 1,
    title: 'Youth Intercultural Training',
    image: '/images/cultural_hub/youth-cover.svg',
    short: 'Tailored intercultural training for expat teenagers living in GCC and North Africa.',
    full: 'Our youth programs are designed for expat teenagers aged 13-18 living in the GCC and North Africa. Through interactive workshops, peer discussions, and cultural immersion activities, young people develop the skills to navigate multi-cultural environments, build meaningful cross-cultural friendships, and thrive academically and socially in their new home.',
  },
  {
    id: 2,
    title: 'Intercultural Workshops',
    image: '/images/cultural_hub/workshops.svg',
    short: 'Cross-cultural communication training for teams and organizations.',
    full: 'Our intercultural workshops are designed for corporate teams, NGOs, and educational institutions. We cover dimensions of culture, communication styles, conflict resolution across cultures, and strategies for building inclusive, high-performing cross-cultural teams.',
  },
  {
    id: 3,
    title: 'Public Speaking',
    image: '/images/cultural_hub/publick-speaking.svg',
    short: 'Engaging talks on cross-cultural topics for events and conferences.',
    full: 'Samar is available for keynotes, panels, and talks on 25+ topics including: Third Culture Kids, Expat Identity, Cross-Cultural Parenting, Cultural Intelligence, Repatriation, and more. Contact us to discuss your event needs.',
  },
  {
    id: 4,
    title: 'Single-Parent Expat Training',
    image: '/images/cultural_hub/signle-parent.svg',
    short: 'Specialized training for single-parent expat families navigating cultural transitions.',
    full: 'Single-parent expat families face unique challenges when relocating internationally. Our specialized program addresses the specific emotional, social, and cultural challenges faced by single parents and their children, providing practical strategies and community support.',
  },
  {
    id: 5,
    title: 'Arabic Language for Expats',
    image: '/images/cultural_hub/arabic-language.svg',
    short: 'Learn Arabic as an expat living in Arabic-speaking countries.',
    full: "Our Arabic language program for expats goes beyond grammar and vocabulary. We teach the cultural context behind the language — phrases, expressions, social norms, and communication styles that help expats truly connect with local communities.",
  },
  {
    id: 6,
    title: 'Family Relocation Training',
    image: '/images/cultural_hub/family-training.svg',
    short: 'Comprehensive intercultural training for families relocating internationally.',
    full: 'Relocating internationally as a family requires careful preparation. Our family relocation training helps every family member — parents and children alike — understand, appreciate, and adapt to their new cultural environment. We offer pre-departure, arrival, and re-integration support.',
  },
  {
    id: 7,
    title: 'Children Intercultural Training',
    image: '/images/cultural_hub/children-training.svg',
    short: 'Fun, engaging cultural training programs for expat children.',
    full: "Our children's programs use storytelling, games, and creative activities to help kids aged 4-12 understand and embrace cultural differences. We help children develop empathy, adaptability, and a positive cross-cultural identity.",
  },
]

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass service-card"
      style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.3s', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#1a2020', flexShrink: 0 }}>
        <img
          src={service.image}
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          className="service-img"
        />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3
          className="service-title"
          style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: '0.625rem', lineHeight: 1.3, transition: 'color 0.2s' }}
        >
          {service.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.65 }}>
          {service.short}
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.68)', fontSize: '0.9rem', lineHeight: 1.72 }}>
                {service.full}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#e5b981', fontSize: '0.875rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif', transition: 'gap 0.2s' }}
        >
          {expanded ? 'Read Less' : 'Read More'}
          <motion.svg
            width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      <style>{`
        .service-card:hover { border-color: rgba(229,185,129,0.3) !important; }
        .service-card:hover .service-img { transform: scale(1.05); }
        .service-card:hover .service-title { color: #e5b981 !important; }
      `}</style>
    </motion.div>
  )
}

export default function CulturalHub() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section
        className="section"
        style={{ backgroundColor: '#0d1111', position: 'relative', overflow: 'hidden', textAlign: 'center' }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '30%', left: '20%', width: 320, height: 320, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.06)', filter: 'blur(90px)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 280, height: 280, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.04)', filter: 'blur(90px)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Programs & Services</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>
              The Cultural Hub
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Specialized intercultural training programs for every stage of your cross-cultural journey.
            </p>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section" style={{ backgroundColor: '#141717' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '3rem', paddingBottom: '5rem', backgroundColor: '#0d1111' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ borderRadius: '1.5rem', padding: '3rem 2rem', maxWidth: 680, margin: '0 auto', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              Ready to Begin Your Journey?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 460, margin: '0 auto 2rem' }}>
              Contact Samar to discuss which program is right for you, your family, or your team.
            </p>
            <Link to="/contact" className="btn-primary">
              Get In Touch
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
