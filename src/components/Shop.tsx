import { useRef } from 'react'
import { categories, products, type CategoryId, type Product } from '../data/content'
import { useMotion } from '../lib/motion'
import { askLink } from '../lib/whatsapp'
import { BagIcon, PlayIcon, WhatsAppIcon } from './Icons'
import { Picture, SectionHead } from './ui'

export type Filter = CategoryId | 'all'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Formatted by hand so server and browser output match exactly
const shortDate = (iso: string) => {
  const [, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]}`
}
export const priceLabel = (p: Product) => (p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'DM for price')

export function Shop({
  filter,
  setFilter,
  onOrder,
}: {
  filter: Filter
  setFilter: (f: Filter) => void
  onOrder: (p: Product, mode: 'order' | 'add') => void
}) {
  const visible = filter === 'all' ? products : products.filter((p) => p.category === filter)
  const active = categories.find((c) => c.id === filter)

  return (
    <section id="shop" aria-labelledby="shop-title" className="bg-paper py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="shop-title"
          eyebrow="New arrivals"
          title="Fresh from the shop floor"
          body="The latest pieces from our Instagram. Pick a size and send your order on WhatsApp in a tap."
        />

        <div className="swipe-row -mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter by category">
          <div className="flex w-max gap-2 pb-1 sm:w-auto sm:flex-wrap">
            <button type="button" className="chip" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All pieces
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length ? `${visible.length} products shown` : `No ${active?.label} online yet`}
        </p>

        {visible.length ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onOrder={onOrder} />
            ))}
          </ul>
        ) : (
          active && (
            <div className="mt-8 flex flex-col items-center gap-5 rounded-[2rem] bg-cream p-8 text-center ring-1 ring-cocoa/8 sm:flex-row sm:text-left">
              <Picture name={active.cover} alt="" sizes="120px" className="size-28 shrink-0 rounded-full object-cover ring-4 ring-paper" />
              <div className="flex-1">
                <h3 className="text-2xl">Ask for today’s {active.label.toLowerCase()}</h3>
                <p className="mt-2 text-cocoa-soft">
                  We show these in our Instagram highlights rather than online. Message us and we'll send photos of
                  what's in stock.
                </p>
              </div>
              <a href={askLink(active.label.toLowerCase())} target="_blank" rel="noopener" className="btn btn-order">
                <WhatsAppIcon className="size-5" /> Ask on WhatsApp
              </a>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export function ProductCard({ product: p, onOrder }: { product: Product; onOrder: (p: Product, mode: 'order' | 'add') => void }) {
  const card = useRef<HTMLDivElement>(null)
  useMotion((m) => (card.current ? m.attachTilt(card.current) : undefined))

  return (
    <li data-reveal className="flex flex-col">
      <div ref={card} className="group relative overflow-hidden rounded-[1.5rem] bg-cream shadow-soft">
        <Picture
          name={p.images[0]}
          alt={p.name}
          sizes="(min-width: 1024px) 270px, (min-width: 768px) 30vw, 45vw"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 text-xs font-bold text-cocoa">
          {shortDate(p.postedOn)}
        </span>
        <button
          type="button"
          onClick={() => onOrder(p, 'add')}
          className="btn-icon absolute right-2.5 bottom-2.5 size-11 bg-paper/95 text-cocoa shadow-soft hover:bg-white"
          aria-label={`Add ${p.name} to your list`}
        >
          <BagIcon className="size-5" />
        </button>
        {p.isReel && (
          <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-cocoa/70 text-white" title="From a reel">
            <PlayIcon className="size-4" />
            <span className="sr-only">From a reel</span>
          </span>
        )}
      </div>
      <h3 className="mt-3 font-sans text-[1.05rem] leading-snug font-bold tracking-normal">{p.name}</h3>
      <p className="mt-0.5 mb-3 text-[0.95rem] text-cocoa-soft">
        {priceLabel(p)}
        {p.colours && <span> · {p.colours.length} colours</span>}
      </p>
      <button
        type="button"
        onClick={() => onOrder(p, 'order')}
        className="btn btn-order mt-auto min-h-11 w-full gap-1.5 px-2 text-[0.9rem] sm:text-base"
      >
        <WhatsAppIcon className="size-[1.1rem] shrink-0" />
        Order on WhatsApp
        <span className="sr-only">: {p.name}</span>
      </button>
    </li>
  )
}
