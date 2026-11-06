import { person } from '../data/site.js'
import TopoCanvas from './TopoCanvas.jsx'
import Reveal from './Reveal.jsx'
import { ArrowUpRight } from './Icons.jsx'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden pt-28 pb-12 md:pb-16"
    >
      <TopoCanvas className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />

      <div className="container-page">
        <Reveal as="p" className="eyebrow mb-6 flex max-w-xl items-start gap-3 text-sm md:text-base">
          <span className="mt-[0.6em] size-2 shrink-0 rounded-full bg-butter" aria-hidden="true" />
          {person.status}
        </Reveal>

        <Reveal
          as="h1"
          delay={80}
          className="text-[clamp(3rem,11vw,8.5rem)] leading-[0.95] tracking-[-0.035em]"
        >
          Nadine Kay
          <br />
          Ludony
        </Reveal>

        <Reveal
          as="p"
          delay={160}
          className="mt-8 max-w-xl text-xl leading-snug text-ink md:text-2xl"
        >
          {person.tagline}
        </Reveal>

        <Reveal delay={240} className="mt-10 flex flex-wrap gap-3">
          <a href={person.cv} target="_blank" rel="noreferrer" className="btn btn-primary">
            View CV
            <ArrowUpRight />
          </a>
          <a href={person.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            GitHub
            <ArrowUpRight />
          </a>
          <a href={person.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
            LinkedIn
            <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
