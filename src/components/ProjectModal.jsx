import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { useMediaQuery, useReducedMotion } from '../lib/hooks.js'
import { useScroll } from '../lib/scroll.jsx'
import Gallery from './Gallery.jsx'
import Rich from './Rich.jsx'
import { ArrowUpRight, Close } from './Icons.jsx'

const EASE_OUT = [0.23, 1, 0.32, 1]
const EASE_DRAWER = [0.32, 0.72, 0, 1]

function panelMotion(reduce, desktop) {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    }
  }
  if (desktop) {
    return {
      initial: { opacity: 0, scale: 0.96, y: 8 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.26, ease: EASE_OUT } },
      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15, ease: EASE_OUT } },
    }
  }
  // Phones: a sheet that comes up from the bottom edge.
  return {
    initial: { y: '100%' },
    animate: { y: 0, transition: { duration: 0.45, ease: EASE_DRAWER } },
    exit: { y: '100%', transition: { duration: 0.25, ease: EASE_DRAWER } },
  }
}

function Block({ title, children }) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-bold tracking-[0.08em] text-muted uppercase">{title}</h3>
      {children}
    </section>
  )
}

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const { lock } = useScroll()
  const reduce = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const titleId = `modal-${project.id}-title`

  useEffect(() => {
    const returnTo = document.activeElement
    lock(true)
    closeRef.current?.focus({ preventScroll: true })

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      )
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      lock(false)
      returnTo?.focus?.({ preventScroll: true })
    }
  }, [lock, onClose])

  return createPortal(
    <div className="fixed inset-0 z-50">
      <motion.div
        className="absolute inset-0 bg-forest/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-center md:p-8">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-lenis-prevent
          {...panelMotion(reduce, desktop)}
          className="pointer-events-auto relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-surface md:max-h-[90vh] md:max-w-4xl md:rounded-3xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-3 md:px-8">
            <p className="eyebrow truncate">{project.type}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="press -mr-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink hover:bg-line"
              aria-label="Close project details"
            >
              <Close width={18} height={18} />
            </button>
          </div>

          <div className="px-5 pt-6 pb-10 md:px-8 md:pt-8">
            <header className="max-w-2xl">
              <h2 id={titleId} className="text-4xl md:text-5xl">
                {project.title}
              </h2>
              <p className="mt-2 text-lg text-ink">{project.subtitle}</p>
              {project.event && <p className="eyebrow mt-1">{project.event}</p>}
              <p className="mt-4 text-muted">{project.oneLiner}</p>
            </header>

            <div className="mt-8">
              <Gallery gallery={project.gallery} />
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
              <div className="flex flex-col gap-8">
                <div className="border-l-2 border-butter pl-4">
                  <p className="text-xs font-bold tracking-[0.08em] text-butter uppercase">My role</p>
                  <p className="mt-1 text-ink">
                    <Rich text={project.role} />
                  </p>
                  {project.roleNote && <p className="mt-2 text-sm text-muted">{project.roleNote}</p>}
                </div>

                {project.howItWorks && (
                  <Block title="How it works">
                    <dl className="flex flex-col gap-4">
                      {project.howItWorks.map((r) => (
                        <div key={r.title}>
                          <dt className="font-bold text-ink">{r.title}</dt>
                          <dd className="text-[0.9375rem] text-muted">{r.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </Block>
                )}

                <Block title="Highlights">
                  <ul className="flex flex-col gap-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-ink">
                        <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-butter" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Block>
              </div>

              <div className="flex flex-col gap-8">
                {project.tech.map((group) => (
                  <Block key={group.label} title={group.label}>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Block>
                ))}

                {project.dataset && (
                  <Block title="Dataset">
                    <p className="text-[0.9375rem] text-muted">
                      {project.dataset.text}:{' '}
                      <a
                        href={project.dataset.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-butter underline underline-offset-4"
                      >
                        {project.dataset.label}
                      </a>
                    </p>
                  </Block>
                )}

                <Block title="Links">
                  <ul className="flex flex-col items-start gap-2">
                    {project.links.map((l, i) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}
                        >
                          {l.label}
                          <ArrowUpRight />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Block>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body,
  )
}
