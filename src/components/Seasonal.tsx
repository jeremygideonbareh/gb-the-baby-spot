import { categories, products, seasonal, type CategoryId, type Product } from '../data/content'
import { askLink } from '../lib/whatsapp'
import { tintClass } from './Categories'
import { WhatsAppIcon } from './Icons'
import { Picture, SectionHead } from './ui'

export function Seasonal({ onOrder, onPick }: { onOrder: (p: Product, mode: 'order' | 'add') => void; onPick: (id: CategoryId) => void }) {
  const school = categories.filter((c) => seasonal.school.items.includes(c.id))
  const christmas = categories.find((c) => c.id === 'christmas')!
  const winter = products.filter((p) => p.category === 'winter')

  return (
    <section id="seasonal" aria-labelledby="seasonal-title" className="defer-render py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="seasonal-title"
          eyebrow="Seasonal edits"
          title="Ready for school, ready for winter"
        />

        {/* School essentials */}
        <div className="mt-10 rounded-[2rem] bg-sage-soft p-5 sm:p-8 lg:p-10" data-reveal>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-3xl sm:text-4xl">{seasonal.school.title}</h3>
              <p className="mt-2 max-w-md text-cocoa-soft">{seasonal.school.body}</p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-5">
            {school.map((c) => (
              <li key={c.id} data-reveal className="flex items-center gap-4 rounded-[1.5rem] bg-paper p-4 shadow-soft sm:flex-col sm:items-start sm:p-5">
                <Picture name={c.cover} alt={`${c.label} from our Instagram highlight`} sizes="96px" className="size-20 shrink-0 rounded-2xl object-cover sm:size-24" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-semibold">{c.label}</p>
                  <p className="text-[0.95rem] text-cocoa-soft">{c.blurb}</p>
                  <a
                    href={askLink(c.label.toLowerCase())}
                    target="_blank"
                    rel="noopener"
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-bold text-order underline decoration-order/40 underline-offset-4"
                  >
                    <WhatsAppIcon className="size-4" /> Ask what's in stock
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Winter and Christmas */}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="rounded-[2rem] bg-blush p-5 sm:p-8 lg:p-10" data-reveal>
            <h3 className="text-3xl sm:text-4xl">{seasonal.winter.title}</h3>
            <p className="mt-2 max-w-md text-cocoa-soft">{seasonal.winter.body}</p>
            <ul className="swipe-row -mx-5 mt-6 flex gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
              {winter.slice(0, 3).map((p) => (
                <li key={p.id} className="w-[11.5rem] shrink-0 lg:w-auto">
                  <button type="button" onClick={() => onOrder(p, 'order')} className="group block w-full text-left transition-transform active:scale-[0.97]">
                    <Picture
                      name={p.images[0]}
                      alt=""
                      sizes="(min-width: 1024px) 200px, 184px"
                      className="aspect-[4/5] w-full rounded-[1.25rem] object-cover shadow-soft"
                    />
                    <span className="mt-2 block leading-snug font-bold group-hover:underline">{p.name}</span>
                    <span className="block text-[0.95rem] text-cocoa-soft">DM for price · tap to order</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => onPick('winter')} className="btn btn-soft mt-5">
              See all winter wear
            </button>
          </div>

          <div className={`flex flex-col rounded-[2rem] p-5 sm:p-8 ${tintClass.cream} ring-1 ring-cocoa/8`} data-reveal>
            <Picture
              name={christmas.cover}
              alt="Christmas savings poster from our Instagram: big deals, crazy deals, free gift wrapping"
              sizes="300px"
              className="aspect-square w-full max-w-[11rem] rounded-[1.5rem] object-cover shadow-soft"
            />
            <h3 className="mt-5 text-3xl">Christmas deals</h3>
            <p className="mt-2 text-cocoa-soft">Big deals on gifts for little ones, with free gift wrapping at the shop.</p>
            <a href={askLink('Christmas deals')} target="_blank" rel="noopener" className="btn btn-order mt-5 self-start">
              <WhatsAppIcon className="size-5" /> Ask about deals
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
