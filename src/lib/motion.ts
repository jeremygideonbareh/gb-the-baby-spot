import { useEffect } from 'react'

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP_MOTION = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
