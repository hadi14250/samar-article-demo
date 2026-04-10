import { useState } from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@samar_crossculture_consultant',
    url: 'https://instagram.com/samar_crossculture_consultant',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: '@samarsamykaram',
    url: 'https://linkedin.com/in/samarsamykaram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@Samar_CrossCultureConsultant',
    url: 'https://www.youtube.com/@Samar_CrossCultureConsultant',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const inputStyle = {
  width: '100%',
  padding: '0.875rem 1rem',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1.5px solid rgba(255,255,255,0.12)',
  borderRadius: '0.75rem',
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9375rem',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box',
}

function FormInput({ label, required, optional, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {label}
        {required && <span style={{ color: '#e5b981' }}>*</span>}
        {optional && <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontSize: '0.8rem' }}>(optional)</span>}
      </label>
      {props.as === 'textarea' ? (
        <textarea
          {...props}
          as={undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: 140,
            border: focused ? '1.5px solid rgba(229,185,129,0.6)' : '1.5px solid rgba(255,255,255,0.12)',
            backgroundColor: focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.05)',
          }}
        />
      ) : (
        <input
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            border: focused ? '1.5px solid rgba(229,185,129,0.6)' : '1.5px solid rgba(255,255,255,0.12)',
            backgroundColor: focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.05)',
          }}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xoqooajr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section className="section" style={{ backgroundColor: '#0d1111', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '30%', left: '30%', width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Reach Out</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Get In Touch</h1>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
              Whether you're looking for intercultural training for your family, team, or organization — Samar would love to hear from you.
            </p>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="section" style={{ backgroundColor: '#141717' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: 1100, margin: '0 auto' }} className="contact-grid">
            {/* Left sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div>
                <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                  Let's Connect
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  Samar works with individuals, families, and organizations across the GCC and North Africa. Reach out to start a conversation about your intercultural journey.
                </p>
              </div>

              {/* Info items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'GCC & North Africa' },
                  { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', text: 'Available in English & Arabic' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#e5b981" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <h3 style={{ color: '#e5b981', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Follow Samar</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e5b981'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >
                      <span style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                        {social.icon}
                      </span>
                      {social.handle}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="glass"
                style={{ borderRadius: '1.25rem', padding: '2.5rem 2rem', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Message Sent!</h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
                      Thank you for reaching out. Samar will get back to you shortly.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-primary">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="form-row">
                      <FormInput label="Full Name" required id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your full name" />
                      <FormInput label="Email" required id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" />
                    </div>
                    <FormInput label="Phone" optional id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                    <FormInput label="Message" required as="textarea" id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell Samar about your needs..." rows={5} />

                    {status === 'error' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.875rem' }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.65 : 1 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 2fr 3fr !important; }
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  )
}
