# Homemade Food Module

## Purpose

Homemade dog food recipe guides with ingredient lists, nutrition estimates, and preparation instructions. Articles are organized by diet type and age group.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/homemade-food` | `app/(public)/homemade-food/page.tsx` | Server | Recipe hub page |
| `/homemade-food/[slug]` | `app/(public)/homemade-food/[slug]/page.tsx` | Server | Recipe article detail |

## Key Files

| File | Purpose |
|---|---|
| `lib/data/homemade-food.ts` | Data access layer |
| `lib/datasets/homemade-food-articles.ts` | Static recipe dataset |
| `types/homemade-food.ts` | `HomemadeFoodArticle`, `HomemadeFoodIngredient`, `HomemadeFoodNutritionEstimate` |
| `components/homemade-food/homemade-food-article-card.tsx` | Recipe card component |

## Data Sources

Static dataset via `lib/data/homemade-food.ts`:

| Function | Description |
|---|---|
| `getHomemadeFoodArticles()` | All recipes |
| `getHomemadeFoodArticleBySlug(slug)` | Single recipe |
| `getFeaturedHomemadeFoodArticles()` | Featured recipes |
| `getHomemadeFoodArticlesByDiet(diet)` | Filter by diet type |
| `getHomemadeFoodArticlesByAgeGroup(age)` | Filter by age group |

## SEO

- **Hub page:** Static metadata
- **Article pages:** Dynamic `generateMetadata()` with article title, type "article"
- **Structured data:** `foodArticleSchema()` + `breadcrumbSchema()` on detail pages
- **Breadcrumbs:** Home → Homemade Food → Article

## How to Edit

| Change | File |
|---|---|
| Add/edit recipes | `lib/datasets/homemade-food-articles.ts` |
| Recipe card design | `components/homemade-food/homemade-food-article-card.tsx` |
| Recipe detail layout | `app/(public)/homemade-food/[slug]/page.tsx` |
| Hub page layout | `app/(public)/homemade-food/page.tsx` |
| Recipe types | `types/homemade-food.ts` |
