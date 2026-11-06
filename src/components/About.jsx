import { about } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-12 md:py-20">
      <div className="container-page">
        <SectionHeading index="01" title="About" id="about-title" />

        <div className="flex max-w-2xl flex-col gap-6">
          {about.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 80} className="text-lg text-ink md:text-xl md:leading-relaxed">
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
