import { parseGIF, decompressFrames } from 'gifuct-js'
import type { ParsedFrame } from 'gifuct-js'
import { useEffect, useRef, useState } from 'react'
import bryteShotGif from '../assets/subprojects/bryte/bryte-shot.gif'

type Props = {

  active: boolean

  playbackSpeed?: number
  className?: string
  reduceMotion: boolean
}

export function BryteGifCanvas({
  active,
  playbackSpeed = 2,
  className,
  reduceMotion,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [meta, setMeta] = useState<{
    frames: ParsedFrame[]
    w: number
    h: number
  } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const frameIndexRef = useRef(0)
  const playingRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const res = await fetch(bryteShotGif)
      const buf = await res.arrayBuffer()
      if (cancelled) return
      const gif = parseGIF(buf)
      const frames = decompressFrames(gif, true)
      setMeta({
        frames,
        w: gif.lsd.width,
        h: gif.lsd.height,
      })
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (reduceMotion || !active || !meta || !canvasRef.current) {
      playingRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { frames, w, h } = meta
    canvas.width = w
    canvas.height = h

    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    const gifCanvas = document.createElement('canvas')
    const gifCtx = gifCanvas.getContext('2d')
    if (!tempCtx || !gifCtx) return

    gifCanvas.width = w
    gifCanvas.height = h

    let frameImageData: ImageData | null = null
    playingRef.current = true

    const drawPatch = (frame: ParsedFrame) => {
      const dims = frame.dims
      if (
        !frameImageData ||
        frameImageData.width !== dims.width ||
        frameImageData.height !== dims.height
      ) {
        tempCanvas.width = dims.width
        tempCanvas.height = dims.height
        frameImageData = tempCtx.createImageData(dims.width, dims.height)
      }
      frameImageData.data.set(frame.patch)
      tempCtx.putImageData(frameImageData, 0, 0)
      gifCtx.drawImage(tempCanvas, dims.left, dims.top)
    }

    const renderFrame = () => {
      if (!playingRef.current || !active || reduceMotion) return

      const frame = frames[frameIndexRef.current]
      const start = performance.now()

      if (frame.disposalType === 2) {
        gifCtx.clearRect(0, 0, w, h)
      }

      drawPatch(frame)

      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(gifCanvas, 0, 0)

      frameIndexRef.current = (frameIndexRef.current + 1) % frames.length

      const elapsed = performance.now() - start
      const delay = Math.max(
        2,
        Math.floor(frame.delay / playbackSpeed - elapsed),
      )

      timerRef.current = setTimeout(() => {
        requestAnimationFrame(renderFrame)
      }, delay)
    }

    frameIndexRef.current = 0
    renderFrame()

    return () => {
      playingRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [active, meta, playbackSpeed, reduceMotion])

  if (reduceMotion) {
    return (
      <img
        src={bryteShotGif}
        alt=""
        aria-hidden
        draggable={false}
        className={className}
      />
    )
  }

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
