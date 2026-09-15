"""Crop, lightly clean and export the scraped Instagram photos as WebP.

Sources live in source-photos/ (downloaded from @gbthebabyspot).
Outputs go to public/img/<name>-<width>.webp plus src/data/images.json.
Run: python tools/process_images.py
"""
import json
import os
from PIL import Image, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-photos")
OUT = os.path.join(ROOT, "public", "img")
MANIFEST = os.path.join(ROOT, "src", "data", "images.json")
os.makedirs(OUT, exist_ok=True)

# name: (source file prefix, aspect w/h, focus x 0..1, focus y 0..1, zoom >= 1)
JOBS = {
    # Girls' lace-trim flare pants (15 Sep 2026)
    "lace-pants": ("car_DdTy6QCkw8E_0", 4 / 5, 0.5, 0.5, 1.0),
    "lace-pants-pink": ("car_DdTy6QCkw8E_1", 4 / 5, 0.5, 0.5, 1.0),
    "lace-pants-detail": ("car_DdTy6QCkw8E_2", 4 / 5, 0.5, 0.55, 1.0),
    "lace-pants-charcoal": ("car_DdTy6QCkw8E_3", 4 / 5, 0.5, 0.5, 1.0),
    "lace-pants-black": ("car_DdTy6QCkw8E_5", 4 / 5, 0.5, 0.5, 1.0),
    # Baby wrapper / sleeping bag (14 Sep 2026)
    "baby-wrapper": ("car_DdQ9qEek729_0", 4 / 5, 0.5, 0.5, 1.0),
    "baby-wrapper-dino": ("car_DdQ9qEek729_1", 4 / 5, 0.5, 0.5, 1.0),
    "baby-wrapper-stripe": ("car_DdQ9qEek729_4", 4 / 5, 0.5, 0.5, 1.0),
    "baby-wrapper-floral": ("car_DdQ9qEek729_5", 4 / 5, 0.5, 0.5, 1.0),
    # Reels (cover frames only)
    "cozy-rompers": ("grid_DdMBZ__TNL2", 4 / 5, 0.5, 0.45, 1.0),
    "soft-girl-set": ("grid_DdBvgCoTM4Z", 4 / 5, 0.5, 0.4, 1.0),
    # Footwear (9-10 Sep 2026)
    "lilac-bellies": ("car_DdERrL3Eyxd_1", 4 / 5, 0.5, 0.5, 1.0),
    "lilac-bellies-side": ("car_DdERrL3Eyxd_2", 4 / 5, 0.5, 0.5, 1.0),
    "ivory-ballies": ("car_DdEZYf4E12s_1", 4 / 5, 0.5, 0.5, 1.0),
    "ivory-ballies-side": ("car_DdEZYf4E12s_2", 4 / 5, 0.5, 0.5, 1.0),
    "black-bow-ballies": ("car_DdHGnUbk1Hd_1", 4 / 5, 0.5, 0.5, 1.0),
    "black-bow-ballies-side": ("car_DdHGnUbk1Hd_2", 4 / 5, 0.5, 0.5, 1.0),
    "silver-ballies": ("car_DdHL1NvIO-B_1", 4 / 5, 0.5, 0.5, 1.0),
    "silver-ballies-side": ("car_DdHL1NvIO-B_2", 4 / 5, 0.5, 0.5, 1.0),
    "cream-laceup": ("car_DdIi1Cok3pN_1", 4 / 5, 0.5, 0.5, 1.0),
    "cream-laceup-side": ("car_DdIi1Cok3pN_2", 4 / 5, 0.5, 0.5, 1.0),
    "cream-bow-strap": ("car_DdIihF6k9MT_1", 4 / 5, 0.5, 0.5, 1.0),
    "cream-bow-strap-side": ("car_DdIihF6k9MT_2", 4 / 5, 0.5, 0.5, 1.0),
    # Hero collage squares
    "hero-lilac": ("car_DdERrL3Eyxd_2", 1, 0.5, 0.42, 1.25),
    "hero-pants": ("car_DdTy6QCkw8E_2", 1, 0.5, 0.62, 1.0),
    "hero-wrapper": ("car_DdQ9qEek729_1", 1, 0.5, 0.45, 1.0),
    "hero-bow": ("car_DdIihF6k9MT_1", 1, 0.5, 0.45, 1.2),
    # Store
    "store-front": ("grid_DbcrTtxzxFn", 4 / 5, 0.5, 0.45, 1.0),
    "store-hello": ("grid_DbC8TnhTWOU", 4 / 5, 0.5, 0.4, 1.0),
    "shoe-wall": ("grid_DdHL1NvIO-B", 4 / 5, 0.5, 0.5, 1.0),
}

# Highlight covers are only available at 150px without logging in.
COVERS = {
    "hl-summer-coll": "hl_00_summer-coll",
    "hl-summer": "hl_01_summer",
    "hl-school-bags": "hl_02_school-bags",
    "hl-lunch-box": "hl_03_lunch-box",
    "hl-water-bottle": "hl_04_water-bottle",
    "hl-christmas": "hl_05_christmas-deals",
    "hl-sneakers": "hl_06_sneakers",
    "hl-winter": "hl_07_winter-dresses",
    "hl-new-location": "hl_08_new-location",
    "hl-anniversary": "hl_09_1st-anniversary",
    "logo": "profile",
}


def find(prefix):
    for f in sorted(os.listdir(SRC)):
        if f.startswith(prefix):
            return os.path.join(SRC, f)
    raise FileNotFoundError(prefix)


def crop(im, aspect, fx, fy, zoom):
    w, h = im.size
    cw, ch = (w, w / aspect) if w / h <= aspect else (h * aspect, h)
    cw, ch = cw / zoom, ch / zoom
    left = min(max(fx * w - cw / 2, 0), w - cw)
    top = min(max(fy * h - ch / 2, 0), h - ch)
    return im.crop((round(left), round(top), round(left + cw), round(top + ch)))


def clean(im):
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.04)
    return im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=3))


manifest = {}
for name, (prefix, aspect, fx, fy, zoom) in JOBS.items():
    im = clean(crop(Image.open(find(prefix)).convert("RGB"), aspect, fx, fy, zoom))
    # 640 and 1280 are the main sizes; 320/480 keep small phone tiles light
    widths = [w for w in (320, 480, 640, 1280) if w <= im.width] or [im.width]
    for w in widths:
        h = round(w / im.width * im.height)
        im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT, f"{name}-{w}.webp"), "WEBP", quality=80, method=6)
    manifest[name] = {"widths": widths, "ratio": round(im.width / im.height, 4)}

for name, prefix in COVERS.items():
    im = clean(Image.open(find(prefix)).convert("RGB"))
    im.save(os.path.join(OUT, f"{name}-150.webp"), "WEBP", quality=85, method=6)
    im.resize((300, 300), Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.5, 50, 2)).save(
        os.path.join(OUT, f"{name}-300.webp"), "WEBP", quality=85, method=6)
    manifest[name] = {"widths": [150, 300], "ratio": 1}

os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
json.dump(manifest, open(MANIFEST, "w"), indent=1)
print(len(manifest), "images")
