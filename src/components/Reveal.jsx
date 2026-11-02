import { useEffect, useRef } from 'react'

export default function Reveal({ as: Tag = 'div', delay = 0, style, children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.shown = ''
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = ''
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} data-reveal="" style={{ '--reveal-delay': `${delay}ms`, ...style }} {...props}>
      {children}
    </Tag>
  )
}
