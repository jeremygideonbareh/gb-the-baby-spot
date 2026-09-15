import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESKTOP_MOTION, MOTION_OK } from './motion'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Soft fade/slide-up reveals for every [data-reveal] element.
 * Played once, lightly staggered, never scrubbed.
 */
export function initReveals(root: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    // Only hide what the visitor hasn't reached yet; anything already on screen stays put.
    const targets = gsap.utils
      .toArray<HTMLElement>('[data-reveal]', root)
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    gsap.set(targets, { autoAlpha: 0, y: 18 })
    ScrollTrigger.batch(targets, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06, overwrite: true }),
    })
  })
  return () => mm.revert()
}

/** Gentle 3D tilt on hover, desktop pointers only. */
export function attachTilt(el: HTMLElement) {
  if (!window.matchMedia(DESKTOP_MOTION).matches) return () => {}
  gsap.set(el, { transformPerspective: 800 })
  const rx = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power2.out' })
  const ry = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power2.out' })
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    ry(((e.clientX - r.left) / r.width - 0.5) * 7)
    rx(-((e.clientY - r.top) / r.height - 0.5) * 7)
  }
  const leave = () => {
    rx(0)
    ry(0)
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  }
}
