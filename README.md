# Pammi's Tailoring & Alterations

A website and custom-order app for an Indian tailoring business. The stitching
is women's Punjabi suits — salwar kameez, Patiala, Anarkali, sharara and
palazzo, kurti — plus men's turbans and children's patkas made from cloth the
customer brings, and small repairs and hemming on anything else they own.

Built with Next.js 16, React 19, TypeScript and SQLite. No external services:
the whole thing runs from one folder.

## Running it

```bash
npm run dev
```

Then open http://localhost:3000.

Before the admin page will work, create your env file:

```bash
cp .env.example .env.local
```

Set `ADMIN_PASSWORD` to whatever you like and generate `ADMIN_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## What's here

**Public site**

| Route        | What it is                                                     |
| ------------ | -------------------------------------------------------------- |
| `/`          | Home — hero, featured garments, how it works, gallery preview   |
| `/services`  | Every garment she stitches, with turnaround times and policies  |
| `/gallery`   | Photos of finished work                                        |
| `/measuring` | Why she measures customers herself, and what the optional rough sizes are for |
| `/about`     | Her story and how working together goes                        |
| `/contact`   | Contact details and FAQ                                        |

**The order app**

| Route     | What it is                                                            |
| --------- | --------------------------------------------------------------------- |
| `/order`  | Five-step order form — garment, fabric and style, sizing, reference photos, contact details. Repairs get a different set of questions in steps 2–4 |
| `/status` | Customers look their order up with a reference plus their email        |
| `/admin`  | Password-protected list of orders, filterable by status                |
| `/admin/[id]` | Full order: measurements, photos, status changes, quote, private notes |

**Customers are not asked to measure themselves.** Pammi measures every
customer in person before cutting, and the site says so in several places on
purpose. The order form's size fields are optional, collapsed behind a toggle,
and exist only so she can estimate fabric — nothing validates as required and
nothing there is cut from.

Which size fields appear changes with the garment: a kurti never asks for a
salwar length, and a repair asks for none at all. That mapping is
`measurementGroups` on each garment in `lib/content.ts`; the fields themselves
are in `lib/measurements.ts`.

Each garment also has a `kind`, and the order form asks a different set of
questions for each:

| `kind`      | Steps 2–3 ask                                                  |
| ----------- | -------------------------------------------------------------- |
| `stitching` | Fabric source, neckline, sleeves, lining; then sizing           |
| `headwear`  | Length, colour and who it's for. No fabric choice, no sizing    |
| `repair`    | What's broken and where. No fabric choice, no sizing            |

## Editing the content

**`lib/content.ts` is the file to edit.** Business details, garments, prices,
turnaround times, policies, gallery captions and the FAQ all live there, and
nothing else needs touching to change them.

Anything marked `TODO` in that file is a placeholder waiting on a real value.
As of now that's:

- her name as it should appear on the site
- the city / service area
- email, phone, WhatsApp and Instagram
- **every price** — they're all `null` ("Price on request") rather than
  invented numbers
- the payment policy

Placeholders don't leak onto the site: `isPlaceholder()` hides any detail
still marked `TODO` rather than printing it to a customer.

## Photos

Gallery images go in `public/gallery/` and get listed in `lib/content.ts`.
The eight that ship are **drawn illustrations, not photographs**, produced by
`scripts/generate-gallery-art.mjs`:

```bash
node scripts/generate-gallery-art.mjs
```

Because they aren't photos of real commissions, the gallery says so out loud —
`galleryIsIllustrated` in `lib/content.ts` drives that wording. Drop real
photos into `public/gallery/`, list them, and set that flag to `false`; the
copy switches from "the kinds of thing she makes" back to "pieces she's
finished for customers" and the notice disappears.

## The logo

`public/logo.jpeg` is the circular pink-and-gold badge, wired up through
`business.logoSrc` in `lib/content.ts`. Set that to `null` and the header
falls back to a simple drawn needle mark.

It's a big square image, so `components/logo.tsx` renders it through
`next/image` — at header size that's a few kilobytes of resized WebP rather
than the full original. It's also clipped to a circle, because the JPEG
carries its own cream background and that square would otherwise show against
the dark footer.

`app/icon.png` is a 512px copy of the same badge, which Next serves as the
browser-tab icon. Regenerate it after any logo change:

```bash
sips -Z 512 public/logo.jpeg --out app/icon.png
```

The site palette in `app/globals.css` is taken from the badge — magenta
`#c51a68`, gold `#d9a01a`, cream `#fdf8f0`.

Reference photos customers upload are different. They're written to
`data/uploads/`, **outside** `public/`, and served only through
`/admin/photo/[photoId]` behind the admin session. An inspiration photo is
often a picture of the customer themselves, so it shouldn't sit on a
guessable public URL.

## Data

Everything lives in `data/`:

- `data/pammi.db` — the SQLite database
- `data/uploads/` — reference photos

Both are gitignored. To back up, copy the `data` folder.

Because orders and photos are on the local disk, this needs a host with a
persistent volume — a plain serverless deploy would lose them on every
restart. Set `DATA_DIR` to a mounted disk when deploying.

## Admin

`/admin` is a single shared password, appropriate for a one-person business.
The session cookie is an expiry plus an HMAC of that expiry, so it can't be
forged or extended without `ADMIN_SECRET`. Every server action re-checks the
session — Server Functions are reachable by direct POST, so the page
rendering the button isn't the guard.
