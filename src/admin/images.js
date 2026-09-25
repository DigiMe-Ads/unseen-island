import { supabase, IMAGE_BUCKET } from '../lib/supabase.js'
import { IMAGES } from '../data/images.js'

const FOLDER = 'uploads'
const MAX_EDGE = 2400

export const LIBRARY = Object.values(IMAGES)

export const altFromName = (name) =>
  name
    .replace(/^\d+-/, '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())

// Downscale large photos and re-encode as WebP so uploads stay as light as the built-in images.
async function optimise(file) {
  if (file.type === 'image/gif') return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85))
    return blob?.type === 'image/webp' ? blob : file
  } catch {
    return file
  }
}

export async function uploadImage(file) {
  const body = await optimise(file)
  const ext = body.type === 'image/webp' ? 'webp' : file.name.split('.').pop().toLowerCase()
  const base = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'photo'
  const path = `${FOLDER}/${Date.now()}-${base}.${ext}`
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, body, { contentType: body.type, cacheControl: '31536000' })
  if (error) throw error
  return { src: publicUrl(path), alt: altFromName(base) }
}

const publicUrl = (path) => supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl

export async function listUploads() {
  const { data, error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .list(FOLDER, { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } })
  if (error) throw error
  return data.filter((f) => f.id).map((f) => ({ src: publicUrl(`${FOLDER}/${f.name}`), alt: altFromName(f.name) }))
}
