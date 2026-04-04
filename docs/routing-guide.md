# Routing Guide

This document explains how routing works in PawMatch, including route groups, layout nesting, auth guards, and loading/error boundaries.

---

## Route Groups

PawMatch uses five Next.js route groups. Route groups (parenthesized folders) do **not** add path segments — they only organize layouts and middleware.

| Group | Path Prefix | Purpose | Auth | Layout |
|---|---|---|---|---|
| `(public)` | `/` | Public-facing pages | None | Navbar + Footer |
| `(auth)` | `/login`, `/register` | Authentication flows | None | Centered card layout |
| `(dashboard)` | `/dashboard/*` | Authenticated user area | `useAuthGuard()` | Dashboard sidebar + content |
| `(vendor)` | `/vendor/*` | Vendor portal | `useVendorAuthGuard()` | Vendor sidebar + content |
| `(admin)` | `/admin/*` | Admin panel | `useAuthGuard()` (admin email) | Admin sidebar + content |

---

## Layout Nesting

Every page is wrapped by a chain of layouts. The root layout wraps everything; route group layouts add group-specific chrome.

```
app/layout.tsx                (root: html, body, AuthProvider, fonts, JSON-LD)
├── app/(public)/layout.tsx   (Navbar + Footer + main container)
│   └── page.tsx              (/)
│   └── breeds/page.tsx       (/breeds)
│   └── breeds/[slug]/page.tsx (/breeds/golden-retriever)
│   └── ...
├── app/(auth)/layout.tsx     (centered flex container)
│   └── login/page.tsx        (/login)
│   └── register/page.tsx     (/register)
├── app/(dashboard)/layout.tsx (sidebar + auth guard)
│   └── dashboard/page.tsx    (/dashboard)
│   └── dashboard/pets/page.tsx (/dashboard/pets)
│   └── ...
├── app/(vendor)/layout.tsx   (vendor auth guard wrapper)
│   └── vendor/dashboard/layout.tsx (vendor sidebar + content)
│   │   └── page.tsx          (/vendor/dashboard)
│   │   └── puppies/page.tsx  (/vendor/dashboard/puppies)
│   │   └── ...
│   └── vendor/login/page.tsx (/vendor/login)
│   └── vendor/signup/page.tsx (/vendor/signup)
│   └── vendor/onboarding/page.tsx (/vendor/onboarding)
└── app/(admin)/layout.tsx    (admin sidebar + auth guard)
    └── admin/page.tsx        (/admin)
    └── admin/users/page.tsx  (/admin/users)
    └── ...
```

### Root Layout (`app/layout.tsx`)

- Sets `<html lang="en-IN">`
- Loads global fonts
- Wraps app in `<AuthProvider>`
- Injects Organization and WebSite JSON-LD schemas
- Defines `metadata` with `title.template: "%s | PawMatch"`

### Public Layout (`app/(public)/layout.tsx`)

- Renders `<Navbar />` above content and `<Footer />` below
- Server component — no auth check
- Includes `loading.tsx` for Suspense fallback

### Auth Layout (`app/(auth)/layout.tsx`)

- Centered flex layout for login/register cards
- No navbar or footer

### Dashboard Layout (`app/(dashboard)/layout.tsx`)

- Client component (`"use client"`)
- Calls `useAuthGuard()` — redirects to `/login` if unauthenticated
- Renders dashboard `<Sidebar />` alongside main content

### Vendor Layout (`app/(vendor)/layout.tsx`)

- Server component wrapper
- Nested `vendor/dashboard/layout.tsx` is a client component
- `useVendorAuthGuard()` protects dashboard routes
- Vendor login/signup/onboarding pages are outside the dashboard layout

### Admin Layout (`app/(admin)/layout.tsx`)

- Client component (`"use client"`)
- Calls `useAuthGuard()` with admin email check (`admin@pawmatch.com`)
- Renders admin `<Sidebar />` alongside main content

