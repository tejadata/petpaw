# Health Module

## Purpose

Provides veterinary-reviewed health education content organized by categories (Puppy Care, Nutrition, Common Illnesses, etc.) and age groups. Includes article list, category filtering, and detailed article pages.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/health` | `app/(public)/health/page.tsx` | Server | Health hub with categories and featured articles |
| `/health/[slug]` | `app/(public)/health/[slug]/page.tsx` | Server | Health article detail |
| `/health/category/[slug]` | `app/(public)/health/category/[slug]/page.tsx` | Server | Articles filtered by category |
| — | `app/(public)/health/loading.tsx` | Server | Loading skeleton |

## Key Files

| File | Purpose |
|---|---|
| `lib/data/health.ts` | Data access layer |
| `lib/datasets/health-articles.ts` | Static article dataset |
| `lib/datasets/health-categories.ts` | Category definitions (9 categories) |
| `types/health.ts` | `HealthCategory`, `HealthArticle`, `Symptom` interfaces |
| `components/health/health-article-card.tsx` | Article card component |
| `components/health/health-category-card.tsx` | Category card component |

## Data Sources

All data from static datasets via `lib/data/health.ts`:

| Function | Description |
|---|---|
| `getHealthCategories()` | All 9 categories |
| `getHealthCategoryBySlug(slug)` | Single category |
| `getHealthArticles()` | All articles |
| `getHealthArticleBySlug(slug)` | Single article |
| `getArticlesByCategory(categoryId)` | Articles in a category |
| `getFeaturedArticles()` | Featured articles |
| `getArticlesByAgeGroup(ageGroup)` | Filter by puppy/adult/senior |

## SEO

- **Hub page:** Static metadata with India health keywords
- **Article pages:** Dynamic `generateMetadata()` with article title, type "article", publishedTime
- **Structured data:** `healthArticleSchema()` + `breadcrumbSchema()` on article pages
- **Breadcrumbs:** Home → Health Resources → Category → Article

## How to Edit

| Change | File |
|---|---|
| Add/edit articles | `lib/datasets/health-articles.ts` |
| Add/edit categories | `lib/datasets/health-categories.ts` |
| Article card design | `components/health/health-article-card.tsx` |
| Category card design | `components/health/health-category-card.tsx` |
| Article detail layout | `app/(public)/health/[slug]/page.tsx` |
| Hub page layout | `app/(public)/health/page.tsx` |
| Article types | `types/health.ts` → `HealthArticle` |
