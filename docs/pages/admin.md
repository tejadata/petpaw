# Admin Panel

## Purpose

Admin dashboard for managing site content — breeds, health articles, products, FAQs, symptoms, and users. Also tracks admin activity via an audit log.

## Routes

| Route | File | Type | Purpose |
|---|---|---|---|
| `/admin` | `app/(admin)/admin/page.tsx` | Client | Dashboard overview (6 stat cards) |
| `/admin/breeds` | `app/(admin)/admin/breeds/page.tsx` | Client | Breed table (name, size, lifespan, featured) |
| `/admin/articles` | `app/(admin)/admin/articles/page.tsx` | Client | Health article table (title, category, vet status) |
| `/admin/products` | `app/(admin)/admin/products/page.tsx` | Client | Product table (title, category, price, rating) |
| `/admin/faqs` | `app/(admin)/admin/faqs/page.tsx` | Client | FAQ table (question, category, published, order) |
| `/admin/symptoms` | `app/(admin)/admin/symptoms/page.tsx` | Client | Symptom table (name, description, severity) |
| `/admin/users` | `app/(admin)/admin/users/page.tsx` | Client | User table (name, email, role, joined) |
| `/admin/logs` | `app/(admin)/admin/logs/page.tsx` | Client | Audit log (user, action, entity, date) |

## Key Files

| File | Purpose |
|---|---|
| `app/(admin)/layout.tsx` | Admin layout — client component with `useAuthGuard(true)`, renders sidebar + main |
| `components/admin/sidebar.tsx` | Sidebar nav (8 links, PawPrint logo, sign-out) |
| `lib/data/admin.ts` | `getAdminStats()`, `getAuditLogs()` |
| `types/admin.ts` | `FAQ`, `AdminActionLog`, `AdminStats` |
| `lib/hooks/use-auth-guard.ts` | Auth guard hook |

## Authentication

- Admin layout uses `useAuthGuard(true)` (adminOnly flag).
- Guard checks `user.email === "admin@pawmatch.com"` — redirects to `/dashboard` if not admin, `/login` if unauthenticated.
- Role is stored in NextAuth JWT as `"ADMIN" | "USER"`.
- Dev credentials: `admin@pawmatch.com` / `admin123`.

## Data Sources

### Admin Stats (`lib/data/admin.ts`)

`getAdminStats()` queries Firestore for counts:

| Collection | Stat |
|---|---|
| `breeds` | totalBreeds |
| `healthArticles` | totalArticles |
| `products` | totalProducts |
| `faqs` | totalFAQs |
| `adminLogs` | recentLogs (last 10, sorted by createdAt DESC) |

Falls back to hardcoded values if Firestore is unavailable.

### Page Data Fetchers

| Page | Data Function | Source Module |
|---|---|---|
| Breeds | `getBreeds()` | `lib/data/breeds.ts` |
| Articles | `getHealthArticles()` | `lib/data/health.ts` |
| Products | `getProducts()` | `lib/data/products.ts` |
| FAQs | `getAllFAQs()` | `lib/data/faqs.ts` |
| Symptoms | `getSymptoms()` | `lib/data/symptoms.ts` |

## Types

```typescript
interface AdminActionLog {
  id: string;
  userId: string;
  userName: string;
  action: string;       // "CREATE" | "UPDATE" | "DELETE"
  entity: string;       // "Breed" | "Article" | "Product" etc.
  entityId: string;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

interface AdminStats {
  totalBreeds: number;
  totalArticles: number;
  totalProducts: number;
  totalUsers: number;
  totalFAQs: number;
  recentLogs: AdminActionLog[];
}
```

## How to Edit

| Change | File |
|---|---|
| Add admin page | New folder under `app/(admin)/admin/`, add link to sidebar |
| Sidebar links / icons | `components/admin/sidebar.tsx` |
| Admin auth logic | `lib/hooks/use-auth-guard.ts` |
| Dashboard stat cards | `app/(admin)/admin/page.tsx` + `lib/data/admin.ts` |
| Table columns | Individual page files in `app/(admin)/admin/` |
| Audit log display | `app/(admin)/admin/logs/page.tsx` |
| Admin types | `types/admin.ts` |

## Notes

- All admin pages are **client components** since they are auth-gated.
- Admin currently uses **read-only tables** — edit buttons exist but editing is done directly in Firestore console or via dataset files.
- `adminLogs` Firestore collection stores the audit trail. Activity Logs page shows an empty state if no logs exist.
