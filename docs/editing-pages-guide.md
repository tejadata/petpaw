# Editing Pages Guide

Quick-reference for common edits. Find the file you need by what you want to change.

---

## Pages

| I want to edit… | Go to… |
|---|---|
| Homepage hero / sections | `app/(public)/page.tsx` |
| Breed list page | `app/(public)/breeds/page.tsx` |
| Single breed page | `app/(public)/breeds/[slug]/page.tsx` |
| Breed comparison | `app/(public)/compare/page.tsx` |
| Quiz questions | `lib/datasets/quiz-questions.ts` |
| Quiz scoring | `lib/quiz/scoring.ts` |
| Quiz results page | `app/(public)/quiz/results/page.tsx` |
| Health category index | `app/(public)/health/page.tsx` |
| Health article page | `app/(public)/health/[slug]/page.tsx` |
| Homemade food articles | `app/(public)/homemade-food/[slug]/page.tsx` |
| Product catalog | `app/(public)/products/products-client.tsx` |
| Symptom helper chat | `app/(public)/symptom-helper/page.tsx` |
| Marketplace listings | `app/(public)/marketplace/marketplace-client.tsx` |
| About page | `app/(public)/about/page.tsx` |
| Contact form | `app/(public)/contact/contact-form.tsx` |
| FAQ page | `app/(public)/faq/page.tsx` |
| Privacy policy | `app/(public)/privacy/page.tsx` |
| Terms of service | `app/(public)/terms/page.tsx` |
| Adoption info | `app/(public)/adoption/page.tsx` |
| Login page | `app/(auth)/login/page.tsx` |
| Register page | `app/(auth)/register/page.tsx` |
| User dashboard home | `app/(dashboard)/dashboard/page.tsx` |
| My pets list | `app/(dashboard)/dashboard/pets/page.tsx` |
| Add / edit pet | `app/(dashboard)/dashboard/pets/new/page.tsx` or `edit/page.tsx` |
| Medical reports | `app/(dashboard)/dashboard/pets/[petId]/reports/page.tsx` |
| Reminders | `app/(dashboard)/dashboard/reminders/page.tsx` |
| Favorites | `app/(dashboard)/dashboard/favorites/page.tsx` |
| User settings | `app/(dashboard)/dashboard/settings/page.tsx` |
| Vendor dashboard | `app/(vendor)/vendor/dashboard/page.tsx` |
| Vendor puppy form | `components/vendor/puppy-listing-form.tsx` |
| Vendor product form | `components/vendor/product-listing-form.tsx` |
| Vendor store page | `app/(vendor)/vendor/dashboard/store/page.tsx` |
| Admin overview | `app/(admin)/admin/page.tsx` |
| Admin breed table | `app/(admin)/admin/breeds/page.tsx` |
| Admin FAQ table | `app/(admin)/admin/faqs/page.tsx` |
| Admin user table | `app/(admin)/admin/users/page.tsx` |
| 404 page | `app/not-found.tsx` |
| Error page | `app/error.tsx` |

---

## Layouts

| I want to edit… | Go to… |
|---|---|
| Root HTML / fonts / providers | `app/layout.tsx` |
| Public navbar | `components/layout/navbar.tsx` |
| Public footer | `components/layout/footer.tsx` |
| Emergency banner | `components/shared/emergency-banner.tsx` |
| Dashboard sidebar links | `components/dashboard/sidebar.tsx` |
| Vendor sidebar links | `components/vendor/vendor-sidebar.tsx` |
| Admin sidebar links | `components/admin/sidebar.tsx` |

---

## Static Datasets

| I want to edit… | Go to… |
|---|---|
| Breed data (29 breeds) | `lib/datasets/breeds.ts` |
| Health articles | `lib/datasets/health-articles.ts` |
| Health categories (9) | `lib/datasets/health-categories.ts` |
| Homemade food articles | `lib/datasets/homemade-food-articles.ts` |
| Products (10 categories) | `lib/datasets/products.ts` |
| FAQ entries | `lib/datasets/faqs.ts` |
| Quiz questions (12+) | `lib/datasets/quiz-questions.ts` |
| Symptom list | `lib/datasets/symptoms.ts` |

