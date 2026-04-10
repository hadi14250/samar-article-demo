import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  getAllArticlesAdmin,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
  slugify,
} from '../../lib/articles'

// ─── Shared input style ───────────────────────────────
const inputBase = {
  width: '100%',
  padding: '0.8rem 1rem',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1.5px solid rgba(255,255,255,0.1)',
  borderRadius: '0.625rem',
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, background 0.2s',
}

function Field({ label, required, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>
        {label} {required && <span style={{ color: '#e5b981' }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', margin: 0 }}>{hint}</p>}
    </div>
  )
}

// ─── Article Form Modal ────────────────────────────────
function ArticleModal({ article, onClose, onSaved }) {
  const isEdit = !!article
  const [form, setForm] = useState({
    title: article?.title ?? '',
    slug: article?.slug ?? '',
    excerpt: article?.excerpt ?? '',
    content: article?.content ?? '',
    image_url: article?.image_url ?? '',
    published: article?.published ?? false,
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(article?.image_url ?? '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugEdited, setSlugEdited] = useState(isEdit)
  const fileRef = useRef()

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleTitle = (val) => {
    set('title', val)
    if (!slugEdited) set('slug', slugify(val))
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB.'); return }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError('')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.slug.trim()) { setError('Slug is required.'); return }
    if (!form.excerpt.trim()) { setError('Excerpt is required.'); return }
    if (!form.content.trim()) { setError('Content is required.'); return }
    if (!imagePreview && !form.image_url) { setError('Please upload a cover image.'); return }

    setSaving(true)
    try {
      let image_url = form.image_url
      if (imageFile) {
        setUploading(true)
        image_url = await uploadArticleImage(imageFile)
        setUploading(false)
      }

      const payload = { ...form, image_url }
      if (isEdit) {
        await updateArticle(article.id, payload)
      } else {
        await createArticle(payload)
      }
      onSaved()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setUploading(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.75)', overflowY: 'auto', padding: '2rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        style={{ width: '100%', maxWidth: 700, backgroundColor: '#161b1b', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#fff', margin: 0 }}>
            {isEdit ? 'Edit Article' : 'New Article'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', padding: '0.25rem' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title */}
          <Field label="Title" required>
            <input
              style={inputBase}
              value={form.title}
              onChange={e => handleTitle(e.target.value)}
              placeholder="Article title"
              onFocus={e => e.target.style.borderColor = 'rgba(229,185,129,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </Field>

          {/* Slug */}
          <Field label="URL Slug" required hint={`Will appear as /articles/${form.slug || 'your-slug'}`}>
            <input
              style={inputBase}
              value={form.slug}
              onChange={e => { setSlugEdited(true); set('slug', slugify(e.target.value)) }}
              placeholder="url-friendly-slug"
              onFocus={e => e.target.style.borderColor = 'rgba(229,185,129,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </Field>

          {/* Excerpt */}
          <Field label="Excerpt" required hint="Short summary shown on the articles list (1–2 sentences).">
            <textarea
              style={{ ...inputBase, resize: 'vertical', minHeight: 80 }}
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder="A short description of the article..."
              onFocus={e => e.target.style.borderColor = 'rgba(229,185,129,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </Field>

          {/* Content */}
          <Field label="Article Content" required hint="Write the full article text. Separate paragraphs with a blank line.">
            <textarea
              style={{ ...inputBase, resize: 'vertical', minHeight: 220, lineHeight: 1.7 }}
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="Write your article here...&#10;&#10;Each blank line becomes a new paragraph."
              onFocus={e => e.target.style.borderColor = 'rgba(229,185,129,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </Field>

          {/* Cover Image */}
          <Field label="Cover Image" required hint="JPEG, PNG, or WebP — max 5 MB.">
            <div
              onClick={() => fileRef.current.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              style={{
                border: '2px dashed rgba(229,185,129,0.3)',
                borderRadius: '0.75rem',
                padding: imagePreview ? '0' : '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
                overflow: 'hidden',
                backgroundColor: 'rgba(229,185,129,0.03)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(229,185,129,0.6)'; e.currentTarget.style.backgroundColor = 'rgba(229,185,129,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(229,185,129,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(229,185,129,0.03)' }}
            >
              {imagePreview ? (
                <div style={{ position: 'relative' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.45)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'}
                  >
                    <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, opacity: 0, transition: 'opacity 0.2s' }} className="replace-text">
                      Click to replace
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#e5b981">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', margin: 0 }}>
                    <span style={{ color: '#e5b981', fontWeight: 600 }}>Click to upload</span> or drag & drop
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    JPEG, PNG, WebP — max 5 MB
                  </p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
          </Field>

          {/* Published toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '0.625rem', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>Publish immediately</p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.775rem', margin: '0.2rem 0 0' }}>
                {form.published ? 'Article is visible to the public' : 'Article is saved as a draft'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => set('published', !form.published)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                backgroundColor: form.published ? '#e5b981' : 'rgba(255,255,255,0.12)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.25s',
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: 3,
                left: form.published ? 25 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: '#fff',
                transition: 'left 0.25s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '0.625rem', padding: '0.75rem 1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn-outline" style={{ padding: '0.7rem 1.5rem' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '0.7rem 1.75rem', opacity: saving ? 0.7 : 1 }}>
              {saving ? (uploading ? 'Uploading image...' : 'Saving...') : isEdit ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>
        </form>
      </motion.div>

      <style>{`
        textarea::placeholder, input::placeholder { color: rgba(255,255,255,0.28); }
        .replace-text { opacity: 0 !important; }
        div:hover > div > .replace-text { opacity: 1 !important; }
      `}</style>
    </div>
  )
}

// ─── Delete Confirm Modal ─────────────────────────────
function DeleteModal({ article, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false)

  const confirm = async () => {
    setLoading(true)
    await deleteArticle(article.id)
    onDeleted()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ backgroundColor: '#161b1b', borderRadius: '1rem', padding: '2rem', maxWidth: 420, width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: 'rgba(248,113,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#f87171">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem' }}>
          Delete Article?
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          "<strong style={{ color: 'rgba(255,255,255,0.75)' }}>{article.title}</strong>" will be permanently deleted. This cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-outline" style={{ padding: '0.65rem 1.25rem' }}>Cancel</button>
          <button
            onClick={confirm}
            disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: 9999, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Article Row ──────────────────────────────────────
function ArticleRow({ article, onEdit, onDelete }) {
  const date = new Date(article.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '56px 1fr auto',
      gap: '1rem',
      alignItems: 'center',
      padding: '1rem 1.25rem',
      borderRadius: '0.75rem',
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(229,185,129,0.2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
    >
      {/* Thumbnail */}
      <div style={{ width: 56, height: 40, borderRadius: '0.375rem', overflow: 'hidden', backgroundColor: '#1a1f1f', flexShrink: 0 }}>
        {article.image_url && <img src={article.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>

      {/* Info */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
          <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300 }}>
            {article.title}
          </p>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '0.2rem 0.5rem', borderRadius: 9999,
            backgroundColor: article.published ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.07)',
            color: article.published ? '#34d399' : 'rgba(255,255,255,0.4)',
          }}>
            {article.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.775rem', margin: 0 }}>
          {date} &middot; /articles/{article.slug}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        <button
          onClick={() => onEdit(article)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(229,185,129,0.12)'; e.currentTarget.style.color = '#e5b981' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(article)}
          style={{ display: 'flex', alignItems: 'center', padding: '0.45rem 0.6rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.1)'; e.currentTarget.style.color = '#f87171' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────
export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [modal, setModal] = useState(null) // null | 'create' | article object (edit)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const load = async () => {
    setLoading(true)
    setFetchError('')
    try {
      const data = await getAllArticlesAdmin()
      setArticles(data)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin')
  }

  const published = articles.filter(a => a.published).length
  const drafts = articles.length - published

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d1111', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{ backgroundColor: '#141717', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/images/logo.svg" alt="Samar Karam" style={{ height: 36, display: 'block' }} />
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500 }}>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', display: 'none' }} className="show-md">
            {user?.email}
          </span>
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e5b981'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </a>
          <button
            onClick={handleSignOut}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.09)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: 900, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Page title + stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#fff', margin: 0 }}>Articles</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Manage your published articles and drafts
              </p>
            </div>
            <button
              onClick={() => setModal('create')}
              className="btn-primary"
              style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total Articles', value: articles.length, color: '#e5b981' },
              { label: 'Published', value: published, color: '#34d399' },
              { label: 'Drafts', value: drafts, color: 'rgba(255,255,255,0.4)' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>{stat.label}</p>
                <p style={{ color: stat.color, fontSize: '2rem', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, margin: 0, lineHeight: 1 }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Article list */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
              Loading articles...
            </div>
          ) : fetchError ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#f87171', fontSize: '0.9rem' }}>
              {fetchError}
              <br />
              <button onClick={load} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#e5b981', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}>
                Try again
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '1rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(229,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#e5b981">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>No articles yet. Create your first one!</p>
              <button onClick={() => setModal('create')} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.65rem 1.4rem' }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Write First Article
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {articles.map(article => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  onEdit={a => setModal(a)}
                  onDelete={a => setDeleteTarget(a)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {modal && (
          <ArticleModal
            article={modal === 'create' ? null : modal}
            onClose={() => setModal(null)}
            onSaved={() => { setModal(null); load() }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            article={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onDeleted={() => { setDeleteTarget(null); load() }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) { .show-md { display: block !important; } }
      `}</style>
    </div>
  )
}
