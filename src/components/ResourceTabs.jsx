import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getArticles } from '../lib/articles'

// ─── Data ────────────────────────────────────────────────────
const featuredBook = {
  title: 'A Woman Is No Man',
  image: '/images/books/AWomanIsNoMan.svg',
  author: 'Etaf Rum',
  rating: 4.5,
  description:
    'A powerful debut novel exploring the lives of three generations of Palestinian-American women navigating culture, identity, and family expectations. Essential reading for anyone working with Arab immigrant communities.',
  amazonUrl: 'https://www.amazon.com/Woman-No-Man-Etaf-Rum/dp/0062699628',
}

const bookSections = [
  {
    author: 'Richard Lewis',
    books: [
      { title: 'When Cultures Collide', image: '/images/books/when-cultures-collide.svg' },
      { title: "Fish Can't See Water", image: '/images/books/fishCantseewater.svg' },
      { title: 'The Cultural Imperative', image: '/images/books/culture-imperative.svg' },
      { title: 'Close Encounters of the Cultural Kind', image: '/images/books/close-encounters.svg' },
      { title: 'Business Across Cultures', image: '/images/books/business-across-culture.svg' },
    ],
  },
  {
    author: 'Erin Meyer',
    books: [{ title: 'The Culture Map', image: '/images/books/the-culture-map.svg' }],
  },
  {
    author: 'Fons Trompenaars',
    books: [
      { title: 'Riding the Waves of Culture', image: '/images/books/riding-waves.svg' },
      { title: 'Riding Innovation Waves', image: '/images/books/riding-innovation-waves.svg' },
    ],
  },
  {
    author: 'Geert Hofstede',
    books: [
      { title: 'Cultures and Organizations', image: '/images/books/cultures-and-organizations.svg' },
      { title: "Culture's Consequences", image: "/images/books/cultures'consequences.svg" },
    ],
  },
  {
    author: 'Edward Hall',
    books: [{ title: 'The Hidden Dimension', image: '/images/books/the-hidden-dimension.svg' }],
  },
  {
    author: "Children's Books",
    books: [
      { title: 'Once Upon an Eid', image: '/images/books/71jTZS1s3pL 1.svg' },
      { title: 'Catch of the Day', image: '/images/books/catch-of-the-day.svg' },
      { title: 'I Spy Desert Animals', image: '/images/books/i-spy-a-desert.svg' },
      { title: "Mother's Lap in the UAE", image: '/images/books/mothers-lap.svg' },
    ],
  },
]

// Static fallback articles shown when Supabase is not yet configured
const staticArticles = [
  {
    slug: 'creating-your-sanctuary',
    title: 'Creating Your Sanctuary',
    date: 'Oct 12, 2023',
    image_url: '/images/articles/create-your-own-santuary.svg',
    excerpt: 'Discover how to create a personal sanctuary as an expat, a space that honors your roots while embracing your new home.',
  },
  {
    slug: 'from-resentment-to-pride',
    title: 'From Resentment To Pride',
    date: 'Oct 2, 2023',
    image_url: '/images/articles/from-pride-to-resentment.svg',
    excerpt: 'A journey through the emotional stages of cultural adaptation, from initial resentment to finding genuine pride in your multicultural identity.',
  },
  {
    slug: 'halloween-in-arab-countries',
    title: 'Unique Tolerance: Halloween in Arab Countries',
    date: 'Oct 30, 2023',
    image_url: '/images/articles/halloween.svg',
    excerpt: 'Exploring the fascinating way Halloween has been adopted and adapted in Arab countries, revealing surprising cultural tolerance and creativity.',
  },
  {
    slug: 'everything-i-never-told-you',
    title: 'Everything I Never Told You',
    date: 'Nov 27, 2023',
    image_url: '/images/articles/i-never-told-you.svg',
    excerpt: 'Reflections on the unspoken conversations between expat parents and their children about cultural identity, belonging, and the places they call home.',
  },
  {
    slug: 'phobia-of-dogs',
    title: 'Unveiling The Phobia of Dogs Among Indians in the UAE',
    date: 'Sep 11, 2023',
    image_url: '/images/articles/phobia-of-dogs.svg',
    excerpt: 'An exploration of cultural attitudes toward dogs in Indian communities living in the UAE, and what it reveals about cross-cultural misunderstandings.',
  },
]

// ─── Sub-components ──────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16" height="16" viewBox="0 0 24 24"
          fill={star <= Math.floor(rating) ? '#e5b981' : star - 0.5 <= rating ? 'url(#half)' : 'rgba(255,255,255,0.15)'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginLeft: '0.25rem' }}>{rating}</span>
    </div>
  )
}

function FeaturedTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div
        className="glass"
        style={{ borderRadius: '1.5rem', padding: '2.5rem', maxWidth: 860, margin: '0 auto' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Cover */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: 180, height: 260, borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#1a1f1f', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <img src={featuredBook.image} alt={featuredBook.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: '1 1 240px' }}>
            <span style={{ display: 'inline-block', color: '#e5b981', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', backgroundColor: 'rgba(229,185,129,0.1)', padding: '0.3rem 0.75rem', borderRadius: 9999, marginBottom: '0.75rem' }}>
              Featured Book
            </span>
            <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
              {featuredBook.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              by {featuredBook.author}
            </p>
            <Stars rating={featuredBook.rating} />
            <p style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, marginTop: '1rem', marginBottom: '1.75rem' }}>
              {featuredBook.description}
            </p>
            <a href={featuredBook.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}>
              View on Amazon
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function BooksTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {bookSections.map((section) => (
        <div key={section.author}>
          {/* Section heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(229,185,129,0.2)' }} />
            <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#e5b981', whiteSpace: 'nowrap' }}>{section.author}</h3>
            <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(229,185,129,0.2)' }} />
          </div>

          {/* Book grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1.25rem' }}>
            {section.books.map((book) => (
              <div key={book.title} className="book-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: '0.625rem', overflow: 'hidden', backgroundColor: '#1a1f1f', marginBottom: '0.625rem', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'transform 0.3s, box-shadow 0.3s' }} className="book-cover">
                  <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="book-img" />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.8rem', lineHeight: 1.4, fontWeight: 500 }}>{book.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <style>{`
        .book-card:hover .book-cover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
        .book-card:hover .book-img { transform: scale(1.05); }
      `}</style>
    </motion.div>
  )
}

function VideosTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
      style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#e5b981">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
          New Videos Coming Soon!
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Subscribe to Samar's YouTube channel to stay updated with the latest insights on cross-cultural living.
        </p>
        <a
          href="https://www.youtube.com/@Samar_CrossCultureConsultant"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', backgroundColor: '#cc0000', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', borderRadius: 9999, textDecoration: 'none', transition: 'background-color 0.2s, transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#aa0000'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#cc0000'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Subscribe on YouTube
        </a>
      </div>
    </motion.div>
  )
}

function ArticleCard({ article }) {
  const date = article.created_at
    ? new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : article.date ?? ''

  return (
    <Link
      to={`/articles/${article.slug}`}
      className="article-card glass"
      style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.3s, border-color 0.3s' }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#1a1f1f' }}>
        <img
          src={article.image_url}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          className="article-img"
        />
      </div>
      <div style={{ padding: '1.25rem' }}>
        <p style={{ color: '#e5b981', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem' }}>{date}</p>
        <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', lineHeight: 1.35, fontSize: '1rem', transition: 'color 0.2s' }} className="article-title">
          {article.title}
        </h3>
        <p className="line-clamp-3" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65 }}>
          {article.excerpt}
        </p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem', color: '#e5b981', fontSize: '0.875rem', fontWeight: 500 }}>
          Read More
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function ArticlesTab() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles()
      .then(data => setArticles(data))
      .catch(() => setArticles(staticArticles))
      .finally(() => setLoading(false))
  }, [])

  const displayArticles = loading ? [] : (articles.length > 0 ? articles : staticArticles)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
          Loading articles...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {displayArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
      <style>{`
        .article-card:hover { transform: translateY(-4px); border-color: rgba(229,185,129,0.3) !important; }
        .article-card:hover .article-img { transform: scale(1.05); }
        .article-card:hover .article-title { color: #e5b981 !important; }
      `}</style>
    </motion.div>
  )
}

// ─── Tab nav ─────────────────────────────────────────────────
const tabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'books', label: 'Books' },
  { id: 'videos', label: 'Videos' },
  { id: 'articles', label: 'Articles' },
]

export default function ResourceTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'featured')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) setActiveTab(tab)
  }, [searchParams])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchParams({ tab: tabId })
  }

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: 9999,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.25s, color 0.25s',
              backgroundColor: activeTab === tab.id ? '#e5b981' : 'rgba(255,255,255,0.07)',
              color: activeTab === tab.id ? '#141717' : 'rgba(255,255,255,0.6)',
              outline: activeTab !== tab.id ? '1px solid rgba(255,255,255,0.12)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'featured' && <FeaturedTab key="featured" />}
        {activeTab === 'books' && <BooksTab key="books" />}
        {activeTab === 'videos' && <VideosTab key="videos" />}
        {activeTab === 'articles' && <ArticlesTab key="articles" />}
      </AnimatePresence>
    </div>
  )
}
