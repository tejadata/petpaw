# System Pages

## Purpose

Error boundaries, loading states, not-found fallbacks, and layout shells that wrap route groups.

## Error & Fallback Pages

| File | Route | Purpose |
|---|---|---|
| `app/error.tsx` | Any route (error boundary) | Global error fallback — "Something went wrong" with retry button |
| `app/not-found.tsx` | Any unmatched route | 404 page — "Page not found" with link to home |
| `app/(public)/loading.tsx` | Public routes | Loading skeleton for public pages |

## Layouts

### Layout Hierarchy

```
app/layout.tsx (Root)
├── app/(public)/layout.tsx    → Navbar + Footer
├── app/(auth)/layout.tsx      → Centered card, no nav
├── app/(dashboard)/layout.tsx → Sidebar + auth guard
├── app/(vendor)/layout.tsx    → Vendor root
│   └── app/(vendor)/vendor/dashboard/layout.tsx → Vendor sidebar + auth
└── app/(admin)/layout.tsx     → Admin sidebar + auth
```

### Layout Details

| Layout | File | Type | Provides |
|---|---|---|---|
| Root | `app/layout.tsx` | Server | `<html lang="en-IN">`, fonts, AuthProvider, global CSS, Organization+WebSite JSON-LD |
| Public | `app/(public)/layout.tsx` | Server | Navbar, Footer, EmergencyBanner, Container |
| Auth | `app/(auth)/layout.tsx` | Client | Centered card container, no nav/footer |
| Dashboard | `app/(dashboard)/layout.tsx` | Client | DashboardSidebar, `useAuthGuard()`, responsive layout |
| Vendor Root | `app/(vendor)/layout.tsx` | Server | Minimal wrapper |
| Vendor Dashboard | `app/(vendor)/vendor/dashboard/layout.tsx` | Client | VendorSidebar, `useVendorAuthGuard()` |
| Admin | `app/(admin)/layout.tsx` | Client | AdminSidebar, `useAuthGuard(true)` |

### Root Layout Dependencies

| Dependency | Purpose |
|---|---|
| `AuthProvider` | Global auth context from `lib/auth-context.tsx` |
| `SessionProvider` | NextAuth session from `next-auth/react` |
| `Inter` + `Poppins` | Google Fonts via `next/font/google` |
| `globals.css` | Tailwind v4 + CSS custom properties |
| JSON-LD | Organization + WebSite structured data |

## How to Edit

| Change | File |
|---|---|
| Global error UI | `app/error.tsx` |
| 404 page content | `app/not-found.tsx` |
| Loading skeleton | `app/(public)/loading.tsx` |
| Navbar | `components/layout/navbar.tsx` |
| Footer | `components/layout/footer.tsx` |
| Emergency banner | `components/shared/emergency-banner.tsx` |
| Root HTML / fonts | `app/layout.tsx` |
| Auth layout styling | `app/(auth)/layout.tsx` |
| Dashboard sidebar | `components/dashboard/sidebar.tsx` |
| Admin sidebar | `components/admin/sidebar.tsx` |
| Vendor sidebar | `components/vendor/vendor-sidebar.tsx` |
