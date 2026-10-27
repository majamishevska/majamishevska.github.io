export type Project = {
  id: string
  title: string
  description: string
  year: number
  tags: string[]

  bgColor?: string
  href: string
  cursorLabel: 'see more' | 'open'

  placeholder?: boolean
}

export const sampleProjects: Project[] = [
  {
    id: 'privacy-period-tracker',
    title: 'Privacy-Preserving Period Tracker (3PT)',
    description:
      'A local-first period tracker designed around privacy, transparency, and user control.',
    year: 2026,
    tags: ['0 → 1', 'USER RESEARCH', 'MOBILE'],
    bgColor: '#4ba4f0',
    href: '/3pt',
    cursorLabel: 'see more',
  },
  {
    id: 'health-companion',
    title: 'LUNAR Lab Website',
    description:
      'A website redesign for LUNAR, Brown University’s Language Understanding and Representation Lab.',
    year: 2026,
    tags: ['WEB', 'REDESIGN', 'FULL STACK'],
    bgColor: '#F9E4C8',
    href: '/lunar',
    cursorLabel: 'see more',
  },
  {
    id: 'design-system',
    title: 'District 6 Civic Resource Platform',
    description: 'A bilingual civic engagement hub for the Boston City Council.',
    year: 2025,
    tags: ['CIVIC', 'USER RESEARCH', 'BILINGUAL', 'AGILE'],
    bgColor: '#35a17d',
    href: '/pit-ne',
    cursorLabel: 'see more',
  },
  {
    id: 'maps-experiment',
    title: 'Innocent Knowledge',
    description:
      'A trilingual digital archive of children’s drawings, built for international exhibitions and public access.',
    year: 2025,
    tags: ['DIGITAL HUMANITIES', 'TRILINGUAL', 'ACCESSIBILITY'],
    href: 'https://innocentknowledge.com/',
    cursorLabel: 'open',
  },

]
