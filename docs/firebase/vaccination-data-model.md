# Vaccination Data Model

## Overview

The vaccination feature uses two Firestore collections — `vaccinationSchedules` (one per pet) and `vaccinationDoses` (one per dose per pet). Vaccine schedule templates are stored as static TypeScript data in `lib/datasets/vaccination-templates.ts` and are not persisted in Firestore.

---

## Collections

### `vaccinationSchedules`

Links a pet to a vaccination template and records when the schedule was started.

```
vaccinationSchedules/{scheduleId}
├── userId: string
├── petId: string
├── petName: string
├── templateId: string          // matches VaccineScheduleTemplate.id
├── templateName: string
├── startDate: Timestamp        // first dose date
├── scheduleStatus: "active" | "completed" | "paused"
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

**Queries used:**
- `where("userId", "==", uid)` — get all schedules for a user
- `where("userId", "==", uid), where("petId", "==", petId)` — get schedule for a specific pet

### `vaccinationDoses`

Individual dose records with status tracking.

```
vaccinationDoses/{doseId}
├── userId: string
├── petId: string
├── scheduleId: string          // parent schedule document ID
├── vaccineCode: string         // e.g. "DHPPi-1", "RABIES-1"
├── vaccineName: string         // display name
├── doseLabel: string           // e.g. "1st Dose", "Yearly Booster"
├── recommendedAgeLabel: string // e.g. "6–8 weeks"
├── plannedDate: Timestamp      // calculated from template offset
├── completedDate: Timestamp?   // null until marked completed
├── status: "pending" | "completed" | "overdue" | "skipped"
├── notes: string?
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

**Queries used:**
- `where("scheduleId", "==", scheduleId)` — get all doses for a schedule
- `where("userId", "==", uid), where("petId", "==", petId)` — get doses for a pet
- `where("userId", "==", uid), where("status", "==", "pending")` — upcoming doses

---

## Relationships

```
User
 └── Pet (pets collection)
      └── VaccinationSchedule (vaccinationSchedules, 1 per pet)
           └── VaccinationDose[] (vaccinationDoses, N per schedule)
```

- One `vaccinationSchedule` per pet (enforced at application level).
- Doses reference their parent schedule via `scheduleId`.
- Both collections include `userId` and `petId` for direct querying.

---

## Static Template Data

Templates are defined in `lib/datasets/vaccination-templates.ts` and exported as `VACCINATION_TEMPLATES[]`.

```typescript
interface VaccineScheduleTemplate {
  id: string;              // "india-puppy-standard"
  name: string;
  countryCode: string;     // "IN"
  species: string;         // "Dog"
  lifeStage: string;       // "puppy" | "adult" | "all"
  doses: VaccineDoseTemplate[];
  isDefault: boolean;
}

interface VaccineDoseTemplate {
  vaccineCode: string;
  vaccineName: string;
  doseLabel: string;
  dayOffsetFromStart: number;  // days from first dose
  recommendedAgeLabel: string;
  notes: string | null;
}
```

Templates are referenced by `templateId` in the Firestore schedule document. The template data itself is not stored in Firestore — it lives in code for easy version control and type safety.

---

## Security Rules (suggested)

Add to `firestore.rules`:

```
match /vaccinationSchedules/{scheduleId} {
  allow read, write: if request.auth != null
    && request.auth.uid == resource.data.userId;
  allow create: if request.auth != null
    && request.auth.uid == request.resource.data.userId;
}

match /vaccinationDoses/{doseId} {
  allow read, write: if request.auth != null
    && request.auth.uid == resource.data.userId;
  allow create: if request.auth != null
    && request.auth.uid == request.resource.data.userId;
}
```

---

## Data Layer Functions

All in `lib/data/vaccinations.ts`:

| Function | Purpose |
|---|---|
| `getVaccinationScheduleByPet(userId, petId)` | Get the schedule for a specific pet |
| `getVaccinationSchedulesByUser(userId)` | Get all schedules for a user |
| `createPetVaccinationSchedule(userId, petId, petName, template, startDate, completedDoses)` | Create schedule + batch-write all doses |
| `getVaccinationDosesBySchedule(scheduleId)` | Get all doses for a schedule |
| `getVaccinationDosesByPet(userId, petId)` | Get all doses for a pet |
| `markDoseCompleted(doseId, completedDate)` | Mark a dose as completed |
| `markDoseSkipped(doseId)` | Mark a dose as skipped |
| `updateDoseDate(doseId, newPlannedDate)` | Change a dose's planned date |
| `updateDoseNotes(doseId, notes)` | Update a dose's notes |
| `regenerateScheduleFromFirstDose(scheduleId, newStartDate, template)` | Recalculate all pending doses |
| `deleteVaccinationSchedule(scheduleId)` | Delete schedule + all doses (batch) |
| `getUpcomingVaccinationDoses(userId, limit)` | Future pending doses across all pets |
| `getOverdueVaccinationDoses(userId)` | Past-due doses across all pets |
