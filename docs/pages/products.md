# Products Module

## Purpose

Curated pet product catalog across 10 categories (food, toys, grooming, beds, etc.) with detail pages for each product.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/products` | `app/(public)/products/page.tsx` | Server | Product catalog (wraps client component) |
| `/products/[slug]` | `app/(public)/products/[slug]/page.tsx` | Server | Product detail page |

## Key Files

| File | Purpose |
|---|---|
| `app/(public)/products/page.tsx` | Server wrapper with metadata |
| `app/(public)/products/products-client.tsx` | Client component with category filter, sort, search |
| `lib/data/products.ts` | Data access layer |
| `lib/datasets/products.ts` | Static product dataset + 10 category definitions |
| `types/product.ts` | `Product`, `ProductCategory`, `ProductFilters` |
| `lib/validations/product.ts` | Zod schema for admin product management |
| `components/products/product-card.tsx` | Product card component |

## Data Sources

Static dataset via `lib/data/products.ts`:

| Function | Description |
|---|---|
| `getProducts(filters?)` | All products with optional category/sort filters |
| `getProductsByCategory(category)` | Products in a category |
| `getProductById(id)` | Single product |
| `getProductCategories()` | All 10 categories |

## Product Categories

Food, Toys, Grooming, Beds, Crates, Bowls, Collars, Harnesses, Training, Healthcare

## Server/Client Split

Uses the same pattern as marketplace: server `page.tsx` exports metadata and wraps `ProductsClient` in `<Suspense>`. The client component handles `useSearchParams()` for category and sort filters.

## How to Edit

| Change | File |
|---|---|
| Add/edit products | `lib/datasets/products.ts` → `products` array |
| Add/edit categories | `lib/datasets/products.ts` → `productCategories` array |
| Product card design | `components/products/product-card.tsx` |
| Product catalog UI | `app/(public)/products/products-client.tsx` |
| Product detail layout | `app/(public)/products/[slug]/page.tsx` |
| Catalog metadata | `app/(public)/products/page.tsx` → `metadata` |
| Product types | `types/product.ts` |
