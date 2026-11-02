import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/hooks.js'
import { PhoneFrame } from './Media.jsx'

function ViewerVideo({ item, active }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active && !reduce) v.play().catch(() => {})
    else v.pause()
  }, [active, reduce])

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      width={item.width}
      height={item.height}
      aria-label={item.caption}
      muted
      loop
      playsInline
      controls={reduce}
      preload="metadata"
      className="h-full w-full object-cover"
    />
  )
}

function Viewer({ items }) {
  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-line bg-forest">
        {items.map((item, i) => {
          const on = i === index
          return (
            <div
              key={item.caption}
              aria-hidden={!on}
              className="absolute inset-0 transition-[opacity,filter] duration-200 ease-out motion-reduce:transition-opacity"
              style={{ opacity: on ? 1 : 0, filter: on ? 'none' : 'blur(4px)' }}
            >
              {item.type === 'video' ? (
                <ViewerVideo item={item} active={on} />
              ) : (
                <img
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt={item.caption}
                  decoding="async"
                  className="h-full w-full object-cover object-left-top"
                />
              )}
            </div>
          )
        })}
      </div>

      <p className="eyebrow mt-3" aria-live="polite">
        {items[index].caption}
      </p>

      <ul className="mt-3 flex gap-3" aria-label="Choose a picture">
        {items.map((item, i) => (
          <li key={item.caption} className="w-24 sm:w-32">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              aria-label={item.caption}
              className={`press block aspect-[16/9] w-full overflow-hidden rounded-lg border-2 transition-[border-color,opacity] duration-200 ${
                i === index ? 'border-butter' : 'border-line opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={item.type === 'video' ? item.poster : item.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-left-top"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Phones({ items }) {
  return (
    <ul
      className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
      aria-label="App screens"
    >
      {items.map((item) => (
        <li key={item.caption} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
          <figure>
            <PhoneFrame {...item} alt={item.caption} loading="eager" />
            <figcaption className="eyebrow mt-3 leading-snug">{item.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

export default function Gallery({ gallery }) {
  return gallery.kind === 'phones' ? <Phones items={gallery.items} /> : <Viewer items={gallery.items} />
}
