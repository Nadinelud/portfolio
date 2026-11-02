import { useEffect, useRef, useState } from 'react'
import { person } from '../data/site.js'
import { useScroll } from '../lib/scroll.jsx'
import { useEmail } from '../lib/email.jsx'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { ArrowUpRight, Check, Copy } from './Icons.jsx'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-ghost" aria-live="polite">
      <span className="relative grid">
        {[false, true].map((state) => (
          <span
            key={String(state)}
            aria-hidden={copied !== state}
            className="col-start-1 row-start-1 inline-flex items-center gap-2 transition-[opacity,filter] duration-200 ease-out"
            style={{ opacity: copied === state ? 1 : 0, filter: copied === state ? 'none' : 'blur(2px)' }}
          >
            {state ? <Check /> : <Copy />}
            {state ? 'Copied' : 'Copy email'}
          </span>
        ))}
      </span>
    </button>
  )
}

export default function Contact() {
  const { scrollTo } = useScroll()
  const showEmail = useEmail()

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-[calc(100svh+1rem)] flex-col pt-20 md:min-h-[calc(100svh+4rem)] md:pt-32"
    >
      <div className="container-page flex flex-1 flex-col">
        <SectionHeading index="04" title="Contact" id="contact-title" />

        <Reveal>
          <a
            href={`mailto:${person.email}`}
            onClick={(e) => {
              e.preventDefault()
              showEmail()
            }}
            className="inline-block text-[clamp(1.5rem,6vw,4.5rem)] leading-tight font-bold tracking-tight break-all text-butter decoration-2 underline-offset-[0.15em] hover:underline sm:break-normal"
          >
            {person.email}
          </a>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap gap-3 pb-24">
          <CopyEmail />
          <a href={person.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            GitHub
            <ArrowUpRight />
          </a>
          <a href={person.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
            LinkedIn
            <ArrowUpRight />
          </a>
        </Reveal>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('top')
            }}
            className="press py-2 hover:text-ink"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
