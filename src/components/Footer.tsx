export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-4 border-t border-[#74805f] bg-white px-5 py-6 font-mono text-[11px] text-neutral-500 sm:px-8 lg:px-10">
      <p>© Maja Mishevska 2026</p>
      <a href="#top" data-cursor-label="scroll" className="underline decoration-black/40 underline-offset-4 transition-colors duration-200 hover:bg-[#e4e8dc] hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
        Back to top <span aria-hidden="true" className="font-sans">↑</span>
      </a>
    </footer>
  )
}
