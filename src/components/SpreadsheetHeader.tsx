import { documents } from '../data/documents'

function LogoMark() {
  return (
    <span className="text-[12px] leading-none text-black" aria-hidden>
      ⋆˚꩜｡
    </span>
  )
}

function LogoMarkAlt() {
  return (
    <span className="text-[12px] leading-none text-black" aria-hidden>
      ｡꩜˚⋆
    </span>
  )
}

const cell = `flex h-11 min-h-11 select-none items-center justify-center font-mono text-[9px] uppercase leading-none tracking-[0.06em] text-black sm:text-[10px] sm:tracking-[0.16em]`

const link = `${cell} px-1.5 transition-colors sm:px-3 duration-200 hover:bg-[#f3f3f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black`

export function SpreadsheetHeader({ active = 'research' }: { active?: 'research' | 'projects' | 'about' }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-black bg-white">
      <nav aria-label="Main navigation" className="grid w-full grid-cols-[2rem_repeat(4,minmax(0,1fr))_2rem] md:grid-cols-[3.7rem_minmax(0,1fr)_6.25rem_6.25rem_6.25rem_6.25rem_3.7rem]">
        <a href="/#top" data-cursor-label="open" className={`${cell} border-r border-black`} aria-label="Research home">
          <LogoMark />
        </a>
        <div className="hidden border-r border-black md:block" aria-hidden />
        {([
          { id: 'research', label: 'Research', href: '/' },
          { id: 'projects', label: 'Projects', href: '/projects' },
          { id: 'about', label: 'About Me', href: '/about' },
        ] as const).map((item) => (
          <a key={item.id} href={item.href} data-cursor-label="open" aria-current={active === item.id ? 'page' : undefined} className={`${link} border-r border-black ${active === item.id ? 'bg-[#e4e8dc] font-semibold' : ''}`}>
            {item.label}
          </a>
        ))}
        <a href={documents.resumePdf} target="_blank" rel="noreferrer" data-cursor-label="open" className={`${link} border-r border-black`} aria-label="Open resume PDF in a new tab">
          Resume
        </a>
        <div className={cell}><LogoMarkAlt /></div>
      </nav>
    </header>
  )
}
