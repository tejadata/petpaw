# User Dashboard

## Purpose

Authenticated area where users manage their pets, set care reminders, upload medical reports, view favorites, and adjust settings. Contains 15 sub-pages organized around pet management.

## Routes

All routes require user authentication (`useAuthGuard()`).

| Route | File | Purpose |
|---|---|---|
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Overview with stats and recent activity |
| `/dashboard/pets` | `app/(dashboard)/dashboard/pets/page.tsx` | Pet profiles list |
| `/dashboard/pets/new` | `app/(dashboard)/dashboard/pets/new/page.tsx` | Create new pet |
| `/dashboard/pets/edit` | `app/(dashboard)/dashboard/pets/edit/page.tsx` | Edit pet (?id= param) |
| `/dashboard/pets/view` | `app/(dashboard)/dashboard/pets/view/page.tsx` | View pet detail (?id= param) |
| `/dashboard/dogs` | `app/(dashboard)/dashboard/dogs/page.tsx` | Legacy dog profiles list |
| `/dashboard/dogs/new` | `app/(dashboard)/dashboard/dogs/new/page.tsx` | Create legacy dog profile |
| `/dashboard/reminders` | `app/(dashboard)/dashboard/reminders/page.tsx` | Reminders list |
| `/dashboard/reminders/new` | `app/(dashboard)/dashboard/reminders/new/page.tsx` | Create reminder |
| `/dashboard/reminders/edit` | `app/(dashboard)/dashboard/reminders/edit/page.tsx` | Edit reminder (?id= param) |
| `/dashboard/reports` | `app/(dashboard)/dashboard/reports/page.tsx` | Medical reports list |
| `/dashboard/reports/new` | `app/(dashboard)/dashboard/reports/new/page.tsx` | Upload medical report |
| `/dashboard/reports/view` | `app/(dashboard)/dashboard/reports/view/page.tsx` | View report detail (?id= param) |
| `/dashboard/favorites` | `app/(dashboard)/dashboard/favorites/page.tsx` | Saved breeds, articles, products |
| `/dashboard/settings` | `app/(dashboard)/dashboard/settings/page.tsx` | User settings |

## Key Files

| File | Purpose |
|---|---|
| `app/(dashboard)/layout.tsx` | Dashboard layout (sidebar + auth guard) |
| `components/dashboard/sidebar.tsx` | Navigation sidebar |
| `components/dashboard/shared/stat-card.tsx` | Stats display |
| `components/dashboard/shared/file-upload-field.tsx` | File upload widget |
| `components/dashboard/shared/confirm-delete-dialog.tsx` | Delete confirmation |
| `components/dashboard/pets/pet-card.tsx` | Pet profile card |
| `components/dashboard/pets/pet-form.tsx` | Pet create/edit form |
| `components/dashboard/reminders/reminder-card.tsx` | Reminder card |
| `components/dashboard/reminders/reminder-form.tsx` | Reminder form |
| `components/dashboard/reports/medical-report-card.tsx` | Report list item |
| `components/dashboard/reports/medical-report-upload-form.tsx` | Report upload form |

## Data Sources & Firebase Collections

| Feature | Collection | Data Layer | Storage |
|---|---|---|---|
| Pets | `pets` | `lib/data/pets.ts` | `users/{uid}/pets/{petId}/profile.{ext}` |
| Dogs (legacy) | `dogProfiles` | `lib/data/dogs.ts` | — |
| Reminders | `reminders` | `lib/data/reminders.ts` | — |
| Reports | `medicalReports` | `lib/data/medical-reports.ts` | `users/{uid}/reports/{petId}/{reportId}/{fileName}` |
| Favorites | `favorites` | `lib/data/favorites.ts` | — |
| Settings | `users` | — | — |

## Validation Schemas

| Feature | Schema | File |
|---|---|---|
| Pets | `petSchema` | `lib/validations/pet.ts` |
| Dogs (legacy) | `dogProfileSchema` | `lib/validations/dog-profile.ts` |
| Reminders | `reminderSchema` | `lib/validations/reminder.ts` |
| Reports | `medicalReportSchema` | `lib/validations/medical-report.ts` |

## User Flow

1. User logs in → redirected to `/dashboard`
2. Dashboard overview shows stats (pet count, upcoming reminders, recent reports)
3. Navigate via sidebar to manage pets, reminders, reports, or favorites
4. CRUD operations on each sub-section (list → create/view/edit/delete)
5. Medical reports include file uploads to Firebase Storage

## How to Edit

| Change | File |
|---|---|
| Dashboard overview | `app/(dashboard)/dashboard/page.tsx` |
| Sidebar links | `components/dashboard/sidebar.tsx` |
| Pet form fields | `components/dashboard/pets/pet-form.tsx` + `lib/validations/pet.ts` |
| Pet card design | `components/dashboard/pets/pet-card.tsx` |
| Reminder form | `components/dashboard/reminders/reminder-form.tsx` + `lib/validations/reminder.ts` |
| Reminder types | `lib/constants.ts` → `REMINDER_TYPES` |
| Report upload form | `components/dashboard/reports/medical-report-upload-form.tsx` |
| Report types | `types/medical-report.ts` → `REPORT_TYPE_LABELS` |
| Layout/styling | `app/(dashboard)/layout.tsx` |
| Auth guard behavior | `lib/hooks/use-auth-guard.ts` |
| Email reminders | `lib/email.ts` → `sendReminderEmail()` |

## Notes

- All dashboard pages are client components (`"use client"`) — no SSR metadata
- Pet images are uploaded to Firebase Storage at `users/{uid}/pets/{petId}/profile.{ext}`
- Medical report files support various types (PDF, images)
- The `dogProfiles` collection is legacy — new pets use the `pets` collection
- Reminders can be recurring (daily, weekly, monthly, etc.)
- Favorites stores IDs only — actual data is resolved from static datasets or Firestore at display time
