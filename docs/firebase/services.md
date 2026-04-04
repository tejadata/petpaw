# Firebase Services

Reference for all Firebase SDK integrations, storage utilities, authentication setup, and external service connections.

---

## Client SDK — `lib/firebase.ts`

Initializes the Firebase client SDK for browser use.

**Exports:** `app`, `auth`, `db`, `storage`

```typescript
import { app, auth, db, storage } from "@/lib/firebase";
```

| Export | Firebase Service | Purpose |
|---|---|---|
| `app` | `firebase/app` | Firebase app instance |
| `auth` | `firebase/auth` | Authentication (sign-in, sign-up, state) |
| `db` | `firebase/firestore` | Cloud Firestore (document reads/writes) |
| `storage` | `firebase/storage` | Cloud Storage (file uploads/downloads) |

**Configuration:** Uses `NEXT_PUBLIC_FIREBASE_*` environment variables. Prevents duplicate initialization with `getApps().length` check.

---

## Admin SDK — `lib/firebase-admin.ts`

Server-side Firebase Admin SDK for use in build-time operations and seed scripts.

**Exports:** `adminDb`

```typescript
import { adminDb } from "@/lib/firebase-admin";
```

**Initialization priority:**
1. `FIREBASE_SERVICE_ACCOUNT_KEY` env var (full JSON string)
2. `NEXT_PUBLIC_FIREBASE_PROJECT_ID` with default credentials (Firebase Hosting)
3. Returns `{ db: null }` if neither configured (static data fallback)

**Used by:** Seed scripts (`scripts/seed-firestore.ts`, `scripts/seed-users.ts`)

---

## Auth Context — `lib/auth-context.tsx`

React context providing Firebase Auth state to the component tree.

**Exports:** `AuthProvider`, `useAuth()`

```typescript
import { useAuth } from "@/lib/auth-context";

const { user, loading } = useAuth();
```

| Value | Type | Description |
|---|---|---|
| `user` | `User \| null` | Current Firebase user object, or null if signed out |
| `loading` | `boolean` | True while auth state is initializing |

**Setup:** `<AuthProvider>` wraps the entire app in `app/layout.tsx`

---

## NextAuth — `auth.ts`

NextAuth v5 configuration at the project root.

**Providers:**
- **Google OAuth** — social sign-in via `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`
- **Credentials** — demo accounts for development only

**Session strategy:** JWT (no database session)

**Custom user fields:**
- `id: string` — user identifier
- `role: "USER" | "ADMIN"` — role-based access

**Callbacks:**
- `jwt` — stores `id` and `role` in JWT token
- `session` — exposes `id` and `role` in session object

**Pages:**
- Sign-in: `/login`
- Error: `/login`

---

## Storage Utilities — `lib/storage.ts`

File upload and delete operations for Firebase Cloud Storage.

**Exports:**

| Function | Signature | Description |
|---|---|---|
| `uploadFile` | `(path, file, onProgress?) → Promise<UploadResult>` | Resumable upload with progress callback |
| `deleteFile` | `(path) → Promise<void>` | Delete file; ignores "not found" errors |
| `petProfileImagePath` | `(userId, petId, ext) → string` | Builds: `users/{userId}/pets/{petId}/profile.{ext}` |
| `medicalReportFilePath` | `(userId, petId, reportId, fileName) → string` | Builds: `users/{userId}/reports/{petId}/{reportId}/{fileName}` |

**UploadResult type:**
```typescript
interface UploadResult {
  url: string;      // Download URL
  path: string;     // Storage path
  fileName: string; // Original file name
  fileSize: number; // Size in bytes
}
```

---

## Email Service — `lib/email.ts`

EmailJS integration for sending pet reminder notification emails.

**Exports:**

| Function | Description |
|---|---|
| `isEmailConfigured()` | Returns `true` if all three EmailJS env vars are set |
| `sendReminderEmail(params)` | Sends reminder email, returns `boolean` success flag |

**Email parameters:**
- `toEmail`, `toName` — recipient
- `reminderTitle`, `petName` — content
- `dueDate`, `reminderType`, `priority`, `notes` — reminder details

**Environment variables:**
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

---

## Data Access Layer — `lib/data/`

