import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Cultural Hub', path: '/cultural-hub' },
  {
    label: 'Resources',
    path: '/resources',
    dropdown: [
      { label: 'Featured', path: '/resources?tab=featured' },
      { label: 'Books', path: '/resources?tab=books' },
      { label: 'Videos', path: '/resources?tab=videos' },
      { label: 'Articles', path: '/resources?tab=articles' },
    ],
  },
  { label: 'Contact Me', path: '/contact' },
]

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#141717',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    transition: 'box-shadow 0.3s',
  },
  navScrolled: {
    boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
  },
  inner: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
  },
  logo: {
    height: 44,
    width: 'auto',
    display: 'block',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    listStyle: 'none',
  },
  navLink: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'color 0.2s',
    padding: '0.25rem 0',
    position: 'relative',
  },
  navLinkActive: {
    color: '#e5b981',
  },
  dropdownTrigger: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '0.02em',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '0.25rem 0',
    transition: 'color 0.2s',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 0.75rem)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1a1f1f',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
    minWidth: 160,
    zIndex: 100,
  },
  dropdownItem: {
    display: 'block',
    padding: '0.75rem 1.25rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    transition: 'color 0.15s, background 0.15s',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  bar: {
    display: 'block',
    width: 24,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
    transition: 'all 0.3s',
    transformOrigin: 'center',
  },
  mobileMenu: {
    backgroundColor: '#111515',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    padding: '1rem 1.25rem 1.5rem',
  },
  mobileLink: {
    display: 'block',
    padding: '0.75rem 0.75rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    transition: 'color 0.2s, background 0.2s',
  },
  mobileLinkActive: {
    color: '#e5b981',
    backgroundColor: 'rgba(229,185,129,0.07)',
  },
  mobileDropdownLabel: {
    display: 'block',
    padding: '0.75rem 0.75rem 0.35rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#e5b981',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  mobileDropdownItem: {
    display: 'block',
    padding: '0.6rem 1.5rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setResourcesOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      <div style={styles.inner}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/logo.svg" alt="Samar Karam" style={styles.logo} />
        </Link>

        {/* Desktop Nav */}
        <ul style={{ ...styles.desktopNav, display: window.innerWidth < 1024 ? 'none' : 'flex' }}
          className="desktop-nav">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label} style={{ position: 'relative' }}
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  style={{
                    ...styles.dropdownTrigger,
                    color: resourcesOpen ? '#e5b981' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  {link.label}
                  <svg
                    style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      style={styles.dropdown}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          style={styles.dropdownItem}
                          onMouseEnter={e => { e.currentTarget.style.color = '#e5b981'; e.currentTarget.style.backgroundColor = 'rgba(229,185,129,0.07)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    color: isActive || hovered === link.label ? '#e5b981' : 'rgba(255,255,255,0.75)',
                  })}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {link.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Hamburger */}
        <button
          className="mobile-hamburger"
          style={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ ...styles.bar, transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ ...styles.bar, opacity: isOpen ? 0 : 1 }} />
          <span style={{ ...styles.bar, transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={styles.mobileMenu}>
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <span style={styles.mobileDropdownLabel}>{link.label}</span>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        style={styles.mobileDropdownItem}
                        onMouseEnter={e => e.currentTarget.style.color = '#e5b981'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    end={link.path === '/'}
                    style={({ isActive }) => ({
                      ...styles.mobileLink,
                      ...(isActive ? styles.mobileLinkActive : {}),
                    })}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
