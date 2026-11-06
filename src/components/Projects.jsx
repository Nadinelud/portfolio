import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects } from '../data/projects.js'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import Reveal from './Reveal.jsx'

export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const open = projects.find((p) => p.id === openId)
  const close = useCallback(() => setOpenId(null), [])

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-12 md:py-20">
      <div className="container-page">
        <SectionHeading index="02" title="Projects" id="projects-title" />

        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 2) * 80} className="[perspective:1000px]">
              <ProjectCard project={p} onOpen={setOpenId} />
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={close} />}</AnimatePresence>
    </section>
  )
}
