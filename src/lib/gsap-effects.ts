import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESKTOP_MOTION, MOTION_OK } from './motion'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

/** Headings arrive a word at a time, rising out from behind a mask. */
export function initSplitHeadings(root: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    gsap.utils.toArray<HTMLElement>('[data-split]', root).forEach((heading) => {
      if (heading.dataset.splitReady) return
      const words = (heading.textContent ?? '').split(/\s+/).filter(Boolean)
      heading.textContent = ''
      const spans = words.map((word, i) => {
        const mask = document.createElement('span')
        mask.className = 'split-mask'
        const inner = document.createElement('span')
        inner.className = 'split-word'
        inner.textContent = i === words.length - 1 ? word : `${word} `
        mask.append(inner)
        heading.append(mask)
        return inner
      })
      heading.dataset.splitReady = 'true'
      gsap.from(spans, {
        yPercent: 115,
        rotate: 4,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.055,
        scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
      })
    })
  })
  return () => mm.revert()
}

/** Photos wipe open from the bottom as they scroll into view. */
export function initImageMasks(root: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    gsap.utils.toArray<HTMLElement>('[data-mask]', root).forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(14% 8% 26% 8% round 1.5rem)', scale: 1.06 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
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

/** The page background drifts between brand tints, section by section. */
export function initSectionTints(root: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-tint]', root)
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (!self.isActive) return
          gsap.to(document.body, {
            backgroundColor: section.dataset.tint!,
            duration: 0.8,
            ease: 'power1.out',
            overwrite: true,
          })
        },
      })
    })
  })
  return () => mm.revert()
}

/** A thin gold line across the top that tracks how far down the page you are. */
export function initScrollProgress(bar: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
    )
  })
  return () => mm.revert()
}

/** The hero collage leans towards the pointer and drifts as you scroll away. */
export function initHeroScene(root: HTMLElement) {
  const mm = gsap.matchMedia()

  mm.add(MOTION_OK, () => {
    const photos = gsap.utils.toArray<HTMLElement>('[data-parallax]', root)

    // Scroll: the photos drift apart and the whole scene eases back.
    photos.forEach((el, i) => {
      gsap.to(el, {
        y: (i % 2 ? 1 : -1) * (60 + i * 18),
        rotate: (i % 2 ? 1 : -1) * 4,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.7 },
      })
    })

    // Idle float, so the collage is never completely still.
    photos.forEach((el, i) => {
      gsap.to(el, {
        yPercent: i % 2 ? 2.5 : -2.5,
        duration: 3 + i * 0.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
  })

  // Pointer depth, desktop only.
  mm.add(DESKTOP_MOTION, () => {
    const stage = root.querySelector<HTMLElement>('[data-stage]')
    if (!stage) return
    const layers = gsap.utils.toArray<HTMLElement>('[data-depth]', root)
    const setters = layers.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
      depth: Number(el.dataset.depth ?? 1),
    }))
    const rx = gsap.quickTo(stage, 'rotationX', { duration: 0.9, ease: 'power3.out' })
    const ry = gsap.quickTo(stage, 'rotationY', { duration: 0.9, ease: 'power3.out' })
    gsap.set(stage, { transformPerspective: 1000, transformStyle: 'preserve-3d' })

    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry(px * 9)
      rx(-py * 7)
      setters.forEach((s) => {
        s.x(px * 26 * s.depth)
        s.y(py * 22 * s.depth)
      })
    }
    const leave = () => {
      rx(0)
      ry(0)
      setters.forEach((s) => {
        s.x(0)
        s.y(0)
      })
    }
    root.addEventListener('pointermove', move)
    root.addEventListener('pointerleave', leave)
    return () => {
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerleave', leave)
    }
  })

  return () => mm.revert()
}

/** Product cards tilt with their photo and label lifting off the card. */
export function attachTilt(el: HTMLElement) {
  if (!window.matchMedia(DESKTOP_MOTION).matches) return () => {}
  gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' })
  const lift = el.querySelector<HTMLElement>('[data-lift]')
  const rx = gsap.quickTo(el, 'rotationX', { duration: 0.45, ease: 'power2.out' })
  const ry = gsap.quickTo(el, 'rotationY', { duration: 0.45, ease: 'power2.out' })
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    ry(((e.clientX - r.left) / r.width - 0.5) * 13)
    rx(-((e.clientY - r.top) / r.height - 0.5) * 13)
  }
  const enter = () => {
    gsap.to(el, { scale: 1.02, z: 24, duration: 0.4, ease: 'power2.out' })
    if (lift) gsap.to(lift, { z: 46, duration: 0.4, ease: 'power2.out' })
  }
  const leave = () => {
    rx(0)
    ry(0)
    gsap.to(el, { scale: 1, z: 0, duration: 0.5, ease: 'power2.out' })
    if (lift) gsap.to(lift, { z: 0, duration: 0.5, ease: 'power2.out' })
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerenter', enter)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerenter', enter)
    el.removeEventListener('pointerleave', leave)
  }
}

/** Buttons lean towards the pointer when it gets close. */
export function attachMagnet(el: HTMLElement) {
  if (!window.matchMedia(DESKTOP_MOTION).matches) return () => {}
  const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
  const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    x((e.clientX - (r.left + r.width / 2)) * 0.28)
    y((e.clientY - (r.top + r.height / 2)) * 0.34)
  }
  const leave = () => {
    x(0)
    y(0)
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  }
}

