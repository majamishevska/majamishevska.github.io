import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useIsDesktop } from '../hooks/useIsDesktop'

const SPRING = { damping: 32, stiffness: 400, mass: 0.45 }

function pillWidthFor(label: string): number {
  const base = 48
  const perChar = 5.6
  const iconExtra = label === 'pause' || label === 'play' ? 14 : 0
  return Math.min(190, Math.round(base + iconExtra + label.length * perChar))
}

function pickLabel(el: Element | null): { active: boolean; label: string } {
  if (!el) return { active: false, label: '' }
  const tagged = el.closest('[data-cursor-label]') as HTMLElement | null
  if (tagged?.dataset.cursorLabel)
    return { active: true, label: tagged.dataset.cursorLabel }

  const interactive = el.closest(
    'a[href], button, [role="link"], [role="button"], input:not([disabled]), textarea:not([disabled]), select'
  )
  if (interactive) {
    const t = interactive.getAttribute('data-cursor-label-default')
    return { active: true, label: t ?? 'open' }
  }

  return { active: false, label: '' }
}

export function CustomCursor() {
  const desktop = useIsDesktop()
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')

  const targetW = useMemo(
    () => (hover && label ? pillWidthFor(label) : 28),
    [hover, label]
  )

  useEffect(() => {
    if (!desktop || reducedMotion) return

    document.body.classList.add('custom-cursor-active')
    return () => document.body.classList.remove('custom-cursor-active')
  }, [desktop, reducedMotion])

  useEffect(() => {
    if (!desktop || reducedMotion) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)

      const under = document.elementFromPoint(e.clientX, e.clientY)
      const { active, label: l } = pickLabel(under)
      setHover(active)
      setLabel(l)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [desktop, reducedMotion, rawX, rawY])

  if (!desktop || reducedMotion) return null

  const showPill = hover && label.length > 0
  const showMediaIcon = showPill && (label === 'pause' || label === 'play')
  const mediaIcon = label === 'pause' ? '❚❚' : label === 'play' ? '▶' : ''

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{
        x: rawX,
        y: rawY,
      }}
    >
      <motion.div
        className="flex items-center justify-center overflow-hidden border border-black/80 bg-white/80 font-mono text-[9px] font-medium uppercase leading-none tracking-[0.12em] text-black"
        initial={false}
        animate={{
          width: Math.max(targetW, 28),
          height: showPill ? 32 : 28,
          borderRadius: 999,
        }}
        transition={{ type: 'spring', ...SPRING }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.span
          className="whitespace-nowrap px-2.5"
          initial={false}
          animate={{ opacity: showPill ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          {showPill ? (
            <span className="inline-flex items-center gap-1.5">
              {showMediaIcon ? (
                <span
                  aria-hidden
                  className="font-sans text-[10px] tracking-normal"
                >
                  {mediaIcon}
                </span>
              ) : null}
              <span>{label}</span>
            </span>
          ) : (
            ''
          )}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
