# Home Page

## Purpose

Landing page for PawMatch — the first page visitors see. Showcases key features, featured breeds, and directs users to the breed quiz, marketplace, and health resources.

## Routes

| Route | File | Type |
|---|---|---|
| `/` | `app/(public)/page.tsx` | Server (with metadata) |

## Key Files

| File | Purpose |
|---|---|
| `app/(public)/page.tsx` | Page component with metadata export |
| `app/(public)/layout.tsx` | Public layout (Navbar + Footer) |
| `components/layout/hero.tsx` | Hero section component |
| `components/shared/cta-section.tsx` | Call-to-action sections |
| `components/breeds/breed-card.tsx` | Featured breed cards |

## Components Used

- `Hero` — main hero banner with title, description, CTA buttons
- `Container` — page wrapper
- `SectionHeader` — section headings
- `BreedCard` — featured breed display cards
- `CtaSection` — call-to-action sections (quiz CTA, marketplace CTA)

## Data Sources

- `lib/data/breeds.ts` → `getFeaturedBreeds()` — featured breeds for showcase
- Static content — hero text, section descriptions

## SEO

- **Metadata:** Absolute title "PawMatch — Find Your Perfect Dog Breed in India", India-focused keywords
- **JSON-LD:** Organization + WebSite schemas (from root layout)
- **Canonical:** `APP_URL`

## User Flow

1. User lands on homepage
2. Sees hero section with primary CTA (Take Quiz / Browse Breeds)
3. Scrolls to see featured breeds section
4. Can navigate to quiz, breeds, marketplace, or health resources via CTAs and navbar

## How to Edit

| Change | File |
|---|---|
| Hero text/CTA | `app/(public)/page.tsx` |
| Featured breeds | `lib/datasets/breeds.ts` → set `featured: true` on desired breeds |
| Navigation links | `lib/constants.ts` → `NAV_LINKS` |
| Footer links | `lib/constants.ts` → `FOOTER_LINKS` |
| Homepage metadata | `app/(public)/page.tsx` → `metadata` export |
