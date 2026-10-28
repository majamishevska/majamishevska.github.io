import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { documents } from '../data/documents'
import { nameAscii } from '../data/ascii'

const LINKEDIN_URL = 'https://www.linkedin.com/in/maja-mishevska/'

const ease = { type: 'spring' as const, damping: 30, stiffness: 320 }

function CursorTerm({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <span className="pointer-events-auto inline-block" data-cursor-label={label}>
      <em>
        <u>{children}</u>
      </em>
    </span>
  )
}

export function Hero({ aboutExpanded = false, research = false }: { aboutExpanded?: boolean; research?: boolean }) {
  const bio = (
    <p className="min-w-0 max-w-none pr-0 lg:pr-4">
      {research
        ? 'I’m a senior at Brown University double majoring in Computer Science and Gender and Sexuality Studies.'
        : 'Originally from Macedonia, I’m a senior at Brown University double majoring in Computer Science (focusing on Design, Security, & Visual Computing) and Gender and Sexuality Studies.'}
      {research && (
        <>
          {' '}At Brown’s{' '}
          <a href="https://cntr.brown.edu/" target="_blank" rel="noreferrer" data-cursor-label="open" className="underline underline-offset-4">
            Center for Technological Responsibility, Reimagination, and Redesign (CNTR)
          </a>
          , I connect human–computer interaction with gender studies to examine whose experiences shape technology and whose are overlooked.
        </>
      )}
    </p>
  )
  const intro = (
    <p className="min-w-0 w-full text-left lg:text-right lg:justify-self-stretch">
      {research ? (
        <>
          I’m a research assistant in Professor{' '}
          <a href="https://dfreed.me/" target="_blank" rel="noreferrer" data-cursor-label="open" className="underline underline-offset-4">Diana Freed’s</a>{' '}
          Sociotechnical Systems and Wellbeing Research Lab (SWRL).{' '}
          I study{' '}
          <span className="bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">
            how AI shapes intimate experiences
          </span>
          , focusing on gender and young people’s privacy when safeguards fall short. I’m interested in how these experiences can inform the design of AI systems that better protect their users.
        </>
      ) : (
        <>
          I’m especially interested in the messy middle between{' '}
          <span className="bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">
            people, systems, and implementation
          </span>
          : figuring out what should be built, why it matters, and how to make it usable enough to last.
        </>
      )}
    </p>
  )
  return (
    <section className="relative border-b border-black bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

      <span
        id="about-me"
        className="pointer-events-none absolute left-0 top-0 block h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ease}
            className="relative min-w-0 max-w-3xl flex-1"
          >
            <div className={`relative ${research ? 'lg:w-[48rem] lg:max-w-[calc(100vw-5rem)]' : ''}`} style={{ zIndex: 1 }}>
              <p className="font-mono text-[11px] leading-snug text-neutral-700 sm:text-xs sm:leading-normal">

                CS + GNSS{' '}
                <span className="bg-[#e8e8e8] px-1.5 py-0.5 text-[10px] text-black sm:text-[11px]">
                  @ Brown ’27
                </span>
                {' '}
                · Former SDE Intern{' '}
                <span className="bg-[#e8e8e8] px-1.5 py-0.5 text-[10px] text-black sm:text-[11px]">
                  @ AWS
                </span>
              </p>

              <div className="relative mt-4 w-fit max-w-full">
                <h1 className="relative z-[2] font-sans text-[clamp(2.2rem,7vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-tight text-black">
                  Mishevska
                </h1>
                <div
                  data-cursor-label="/mai · uh/"
                  className="pointer-events-auto absolute left-[calc(100%-1.5rem)] top-[-0.35rem] z-0 block max-w-[min(14rem,52vw)] overflow-hidden sm:left-[calc(100%-1.75rem)] sm:top-[-0.65rem] sm:max-w-[min(18rem,48vw)] lg:hidden"
                >
                  <pre
                    aria-hidden
                    className="pointer-events-none m-0 select-none whitespace-pre p-0 font-mono text-[3.2px] leading-[1.05] text-[#74805f] sm:text-[4.8px]"
                  >
                    {nameAscii}
                  </pre>
                </div>
              </div>

              <div
                data-cursor-label="/mai · uh/"
                className="pointer-events-auto absolute right-0 top-0 z-0 hidden max-w-[min(21.25rem,40vw)] -translate-x-16 overflow-hidden lg:block"
              >
                <pre
                  aria-hidden
                  className="pointer-events-none m-0 select-none whitespace-pre p-0 font-mono text-[8px] leading-[1.05] text-[#74805f]"
                >
                  {nameAscii}
                </pre>
              </div>

              {!research && <p className="pointer-events-none relative z-[2] mt-5 max-w-lg font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm">
                Building accessible, socially meaningful technology across{' '}
                <CursorTerm label="building">software engineering</CursorTerm>,{' '}
                <CursorTerm label="studying">HCI research</CursorTerm>, and{' '}
                <CursorTerm label="shaping">product design</CursorTerm>.
              </p>}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...ease, delay: 0.05 }}
            className={`flex shrink-0 gap-3 sm:gap-4 ${research ? 'flex-col items-start lg:w-[calc(50%-1.5rem)] lg:items-end' : 'flex-wrap items-center lg:flex-col lg:items-end lg:gap-4'}`}
            aria-label="Contact links"
          >
            <div className={research ? 'flex flex-wrap items-center gap-3 sm:gap-4 lg:justify-end' : 'contents'}>
              <a
                href={documents.resumePdf}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="open"
                aria-label="Open resume PDF in a new tab"
                className="inline-flex border border-black bg-white px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
              >
                Resume
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="open"
                className="inline-flex h-7 w-7 items-center justify-center border border-black text-black"
                aria-label="LinkedIn"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
              </a>
              <a
                href="https://github.com/majamishevska"
                target="_blank"
                rel="noreferrer"
                data-cursor-label="open"
                className="inline-flex h-7 w-7 items-center justify-center border border-black text-black"
                aria-label="GitHub"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.53 2.865 8.373 6.839 9.729.5.095.682-.22.682-.489 0-.242-.009-.883-.014-1.733-2.782.616-3.369-1.37-3.369-1.37-.455-1.184-1.11-1.5-1.11-1.5-.907-.64.069-.627.069-.627 1.003.072 1.531 1.056 1.531 1.056.892 1.565 2.341 1.113 2.91.85.091-.67.349-1.113.635-1.369-2.22-.26-4.555-1.14-4.555-5.072 0-1.12.389-2.034 1.029-2.752-.103-.26-.446-1.309.098-2.728 0 0 .84-.276 2.75 1.05A9.25 9.25 0 0 1 12 6.994a9.25 9.25 0 0 1 2.504.35c1.909-1.326 2.748-1.05 2.748-1.05.546 1.419.203 2.468.1 2.728.64.718 1.028 1.632 1.028 2.752 0 3.942-2.338 4.809-4.566 5.064.359.316.679.94.679 1.894 0 1.367-.013 2.47-.013 2.807 0 .27.18.588.688.488A10.02 10.02 0 0 0 22 12.253C22 6.588 17.523 2 12 2Z" />
                </svg>
              </a>
              <a
                href="mailto:maja_mishevska@brown.edu"
                data-cursor-label="open"
                className="inline-flex h-7 w-7 items-center justify-center border border-black text-black"
                aria-label="Email"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="2.5" y="4.5" width="19" height="15" />
                  <path d="M2.5 6.5 12 13.5l9.5-7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {research ? (
          <div className="relative z-[2] mt-5 grid items-start gap-6 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm lg:grid-cols-2 lg:gap-12">
            {bio}
            {intro}
          </div>
        ) : aboutExpanded && (
          <div className="grid items-start gap-6 pt-8 font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm lg:grid-cols-2 lg:gap-x-12">
            {bio}
            {intro}
          </div>
        )}
      </div>
    </section>
  )
}
