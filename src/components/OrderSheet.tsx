import { useEffect, useId, useRef, useState } from 'react'
import { sizeOptions, type Product } from '../data/content'
import { useBag } from '../lib/bag'
import { loadMotion } from '../lib/motion'
import { orderMessage, waLink } from '../lib/whatsapp'
import { BagIcon, CloseIcon, InstagramIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'
import { Picture } from './ui'
import { priceLabel } from './Shop'

export function OrderSheet({
  product,
  mode,
  onClose,
}: {
  product: Product | null
  mode: 'order' | 'add'
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const gallery = useRef<HTMLDivElement>(null)
  const { add, open: openBag } = useBag()
  const [size, setSize] = useState('')
  const [colour, setColour] = useState('')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)
  const [photo, setPhoto] = useState(0)
  const ids = { title: useId(), size: useId(), colour: useId(), err: useId() }

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (product) {
      setSize('')
      setColour(product.colours?.[0] ?? '')
      setQty(1)
      setError(false)
      setAdded(false)
      setPhoto(0)
      gallery.current?.scrollTo({ left: 0 })
      if (!d.open) d.showModal()
    } else if (d.open) {
      d.close()
    }
  }, [product])

  const line = product ? { name: product.name, size: size || 'Not chosen', qty, colour: colour || undefined } : null
  const valid = () => {
    if (!size) {
      setError(true)
      document.getElementById(ids.size)?.focus()
      return false
    }
    return true
  }

  return (
    <dialog
      ref={dialog}
      className="sheet"
      aria-labelledby={ids.title}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
    >
      {product && line && (
        <div className="relative pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between px-3 pt-2">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-cocoa/15 sm:invisible" aria-hidden />
            <button type="button" onClick={onClose} className="btn-icon shrink-0 hover:bg-cream" aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div
            ref={gallery}
            className="swipe-row flex gap-3 overflow-x-auto px-5 pt-1"
            aria-label="Product photos"
            onScroll={(e) => {
              const el = e.currentTarget
              const slide = el.firstElementChild as HTMLElement | null
              if (slide) setPhoto(Math.round(el.scrollLeft / (slide.offsetWidth + 12)))
            }}
          >
            {product.images.map((im, i) => (
              <Picture
                key={im}
                name={im}
                alt={i === 0 ? product.name : `${product.name}, photo ${i + 1}`}
                sizes="(min-width: 640px) 300px, 70vw"
                eager
                className="aspect-[4/5] max-h-[38vh] w-[70%] shrink-0 rounded-2xl object-cover sm:w-[62%]"
              />
            ))}
          </div>
          {product.images.length > 1 && (
            <div className="flex justify-center" role="group" aria-label="Choose photo">
              {product.images.map((im, i) => (
                <button
                  key={im}
                  type="button"
                  onClick={() => {
                    const el = gallery.current
                    const slide = el?.children[i] as HTMLElement | undefined
                    if (el && slide) el.scrollTo({ left: slide.offsetLeft - 20, behavior: 'smooth' })
                    setPhoto(i)
                  }}
                  aria-label={`Photo ${i + 1} of ${product.images.length}`}
                  aria-current={photo === i || undefined}
                  className="grid size-11 place-items-center"
                >
                  <span className={`block size-2.5 rounded-full ${photo === i ? 'bg-cocoa' : 'bg-cocoa/25'}`} />
                </button>
              ))}
            </div>
          )}

          <div className="px-5 pt-2">
            <h2 id={ids.title} className="pr-12 text-2xl sm:text-3xl">
              {product.name}
            </h2>
            <p className="mt-1 font-bold text-gold-deep">{priceLabel(product)}</p>
            <p className="mt-1 text-cocoa-soft">{product.description}</p>
            <a
              href={product.postUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1.5 font-bold text-cocoa underline decoration-gold/60 underline-offset-4"
            >
              <InstagramIcon className="size-4" /> See the post
            </a>
          </div>

          <div className="mt-4 grid gap-4 px-5">
            {product.colours && (
              <div>
                <label htmlFor={ids.colour} className="font-bold">
                  Colour / print
                </label>
                <select
                  id={ids.colour}
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  className="mt-1.5 min-h-12 w-full rounded-2xl bg-cream px-4 text-base ring-1 ring-cocoa/20 focus:ring-2 focus:ring-gold-deep focus:outline-none"
                >
                  {product.colours.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-[1fr_auto] items-end gap-3">
              <div>
                <label htmlFor={ids.size} className="font-bold">
                  Size / age
                </label>
                <select
                  id={ids.size}
                  value={size}
                  aria-invalid={error || undefined}
                  aria-describedby={error ? ids.err : undefined}
                  onChange={(e) => {
                    setSize(e.target.value)
                    setError(false)
                  }}
                  className={`mt-1.5 min-h-12 w-full rounded-2xl bg-cream px-4 text-base ring-1 focus:ring-2 focus:ring-gold-deep focus:outline-none ${
                    error ? 'ring-2 ring-red-700' : 'ring-cocoa/20'
                  }`}
                >
                  <option value="">Choose size or age</option>
                  {sizeOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="font-bold" id={`${ids.size}-qty`}>
                  Quantity
                </span>
                <div className="mt-1.5 flex items-center rounded-full bg-cream ring-1 ring-cocoa/20" role="group" aria-labelledby={`${ids.size}-qty`}>
                  <button type="button" className="btn-icon" aria-label="One less" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <MinusIcon className="size-5" />
                  </button>
                  <output className="w-6 text-center text-lg font-bold" aria-live="polite">
                    {qty}
                  </output>
                  <button type="button" className="btn-icon" aria-label="One more" onClick={() => setQty((q) => Math.min(20, q + 1))}>
                    <PlusIcon className="size-5" />
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <p id={ids.err} className="-mt-2 font-bold text-red-800">
                Choose a size or age first. Pick “Not sure” and we'll help.
              </p>
            )}
          </div>

          <div className={`mt-5 flex gap-3 px-5 ${mode === 'add' ? 'flex-col-reverse' : 'flex-col'}`}>
            <a
              href={waLink(orderMessage([line]))}
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                if (!valid()) e.preventDefault()
              }}
              className="btn btn-order w-full text-lg"
            >
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
            {added ? (
              <button
                type="button"
                className="btn btn-soft w-full"
                onClick={() => {
                  onClose()
                  openBag()
                }}
              >
                Added. View your list
              </button>
            ) : (
              <button
                type="button"
                className={`btn w-full ${mode === 'add' ? 'bg-cocoa text-cream hover:bg-cocoa-soft' : 'btn-soft'}`}
                onClick={() => {
                  if (!valid()) return
                  add({ productId: product.id, name: product.name, image: product.images[0], size, colour: colour || undefined, qty })
                  setAdded(true)
                  const shown = gallery.current?.children[photo]
                  loadMotion().then(({ flyToBag }) => flyToBag(shown as HTMLImageElement))
                }}
              >
                <BagIcon className="size-5" /> Add to your list
              </button>
            )}
          </div>
          <p className="mt-3 px-5 text-center text-base text-cocoa-soft">
            Opens WhatsApp with your order typed out and home delivery requested, ready to send.
          </p>
        </div>
      )}
    </dialog>
  )
}
