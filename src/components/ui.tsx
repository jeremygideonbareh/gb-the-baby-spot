import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { isDemo, site, textOf, type Text } from '../data/content'
import { img } from '../lib/img'

type PictureProps = {
  name: string
  alt: string
  sizes: string
  eager?: boolean
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'alt'>

// One shared observer: below-the-fold photos only start downloading when
// they are about a screen away, so they never compete with the hero.
let observer: IntersectionObserver | null = null
const callbacks = new WeakMap<Element, () => void>()
function watch(el: Element, onNear: () => void) {
  if (typeof IntersectionObserver === 'undefined') return onNear()
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        callbacks.get(e.target)?.()
        observer!.unobserve(e.target)
        callbacks.delete(e.target)
      }
    },
    { rootMargin: '600px 600px' },
  )
  callbacks.set(el, onNear)
  observer.observe(el)
  return () => {
    observer?.unobserve(el)
    callbacks.delete(el)
  }
}

export function Picture({ name, alt, sizes, eager, className, ...rest }: PictureProps) {
  const i = img(name)
  const ref = useRef<HTMLImageElement>(null)
  const [near, setNear] = useState(!!eager)

  useEffect(() => {
    if (near || !ref.current) return
    return watch(ref.current, () => setNear(true))
  }, [near])

  return (
    <img
      ref={ref}
      src={near ? i.src : undefined}
      srcSet={near ? i.srcSet : undefined}
      sizes={sizes}
      width={i.width}
      height={i.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={`bg-blush/40 ${className ?? ''}`}
      {...rest}
    />
  )
}

/** Renders a content value; demo placeholders get a visible "to confirm" tag. */
export function T({ value }: { value: Text }) {
  return (
    <>
      {textOf(value)}
      {isDemo(value) && site.showPlaceholderBadges && (
        <span className="demo-tag" title="Demo placeholder, to be confirmed by the shop">
          to confirm
        </span>
      )}
    </>
  )
}

export function SectionHead({
  eyebrow,
  title,
  body,
  id,
  center,
}: {
  eyebrow: string
  title: string
  body?: string
  id: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 id={id} className="relative mt-3 inline-block text-[2.1rem] sm:text-5xl" data-reveal>
        {title}
        <svg
          data-squiggle
          viewBox="0 0 200 10"
          aria-hidden
          className="mt-1 block w-[min(14rem,60%)] text-gold"
        >
          <path
            d="M2 6c28-5 56 3 84-1s58-6 112 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </h2>
      {body && (
        <p className="mt-4 text-lg text-cocoa-soft" data-reveal>
          {body}
        </p>
      )}
    </div>
  )
}
