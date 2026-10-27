import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { Project } from '../data/projects'
import d6Laptopshot from '../assets/case-study/d6/d6-laptopshot.png'
import bryteShot from '../assets/subprojects/bryte/bryte-shot.png'
import { BryteGifCanvas } from './BryteGifCanvas'
import lunarLaptopshotLight from '../assets/case-study/lunar/hifi/lunar-laptopshot-light.webp'
import lunarLaptopshotDark from '../assets/case-study/lunar/hifi/lunar-laptopshot-dark.webp'
import threePtShot1 from '../assets/case-study/3pt/card/3pt-shot1.png'
import threePtShot2 from '../assets/case-study/3pt/card/3pt-shot2.png'
import utraLaptopshot from '../assets/case-study/utra/utra-laptopshot.png'
import utraPhoneshot from '../assets/case-study/utra/utra-phoneshot.png'

type Props = {
  project: Project
  showTags?: boolean
}

export function ProjectCard({ project, showTags = true }: Props) {
  const reduce = useReducedMotion()
  const [bryteHover, setBryteHover] = useState(false)
  const t = reduce ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }
  const isPlaceholder = project.placeholder === true
  const isUtra = project.id === 'maps-experiment'
  const isD6 = project.id === 'design-system'
  const isLunar = project.id === 'health-companion'
  const isBryte = project.id === 'bryte-redesign'
  const is3pt = project.id === 'privacy-period-tracker'
  const isExternal = !isPlaceholder && project.href.startsWith('http')

  const frameClass =
    'group block ' +
    (isPlaceholder
      ? 'cursor-default'
      : 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black')

  const inner = (
    <>
      <div className={`overflow-hidden rounded-2xl border border-black ${isUtra ? 'bg-[#3d8a97]' : 'bg-neutral-100'}`}>
        {!isUtra ? (
          <motion.div
            className="relative aspect-[16/11] w-full overflow-hidden"
            style={{ backgroundColor: project.bgColor ?? undefined }}
            whileHover={
              reduce || isPlaceholder || is3pt ? undefined : { scale: 1.01 }
            }
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {isPlaceholder ? (
              <div
                className="absolute inset-0 flex items-center justify-center border border-dashed border-neutral-400 bg-[#f0f0f0]"
                aria-hidden
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                  To be added
                </span>
              </div>
            ) : isLunar ? (
              <div className="absolute inset-0">
                <motion.img
                  src={lunarLaptopshotLight}
                  alt=""
                  aria-hidden
                  className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 select-none"
                  draggable={false}
                  variants={{
                    rest: { opacity: 1 },
                    hover: { opacity: 0 },
                  }}
                  transition={t}
                />
                <motion.img
                  src={lunarLaptopshotDark}
                  alt=""
                  aria-hidden
                  className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 select-none"
                  draggable={false}
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                  transition={t}
                />
              </div>
            ) : is3pt ? (
              <div className="absolute inset-0">

                <motion.div
                  className="pointer-events-none absolute bottom-[6%] left-[5%] z-[1] w-[40%]"
                  variants={{
                    rest: { x: 0, scale: 1 },
                    hover: reduce ? { x: 0, scale: 1 } : { x: 6, scale: 1.01 },
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring' as const, damping: 28, stiffness: 340 }
                  }
                >
                  <img
                    src={threePtShot1}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="block h-auto w-full translate-y-[26%] select-none object-contain"
                  />
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute left-[52%] top-[6%] z-[2] w-[40%]"
                  variants={{
                    rest: { x: 0, scale: 1 },
                    hover: reduce ? { x: 0, scale: 1 } : { x: -6, scale: 1.01 },
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring' as const, damping: 28, stiffness: 340 }
                  }
                >
                  <img
                    src={threePtShot2}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="block h-auto w-full -translate-y-[26%] select-none object-contain"
                  />
                </motion.div>
              </div>
            ) : isBryte ? (
              <div
                className="absolute inset-0"
                onPointerEnter={() => setBryteHover(true)}
                onPointerLeave={() => setBryteHover(false)}
              >

                <motion.div
                  className="pointer-events-none absolute left-1/2 top-[43%] w-[78%] max-w-[78%] max-h-[86%] -translate-x-1/2 -translate-y-1/2"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.01 },
                  }}
                  transition={{
                    scale: reduce
                      ? { duration: 0 }
                      : { type: 'spring' as const, damping: 26, stiffness: 320 },
                  }}
                >
                  <div className="relative w-full">
                    <motion.img
                      src={bryteShot}
                      alt=""
                      aria-hidden
                      draggable={false}
                      className="relative z-0 block h-auto w-full select-none object-contain"
                      variants={{
                        rest: { opacity: 1 },
                        hover: { opacity: 0 },
                      }}
                      transition={t}
                    />
                    <motion.div
                      className="absolute inset-0 z-[1] flex items-center justify-center"
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                      }}
                      transition={t}
                    >
                      <BryteGifCanvas
                        active={bryteHover}
                        playbackSpeed={2}
                        reduceMotion={Boolean(reduce)}
                        className="block h-auto max-h-full w-full object-contain"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ) : isD6 ? (
              <motion.img
                src={d6Laptopshot}
                alt=""
                aria-hidden
                className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 select-none"
                draggable={false}
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.01 },
                }}
                transition={reduce ? { duration: 0 } : { type: 'spring' as const, damping: 26, stiffness: 320 }}
              />
            ) : null}
          </motion.div>
        ) : (
          <div className="relative aspect-[16/11] w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.01 },
              }}
              transition={reduce ? { duration: 0 } : { type: 'spring' as const, damping: 26, stiffness: 320 }}
            >
              <motion.img
                src={utraLaptopshot}
                alt=""
                aria-hidden
                className="absolute bottom-0 right-0 w-[92%] select-none"
                draggable={false}
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.01 },
                }}
                transition={reduce ? { duration: 0 } : { type: 'spring' as const, damping: 28, stiffness: 340 }}
              />
              <motion.img
                src={utraPhoneshot}
                alt=""
                aria-hidden
                className="absolute bottom-[15%] left-[28%] z-[2] w-[68%] -translate-x-1/2 select-none"
                draggable={false}
                variants={{
                  rest: { x: 0, scale: 1 },
                  hover: { x: -6, scale: 1.01 },
                }}
                transition={reduce ? { duration: 0 } : { type: 'spring' as const, damping: 28, stiffness: 340 }}
              />
            </motion.div>
          </div>
        )}
      </div>

      <div className={`mt-3 sm:mt-4 ${isPlaceholder ? 'opacity-80' : ''}`}>
        <div className="relative min-h-[24px]">
          <motion.p
            variants={{
              rest: { opacity: 1, y: 0 },
              hover: { opacity: 0, y: 6 },
            }}
            transition={t}
            className="font-mono text-[12px] leading-relaxed text-neutral-700 sm:text-[13px]"
          >
            {project.description}
          </motion.p>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-baseline justify-between"
            variants={{
              rest: { opacity: 0, y: -6 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={t}
          >
            <span className="font-sans text-base font-semibold tracking-tight text-black sm:text-lg">
              {project.title}
            </span>
            <span className="font-mono text-[12px] text-neutral-500 sm:text-[13px]">
              {project.year}
            </span>
          </motion.div>
        </div>
        {showTags ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-900"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )

  if (isPlaceholder) {
    return (
      <motion.div
        className={frameClass}
        initial="rest"
        whileHover="hover"
        role="group"
        aria-label={project.title}
      >
        {inner}
      </motion.div>
    )
  }

  return (
    <motion.a
      href={project.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      data-cursor-label={project.cursorLabel}
      className={frameClass}
      initial="rest"
      whileHover="hover"
    >
      {inner}
    </motion.a>
  )
}
