import { useEffect, useRef, useState } from 'react'
import { site } from '../data/content'
import { useBag } from '../lib/bag'
import { useMotion } from '../lib/motion'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './Icons'

/** Phone-only floating button, lifted clear of the iPhone home bar. */
export function FloatingWhatsApp() {
  const { count, open } = useBag()
  const button = useRef<HTMLElement>(null)
  const [stepAside, setStepAside] = useState(false)

  // Get out of the way of any on-screen WhatsApp button, so the two never overlap.
  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      // The pill lives bottom-right; step aside for anything that would end up underneath it.
      const zone = { top: window.innerHeight - 150, left: window.innerWidth - 230 }
      const clash = [...document.querySelectorAll('.btn-order, [data-fab-avoid]')].some((el) => {
        if (el.closest('[data-fab]') || el.closest('dialog')) return false
        const r = el.getBoundingClientRect()
        return r.bottom > zone.top && r.top < window.innerHeight && r.right > zone.left
      })
      setStepAside(clash)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      mo.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Re-attached whenever the button swaps between "chat" and "send list",
  // so the wave never runs on a detached element.
  useMotion((m) => (button.current ? m.initWiggle(button.current) : undefined), [count])

  const cls = `btn btn-order fixed right-4 z-30 min-h-14 shadow-lift transition-opacity duration-200 lg:hidden bottom-[calc(1rem+env(safe-area-inset-bottom))] ${
    stepAside ? 'pointer-events-none opacity-0' : 'opacity-100'
  }`

  if (count > 0) {
    return (
      <button ref={button as React.Ref<HTMLButtonElement>} data-fab type="button" onClick={open} className={cls} aria-hidden={stepAside}>
        <WhatsAppIcon className="size-6" /> Send list ({count})
      </button>
    )
  }
  return (
    <a
      ref={button as React.Ref<HTMLAnchorElement>}
      data-fab
      href={waLink(`Hi ${site.name}! I'd like to order something for my little one. Home delivery please.`)}
      target="_blank"
      rel="noopener"
      className={`${cls} w-14 px-0`}
      aria-hidden={stepAside}
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
