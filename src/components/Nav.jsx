import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { person, sections } from '../data/site.js'
import { useScroll } from '../lib/scroll.jsx'
import { useReducedMotion } from '../lib/hooks.js'
import { useEmail } from '../lib/email.jsx'

function useActiveSection() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const visible = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
        const current = sections.find((s) => visible.get(s.id))
        setActive(current ? current.id : null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export default function Nav() {
  const { scrollTo } = useScroll()
  const reduce = useReducedMotion()
  const showEmail = useEmail()
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-200 ${
        scrolled || open ? 'border-line bg-forest' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <a
          href="#top"
          onClick={go('top')}
          className="press text-xl font-bold tracking-tight"
          aria-label={`${person.name}, back to top`}
        >
          {person.nickname}
          <span className="text-butter">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`relative block px-3 py-2 text-sm transition-colors duration-200 ${
                  active === s.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-px h-px bg-butter"
                    transition={
                      reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }
                    }
                  />
                )}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <button type="button" onClick={showEmail} className="btn btn-primary min-h-9 py-1.5 text-sm">
              Email
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="press -mr-2 px-2 py-2 text-sm font-bold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-line bg-forest md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <ul className="container-page flex flex-col py-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={go(s.id)}
                    className={`block py-3 text-2xl font-bold ${
                      active === s.id ? 'text-butter' : 'text-ink'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    showEmail()
                  }}
                  className="btn btn-primary"
                >
                  Email
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
