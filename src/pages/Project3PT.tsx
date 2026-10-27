import { PieChart, type PieSlice } from '../components/PieChart'
import type { ReactNode } from 'react'
import { ArrowLeftRight, PenLine, ShieldCheck } from 'lucide-react'
import threePtMonoLogo from '../assets/case-study/3pt/case-study/3pt-mono-logo.svg'
import appleHealthLogo from '../assets/case-study/3pt/case-study/apple-health-logo.svg'
import floAppLogo from '../assets/case-study/3pt/case-study/flo-logo.svg'
import clueAppLogo from '../assets/case-study/3pt/case-study/clue-logo.svg'
import threePtContext from '../assets/case-study/3pt/case-study/3pt-context.png'
import { ToggleGifCard } from '../components/ToggleGifCard'
import { PrototypePreviewProvider } from '../components/PrototypePreviewContext'
import { PrototypePreviewSectionHeader } from '../components/PrototypePreviewSectionHeader'
import { sampleProjects } from '../data/projects'
import overleafLogo from '../assets/overleaf-o-logo-black.svg'
import threePtResearchPaperPdf from '../assets/case-study/3pt/case-study/3PT- Privacy Perserving Period Tracker.pdf'
import importFlow1 from '../assets/case-study/3pt/case-study/screenshots/flow-1.png'
import importFlow2 from '../assets/case-study/3pt/case-study/screenshots/flow-2.png'
import importFlow3 from '../assets/case-study/3pt/case-study/screenshots/flow-3.png'
import finalScreen1 from '../assets/case-study/3pt/case-study/screenshots/final-1.png'
import finalScreen2 from '../assets/case-study/3pt/case-study/screenshots/final-2.png'
import finalScreen3 from '../assets/case-study/3pt/case-study/screenshots/final-3.png'
import finalScreen4 from '../assets/case-study/3pt/case-study/screenshots/final-4.png'
import finalScreen5 from '../assets/case-study/3pt/case-study/screenshots/final-5.png'
import prototypePreviewGif1 from '../assets/case-study/3pt/case-study/screenshots/prototype-1.gif'
import prototypePreviewGif2 from '../assets/case-study/3pt/case-study/screenshots/prototype-2.gif'
import prototypePreviewGif3 from '../assets/case-study/3pt/case-study/screenshots/prototype-3.gif'

const FINAL_PROTOTYPE_SCREEN_GRID: { src: string; alt: string }[] = [
  { src: finalScreen1, alt: '3PT final prototype: screen 1' },
  { src: finalScreen2, alt: '3PT final prototype: screen 2' },
  { src: finalScreen3, alt: '3PT final prototype: screen 3' },
  { src: finalScreen4, alt: '3PT final prototype: screen 4' },
  { src: finalScreen5, alt: '3PT final prototype: screen 5' },
]

const PROTOTYPE_PREVIEW_SCREENS: { src: string; alt: string }[] = [
  { src: prototypePreviewGif1, alt: '3PT prototype preview: screen 1' },
  { src: prototypePreviewGif2, alt: '3PT prototype preview: screen 2' },
  { src: prototypePreviewGif3, alt: '3PT prototype preview: screen 3' },
]

type MetaItem = {
  label: string
  value: string | string[]
}

