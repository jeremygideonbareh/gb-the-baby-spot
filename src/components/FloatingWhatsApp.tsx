import { useRef } from 'react'
import { site } from '../data/content'
import { useBag } from '../lib/bag'
import { useMotion } from '../lib/motion'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './Icons'

/** Phone-only floating button, lifted clear of the iPhone home bar. */
export function FloatingWhatsApp() {
  const { count, open } = useBag()
  const button = useRef<HTMLAnchorElement>(null)
  useMotion((m) => (button.current ? m.initWiggle(button.current) : undefined))
  const cls =
    'btn btn-order fixed right-4 z-30 min-h-14 shadow-lift lg:hidden bottom-[calc(1rem+env(safe-area-inset-bottom))]'

  if (count > 0) {
    return (
      <button type="button" onClick={open} className={cls}>
        <WhatsAppIcon className="size-6" /> Send list ({count})
      </button>
    )
  }
  return (
    <a
      ref={button}
      href={waLink(`Hi ${site.name}! I'd like to order something for my little one. Home delivery please.`)}
      target="_blank"
      rel="noopener"
      className={`${cls} w-14 px-0`}
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
