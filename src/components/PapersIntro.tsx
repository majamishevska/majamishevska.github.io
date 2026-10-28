import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { papersIntroImages } from '../data/papersIntroImages'
import { bowAscii } from '../data/ascii'

const rabbitFrame1 = String.raw`                                  
         ██████                   
       ██████                     
    █████                         
  ███  ██████   ██████████         
  █████████████████████████       
     ███████████████████████      
    ██████████████████████████    
 ███████████████████████████      
       █████       ████████████   
    █████            ████  █████  
`

const rabbitFrame2 = String.raw`                                  
          ████                    
        ████     █████████        
     ██████   █████████████       
   ███  ██████████████████████     
  █████████████████████████████   
     ██████████████████████████   
           ██████████████████     
                  ██████          
                 ██  ████         
                                  
`

function RabbitHolesAscii({ active }: { active: boolean }) {
  const [frame, setFrame] = useState(0)
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!active) return
    if (reducedMotion) return
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 2), 520)
    return () => window.clearInterval(id)
  }, [active, reducedMotion])

  const art = frame === 0 ? rabbitFrame1 : rabbitFrame2

  return (
    <pre
      aria-hidden
      className="pointer-events-none m-0 select-none whitespace-pre font-mono text-[7px] leading-[1.05] text-[#74805f] sm:text-[8px]"
    >
      {art}
    </pre>
  )
}

export function PapersIntro() {
  const [imageIndex, setImageIndex] = useState(0)
  const [rabbitHovered, setRabbitHovered] = useState(false)
  const reduceMotion = useReducedMotion()
  const n = papersIntroImages.length



  return (
    <section
      aria-label="About photo gallery"
      className="bg-white px-5 py-8 sm:px-8 sm:py-12 lg:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_2fr] md:items-stretch md:gap-10 lg:gap-12">
        <div className="flex min-h-[19rem] flex-col overflow-hidden border border-black bg-neutral-50 sm:min-h-[23rem] md:h-full md:min-h-[min(27rem,52vh)]">
          {n > 0 ? (
            <button
              type="button"
              className="relative min-h-[19rem] w-full flex-1 cursor-none overflow-hidden p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black sm:min-h-[23rem] md:min-h-0"
              data-cursor-label="next photo"
              aria-label={`Photo ${imageIndex + 1} of ${n}. Show next.`}
              onClick={() => setImageIndex((i) => (i + 1) % n)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={papersIntroImages[imageIndex]}
                  src={papersIntroImages[imageIndex]}
                  alt=""
                  className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-[50%_38%]"
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
                Showing photo {imageIndex + 1} of {n}.
              </span>
            </button>
          ) : null}
        </div>
        {n > 0 ? (
          <p className="-mt-6 font-mono text-[11px] leading-relaxed text-neutral-600 md:sr-only">
            Tap the photo to see the next image.
          </p>
        ) : null}
        <div className="flex min-h-0 flex-col md:h-full md:min-h-[min(27rem,52vh)]">
          <p className="shrink-0 font-mono text-sm leading-relaxed text-neutral-800 sm:text-[15px]">
            Recently, I’ve been building tools for{' '}
            <span className="bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">
              civic access and public knowledge
            </span>
            , while also researching emerging tech harms through work on{' '}
            <span className="bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">gendered AI companions</span> and{' '}
            <span className="bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">youth tech safety</span>.
          </p>
          <p className="mt-5 font-mono text-sm leading-relaxed text-neutral-800 sm:text-[15px]">
            I previously worked in San Francisco as an SDE Intern{' '}
            <span className="bg-[#e8e8e8] px-1.5 py-0.5 font-mono text-[13px] leading-relaxed text-black sm:text-sm">
              @ Amazon
            </span>
            !
          </p>
          <div className="flex min-h-0 flex-1 items-center justify-center py-6 md:min-h-0 md:py-4">
            <pre
              aria-hidden
              className="pointer-events-none m-0 max-w-full select-none overflow-hidden whitespace-pre font-mono text-[4px] leading-[1.05] text-[#74805f] xs:text-[5px] sm:text-[8px]"
            >
              {bowAscii}
            </pre>
          </div>
          <p className="shrink-0 font-mono text-sm leading-relaxed text-neutral-800 sm:text-[15px]">
            You can usually find me practicing my Italian, looking for thrift finds with a brown sugar matcha in hand,
            or following whatever creative{' '}
            <span
              className="pointer-events-auto relative inline-block"
              onMouseEnter={() => setRabbitHovered(true)}
              onMouseLeave={() => setRabbitHovered(false)}
            >
              <em>
                <u>rabbit holes</u>
              </em>
              <span
                aria-hidden={!rabbitHovered}
                className={`absolute left-1/2 bottom-full z-10 hidden -translate-x-1/2 pb-2 transition-opacity duration-200 lg:block ${
                  rabbitHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <RabbitHolesAscii active={rabbitHovered} />
              </span>
            </span>{' '}
            I’ve fallen into that week!
          </p>

        </div>
      </div>
    </section>
  )
}
