import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export type BagItem = {
  key: string
  productId: string
  name: string
  image: string
  size: string
  colour?: string
  qty: number
}

type Bag = {
  items: BagItem[]
  count: number
  add: (item: Omit<BagItem, 'key'>) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
}

const STORAGE_KEY = 'gb-baby-spot-bag-v1'
const BagContext = createContext<Bag | null>(null)

function load(): BagItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function BagProvider({ children }: { children: ReactNode }) {
  // Starts empty so the pre-rendered HTML matches; the saved list loads after hydration.
  const [items, setItems] = useState<BagItem[]>([])
  const [isOpen, setOpen] = useState(false)
  const loaded = useRef(false)

  useEffect(() => {
    setItems(load())
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode): the bag still works for this visit
    }
  }, [items])

  const add = useCallback((item: Omit<BagItem, 'key'>) => {
    const key = [item.productId, item.size, item.colour ?? ''].join('|')
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i))
      return [...prev, { ...item, key }]
    })
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(20, qty)) } : i)))
  }, [])

  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<Bag>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      add,
      setQty,
      remove,
      clear,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [items, add, setQty, remove, clear, isOpen],
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export function useBag() {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used inside BagProvider')
  return ctx
}
