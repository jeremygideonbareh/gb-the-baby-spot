import { useRef } from 'react'
import { address, site } from '../data/content'
import { MOTION_OK, useMotion } from '../lib/motion'
import { waLink } from '../lib/whatsapp'
import { ArrowIcon, WhatsAppIcon } from './Icons'
import { Picture } from './ui'

const collage = [
  { name: 'hero-lilac', alt: 'Lilac sparkle bellies with a rhinestone strap', cls: 'left-[4%] top-[2%] w-[52%] -rotate-6 z-20' },
  { name: 'hero-wrapper', alt: 'Dino print zip-up baby wrapper', cls: 'right-[2%] top-[8%] w-[44%] rotate-5 z-10' },
  { name: 'hero-pants', alt: 'Dusty pink flare pants with lace and bows at the hem', cls: 'left-[10%] bottom-[2%] w-[42%] rotate-4 z-10' },
  { name: 'hero-bow', alt: 'Cream bow strap shoes', cls: 'right-[6%] bottom-[6%] w-[48%] -rotate-3 z-30' },
]

export function Hero() {
  const root = useRef<HTMLElement>(null)

  // Text and photos paint immediately (the settle-in is CSS, see .hero-photo); GSAP only floats the shapes.
  useMotion(({ gsap }) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.to('[data-float]', { y: -10, rotate: 8, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('[data-float-2]', { y: 8, rotate: -10, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, root)
    return () => mm.revert()
  })

  const hello = waLink(`Hi ${site.name}! I'd like to order something for my little one. Home delivery please.`)

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(28rem_22rem_at_100%_0%,#f6dce4_0%,transparent_70%),radial-gradient(24rem_20rem_at_0%_75%,#dff1ea_0%,transparent_70%)]"
      />

      <div className="container-x relative grid items-center gap-8 pt-6 pb-14 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-16 lg:pb-24">
        <div>
          <p data-hero-text className="eyebrow">
            Kids wear · toys · accessories
          </p>
          <h1 id="hero-title" data-hero-text className="mt-2 text-[2.6rem] sm:text-6xl lg:text-7xl">
            G.B <span className="text-gold-deep">The Baby Spot</span>
          </h1>
          <p data-hero-text className="mt-3 max-w-md text-xl leading-snug text-cocoa-soft sm:mt-4 sm:text-2xl">
            {site.promise}.
          </p>
          <div data-hero-text className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <a href={hello} target="_blank" rel="noopener" className="btn btn-order text-lg">
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
            <a href="#shop" className="btn btn-soft px-5">
              Shop <ArrowIcon className="size-5" />
            </a>
          </div>
          <ul data-hero-text className="mt-6 hidden sm:flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] font-semibold text-cocoa-soft">
            <li className="flex items-center gap-2"><Dot /> Home delivery</li>
            <li className="flex items-center gap-2"><Dot /> Quick replies on WhatsApp</li>
            <li className="flex items-center gap-2"><Dot /> {address.line1}, Nongthymmai</li>
          </ul>
        </div>

        <div className="relative mx-auto aspect-[1/0.9] w-full max-w-[26rem] sm:aspect-square sm:max-w-[32rem]">
          {collage.map((c, i) => (
            <div
              key={c.name}
              className={`hero-photo absolute overflow-hidden rounded-[1.75rem] bg-paper p-1.5 shadow-lift ${c.cls}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Picture
                name={c.name}
                alt={c.alt}
                sizes="(min-width: 1024px) 260px, 45vw"
                eager
                fetchPriority={i < 2 ? 'high' : 'auto'}
                className="aspect-square w-full rounded-[1.4rem] object-cover"
              />
            </div>
          ))}
          <Star data-float className="absolute top-[40%] left-[46%] z-40 size-12 text-gold" />
          <Cloud data-float-2 className="absolute -bottom-2 left-[-2%] z-40 w-20 text-mint" />
        </div>
      </div>
    </section>
  )
}

const Dot = () => <span aria-hidden className="size-2 rounded-full bg-gold" />

const Star = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M24 4c1.6 0 2.4 1 3.2 3l3.3 8.1 8.7.7c2.1.2 3.2.8 3.6 2.1.4 1.3-.2 2.3-1.8 3.7l-6.6 5.6 2 8.5c.5 2.1.3 3.2-.8 4-1.1.8-2.3.6-4.1-.5L24 34.6l-7.5 4.6c-1.8 1.1-3 1.3-4.1.5-1.1-.8-1.3-1.9-.8-4l2-8.5-6.6-5.6C5.4 20.2 4.8 19.2 5.2 17.9c.4-1.3 1.5-1.9 3.6-2.1l8.7-.7L20.8 7c.8-2 1.6-3 3.2-3Z"
    />
  </svg>
)

const Cloud = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 80 48" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M20 46C9 46 2 39.5 2 31.5 2 23.8 8.3 18 16 17.6 18.4 8.6 26.3 2 36 2c9.4 0 17.2 6.2 19.6 14.7C68 16.5 78 23.4 78 32.5 78 40.5 71.3 46 62 46H20Z"
    />
  </svg>
)
