import { reasons } from '../data/content'
import { CakeIcon, ChatIcon, PinIcon, TruckIcon } from './Icons'
import { Picture, SectionHead } from './ui'

const icons = { truck: TruckIcon, chat: ChatIcon, pin: PinIcon, cake: CakeIcon }
const tints = ['bg-mint-soft', 'bg-blush', 'bg-[#f7ebcc]', 'bg-sage-soft']

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="defer-render bg-paper py-16 sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="relative order-2 mx-auto w-full max-w-md lg:order-1">
          <Picture
            name="shoe-wall"
            alt="A wall of kids' shoes inside G.B The Baby Spot"
            sizes="(min-width: 1024px) 420px, 80vw"
            className="aspect-[4/5] w-[78%] rounded-[2rem] object-cover shadow-lift"
            data-reveal
          />
          <div className="absolute right-0 -bottom-6 w-[46%] rotate-3 rounded-[1.5rem] bg-paper p-1.5 shadow-lift" data-reveal>
            <Picture
              name="store-front"
              alt="The shop entrance below the Brand Hub signboard"
              sizes="200px"
              className="aspect-[4/5] w-full rounded-[1.2rem] object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHead id="why-title" eyebrow="Why parents choose us" title="Little shop, big care" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {reasons.map((r, i) => {
              const Icon = icons[r.icon as keyof typeof icons]
              return (
                <li key={r.title} data-reveal className={`rounded-[1.5rem] p-5 ${tints[i]}`}>
                  <span className="grid size-12 place-items-center rounded-full bg-paper text-cocoa shadow-soft">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-xl sm:text-2xl">{r.title}</h3>
                  <p className="mt-1.5 text-cocoa-soft">{r.body}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