function Highlight({ children }: { children: string }) {
  return (
    <span className="bg-[#4ba4f0]/25 px-1.5 py-0.5 font-medium text-black">
      {children}
    </span>
  )
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

function BeforeAfterPair({
  title,
  beforeLabel,
  before,
  afterLabel,
  after,
}: {
  title: string
  beforeLabel: string
  before: string
  afterLabel: string
  after: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black bg-white">
      <div className="border-b border-black/20 px-4 py-3 sm:px-5">
        <h3 className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
          {title}
        </h3>
      </div>
      <div className="grid divide-y divide-black/20 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="px-4 py-4 sm:px-5 sm:py-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
            {beforeLabel}
          </p>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
            {before}
          </p>
        </div>
        <div className="bg-neutral-50 px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex items-center gap-2">
            <img
              src={threePtMonoLogo}
              alt=""
              aria-hidden
              className="h-[1.125rem] w-[1.125rem] shrink-0 select-none object-contain sm:h-5 sm:w-5"
              draggable={false}
            />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
              {afterLabel}
            </span>
          </div>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-900 sm:text-sm">
            {after}
          </p>
        </div>
      </div>
    </div>
  )
}

function PieChartCard({
  title,
  caption,
  slices,
}: {
  title: string
  caption?: string
  slices: PieSlice[]
}) {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-2xl border border-black bg-white">
        <div className="flex min-h-[10.5rem] w-full flex-col items-center justify-center gap-3 bg-white px-6 py-6">
          <PieChart slices={slices} />
          <div className="text-center">
            <div className="font-sans text-base font-semibold tracking-tight text-black sm:text-lg">
              {title}
            </div>
          </div>
          <div className="mt-1 flex max-w-[16rem] flex-col items-start gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4">
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
      {caption ? (
        <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-neutral-700 sm:text-[13px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function AppIconImg({ src, className = '' }: { src: string; className?: string }) {
  return (
    <span
      className={`inline-flex size-[1.5cap] shrink-0 items-center justify-center [font-size:inherit] ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="max-h-full max-w-full object-contain"
      />
    </span>
  )
}

function CalendarAppGlyph({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-[1.5cap] shrink-0 items-center justify-center [font-size:inherit] ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="max-h-full max-w-full"
      >
        <rect
          x="3.5"
          y="5"
          width="17"
          height="15"
          rx="2"
          className="stroke-neutral-800"
          strokeWidth="1.5"
        />
        <path className="stroke-neutral-800" strokeWidth="1.5" strokeLinecap="round" d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
      </svg>
    </span>
  )
}

function InsightEvidenceCard({
  label,
  pct,
  count,
  titleAddon,
}: {
  label: string | ReactNode
  pct: string
  count: string

  titleAddon?: ReactNode
}) {
  const isStringLabel = typeof label === 'string'
  const hasAddon = titleAddon != null && titleAddon !== false

  const titleClass =
    'font-sans text-[13px] font-semibold leading-snug text-black sm:text-sm' +
    (hasAddon && isStringLabel
      ? ' flex items-center gap-1.5'
      : !isStringLabel
        ? ' flex flex-wrap items-center gap-x-1.5 gap-y-1'
        : '')

  return (
    <div className="rounded-xl border border-black bg-white px-3 py-2.5 sm:px-4 sm:py-3">
      <p className={titleClass}>
        {hasAddon && isStringLabel ? (
          <>
            <span className="inline-flex shrink-0 items-center">{titleAddon}</span>
            <span className="min-w-0 leading-snug">{label}</span>
          </>
        ) : (
          label
        )}
      </p>
      <p className="mt-1 font-mono text-[11px] leading-relaxed text-neutral-800 sm:text-[12px]">
        {pct} ({count})
      </p>
    </div>
  )
}

function InsightQuoteCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <blockquote
      className={`rounded-xl border border-black bg-neutral-50 px-3 py-3 sm:px-4 sm:py-3.5 ${className}`}
    >
      <p className="font-mono text-[12px] leading-relaxed text-neutral-900 sm:text-[13px]">
        “{children}”
      </p>
    </blockquote>
  )
}

function FlowStepArrow({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-neutral-400 ${className}`}
      aria-hidden
    >
      <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  )
}

export function Project3PT() {
  const projectTags =
    sampleProjects.find((p) => p.id === 'privacy-period-tracker')?.tags ?? []

  const meta: MetaItem[] = [
    {
      label: 'My role',
      value: 'Product research, user-experience (UX) design, frontend implementation',
    },
    { label: 'Skills/Tools', value: 'Figma, React Native / Expo, Survey Research, GitHub' },
    { label: 'Team', value: '2 student designers/developers' },
    { label: 'Timeline', value: '2 months' },
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
              3PT
            </h1>
            <div className="mt-4 flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 lg:gap-8">
              <p className="min-w-0 max-w-4xl flex-1 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                I worked on <strong className="font-bold text-black">3PT</strong>{' '}
                <img
                  src={threePtMonoLogo}
                  alt=""
                  aria-hidden
                  className="mr-1 inline-block h-[1.1em] w-[1.1em] shrink-0 -translate-y-px object-contain align-middle"
                  draggable={false}
                />
                , a local-first period tracker for people who rely on cycle history to manage their health and want clearer control over where their reproductive health data lives.
              </p>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <a
                  href="https://github.com/majamishevska/3pt"
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
                  href={threePtResearchPaperPdf}
                  data-cursor-label="open"
                  className="inline-flex items-center gap-2 border border-black bg-white px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open research paper"
                >
                  <img
                    src={overleafLogo}
                    alt=""
                    aria-hidden
                    className="h-3.5 w-3.5"
                    draggable={false}
                  />
                  Research paper
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
            <div className="mx-auto mt-3 w-full max-w-2xl md:max-w-3xl">
              <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-3 sm:gap-5 md:gap-6 lg:gap-8">
                {PROTOTYPE_PREVIEW_SCREENS.map((item) => (
                  <div
                    key={item.src}
                    className="w-full min-w-0 max-w-[11.75rem] overflow-hidden rounded-2xl bg-white sm:max-w-none"
                  >
                    <ToggleGifCard
                      src={item.src}
                      alt={item.alt}
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
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <SectionTitle>Motivation / problem space</SectionTitle>
              <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Period trackers are useful because they help people remember, plan, notice symptoms, and
                advocate for themselves medically. But the same log can reveal pregnancy status,
                fertility patterns, sexual activity, medications, and other intimate bodily information.
              </p>
              <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                In the post-<em>Dobbs</em> U.S. context, reproductive health data is hard to treat as ordinary
                wellness data. Once it leaves the user's device, it can become part of systems users do not
                see or control.
              </p>
              <p className="mt-8 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="font-semibold text-black">Design question:</span>{' '}
                <em>
                  How might we preserve the usefulness of tracking without making users depend on a
                  distant platform?
                </em>
              </p>
            </div>
            <figure className="w-full">
              <div className="overflow-hidden rounded-2xl border border-black bg-white">
                <img
                  src={threePtContext}
                  alt="News collage on period-tracking privacy, health data, and platform trust"
                  className="block h-auto w-full select-none object-cover"
                  draggable={false}
                />
              </div>
              <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-neutral-700 sm:text-[13px]">
                Privacy concerns around period tracking are not hypothetical.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>What do users think?</SectionTitle>

          <div className="mt-3 flex flex-col gap-14 lg:gap-16">
            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 1:
                </span>{' '}
                <em>Privacy concern did not mean users could simply leave.</em>
              </p>
              <p className="mb-4 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Concern was widespread and worry about hidden sharing was even higher—but most people still
                used health apps when the log anchored memory, patterns, and care.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <PieChartCard
                  title="Worried data could be shared without their knowledge"
                  slices={[
                    {
                      label: 'Yes (73.7%, 28/38)',
                      valuePct: 73.7,
                      color: '#4ba4f0',
                    },
                    {
                      label: 'No (26.3%, 10/38)',
                      valuePct: 26.3,
                      color: '#E5E7EB',
                    },
                  ]}
                />
                <InsightQuoteCard className="flex min-h-[10.5rem] items-center">
                  Though I wish I could stop using period tracking apps because of privacy concerns, I have
                  had irregular and intense periods since I was 10 [...] Having all my data stored in one
                  place is important for me to be able to{' '}
                  <Highlight>
                    understand patterns, spot irregularities, and advocate for myself
                  </Highlight>{' '}
                  at doctors&apos; appointments.
                </InsightQuoteCard>
                <PieChartCard
                  title="Still use health apps despite privacy concerns"
                  slices={[
                    {
                      label: 'Yes (65.8%, 25/38)',
                      valuePct: 65.8,
                      color: '#4ba4f0',
                    },
                    {
                      label: 'No (34.2%, 13/38)',
                      valuePct: 34.2,
                      color: '#E5E7EB',
                    },
                  ]}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 2:
                </span>{' '}
                <em>Trust broke when apps felt extractive.</em>
              </p>
              <p className="mb-4 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Respondents did not treat period data like{' '}
                <Highlight>ordinary wellness data</Highlight>. For people who switched or stopped using a
                period tracker, the issue was not just &ldquo;privacy&rdquo; in the abstract — it was the
                feeling that intimate health data could be{' '}
                <Highlight>collected, monetized, or misused</Highlight> without enough transparency or
                control.
              </p>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
                <InsightEvidenceCard label="Data concerns" pct="40.9%" count="9/22" />
                <InsightEvidenceCard label="Too many ads" pct="31.8%" count="7/22" />
                <InsightEvidenceCard
                  label="Legal/cultural climate concerns"
                  pct="27.3%"
                  count="6/22"
                />
                <InsightEvidenceCard
                  label="Unreliable or inaccurate app"
                  pct="22.7%"
                  count="5/22"
                />
              </div>
              <div className="mt-3">
                <InsightQuoteCard>
                  In general, I am disturbed that my personal health data might be sold to other companies;
                  I don&apos;t know what use they have for that data, but I{' '}
                  <Highlight>don&apos;t trust that it is well-intentioned</Highlight>.
                </InsightQuoteCard>
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[15px] leading-snug text-neutral-800 sm:text-[17px]">
                <span className="text-[15px] font-semibold text-black not-italic sm:text-[17px]">
                  Insight 3:
                </span>{' '}
                <em>Privacy-first design also had to solve lock-in.</em>
              </p>
              <p className="mb-4 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                <em>Flo</em> and <em>Clue</em> were the most-used apps in our sample. Respondents had used
                the same app for an average of <Highlight>2.5 years</Highlight>. Without reliable export
                support, switching meant risking years of personal health history.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
                <div className="grid grid-cols-1 gap-3 sm:w-[min(100%,38rem)] sm:shrink-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(15rem,1.72fr)]">
                  <InsightEvidenceCard
                    label="Flo"
                    pct="58.1%"
                    count="18/31"
                    titleAddon={<AppIconImg src={floAppLogo} />}
                  />
                  <InsightEvidenceCard
                    label="Clue"
                    pct="29.0%"
                    count="9/31"
                    titleAddon={<AppIconImg src={clueAppLogo} />}
                  />
                  <InsightEvidenceCard
                    label={
                      <>
                        <span className="inline-flex items-center gap-1">
                          <AppIconImg src={appleHealthLogo} />
                          Apple Health
                        </span>
                        <span className="font-normal text-neutral-500">+</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarAppGlyph />
                          My Calendar
                        </span>
                      </>
                    }
                    pct="25.0%"
                    count="8/32 · 4 each"
                  />
                </div>
                <div className="min-w-0 flex-1 sm:flex sm:min-h-0 sm:flex-col">
                  <InsightQuoteCard>
                    I tried to switch once, but I had to go through support to get my data, and I&apos;m
                    pretty sure <Highlight>I never got it</Highlight>.
                  </InsightQuoteCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>Design decisions</SectionTitle>
          <div className="mt-6 grid gap-14 lg:gap-16">
            <BeforeAfterPair
              title="1. Remove identity and cloud dependency before logging"
              beforeLabel="Typical pattern"
              before="Create an account, verify email, or link a profile before logging anything — then store or sync sensitive health data through a cloud backend."
              afterLabel="3PT"
              after="Users can start tracking without signup, email, or an identity-linked profile. Cycle history stays local on the device by default, with no cloud server treated as the source of truth."
            />
            <BeforeAfterPair
              title="2. Make control concrete: import, export + delete"
              beforeLabel="Typical pattern"
              before="Data accumulates inside one vendor’s system, while import, export, and deletion are buried, delayed, or unclear — making it hard to leave without losing history."
              afterLabel="3PT"
              after="Users can import existing records, export their history as JSON, CSV, or PDF, and delete locally stored data directly in the app. Portability becomes part of privacy, not an afterthought."
            />
            <BeforeAfterPair
              title="3. Avoid fertility-first and overly gendered assumptions"
              beforeLabel="Typical pattern"
              before="Apps often center pregnancy, fertility, &ldquo;normal cycle&rdquo; baselines, and overly feminine language or visuals — even when someone only wants to track symptoms, dates, pain, or irregularity."
              afterLabel="3PT"
              after="Irregular cycles mode, pregnancy-insights toggle, and neutral copy let users track symptoms or dates without being pushed into one reproductive narrative or gendered idea of who the app is for."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div className="lg:order-1">
              <SectionTitle>Final prototype</SectionTitle>

              <p className="mt-3 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                The prototype is organized around three user goals:
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                    <PenLine className="h-[1.05em] w-[1.05em]" aria-hidden />
                    Track
                  </p>
                  <p className="mt-1 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                    Log period ranges, flow, symptoms, mood, and notes without creating an account.
                  </p>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                    <ShieldCheck className="h-[1.05em] w-[1.05em]" aria-hidden />
                    Understand
                  </p>
                  <p className="mt-1 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                    Use plain-language privacy screens to see where data lives, how predictions work, and
                    what the app does not collect.
                  </p>
                </div>
                <div>
                  <p className="inline-flex items-center gap-2 font-sans text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-[17px]">
                    <ArrowLeftRight className="h-[1.05em] w-[1.05em]" aria-hidden />
                    Control
                  </p>
                  <p className="mt-1 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                    Import, export, or delete cycle history so privacy does not depend on being locked into
                    one app.
                  </p>
                </div>
              </div>
            </div>

            <figure className="min-w-0 lg:order-2 lg:mt-0">
              <div className="mx-auto flex max-w-[22rem] flex-row items-center justify-center gap-0.5 overflow-visible py-0.5 sm:max-w-none sm:gap-1 md:gap-1.5 lg:gap-2">
                <div className="min-w-0 flex-1 basis-0">
                  <div className="overflow-hidden rounded-2xl border border-black bg-white">
                    <img
                      src={importFlow1}
                      alt="3PT import flow: step 1 of 3"
                      className="block h-auto w-full select-none object-contain object-top"
                      draggable={false}
                    />
                  </div>
                </div>
                <div className="flex shrink-0 items-center self-center" aria-hidden>
                  <FlowStepArrow className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1 basis-0">
                  <div className="overflow-hidden rounded-2xl border border-black bg-white">
                    <img
                      src={importFlow2}
                      alt="3PT import flow: step 2 of 3"
                      className="block h-auto w-full select-none object-contain object-top"
                      draggable={false}
                    />
                  </div>
                </div>
                <div className="flex shrink-0 items-center self-center" aria-hidden>
                  <FlowStepArrow className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1 basis-0">
                  <div className="overflow-hidden rounded-2xl border border-black bg-white">
                    <img
                      src={importFlow3}
                      alt="3PT import flow: step 3 of 3"
                      className="block h-auto w-full select-none object-contain object-top"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </figure>
          </div>

          <div className="mt-10">
            <div className="mx-auto grid w-fit grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
              {FINAL_PROTOTYPE_SCREEN_GRID.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="min-w-0 overflow-hidden rounded-2xl border border-black bg-white"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="block h-auto w-full select-none object-contain object-top"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
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
                A working, open-source prototype with no required account, local-first storage,
                plain-language privacy explanations, import/export, and delete-all controls. It’s on{' '}
                <a
                  href="https://github.com/majamishevska/3pt"
                  className="underline decoration-black/30 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">What I learned:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                People were not choosing convenience because they did not care about privacy. They were
                choosing the tools available to them. A better privacy-first product has to respect that
                reality: it should reduce risk without asking users to lose their history, their routines,
                or the practical value of tracking.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] font-semibold text-black sm:text-sm">Next steps:</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                I would test imports with real app exports, run more sessions with irregular-cycle users,
                explore stronger on-device encryption, and consider optical character recognition (OCR)
                and computer vision (CV) for import flows (e.g.
                turning screenshots or PDFs into usable cycle history) to make export from other apps more
                viable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
