import { sectionFlourishAscii } from '../data/ascii'

export function SectionFlourish() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none relative ml-1 inline-block h-0 w-[60px] align-middle sm:ml-1 sm:w-[72px]"
    >
      <span className="absolute left-0 -top-1 -translate-y-1/2 select-none whitespace-pre font-mono text-[2.5px] font-normal leading-[1.05] tracking-normal text-[#74805f] sm:text-[3px]">
        {sectionFlourishAscii}
      </span>
    </span>
  )
}