/** The category strip turns like a carousel as the pinned section scrolls. */
export function initCategoryRing(section: HTMLElement, viewport: HTMLElement, track: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(DESKTOP_MOTION, () => {
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
    if (distance() < 40) return
    viewport.classList.add('lg:!overflow-visible')
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', track)
    gsap.set(track, { transformPerspective: 1400, transformStyle: 'preserve-3d' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance() + 200}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })
    tl.to(track, { x: () => -distance(), ease: 'none' }, 0)

    // Cards turn towards the middle of the screen as they pass.
    cards.forEach((card) => {
      gsap.to(card, {
        rotationY: () => {
          const c = card.getBoundingClientRect()
          return gsap.utils.clamp(-22, 22, ((c.left + c.width / 2) / window.innerWidth - 0.5) * -34)
        },
        z: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance() + 200}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => viewport.classList.remove('lg:!overflow-visible')
  })
  return () => mm.revert()
}

/** The three ordering steps play out while the section is pinned. */
export function initSteps(section: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(DESKTOP_MOTION, () => {
    const steps = gsap.utils.toArray<HTMLElement>('[data-step]', section)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top top', end: '+=900', pin: true, scrub: 0.6 },
    })
    steps.forEach((step, i) => {
      tl.fromTo(
        step,
        { autoAlpha: i === 0 ? 1 : 0.25, scale: i === 0 ? 1 : 0.94, y: i === 0 ? 0 : 30 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
        i,
      )
      if (i < steps.length - 1) tl.to(step, { autoAlpha: 0.25, scale: 0.94, y: -20, duration: 1 }, i + 1)
    })
    // leave the section with all three steps readable
    tl.to(steps, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6 }, steps.length)
  })
  // Phones just reveal them in sequence.
  mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-step]', section).forEach((step) => {
      gsap.from(step, {
        autoAlpha: 0,
        y: 26,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
      })
    })
  })
  return () => mm.revert()
}

/** The marquee leans into whichever way you're scrolling. */
export function initMarquee(track: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    const half = track.scrollWidth / 2
    const loop = gsap.to(track, { x: -half, duration: 26, ease: 'none', repeat: -1 })
    const setSpeed = gsap.quickTo(loop, 'timeScale', { duration: 0.4, ease: 'power2.out' })
    let settle = 0
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(0, 3.5, Math.abs(self.getVelocity()) / 260)
        setSpeed(1 + v)
        clearTimeout(settle)
        settle = window.setTimeout(() => setSpeed(1), 260)
      },
    })
    return () => {
      clearTimeout(settle)
      loop.kill()
      st.kill()
    }
  })
  return () => mm.revert()
}

/** The photo you just added curves up into the bag in the header. */
export function flyToBag(from: HTMLImageElement | null) {
  const target = document.getElementById('bag-button')
  if (!from || !target || reduced()) return
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
    willChange: 'transform',
  })
  document.body.append(clone)
  const scale = 44 / start.width
  gsap
    .timeline({ onComplete: () => clone.remove() })
    .to(clone, {
      // transforms only, so the flight stays smooth on slower phones
      x: end.left + end.width / 2 - (start.left + start.width / 2),
      y: end.top + end.height / 2 - (start.top + start.height / 2),
      scale,
      rotate: 14,
      borderRadius: '50%',
      duration: 0.7,
      ease: 'power2.inOut',
    })
    .to(clone, { autoAlpha: 0, scale: scale * 0.5, duration: 0.18, ease: 'power1.in' }, '-=0.12')
  burst(end.left + end.width / 2, end.top + end.height / 2)
}

/** A small puff of brand-coloured sparkles. */
export function burst(x: number, y: number) {
  if (reduced()) return
  const colours = ['#c79a2e', '#f6dce4', '#a9d8c8', '#9fb693']
  const bits = Array.from({ length: 12 }, (_, i) => {
    const bit = document.createElement('span')
    Object.assign(bit.style, {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      width: '9px',
      height: '9px',
      borderRadius: i % 3 ? '50%' : '2px',
      background: colours[i % colours.length],
      zIndex: '95',
      pointerEvents: 'none',
    })
    document.body.append(bit)
    return bit
  })
  gsap.to(bits, {
    x: () => gsap.utils.random(-70, 70),
    y: () => gsap.utils.random(-70, 30),
    scale: 0,
    rotate: () => gsap.utils.random(-180, 180),
    duration: 0.75,
    ease: 'power2.out',
    stagger: 0.012,
    onComplete: () => bits.forEach((b) => b.remove()),
  })
}

/** A little wave from the floating WhatsApp button, every so often. */
export function initWiggle(el: HTMLElement) {
  const mm = gsap.matchMedia()
  mm.add(MOTION_OK, () => {
    const tl = gsap.timeline({ repeat: 1, repeatDelay: 9, delay: 5 })
    tl.to(el, { rotate: -9, duration: 0.14, ease: 'power2.out' })
      .to(el, { rotate: 9, duration: 0.14, ease: 'power2.inOut', repeat: 2, yoyo: true })
      .to(el, { rotate: 0, duration: 0.2, ease: 'power2.out' })
    return () => tl.kill()
  })
  return () => mm.revert()
}
