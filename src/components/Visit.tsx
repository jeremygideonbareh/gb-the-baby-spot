import { useState } from 'react'
import { address, hours, site } from '../data/content'
import { waLink } from '../lib/whatsapp'
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons'
import { Picture, SectionHead, T } from './ui'

export function Visit() {
  const [showMap, setShowMap] = useState(false)

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

          </div>

          <div className="grid gap-6">
          <figure className="relative mx-auto w-full max-w-[20rem] overflow-hidden rounded-[2rem] shadow-soft" data-reveal>
            <Picture
              name="store-hello"
              alt="Our shop front with the 'Hello parents and parents-to-be' sign"
              sizes="(min-width: 640px) 320px, 88vw"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-paper/95 p-4 text-base">
              <span className="font-bold">Look for the Brand Hub sign.</span> Our shop is right below it.
            </figcaption>
          </figure>

          <div className="overflow-hidden rounded-[2rem] bg-paper shadow-soft" data-reveal>
            {showMap ? (
              <div className="p-2 pb-0">
                <iframe
                  title="Map of Nongthymmai, Shillong"
                  src={address.mapEmbed}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[1.5rem] border-0"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(12rem_9rem_at_50%_35%,#dff1ea_0%,#fffdf9_70%)] p-6 text-center transition-transform active:scale-[0.98]"
              >
                <span className="grid size-14 place-items-center rounded-full bg-mint-soft text-cocoa">
                  <PinIcon />
                </span>
                <span className="font-display text-2xl font-semibold">Show the map</span>
                <span className="text-cocoa-soft">Loads only when you tap it</span>
              </button>
            )}
            <p className="px-5 py-3 text-base text-cocoa-soft">
              Map shows the Nongthymmai area
              <span className="demo-tag">to confirm</span>
              <a href={address.mapUrl} target="_blank" rel="noopener" className="ml-1 font-bold text-cocoa underline underline-offset-4">
                Open in Maps
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
