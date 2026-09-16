import { useEffect } from 'react'

/**
 * Motion is on unless the visitor (or their system) asks for less.
 * `html[data-motion]` is set by the inline script in index.html before
 * anything paints, and the toggle in the header flips it.
 */
export const motionOn = () =>
  typeof document !== 'undefined' && document.documentElement.dataset.motion !== 'off'

export const systemPrefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Media queries for gsap.matchMedia. The motion switch is checked separately. */
export const MOTION_OK = 'all'
export const DESKTOP_MOTION = '(min-width: 1024px) and (pointer: fine)'

/** Kept for call sites that just want to know whether to skip an effect. */
export const prefersReducedMotion = () => !motionOn()

type Effects = typeof import('./gsap-effects')
let loading: Promise<Effects> | null = null

const whenIdle = () =>
  new Promise<void>((resolve) => {
    const idle = () =>
      'requestIdleCallback' in window ? requestIdleCallback(() => resolve(), { timeout: 1200 }) : setTimeout(resolve, 200)
    if (document.readyState === 'complete') idle()
    else window.addEventListener('load', idle, { once: true })
  })

/** GSAP loads once the page is idle, so motion never competes with the first paint. */
export const loadMotion = () => (loading ??= whenIdle().then(() => import('./gsap-effects')))

/** Run a GSAP effect once the library has loaded; cleans up on unmount. */
export function useMotion(effect: (m: Effects) => void | (() => void), deps: unknown[] = []) {
  useEffect(() => {
    if (!motionOn()) return
    let cleanup: void | (() => void)
    let cancelled = false
    loadMotion().then((m) => {
      if (!cancelled) cleanup = effect(m)
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
