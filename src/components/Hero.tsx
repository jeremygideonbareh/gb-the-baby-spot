import { useRef } from 'react'
import { address, site } from '../data/content'
import { useMotion } from '../lib/motion'
import { waLink } from '../lib/whatsapp'
import { ArrowIcon, WhatsAppIcon } from './Icons'
import { Picture } from './ui'

const collage = [
  {
    name: 'hero-lilac',
    alt: 'Lilac sparkle ballies with a rhinestone strap',
    cls: 'left-[2%] top-[1%] w-[54%] -rotate-6 z-20',
    depth: 1.4,
  },
  {
    name: 'hero-wrapper',
    alt: 'Dino print zip-up baby wrapper',
    cls: 'right-[0%] top-[6%] w-[45%] rotate-5 z-10',
    depth: 0.7,
  },
  {
    name: 'hero-pants',
    alt: 'Dusty pink flare pants with lace and bows at the hem',
    cls: 'left-[8%] bottom-[0%] w-[43%] rotate-4 z-10',
    depth: 0.9,
  },
  {
    name: 'hero-bow',
    alt: 'Cream bow strap shoes',
    cls: 'right-[4%] bottom-[4%] w-[50%] -rotate-3 z-30',
    depth: 1.7,
  },
]

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)

  useMotion((m) => {
    const stop = [
      root.current ? m.initHeroScene(root.current) : () => {},
      cta.current ? m.attachMagnet(cta.current) : () => {},
    ]
    return () => stop.forEach((fn) => fn())
  })

  const hello = waLink(`Hi ${site.name}! I'd like to order something for my little one. Home delivery please.`)

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_24rem_at_100%_-5%,#f6dce4_0%,transparent_70%),radial-gradient(26rem_22rem_at_-5%_80%,#dff1ea_0%,transparent_70%)]"
      />
      <Bunting />

      <div className="container-x relative grid items-center gap-8 pt-12 pb-16 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-16 lg:pb-24">
        <div>
          <p className="eyebrow hero-in">Kids wear · toys · accessories</p>
          <h1 id="hero-title" className="mt-2 text-[2.9rem] leading-[0.95] sm:text-6xl lg:text-[5.2rem]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">G.B The</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line hero-line-2 block text-gold-deep italic">Baby Spot</span>
            </span>
          </h1>
          <p className="hero-in mt-3 max-w-md text-lg leading-snug text-cocoa-soft sm:mt-4 sm:text-2xl">{site.promise}.</p>

          <div className="hero-in mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <a ref={cta} href={hello} target="_blank" rel="noopener" className="btn btn-order px-5 text-base sm:px-6 sm:text-lg">
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
            <a href="#shop" className="btn btn-soft px-4 sm:px-5">
              Shop <ArrowIcon className="size-5" />
            </a>
          </div>

          <ul className="hero-in mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-base font-semibold text-cocoa-soft">
            <li className="flex items-center gap-2">
              <Dot /> Home delivery
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Order on WhatsApp or call
            </li>
            <li className="flex items-center gap-2">
              <Dot /> {address.line1}, Nongthymmai
            </li>
          </ul>
        </div>

        <div
          data-stage
          className="relative mx-auto aspect-[1/0.92] w-full max-w-[23rem] sm:aspect-square sm:max-w-[32rem]"
        >
          {collage.map((c, i) => (
            <div
              key={c.name}
              data-parallax
              data-depth={c.depth}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`hero-photo absolute overflow-hidden rounded-[1.75rem] bg-paper p-1.5 shadow-lift ${c.cls}`}
            >
              <Picture
                name={c.name}
                alt={c.alt}
                sizes="(min-width: 1024px) 280px, 45vw"
                eager
                fetchPriority={i < 2 ? 'high' : 'auto'}
                className="aspect-square w-full rounded-[1.4rem] object-cover"
              />
            </div>
          ))}

          <Sticker />
          <Star data-depth="2.2" className="absolute top-[41%] left-[47%] z-40 size-11 text-gold" />
          <Cloud data-depth="1.2" className="absolute -bottom-3 left-[-3%] z-40 w-20 text-mint" />
        </div>
      </div>

      <a
        href="#categories"
        className="hero-in container-x relative -mt-6 mb-8 hidden items-center gap-3 text-base font-bold text-cocoa-soft lg:flex"
      >
        <span className="scroll-cue grid size-11 place-items-center rounded-full ring-1 ring-cocoa/20">
          <ArrowIcon className="size-5 rotate-90" />
        </span>
        Scroll to shop
      </a>
    </section>
  )
}

