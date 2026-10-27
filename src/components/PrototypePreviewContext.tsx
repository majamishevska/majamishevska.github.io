import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { PrototypePreviewContext } from '../hooks/usePrototypePreview'

export function PrototypePreviewProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})

  const getCardPlaying = useCallback(
    (cardId: string) => overrides[cardId] ?? true,
    [overrides],
  )

  const toggleCard = useCallback((cardId: string, effectivePlaying: boolean) => {
    setOverrides((prev) => ({ ...prev, [cardId]: !effectivePlaying }))
  }, [])

  const value = useMemo(
    () => ({
      overrides,
      getCardPlaying,
      toggleCard,
    }),
    [overrides, getCardPlaying, toggleCard],
  )

  return (
    <PrototypePreviewContext.Provider value={value}>{children}</PrototypePreviewContext.Provider>
  )
}
