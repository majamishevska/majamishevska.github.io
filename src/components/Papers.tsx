import { papers } from '../data/papers'

export function Papers({ section = 'all' }: { section?: 'all' | 'papers' | 'honors' }) {
  const groups = [
    { id: 'research-writing', title: 'Research & Writing', entries: papers.filter((p) => !p.category), section: 'papers' },
    { id: 'fellowships-programs', title: 'Fellowships & Honors', entries: papers.filter((p) => p.category === 'program'), section: 'honors' },
  ].filter((group) => section === 'all' || group.section === section)
  return (
    <div className="bg-white px-5 sm:px-8 lg:px-10">
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={group.id} className="scroll-mt-16 pt-8 first:pt-0">
          <div className="relative">
            <h2 id={group.id} className="mx-auto max-w-6xl scroll-mt-16 py-5 font-sans text-xl font-semibold tracking-tight text-black sm:text-2xl">
              {group.title}
            </h2>
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 ml-[calc(50%-50vw)] h-0 w-screen border-0 border-t border-black"
            />
          </div>
          {group.entries.map((p, idx) => (
              <div key={p.id} className={idx > 0 ? 'relative' : undefined}>
                {idx > 0 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 ml-[calc(50%-50vw)] h-0 w-screen border-0 border-t border-black"
                  />
                )}
                <div className="mx-auto max-w-6xl">
                  <div className="grid grid-cols-[minmax(0,1fr)] gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_100px] sm:items-center sm:gap-6">
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-label={p.cursorLabel ?? 'open'}
                        className="font-sans text-base font-semibold leading-tight tracking-tight text-black underline decoration-black underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black sm:text-lg"
                      >
                        {p.title}
                      </a>
                    ) : (
                      <p className="font-sans text-base font-semibold leading-tight tracking-tight text-black sm:text-lg">
                        {p.title}
                      </p>
                    )}
                    <div className="whitespace-pre-line font-mono text-[12px] leading-relaxed text-neutral-700 sm:text-[13px] sm:justify-self-end sm:text-right">
                      {p.format && <p className="mb-2 text-[10px] uppercase tracking-wider text-neutral-500">{p.format}</p>}
                      <p>
                        {p.detail}
                        {p.detailEmphasis && (
                          <strong className="block font-bold">
                            {p.detailEmphasisHref ? (
                              <a href={p.detailEmphasisHref} target="_blank" rel="noreferrer" data-cursor-label="open" className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                {p.detailEmphasis}
                              </a>
                            ) : p.detailEmphasis}
                          </strong>
                        )}
                      </p>
                      {p.venues && (
                        <ul className="mt-2 space-y-2">
                          {p.venues.map((venue) => (
                            <li key={venue.href}>
                              {(p.venues?.length ?? 0) > 1 && <span aria-hidden="true" className="font-normal">• </span>}
                              <strong className="font-bold">
                                <a href={venue.href} target="_blank" rel="noreferrer" data-cursor-label="open" className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                  {venue.label}
                                </a>
                              </strong>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <p className="justify-self-start font-mono text-[12px] text-neutral-500 sm:justify-self-end sm:text-[13px]">
                      {p.year}
                    </p>
                  </div>
                </div>
              </div>
          ))}
        </section>
      ))}
    </div>
  )
}
