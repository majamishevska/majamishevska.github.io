import { useEffect, useState } from 'react'

const QUERY = '(min-width: 1024px)'

export function useIsDesktop(): boolean {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return match
}
