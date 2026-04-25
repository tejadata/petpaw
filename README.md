# PawMatch 🐾

A comprehensive pet marketplace and dog care platform built for the Indian market. PawMatch helps users discover dog breeds, take breed-matching quizzes, browse puppies and products from verified vendors, access health resources, and manage their pets — all in one place.

**Live:** Deployed on Firebase Hosting as a fully static Next.js application.

---

## Features

| Category             | Highlights                                                                   |
| -------------------- | ---------------------------------------------------------------------------- |
| **Breed Discovery**  | 29 breed profiles with traits, care guides, and comparison tools             |
| **Breed Quiz**       | 12-question matching quiz with scored recommendations                        |
| **Marketplace**      | Browse puppy listings and pet products from verified vendors                 |
| **Health Resources** | Veterinary-reviewed articles organized by category and age group             |
| **Homemade Food**    | Recipe guides with nutrition estimates and ingredient lists                  |
| **Product Catalog**  | Curated products across 10 categories (food, toys, grooming, etc.)           |
| **Symptom Helper**   | AI-powered symptom checker using GPT-4o for veterinary guidance              |
| **User Dashboard**   | Manage pets, reminders, medical reports, and favorites                       |
| **Vendor Portal**    | Vendor onboarding, store management, puppy and product listings              |
| **Admin Panel**      | Content management for articles, breeds, FAQs, products, symptoms, and users |
| **Pet Care Hub**     | Consolidated pet care content and adoption resources                         |

---

## Tech Stack

| Layer     | Technology                                              |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16 (App Router, static export)                  |
| Language  | TypeScript                                              |
| UI        | React 19, Tailwind CSS v4, shadcn/ui (Radix primitives) |
| Auth      | Firebase Authentication (Email/Password + Google)       |
| Database  | Cloud Firestore                                         |
| Storage   | Firebase Cloud Storage                                  |
| Analytics | Google Analytics 4 (GA4)                                |
| Forms     | React Hook Form + Zod v4 validation                     |
| Email     | EmailJS (reminder notifications)                        |
| AI        | OpenAI GPT-4o (symptom analysis)                        |
| Hosting   | Firebase Hosting (static export to `out/`)              |

---

## Authentication

The app uses Firebase Authentication with email/password and Google sign-in. Authentication state is managed through a React context provider (`lib/auth-context.tsx`).

**Key features:**

- Email/password authentication
- Google OAuth sign-in
- Browser local persistence
- Role-based routing (admin, user, vendor)
- Protected routes with middleware

**Auth flows:**

- **Users**: Login → Dashboard
- **Admins**: Login → Admin panel
- **Vendors**: Login → Vendor approval check → Vendor dashboard

---

## Project Structure

```
pawmatch/
├── app/                    # Next.js App Router pages
│   ├── (public)/           # Public-facing pages (home, breeds, health, etc.)
│   ├── (dashboard)/        # Authenticated user dashboard
│   ├── (vendor)/           # Vendor portal (onboarding, dashboard)
│   ├── (admin)/            # Admin panel
│   ├── (auth)/             # Login and registration
│   ├── layout.tsx          # Root layout (metadata, providers)
│   ├── error.tsx           # Global error boundary
│   └── not-found.tsx       # Global 404 page
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives (15 components)
│   ├── layout/             # Shell components (navbar, footer, container)
│   ├── shared/             # Common components (search, empty-state, CTA)
│   ├── breeds/             # Breed cards, grid, filters, traits, comparison
│   ├── health/             # Health article and category cards
│   ├── homemade-food/      # Food article cards
│   ├── products/           # Product cards
│   ├── quiz/               # Recommendation cards
│   ├── dashboard/          # Dashboard sidebar, pet/reminder/report forms
│   ├── vendor/             # Vendor forms, listing cards, status badges
│   └── admin/              # Admin sidebar
├── lib/                    # Business logic and utilities
│   ├── data/               # Data access layer (Firestore + static readers)
│   ├── data/vendor/        # Vendor-specific data operations
│   ├── datasets/           # Static data files (breeds, products, articles)
│   ├── hooks/              # Auth guard hooks
│   ├── llm/                # OpenAI integration (symptom analysis)
│   ├── quiz/               # Quiz scoring engine and explanations
│   ├── validations/        # Zod schemas (15 modules)
│   ├── firebase.ts         # Firebase client SDK init
│   ├── firebase-admin.ts   # Firebase Admin SDK init
│   ├── auth-context.tsx    # Auth state provider
│   ├── constants.ts        # App-wide constants and enums
│   ├── metadata.ts         # SEO metadata helper
│   ├── schema.ts           # JSON-LD structured data builders
│   ├── storage.ts          # Storage upload/delete utilities
│   ├── email.ts            # EmailJS integration
│   └── utils.ts            # Formatting and text utilities
├── types/                  # TypeScript interfaces (13 modules)
├── scripts/                # Database seed scripts
├── public/                 # Static assets
├── docs/                   # Project documentation
├── firestore.rules         # Firestore security rules
├── storage.rules           # Cloud Storage security rules
└── firebase.json           # Firebase project config
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project ([console.firebase.google.com](https://console.firebase.google.com))

### 1. Clone and Install

```bash
git clone <repository-url>
cd pawmatch
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

