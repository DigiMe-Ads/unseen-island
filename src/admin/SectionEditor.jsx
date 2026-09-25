import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { SECTION_BY_ID } from '../content/sections.js'
import { mergeSection, useContentStore } from '../content/ContentProvider.jsx'
import { useAdmin } from './AdminLayout.jsx'
import { FieldInput, fieldWrapper } from './fields.jsx'
import { Badge, Button, Notice, Spinner } from './ui.jsx'
import { toList } from '../components/common/Slides.jsx'

const PAGE_PATH = { 'Site-wide': '/', Home: '/', About: '/about', Gallery: '/gallery', Contact: '/contact' }

const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null)
const clone = (v) => (v == null ? v : structuredClone(v))
const tidy = (arr) => (arr ?? []).map((s) => s.trim()).filter(Boolean)

// Trims text, drops blank lines and collects anything that would break the page (e.g. a missing photo).
function clean(fields, value, path, errors) {
  const out = { ...value }
  for (const f of fields) {
    const v = value[f.key]
    const where = [...path, f.label].join(' › ')
    if (f.type === 'text' || f.type === 'textarea') out[f.key] = (v ?? '').trim()
    else if (f.type === 'lines' || f.type === 'paragraphs') out[f.key] = tidy(v)
    else if (f.type === 'image' && !v && !f.optional) errors.push(`${where}: choose a photo.`)
    else if (f.type === 'images') {
      out[f.key] = toList(v)
      if (!out[f.key].length && !f.optional) errors.push(`${where}: add at least one photo.`)
    }
    else if (f.type === 'list') out[f.key] = (v ?? []).map((item, i) => clean(f.itemFields, item, [...path, `${f.label} ${i + 1}`], errors))
  }
  return out
}

export default function SectionEditor({ user }) {
  const { id } = useParams()
  const section = SECTION_BY_ID[id]
  if (!section) return <Navigate to="/admin" replace />
  return <Editor key={id} section={section} user={user} />
}

function Editor({ section, user }) {
  const { setSection } = useContentStore()
  const { setDirty } = useAdmin()
  const [saved, setSaved] = useState(null)
  const [draft, setDraft] = useState(null)
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase
      .from('site_content')
      .select('data')
      .eq('id', section.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setStatus({ tone: 'error', text: error.message })
        const override = data?.data ?? {}
        setSaved(override)
        setDraft(clone(mergeSection(section.id, override)))
      })
  }, [section.id])

  const dirty = draft !== null && !same(draft, mergeSection(section.id, saved))

  useEffect(() => {
    setDirty(dirty)
  }, [dirty, setDirty])
  useEffect(() => () => setDirty(false), [setDirty])

  if (!draft) return <Spinner />

  const setField = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }))
    setStatus(null)
  }

  const save = async () => {
    const errors = []
    const cleaned = clean(section.fields, draft, [], errors)
    if (errors.length) {
      setStatus({ tone: 'error', text: errors })
      return
    }
    const override = {}
    for (const f of section.fields) {
      if (!same(cleaned[f.key], section.defaults[f.key])) override[f.key] = cleaned[f.key]
    }

    setSaving(true)
    const { error } = Object.keys(override).length
      ? await supabase.from('site_content').upsert({ id: section.id, data: override, updated_at: new Date().toISOString(), updated_by: user.id })
      : await supabase.from('site_content').delete().eq('id', section.id)
    setSaving(false)

    if (error) {
      setStatus({ tone: 'error', text: error.message })
      return
    }
    setSaved(override)
    setDraft(clone(mergeSection(section.id, override)))
    setSection(section.id, override)
    setStatus({ tone: 'success', text: 'Saved — the changes are live on the site.' })
  }

  const discard = () => {
    setDraft(clone(mergeSection(section.id, saved)))
    setStatus(null)
  }

  const resetAll = () => {
    if (!window.confirm('Restore every field in this section to the original content? You can still review before saving.')) return
    setDraft(clone(section.defaults))
    setStatus(null)
  }

  const anyEdited = section.fields.some((f) => !same(draft[f.key], section.defaults[f.key]))

  return (
    <div className="mx-auto max-w-4xl pb-28">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{section.group}</p>
          <h1 className="font-serif text-3xl text-forest">{section.name}</h1>
          {section.description && <p className="mt-1 text-sm text-muted">{section.description}</p>}
        </div>
        <div className="flex gap-2">
          {anyEdited && (
            <Button variant="ghost" onClick={resetAll}>
              Restore original
            </Button>
          )}
          <a
            href={PAGE_PATH[section.group]}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-forest hover:border-forest"
          >
            View page
          </a>
        </div>
      </div>

      {status && (
        <div className="mt-5">
          <Notice tone={status.tone}>
            {Array.isArray(status.text) ? (
              <ul className="list-disc space-y-0.5 pl-5">
                {status.text.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              status.text
            )}
          </Notice>
        </div>
      )}

      <div className="mt-6 space-y-5">
        {section.fields.map((f) => {
          const edited = !same(draft[f.key], section.defaults[f.key])
          const Wrap = fieldWrapper(f)
          return (
            <div key={f.key} className="rounded-lg border border-line bg-white p-4 sm:p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink">{f.label}</span>
                  {edited && <Badge tone="gold">Edited</Badge>}
                </div>
                {edited && (
                  <button onClick={() => setField(f.key, clone(section.defaults[f.key]))} className="text-xs text-muted underline hover:text-forest">
                    Restore original
                  </button>
                )}
              </div>
              {f.help && <p className="mb-2 text-xs text-muted">{f.help}</p>}
              <Wrap className="block">
                <FieldInput field={f} value={draft[f.key]} onChange={(v) => setField(f.key, v)} optional={f.optional} />
              </Wrap>
            </div>
          )
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <span className="text-sm text-muted">{dirty ? 'You have unsaved changes' : 'All changes saved'}</span>
          <div className="flex gap-2">
            <Button variant="ghost" disabled={!dirty || saving} onClick={discard}>
              Discard
            </Button>
            <Button variant="primary" disabled={!dirty || saving} onClick={save}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
