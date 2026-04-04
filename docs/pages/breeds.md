# Breeds Module

## Purpose

Allows users to discover, browse, filter, compare, and learn about 29 dog breeds. Includes list page, detail pages with traits and care guides, and a side-by-side comparison tool.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/breeds` | `app/(public)/breeds/page.tsx` | Server | Breed list with filters and search |
| `/breeds/[slug]` | `app/(public)/breeds/[slug]/page.tsx` | Server | Breed detail page |
| `/compare` | `app/(public)/compare/page.tsx` | Client | Side-by-side breed comparison |
| — | `app/(public)/breeds/loading.tsx` | Server | Loading skeleton for breed pages |

## Key Files

| File | Purpose |
|---|---|
| `app/(public)/breeds/page.tsx` | Breed list page with metadata |
| `app/(public)/breeds/[slug]/page.tsx` | Breed detail with `generateMetadata()` and JSON-LD |
| `app/(public)/compare/page.tsx` | Comparison tool (client component) |
| `lib/data/breeds.ts` | Data access layer (wraps dataset) |
| `lib/datasets/breeds.ts` | Static breed dataset (29 breeds) |
| `types/breed.ts` | `Breed` interface (30+ fields) |
| `lib/validations/breed.ts` | Zod schema for admin breed management |

## Components Used

| Component | File | Used On |
|---|---|---|
| BreedCard | `components/breeds/breed-card.tsx` | List page |
| BreedGrid | `components/breeds/breed-grid.tsx` | List page |
| BreedFilters | `components/breeds/breed-filters.tsx` | List page |
| BreedTraits | `components/breeds/breed-traits.tsx` | Detail page |
| BreedsList | `components/breeds/breeds-list.tsx` | List page (alternative view) |
| BreedComparisonTable | `components/breeds/breed-comparison-table.tsx` | Compare page |

## Data Sources

All breed data comes from `lib/datasets/breeds.ts` via `lib/data/breeds.ts`:

| Function | Description |
|---|---|
| `getBreeds()` | All breeds |
| `getBreedBySlug(slug)` | Single breed by URL slug |
| `getFeaturedBreeds()` | Breeds with `featured: true` |
| `searchBreeds(query)` | Name/description text search |
| `getBreedsBySize(size)` | Filter by size category |

**No Firestore required** — all data is static.

## Breed Data Fields

Each breed has 30+ fields including:
- Identity: `id`, `name`, `slug`, `description`, `imageUrl`
- Traits (1–5 scale): `exerciseNeeds`, `trainability`, `groomingNeeds`, `sheddingLevel`, `barkingTendency`, `familyFriendliness`, `apartmentSuitability`, `firstTimeOwnerSuitability`, `goodWithOtherDogs`, `separationAnxiety`
- Physical: `sizeCategory`, `weightMin`, `weightMax`, `coatType`
- Health: `healthConsiderations`, `lifespanMin`, `lifespanMax`
- Lifestyle: `climateSuitability`, `estimatedMonthlyCost`, `breedGroup`
- Content: `idealOwnerProfile`, `adoptionNotes`
- Display: `featured`, `createdAt`, `updatedAt`

## SEO

- **List page:** Static metadata via `createMetadata()`
- **Detail pages:** Dynamic metadata via `generateMetadata()` — includes breed name, INR cost, India context keywords
- **Structured data:** `breedPageSchema()` + `breadcrumbSchema()` on detail pages
- **Breadcrumbs:** Visual breadcrumb nav (Home → Breeds → Breed Name)
- **Static params:** `generateStaticParams()` enumerates all breed slugs for static export

## User Flow

1. User navigates to `/breeds`
2. Browses breed grid with optional filters (size, exercise, shedding, etc.)
3. Clicks breed card → `/breeds/[slug]` detail page
4. Views traits, health info, ideal owner profile, adoption notes
5. Can add breeds to compare → `/compare` for side-by-side table

## How to Edit

| Change | File |
|---|---|
| Add/edit a breed | `lib/datasets/breeds.ts` → add/modify entry in `breeds` array |
| Change breed card design | `components/breeds/breed-card.tsx` |
| Change breed trait display | `components/breeds/breed-traits.tsx` |
| Change filter options | `components/breeds/breed-filters.tsx` |
| Change comparison table | `components/breeds/breed-comparison-table.tsx` |
| Change breed detail layout | `app/(public)/breeds/[slug]/page.tsx` |
| Change list page layout | `app/(public)/breeds/page.tsx` |
| Change breed types | `types/breed.ts` → update `Breed` interface |
| Change breed SEO metadata | `app/(public)/breeds/[slug]/page.tsx` → `generateMetadata()` |

## Notes

- Breed IDs are non-sequential (`breed-1` through `breed-29` with gaps)
- `estimatedMonthlyCost` is in USD in the dataset but displayed in INR on the frontend
- The comparison page (`/compare`) is a client component — no SSR metadata
- Breed slugs must be unique and URL-safe (lowercase, hyphenated)
