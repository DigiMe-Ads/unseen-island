import { useState } from 'react'
import ImagePicker from './ImagePicker.jsx'
import { ArrowIcon, CloseIcon } from '../components/common/Icons.jsx'
import { Button, inputCls } from './ui.jsx'
import { toList } from '../components/common/Slides.jsx'

const move = (list, from, to) => {
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

const blankFor = (field) => ({ image: null, images: [], lines: [], paragraphs: [], list: [] })[field.type] ?? ''

// Only plain inputs get a <label>: a label around buttons would forward stray clicks to the first one.
export const fieldWrapper = (field) => (['text', 'textarea', 'lines', 'paragraphs'].includes(field.type) ? 'label' : 'div')

const rowsFor =(text = '') => Math.min(12, Math.max(3, Math.ceil(text.length / 80) + text.split('\n').length - 1))

export function FieldInput({ field, value, onChange, optional = false }) {
  switch (field.type) {
    case 'text':
      return <input className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'textarea':
      return <textarea className={inputCls} rows={rowsFor(value)} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    case 'lines': {
      const text = (value ?? []).join('\n')
      return <textarea className={inputCls} rows={rowsFor(text)} value={text} onChange={(e) => onChange(e.target.value.split('\n'))} />
    }
    case 'paragraphs': {
      const text = (value ?? []).join('\n\n')
      return <textarea className={inputCls} rows={rowsFor(text) + 2} value={text} onChange={(e) => onChange(e.target.value.split(/\n\s*\n/))} />
    }
    case 'image':
      return <ImageInput value={value} onChange={onChange} optional={optional} />
    case 'images':
      return <ImagesInput value={toList(value)} onChange={onChange} />
    case 'list':
      return <ListInput field={field} value={value ?? []} onChange={onChange} />
    default:
      return null
  }
}

function ImageInput({ value, onChange, optional }) {
  const [picking, setPicking] = useState(false)
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="w-full shrink-0 overflow-hidden rounded-md bg-sand sm:w-48">
        {value ? (
          <img src={value.src} alt={value.alt} className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div className="grid aspect-[4/3] place-items-center text-xs text-muted">No photo</div>
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        {value && (
          <label className="block space-y-1">
            <span className="text-xs text-muted">Description (read by screen readers and search engines)</span>
            <input className={inputCls} value={value.alt} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
          </label>
        )}
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setPicking(true)}>{value ? 'Change photo' : 'Choose photo'}</Button>
          {optional && value && (
            <Button variant="ghost" onClick={() => onChange(null)}>
              Remove photo
            </Button>
          )}
        </div>
      </div>
      {picking && (
        <ImagePicker
          onClose={() => setPicking(false)}
          onPick={([img]) => {
            onChange({ src: img.src, alt: img.alt })
            setPicking(false)
          }}
        />
      )}
    </div>
  )
}

function ImagesInput({ value, onChange }) {
  const [picking, setPicking] = useState(false)
  const update = (i, patch) => onChange(value.map((img, j) => (j === i ? { ...img, ...patch } : img)))
  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {value.map((img, i) => (
            <li key={`${i}-${img.src}`} className="overflow-hidden rounded-md border border-line bg-white">
              <div className="relative">
                <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
                <span className="absolute top-1.5 left-1.5 rounded bg-ink/70 px-1.5 text-xs text-cream">{i + 1}</span>
                <button
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                  className="absolute top-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-ink hover:bg-white"
                  aria-label="Remove photo"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-2 p-2">
                <input className={`${inputCls} py-1.5 text-xs`} value={img.alt} placeholder="Description" onChange={(e) => update(i, { alt: e.target.value })} />
                <div className="flex justify-between">
                  <Button variant="ghost" className="px-2 py-1" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} aria-label="Move earlier">
                    <ArrowIcon className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="ghost" className="px-2 py-1" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} aria-label="Move later">
                    <ArrowIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button onClick={() => setPicking(true)}>+ Add photos</Button>
      {picking && (
        <ImagePicker
          multiple
          onClose={() => setPicking(false)}
          onPick={(imgs) => {
            onChange([...value, ...imgs.map(({ src, alt }) => ({ src, alt }))])
            setPicking(false)
          }}
        />
      )}
    </div>
  )
}

function ListInput({ field, value, onChange }) {
  const update = (i, key, v) => onChange(value.map((item, j) => (j === i ? { ...item, [key]: v } : item)))
  const add = () => onChange([...value, Object.fromEntries(field.itemFields.map((f) => [f.key, blankFor(f)]))])

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <details key={i} open={value.length <= 3} className="group rounded-md border border-line bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
            <span className="min-w-0 truncate text-sm font-medium">
              <span className="mr-2 text-muted">{i + 1}.</span>
              {field.itemTitle?.(item, i) || <span className="text-muted italic">Untitled</span>}
            </span>
            <span className="flex shrink-0 items-center gap-1" onClick={(e) => e.preventDefault()}>
              <Button variant="ghost" className="px-2 py-1" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} aria-label="Move up">
                <ArrowIcon className="h-4 w-4 -rotate-90" />
              </Button>
              <Button variant="ghost" className="px-2 py-1" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} aria-label="Move down">
                <ArrowIcon className="h-4 w-4 rotate-90" />
              </Button>
              {!field.fixed && (
                <Button
                  variant="danger"
                  className="px-2 py-1"
                  onClick={() => window.confirm('Remove this item?') && onChange(value.filter((_, j) => j !== i))}
                  aria-label="Remove"
                >
                  <CloseIcon className="h-4 w-4" />
                </Button>
              )}
            </span>
          </summary>
          <div className="space-y-4 border-t border-line p-4">
            {field.itemFields.map((f) => {
              const Wrap = fieldWrapper(f)
              return (
                <Wrap key={f.key} className="block space-y-1.5">
                  <span className="block text-xs font-medium text-ink">{f.label}</span>
                  <FieldInput field={f} value={item[f.key]} onChange={(v) => update(i, f.key, v)} />
                </Wrap>
              )
            })}
          </div>
        </details>
      ))}
      {!field.fixed && <Button onClick={add}>+ Add {field.label.toLowerCase().replace(/s$/, '')}</Button>}
    </div>
  )
}
