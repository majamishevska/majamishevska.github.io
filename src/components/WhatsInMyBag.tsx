import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import bagPurse from '../assets/bag/purse.webp'
import { bagItems } from '../data/bagItems'

const rotateSpring = { type: 'spring' as const, damping: 28, stiffness: 300 }

const layoutSpring = { type: 'spring' as const, damping: 26, stiffness: 220, mass: 0.85 }

const peekById: Record<string, { x: string; y: string }> = {
  'hand-mirror': { x: '46%', y: '36%' },
  miffy: { x: '51%', y: '40%' },
  book: { x: '44%', y: '45%' },
  flag: { x: '48%', y: '40%' },
  'hair-clip': { x: '54%', y: '38%' },
  headphones: { x: '49%', y: '43%' },
  earrings: { x: '53%', y: '41%' },
}

const bagImgClass =
  'pointer-events-none relative z-20 block h-auto w-[min(120%,78rem)] max-h-[min(136%,740px)] max-w-[min(156vw,78rem)] select-none object-contain sm:w-[min(100%,78rem)] sm:max-h-[min(126%,740px)] sm:max-w-[min(136vw,78rem)]'

const bagShakeHover = {
  rotate: [0, -0.65, 0.6, -0.42, 0.38, 0],
  transition: { duration: 0.4, ease: [0.45, 0, 0.55, 1] as const },
}

const bagShakeTap = {
  rotate: [0, -1.15, 1.05, -0.72, 0.68, 0],
  transition: { duration: 0.38, ease: [0.45, 0, 0.55, 1] as const },
}

const bagHitClass =
  'absolute left-1/2 top-1/2 z-30 h-[min(52%,380px)] w-[min(40%,15rem)] max-w-[min(88vw,18rem)] -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

export function WhatsInMyBag() {
  const reduce = useReducedMotion()
  const [bagOpened, setBagOpened] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const moveTransition = reduce ? { duration: 0 } : layoutSpring
  const bagContents = bagItems.map((it) => it.label).join(', ')

  return (
    <section className="bg-white px-5 sm:px-8 lg:px-10" aria-labelledby="bag-heading">
      <div className="mx-auto max-w-6xl pb-8 sm:pb-12">
        <p className="sr-only" aria-live="polite">
          {bagOpened
            ? `Bag opened. Contents: ${bagContents}.`
            : 'Bag closed. Activate the bag to reveal its contents.'}
        </p>

        <div className="border border-black">
          <div
            id="bag-contents"
            className="relative h-[520px] w-full overflow-hidden bg-white sm:h-[580px]"
          >
            <h2
              id="bag-heading"
              className="absolute left-4 top-4 z-50 rounded-full border border-black bg-white px-2 py-0.5 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-neutral-900"
            >
              What’s in my bag
            </h2>
            {bagItems.map((it) => {
              const peek = peekById[it.id] ?? { x: '48%', y: '42%' }
              const atRestAngle = reduce ? 0 : it.restRotate
              const peekAngle = reduce ? 0 : it.restRotate * 0.28
              const angle =
                draggingId === it.id ? 0 : bagOpened ? atRestAngle : peekAngle
              const onTop = draggingId === it.id

              return (
                <motion.img
                  key={it.id}
                  src={it.src}
                  alt={it.label}
                  aria-hidden={!bagOpened}
                  data-cursor-label={bagOpened ? 'drag' : undefined}
                  className={`absolute w-[calc(var(--bag-item-w)*0.5)] select-none touch-none sm:w-[var(--bag-item-w)] ${bagOpened ? '' : 'pointer-events-none'}`}
                  initial={false}
                  animate={{
                    left: bagOpened ? it.x : peek.x,
                    top: bagOpened ? it.y : peek.y,
                    scale: bagOpened ? 1 : 0.88,
                    rotate: angle,
                    opacity: bagOpened ? 1 : 0,
                  }}
                  transition={{
                    left: moveTransition,
                    top: moveTransition,
                    scale: moveTransition,
                    rotate: rotateSpring,
                    opacity: moveTransition,
                  }}
                  style={{
                    '--bag-item-w': `${it.w}px`,
                    height: 'auto',
                    transformOrigin: '50% 50%',
                    zIndex: onTop ? 40 : (it.z ?? 1),
                  } as React.CSSProperties}
                  drag={bagOpened}
                  dragMomentum={false}
                  dragElastic={0.08}
                  onDragStart={() => setDraggingId(it.id)}
                  onDragEnd={() => setDraggingId(null)}
                  whileHover={
                    reduce || !bagOpened ? undefined : { opacity: 0.94 }
                  }
                />
              )
            })}

            <div
              className={`absolute left-1/2 top-[40%] z-20 -translate-x-1/2 -translate-y-1/2 ${bagOpened ? 'pointer-events-none' : ''}`}
            >
              <motion.div
                className={`relative ${bagOpened ? 'pointer-events-none' : 'pointer-events-auto'}`}
                initial={false}
                style={{ transformOrigin: '50% 50%' }}
                whileHover={!bagOpened && !reduce ? bagShakeHover : undefined}
                whileTap={!bagOpened && !reduce ? bagShakeTap : undefined}
              >
                <img
                  src={bagPurse}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className={bagImgClass}
                />
                {!bagOpened ? (
                  <button
                    type="button"
                    className={`${bagHitClass} cursor-pointer`}
                    aria-label="Open bag to reveal contents"
                    aria-controls="bag-contents"
                    aria-expanded={bagOpened}
                    data-cursor-label="open"
                    onClick={() => setBagOpened(true)}
                  />
                ) : null}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
