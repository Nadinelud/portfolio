import { useEffect, useRef } from 'react'

// Contour lines, like a topographic map, that part around the pointer.
// 2D canvas only. Pauses when off screen or the tab is hidden.
export default function TopoCanvas({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let t = 0
    let raf = 0
    let last = 0
    let inView = true
    const target = { x: 0, y: 0, a: 0 }
    const cur = { x: 0, y: 0, a: 0 }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const small = w < 640
      const gap = small ? 22 : 26
      const step = small ? 10 : 12
      const R = Math.max(120, Math.min(w, h) * 0.24)
      const push = reduce ? 0 : 46 * cur.a

      // One gradient stroke for every line: butter near the pointer, muted elsewhere.
      const glow = 0.16 + 0.74 * cur.a
      const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, R * 2.4)
      g.addColorStop(0, `rgba(243, 227, 160, ${glow})`)
      g.addColorStop(0.35, `rgba(243, 227, 160, ${glow * 0.45})`)
      g.addColorStop(1, 'rgba(155, 184, 174, 0.22)')
      ctx.strokeStyle = g
      ctx.lineWidth = 1.25
      ctx.beginPath()

      const count = Math.ceil(h / gap) + 3
      for (let i = -2; i < count; i++) {
        const base = i * gap
        for (let x = -step; x <= w + step; x += step) {
          let y =
            base +
            14 * Math.sin(x * 0.006 + i * 0.55 + t) +
            7 * Math.sin(x * 0.013 - i * 0.32 - t * 0.7)
          const dx = x - cur.x
          const dy = y - cur.y
          const f = Math.exp(-(dx * dx + dy * dy) / (2 * R * R))
          y += push * f * (dy / (Math.abs(dy) + 18))
          if (x === -step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }

    function frame(now) {
      const dt = Math.min(now - (last || now), 250)
      last = now
      t += Math.min(dt, 50) * 0.00016
      // Frame-rate independent easing toward the pointer.
      const follow = 1 - Math.pow(0.9, dt / 16.7)
      const fade = 1 - Math.pow(0.93, dt / 16.7)
      cur.x += (target.x - cur.x) * follow
      cur.y += (target.y - cur.y) * follow
      cur.a += (target.a - cur.a) * fade
      draw()
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (reduce || raf || !inView || document.hidden) return
      last = 0
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    function resize() {
      const r = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!target.a) {
        target.x = cur.x = w * 0.72
        target.y = cur.y = h * 0.42
      }
      draw()
    }

    function point(clientX, clientY) {
      const r = host.getBoundingClientRect()
      target.x = clientX - r.left
      target.y = clientY - r.top
      target.a = 1
      if (reduce) {
        // No movement, only the colour follows the pointer.
        cur.x = target.x
        cur.y = target.y
        cur.a = 1
        draw()
      }
    }
    const onPointer = (e) => e.pointerType !== 'touch' && point(e.clientX, e.clientY)
    const onTouch = (e) => e.touches[0] && point(e.touches[0].clientX, e.touches[0].clientY)
    const onLeave = () => {
      target.a = 0
      if (reduce) {
        cur.a = 0
        draw()
      }
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      inView ? start() : stop()
    })
    io.observe(host)

    host.addEventListener('pointermove', onPointer)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('touchstart', onTouch, { passive: true })
    host.addEventListener('touchmove', onTouch, { passive: true })
    host.addEventListener('touchend', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    resize()
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onPointer)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('touchstart', onTouch)
      host.removeEventListener('touchmove', onTouch)
      host.removeEventListener('touchend', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
