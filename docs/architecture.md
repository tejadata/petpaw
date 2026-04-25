# Architecture

This document describes the system design, data flow, authentication model, and key architectural patterns used in PawMatch.

---

## High-Level Overview

PawMatch is a **statically exported** Next.js application deployed to Firebase Hosting. At build time, every page is pre-rendered to HTML. At runtime, client-side JavaScript handles dynamic behavior (auth, Firestore queries, form submissions).

```
┌─────────────────────────────────────────────┐
│                   Browser                    │
│                                             │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Static    │  │ Firebase │  │ OpenAI   │ │
│  │ HTML/CSS  │  │ Client   │  │ GPT-4o   │ │
│  │ (SSG)     │  │ SDK      │  │ (Symptom)│ │
│  └───────────┘  └──────────┘  └──────────┘ │
│        │              │              │       │
└────────┼──────────────┼──────────────┼───────┘
         │              │              │
    Firebase        Firestore/     OpenAI
    Hosting         Storage/Auth   API
```

---

## Static Export Model

The app uses `output: "export"` in `next.config.ts`, which means:

1. **All pages are pre-rendered at build time** → output to `out/` directory
2. **No Node.js server** in production — purely static files
3. **`robots.ts`** → generates `out/robots.txt`
4. **`sitemap.ts`** → generates `out/sitemap.xml`
5. **`metadata` exports** → embedded in static HTML `<head>`
6. **Dynamic routes** (e.g., `/breeds/[slug]`) require `generateStaticParams()` to enumerate all possible values at build time
7. **`"use client"` components** execute in the browser after the static HTML loads

### Implications

- No API routes (`route.ts`) — all data operations use Firebase client SDK directly
- No server-side rendering at request time — `getServerSideProps` is not available
- All Firebase reads in `"use client"` pages happen client-side after hydration
- SEO metadata must be in server components (which render at build time)

---

## Data Architecture

PawMatch uses a **hybrid data model** with two tiers:

### Tier 1: Static Datasets (Build-Time)

Public reference data is stored as TypeScript arrays in `lib/datasets/`:

| Dataset           | File                                     | Records                  | Used By                    |
| ----------------- | ---------------------------------------- | ------------------------ | -------------------------- |
| Breeds            | `lib/datasets/breeds.ts`                 | 29 breeds                | Breed pages, quiz, sitemap |
| Health Articles   | `lib/datasets/health-articles.ts`        | Multiple articles        | Health pages, sitemap      |
| Health Categories | `lib/datasets/health-categories.ts`      | 9 categories             | Health category pages      |
| Homemade Food     | `lib/datasets/homemade-food-articles.ts` | Multiple recipes         | Food pages, sitemap        |
| Products          | `lib/datasets/products.ts`               | Products + 10 categories | Product pages              |
| FAQs              | `lib/datasets/faqs.ts`                   | FAQ entries              | FAQ page                   |
| Quiz Questions    | `lib/datasets/quiz-questions.ts`         | 12+ questions            | Quiz flow                  |
| Symptoms          | `lib/datasets/symptoms.ts`               | Symptom rules            | Symptom helper             |

**Why static?** These datasets change infrequently and don't require real-time updates. Embedding them in the build ensures fast performance, zero Firestore reads for public pages, and full SEO indexability.

### Tier 2: Firestore (Runtime)

User-generated and vendor data lives in Cloud Firestore, accessed client-side:

| Collection       | Purpose                               | Access                    |
| ---------------- | ------------------------------------- | ------------------------- |
| `users`          | User profiles                         | Owner only                |
| `pets`           | Pet profiles                          | Owner only                |
| `dogProfiles`    | Legacy pet collection                 | Owner only                |
| `medicalReports` | Medical records with file attachments | Owner only                |
| `reminders`      | Pet care reminders                    | Owner only                |
| `favorites`      | Saved breeds, articles, products      | Owner only                |
| `vendors`        | Vendor business profiles              | Vendor only               |
| `stores`         | Vendor store info                     | Public read, vendor write |
| `puppyListings`  | Puppy sale listings                   | Public read, vendor write |
| `vendorProducts` | Vendor product listings               | Public read, vendor write |
| `inquiries`      | Buyer inquiries to vendors            | Vendor + buyer read       |