---

## Firebase / Data Layer

| I want to edit… | Go to… |
|---|---|
| Breed data access | `lib/data/breeds.ts` |
| Health data access | `lib/data/health.ts` |
| Homemade food data access | `lib/data/homemade-food.ts` |
| Product data access | `lib/data/products.ts` |
| FAQ data access | `lib/data/faqs.ts` |
| Dog profile CRUD | `lib/data/dogs.ts` |
| Pet management CRUD | `lib/data/pets.ts` |
| Favorites CRUD | `lib/data/favorites.ts` |
| Reminder CRUD | `lib/data/reminders.ts` |
| Medical report CRUD | `lib/data/medical-reports.ts` |
| Admin stats | `lib/data/admin.ts` |
| Vendor profiles | `lib/data/vendor/vendors.ts` |
| Vendor stores | `lib/data/vendor/stores.ts` |
| Puppy listings | `lib/data/vendor/puppy-listings.ts` |
| Vendor products | `lib/data/vendor/vendor-products.ts` |
| Vendor image upload | `lib/data/vendor/vendor-storage.ts` |
| Firebase client SDK | `lib/firebase.ts` |
| Firebase Admin SDK | `lib/firebase-admin.ts` |
| Firestore security rules | `firestore.rules` |
| Storage security rules | `storage.rules` |

---

## Form Validations

| Schema | File |
|---|---|
| Pet form | `lib/validations/pet.ts` |
| Dog profile form | `lib/validations/dog.ts` |
| Medical report form | `lib/validations/medical-report.ts` |
| Reminder form | `lib/validations/reminder.ts` |
| User settings form | `lib/validations/user.ts` |
| Contact form | `lib/validations/contact.ts` |
| Login form | `lib/validations/auth.ts` |
| Register form | `lib/validations/auth.ts` |
| Vendor onboarding | `lib/validations/vendor.ts` |
| Puppy listing | `lib/validations/vendor-puppy.ts` |
| Vendor product | `lib/validations/vendor-product.ts` |
| Store profile | `lib/validations/vendor-store.ts` |

---

## SEO & Metadata

| I want to edit… | Go to… |
|---|---|
| Global metadata defaults | `lib/metadata.ts` → `siteConfig` |
| Page-specific metadata | Each page's `export const metadata` |
| Structured data (JSON-LD) | `lib/schema.ts` |
| JSON-LD component | `components/shared/json-ld.tsx` |
| robots.txt | `app/robots.ts` |
| Sitemap | `app/sitemap.ts` |

---

## Types

| Type | File |
|---|---|
| Breed | `types/breed.ts` |
| Pet | `types/pet.ts` |
| User | `types/user.ts` |
| Health article | `types/health.ts` |
| Homemade food | `types/homemade-food.ts` |
| Product | `types/product.ts` |
| Quiz | `types/quiz.ts` |
| Reminder | `types/reminder.ts` |
| Medical report | `types/medical-report.ts` |
| Admin | `types/admin.ts` |

---

## Styling

| I want to edit… | Go to… |
|---|---|
| Theme colors / CSS variables | `app/globals.css` |
| Tailwind config | `postcss.config.js` |
| `cn()` utility | `lib/utils.ts` |
| Add shadcn/ui component | `npx shadcn@latest add <component>` |

---

## Config

| I want to edit… | Go to… |
|---|---|
| Next.js config | `next.config.ts` |
| Auth providers | `auth.ts` |
| CORS origins | `cors.json` |
| Firebase project | `firebase.json` |
| Firestore indexes | `firestore.indexes.json` |
| Environment variables | `.env.local` (not committed) |
