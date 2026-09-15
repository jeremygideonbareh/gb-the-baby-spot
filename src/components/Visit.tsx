import { address, hours, site } from '../data/content'
import { waLink } from '../lib/whatsapp'
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons'
import { Picture, SectionHead, T } from './ui'

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="defer-render py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="visit-title"
          eyebrow="Visit or message us"
          title="Come say hello"
          body="We've moved. Find us right below Brand Hub in Nongthymmai, or order from home."
        />

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-[2rem] bg-paper p-6 shadow-soft sm:p-8" data-reveal>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2.5 font-bold">
                  <PinIcon className="size-6 shrink-0 text-gold-deep" /> Address
                </dt>
                <dd className="mt-1 pl-[2.125rem] text-cocoa-soft">
                  {site.name}
                  <br />
                  {address.line1}, {address.line2}
                  <br />
                  {address.city} <T value={address.pincode} />
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2.5 font-bold">
                  <ClockIcon className="size-6 shrink-0 text-gold-deep" /> Opening hours
                </dt>
                {hours.map((h) => (
                  <dd key={h.days} className="mt-1 pl-[2.125rem] text-cocoa-soft">
                    <span className="font-semibold text-cocoa">{h.days}:</span>{' '}
                    <span className="whitespace-nowrap">
                      <T value={h.time} />
                    </span>
                  </dd>
                ))}
              </div>
            </dl>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={waLink(`Hi ${site.name}! I have a question.`)}
                target="_blank"
                rel="noopener"
                className="btn btn-order"
              >
                <WhatsAppIcon className="size-5" /> WhatsApp us
              </a>
              <a href={`tel:+91${site.phone}`} className="btn btn-soft">
                <PhoneIcon className="size-5" /> Call {site.phoneDisplay}
              </a>
              <a href={address.mapUrl} target="_blank" rel="noopener" className="btn btn-soft">
                <PinIcon className="size-5" /> Open in Maps
              </a>
              <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-soft">
                <InstagramIcon className="size-5" /> @{site.handle}
              </a>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-cream p-5">
              <p className="font-display text-xl font-semibold">Ordering from home?</p>
              <ol className="mt-3 grid gap-3 sm:grid-cols-3">
                {['Pick a piece and its size or age', 'Tap Order on WhatsApp and send', 'We confirm the price and deliver home'].map(
                  (step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/20 font-bold text-gold-deep">
                        {i + 1}
                      </span>
                      <span className="text-cocoa-soft">{step}</span>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-soft" data-reveal>
            <Picture
              name="store-hello"
              alt="Our shop front with the 'Hello parents and parents-to-be' sign"
              sizes="(min-width: 640px) 384px, 92vw"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-paper/95 p-4 text-[0.95rem]">
              <span className="font-bold">Look for the Brand Hub sign.</span> Our shop is right below it.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
