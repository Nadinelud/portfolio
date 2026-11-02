import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer, useReducedMotion } from '../lib/hooks.js'
import { LoopVideo, PhoneFrame } from './Media.jsx'
import { ArrowRight, ArrowUpRight } from './Icons.jsx'

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }
const MAX_TILT = 3

function Cover({ cover, active }) {
  if (cover.kind === 'phone') {
    return (
      <div className="flex h-full items-start justify-center bg-forest pt-8">
        <PhoneFrame
          {...cover}
          className="w-[46%] max-w-[200px] transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        />
      </div>
    )
  }
  if (cover.kind === 'video') {
    return (
      <LoopVideo
        {...cover}
        label={cover.alt}
        playing={active}
        className="h-full w-full object-cover"
      />
    )
  }
  return (
    <img
      src={cover.src}
      width={cover.width}
      height={cover.height}
      alt={cover.alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
  )
}

export default function ProjectCard({ project, onOpen }) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const tilt = fine && !reduce
  const [active, setActive] = useState(false)

  const rx = useSpring(useMotionValue(0), SPRING)
  const ry = useSpring(useMotionValue(0), SPRING)
  const lift = useSpring(useMotionValue(0), SPRING)

  function onMove(e) {
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * MAX_TILT * 2)
    rx.set(-py * MAX_TILT * 2)
  }
  function onEnter() {
    setActive(true)
    if (tilt) lift.set(-6)
  }
  function onLeave() {
    setActive(false)
    rx.set(0)
    ry.set(0)
    lift.set(0)
  }

  const primary = project.links[0]
  const titleId = `card-${project.id}-title`

  return (
    <motion.article
      aria-labelledby={titleId}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={() => setActive(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setActive(false)}
      style={tilt ? { rotateX: rx, rotateY: ry, y: lift, transformPerspective: 1000 } : undefined}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-200 has-[:focus-visible]:border-butter hover:border-butter/60"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-forest">
        <Cover cover={project.cover} active={active} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-7">
        <div>
          <p className="eyebrow">{project.type}</p>
          <h3 id={titleId} className="mt-2 text-2xl md:text-3xl">
            {project.title}
          </h3>
        </div>

        <p className="text-muted">{project.oneLiner}</p>

        <p className="flex items-baseline gap-3 border-l-2 border-butter pl-4 leading-snug">
          <span className="shrink-0 text-xs font-bold tracking-[0.08em] text-butter uppercase">My role</span>
          <span className="font-bold text-ink">{project.roleShort}</span>
        </p>

        <ul className="flex flex-wrap gap-2" aria-label="Tech">
          {project.cardTags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Sits above the stretched details button so it stays clickable. */}
          <a
            href={primary.href}
            target="_blank"
            rel="noreferrer"
            className="press relative z-10 inline-flex items-center gap-1.5 py-2 font-bold text-butter underline-offset-4 hover:underline"
          >
            {primary.label}
            <ArrowUpRight />
          </a>
          <button
            type="button"
            onClick={(e) => onOpen(project.id, e.currentTarget)}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-1.5 py-2 text-sm font-bold text-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            View details
            <ArrowRight className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
