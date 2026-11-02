import { skills } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 md:py-32">
      <div className="container-page">
        <SectionHeading index="03" title="Skills" id="skills-title" />

        <dl className="divide-y divide-line border-y border-line">
          {skills.map((s, i) => (
            <Reveal
              key={s.group}
              delay={i * 50}
              className="grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8"
            >
              <dt className="text-lg font-bold">{s.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item} className="tag text-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
