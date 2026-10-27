import { motion } from 'framer-motion'
import { sampleProjects } from '../data/projects'
import image2glyphPreview from '../assets/subprojects/image2glyph/image2glyph-preview.png'
import impactAfghanistanPreview from '../assets/subprojects/impactafghanistan/ia-preview.png'
import manifoldMachinesPreview from '../assets/subprojects/manifoldmachines/manifold-machines-preview.png'

import aiGenderBasedHarmsPreview from '../assets/subprojects/aigenderbasedharms/conference-preview.jpeg'
import cntrAislePreview from '../assets/subprojects/recent/cntr-aisle.webp'
import srcHandbookPreview from '../assets/subprojects/recent/src-handbook.webp'
import postpartumAiPreview from '../assets/subprojects/recent/postpartum-ai.webp'
import nciiEcosystemPreview from '../assets/subprojects/recent/ncii-ecosystem.webp'
import { ProjectCard } from './ProjectCard'

type AdditionalProjectCard = {
  title: string
  year: string
  tags: string[]
  href?: string
  cursorLabel?: string
  image?: string
  imageClassName?: string
  heightClass?: string
}

const additionalProjectCards: AdditionalProjectCard[] = [
  {
    title: 'NCII Ecosystem',
    year: '2026',
    tags: ['TECH-FACILITATED ABUSE', 'VISUALIZATION', 'UI/UX'],
    href: 'https://ncii-ecosystem.org/',
    image: nciiEcosystemPreview,
    imageClassName: 'aspect-[5/3] object-cover object-top',
  },
  {
    title: 'Socially Responsible Computing Handbook',
    year: '2026',
    tags: ['DEVELOPMENT', 'PRODUCT RESEARCH', 'UI/UX'],
    href: 'https://srch.cs.brown.edu/',
    image: srcHandbookPreview,
    imageClassName: 'aspect-[5/3] object-cover object-top',
  },
  {
    title: 'Rethinking How We Evaluate Postpartum AI',
    year: '2026',
    tags: ['CSCW', 'AI RESEARCH'],
    href: 'https://cs.brown.edu/news/2026/10/16/strong-representation-at-cscw-shows-brown-cs-impact-in-social-computing-and-human-computer-interaction/',
    image: postpartumAiPreview,
  },
  {
    title: 'CNTR AISLE',
    year: '2026',
    tags: ['RESEARCH', 'AI LAW', 'POLICY'],
    href: 'https://www.cntr-aisle.org/',
    image: cntrAislePreview,
  },
  {
    title: 'image2glyph',
    year: '2026',
    tags: ['WEB APP', 'EXPERIMENTATION'],
    href: 'https://majamishevska.github.io/image2glyph/',
    image: image2glyphPreview,
    heightClass: '',
  },
  {
    title: 'Impact Afghanistan',
    year: '2026',
    tags: ['UN PARTNERSHIP', 'FRONTEND', 'AI RESEARCH'],
    href: 'https://impactafghanistan.brown.edu/',
    image: impactAfghanistanPreview,
    imageClassName: 'aspect-[4/3] object-cover object-top',
    heightClass: '',
  },
  {
    title: 'Multimodal Macedonian LLM',
    year: '2025–2026',
    tags: ['AI RESEARCH', 'LOW-RESOURCE LANGUAGES'],
    href: 'https://manifold.mk/',
    cursorLabel: 'open source soon',
    image: manifoldMachinesPreview,
    heightClass: '',
  },
  {
    title: 'AI & Gender-Based Harms Conference',
    year: '2026',
    tags: ['TECH-FACILITATED ABUSE', 'CONFERENCE', 'POLICY'],
    href: 'https://cs.brown.edu/news/2026/07/14/diana-freed-co-founds-the-inaugural-ai-gender-based-harms-implications-for-policy-and-practice-conference/',
    image: aiGenderBasedHarmsPreview,
    heightClass: '',
  },

]

const additionalProjectColumns = Array.from({ length: 3 }, (_, column) =>
  additionalProjectCards.filter((_, index) => index % 3 === column),
)

const additionalProjectTabletColumns = Array.from({ length: 2 }, (_, column) =>
  additionalProjectCards.filter((_, index) => index % 2 === column),
)

export function Projects() {
  const renderAdditionalProjectCard = (
    project: (typeof additionalProjectCards)[number],
    index: number,
  ) => {
    const hasImage = Boolean(project.image)
    const cardContent = (
      <>
        {hasImage ? (
          <img
            src={project.image}
            alt=""
            className={`block h-auto w-full transition duration-300 group-hover:scale-[1.03] group-focus-within:scale-[1.03] ${project.imageClassName ?? ''}`}
            loading="lazy"
          />
        ) : null}
        {hasImage ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/90 via-white/45 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
        ) : null}
        <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="relative rounded-full border border-black bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-900"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className={`pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-4 ${hasImage ? '-translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100' : ''}`}>
          <span className="min-w-0 font-sans text-base font-semibold leading-tight tracking-tight text-black sm:text-lg">
            {project.title}
          </span>

        </div>
      </>
    )
    const cardClassName = `group relative flex break-inside-avoid flex-col justify-between overflow-hidden rounded-2xl border border-black bg-neutral-100 ${hasImage ? 'p-0' : `p-4 ${project.heightClass ?? 'min-h-[14rem]'}`}`

    return project.href ? (
      <motion.a
        key={project.title}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        data-cursor-label={project.cursorLabel ?? 'open'}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', damping: 34, stiffness: 360, delay: index * 0.03 }}
        className={`${cardClassName} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
      >
        {cardContent}
      </motion.a>
    ) : (
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', damping: 34, stiffness: 360, delay: index * 0.03 }}
        className={cardClassName}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <section
      id="projects"
      className="bg-white px-5 py-8 sm:px-8 sm:py-12 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8">
          {sampleProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', damping: 34, stiffness: 360 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 space-y-5 sm:hidden">
          {additionalProjectCards.map(renderAdditionalProjectCard)}
        </div>
        <div className="mt-14 hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden">
          {additionalProjectTabletColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-5">
              {column.map((project, index) => (
                renderAdditionalProjectCard(project, columnIndex + index)
              ))}
            </div>
          ))}
        </div>
        <div className="mt-14 hidden gap-5 lg:grid lg:grid-cols-3">
          {additionalProjectColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-5">
              {column.map((project, index) => (
                renderAdditionalProjectCard(project, columnIndex + index)
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
