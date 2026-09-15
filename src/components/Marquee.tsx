import { marquee } from '../data/content'

export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((m) => (
        <li key={m} className="flex items-center gap-6 pr-6 font-display text-xl whitespace-nowrap sm:text-2xl">
          {m}
          <svg viewBox="0 0 20 20" className="size-4 text-gold" aria-hidden>
            <path fill="currentColor" d="M10 0l2.6 7.4L20 10l-7.4 2.6L10 20l-2.6-7.4L0 10l7.4-2.6z" />
          </svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden border-y border-cocoa/10 bg-blush/60 py-4" role="region" aria-label="What we offer">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
