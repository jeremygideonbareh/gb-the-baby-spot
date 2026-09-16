/**
 * ALL site content lives here.
 *
 * Source: public Instagram profile @gbthebabyspot, scraped 15 Sep 2026
 * (bio, highlight names + covers, the latest 12 posts and their captions).
 *
 * Anything we could NOT confirm from Instagram is wrapped in `demo(...)`
 * and flagged `DEMO PLACEHOLDER` in a comment. Search this file for
 * "DEMO PLACEHOLDER" and replace before launch. While
 * `site.showPlaceholderBadges` is true, those values show a small
 * "to confirm" tag on the page so nobody mistakes them for facts.
 */

export type Placeholder = { value: string; demo: true }
export type Text = string | Placeholder
const demo = (value: string): Placeholder => ({ value, demo: true })
export const textOf = (t: Text) => (typeof t === 'string' ? t : t.value)
export const isDemo = (t: Text): t is Placeholder => typeof t !== 'string'

export const site = {
  name: 'G.B The Baby Spot',
  handle: 'gbthebabyspot',
  instagram: 'https://www.instagram.com/gbthebabyspot/',
  // From the bio: "DM to inquire or call/ Whatsapp 9436335562"
  phone: '9436335562',
  phoneDisplay: '+91 94363 35562',
  whatsapp: '919436335562',
  // From bio: "Deals in all kinds of kids wear, toys, accessories"
  bio: 'Kids wear, toys and accessories',
  // From bio: "We provide home service"
  promise: 'Everything your little one needs, delivered home',
  tagline: 'Clothes, toys and accessories', // logo lettering
  city: 'Shillong, Meghalaya', // captions tag #shillong, #shillongmoms
  showPlaceholderBadges: true,
}

export const address = {
  // From the "New location" highlight: "GB THE BABY SPOT is now shifted to
  // Nongthymmai Nongkynriem — Below brand hub", and the pinned reel showing
  // the "Brand Hub · 365 Days Discount Store" signboard above the shop.
  line1: 'Below Brand Hub',
  line2: 'Nongthymmai Nongkynriem',
  city: 'Shillong, Meghalaya',
  // DEMO PLACEHOLDER: pincode not shown on Instagram
  pincode: demo('793014'),
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Brand+Hub+Nongthymmai+Nongkynriem+Shillong',
  // DEMO PLACEHOLDER: map centre is the Nongthymmai area, not a surveyed shop pin
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=91.8720%2C25.5530%2C91.8940%2C25.5700&layer=mapnik&marker=25.5615%2C91.8830',
}

// DEMO PLACEHOLDER: opening hours are not listed anywhere on Instagram
export const hours: { days: string; time: Text }[] = [
  { days: 'Mon – Sat', time: demo('10:30 am – 7:30 pm') },
  { days: 'Sunday', time: demo('11:00 am – 5:00 pm') },
]

export type CategoryId =
  | 'winter'
  | 'shoes'
  | 'summer'
  | 'school-bags'
  | 'lunch-boxes'
  | 'water-bottles'
  | 'christmas'

export type Category = {
  id: CategoryId
  /** Highlight name on Instagram */
  highlight: string
  label: string
  blurb: string
  cover: string
  tint: 'blush' | 'mint' | 'sage' | 'gold' | 'cream'
}

// One card per Instagram highlight (the two summer highlights are merged).
export const categories: Category[] = [
  {
    id: 'winter',
    highlight: 'winter dresses',
    label: 'Winter wear',
    blurb: 'Rompers, wrappers and cosy layers',
    cover: 'hl-winter',
    tint: 'blush',
  },
  {
    id: 'shoes',
    highlight: 'Sneakers',
    label: 'Sneakers & shoes',
    blurb: 'Ballies, bow straps and first sneakers',
    cover: 'hl-sneakers',
    tint: 'mint',
  },
  {
    id: 'summer',
    highlight: 'summer coll · summer',
    label: 'Summer collection',
    blurb: 'Cotton sets and dungarees',
    cover: 'hl-summer',
    tint: 'gold',
  },
  {
    id: 'school-bags',
    highlight: 'School bags',
    label: 'School bags',
    blurb: 'Little backpacks with big faces',
    cover: 'hl-school-bags',
    tint: 'sage',
  },
  {
    id: 'lunch-boxes',
    highlight: 'Lunch box',
    label: 'Lunch boxes',
    blurb: 'Steel and character lunch boxes',
    cover: 'hl-lunch-box',
    tint: 'cream',
  },
  {
    id: 'water-bottles',
    highlight: 'Water bottle',
    label: 'Water bottles',
    blurb: 'Sipper bottles in fun characters',
    cover: 'hl-water-bottle',
    tint: 'mint',
  },
  {
    id: 'christmas',
    highlight: 'christmas deals',
    label: 'Christmas deals',
    blurb: 'Last season: big deals, free gift wrap',
    cover: 'hl-christmas',
    tint: 'blush',
  },
]

export type Product = {
  id: string
  name: string
  description: string
  /** Omitted when the post doesn't say which collection it belongs to */
  category?: CategoryId
  /** image keys from src/data/images.json; first is the card photo */
  images: string[]
  /** null = "DM for price" (no prices were shown on Instagram) */
  price: number | null
  colours?: string[]
  postedOn: string // ISO date of the Instagram post
  postUrl: string
  isReel?: boolean
}

