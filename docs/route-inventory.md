# Route Inventory

Complete list of every page, layout, loading, and error file in the PawMatch application.

**Legend:**
- **Type**: S = Server component, C = Client component (`"use client"`)
- **Meta**: ✅ = has metadata/generateMetadata export, — = none
- **Access**: Public, User, Vendor, Admin, System

---

## Root System Files

| Route | File | Type | Meta | Access | Purpose |
|---|---|---|---|---|---|
| — | `app/layout.tsx` | S | ✅ | System | Root layout (html, body, AuthProvider, fonts, JSON-LD) |
| — | `app/error.tsx` | C | — | System | Global error boundary |
| — | `app/not-found.tsx` | S | — | System | Global 404 page |
| — | `app/robots.ts` | S | — | System | Generates robots.txt |
| — | `app/sitemap.ts` | S | — | System | Generates sitemap.xml |

---

## (public) — Public Pages

**Layout:** `app/(public)/layout.tsx` (Server) — Navbar + Footer  
**Loading:** `app/(public)/loading.tsx` (Server) — Skeleton fallback

| Route | File | Type | Meta | Data Source | Purpose |
|---|---|---|---|---|---|
| `/` | `app/(public)/page.tsx` | S | ✅ | Static | Landing page with hero, featured breeds, CTA sections |
| `/about` | `app/(public)/about/page.tsx` | S | ✅ | Static | About PawMatch page |
| `/adoption` | `app/(public)/adoption/page.tsx` | S | ✅ | Static | Adoption resources and guidelines |
| `/breeds` | `app/(public)/breeds/page.tsx` | S | ✅ | `lib/data/breeds.ts` | Breed list with filters and search |
| `/breeds/[slug]` | `app/(public)/breeds/[slug]/page.tsx` | S | ✅ | `lib/data/breeds.ts` | Breed detail (traits, health, care guide) |
| — | `app/(public)/breeds/loading.tsx` | S | — | — | Breed pages loading skeleton |
| `/compare` | `app/(public)/compare/page.tsx` | C | — | `lib/data/breeds.ts` | Side-by-side breed comparison tool |
| `/contact` | `app/(public)/contact/page.tsx` | S | ✅ | — | Contact page (wraps contact-form.tsx) |
| `/faq` | `app/(public)/faq/page.tsx` | S | ✅ | `lib/data/faqs.ts` | FAQ page with FAQPage schema |
| `/health` | `app/(public)/health/page.tsx` | S | ✅ | `lib/data/health.ts` | Health resources hub |
| `/health/[slug]` | `app/(public)/health/[slug]/page.tsx` | S | ✅ | `lib/data/health.ts` | Health article detail with Article schema |
| `/health/category/[slug]` | `app/(public)/health/category/[slug]/page.tsx` | S | ✅ | `lib/data/health.ts` | Articles filtered by health category |
| — | `app/(public)/health/loading.tsx` | S | — | — | Health pages loading skeleton |
| `/homemade-food` | `app/(public)/homemade-food/page.tsx` | S | ✅ | `lib/data/homemade-food.ts` | Homemade food recipe hub |
| `/homemade-food/[slug]` | `app/(public)/homemade-food/[slug]/page.tsx` | S | ✅ | `lib/data/homemade-food.ts` | Food recipe detail with Article schema |
| `/marketplace` | `app/(public)/marketplace/page.tsx` | S | ✅ | Firestore | Marketplace hub (wraps marketplace-client.tsx) |
| `/marketplace/puppy` | `app/(public)/marketplace/puppy/page.tsx` | C | — | Firestore | Puppy listing detail (?id= param) |
| `/marketplace/product` | `app/(public)/marketplace/product/page.tsx` | C | — | Firestore | Vendor product detail (?id= param) |
| `/pet-care` | `app/(public)/pet-care/page.tsx` | S | ✅ | Static | Pet care tips and resources hub |
| `/privacy` | `app/(public)/privacy/page.tsx` | S | ✅ | Static | Privacy policy |
| `/products` | `app/(public)/products/page.tsx` | S | ✅ | `lib/data/products.ts` | Product catalog (wraps products-client.tsx) |
| `/products/[slug]` | `app/(public)/products/[slug]/page.tsx` | S | ✅ | `lib/data/products.ts` | Product detail page |
| `/quiz` | `app/(public)/quiz/page.tsx` | S | ✅ | Static | Quiz landing / intro page |
| `/quiz/questions` | `app/(public)/quiz/questions/page.tsx` | C | — | `lib/datasets/quiz-questions.ts` | Interactive quiz questions (12+ steps) |
| `/quiz/results` | `app/(public)/quiz/results/page.tsx` | C | — | `lib/quiz/engine.ts` | Quiz results with scored breed matches |
| `/symptom-helper` | `app/(public)/symptom-helper/page.tsx` | C | — | `lib/llm/symptom-check.ts` | AI symptom analysis (GPT-4o) |
| `/terms` | `app/(public)/terms/page.tsx` | S | ✅ | Static | Terms of service |