---

## Auth Guards

### `useAuthGuard()` — `lib/hooks/use-auth-guard.ts`

```typescript
// Redirects to /login if user is not authenticated
// For admin routes, also checks if email === "admin@pawmatch.com"
const { user, loading } = useAuthGuard();
```

Used by: `(dashboard)/layout.tsx`, `(admin)/layout.tsx`

### `useVendorAuthGuard()` — `lib/hooks/use-vendor-auth-guard.ts`

```typescript
// Validates vendor authentication
// Exempts public vendor routes: /vendor/login, /vendor/signup
const { vendor, loading } = useVendorAuthGuard();
```

Used by: `(vendor)/vendor/dashboard/layout.tsx`

---

## Dynamic Routes

Dynamic routes use `[slug]` or `[id]` segments with `generateStaticParams()` for static export:

| Route | Param | Source |
|---|---|---|
| `/breeds/[slug]` | `slug` | `lib/datasets/breeds.ts` → all `breed.slug` values |
| `/health/[slug]` | `slug` | `lib/datasets/health-articles.ts` → all article slugs |
| `/health/category/[slug]` | `slug` | `lib/datasets/health-categories.ts` → all category slugs |
| `/homemade-food/[slug]` | `slug` | `lib/datasets/homemade-food-articles.ts` → all article slugs |
| `/products/[slug]` | `slug` | `lib/datasets/products.ts` → all product slugs |

**Client-side dynamic pages** (no `generateStaticParams` needed):

| Route | Param Source |
|---|---|
| `/marketplace/puppy` | `?id=` query parameter |
| `/marketplace/product` | `?id=` query parameter |
| `/dashboard/pets/view` | `?id=` query parameter |
| `/dashboard/pets/edit` | `?id=` query parameter |
| `/dashboard/reminders/edit` | `?id=` query parameter |
| `/dashboard/reports/view` | `?id=` query parameter |
| `/vendor/dashboard/puppies/detail` | `?id=` query parameter |
| `/vendor/dashboard/puppies/edit` | `?id=` query parameter |
| `/vendor/dashboard/products/detail` | `?id=` query parameter |
| `/vendor/dashboard/products/edit` | `?id=` query parameter |

These use `useSearchParams()` at runtime — no static params needed.

---

## Loading & Error Boundaries

### Loading Files

| File | Scope |
|---|---|
| `app/(public)/loading.tsx` | All public pages |
| `app/(public)/breeds/loading.tsx` | Breed pages specifically |
| `app/(public)/health/loading.tsx` | Health pages specifically |

### Error Boundary

| File | Scope |
|---|---|
| `app/error.tsx` | Global error boundary (client component, catches runtime errors) |

### Not Found

| File | Scope |
|---|---|
| `app/not-found.tsx` | Global 404 page |

---

## Server vs. Client Components

### Server Components (render at build time)

- All `page.tsx` files that export `metadata` or `generateMetadata`
- Layout files that don't need browser APIs
- Pages reading from static datasets only

### Client Components (`"use client"`)

- Pages using React hooks (`useState`, `useEffect`)
- Pages accessing Firestore via Firebase client SDK
- Pages using `useSearchParams()` or `useRouter()`
- Auth guard layouts
- Form-heavy pages (React Hook Form)

### Server/Client Split Pattern

When a page needs both SEO metadata (server) and Firestore data (client):

```
page.tsx          → Server component, exports metadata
*-client.tsx      → "use client" component with runtime logic
```

The server `page.tsx` wraps the client component in `<Suspense>`:

```tsx
// page.tsx (server component)
export const metadata = createMetadata({ ... });

export default function Page() {
  return (
    <Suspense>
      <ClientComponent />
    </Suspense>
  );
}
```

Examples: `marketplace/page.tsx` + `marketplace-client.tsx`, `products/page.tsx` + `products-client.tsx`, `contact/page.tsx` + `contact-form.tsx`
