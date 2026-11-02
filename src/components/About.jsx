import { about, internshipRole, person } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-32">
      <div className="container-page">
        <SectionHeading index="02" title="About" id="about-title" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-16">
          {/* [TODO] Replace with photo.jpg if one is added. */}
          <Reveal className="flex aspect-square w-40 items-center justify-center rounded-2xl border border-line bg-surface md:w-full">
            <span className="text-5xl font-bold tracking-tight text-butter md:text-7xl" aria-hidden="true">
              {person.nickname}
            </span>
          </Reveal>

          <div className="flex max-w-2xl flex-col gap-6">
            {about.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80} className="text-lg text-ink md:text-xl md:leading-relaxed">
                {p}
              </Reveal>
            ))}
            <Reveal delay={160}>
              {internshipRole ? (
                <p className="text-lg text-ink">{internshipRole}</p>
              ) : (
                <p className="inline-flex rounded-full border border-dashed border-muted/50 px-4 py-1.5 text-sm text-muted">
                  Internship role: to be added
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
