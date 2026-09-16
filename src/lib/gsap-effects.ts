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

/** Hand-drawn underline that draws itself when a section heading arrives. */
export function initUnderlines(root: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    gsap.utils.toArray<SVGPathElement>('[data-squiggle] path', root).forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: path, start: 'top 88%', once: true },
      })
    })
  })
  return () => mm.revert()
}

/** The hero photos drift at slightly different speeds as you scroll past. */
export function initHeroParallax(root: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 ? 26 : -26,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
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

/** The photo you just added curves up into the bag in the header. */
export function flyToBag(from: HTMLImageElement | null) {
  const target = document.getElementById('bag-button')
  if (!from || !target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const start = from.getBoundingClientRect()
  const end = target.getBoundingClientRect()
  const clone = from.cloneNode() as HTMLImageElement
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${start.left}px`,
    top: `${start.top}px`,
    width: `${start.width}px`,
    height: `${start.height}px`,
    borderRadius: '1rem',
    objectFit: 'cover',
    zIndex: '90',
    pointerEvents: 'none',
  })
  document.body.append(clone)
  gsap
    .timeline({ onComplete: () => clone.remove() })
    .to(clone, {
      left: end.left + end.width / 2 - 22,
      top: end.top + end.height / 2 - 22,
      width: 44,
      height: 44,
      rotate: 14,
      borderRadius: '50%',
      duration: 0.7,
      ease: 'power2.inOut',
    })
    .to(clone, { autoAlpha: 0, scale: 0.4, duration: 0.18, ease: 'power1.in' }, '-=0.12')
}

/** A little wave from the floating WhatsApp button, every so often. */
export function initWiggle(el: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 9, delay: 5 })
    tl.to(el, { rotate: -9, duration: 0.14, ease: 'power2.out' })
      .to(el, { rotate: 9, duration: 0.14, ease: 'power2.inOut', repeat: 2, yoyo: true })
      .to(el, { rotate: 0, duration: 0.2, ease: 'power2.out' })
    return () => tl.kill()
  })
  return () => mm.revert()
}
