import { useEffect, useRef, useState } from 'react'
import { usePrototypePreview } from '../hooks/usePrototypePreview'

type Props = {
  src: string
  alt: string
  className?: string

  aspectRatio?: string

  fit?: 'contain' | 'cover'

  objectPosition?: string
}

export function ToggleGifCard({
  src,
  alt,
  className,
  aspectRatio = '9 / 19.5',
  fit = 'contain',
  objectPosition = 'center',
}: Props) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const preview = usePrototypePreview()
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [localPlaying, setLocalPlaying] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const playing = preview ? preview.getCardPlaying(src) : localPlaying

  const togglePlayback = () => {
    if (preview) preview.toggleCard(src, playing)
    else setLocalPlaying((p) => !p)
  }

  const cursorLabel = playing ? 'pause' : 'play'

  useEffect(() => {
    if (reducedMotion || playing) return
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    if (!img.complete || img.naturalWidth === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }, [playing, reducedMotion, loaded])

  if (reducedMotion) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={className}
      />
    )
  }

  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <button
      type="button"
      className={className}
      data-cursor-label={cursorLabel}
      aria-label={`${playing ? 'Pause' : 'Play'} animation: ${alt}`}
      onClick={togglePlayback}
    >
      <span
        aria-hidden
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <span
          aria-hidden
          className={`absolute inset-0 bg-neutral-100 transition-opacity duration-200 ${!loaded ? 'opacity-100' : 'opacity-0'
            }`}
        />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ objectPosition }}
          className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-150 ${playing ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setLoaded(true)}
        />
        <canvas
          ref={canvasRef}
          style={{ objectPosition }}
          className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-150 ${playing ? 'opacity-0' : 'opacity-100'
            }`}
        />
      </span>
    </button>
  )
}
