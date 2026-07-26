# Visit PNG

Visit PNG is a mobile-first travel application for discovering places, saving favourites, planning trips, managing memberships, making practice bookings, and sharing reviews.

## What you need

- Node.js 22.13 or newer
- npm

## Download and build

```bash
git clone https://github.com/LawrenceMukombo/visitpng.git
cd visitpng
npm ci
npm run build
```

For development:

```bash
npm run dev
```

## Checks

```bash
node --test tests/rendered-html.test.mjs
```

The project currently passes 24 checks.

## Important server note

The current traveller application was built for Cloudflare storage and Sign in with ChatGPT. A normal Hostinger VPS can download and build the source, but accounts, bookings, payments, reviews and saved records will need a VPS database and a VPS sign-in service before they can be used in production.

The planned administration website should be kept separate from the public traveller application and protected with administrator-only sign-in.

## Main folders

- `app/` — pages and screens
- `db/` — saved information and business rules
- `drizzle/` — database changes
- `public/` — public images and icons
- `tests/` — checks
- `docs/` — colours and design guidance