See [Firebase Data Model](firebase/data-model.md) for complete field schemas.

### Data Access Layer

All data operations go through `lib/data/`:

```
lib/data/
├── breeds.ts          → reads from lib/datasets/breeds.ts
├── health.ts          → reads from lib/datasets/health-articles.ts
├── homemade-food.ts   → reads from lib/datasets/homemade-food-articles.ts
├── products.ts        → reads from lib/datasets/products.ts
├── faqs.ts            → reads from lib/datasets/faqs.ts
├── symptoms.ts        → reads from lib/datasets/symptoms.ts
├── pets.ts            → Firestore CRUD (pets collection)
├── dogs.ts            → Firestore CRUD (legacy dogProfiles)
├── reminders.ts       → Firestore CRUD (reminders collection)
├── medical-reports.ts → Firestore CRUD + Storage (medicalReports)
├── favorites.ts       → Firestore CRUD (favorites collection)
├── admin.ts           → Firestore reads (admin stats, logs)
└── vendor/
    ├── vendors.ts         → Firestore CRUD (vendors collection)
    ├── stores.ts          → Firestore CRUD (stores collection)
    ├── puppy-listings.ts  → Firestore CRUD (puppyListings)
    ├── vendor-products.ts → Firestore CRUD (vendorProducts)
    └── vendor-storage.ts  → Storage utilities for vendor images
```

This abstraction means pages never import Firestore or dataset modules directly — they go through the data layer.

---

## Authentication Architecture

PawMatch uses **Firebase Authentication** with browser local persistence:

### Firebase Auth (Client-Side)

- Initialized in `lib/firebase.ts`
- State managed via `AuthProvider` in `lib/auth-context.tsx`
- Provides `useAuth()` hook → `{ user, loading, role }`
- Handles email/password and Google sign-in
- Role-based routing (ADMIN, USER, VENDOR)
- Used for Firestore security rules (request.auth.uid)

### Auth Flows

**User Authentication:**

- Login → Dashboard (`/dashboard`)
- Admin Login → Admin Panel (`/admin`)
- Vendor Login → Approval Check → Vendor Dashboard (`/vendor`)

**Role Detection:**

- Admin: Email domain check (`@pawmatch.com`)
- Vendor: Firestore `vendors` collection lookup
- User: Default role

### Auth Guards

Two client-side hooks protect routes:

| Hook                   | File                                 | Behavior                                                                           |
| ---------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `useAuthGuard()`       | `lib/hooks/use-auth-guard.ts`        | Redirects to `/login` if not authenticated. Checks role for admin routes.          |
| `useVendorAuthGuard()` | `lib/hooks/use-vendor-auth-guard.ts` | Validates vendor authentication and approval status. Exempts public vendor routes. |

### Role-Based Access

| Role   | Access                    | Implementation                                          |
| ------ | ------------------------- | ------------------------------------------------------- |
| Public | `(public)` route group    | No auth check                                           |
| User   | `(dashboard)` route group | `useAuthGuard()` in layout                              |
| Vendor | `(vendor)` route group    | `useVendorAuthGuard()` in layout                        |
| Admin  | `(admin)` route group     | `useAuthGuard()` + email check for `admin@pawmatch.com` |

---

## Component Architecture

Components are organized by domain:

```
components/
├── ui/             # 15 shadcn/ui primitives (button, card, input, etc.)
├── layout/         # Shell: container, navbar, footer, hero, section-header
├── shared/         # Cross-cutting: search, empty-state, CTA, disclaimer, JSON-LD
├── breeds/         # breed-card, breed-grid, breed-filters, breed-traits, comparison
├── health/         # health-article-card, health-category-card
├── homemade-food/  # homemade-food-article-card
├── products/       # product-card
├── quiz/           # recommendation-card
├── dashboard/      # sidebar + shared/ (stat-card, file-upload, confirm-delete)
│   ├── pets/       # pet-card, pet-form
│   ├── reminders/  # reminder-card, reminder-form
│   └── reports/    # medical-report-card, medical-report-upload-form
├── vendor/         # 14 components (forms, cards, badges, sidebar)
└── admin/          # admin sidebar
```