All data operations are accessed through this layer. Pages and components never import Firestore or datasets directly.

### Static Data Readers

These modules read from `lib/datasets/` and apply filtering/searching in-memory:

| Module | Source | Key Functions |
|---|---|---|
| `lib/data/breeds.ts` | `datasets/breeds.ts` | `getBreeds()`, `getBreedBySlug()`, `getFeaturedBreeds()`, `searchBreeds()`, `getBreedsBySize()` |
| `lib/data/health.ts` | `datasets/health-articles.ts` + `health-categories.ts` | `getHealthArticles()`, `getHealthArticleBySlug()`, `getArticlesByCategory()`, `getFeaturedArticles()` |
| `lib/data/homemade-food.ts` | `datasets/homemade-food-articles.ts` | `getHomemadeFoodArticles()`, `getHomemadeFoodArticleBySlug()`, `getFeaturedHomemadeFoodArticles()` |
| `lib/data/products.ts` | `datasets/products.ts` | `getProducts()`, `getProductsByCategory()`, `getProductById()` |
| `lib/data/faqs.ts` | `datasets/faqs.ts` | `getFAQs()`, `getAllFAQs()`, `getFAQsByCategory()` |
| `lib/data/symptoms.ts` | `datasets/symptoms.ts` | `getSymptoms()`, `checkSymptomWarnings()` |

### Firestore CRUD Modules

| Module | Collection | Key Functions |
|---|---|---|
| `lib/data/pets.ts` | `pets` | `getPets()`, `getPetById()`, `createPet()`, `updatePet()`, `deletePet()` |
| `lib/data/dogs.ts` | `dogProfiles` | `getDogProfiles()`, `getDogProfileById()`, `createDogProfile()`, `updateDogProfile()`, `deleteDogProfile()` |
| `lib/data/reminders.ts` | `reminders` | `getReminders()`, `getReminderById()`, `createReminder()`, `updateReminder()`, `deleteReminder()`, `completeReminder()` |
| `lib/data/medical-reports.ts` | `medicalReports` | `getReportsByUser()`, `getReportById()`, `createReport()`, `deleteReport()` |
| `lib/data/favorites.ts` | `favorites` | `getFavoriteBreedIds()`, `toggleFavoriteBreed()`, `toggleFavoriteArticle()`, `toggleFavoriteProduct()` |
| `lib/data/admin.ts` | Various | `getAdminStats()` (counts + recent logs) |

### Vendor Data Modules

| Module | Collection | Key Functions |
|---|---|---|
| `lib/data/vendor/vendors.ts` | `vendors` | `getVendorByUserId()`, `createVendorProfile()`, `updateVendorProfile()` |
| `lib/data/vendor/stores.ts` | `stores` | `getStoreByVendor()`, `getStoreById()`, `createStore()`, `updateStore()` |
| `lib/data/vendor/puppy-listings.ts` | `puppyListings` | `getPuppyListingsByVendor()`, `createPuppyListing()`, `getPublishedPuppyListings()`, `getPublicPuppyListingById()` |
| `lib/data/vendor/vendor-products.ts` | `vendorProducts` | `getVendorProductsByVendor()`, `createVendorProduct()`, `getPublishedVendorProducts()` |
| `lib/data/vendor/vendor-storage.ts` | Storage | Vendor image upload/delete utilities |

---

## LLM Integration — `lib/llm/symptom-check.ts`

OpenAI GPT-4o integration for the symptom helper feature.

**Exports:** `getSymptomAnalysis()`

Sends a structured prompt with pet symptoms to GPT-4o and returns veterinary guidance. Includes a disclaimer that it is not a substitute for professional veterinary care.

**Environment variable:** `OPENAI_API_KEY`

---

## Quiz Engine — `lib/quiz/`

Breed matching quiz scoring and explanation system.

| File | Exports | Purpose |
|---|---|---|
| `lib/quiz/engine.ts` | `scoreBreeds()` | Scores all breeds 0–100 based on quiz answers matching breed traits |
| `lib/quiz/explanations.ts` | `generateExplanation()` | Creates human-readable match explanations for top breeds |
| `lib/quiz/types.ts` | `QuizTraitMapping`, `ScoredBreed` | Type definitions for quiz system |
