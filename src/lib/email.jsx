import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { person } from '../data/site.js'
import { useReducedMotion } from './hooks.js'
import { ArrowUpRight, Check, Close } from '../components/Icons.jsx'

const EmailContext = createContext(null)
const HIDE_AFTER = 7000
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${person.email}`

// A bare mailto: link does nothing when no mail app is set up, so every
// Email button copies the address and offers Gmail or the mail app.
export function EmailProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  const hovering = useRef(false)
  const reduce = useReducedMotion()

  const hide = useCallback(() => {
    clearTimeout(timer.current)
    setOpen(false)
  }, [])

  const schedule = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => !hovering.current && setOpen(false), HIDE_AFTER)
  }, [])

  const show = useCallback(async () => {
    let ok = false
    try {
      await navigator.clipboard.writeText(person.email)
      ok = true
    } catch {
      // Clipboard can be blocked; the address is still shown and selectable.
    }
    setCopied(ok)
    setOpen(true)
    schedule()
  }, [schedule])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && hide()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, hide])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <EmailContext.Provider value={show}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <AnimatePresence>
          {open && (
            <motion.div
              role="status"
              className="pointer-events-auto w-full max-w-md rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.55)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] } }}
              exit={{ opacity: 0, y: reduce ? 0 : 8, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
              onPointerEnter={() => {
                hovering.current = true
                clearTimeout(timer.current)
              }}
              onPointerLeave={() => {
                hovering.current = false
                schedule()
              }}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-bold text-ink">
                    {copied && <Check className="text-butter" />}
                    {copied ? 'Email copied' : 'Email'}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted select-all">{person.email}</p>
                </div>
                <button
                  type="button"
                  onClick={hide}
                  aria-label="Close"
                  className="press -mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-line hover:text-ink"
                >
                  <Close />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={gmailUrl} target="_blank" rel="noreferrer" onClick={hide} className="btn btn-primary min-h-9 py-1.5 text-sm">
                  Open in Gmail
                  <ArrowUpRight />
                </a>
                <a href={`mailto:${person.email}`} onClick={hide} className="btn btn-ghost min-h-9 py-1.5 text-sm">
                  Mail app
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </EmailContext.Provider>
  )
}

export const useEmail = () => useContext(EmailContext)
