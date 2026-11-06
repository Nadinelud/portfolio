import { ScrollProvider } from './lib/scroll.jsx'
import { EmailProvider } from './lib/email.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <ScrollProvider>
      <EmailProvider>
      <a
        href="#projects"
        className="btn btn-primary fixed top-3 left-3 z-[60] -translate-y-20 focus:translate-y-0"
      >
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Footer />
      </EmailProvider>
    </ScrollProvider>
  )
}
