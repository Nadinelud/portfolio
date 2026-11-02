import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../lib/hooks.js'

export function PhoneFrame({ src, width, height, alt = '', className = '', loading = 'lazy' }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.75rem] border-[6px] border-line bg-forest shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] ${className}`}
    >
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  )
}

// Muted, looping clip. Plays while `playing` is true (hover/focus on desktop),
// or while mostly on screen on touch devices. Never autoplays with reduced motion.
export function LoopVideo({ src, poster, width, height, label, playing = false, className = '' }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = ref.current
    if (!v || !fine) return
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [playing, fine])

  useEffect(() => {
    const v = ref.current
    if (!v || fine || reduce) return
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.6 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [fine, reduce])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  )
}
