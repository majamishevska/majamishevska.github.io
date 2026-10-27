import { CustomCursor } from './components/CustomCursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MoreProjects } from './components/MoreProjects'
import { PapersIntro } from './components/PapersIntro'
import { Projects } from './components/Projects'
import { WhatsInMyBag } from './components/WhatsInMyBag'
import { useEffect, useState } from 'react'
import { Research } from './pages/Research'
import { Project3PT } from './pages/Project3PT'
import { ProjectLunarLab } from './pages/ProjectLunarLab'
import { ProjectPitNe } from './pages/ProjectPitNe'

function App() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }))

  useEffect(() => {
    const update = () => setLocation({ pathname: window.location.pathname, hash: window.location.hash })
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href') ?? ''
      if ((!href.startsWith('/') && !href.startsWith('#')) || href.startsWith('//')) return
      const url = new URL(href, window.location.href)
      if (!['/', '/projects', '/about', '/3pt', '/lunar', '/pit-ne'].includes(url.pathname)) return
      event.preventDefault()
      window.history.pushState({}, '', url.pathname + url.search + url.hash)
      update()
    }
    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)
    document.addEventListener('click', navigate)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
      document.removeEventListener('click', navigate)
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1)
      if (id && id !== 'top') document.getElementById(id)?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [location])

  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const { hash } = location
  const about = pathname === '/about' || (pathname === '/' && hash === '#about-me')
  const projects = pathname === '/projects' || (pathname === '/' && hash === '#projects')
  const caseStudy = {
    '/3pt': { component: Project3PT, id: 'privacy-period-tracker' },
    '/lunar': { component: ProjectLunarLab, id: 'health-companion' },
    '/pit-ne': { component: ProjectPitNe, id: 'design-system' },
  }[pathname]
  const CaseStudy = caseStudy?.component
  const homepage = pathname === '/' && !about && !projects

  return (
    <>
      <CustomCursor />

      <span
        id="top"
        className="pointer-events-none absolute left-0 top-0 block h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />

      <main className="bg-white">
        {!homepage && (
          <div className="px-5 pt-5 sm:px-8 sm:pt-6 lg:px-10 lg:pt-8">
            <div className={about || projects ? 'mx-auto max-w-6xl' : undefined}>
            <a href="/" data-cursor-label="open" className="inline-block font-mono text-[13px] text-neutral-800 underline decoration-black/40 underline-offset-4 transition-colors duration-200 hover:bg-[#e4e8dc] hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:text-sm">
              <span aria-hidden="true" className="font-sans">←</span> Return home
            </a>
            </div>
          </div>
        )}
        {CaseStudy ? (
          <>
            <CaseStudy />
            <MoreProjects currentProjectId={caseStudy.id} />
          </>
        ) : about ? (
          <>
            <Hero aboutExpanded />
            <section aria-label="About">
              <PapersIntro />
              <WhatsInMyBag />
            </section>
          </>
        ) : projects ? (
          <>
            <Hero />
            <Projects />
          </>
        ) : <Research />}
      </main>
      <Footer />
    </>
  )
}

export default App
