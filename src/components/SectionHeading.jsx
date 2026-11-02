import Reveal from './Reveal.jsx'

export default function SectionHeading({ index, title, id }) {
  return (
    <Reveal className="mb-10 flex items-baseline gap-4 border-t border-line pt-6 md:mb-14">
      <span className="eyebrow tabular-nums">{index}</span>
      <h2 id={id} className="text-4xl md:text-6xl">
        {title}
      </h2>
    </Reveal>
  )
}
