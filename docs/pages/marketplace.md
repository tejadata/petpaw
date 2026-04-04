# Marketplace Module

## Purpose

Browse puppy listings and pet products from verified vendors. The marketplace is the commercial heart of PawMatch, connecting buyers with vendors who sell puppies and pet products.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/marketplace` | `app/(public)/marketplace/page.tsx` | Server | Marketplace hub (tabs: puppies + products) |
| `/marketplace/puppy` | `app/(public)/marketplace/puppy/page.tsx` | Client | Puppy listing detail (?id= param) |
| `/marketplace/product` | `app/(public)/marketplace/product/page.tsx` | Client | Product listing detail (?id= param) |

## Key Files

| File | Purpose |
|---|---|
| `app/(public)/marketplace/page.tsx` | Server wrapper with metadata + Suspense |
| `app/(public)/marketplace/marketplace-client.tsx` | Client component: tabs, filters, listing grids |
| `app/(public)/marketplace/puppy/page.tsx` | Puppy detail page |
| `app/(public)/marketplace/product/page.tsx` | Product detail page |
| `lib/data/vendor/puppy-listings.ts` | `getPublishedPuppyListings()`, `getPublicPuppyListingById()` |
| `lib/data/vendor/vendor-products.ts` | `getPublishedVendorProducts()` |
| `types/vendor-puppy.ts` | `PuppyListing`, `PuppySaleStatus` |
| `types/vendor-product.ts` | `VendorProduct`, `VendorProductCategory` |

## Components Used

- Marketplace-client renders its own listing cards (inline in the client component)
- Uses `Tabs`, `Input` (search), `Badge`, `Card` from shadcn/ui

## Data Sources

| Source | Collection | Access |
|---|---|---|
| Firestore | `puppyListings` | Public read (published only) |
| Firestore | `vendorProducts` | Public read (published only) |

## Firebase Collections

- **`puppyListings`** — filtered by `published: true`, displays breed, price (INR), vendor, status
- **`vendorProducts`** — filtered by `published: true`, displays title, category, price, stock

## Server/Client Split

The marketplace uses the server/client split pattern:

1. `page.tsx` — Server component exporting SEO metadata
2. `marketplace-client.tsx` — `"use client"` component with all Firestore queries and interactive UI
3. `page.tsx` wraps `marketplace-client.tsx` in `<Suspense>`

## User Flow

1. `/marketplace` → See tabbed interface (Puppies / Products)
2. Search and filter listings
3. Click a puppy → `/marketplace/puppy?id=xxx` detail page
4. Click a product → `/marketplace/product?id=xxx` detail page
5. View listing details, vendor info, pricing

## How to Edit

| Change | File |
|---|---|
| Marketplace layout/tabs | `app/(public)/marketplace/marketplace-client.tsx` |
| Marketplace metadata | `app/(public)/marketplace/page.tsx` → `metadata` |
| Puppy detail page | `app/(public)/marketplace/puppy/page.tsx` |
| Product detail page | `app/(public)/marketplace/product/page.tsx` |
| Puppy data queries | `lib/data/vendor/puppy-listings.ts` |
| Product data queries | `lib/data/vendor/vendor-products.ts` |
| Product categories | `types/vendor-product.ts` → `VENDOR_PRODUCT_CATEGORY_LABELS` |
| INR formatting | `lib/utils.ts` → `formatCurrencyInr()` |

## Notes

- Marketplace data is fully dynamic (Firestore) — not from static datasets
- Listings are created by vendors through the vendor dashboard
- Only `published: true` listings appear on the public marketplace
- Puppy and product detail pages use `?id=` query params (not dynamic route segments)
- The marketplace-client.tsx was split from page.tsx to enable SEO metadata on the server component
