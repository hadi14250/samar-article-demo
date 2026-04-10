import { supabase } from './supabase'

/**
 * Fetch all published articles, newest first.
 */
export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Fetch a single article by its slug.
 */
export async function getArticleBySlug(slug) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data
}

/**
 * Admin: fetch all articles (including drafts).
 */
export async function getAllArticlesAdmin() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Admin: create a new article.
 */
export async function createArticle({ title, slug, excerpt, content, image_url, published }) {
  const { data, error } = await supabase
    .from('articles')
    .insert([{ title, slug, excerpt, content, image_url, published }])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Admin: update an existing article.
 */
export async function updateArticle(id, updates) {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Admin: delete an article.
 */
export async function deleteArticle(id) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * Admin: upload an image to the 'article-images' storage bucket.
 * Returns the public URL of the uploaded image.
 */
export async function uploadArticleImage(file) {
  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `articles/${filename}`

  const { error: uploadError } = await supabase.storage
    .from('article-images')
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('article-images')
    .getPublicUrl(path)

  return data.publicUrl
}

/**
 * Turn a title into a URL-safe slug.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
