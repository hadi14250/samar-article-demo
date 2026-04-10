import { motion } from 'framer-motion'

export default function LogoCarousel({ title, logos, subtitle }) {
  const duplicated = [...logos, ...logos, ...logos]

  return (
    <section className="section" style={{ backgroundColor: '#0d1111', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {subtitle && <span className="section-label">{subtitle}</span>}
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#fff' }}>{title}</h2>
          <div className="section-divider" />
        </motion.div>
      </div>

      {/* Scrolling track — full bleed */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #0d1111, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #0d1111, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div style={{ overflow: 'hidden' }}>
          <div className="logo-scroll">
            {duplicated.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                style={{ flexShrink: 0, width: 140, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1.25rem' }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{ maxHeight: 52, maxWidth: 110, width: 'auto', height: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.55, transition: 'filter 0.3s, opacity 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.55' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
