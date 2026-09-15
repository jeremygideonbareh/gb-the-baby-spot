import { site } from '../data/content'

export type OrderLine = { name: string; size: string; qty: number; colour?: string }

const line = (l: OrderLine) =>
  `• ${l.name}${l.colour ? ` (${l.colour})` : ''}\n   Size/age: ${l.size}\n   Quantity: ${l.qty}`

export function orderMessage(lines: OrderLine[]) {
  return [
    `Hi ${site.name}! I'd like to order:`,
    '',
    ...lines.map(line),
    '',
    'Home delivery please.',
  ].join('\n')
}

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const askLink = (topic: string) =>
  waLink(`Hi ${site.name}! What ${topic} do you have in stock right now? Home delivery please.`)
