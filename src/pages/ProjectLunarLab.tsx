import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Moon } from 'lucide-react'
import { ToggleGifCard } from '../components/ToggleGifCard'
import { PrototypePreviewProvider } from '../components/PrototypePreviewContext'
import { PrototypePreviewSectionHeader } from '../components/PrototypePreviewSectionHeader'
import { sampleProjects } from '../data/projects'
import prototypePreviewGif1 from '../assets/case-study/lunar/prototype-1.gif'
import prototypePreviewGif2 from '../assets/case-study/lunar/prototype-2.gif'
import figmaLogo from '../assets/figma-logo.svg'
import moonRightIcon from '../assets/case-study/lunar/moon-right.png'
import moonLeftIcon from '../assets/case-study/lunar/moon-left.png'
import bauLabImg from '../assets/case-study/lunar/bau-lab.webp'
import mitLabImg from '../assets/case-study/lunar/mit-lab.webp'
import lunarHomeBefore from '../assets/case-study/lunar/hifi/lunar-home--before.webp'
import lunarHomeAfter from '../assets/case-study/lunar/hifi/lunar-home--after.webp'
import lunarHomeAfterDark from '../assets/case-study/lunar/hifi/lunar-home--after-dark.webp'
import lunarNewsIndexLight from '../assets/case-study/lunar/hifi/lunar-news--index-light.webp'
import lunarNewsIndexDark from '../assets/case-study/lunar/hifi/lunar-news--index-dark.webp'
import lunarNewsPostLight from '../assets/case-study/lunar/hifi/lunar-news--post-light.webp'
import lunarNewsPostDark from '../assets/case-study/lunar/hifi/lunar-news--post-dark.webp'
import lunarStyleGuide from '../assets/case-study/lunar/style-guide/lunar-style-guide.webp'
import lunarOurLabAfter from '../assets/case-study/lunar/hifi/lunar-our lab--after.webp'
import lunarOurLabAfterDark from '../assets/case-study/lunar/hifi/lunar-our lab--after-dark.webp'
import lunarOurLabBefore from '../assets/case-study/lunar/hifi/lunar-our lab--before.webp'
import lunarJoinLabAfter from '../assets/case-study/lunar/hifi/lunar-join lab--after.webp'
import lunarJoinLabAfterDark from '../assets/case-study/lunar/hifi/lunar-join lab--after-dark.webp'
import lunarJoinLabBefore from '../assets/case-study/lunar/hifi/lunar-join lab--before.webp'
import lunarPapersAfter from '../assets/case-study/lunar/hifi/lunar-papers--after.webp'
import lunarPapersAfterDark from '../assets/case-study/lunar/hifi/lunar-papers--after-dark.webp'
import lunarPapersBefore from '../assets/case-study/lunar/hifi/lunar-papers--before.webp'

const PROTOTYPE_PREVIEW_SCREENS: {
  src: string
  alt: string
  aspectRatio: string
  fit?: 'contain' | 'cover'
  objectPosition?: string
  cardClassName?: string
}[] = [
  {
    src: prototypePreviewGif1,
    alt: 'LUNAR Lab prototype preview: screen 1',
    aspectRatio: '2768 / 1644',
  },
  {
    src: prototypePreviewGif2,
    alt: 'LUNAR Lab prototype preview: screen 2',

    aspectRatio: '680 / 480',
    fit: 'cover',
    objectPosition: 'right center',

    cardClassName: 'max-h-[22rem]',
  },
]

const DESIGN_COMPARISON_CALLOUTS = [
  {
    title: 'Clear lab identity up front',
    body: 'The homepage now explains who the lab is before visitors explore.',
  },
  {
    title: 'Search + tag filters',
    body: 'Browse papers by topic without scrolling.',
  },
  {
    title: 'Restructured page navigation',
    body: 'Easier access to relevant lab info.',
  },
  {
    title: 'Improved information hierarchy',
    body: 'Lab content is easier to scan and more accessible.',
  },
  {
    title: 'Clearer calls to action',
    body: 'No longer sparse or disconnected from the rest of the site.',
  },
  {
    title: 'Improved visitor pathways',
    body: 'Consistent footer with contact details and social links.',
  },
]

