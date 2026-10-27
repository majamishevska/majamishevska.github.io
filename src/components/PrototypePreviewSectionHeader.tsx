import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function PrototypePreviewSectionHeader({ children }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-mono text-[13px] font-medium uppercase leading-relaxed tracking-[0.12em] text-neutral-800 sm:text-sm">
        {children}
      </h2>
      <p className="inline-flex items-center gap-1.5 self-start sm:self-auto">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] leading-snug text-neutral-600">
          Play/Pause
        </span>
        <span className="font-mono text-[11px] leading-snug text-neutral-500">
          — click on card to toggle
        </span>
      </p>
    </div>
  )
}