// Latest posts, newest first. Names are written from the captions + photos;
// no post showed a price, so every product is "DM for price".
export const products: Product[] = [
  {
    id: 'lace-trim-flare-pants',
    name: 'Lace-trim bow flare pants',
    description:
      "Soft ribbed girls' pants with the sweetest lace trim and little bows at the hem.",
    category: 'winter',
    images: ['lace-pants', 'lace-pants-pink', 'lace-pants-charcoal', 'lace-pants-detail'],
    price: null,
    colours: ['Dusty pink', 'Charcoal', 'Black'],
    postedOn: '2026-09-15',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdTy6QCkw8E/',
  },
  {
    id: 'baby-wrapper',
    name: 'Zip-up baby wrapper',
    description:
      'Wraps them in warmth without the midnight swaddle struggle. Soft cotton sleeping bag with a zip side.',
    category: 'winter',
    images: ['baby-wrapper', 'baby-wrapper-dino', 'baby-wrapper-floral', 'baby-wrapper-stripe'],
    price: null,
    colours: ['Dino print', 'Pink floral', 'Pastel stripe'],
    postedOn: '2026-09-14',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdQ9qEek729/',
  },
  {
    id: 'cozy-rompers',
    name: 'Cosy baby rompers',
    description: 'Snuggle-approved rompers made for chilly mornings and all-day cuddles.',
    category: 'winter',
    images: ['cozy-rompers'],
    price: null,
    postedOn: '2026-09-12',
    postUrl: 'https://www.instagram.com/gbthebabyspot/reel/DdMBZ__TNL2/',
    isReel: true,
  },
  {
    id: 'cream-laceup-mary-janes',
    name: 'Cream lace-up Mary Janes',
    description: 'Glossy cream shoes with a chunky sole and soft rope laces.',
    category: 'shoes',
    images: ['cream-laceup', 'cream-laceup-side'],
    price: null,
    postedOn: '2026-09-10',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdIi1Cok3pN/',
  },
  {
    id: 'cream-bow-strap-shoes',
    name: 'Cream bow strap shoes',
    description: 'Buckle-strap shoes with a quilted checked bow. A new arrival.',
    category: 'shoes',
    images: ['cream-bow-strap', 'cream-bow-strap-side'],
    price: null,
    postedOn: '2026-09-10',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdIihF6k9MT/',
  },
  {
    id: 'silver-ballies',
    name: 'Silver sporty ballies',
    description: 'Metallic silver ballies with a bow and sporty stripes. Trending now.',
    category: 'shoes',
    images: ['silver-ballies', 'silver-ballies-side'],
    price: null,
    postedOn: '2026-09-10',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdHL1NvIO-B/',
  },
  {
    id: 'black-bow-ballies',
    name: 'Black bow ballies',
    description: 'Classic black strap ballies with a little bow, for school or parties.',
    category: 'shoes',
    images: ['black-bow-ballies', 'black-bow-ballies-side'],
    price: null,
    postedOn: '2026-09-10',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdHGnUbk1Hd/',
  },
  {
    id: 'ivory-rhinestone-ballies',
    name: 'Ivory sparkle ballies',
    description: 'Pearly ivory ballies with a sparkly rhinestone strap and bow.',
    category: 'shoes',
    images: ['ivory-ballies', 'ivory-ballies-side'],
    price: null,
    postedOn: '2026-09-09',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdEZYf4E12s/',
  },
  {
    id: 'lilac-rhinestone-ballies',
    name: 'Lilac sparkle ballies',
    description: 'Cute lilac ballies with a rhinestone strap and satin bow.',
    category: 'shoes',
    images: ['lilac-bellies', 'lilac-bellies-side'],
    price: null,
    postedOn: '2026-09-09',
    postUrl: 'https://www.instagram.com/gbthebabyspot/p/DdERrL3Eyxd/',
  },
  {
    id: 'soft-girl-3-piece-set',
    name: 'Soft girl 3-piece set',
    description: 'A cream flower-button top with denim, for the ultimate soft girl look.',
    images: ['soft-girl-set'],
    price: null,
    postedOn: '2026-09-08',
    postUrl: 'https://www.instagram.com/gbthebabyspot/reel/DdBvgCoTM4Z/',
    isReel: true,
  },
]

// DEMO PLACEHOLDER: size/age options (not listed on Instagram). Shoes are
// usually asked by age too, which the shop can then convert to a size.
export const sizeOptions = [
  '0–6 months',
  '6–12 months',
  '1–2 years',
  '2–3 years',
  '3–4 years',
  '4–5 years',
  '5–6 years',
  '6–8 years',
  'Not sure, please help',
]

export const marquee = [
  'Home delivery', // bio: "We provide home service"
  'Order on WhatsApp',
  'Winter wear',
  'Sneakers & shoes',
  'School bags',
  'Lunch boxes',
  'Water bottles',
  'Now below Brand Hub, Nongthymmai',
]

export const reasons = [
  {
    title: 'Home delivery',
    body: 'Pick from your sofa and we bring it to your door.', // bio: "We provide home service"
    icon: 'truck',
  },
  {
    title: 'Order on WhatsApp',
    body: 'Send a product photo or name to 94363 35562 and ask for sizes, colours and price.',
    icon: 'chat',
  },
  {
    title: 'A brand new spot',
    body: 'We have shifted to Nongthymmai Nongkynriem, right below Brand Hub.',
    icon: 'pin',
  },
  {
    title: 'One year of little smiles',
    body: 'We celebrated our 1st anniversary with up to 30% off all winter wear. Thank you, parents.',
    icon: 'cake',
  },
]

export const seasonal = {
  school: {
    title: 'School essentials',
    body: 'Backpacks, lunch boxes and sipper bottles from our highlights.',
    items: ['school-bags', 'lunch-boxes', 'water-bottles'] as CategoryId[],
  },
  winter: {
    title: 'Winter and Christmas edit',
    body: 'Warm layers for chilly Shillong mornings, fresh from our latest posts.',
  },
}
