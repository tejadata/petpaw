# PawMatch Documentation

Welcome to the PawMatch project documentation. This index provides quick access to all technical docs covering architecture, routing, Firebase integration, components, and every page in the application.

---

## Architecture & System Design

| Document | Description |
|---|---|
| [Architecture](architecture.md) | System design, static export model, data flow, auth architecture |
| [Routing Guide](routing-guide.md) | Route groups, layout nesting, auth guards, loading/error boundaries |
| [Route Inventory](route-inventory.md) | Complete table of all 64+ pages with file paths and access levels |

## Firebase

| Document | Description |
|---|---|
| [Data Model](firebase/data-model.md) | All 11 Firestore collections with field schemas and relationships |
| [Services](firebase/services.md) | Client SDK, Admin SDK, Storage utilities, Auth context, EmailJS |
| [Security Rules](firebase/security-rules.md) | Firestore and Cloud Storage access control rules |

## Components & Styling

| Document | Description |
|---|---|
| [Components Guide](components-guide.md) | All 64 components organized by domain |
| [Styling Guide](styling-guide.md) | Tailwind CSS v4, shadcn/ui theming, responsive patterns |

## Page Documentation

### Public Pages

| Document | Pages Covered |
|---|---|
| [Home](pages/home.md) | Landing page (`/`) |
| [Breeds](pages/breeds.md) | `/breeds`, `/breeds/[slug]`, `/compare` |
| [Quiz](pages/quiz.md) | `/quiz`, `/quiz/questions`, `/quiz/results` |
| [Marketplace](pages/marketplace.md) | `/marketplace`, `/marketplace/puppy`, `/marketplace/product` |
| [Health](pages/health.md) | `/health`, `/health/[slug]`, `/health/category/[slug]` |
| [Homemade Food](pages/homemade-food.md) | `/homemade-food`, `/homemade-food/[slug]` |
| [Products](pages/products.md) | `/products`, `/products/[slug]` |
| [Symptom Helper](pages/symptom-helper.md) | `/symptom-helper` |
| [Static Pages](pages/static-pages.md) | `/about`, `/contact`, `/adoption`, `/pet-care`, `/faq`, `/privacy`, `/terms` |

### Protected Pages

| Document | Pages Covered |
|---|---|
| [Dashboard](pages/dashboard.md) | `/dashboard` and all 14 sub-pages (pets, reminders, reports, favorites, settings, dogs) |
| [Vendor](pages/vendor.md) | `/vendor/login`, `/vendor/signup`, `/vendor/onboarding`, `/vendor/dashboard` and all sub-pages |
| [Admin](pages/admin.md) | `/admin` and all 7 management sub-pages |
| [Auth](pages/auth.md) | `/login`, `/register`, auth guards and flow |

### System Pages

| Document | Pages Covered |
|---|---|
| [System Pages](pages/system-pages.md) | `error.tsx`, `not-found.tsx`, `loading.tsx` files, all 7 `layout.tsx` files |

## Maintenance

| Document | Description |
|---|---|
| [Editing Pages Guide](editing-pages-guide.md) | Quick-reference lookup: "I want to edit X → go to file Y" |

---

## Quick Links

- **Add a new breed:** Edit `lib/datasets/breeds.ts` → add entry to `breeds` array
- **Add a health article:** Edit `lib/datasets/health-articles.ts` → add entry
- **Add a product:** Edit `lib/datasets/products.ts` → add entry to `products` array
- **Change navigation links:** Edit `lib/constants.ts` → `NAV_LINKS` and `FOOTER_LINKS`
- **Update SEO metadata:** Edit the `metadata` export in the relevant `page.tsx` or use `createMetadata()` in `lib/metadata.ts`
- **Update Firestore rules:** Edit `firestore.rules` → deploy with `firebase deploy --only firestore:rules`
