import { address, site } from '../data/content'
import { waLink } from '../lib/whatsapp'
import { Picture } from './ui'

export function Footer() {
  return (
    <footer className="defer-render bg-cocoa pt-14 pb-28 text-cream/85 lg:pb-14">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Picture name="logo" alt="" sizes="56px" className="size-14 rounded-full object-cover ring-2 ring-gold/50" />
            <p className="font-display text-2xl text-cream">{site.name}</p>
          </div>
          <p className="mt-4 max-w-xs">
            {site.tagline}. {site.promise}.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-bold text-cream">Shop</p>
          <ul className="mt-2">
            {[
              ['#categories', 'Categories'],
              ['#shop', 'New arrivals'],
              ['#seasonal', 'School and winter'],
              ['#visit', 'Visit us'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-11 items-center hover:text-cream hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-bold text-cream">Say hello</p>
          <ul className="mt-2">
            <li>
              <a href={waLink(`Hi ${site.name}!`)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-cream hover:underline">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-cream hover:underline">
                Instagram @{site.handle}
              </a>
            </li>
            <li className="py-2.5">
              {address.line1}, {address.line2}, {address.city}
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10">
        <div className="flex flex-col gap-2 border-t border-cream/15 pt-6 text-base sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All photos are our own, from @{site.handle}.</p>
          <a href="#top" className="inline-flex min-h-11 items-center hover:text-cream hover:underline sm:min-h-0">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