type MetaItem = {
  label: string
  value: string | string[]
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-[13px] font-medium uppercase leading-relaxed tracking-[0.12em] text-neutral-800 sm:text-sm">
      {children}
    </h2>
  )
}

function MetaGrid({ items }: { items: MetaItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10 md:gap-y-8">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="font-sans text-sm font-semibold tracking-tight text-black">
            {item.label}
          </dt>
          {Array.isArray(item.value) ? (
            <dd className="mt-3 space-y-1">
              {item.value.map((line) => (
                <div
                  key={line}
                  className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm"
                >
                  {line}
                </div>
              ))}
            </dd>
          ) : (
            <dd className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
              {item.value}
            </dd>
          )}
        </div>
      ))}
    </dl>
  )
}

export function ProjectLunarLab() {
  const [redesignDark, setRedesignDark] = useState(false)
  const [newsDark, setNewsDark] = useState(false)
  const projectTags = sampleProjects.find((p) => p.id === 'health-companion')?.tags ?? []

  const comparisonsRef = useRef<HTMLDivElement | null>(null)
  const [comparisonsInView, setComparisonsInView] = useState(false)

  useEffect(() => {
    const el = comparisonsRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setComparisonsInView(true)
          obs.disconnect()
        }
      },

      { root: null, threshold: 0.1, rootMargin: '600px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!comparisonsInView) return

    const img0 = new Image()
    img0.src = lunarHomeAfterDark
    const img1 = new Image()
    img1.src = lunarOurLabAfterDark
    const img2 = new Image()
    img2.src = lunarJoinLabAfterDark
    const img3 = new Image()
    img3.src = lunarPapersAfterDark
  }, [comparisonsInView])

  const meta: MetaItem[] = [
    {
      label: 'My role',
      value: 'Designer + Developer',
    },
    { label: 'Skills/Tools', value: 'Figma, React, Vite, GitHub content management system (CMS), Notion' },
    { label: 'Team', value: '1 Project Manager · 5 Designers · 10 Developers' },
    { label: 'Timeline', value: '3 months' },
  ]

  return (
    <div className="bg-white">
      <section className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="min-w-0 w-full">
            <ul className="flex flex-wrap gap-1.5">
              {projectTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-900"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <h1 className="mt-5 w-full font-sans text-[clamp(2.1rem,6.2vw,3.75rem)] font-bold uppercase leading-[1.02] tracking-tight text-black">
              LUNAR Lab Website
            </h1>
            <div className="mt-4 flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:gap-8">
              <p className="min-w-0 max-w-2xl flex-1 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                I helped redesign the website and build a GitHub-backed content management system (CMS) for <strong className="font-bold text-black">LUNAR</strong>{' '}
                <Moon
                  aria-hidden
                  className="inline-block h-[1.1em] w-[1.1em] shrink-0 -translate-y-px align-middle"
                  fill="none"
                />
                ,{' '}
                <strong className="font-bold text-black">
                  Brown University’s Language Understanding and Representation Lab
                </strong>
                , through Full Stack @ Brown. The goal was to help visitors find the lab’s research and give lab members a manageable way to keep it current.
              </p>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <a
                  href="https://github.com/fullstackatbrown/project-lunar-lab"
                  data-cursor-label="open"
                  className="inline-flex items-center gap-2 border border-black bg-white px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.53 2.865 8.373 6.839 9.729.5.095.682-.22.682-.489 0-.242-.009-.883-.014-1.733-2.782.616-3.369-1.37-3.369-1.37-.455-1.184-1.11-1.5-1.11-1.5-.907-.64.069-.627.069-.627 1.003.072 1.531 1.056 1.531 1.056.892 1.565 2.341 1.113 2.91.85.091-.67.349-1.113.635-1.369-2.22-.26-4.555-1.14-4.555-5.072 0-1.12.389-2.034 1.029-2.752-.103-.26-.446-1.309.098-2.728 0 0 .84-.276 2.75 1.05A9.25 9.25 0 0 1 12 6.994a9.25 9.25 0 0 1 2.504.35c1.909-1.326 2.748-1.05 2.748-1.05.546 1.419.203 2.468.1 2.728.64.718 1.028 1.632 1.028 2.752 0 3.942-2.338 4.809-4.566 5.064.359.316.679.94.679 1.894 0 1.367-.013 2.47-.013 2.807 0 .27.18.588.688.488A10.02 10.02 0 0 0 22 12.253C22 6.588 17.523 2 12 2Z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.figma.com/design/9k6SS5RlejZcQLLng7bYrV/LunarLab?node-id=0-1&p=f&t=W03IBxo6V1BQ8ZGA-0"
                  data-cursor-label="open"
                  className="inline-flex items-center gap-2 border border-black bg-white px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Figma"
                >
                  <img
                    src={figmaLogo}
                    alt=""
                    aria-hidden
                    className="h-3.5 w-3.5"
                    draggable={false}
                  />
                  Figma
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <MetaGrid items={meta} />
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <PrototypePreviewProvider>
            <PrototypePreviewSectionHeader>Prototype preview</PrototypePreviewSectionHeader>
            <div className="mt-3 w-full">
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[1.1fr_0.9fr] sm:gap-3 sm:items-stretch">
                {PROTOTYPE_PREVIEW_SCREENS.map((item) => (
                  <div
                    key={item.src}
                    className={`w-full min-w-0 overflow-hidden rounded-2xl border border-black bg-white ${
                      item.cardClassName ?? ''
                    }`}
                  >
                    <ToggleGifCard
                      src={item.src}
                      alt={item.alt}
                      aspectRatio={item.aspectRatio}
                      fit={item.fit ?? 'contain'}
                      objectPosition={item.objectPosition}
                      className="block w-full cursor-none select-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </PrototypePreviewProvider>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10">
            <div>
              <SectionTitle>Motivation / challenge</SectionTitle>
              <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                The project was not just a visual refresh. The site needed to feel credible to external
                visitors while also being practical for the people maintaining it. That meant designing
                clear public pages for research and lab identity, while building a content structure that
                could scale as the lab added new papers, people, and updates.
              </p>
              <p className="mt-8 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="font-semibold text-black">Design question:</span>{' '}
                <em>
                  How might we make LUNAR Lab’s work easier to discover publicly while giving the team a
                  maintainable content system they could keep updated without a traditional backend?
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>Client goals → product decisions</SectionTitle>

          <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
            In the first client meeting, Professor Pavlick helped turn a broad “lab website redesign” into a
            clearer product brief. The site needed to support how the lab actually works: publishing
            papers, surfacing recent updates, organizing research across changing topics, and letting lab
            members maintain content through GitHub instead of a traditional admin dashboard.
          </p>

          <div className="mt-10 flex flex-col gap-14 lg:gap-16">
            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 1:
                </span>{' '}
                <em>Public visibility</em>
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                The homepage needed to act like a{' '}
                <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                  living lab feed
                </span>
                . Recent papers, talks, blog posts, events, and announcements needed to be visible from the{' '}
                <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">landing page</span>,
                not buried across separate sections.
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 2:
                </span>{' '}
                <em>Internal maintainability</em>
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                The CMS had to fit the lab’s existing workflow. Rather than using a database or custom admin
                tool, content would live in{' '}
                <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">GitHub</span> through
                JSON/content files and pull requests.
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 3:
                </span>{' '}
                <em>Flexible tags + discovery</em>
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Research discovery needed{' '}
                <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                  flexible tags and filters
                </span>
                . The lab’s topics evolve, so tags had to be free-form and manageable by lab members instead of
                hard-coded into fixed research categories.
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 4:
                </span>{' '}
                <em>Credible, not sterile</em>
              </p>
              <p className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Professor Pavlick pointed us toward clean research-lab references like{' '}
                <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">Bau Lab</span> and{' '}
                <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">MIT LINGO</span>, while
                giving us room to use the lab’s lunar identity through color, logo assets, and subtle visual
                details.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-black bg-white">
                  <img
                    src={bauLabImg}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="block h-auto w-full select-none object-contain"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl border border-black bg-white">
                  <img
                    src={mitLabImg}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="block h-auto w-full select-none object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-6xl">
            <SectionTitle>Design comparison</SectionTitle>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black bg-white">
              <div className="grid divide-y divide-black/20 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="px-4 py-4 sm:px-5 sm:py-5">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    Original site
                  </p>
                  <ul className="mt-2 space-y-2 font-mono text-[13px] leading-relaxed text-neutral-800">
                    <li>
                      •{' '}
                      Research, people, alumni, collaborators, and lab updates were spread across{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        long static pages
                      </span>
                      .
                    </li>
                    <li>
                      • Papers were hard to browse by{' '}
                      topic, year, or research area — the only “filter” was{' '}
                      <span className="font-semibold text-black">Ctrl + F</span>.
                    </li>
                    <li>
                      • Updates depended on{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        manual maintenance
                      </span>{' '}
                      rather than a repeatable content workflow.
                    </li>
                    <li>
                      • The visual system felt functional, but did not fully use the{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        lab’s lunar identity
                      </span>
                      .
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-50 px-4 py-4 sm:px-5 sm:py-5">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
                    Redesign
                  </p>
                  <ul className="mt-2 space-y-2 font-mono text-[13px] leading-relaxed text-neutral-900">
                    <li>
                      • Created{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        clearer page structure
                      </span>{' '}
                      for People, Research, Blog/Updates, and Join the Lab.
                    </li>
                    <li>
                      • Designed a research page with{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        search and flexible tag filtering
                      </span>{' '}
                      so papers can be discovered by topic.
                    </li>
                    <li>
                      • Supported a GitHub-based CMS workflow so lab members can update papers and content through
                      structured files and pull requests.
                    </li>
                    <li>
                      • Built a visual system around the{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        LUNAR identity
                      </span>
                      : navy, tan, serif headings, moon/astronaut details, and{' '}
                      <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
                        light/dark modes
                      </span>
                      .
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-visible" ref={comparisonsRef}>
            <div className="grid gap-6 lg:grid-cols-[minmax(28rem,1fr)_minmax(12rem,14rem)_minmax(28rem,1fr)] lg:gap-6">
              <div className="min-w-0 lg:min-w-[28rem] lg:-ml-10">
                <div className="flex items-center gap-3">
                  <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                    Before
                  </p>
                  <div className="flex items-center gap-1.5 invisible">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-0.5 text-black"
                      aria-hidden
                      tabIndex={-1}
                    >
                      <Moon className="h-4 w-4" aria-hidden />
                    </button>
                    <span className="font-mono text-[11px] leading-snug text-neutral-600">Light mode</span>
                  </div>
                </div>

                <div className="mt-3 grid gap-3">
                  <div className="flex h-[16rem] w-full items-start justify-center overflow-hidden border border-black bg-white p-3 sm:h-[20rem] lg:h-[52vh] lg:min-h-[21rem]">
                    <img
                      src={comparisonsInView ? lunarHomeBefore : undefined}
                      alt="LUNAR Lab — Home page, original"
                      className="block h-full w-full select-none object-contain object-top"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="h-[14rem] w-full overflow-hidden border border-black bg-white sm:h-[18rem] lg:h-[44vh] lg:min-h-[18rem]">
                    <img
                      src={comparisonsInView ? lunarPapersBefore : undefined}
                      alt="LUNAR Lab — Papers section, original"
                      className="block h-full w-full select-none object-contain object-top lg:object-cover"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="h-[28rem] w-full overflow-hidden border border-black bg-white sm:h-[38rem] lg:h-[110vh] lg:min-h-[55rem]">
                    <img
                      src={comparisonsInView ? lunarOurLabBefore : undefined}
                      alt="LUNAR Lab — Our Lab section, original"
                      className="block h-full w-full select-none object-contain object-top lg:object-cover"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="h-[14rem] w-full overflow-hidden border border-black bg-white sm:h-[18rem] lg:h-[44vh] lg:min-h-[18rem]">
                    <img
                      src={comparisonsInView ? lunarJoinLabBefore : undefined}
                      alt="LUNAR Lab — Join Lab section, original"
                      className="block h-full w-full select-none object-contain object-top lg:object-cover"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:hidden" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-neutral-500"
                >
                  <path d="M12 4v16" />
                  <path d="m6 14 6 6 6-6" />
                </svg>
              </div>

              <div className="hidden lg:block">
                <div className="h-[1.55rem]" aria-hidden />
                <div className="relative z-10 mt-3 grid gap-3 -mx-6">
                  <div className="h-[52vh] min-h-[21rem]">
                    <div className="flex h-full flex-col justify-center">
                      <div className="relative flex items-center -translate-y-12">
                        <img
                          src={moonLeftIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute left-0 z-20 h-5 w-5 -translate-x-1/2"
                        />
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <div className="z-20 mx-0 w-[13rem] px-1 text-center">
                          <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                            Clear lab identity up front
                          </p>
                          <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-neutral-800">
                            The homepage now explains who the lab is before visitors explore.
                          </p>
                        </div>
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <img
                          src={moonRightIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute right-0 z-20 h-5 w-5 translate-x-1/2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-[44vh] min-h-[18rem]">
                    <div className="flex h-full flex-col justify-center">
                      <div className="relative flex items-center -translate-y-14">
                        <img
                          src={moonLeftIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute left-0 z-20 h-5 w-5 -translate-x-1/2"
                        />
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <div className="z-20 mx-0 w-[13rem] px-1 text-center">
                          <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                            Search + tag filters
                          </p>
                          <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-neutral-800">
                            Browse papers by topic without scrolling.
                          </p>
                        </div>
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <img
                          src={moonRightIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute right-0 z-20 h-5 w-5 translate-x-1/2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-[110vh] min-h-[55rem]">
                    <div className="flex h-full flex-col justify-start pt-4">
                      <div className="relative flex items-center">
                        <img
                          src={moonLeftIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute left-0 z-20 h-5 w-5 -translate-x-1/2"
                        />
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <div className="z-20 mx-0 w-[13rem] px-1 text-center">
                          <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                            Restructured page navigation
                          </p>
                          <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-neutral-800">
                            Easier access to relevant lab info.
                          </p>
                        </div>
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <img
                          src={moonRightIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute right-0 z-20 h-5 w-5 translate-x-1/2"
                        />
                      </div>

                      <div className="relative mt-64 flex items-center">
                        <img
                          src={moonLeftIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute left-0 z-20 h-5 w-5 -translate-x-1/2"
                        />
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <div className="z-20 mx-0 w-[13rem] px-1 text-center">
                          <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                            Improved information hierarchy
                          </p>
                          <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-neutral-800">
                            To make lab content easier to scan and more accessible.
                          </p>
                        </div>
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <img
                          src={moonRightIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute right-0 z-20 h-5 w-5 translate-x-1/2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-[44vh] min-h-[18rem]">
                    <div className="flex h-full flex-col justify-start pt-6 pb-6">
                      <div className="relative flex items-center">
                        <img
                          src={moonLeftIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute left-0 z-20 h-5 w-5 -translate-x-1/2"
                        />
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <div className="z-20 mx-0 w-[13rem] px-1 text-center">
                          <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                            Clearer calls to action
                          </p>
                          <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-neutral-800">
                            No longer sparse or disconnected from rest of site.
                          </p>
                        </div>
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <img
                          src={moonRightIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute right-0 z-20 h-5 w-5 translate-x-1/2"
                        />
                      </div>

                      <div className="relative mt-auto flex items-center">
                        <img
                          src={moonLeftIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute left-0 z-20 h-5 w-5 -translate-x-1/2"
                        />
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <div className="z-20 mx-0 w-[13rem] px-1 text-center">
                          <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                            Improved visitor pathways
                          </p>
                          <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-neutral-800">
                            Consistent footer with contact details and social links.
                          </p>
                        </div>
                        <span className="h-px flex-1 border-t-2 border-[#323c4f]" aria-hidden />
                        <img
                          src={moonRightIcon}
                          alt=""
                          aria-hidden
                          draggable={false}
                          className="absolute right-0 z-20 h-5 w-5 translate-x-1/2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-w-0 lg:min-w-[28rem] lg:-mr-10">
                <div className="relative flex items-center gap-3">
                  <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                    After
                  </p>
                  <button
                    type="button"
                    data-cursor-label="toggle"
                    aria-label={redesignDark ? 'Show light mode' : 'Show dark mode'}
                    onClick={() => setRedesignDark((v) => !v)}
                    className="ml-auto inline-flex items-center gap-1 p-0.5 text-black transition-colors sm:absolute sm:left-1/2 sm:ml-0 sm:-translate-x-1/2"
                  >
                    <Moon
                      className="h-4 w-4"
                      aria-hidden
                      fill={redesignDark ? 'currentColor' : 'none'}
                    />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] leading-snug text-neutral-600">
                      {redesignDark ? 'Dark mode' : 'Light mode'}
                    </span>
                    <span className="hidden font-mono text-[11px] leading-snug text-neutral-500 sm:inline">
                      — click to toggle
                    </span>
                  </button>
                </div>

                <div className="mt-3 grid gap-3">
                  <div className="h-[16rem] w-full overflow-hidden border border-black bg-white sm:h-[20rem] lg:h-[52vh] lg:min-h-[21rem]">
                    <div className="relative h-full w-full">
                      <img
                        src={comparisonsInView ? lunarHomeAfter : undefined}
                        alt="LUNAR Lab — Home page, redesigned (light)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? 'hidden' : '')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src={comparisonsInView ? lunarHomeAfterDark : undefined}
                        alt="LUNAR Lab — Home page, redesigned (dark)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? '' : 'hidden')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="h-[14rem] w-full overflow-hidden border border-black bg-white sm:h-[18rem] lg:h-[44vh] lg:min-h-[18rem]">
                    <div className="relative h-full w-full">
                      <img
                        src={comparisonsInView ? lunarPapersAfter : undefined}
                        alt="LUNAR Lab — Papers section, redesigned (light)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? 'hidden' : '')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src={comparisonsInView ? lunarPapersAfterDark : undefined}
                        alt="LUNAR Lab — Papers section, redesigned (dark)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? '' : 'hidden')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="h-[28rem] w-full overflow-hidden border border-black bg-white sm:h-[38rem] lg:h-[110vh] lg:min-h-[55rem]">
                    <div className="relative h-full w-full">
                      <img
                        src={comparisonsInView ? lunarOurLabAfter : undefined}
                        alt="LUNAR Lab — Our Lab section, redesigned (light)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? 'hidden' : '')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src={comparisonsInView ? lunarOurLabAfterDark : undefined}
                        alt="LUNAR Lab — Our Lab section, redesigned (dark)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? '' : 'hidden')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="h-[14rem] w-full overflow-hidden border border-black bg-white sm:h-[18rem] lg:h-[44vh] lg:min-h-[18rem]">
                    <div className="relative h-full w-full">
                      <img
                        src={comparisonsInView ? lunarJoinLabAfter : undefined}
                        alt="LUNAR Lab — Join Lab section, redesigned (light)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? 'hidden' : '')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src={comparisonsInView ? lunarJoinLabAfterDark : undefined}
                        alt="LUNAR Lab — Join Lab section, redesigned (dark)"
                        className={
                          'absolute inset-0 block h-full w-full select-none object-contain object-top lg:object-cover ' +
                          (redesignDark ? '' : 'hidden')
                        }
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-3 lg:hidden">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                Key redesign callouts
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {DESIGN_COMPARISON_CALLOUTS.map((callout) => (
                  <div
                    key={callout.title}
                    className="rounded-xl border border-black bg-white px-3 py-3"
                  >
                    <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black">
                      {callout.title}
                    </p>
                    <p className="mt-1 font-mono text-[12px] leading-relaxed text-neutral-800">
                      {callout.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionTitle>New features</SectionTitle>
            <button
              type="button"
              data-cursor-label="toggle"
              aria-label={newsDark ? 'Show light mode news screenshots' : 'Show dark mode news screenshots'}
              onClick={() => setNewsDark((v) => !v)}
              className="inline-flex items-center gap-1.5 self-start p-0.5 text-black transition-colors sm:self-auto"
            >
              <Moon className="h-4 w-4" aria-hidden fill={newsDark ? 'currentColor' : 'none'} />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] leading-snug text-neutral-600">
                {newsDark ? 'Dark mode' : 'Light mode'}
              </span>
              <span className="font-mono text-[11px] leading-snug text-neutral-500">— click to toggle</span>
            </button>
          </div>
          <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
            Beyond the core pages, we implemented a{' '}
            <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
              blog/updates flow
            </span>{' '}
            so the lab can publish{' '}
            <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">
              news, talks, posts, and announcements
            </span>{' '}
            as part of the site. We also added a{' '}
            <span className="bg-[#F9E4C8] px-1.5 py-0.5 font-medium text-black">style guide</span> to keep
            future content and pages visually consistent after handoff.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            <div className="overflow-hidden rounded-2xl border border-black bg-white">
              <div className="relative aspect-[8/7] w-full bg-neutral-50">
                <img
                  src={lunarNewsIndexLight}
                  alt="LUNAR Lab — Blog/updates index (hi-fi)"
                  className={
                    'absolute inset-0 block h-full w-full select-none object-cover object-top ' +
                    (newsDark ? 'hidden' : '')
                  }
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={lunarNewsIndexDark}
                  alt="LUNAR Lab — Blog/updates index (hi-fi, dark)"
                  className={
                    'absolute inset-0 block h-full w-full select-none object-cover object-top ' +
                    (newsDark ? '' : 'hidden')
                  }
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black bg-white">
              <div className="relative aspect-[8/7] w-full bg-neutral-50">
                <img
                  src={lunarNewsPostLight}
                  alt="LUNAR Lab — Blog post template (hi-fi)"
                  className={
                    'absolute inset-0 block h-full w-full select-none object-cover object-top ' +
                    (newsDark ? 'hidden' : '')
                  }
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={lunarNewsPostDark}
                  alt="LUNAR Lab — Blog post template (hi-fi, dark)"
                  className={
                    'absolute inset-0 block h-full w-full select-none object-cover object-top ' +
                    (newsDark ? '' : 'hidden')
                  }
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 max-h-[38rem] overflow-hidden rounded-2xl bg-white sm:max-h-[46rem]">
            <img
              src={lunarStyleGuide}
              alt="LUNAR Lab — style guide"
              className="block h-auto w-full select-none"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>Outcome + reflection</SectionTitle>
          <div className="mt-3 w-full space-y-8">
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">What we shipped:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                A redesigned lab website prototype and frontend build with public-facing pages for people,
                research, updates, and joining the lab, plus a GitHub-controlled content workflow for papers
                and other structured content.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">What I learned:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                I learned that a lab website’s maintenance workflow is part of the design. Helping visitors
                find research matters, but so does making updates manageable for the lab after handoff.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">Next steps:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                I would continue refining the GitHub CMS workflow, test the tagging/filtering system with
                real lab papers, document the content schema for lab members, and polish responsive states
                across the research and people pages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
