# Vaccination Reminders Feature

## Overview

The vaccination reminder module lets users manage dog vaccination schedules inside the dashboard. Users select a pet, choose an India-oriented vaccination template, enter the first dose date, and the system automatically calculates and tracks all subsequent doses with overdue/upcoming status tracking.

**Important:** The vaccination schedule is presented as **educational scheduling guidance only** — it is not veterinary advice. A disclaimer is shown on every relevant screen.

---

## Routes

| Route | File | Purpose |
|---|---|---|
| `/dashboard/vaccinations` | `app/(dashboard)/dashboard/vaccinations/page.tsx` | Overview of all pets' vaccination schedules |
| `/dashboard/vaccinations/setup` | `app/(dashboard)/dashboard/vaccinations/setup/page.tsx` | Create a new schedule (?petId= optional) |
| `/dashboard/vaccinations/timeline` | `app/(dashboard)/dashboard/vaccinations/timeline/page.tsx` | View & manage dose timeline (?petId= required) |

---

## Main Files

| File | Purpose |
|---|---|
| `types/vaccination.ts` | TypeScript interfaces for schedules, doses, templates, summaries |
| `lib/datasets/vaccination-templates.ts` | Configurable India puppy vaccination schedule template |
| `lib/vaccination/scheduling.ts` | Pure scheduling logic — no Firebase dependency |
| `lib/data/vaccinations.ts` | Firestore CRUD for schedules and doses |
| `lib/validations/vaccination.ts` | Zod schemas for setup form and dose actions |
| `components/dashboard/vaccinations/vaccination-setup-form.tsx` | Setup form component |
| `components/dashboard/vaccinations/vaccination-timeline.tsx` | Timeline + progress bar |
| `components/dashboard/vaccinations/vaccination-dose-row.tsx` | Individual dose row with actions |
| `components/dashboard/vaccinations/vaccination-summary-card.tsx` | Pet vaccine summary card |
| `components/dashboard/vaccinations/vaccination-schedule-card.tsx` | Schedule list card |
| `components/dashboard/vaccinations/vaccine-status-badge.tsx` | Status badge (pending/completed/overdue/skipped) |

---

## Firestore Collections

### `vaccinationSchedules`

One document per pet. Links the pet to a template and stores the start date.

| Field | Type | Description |
|---|---|---|
| `userId` | string | Owner user ID |
| `petId` | string | Pet document ID |
| `petName` | string | Pet name (denormalized for display) |
| `templateId` | string | Template ID from `vaccination-templates.ts` |
| `templateName` | string | Template name (denormalized) |
| `startDate` | Timestamp | Date of the first dose |
| `scheduleStatus` | string | `"active"` / `"completed"` / `"paused"` |
| `createdAt` | Timestamp | Created timestamp |
| `updatedAt` | Timestamp | Last modified timestamp |

### `vaccinationDoses`

One document per dose. Tracks planned date, completion, and status.

| Field | Type | Description |
|---|---|---|
| `userId` | string | Owner user ID |
| `petId` | string | Pet document ID |
| `scheduleId` | string | Parent schedule document ID |
| `vaccineCode` | string | Unique code (e.g. `"DHPPi-1"`, `"RABIES-1"`) |
| `vaccineName` | string | Display name |
| `doseLabel` | string | E.g. "1st Dose", "Yearly Booster" |
| `recommendedAgeLabel` | string | E.g. "6–8 weeks" |
| `plannedDate` | Timestamp | Calculated due date |
| `completedDate` | Timestamp? | Actual completion date (null if not done) |
| `status` | string | `"pending"` / `"completed"` / `"overdue"` / `"skipped"` |
| `notes` | string? | Optional notes |
| `createdAt` | Timestamp | Created timestamp |
| `updatedAt` | Timestamp | Last modified timestamp |

---

## Reminder Generation Logic

### How auto-calculation works

1. User selects a template and enters the **first dose date** (the "start date").
2. `generateVaccinationTimeline()` in `lib/vaccination/scheduling.ts` takes the template's `doses[]` array and computes each dose's `plannedDate` by adding `dayOffsetFromStart` to the start date.
3. If the user marks specific doses as already completed during setup, `applyCompletedDoses()` sets their status to `"completed"` with the user-provided date.
4. All dose records are batch-written to the `vaccinationDoses` Firestore collection.
5. `computeLiveDoseStatuses()` is called on every page load to update any `"pending"` dose whose `plannedDate` is in the past to `"overdue"`.

