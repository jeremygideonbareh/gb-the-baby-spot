# G.B The Baby Spot

Single-page shop site for [@gbthebabyspot](https://www.instagram.com/gbthebabyspot/), a kids' wear, toys and accessories store in Nongthymmai, Shillong. Customers browse real products and send their order (or a whole list) on WhatsApp.

## Content and placeholders

Everything on the page comes from `src/data/content.ts`, built from the public Instagram profile (bio, highlights and the latest posts, September 2026).

Anything that couldn't be confirmed is wrapped in `demo(...)` and commented `DEMO PLACEHOLDER`: the pincode, opening hours, the size/age options, and "free" in the marquee's "Free home delivery". While `site.showPlaceholderBadges` is `true`, those values show a small "to confirm" tag on the page. No prices were posted, so every product reads "DM for price" (set `price` to a number to show one).

## Photos

The original Instagram images are in `source-photos/`. `npm run images` (Python + Pillow) crops, lightly cleans and exports them as WebP (320/480/640/1280 px) into `public/img/`, and writes `src/data/images.json`. Highlight covers are only 150px because highlights need a login; swap in bigger photos when the shop sends them.

## Develop

```bash
npm install
npm run dev
```

`npm run build` type-checks, builds, and pre-renders the page into `dist/index.html`. Pushing to `main` deploys to GitHub Pages.
