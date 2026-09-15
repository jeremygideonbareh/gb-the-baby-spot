import { useEffect, useRef } from 'react'
import { site } from '../data/content'
import { useBag } from '../lib/bag'
import { loadMotion, prefersReducedMotion } from '../lib/motion'
import { BagIcon } from './Icons'
import { Picture } from './ui'

const links = [
  { href: '#categories', label: 'Shop' },
  { href: '#shop', label: 'New arrivals' },
  { href: '#seasonal', label: 'Seasonal' },
  { href: '#visit', label: 'Visit us' },
]

export function Header() {
  const { count, open } = useBag()
  const badge = useRef<HTMLSpanElement>(null)
  const prev = useRef(count)

  // Bounce the badge whenever something is added
  useEffect(() => {
    if (count > prev.current && badge.current && !prefersReducedMotion()) {
      const el = badge.current
      loadMotion().then(({ gsap }) => gsap.fromTo(el, { scale: 0.4 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1.1, 0.4)' }))
    }
    prev.current = count
  }, [count])

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/8 bg-cream/95">
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-18">
        <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label={`${site.name}, back to top`}>
          <Picture
            name="logo"
            alt=""
            sizes="44px"
            eager
            className="logo-pop size-11 rounded-full object-cover ring-2 ring-gold/40"
          />
          <span className="font-display text-lg leading-none font-semibold sm:text-xl">
            G.B <span className="text-gold-deep">The Baby Spot</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 font-bold text-cocoa-soft transition-colors hover:bg-blush/60 hover:text-cocoa"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={open}
          className="btn-icon relative bg-paper ring-1 ring-cocoa/15 hover:ring-cocoa/30"
          aria-label={`Your list, ${count} ${count === 1 ? 'item' : 'items'}`}
        >
          <BagIcon />
          <span
            ref={badge}
            aria-hidden
            className={`absolute -top-1 -right-1 grid min-w-6 place-items-center rounded-full bg-order px-1.5 text-xs leading-6 font-bold text-white ${
              count ? '' : 'scale-0'
            }`}
          >
            {count}
          </span>
        </button>
      </div>
    </header>
  )
}