### Patterns

- **Server components** are the default. Only components needing React hooks, browser APIs, or Firebase client SDK use `"use client"`.
- **Server/client split pattern**: For pages needing SEO metadata, the `page.tsx` is a server component that exports `metadata` and wraps a `"use client"` child component in `<Suspense>`. Examples: marketplace, products, contact.
- **Form pattern**: React Hook Form + Zod schema → `useForm({ resolver: zodResolver(schema) })`. All 15 Zod schemas are in `lib/validations/`.
- **Card pattern**: Each domain has a display card component (breed-card, product-card, pet-card, etc.) that receives typed props.

---

## SEO Architecture

### Metadata

- `lib/metadata.ts` exports `createMetadata()` for consistent OG tags, Twitter cards, and canonical URLs
- Root layout sets `template: "%s | PawMatch"` so page titles automatically get the suffix
- Static pages export `metadata` directly; dynamic pages use `generateMetadata()`
- `lang="en-IN"` on the root `<html>` element

### Structured Data (JSON-LD)

- `lib/schema.ts` provides builder functions for Organization, WebSite, Article, FAQPage, BreadcrumbList, and Breed schemas
- `components/shared/json-ld.tsx` (`<JsonLd>`) renders `<script type="application/ld+json">` in static HTML
- Organization and WebSite schemas are injected globally in the root layout
- Individual pages inject page-specific schemas (article, breed, FAQ)

### Static Files

- `app/robots.ts` → generates `robots.txt` (blocks `/admin/`, `/dashboard/`, `/vendor/`)
- `app/sitemap.ts` → generates `sitemap.xml` with all static + dynamic routes

---

## Validation Architecture

All user input is validated with Zod schemas in `lib/validations/`:

| Schema                   | File                            | Used By                   |
| ------------------------ | ------------------------------- | ------------------------- |
| `loginSchema`            | `validations/auth.ts`           | Login form                |
| `registerSchema`         | `validations/auth.ts`           | Registration form         |
| `petSchema`              | `validations/pet.ts`            | Pet create/edit form      |
| `dogProfileSchema`       | `validations/dog-profile.ts`    | Legacy dog profile form   |
| `reminderSchema`         | `validations/reminder.ts`       | Reminder create/edit form |
| `medicalReportSchema`    | `validations/medical-report.ts` | Report upload form        |
| `contactSchema`          | `validations/contact.ts`        | Contact form              |
| `quizAnswersSchema`      | `validations/quiz.ts`           | Quiz submission           |
| `breedSchema`            | `validations/breed.ts`          | Admin breed management    |
| `articleSchema`          | `validations/article.ts`        | Admin article management  |
| `faqSchema`              | `validations/faq.ts`            | Admin FAQ management      |
| `productSchema`          | `validations/product.ts`        | Admin product management  |
| `vendorOnboardingSchema` | `validations/vendor.ts`         | Vendor onboarding         |
| `puppyListingSchema`     | `validations/vendor-puppy.ts`   | Puppy listing form        |
| `vendorProductSchema`    | `validations/vendor-product.ts` | Vendor product form       |
| `storeProfileSchema`     | `validations/vendor-store.ts`   | Store profile form        |

---

## External Integrations

| Service          | Purpose                        | Config                                 |
| ---------------- | ------------------------------ | -------------------------------------- |
| Firebase Auth    | User authentication            | `NEXT_PUBLIC_FIREBASE_*` env vars      |
| Cloud Firestore  | Document database              | Same Firebase project                  |
| Cloud Storage    | File uploads (images, reports) | Same Firebase project                  |
| Google OAuth     | Social sign-in                 | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |
| EmailJS          | Reminder email notifications   | `NEXT_PUBLIC_EMAILJS_*` env vars       |
| OpenAI GPT-4o    | Symptom analysis               | `OPENAI_API_KEY` env var               |
| Firebase Hosting | Static site deployment         | `firebase.json` config                 |