const Dot = () => <span aria-hidden className="size-2 rounded-full bg-gold" />

/** Slowly turning badge, like a stitched-on label. */
function Sticker() {
  const text = 'Home delivery · Order on WhatsApp · '
  return (
    <div
      aria-hidden
      data-depth="2.6"
      className="absolute -top-3 left-[-5%] z-40 hidden size-24 place-items-center rounded-full bg-cocoa text-cream shadow-lift sm:grid sm:size-28"
    >
      <svg viewBox="0 0 100 100" className="sticker-spin absolute inset-0 size-full">
        <defs>
          <path id="sticker-path" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" fill="none" />
        </defs>
        <text className="fill-cream text-[8.4px] font-bold uppercase">
          <textPath href="#sticker-path" startOffset="0" textLength="226" lengthAdjust="spacingAndGlyphs">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="size-7 text-gold" fill="currentColor" aria-hidden>
        <path d="M12 2l2.6 7.1L22 12l-7.4 2.9L12 22l-2.6-7.1L2 12l7.4-2.9z" />
      </svg>
    </div>
  )
}

/** Bunting strung across the top of the page, swaying gently. */
function Bunting() {
  const flags = Array.from({ length: 14 }, (_, i) => i)
  const colours = ['#f6dce4', '#a9d8c8', '#f7ebcc', '#9fb693']
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden">
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none" className="bunting h-16 w-full">
        <path d="M0 6c200 34 400 34 600 34s400 0 600-34" stroke="#c79a2e" strokeWidth="2" fill="none" opacity="0.5" />
        {flags.map((i) => {
          const x = 40 + i * 85
          const y = 6 + Math.sin((i / 13) * Math.PI) * 32
          return (
            <polygon
              key={i}
              points={`${x - 13},${y} ${x + 13},${y} ${x},${y + 26}`}
              fill={colours[i % colours.length]}
              opacity="0.9"
            />
          )
        })}
      </svg>
    </div>
  )
}

const Star = (p: React.SVGProps<SVGSVGElement> & { 'data-depth'?: string }) => (
  <svg viewBox="0 0 48 48" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M24 4c1.6 0 2.4 1 3.2 3l3.3 8.1 8.7.7c2.1.2 3.2.8 3.6 2.1.4 1.3-.2 2.3-1.8 3.7l-6.6 5.6 2 8.5c.5 2.1.3 3.2-.8 4-1.1.8-2.3.6-4.1-.5L24 34.6l-7.5 4.6c-1.8 1.1-3 1.3-4.1.5-1.1-.8-1.3-1.9-.8-4l2-8.5-6.6-5.6C5.4 20.2 4.8 19.2 5.2 17.9c.4-1.3 1.5-1.9 3.6-2.1l8.7-.7L20.8 7c.8-2 1.6-3 3.2-3Z"
    />
  </svg>
)

const Cloud = (p: React.SVGProps<SVGSVGElement> & { 'data-depth'?: string }) => (
  <svg viewBox="0 0 80 48" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M20 46C9 46 2 39.5 2 31.5 2 23.8 8.3 18 16 17.6 18.4 8.6 26.3 2 36 2c9.4 0 17.2 6.2 19.6 14.7C68 16.5 78 23.4 78 32.5 78 40.5 71.3 46 62 46H20Z"
    />
  </svg>
)