---

## (auth) — Authentication

**Layout:** `app/(auth)/layout.tsx` (Server) — Centered card layout

| Route | File | Type | Meta | Data Source | Purpose |
|---|---|---|---|---|---|
| `/login` | `app/(auth)/login/page.tsx` | C | — | Firebase Auth | Login form (email/password + Google) |
| `/register` | `app/(auth)/register/page.tsx` | C | — | Firebase Auth | Registration form |

---

## (dashboard) — User Dashboard

**Layout:** `app/(dashboard)/layout.tsx` (Client) — Sidebar + `useAuthGuard()`

All pages require user authentication.

| Route | File | Type | Data Source | Purpose |
|---|---|---|---|---|
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | C | Firestore | Dashboard overview (stats, recent activity) |
| `/dashboard/dogs` | `app/(dashboard)/dashboard/dogs/page.tsx` | C | Firestore `dogProfiles` | Legacy dog profiles list |
| `/dashboard/dogs/new` | `app/(dashboard)/dashboard/dogs/new/page.tsx` | C | Firestore `dogProfiles` | Create legacy dog profile |
| `/dashboard/pets` | `app/(dashboard)/dashboard/pets/page.tsx` | C | Firestore `pets` | Pet profiles list |
| `/dashboard/pets/new` | `app/(dashboard)/dashboard/pets/new/page.tsx` | C | Firestore `pets` | Create new pet profile |
| `/dashboard/pets/edit` | `app/(dashboard)/dashboard/pets/edit/page.tsx` | C | Firestore `pets` | Edit pet profile (?id= param) |
| `/dashboard/pets/view` | `app/(dashboard)/dashboard/pets/view/page.tsx` | C | Firestore `pets` | View pet profile detail (?id= param) |
| `/dashboard/reminders` | `app/(dashboard)/dashboard/reminders/page.tsx` | C | Firestore `reminders` | Reminders list (filterable by type) |
| `/dashboard/reminders/new` | `app/(dashboard)/dashboard/reminders/new/page.tsx` | C | Firestore `reminders` | Create new reminder |
| `/dashboard/reminders/edit` | `app/(dashboard)/dashboard/reminders/edit/page.tsx` | C | Firestore `reminders` | Edit reminder (?id= param) |
| `/dashboard/reports` | `app/(dashboard)/dashboard/reports/page.tsx` | C | Firestore `medicalReports` | Medical reports list |
| `/dashboard/reports/new` | `app/(dashboard)/dashboard/reports/new/page.tsx` | C | Firestore + Storage | Upload new medical report |
| `/dashboard/reports/view` | `app/(dashboard)/dashboard/reports/view/page.tsx` | C | Firestore `medicalReports` | View report detail (?id= param) |
| `/dashboard/favorites` | `app/(dashboard)/dashboard/favorites/page.tsx` | C | Firestore `favorites` | Saved breeds, articles, products |
| `/dashboard/settings` | `app/(dashboard)/dashboard/settings/page.tsx` | C | Firestore `users` | User settings and preferences |

---

## (vendor) — Vendor Portal

**Root Layout:** `app/(vendor)/layout.tsx` (Server)  
**Dashboard Layout:** `app/(vendor)/vendor/dashboard/layout.tsx` (Client) — Vendor sidebar + `useVendorAuthGuard()`

### Vendor Auth Pages (no sidebar)

