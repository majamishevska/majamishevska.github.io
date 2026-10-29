import cntrLogo from '../assets/brand/cntr-logo.png'
import swrlLogo from '../assets/brand/swrl-icon.png'
import nciiLogo from '../assets/brand/ncii-ecosystem-logo.png'

import srchLogo from '../assets/brand/SRCH-logo.svg'

const logos = { cntr: cntrLogo, swrl: swrlLogo, ncii: nciiLogo, srch: srchLogo }

export function InlineLogo({ name, side = 'right' }: { name: keyof typeof logos; side?: 'left' | 'right' }) {
  return (
    <img
      src={logos[name]}
      alt=""
      aria-hidden="true"
      style={name === 'swrl' ? { verticalAlign: '-0.15em' } : undefined}
      className={`inline-logo text-icon w-auto object-contain ${side === 'left' ? 'mr-1' : 'ml-0.5'} ${name === 'srch' ? 'h-[0.75em]' : name === 'ncii' ? 'h-[0.9em]' : name === 'swrl' ? 'h-[1em]' : 'h-[1.15em]'}`}
    />
  )
}
