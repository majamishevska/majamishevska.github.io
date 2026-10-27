import { PieChart, type PieSlice } from '../components/PieChart'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ToggleGifCard } from '../components/ToggleGifCard'
import { PrototypePreviewProvider } from '../components/PrototypePreviewContext'
import { PrototypePreviewSectionHeader } from '../components/PrototypePreviewSectionHeader'
import { sampleProjects } from '../data/projects'
import d6Walk1 from '../assets/case-study/d6/d6-1.png'
import d6Walk2 from '../assets/case-study/d6/d6-2.png'
import d6Logo from '../assets/case-study/d6/d6-logo.png'
import d6Preview1 from '../assets/case-study/d6/d6-preview1.gif'
import d6Preview2 from '../assets/case-study/d6/d6-preview2.gif'
import d6Preview3 from '../assets/case-study/d6/d6-preview3.gif'
import d6Preview4 from '../assets/case-study/d6/d6-preview4.gif'
import benWeberImg from '../assets/case-study/d6/benjweber.png'
import cityOfBostonSite from '../assets/case-study/d6/cityofboston-site.png'
import d6StyleGuide from '../assets/case-study/d6/d6-styleguide.png'
import systemFlowMap from '../assets/case-study/d6/system-flow-map.png'
import userPersona from '../assets/case-study/d6/user-persona.png'

const LIVE_URL = 'https://www.bostond6.com/'
const GITHUB_URL =
  'https://github.com/majamishevska/district6-webapp#city-councilor-resource-app-district-6--boston'
const D6_WALK_PHOTOS = [d6Walk1, d6Walk2]

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

function Highlight({ children }: { children: ReactNode }) {
  return <span className="bg-[#dbeee6] px-1.5 py-0.5 font-medium text-black">{children}</span>
}

