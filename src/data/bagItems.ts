import bookImg from '../assets/bag/book.webp'
import earringsImg from '../assets/bag/earrings.webp'
import flagImg from '../assets/bag/flag.webp'
import hairClipImg from '../assets/bag/hair_clip.webp'
import handMirrorImg from '../assets/bag/hand_mirror.webp'
import headphonesImg from '../assets/bag/headphones.webp'
import miffyImg from '../assets/bag/miffy.webp'

export type BagItem = {
  id: string
  label: string
  src: string

  w: number

  x: string
  y: string

  restRotate: number

  z?: number
}

export const bagItems: BagItem[] = [
  {
    id: 'hair-clip',
    label: 'hair clip',
    src: hairClipImg,
    w: 126,
    x: '5%',
    y: '10%',
    restRotate: -10,
  },
  {
    id: 'miffy',
    label: 'miffy',
    src: miffyImg,
    w: 116,
    x: '20%',
    y: '10%',
    restRotate: 14,
  },
  {
    id: 'earrings',
    label: 'earrings',
    src: earringsImg,
    w: 112,
    x: '18%',
    y: '40%',
    restRotate: 4,
  },
  {
    id: 'book',
    label: 'book',
    src: bookImg,
    w: 162,
    x: '5%',
    y: '50%',
    restRotate: -36,
  },
  {
    id: 'flag',
    label: 'flag',
    src: flagImg,
    w: 230,
    x: '75%',
    y: '8%',
    restRotate: 20,
    z: 0,
  },
  {
    id: 'hand-mirror',
    label: 'hand mirror',
    src: handMirrorImg,
    w: 118,
    x: '83%',
    y: '32%',
    restRotate: -14,
  },
  {
    id: 'headphones',
    label: 'headphones',
    src: headphonesImg,
    w: 222,
    x: '70%',
    y: '56%',
    restRotate: -6,
  },
]