**Required variables:**

| Variable                                   | Purpose                      |
| ------------------------------------------ | ---------------------------- |
| `NEXT_PUBLIC_APP_URL`                      | Public app URL               |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API key             |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID          |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID              |

**Optional variables:**

| Variable                          | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT_KEY`    | Admin SDK service account (JSON string) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | EmailJS service ID (reminder emails)    |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID                     |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | EmailJS public key                      |
| `OPENAI_API_KEY`                  | OpenAI key (symptom helper)             |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | Google Analytics 4 measurement ID       |

### 3. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password + Google sign-in)
3. Enable **Cloud Firestore** (start in test mode, then deploy rules)
4. Enable **Cloud Storage**
5. Deploy security rules:

```bash
firebase deploy --only firestore:rules,storage
```

6. (Optional) Seed test data:

```bash
npm run db:seed          # Seed Firestore collections
npm run db:seed-users    # Create test users
```

### 4. Run Locally

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack.

**Demo credentials** (development only):

- Admin: `admin@pawmatch.com` / `admin123`
- User: `user@pawmatch.com` / `user123`

### 5. Build and Deploy

```bash
npm run build            # Static export to out/
firebase deploy          # Deploy to Firebase Hosting
```

The build generates a fully static site in `out/`. No server runtime required.

---

## Scripts

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start dev server (Turbopack)            |
| `npm run build`         | Production build (static export)        |
| `npm run start`         | Start production server (local preview) |
| `npm run lint`          | Run ESLint                              |
| `npm run db:seed`       | Seed Firestore with initial data        |
| `npm run db:seed-users` | Create test user accounts               |

---

## Documentation

Full documentation is in the [`docs/`](docs/index.md) folder:

| Document                                           | Description                             |
| -------------------------------------------------- | --------------------------------------- |
| [Documentation Index](docs/index.md)               | Hub linking all docs                    |
| [Architecture](docs/architecture.md)               | System design, data flow, auth model    |
| [Routing Guide](docs/routing-guide.md)             | Route groups, layouts, guards           |
| [Route Inventory](docs/route-inventory.md)         | Complete list of all 64+ pages          |
| [Components Guide](docs/components-guide.md)       | All 64 components by domain             |
| [Styling Guide](docs/styling-guide.md)             | Tailwind, shadcn/ui, theming            |
| [Editing Pages Guide](docs/editing-pages-guide.md) | Quick-reference: where to edit anything |
| [Firebase Data Model](docs/firebase/data-model.md) | Firestore collections and schemas       |
| [Firebase Services](docs/firebase/services.md)     | SDK setup, storage, email, auth         |
| [Security Rules](docs/firebase/security-rules.md)  | Firestore and Storage access control    |

Page-specific documentation is in [`docs/pages/`](docs/pages/).

---

## Key Architecture Decisions

- **Static Export** (`output: "export"`): Entire site pre-rendered at build time. No Node.js server in production.
- **Hybrid Data Model**: Public content uses static TypeScript datasets. User data uses Firestore at runtime.
- **Firebase Auth**: Client-side authentication with browser local persistence and role-based routing.
- **Server/Client Split**: SEO pages are server components wrapping `"use client"` children in `<Suspense>`.
- **INR-First**: Currency, pricing, and marketplace data are India-focused (₹ with Indian comma grouping).

---

## Troubleshooting

| Issue                            | Solution                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `Module not found` on Firebase   | Ensure all `NEXT_PUBLIC_FIREBASE_*` env vars are set in `.env.local`                    |
| Build fails with metadata error  | Page must be server component to export `metadata`. Move client logic to `*-client.tsx` |
| Images not loading in production | `unoptimized: true` in next.config.ts. Check remote domains in `remotePatterns`         |
| Firebase rules blocking reads    | Deploy rules with `firebase deploy --only firestore:rules`                              |
| Vendor pages redirect to login   | Register through `/vendor/signup` first                                                 |
| Static export missing routes     | Ensure `generateStaticParams()` is defined for all `[slug]` routes                      |
| EmailJS not sending              | Verify all three `NEXT_PUBLIC_EMAILJS_*` variables are set                              |
| Symptom helper errors            | Requires `OPENAI_API_KEY` env variable                                                  |

---

## License

Private project. All rights reserved.
