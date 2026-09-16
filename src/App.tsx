import { useCallback, useRef, useState } from 'react'
import { BagDrawer } from './components/BagDrawer'
import { Categories } from './components/Categories'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Marquee } from './components/Marquee'
import { OrderSheet } from './components/OrderSheet'
import { Seasonal } from './components/Seasonal'
import { Shop, type Filter } from './components/Shop'
import { Visit } from './components/Visit'
import { WhyUs } from './components/WhyUs'
import type { CategoryId, Product } from './data/content'
import { BagProvider } from './lib/bag'
import { useMotion } from './lib/motion'

export default function App() {
  const main = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [ordering, setOrdering] = useState<{ product: Product; mode: 'order' | 'add' } | null>(null)

  useMotion((m) => {
    if (!main.current) return
    const stop = [
      m.initReveals(main.current),
      m.initUnderlines(main.current),
      m.initSplitHeadings(main.current),
      m.initImageMasks(main.current),
      m.initSectionTints(main.current),
      progress.current ? m.initScrollProgress(progress.current) : () => {},
    ]
    return () => stop.forEach((fn) => fn())
  })

  // New cards appear when the filter changes: show them and re-measure pins.
  useMotion(
    (m) => {
      m.gsap.set(main.current!.querySelectorAll('#shop [data-reveal]'), { clearProps: 'opacity,visibility,transform' })
      m.ScrollTrigger.refresh()
    },
    [filter],
  )

  const pick = useCallback((id: CategoryId) => {
    setFilter(id)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const order = useCallback((product: Product, mode: 'order' | 'add') => setOrdering({ product, mode }), [])

  return (
    <BagProvider>
      <a
        href="#shop"
        className="sr-only z-50 rounded-full bg-cocoa px-5 py-3 font-bold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to products
      </a>
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-1 origin-left scale-x-0 bg-gold" ref={progress} />
      <Header />
      <main ref={main}>
        <Hero />
        <Marquee />
        <Categories onPick={pick} />
        <Shop filter={filter} setFilter={setFilter} onOrder={order} />
        <HowItWorks />
        <Seasonal onOrder={order} onPick={pick} />
        <WhyUs />
        <Visit />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <OrderSheet product={ordering?.product ?? null} mode={ordering?.mode ?? 'order'} onClose={() => setOrdering(null)} />
      <BagDrawer />
    </BagProvider>
  )
}
