import { useEffect, useRef } from 'react'
import { useBag } from '../lib/bag'
import { orderMessage, waLink } from '../lib/whatsapp'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'
import { Picture } from './ui'

export function BagDrawer() {
  const { items, count, isOpen, close, setQty, remove, clear } = useBag()
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (isOpen && !d.open) d.showModal()
    if (!isOpen && d.open) d.close()
  }, [isOpen])

  const message = orderMessage(items.map((i) => ({ name: i.name, size: i.size, qty: i.qty, colour: i.colour })))

  return (
    <dialog
      ref={dialog}
      className="sheet drawer"
      aria-labelledby="bag-title"
      onClose={close}
      onClick={(e) => e.target === dialog.current && close()}
    >
      <div className="flex h-full max-h-[92dvh] flex-col sm:max-h-none">
        <div className="flex items-center justify-between border-b border-cocoa/10 px-5 py-3">
          <h2 id="bag-title" className="text-2xl">
            Your list {count > 0 && <span className="font-sans text-lg text-cocoa-soft">({count})</span>}
          </h2>
          <button type="button" onClick={close} className="btn-icon" aria-label="Close your list">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 py-12 text-center">
            <div>
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-blush">
                <BagIcon className="size-7" />
              </span>
              <p className="mt-4 font-display text-2xl">Start your list</p>
              <p className="mt-2 text-cocoa-soft">Add pieces you like, then send the whole list to us in one WhatsApp message.</p>
              <a href="#shop" onClick={close} className="btn btn-soft mt-6">
                See new arrivals
              </a>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-cocoa/10 overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.key} className="flex gap-3 py-4">
                  <Picture name={i.image} alt="" sizes="72px" className="aspect-[4/5] w-18 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="leading-snug font-bold">{i.name}</p>
                    <p className="text-[0.95rem] text-cocoa-soft">
                      {i.colour && `${i.colour} · `}
                      {i.size}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full ring-1 ring-cocoa/15" role="group" aria-label={`Quantity of ${i.name}`}>
                        <button type="button" className="btn-icon size-11" aria-label="One less" onClick={() => setQty(i.key, i.qty - 1)}>
                          <MinusIcon className="size-4" />
                        </button>
                        <span className="w-6 text-center font-bold">{i.qty}</span>
                        <button type="button" className="btn-icon size-11" aria-label="One more" onClick={() => setQty(i.key, i.qty + 1)}>
                          <PlusIcon className="size-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(i.key)}
                        className="min-h-11 px-2 font-bold text-cocoa-soft underline underline-offset-4 hover:text-cocoa"
                      >
                        Remove<span className="sr-only"> {i.name}</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-cocoa/10 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <a href={waLink(message)} target="_blank" rel="noopener" className="btn btn-order w-full text-lg">
                <WhatsAppIcon className="size-5" /> Send list on WhatsApp
              </a>
              <div className="mt-2 flex items-center justify-between text-[0.95rem] text-cocoa-soft">
                <span>We reply with prices and delivery time.</span>
                <button type="button" onClick={clear} className="min-h-11 px-2 font-bold underline underline-offset-4">
                  Clear
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
