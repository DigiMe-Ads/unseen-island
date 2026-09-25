import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { useAdmin } from './AdminLayout.jsx'
import { Badge, Button, Notice, Spinner } from './ui.jsx'

const FILTERS = [
  { key: 'inbox', label: 'Inbox', match: (s) => s !== 'archived' },
  { key: 'new', label: 'New', match: (s) => s === 'new' },
  { key: 'archived', label: 'Archived', match: (s) => s === 'archived' },
]

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function Inquiries() {
  const { refreshNewCount } = useAdmin()
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('inbox')
  const [selectedId, setSelectedId] = useState(null)

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(1000)
    if (error) setError(error.message)
    else setItems(data)
    refreshNewCount()
  }, [refreshNewCount])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (id, status) => {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status } : i)))
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
    if (error) setError(error.message)
    refreshNewCount()
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return
    const { error } = await supabase.from('inquiries').delete().eq('id', id)
    if (error) return setError(error.message)
    setItems((list) => list.filter((i) => i.id !== id))
    setSelectedId(null)
    refreshNewCount()
  }

  const open = (item) => {
    setSelectedId(item.id)
    if (item.status === 'new') setStatus(item.id, 'read')
  }

  if (!items && !error) return <Spinner />

  const active = FILTERS.find((f) => f.key === filter)
  const visible = (items ?? []).filter((i) => active.match(i.status))
  const selected = items?.find((i) => i.id === selectedId)

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-forest">Enquiries</h1>
          <p className="text-sm text-muted">Messages sent through the contact form.</p>
        </div>
        <Button onClick={load}>Refresh</Button>
      </div>

      {error && <Notice tone="error">{error}</Notice>}

      <div className="flex gap-1 border-b border-line">
        {FILTERS.map((f) => {
          const count = (items ?? []).filter((i) => f.match(i.status)).length
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm transition ${filter === f.key ? 'border-forest text-forest' : 'border-transparent text-muted hover:text-forest'}`}
            >
              {f.label} <span className="text-xs text-muted">({count})</span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <ul className={`divide-y divide-line overflow-hidden rounded-md border border-line bg-white ${selected ? 'hidden lg:block' : ''}`}>
          {visible.length === 0 && <li className="p-6 text-center text-sm text-muted">Nothing here yet.</li>}
          {visible.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => open(item)}
                className={`block w-full px-4 py-3 text-left transition hover:bg-sand/60 ${item.id === selectedId ? 'bg-sand' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`truncate text-sm ${item.status === 'new' ? 'font-semibold text-ink' : 'text-ink'}`}>{item.name}</span>
                  <span className="shrink-0 text-xs text-muted">{formatDate(item.created_at)}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  {item.status === 'new' && <Badge tone="gold">New</Badge>}
                  {item.channel === 'whatsapp' && <Badge tone="whatsapp">WhatsApp</Badge>}
                  <p className="truncate text-sm text-muted">{item.message}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {selected ? (
          <article className="space-y-5 rounded-md border border-line bg-white p-5 sm:p-6">
            <button onClick={() => setSelectedId(null)} className="text-sm text-forest hover:underline lg:hidden">
              ← Back to list
            </button>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-serif text-2xl text-forest">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm wrap-break-word text-forest hover:underline">
                  {selected.email}
                </a>
              </div>
              <span className="text-xs text-muted">{formatDate(selected.created_at)}</span>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-muted">Interested in</dt>
                <dd className="mt-0.5">{selected.interest || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-muted">Travel dates</dt>
                <dd className="mt-0.5">{selected.dates || '—'}</dd>
              </div>
            </dl>

            {selected.channel === 'whatsapp' && (
              <Notice>
                This visitor also opened WhatsApp with this message ready to send — look for it in your WhatsApp chats if they sent it.
              </Notice>
            )}

            <p className="whitespace-pre-wrap wrap-break-word border-t border-line pt-5 text-[15px] leading-relaxed">{selected.message}</p>

            <div className="flex flex-wrap gap-2 border-t border-line pt-5">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: Your journey enquiry')}`}
                className="inline-flex items-center rounded-md bg-forest px-3 py-2 text-sm font-medium text-cream hover:bg-forest-soft"
              >
                Reply by email
              </a>
              {selected.status === 'archived' ? (
                <Button onClick={() => setStatus(selected.id, 'read')}>Move to inbox</Button>
              ) : (
                <Button onClick={() => setStatus(selected.id, 'archived')}>Archive</Button>
              )}
              {selected.status !== 'new' && selected.status !== 'archived' && (
                <Button variant="ghost" onClick={() => setStatus(selected.id, 'new')}>
                  Mark as new
                </Button>
              )}
              <Button variant="danger" onClick={() => remove(selected.id)} className="ml-auto">
                Delete
              </Button>
            </div>
          </article>
        ) : (
          <div className="hidden rounded-md border border-dashed border-line p-10 text-center text-sm text-muted lg:block">
            Select an enquiry to read it.
          </div>
        )}
      </div>
    </div>
  )
}
