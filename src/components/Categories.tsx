import { useRef } from 'react'
import { categories, products, type Category, type CategoryId } from '../data/content'
import { DESKTOP_MOTION, useMotion } from '../lib/motion'
import { ArrowIcon } from './Icons'
import { Picture, SectionHead } from './ui'

export const tintClass: Record<Category['tint'], string> = {
  blush: 'bg-blush',
  mint: 'bg-mint-soft',
  sage: 'bg-sage-soft',
  gold: 'bg-[#f7ebcc]',
  cream: 'bg-paper',
}

export function Categories({ onPick }: { onPick: (id: CategoryId) => void }) {
  const section = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)

  // The site's only pinned moment: a short horizontal strip on desktop.
  // Phones (and reduced motion) keep a native swipe row.
  useMotion(({ gsap }) => {
    const mm = gsap.matchMedia()
    mm.add(DESKTOP_MOTION, () => {
      const vp = viewport.current!
      const tr = track.current!
      const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth)
      if (distance() < 40) return
      vp.classList.add('lg:!overflow-visible')
      gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      return () => vp.classList.remove('lg:!overflow-visible')
    })
    return () => mm.revert()
  })

  return (
    <section ref={section} id="categories" aria-labelledby="cat-title" className="overflow-hidden py-16 sm:py-20 lg:pt-24 lg:pb-14">
      <div className="container-x">
        <SectionHead
          id="cat-title"
          eyebrow="Shop by category"
          title="Straight from our Instagram highlights"
          body="Tap a category to see what's in the shop, or ask us on WhatsApp what just arrived."
        />
      </div>

      <div ref={viewport} className="swipe-row mt-8 overflow-x-auto pb-4 lg:mt-12">
        <ul
          ref={track}
          className="flex w-max gap-4 px-5 sm:px-8 lg:gap-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length
            return (
              <li key={c.id} className="w-[15.5rem] sm:w-[17rem] lg:w-[19rem]">
                <button
                  type="button"
                  onClick={() => onPick(c.id)}
                  className={`group flex h-full w-full flex-col items-start rounded-[2rem] p-5 text-left ring-1 ring-cocoa/8 transition-transform duration-150 active:scale-[0.97] ${tintClass[c.tint]}`}
                >
                  <span className="relative block rounded-full bg-gradient-to-tr from-gold via-blush-deep to-mint p-[3px]">
                    <Picture
                      name={c.cover}
                      alt=""
                      sizes="112px"
                      className="size-24 rounded-full border-[3px] border-paper object-cover sm:size-28"
                    />
                  </span>
                  <span className="mt-5 font-display text-2xl font-semibold">{c.label}</span>
                  <span className="mt-1 text-cocoa-soft">{c.blurb}</span>
                  <span className="mt-auto flex w-full items-center justify-between pt-6 font-bold">
                    <span className="text-base">
                      {count ? `${count} ${count === 1 ? 'style' : 'styles'} online` : 'Ask what’s in stock'}
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-cocoa text-cream transition-transform group-hover:translate-x-1">
                      <ArrowIcon className="size-5" />
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
