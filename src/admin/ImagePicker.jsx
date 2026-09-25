import { useEffect, useRef, useState } from 'react'
import { LIBRARY, listUploads, uploadImage } from './images.js'
import { CloseIcon } from '../components/common/Icons.jsx'
import { Button, Notice, Spinner } from './ui.jsx'

// Modal for choosing photos from uploads or the built-in library, or uploading new ones.
export default function ImagePicker({ multiple = false, onPick, onClose }) {
  const [tab, setTab] = useState('uploads')
  const [uploads, setUploads] = useState(null)
  const [selected, setSelected] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const fileInput = useRef(null)

  useEffect(() => {
    listUploads()
      .then(setUploads)
      .catch((e) => {
        setUploads([])
        setError(e.message)
      })
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const toggle = (img) => {
    if (!multiple) return onPick([img])
    setSelected((list) => (list.some((i) => i.src === img.src) ? list.filter((i) => i.src !== img.src) : [...list, img]))
  }

  const upload = async (files) => {
    if (!files.length) return
    setBusy(true)
    setError('')
    const added = []
    for (const file of files) {
      try {
        added.push(await uploadImage(file))
      } catch (e) {
        setError(`${file.name}: ${e.message}`)
      }
    }
    setBusy(false)
    if (!added.length) return
    if (!multiple) return onPick([added[0]])
    setUploads((list) => [...added, ...(list ?? [])])
    setSelected((list) => [...list, ...added])
    setTab('uploads')
  }

  const images = tab === 'uploads' ? uploads : LIBRARY

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center sm:p-6" onClick={onClose}>
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col rounded-t-lg bg-white shadow-xl sm:rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <h2 className="font-serif text-xl text-forest">{multiple ? 'Choose photos' : 'Choose a photo'}</h2>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-forest">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="flex gap-1">
            {[
              ['uploads', 'Uploaded'],
              ['library', 'Site library'],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-md px-3 py-1.5 text-sm ${tab === key ? 'bg-forest text-cream' : 'text-muted hover:bg-sand'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <input ref={fileInput} type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(e) => {
              upload([...e.target.files])
              e.target.value = ''
            }}
          />
          <Button variant="primary" disabled={busy} onClick={() => fileInput.current.click()}>
            {busy ? 'Uploading…' : 'Upload from computer'}
          </Button>
        </div>

        <div className="min-h-[240px] flex-1 overflow-y-auto p-5">
          {error && (
            <div className="mb-4">
              <Notice tone="error">{error}</Notice>
            </div>
          )}
          {!images ? (
            <Spinner />
          ) : images.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No uploaded photos yet — use “Upload from computer”.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img) => {
                const isSelected = selected.some((i) => i.src === img.src)
                return (
                  <li key={img.src}>
                    <button
                      onClick={() => toggle(img)}
                      className={`group relative block w-full overflow-hidden rounded-md ring-2 transition ${isSelected ? 'ring-forest' : 'ring-transparent hover:ring-line'}`}
                      title={img.alt}
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-forest text-xs text-cream">
                          {selected.findIndex((i) => i.src === img.src) + 1}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {multiple && (
          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
            <span className="text-sm text-muted">{selected.length} selected</span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" disabled={!selected.length} onClick={() => onPick(selected)}>
                Add {selected.length || ''} photo{selected.length === 1 ? '' : 's'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
