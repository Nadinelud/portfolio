import { person } from '../data/site.js'
import { useScroll } from '../lib/scroll.jsx'

export default function Footer() {
  const { scrollTo } = useScroll()

  return (
    <footer>
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-sm text-muted">
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
