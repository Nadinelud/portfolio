import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const ScrollContext = createContext(null)
// Matches the fixed header (h-16), so the container sits right under it.
const HEADER_OFFSET = -64

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Touch devices keep their native scrolling; Lenis only smooths wheel input.
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    lenisRef.current = lenis
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((id) => {
    const section = id === 'top' ? null : document.getElementById(id)
    const el = id === 'top' ? document.body : (section?.querySelector('.container-page') ?? section)
    if (!el) return
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(id === 'top' ? 0 : el, { offset: HEADER_OFFSET })
    } else {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    }
    history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`)
  }, [])

  const lock = useCallback((locked) => {
    const lenis = lenisRef.current
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    if (lenis) locked ? lenis.stop() : lenis.start()
  }, [])

  return <ScrollContext.Provider value={{ scrollTo, lock }}>{children}</ScrollContext.Provider>
}

export const useScroll = () => useContext(ScrollContext)