function MetaGrid({ items }: { items: MetaItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10 md:gap-y-8">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="font-sans text-sm font-semibold tracking-tight text-black">{item.label}</dt>
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

function GitHubIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.53 2.865 8.373 6.839 9.729.5.095.682-.22.682-.489 0-.242-.009-.883-.014-1.733-2.782.616-3.369-1.37-3.369-1.37-.455-1.184-1.11-1.5-1.11-1.5-.907-.64.069-.627.069-.627 1.003.072 1.531 1.056 1.531 1.056.892 1.565 2.341 1.113 2.91.85.091-.67.349-1.113.635-1.369-2.22-.26-4.555-1.14-4.555-5.072 0-1.12.389-2.034 1.029-2.752-.103-.26-.446-1.309.098-2.728 0 0 .84-.276 2.75 1.05A9.25 9.25 0 0 1 12 6.994a9.25 9.25 0 0 1 2.504.35c1.909-1.326 2.748-1.05 2.748-1.05.546 1.419.203 2.468.1 2.728.64.718 1.028 1.632 1.028 2.752 0 3.942-2.338 4.809-4.566 5.064.359.316.679.94.679 1.894 0 1.367-.013 2.47-.013 2.807 0 .27.18.588.688.488A10.02 10.02 0 0 0 22 12.253C22 6.588 17.523 2 12 2Z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

function ProjectButton({
  href,
  children,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  ariaLabel: string
}) {
  return (
    <a
      href={href}
      data-cursor-label="open"
      className="inline-flex items-center gap-2 border border-black bg-white px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}

function StrapiIcon() {
  return (
    <svg aria-hidden viewBox="0 0 600 600" className="h-4 w-4" fill="currentColor">
      <path d="M0 208C0 109.948 0 60.9218 30.4609 30.4609C60.9218 0 109.948 0 208 0H392C490.052 0 539.078 0 569.539 30.4609C600 60.9218 600 109.948 600 208V392C600 490.052 600 539.078 569.539 569.539C539.078 600 490.052 600 392 600H208C109.948 600 60.9218 600 30.4609 569.539C0 539.078 0 490.052 0 392V208Z" />
      <path d="M414 182H212V285H315V388H418V186C418 183.791 416.209 182 414 182Z" fill="white" />
      <path d="M212 285H311C313.209 285 315 286.791 315 289V388H216C213.791 388 212 386.209 212 384V285Z" fill="white" opacity="0.65" />
      <path d="M315 388H418L318.414 487.586C317.154 488.846 315 487.953 315 486.172V388Z" fill="white" opacity="0.65" />
      <path d="M212 285H113.828C112.046 285 111.154 282.846 112.414 281.586L212 182V285Z" fill="white" opacity="0.65" />
    </svg>
  )
}

function PreviewInfoCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-col justify-center rounded-2xl border border-black bg-white px-4 py-4 sm:px-5 sm:py-5">
      <h3 className="inline-flex items-center gap-2 font-sans text-[16px] font-semibold leading-snug tracking-tight text-black sm:text-[18px]">
        {icon}
        {title}
      </h3>
      <div className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
        {children}
      </div>
    </div>
  )
}

function LanguageAccessPieCard() {
  const slices: PieSlice[] = [
    { label: 'Jamaica Plain (19.4%)', valuePct: 19.4, color: '#35a17d' },
    { label: 'West Roxbury (8.2%)', valuePct: 8.2, color: '#9ad3bd' },
    { label: 'Other / not Spanish at home', valuePct: 72.4, color: '#E5E7EB' },
  ]

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-2xl border border-black bg-white">
        <div className="flex min-h-[10.5rem] w-full flex-col items-center justify-center gap-4 bg-white px-6 py-6 sm:flex-row sm:items-center sm:gap-7">
          <div className="shrink-0">
            <PieChart slices={slices} />
          </div>
          <div className="min-w-0">
            <div className="text-center sm:text-left">
              <div className="font-sans text-base font-semibold tracking-tight text-black sm:text-lg">
                Spanish spoken at home<sup className="ml-0.5 font-mono text-[10px]">*</sup>
              </div>
            </div>
            <div className="mt-3 flex max-w-[16rem] flex-col items-start gap-2">
              {slices.map((s) => (
                <div key={s.label} className="flex items-start gap-2 text-left sm:items-center">
                  <span
                    aria-hidden
                    className="mt-0.5 h-2.5 w-2.5 shrink-0 border border-black sm:mt-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-mono text-[11px] leading-snug text-neutral-800">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="border-t border-black/20 px-4 py-2 font-mono text-[9px] italic leading-relaxed text-neutral-600 sm:px-5">
          * Spanish as a Language Spoken at Home (5 years+) from 2017-2021 American Community
          Survey.
        </p>
      </div>
    </figure>
  )
}

const insightCards = [
  {
    title: 'Residents needed one trustworthy place to start',
    direction:
      'Create a homepage that surfaces key links, events, newsletters, and resource discovery.',
    body: (
      <>
        District resources, newsletters, events, initiatives, and local organizations were{' '}
        <Highlight>spread across different channels</Highlight>. The visual system also needed to
        feel trustworthy and familiar enough for a civic context,{' '}
        <Highlight>not like a disconnected startup product</Highlight>.
      </>
    ),
  },
  {
    title: 'Search had to work beyond exact keywords',
    direction:
      'Build a searchable and filterable directory with semantic search support and map-based browsing.',
    body: (
      <>
        Residents may not know the official category name for what they need, so discovery needed
        to support <Highlight>keyword, category, and location-based paths</Highlight>.
      </>
    ),
  },
  {
    title: 'Language access mattered',
    direction:
      'Support English and Spanish across resource listings, filters, event details, and key navigation.',
    body: (
      <>
        Language access is tied to{' '}
        <Highlight>civic participation, healthcare, education, and housing stability</Highlight>{' '}
        across District 6 neighborhoods.
      </>
    ),
  },
  {
    title: 'Staff needed maintainability',
    direction:
      'Use Strapi as an admin dashboard for resources, events, initiatives, staff, statistics, and content.',
    body: (
      <>
        The Councilor’s office needed to <Highlight>keep content fresh after handoff</Highlight>{' '}
        without touching code.
      </>
    ),
  },
]

const architecture = [
  ['Resident frontend', 'Next.js mobile-first public web app with Google Translate API support'],
  ['Admin dashboard', 'Strapi CMS for staff-managed content'],
  ['Media + files', 'Cloudflare R2 for maps, documents, and uploaded assets'],
  ['Search layer', 'Nomic Embed Text V2 for multilingual semantic search'],
  ['Map layer', 'Leaflet.js for location browsing and clickable markers'],
  ['Events', 'Google Calendar API for district and citywide events'],
]

export function ProjectPitNe() {
  const projectTags = sampleProjects.find((p) => p.id === 'design-system')?.tags ?? []
  const [walkPhotoIndex, setWalkPhotoIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  const meta: MetaItem[] = [
    {
      label: 'My role',
      value: ['Software Engineering Intern', 'Tech Impact Fellow', 'Scrum Lead'],
    },
    {
      label: 'Skills/Tools',
      value: 'Next.js, Strapi, Cloudflare R2, Nomic Embed Text V2, Leaflet.js',
    },
    {
      label: 'Team',
      value: '1 product manager · 1 designer · 4 developers · District 6 staff + community partners',
    },
    { label: 'Timeline', value: '8 weeks' },
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
              District 6 Civic Resource Platform
            </h1>
            <div className="mt-4 flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:gap-8">
              <p className="min-w-0 max-w-4xl flex-1 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                I helped build a <strong className="font-bold text-black">mobile-first, bilingual civic resource app</strong>
                <img
                  src={d6Logo}
                  alt=""
                  aria-hidden
                  className="mx-1.5 inline-block h-[1.1em] w-[1.1em] shrink-0 -translate-y-px object-contain align-middle"
                  draggable={false}
                />
                for Boston City Council District 6,
                through the Public Interest Technology New England (PIT-NE) fellowship in partnership
                with Councilor Benjamin J. Weber’s office.
              </p>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <ProjectButton href={LIVE_URL} ariaLabel="Open deployed District 6 app">
                  <ExternalIcon />
                  Live site
                </ProjectButton>
                <ProjectButton href={GITHUB_URL} ariaLabel="Open District 6 GitHub repository">
                  <GitHubIcon />
                  GitHub
                </ProjectButton>
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
            <PrototypePreviewSectionHeader>Platform preview</PrototypePreviewSectionHeader>
            <div className="mt-4 grid gap-4">
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <div className="self-start overflow-hidden rounded-2xl border border-black bg-white">
                <ToggleGifCard
                  src={d6Preview1}
                  alt="District 6 resource platform preview"
                  aspectRatio="850 / 480"
                  fit="cover"
                  objectPosition="top"
                  className="block w-full cursor-none select-none"
                />
              </div>
              <div className="self-start overflow-hidden rounded-2xl border border-black bg-white">
                <ToggleGifCard
                  src={d6Preview2}
                  alt="District 6 map and resource browsing preview"
                  aspectRatio="850 / 480"
                  fit="cover"
                  objectPosition="top"
                  className="block w-full cursor-none select-none"
                />
              </div>

            </div>

            <div className="mx-auto grid w-fit gap-3 lg:grid-cols-[18rem_auto] lg:items-stretch">
              <div className="grid gap-3 lg:h-full lg:grid-rows-2">
                <PreviewInfoCard
                  title="For residents"
                  icon={<img src={d6Logo} alt="" aria-hidden className="h-4 w-4 object-contain" />}
                >
                  Search local resources · Explore nearby locations · See events · Follow district
                  updates · Share feedback
                </PreviewInfoCard>
                <PreviewInfoCard title="For council staff" icon={<StrapiIcon />}>
                  Add resources · Update events · Manage initiatives · Edit staff profiles · Review
                  statistics
                </PreviewInfoCard>
              </div>
              <div className="flex justify-center gap-3">
                <div className="w-52 overflow-hidden rounded-2xl border border-black bg-white">
                  <ToggleGifCard
                    src={d6Preview3}
                    alt="District 6 mobile preview: screen 1"
                    aspectRatio="448 / 756"
                    fit="contain"
                    objectPosition="top"
                    className="block w-full cursor-none select-none"
                  />
                </div>
                <div className="w-52 overflow-hidden rounded-2xl border border-black bg-white">
                  <ToggleGifCard
                    src={d6Preview4}
                    alt="District 6 mobile preview: screen 2"
                    aspectRatio="448 / 756"
                    fit="contain"
                    objectPosition="top"
                    className="block w-full cursor-none select-none"
                  />
                </div>
              </div>
            </div>
          </div>
          </PrototypePreviewProvider>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3">
            <SectionTitle>Motivation / challenge</SectionTitle>
            <div>
            <p className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
              Boston’s District 6 spans Jamaica Plain, Roslindale, and West Roxbury, where local
              support is often spread across different websites, newsletters, calendars, and office
              knowledge. The Councilor’s office needed one platform that could help residents find
              relevant resources while giving staff a sustainable way to keep content current after
              handoff.
            </p>
            <p className="mt-8 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
              <span className="font-semibold text-black">Design question:</span>{' '}
              <em>
                How might we turn scattered district information into a mobile-first tool that is
                easy to use, contribute to, and maintain?
              </em>
            </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>Staff input → product direction</SectionTitle>
          <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
            Our early conversations changed the product from a general resource directory into a
            district-specific civic tool shaped by how residents search, contribute, and access
            information.
          </p>
          <div className="mt-10 flex flex-col gap-14 lg:gap-16">
            {insightCards.map((insight, index) => (
              <div key={insight.title}>
                <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                  <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                    Insight {index + 1}:
                  </span>{' '}
                  <em>{insight.title}</em>
                </p>
                <p className="font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                  {insight.body}
                </p>
                {index === 0 ? (
                  <div className="mt-4">
                    <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.2fr)]">
                      <figure>
                        <div className="h-44 overflow-hidden rounded-xl border border-black bg-white">
                          <img
                            src={cityOfBostonSite}
                            alt="City of Boston website reference"
                            className="block h-full w-full select-none object-cover object-top"
                            draggable={false}
                          />
                        </div>
                        <figcaption className="mt-2 font-mono text-[11px] leading-relaxed text-neutral-700">
                          Civic reference:{' '}
                          <a
                            href="https://www.boston.gov/"
                            className="underline decoration-black/30 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
                            target="_blank"
                            rel="noreferrer"
                          >
                            City of Boston
                          </a>{' '}
                          digital patterns
                        </figcaption>
                      </figure>
                      <span className="hidden font-mono text-lg text-neutral-500 sm:block" aria-hidden>
                        +
                      </span>
                      <figure>
                        <div className="h-44 overflow-hidden rounded-xl border border-black bg-white">
                          <img
                            src={benWeberImg}
                            alt="Councilor Benjamin J. Weber website reference"
                            className="block h-full w-full select-none object-cover object-top"
                            draggable={false}
                          />
                        </div>
                        <figcaption className="mt-2 font-mono text-[11px] leading-relaxed text-neutral-700">
                          Local reference: Councilor Weber’s public presence
                        </figcaption>
                      </figure>
                      <span className="hidden font-mono text-lg text-neutral-500 sm:block" aria-hidden>
                        =
                      </span>
                      <figure>
                        <div className="h-44 overflow-hidden rounded-xl border border-black bg-white">
                          <img
                            src={d6StyleGuide}
                            alt="District 6 style guide"
                            className="block h-full w-full select-none object-cover object-top"
                            draggable={false}
                          />
                        </div>
                        <figcaption className="mt-2 font-mono text-[11px] font-semibold leading-relaxed text-black">
                          Distinct but familiar D6 style guide
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                ) : null}

                {index === 2 ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,0.52fr)_minmax(0,0.9fr)_minmax(0,0.95fr)]">
                    <button
                      type="button"
                      className="relative min-h-[11rem] overflow-hidden rounded-xl border border-black bg-white p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:min-h-full"
                      data-cursor-label="next photo"
                      aria-label={`Community walk photo ${walkPhotoIndex + 1} of ${D6_WALK_PHOTOS.length}. Show next.`}
                      onClick={() => setWalkPhotoIndex((i) => (i + 1) % D6_WALK_PHOTOS.length)}
                    >
                      <AnimatePresence initial={false} mode="wait">
                      <motion.img
                        key={D6_WALK_PHOTOS[walkPhotoIndex]}
                        src={D6_WALK_PHOTOS[walkPhotoIndex]}
                        alt={`Jamaica Plain community walk photo ${walkPhotoIndex + 1}`}
                        className="absolute inset-0 block h-full w-full select-none object-cover"
                        draggable={false}
                        initial={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, x: 28, filter: 'blur(4px)' }
                        }
                        animate={
                          reduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, x: 0, filter: 'blur(0px)' }
                        }
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, x: -28, filter: 'blur(4px)' }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0.12 }
                            : { type: 'spring', damping: 26, stiffness: 280, mass: 0.85 }
                        }
                      />
                      </AnimatePresence>
                      <span className="sr-only" aria-live="polite">
                        Showing community walk photo {walkPhotoIndex + 1} of {D6_WALK_PHOTOS.length}.
                      </span>
                    </button>
                    <div className="flex min-h-full flex-col justify-center rounded-xl border border-black bg-neutral-50 px-3 py-3 sm:px-4 sm:py-3.5">
                      <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                        Designing with, not just for
                      </p>
                      <p className="mt-2 font-mono text-[12px] leading-relaxed text-neutral-900 sm:text-[13px]">
                        Walking through Jamaica Plain with Melissa made the audience real. Her
                        examples showed how an English-only tool could quietly exclude older and
                        immigrant residents, including people like her own mother, who may need local
                        support most.
                      </p>
                    </div>
                    <LanguageAccessPieCard />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
            <div>
              <SectionTitle>Co-designing around resident journeys</SectionTitle>
              <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Community co-design workshops and journey mapping helped us see residents as both
                resource seekers and local knowledge holders. The “Linda” persona shaped two key
                flows: suggesting missing resources and sharing neighborhood feedback with the
                Councilor’s office.
              </p>
              <p className="mt-8 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="font-semibold text-black">Workshop takeaway:</span>{' '}
                <em>
                  Residents are not only resource consumers. They can also be resource contributors.
                </em>
              </p>
            </div>

            <div className="grid gap-3">
              <div className="overflow-hidden rounded-2xl border border-black bg-white">
                <img
                  src={userPersona}
                  alt="Workshop persona created for the District 6 resource platform"
                  className="block h-auto w-full select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-black bg-[#dbeee6] p-4 sm:p-5">
            <div className="grid gap-5 font-mono text-[13px] leading-relaxed text-neutral-800 sm:grid-cols-2 sm:text-sm lg:grid-cols-4">
              <div>
                <p className="font-semibold text-black">Goal:</p>
                <p>Grow her youth organization and connect it with more District 6 residents.</p>
              </div>
              <div>
                <p className="font-semibold text-black">Journey:</p>
                <p>Learn about the platform → Search for support → Submit a missing resource → Check back for updates</p>
              </div>
              <div>
                <p className="font-semibold text-black">Pain points:</p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>Hard to know where to submit a local resource</li>
                  <li>Existing directories may miss smaller community-led programs</li>
                  <li>Wants to feel heard by local representatives</li>
                </ol>
              </div>
              <div>
                <p className="font-semibold text-black">Product response:</p>
                <p>Resource submission form + Pulse Check feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>Technical architecture</SectionTitle>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {architecture.map(([label, detail]) => (
              <div key={label} className="border border-black bg-white px-4 py-4">
                <p className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                  {label}
                </p>
                <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                  {detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <img
              src={systemFlowMap}
              alt="System flow map for the District 6 resource platform"
              className="block h-auto w-full select-none"
              draggable={false}
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
                A{' '}
                <a
                  href={LIVE_URL}
                  className="underline decoration-black/30 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  live, deployed District 6 resource platform
                </a>{' '}
                with searchable resources, map-based browsing, events, district updates, bilingual
                access, resident feedback tools, and a Strapi admin dashboard for staff maintenance.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">What I learned:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Staff and community input changed how we organized the platform. I learned to take{' '}
                <Highlight>local knowledge seriously</Highlight> and treat{' '}
                <Highlight>maintenance as part of the design</Highlight>: resources only stay useful
                if staff can keep them current after handoff.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">Next steps:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Continue community testing, improve search relevance with real queries, expand
                Spanish content coverage, refine admin workflows, and hand off documentation for
                future Spark! teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
