import { useEffect, useRef, useState } from 'react'

const HIDDEN = {
  up: 'translate-y-12',
  left: '-translate-x-12',
  right: 'translate-x-12',
  zoom: 'scale-[0.96]',
  fade: '',
}

// Fades/slides children in once they scroll into view.
export default function Reveal({ as: Tag = 'div', from = 'up', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      {...rest}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        visible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `opacity-0 ${HIDDEN[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
