# Static & Informational Pages

## Purpose

Content-only public pages — about, contact, adoption info, pet care, FAQ, legal/compliance.

## Routes

| Route | File | Type | Purpose |
|---|---|---|---|
| `/about` | `app/(public)/about/page.tsx` | Server | About PawMatch, team, mission |
| `/contact` | `app/(public)/contact/page.tsx` | Server | Contact page (server wrapper) |
| `/contact` | `app/(public)/contact/contact-form.tsx` | Client | Contact form (EmailJS) |
| `/adoption` | `app/(public)/adoption/page.tsx` | Server | Adoption resources & guidance |
| `/faq` | `app/(public)/faq/page.tsx` | Server | FAQ accordion (FAQPage schema) |
| `/privacy` | `app/(public)/privacy/page.tsx` | Server | Privacy policy |
| `/terms` | `app/(public)/terms/page.tsx` | Server | Terms of service |

## Key Files

| File | Purpose |
|---|---|
| `lib/data/faqs.ts` | `getFAQs()`, `getFAQCategories()` |
| `lib/datasets/faqs.ts` | Static FAQ data |
| `lib/email.ts` | EmailJS integration for contact form |
| `lib/metadata.ts` | `createPageMetadata()` helper |
| `components/shared/cta-section.tsx` | Reusable call-to-action |
| `components/shared/disclaimer-block.tsx` | Legal disclaimer |

## Data Sources

| Page | Source |
|---|---|
| FAQ | Static dataset (`lib/datasets/faqs.ts`) via `getFAQs()` |
| Contact | No data — sends email via EmailJS |
| Others | Inline content (no external data) |

## SEO

- `/faq` has `FAQPage` JSON-LD schema for rich results.
- All pages export `metadata` via `createPageMetadata()`.
- Contact page uses server/client split (server wrapper for metadata + client form for interactivity).

## How to Edit

| Change | File |
|---|---|
| About page content | `app/(public)/about/page.tsx` |
| Contact form fields | `app/(public)/contact/contact-form.tsx` |
| Contact EmailJS config | `lib/email.ts` + env vars (`NEXT_PUBLIC_EMAILJS_*`) |
| FAQ questions | `lib/datasets/faqs.ts` |
| Adoption content | `app/(public)/adoption/page.tsx` |
| Privacy policy | `app/(public)/privacy/page.tsx` |
| Terms of service | `app/(public)/terms/page.tsx` |
| Page metadata | Each page's `metadata` export or `lib/metadata.ts` |
