import { useEffect, useState } from 'react'
import { motionOn, systemPrefersReduced } from '../lib/motion'

/**
 * Lets a visitor turn the animation on or off. It starts from their system
 * setting, but their choice here wins and is remembered. Reloading is the
 * simplest honest way to rebuild every scroll timeline from scratch.
 */
export function MotionToggle() {
  const [on, setOn] = useState(true)
  const [nudge, setNudge] = useState(false)

  useEffect(() => {
    setOn(motionOn())
    // If their system asked for less motion and they haven't chosen here yet,
    // point out that the animation can be switched on.
    let saved: string | null = null
    try {
      saved = localStorage.getItem('gb-motion')
    } catch {
      // storage unavailable
    }
    setNudge(!saved && systemPrefersReduced())
  }, [])

  const toggle = () => {
    const next = on ? 'off' : 'on'
    try {
      localStorage.setItem('gb-motion', next)
    } catch {
      // storage unavailable: the choice still applies to this page
    }
    document.documentElement.dataset.motion = next
    setOn(!on)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className="btn-soft inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-base font-bold ring-1 ring-cocoa/15 transition-transform active:scale-95"
        title={on ? 'Turn the animation off' : 'Turn the animation on'}
      >
        <span aria-hidden className={`grid size-6 place-items-center rounded-full ${on ? 'bg-gold/25' : 'bg-cocoa/10'}`}>
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {on ? <path d="M5 12h3l2-5 3 10 2-5h4" /> : <path d="M5 12h14" />}
          </svg>
        </span>
        <span className="hidden sm:inline">Motion {on ? 'on' : 'off'}</span>
        <span className="sr-only sm:hidden">Motion is {on ? 'on' : 'off'}. Turn it {on ? 'off' : 'on'}.</span>
      </button>

      {nudge && !on && (
        <span className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-cocoa px-3 py-2 text-base text-cream shadow-lift">
          Your device asks for less motion, so the animation is off. Tap to switch it on.
        </span>
      )}
    </div>
  )
}
