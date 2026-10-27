import { createContext, useContext } from 'react'

type PrototypePreviewContextValue = {
  overrides: Record<string, boolean>
  getCardPlaying: (cardId: string) => boolean
  toggleCard: (cardId: string, currentlyPlaying: boolean) => void
}

export const PrototypePreviewContext = createContext<PrototypePreviewContextValue | null>(null)

export function usePrototypePreview() {
  return useContext(PrototypePreviewContext)
}
