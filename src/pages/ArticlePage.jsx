import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getArticleBySlug } from '../lib/articles'

// Static fallback content for the original 5 articles
const staticArticles = {
  'creating-your-sanctuary': {
    title: 'Creating Your Sanctuary',
    date: 'October 12, 2023',
    image_url: '/images/articles/create-your-own-santuary.svg',
    excerpt: 'Discover how to create a personal sanctuary as an expat, a space that honors your roots while embracing your new home.',
    content: `Creating a personal sanctuary as an expat is one of the most important acts of self-care you can undertake. When you move to a new country, you leave behind the familiar — the smells, sounds, and spaces that grounded you. Your sanctuary can be a physical space in your new home, or a mental space you return to through ritual, music, food, or connection with loved ones back home.\n\nThe key is intentionality: choosing elements from both your origin culture and your new culture that bring you peace and joy. Many expats find that their sanctuary evolves over time, incorporating more and more of their new home as they settle in.`,
  },
  'from-resentment-to-pride': {
    title: 'From Resentment To Pride',
    date: 'October 2, 2023',
    image_url: '/images/articles/from-pride-to-resentment.svg',
    excerpt: 'A journey through the emotional stages of cultural adaptation, from initial resentment to finding genuine pride in your multicultural identity.',
    content: `The journey from cultural resentment to cultural pride is rarely linear. Most expats and cross-cultural individuals experience a complex emotional trajectory when adapting to a new culture. Initial excitement often gives way to frustration, then resentment — why don't people understand my humor? Why do these customs feel so strange?\n\nBut with time, support, and intentional reflection, resentment can transform into something remarkable: pride in the cultural knowledge and adaptability you've developed. This pride is not blind loyalty to any single culture, but rather pride in your ability to hold multiple cultural truths simultaneously.`,
  },
  'halloween-in-arab-countries': {
    title: 'Unique Tolerance: Halloween in Arab Countries',
    date: 'October 30, 2023',
    image_url: '/images/articles/halloween.svg',
    excerpt: 'Exploring the fascinating way Halloween has been adopted and adapted in Arab countries, revealing surprising cultural tolerance and creativity.',
    content: `Halloween in Arab countries presents a fascinating study in cultural adaptation. While the holiday has no roots in Arab tradition, it has found a surprising foothold, particularly among expat communities and younger generations in countries like the UAE, Lebanon, and Jordan.\n\nShopping malls display orange and black decorations. Children dress in costumes. Parties are held. What makes this particularly interesting from a cross-cultural perspective is the selective adoption: the fun, aesthetic elements are embraced, while the historical and spiritual aspects are largely ignored.\n\nThis is cultural borrowing at its most pragmatic — and it reveals a sophisticated cultural tolerance that is often overlooked in broader narratives about the Arab world.`,
  },
  'everything-i-never-told-you': {
    title: 'Everything I Never Told You',
    date: 'November 27, 2023',
    image_url: '/images/articles/i-never-told-you.svg',
    excerpt: 'Reflections on the unspoken conversations between expat parents and their children about cultural identity, belonging, and the places they call home.',
    content: `There are conversations expat parents rarely have with their children — the ones about identity, about belonging, about the silent negotiations we make when we live between cultures. We tell our children to be proud of their heritage, but do we tell them it's also okay to grieve for the home they've left?\n\nWe celebrate their adaptability, but do we acknowledge the exhaustion of code-switching every single day? This article is an invitation to have those harder conversations — not just with your children, but with yourself. Because the stories we never tell are often the ones that matter most.`,
  },
  'phobia-of-dogs': {
    title: 'Unveiling The Phobia of Dogs Among Indians in the UAE',
    date: 'September 11, 2023',
    image_url: '/images/articles/phobia-of-dogs.svg',
    excerpt: 'An exploration of cultural attitudes toward dogs in Indian communities living in the UAE, and what it reveals about cross-cultural misunderstandings.',
    content: `In many Indian communities, a cultural and often deeply personal discomfort with dogs can become a significant source of cross-cultural misunderstanding in the UAE, where dog ownership is increasingly common. This isn't simply a personal preference — it's often rooted in cultural, religious, and childhood experiences that shape a person's relationship with animals in profound ways.\n\nFor cross-cultural practitioners, this offers a powerful teaching moment: what looks like an irrational fear or prejudice from the outside is always embedded in a cultural logic that deserves respect and curiosity. Understanding the 'why' behind cultural behaviors — even ones as specific as dog phobia — is the foundation of true intercultural competence.`,
  },
}

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)

    getArticleBySlug(slug)
      .then(data => {
        setArticle(data)
        setLoading(false)
      })
      .catch(() => {
        // Check static fallback
        const fallback = staticArticles[slug]
        if (fallback) {
          setArticle(fallback)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div style={{ paddingTop: 72, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite', color: '#e5b981', margin: '0 auto' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div style={{ paddingTop: 72, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
            Article Not Found
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
            This article doesn't exist or has been moved.
          </p>
          <Link to="/resources?tab=articles" className="btn-primary">
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  const displayDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : article.date ?? ''

  const paragraphs = (article.content || '').split('\n\n').filter(Boolean)

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 'clamp(220px, 40vh, 420px)', overflow: 'hidden', backgroundColor: '#0d1111' }}>
        <img
          src={article.image_url}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141717 0%, rgba(20,23,23,0.5) 50%, transparent 100%)' }} />
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: 760, paddingTop: '3rem', paddingBottom: '5rem', marginTop: '-4rem', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {/* Back */}
          <Link
            to="/resources?tab=articles"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#e5b981', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', marginBottom: '2rem' }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Articles
          </Link>

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ color: '#e5b981', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(229,185,129,0.1)', padding: '0.3rem 0.75rem', borderRadius: 9999 }}>
              Article
            </span>
            <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem' }}>{displayDate}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.75, marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {article.excerpt}
            </p>
          )}

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.0625rem', lineHeight: 1.85, margin: 0 }}>
                {para}
              </p>
            ))}
          </div>

          {/* Author */}
          <div className="glass" style={{ marginTop: '3.5rem', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #e5b981, #d4a870)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#141717', fontWeight: 700, fontSize: '1.1rem' }}>S</span>
            </div>
            <div>
              <p style={{ color: '#fff', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, margin: 0 }}>Samar Karam</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', margin: 0 }}>Certified Cross-Cultural Consultant & Trainer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