### When a date changes

- **First dose date changed:** `regenerateScheduleFromFirstDose()` recalculates ALL non-completed, non-skipped doses relative to the new start date using a Firestore batch write.
- **Later dose date changed:** Only that specific dose's `plannedDate` is updated via `updateDoseDate()`.

### Status transitions

```
pending  →  completed   (user marks done)
pending  →  overdue     (automatic, based on current date)
pending  →  skipped     (user explicitly skips)
overdue  →  completed   (user marks done late)
overdue  →  skipped     (user explicitly skips)
```

---

## India Vaccination Schedule Template

Defined in `lib/datasets/vaccination-templates.ts` as `INDIA_PUPPY_SCHEDULE`.

| Dose | Vaccine | Day Offset | Recommended Age |
|---|---|---|---|
| 1st Dose | DHPPi | 0 | 6–8 weeks |
| 2nd Dose (Booster) | DHPPi | +21 days | 9–11 weeks |
| 3rd Dose (Booster) | DHPPi | +42 days | 12–13 weeks |
| 1st Rabies | Anti-Rabies | +42 days | 12–13 weeks |
| 4th Dose (Final) | DHPPi | +63 days | 15–16 weeks |
| Optional | Kennel Cough | +63 days | 15–16 weeks |
| Yearly Booster | DHPPi Annual | +365 days | ~1 year |
| Yearly Rabies | Anti-Rabies Annual | +365 days | ~1 year |

All offsets are relative to the first dose date entered by the user.

### How to add a new template

1. Open `lib/datasets/vaccination-templates.ts`.
2. Create a new `VaccineScheduleTemplate` object with a unique `id`.
3. Add it to the `VACCINATION_TEMPLATES` array.
4. Set `isDefault: true` if it should be the default for its species + country.

---

## How to Edit

| I want to change… | Edit this file |
|---|---|
| India vaccination schedule doses | `lib/datasets/vaccination-templates.ts` → `INDIA_PUPPY_SCHEDULE.doses` |
| Add a new schedule template | `lib/datasets/vaccination-templates.ts` → `VACCINATION_TEMPLATES` array |
| Reminder generation logic | `lib/vaccination/scheduling.ts` |
| Firestore CRUD operations | `lib/data/vaccinations.ts` |
| Setup form fields/layout | `components/dashboard/vaccinations/vaccination-setup-form.tsx` |
| Timeline UI / dose rows | `components/dashboard/vaccinations/vaccination-timeline.tsx` and `vaccination-dose-row.tsx` |
| Status badge colours | `components/dashboard/vaccinations/vaccine-status-badge.tsx` |
| Summary card display | `components/dashboard/vaccinations/vaccination-summary-card.tsx` |
| Form validation schemas | `lib/validations/vaccination.ts` |
| Type definitions | `types/vaccination.ts` |
| Dashboard home vaccination info | `app/(dashboard)/dashboard/page.tsx` |
| Sidebar link | `components/dashboard/sidebar.tsx` |
| Vaccination overview page | `app/(dashboard)/dashboard/vaccinations/page.tsx` |
| Setup page | `app/(dashboard)/dashboard/vaccinations/setup/page.tsx` |
| Timeline page | `app/(dashboard)/dashboard/vaccinations/timeline/page.tsx` |

---

## Debugging Reminder Generation

1. **Doses not appearing:** Check that `createPetVaccinationSchedule()` was called successfully. Look in the Firestore `vaccinationDoses` collection for documents with the correct `scheduleId`.
2. **Wrong dates:** Verify `dayOffsetFromStart` values in `vaccination-templates.ts`. Ensure the user's timezone isn't causing off-by-one date shifts (all dates use `startOfDay()` normalisation).
3. **Overdue not showing:** `computeLiveDoseStatuses()` must be called on the loaded doses. It compares `plannedDate` to today's date.
4. **Recalculation not working:** `regenerateScheduleFromFirstDose()` uses a Firestore batch write. Check the browser console for write permission errors against `vaccinationDoses` documents.
5. **Template not found:** Ensure `getTemplateById()` is called with the correct `templateId` that matches a template in `VACCINATION_TEMPLATES`.
