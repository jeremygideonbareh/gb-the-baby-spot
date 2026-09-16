import { useRef } from 'react'
import { products, site } from '../data/content'
import { useMotion } from '../lib/motion'
import { waLink } from '../lib/whatsapp'
import { BagIcon, TruckIcon, WhatsAppIcon } from './Icons'
import { Picture, SectionHead } from './ui'

const steps = [
  {
    title: 'Pick a piece',
    body: 'Browse the latest arrivals and choose a size or age. Not sure? Pick “Not sure” and we will help.',
    icon: BagIcon,
    image: 'lilac-bellies',
    tint: 'bg-blush',
  },
  {
    title: 'Send it on WhatsApp',
    body: 'One tap opens WhatsApp with your order already written out, home delivery included.',
    icon: WhatsAppIcon,
    image: 'lace-pants-pink',
    tint: 'bg-mint-soft',
  },
  {
    title: 'We bring it home',
    body: 'We confirm the price, then it comes to your door. Or collect it below Brand Hub.',
    icon: TruckIcon,
    image: 'baby-wrapper-dino',
    tint: 'bg-[#f7ebcc]',
  },
]

export function HowItWorks() {
  const section = useRef<HTMLElement>(null)
  useMotion((m) => (section.current ? m.initSteps(section.current) : undefined))

  const sample = products[0]

  return (
    <section
      ref={section}
      id="how"
      aria-labelledby="how-title"
      className="relative overflow-hidden bg-paper py-16 sm:py-24 lg:flex lg:min-h-screen lg:flex-col lg:justify-center"
    >
      <div className="container-x">
        <SectionHead
          id="how-title"
          eyebrow="Ordering is three taps"
          title="How it works"
          body="No accounts, no checkout forms. Just a message with everything we need."
        />

        <ol className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-step
              className={`flex items-start gap-4 rounded-[2rem] p-5 sm:p-6 ${step.tint} lg:flex-col`}
            >
              <div className="relative shrink-0">
                <Picture
                  name={step.image}
                  alt=""
                  sizes="(min-width: 1024px) 300px, 88px"
                  className="size-22 rounded-2xl object-cover shadow-soft lg:aspect-[5/4] lg:size-auto lg:w-full lg:rounded-[1.25rem]"
                />
                <span className="absolute -top-2 -left-2 grid size-9 place-items-center rounded-full bg-cocoa font-display text-lg font-bold text-cream">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 text-2xl">
                  <step.icon className="size-6 shrink-0 text-gold-deep" />
                  {step.title}
                </h3>
                <p className="mt-1.5 text-cocoa-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={waLink(
              `Hi ${site.name}! I'd like to order:\n\n• ${sample.name}\n   Size/age: \n   Quantity: 1\n\nHome delivery please.`,
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-order text-lg"
          >
            <WhatsAppIcon className="size-5" /> Try it now
          </a>
          <p className="text-cocoa-soft">Opens a real message you can edit before sending.</p>
        </div>
      </div>
    </section>
  )
}