| Route | File | Type | Data Source | Purpose |
|---|---|---|---|---|
| `/vendor/login` | `app/(vendor)/vendor/login/page.tsx` | C | Firebase Auth | Vendor login |
| `/vendor/signup` | `app/(vendor)/vendor/signup/page.tsx` | C | Firebase Auth + Firestore | Vendor registration |
| `/vendor/onboarding` | `app/(vendor)/vendor/onboarding/page.tsx` | C | Firestore `vendors` | Business profile setup |

### Vendor Dashboard Pages (with sidebar, auth required)

| Route | File | Type | Data Source | Purpose |
|---|---|---|---|---|
| `/vendor/dashboard` | `app/(vendor)/vendor/dashboard/page.tsx` | C | Firestore | Vendor dashboard overview |
| `/vendor/dashboard/puppies` | `app/(vendor)/vendor/dashboard/puppies/page.tsx` | C | Firestore `puppyListings` | Puppy listings list |
| `/vendor/dashboard/puppies/new` | `app/(vendor)/vendor/dashboard/puppies/new/page.tsx` | C | Firestore + Storage | Create puppy listing |
| `/vendor/dashboard/puppies/detail` | `app/(vendor)/vendor/dashboard/puppies/detail/page.tsx` | C | Firestore `puppyListings` | View puppy listing (?id=) |
| `/vendor/dashboard/puppies/edit` | `app/(vendor)/vendor/dashboard/puppies/edit/page.tsx` | C | Firestore + Storage | Edit puppy listing (?id=) |
| `/vendor/dashboard/products` | `app/(vendor)/vendor/dashboard/products/page.tsx` | C | Firestore `vendorProducts` | Product listings list |
| `/vendor/dashboard/products/new` | `app/(vendor)/vendor/dashboard/products/new/page.tsx` | C | Firestore + Storage | Create product listing |
| `/vendor/dashboard/products/detail` | `app/(vendor)/vendor/dashboard/products/detail/page.tsx` | C | Firestore `vendorProducts` | View product listing (?id=) |
| `/vendor/dashboard/products/edit` | `app/(vendor)/vendor/dashboard/products/edit/page.tsx` | C | Firestore + Storage | Edit product listing (?id=) |
| `/vendor/dashboard/store` | `app/(vendor)/vendor/dashboard/store/page.tsx` | C | Firestore `stores` | Store profile management |
| `/vendor/dashboard/settings` | `app/(vendor)/vendor/dashboard/settings/page.tsx` | C | Firestore `vendors` | Vendor account settings |

---

## (admin) — Admin Panel

**Layout:** `app/(admin)/layout.tsx` (Client) — Admin sidebar + `useAuthGuard()` (admin only)

All pages require admin authentication (`admin@pawmatch.com`).

| Route | File | Type | Data Source | Purpose |
|---|---|---|---|---|
| `/admin` | `app/(admin)/admin/page.tsx` | S | Firestore | Admin overview (stats, recent logs) |
| `/admin/articles` | `app/(admin)/admin/articles/page.tsx` | S | Firestore | Manage health articles |
| `/admin/breeds` | `app/(admin)/admin/breeds/page.tsx` | S | Firestore | Manage breed data |
| `/admin/faqs` | `app/(admin)/admin/faqs/page.tsx` | S | Firestore | Manage FAQs |
| `/admin/logs` | `app/(admin)/admin/logs/page.tsx` | S | Firestore | View admin activity logs |
| `/admin/products` | `app/(admin)/admin/products/page.tsx` | S | Firestore | Manage products |
| `/admin/symptoms` | `app/(admin)/admin/symptoms/page.tsx` | S | Firestore | Manage symptom data |
| `/admin/users` | `app/(admin)/admin/users/page.tsx` | S | Firestore | User management |

---

## Summary

| Metric | Count |
|---|---|
| **Total page.tsx files** | 64 |
| **Total layout.tsx files** | 7 |
| **Total loading.tsx files** | 3 |
| **error.tsx** | 1 |
| **not-found.tsx** | 1 |
| **Server components** | 42 |
| **Client components** | 33 |
| **Pages with metadata** | 20 |
| **Route groups** | 5 |
| **Public pages** | 27 |
| **Dashboard pages** | 15 |
| **Vendor pages** | 14 |
| **Admin pages** | 8 |
| **Auth pages** | 2 |
