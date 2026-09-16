import { useRef } from 'react'
import { products, site } from '../data/content'
import { useMotion } from '../lib/motion'
import { waLink } from '../lib/whatsapp'
import { BagIcon, PhoneIcon, TruckIcon, WhatsAppIcon } from './Icons'
import { Picture } from './ui'

/**
 * The ordering story, told sideways on desktop and top to bottom on phones.
 * Every claim here matches the shop's own Instagram: new arrivals, sizes by
 * age, orders by WhatsApp or call, home delivery.
 */
const panels = [
  {
    kicker: 'Step one',
    title: 'Something new lands',
    body: 'Fresh pieces arrive at the shop and go straight onto our Instagram. The newest ones sit at the top of this page.',
    image: 'lace-pants-pink',
    icon: BagIcon,
    tint: 'bg-blush',
  },
  {
    kicker: 'Step two',
    title: 'You pick a size',
    body: 'Choose the age or size, and a colour if the piece comes in a few. Not sure? Pick “Not sure” and we will work it out together.',
    image: 'lilac-bellies',
    icon: BagIcon,
    tint: 'bg-mint-soft',
  },
  {
    kicker: 'Step three',
    title: 'Your message flies to us',
    body: 'One tap opens WhatsApp with the whole order already written out. Or call us on 94363 35562 if that is easier.',
    image: 'cream-bow-strap',
    icon: PhoneIcon,
    tint: 'bg-[#f7ebcc]',
  },
  {
    kicker: 'Step four',
    title: 'It comes to your door',
    body: 'We confirm the price, wrap it up and bring it home to you. Or come and say hello below Brand Hub in Nongthymmai.',
    image: 'baby-wrapper-dino',
    icon: TruckIcon,
    tint: 'bg-sage-soft',
  },
]

export function Story() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const thread = useRef<SVGPathElement>(null)
  useMotion((m) => {
    const stop = [
      section.current && track.current ? m.initStory(section.current, track.current) : () => {},
      thread.current ? m.initThread(thread.current) : () => {},
    ]
    return () => stop.forEach((fn) => fn())
  })

  const sample = products[0]

  return (
    <section
      ref={section}
      id="how"
      aria-labelledby="story-title"
      data-tint="#fdf7ef"
      className="relative overflow-hidden py-16 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0 lg:pt-24 lg:pb-12"
    >
      <div className="container-x relative z-10 shrink-0">
        <p className="eyebrow">Ordering, start to finish</p>
        <h2 id="story-title" className="mt-2 text-[2.1rem] sm:text-5xl">
          <span data-split className="block">
            From our shelf to your door
          </span>
        </h2>
      </div>

      <div
        ref={track}
        className="relative mt-8 flex w-full flex-col gap-5 px-5 sm:px-8 lg:mt-8 lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:px-[8vw]"
      >
        <svg
          aria-hidden
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 hidden h-10 w-full lg:block"
        >
          <path
            ref={thread}
            d="M0 20c120-16 220 16 340 0s220-16 340 0 200 12 320-4"
            fill="none"
            stroke="#c79a2e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 14"
            opacity="0.5"
          />
        </svg>
        {panels.map((panel, i) => (
          <article
            key={panel.title}
            data-panel
            className={`story-panel relative z-10 flex flex-col gap-4 rounded-[2rem] p-5 sm:p-7 ${panel.tint} lg:w-[42rem] lg:flex-row lg:items-center lg:gap-8 lg:p-9`}
          >
            <div data-panel-media className="relative shrink-0 lg:w-[19rem]">
              <Picture
                name={panel.image}
                alt=""
                sizes="(min-width: 1024px) 304px, 88vw"
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-lift lg:aspect-[4/5]"
              />
              <span className="absolute -top-3 -left-3 grid size-12 place-items-center rounded-full bg-cocoa font-display text-xl font-bold text-cream shadow-soft">
                {i + 1}
              </span>
            </div>
            <div data-panel-copy className="min-w-0">
              <p className="eyebrow">{panel.kicker}</p>
              <h3 className="mt-2 flex items-start gap-3 text-3xl sm:text-4xl">
                <panel.icon className="mt-1 size-7 shrink-0 text-gold-deep" />
                {panel.title}
              </h3>
              <p className="mt-3 text-lg text-cocoa-soft">{panel.body}</p>
              {i === panels.length - 1 && (
                <a
                  href={waLink(
                    `Hi ${site.name}! I'd like to order:\n\n• ${sample.name}\n   Size/age: \n   Quantity: 1\n\nHome delivery please.`,
                  )}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-order mt-5"
                >
                  <WhatsAppIcon className="size-5" /> Start an order
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
