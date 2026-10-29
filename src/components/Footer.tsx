import { nameAscii } from '../data/ascii'

export function Footer() {
  return (
    <footer className="grid grid-cols-2 items-center gap-4 sm:grid-cols-[1fr_auto_1fr] border-t border-[#74805f] bg-white px-5 py-6 font-mono text-[11px] text-neutral-500 sm:px-8 lg:px-10">
      <p>© Maja Mishevska 2026</p>
      <pre aria-hidden="true" className="col-span-2 row-start-1 justify-self-center whitespace-pre font-mono text-[2px] leading-[1] text-[#74805f] sm:col-span-1 sm:col-start-2 sm:text-[2.5px]">
        {nameAscii.trimEnd().split('\n').filter((line) => line.trim()).map((line) => line.trimEnd().slice(4)).join('\n')}
      </pre>
      <a href="#top" data-cursor-label="scroll" className="justify-self-end underline decoration-black/40 underline-offset-4 transition-colors duration-200 hover:bg-[#e4e8dc] hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
        Back to top <span aria-hidden="true" className="text-icon font-sans">↑</span>
      </a>
    </footer>
  )
}
