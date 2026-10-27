export type PieSlice = {
  label: string
  valuePct: number
  color: string
}

export function PieChart({
  slices,
  size = 132,
}: {
  slices: PieSlice[]
  size?: number
}) {
  const clamped = slices.map((s) => ({
    ...s,
    valuePct: Math.max(0, Math.min(100, s.valuePct)),
  }))

  const total = clamped.reduce((sum, s) => sum + s.valuePct, 0)
  const normalized =
    total === 0
      ? clamped
      : clamped.map((s) => ({ ...s, valuePct: (s.valuePct / total) * 100 }))

  const strokeWidth = 14
  const r = (size - strokeWidth) / 2
  const c = 2 * Math.PI * r

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Pie chart"
      className="block"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth={strokeWidth}
      />
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {normalized.map((s, index) => {
          const dash = (s.valuePct / 100) * c
          const gap = c - dash
          const offset = normalized.slice(0, index).reduce((sum, slice) => sum + (slice.valuePct / 100) * c, 0)
          return (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
        })}
      </g>
    </svg>
  )
}
