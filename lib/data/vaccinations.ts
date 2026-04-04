import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  VaccinationSchedule,
  VaccinationDose,
  VaccineScheduleTemplate,
} from "@/types/vaccination";
import { generateVaccinationTimeline, applyCompletedDoses } from "@/lib/vaccination/scheduling";

// ─── Firestore converters ──────────────────────────────────────────────────

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToSchedule(
  id: string,
  data: Record<string, unknown>
): VaccinationSchedule {
  return {
    id,
    userId: data.userId as string,
    petId: data.petId as string,
    petName: data.petName as string,
    templateId: data.templateId as string,
    templateName: data.templateName as string,
    startDate: toDate(data.startDate),
    scheduleStatus: data.scheduleStatus as VaccinationSchedule["scheduleStatus"],
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

function docToDose(id: string, data: Record<string, unknown>): VaccinationDose {
  return {
    id,
    userId: data.userId as string,
    petId: data.petId as string,
    scheduleId: data.scheduleId as string,
    vaccineCode: data.vaccineCode as string,
    vaccineName: data.vaccineName as string,
    doseLabel: data.doseLabel as string,
    recommendedAgeLabel: data.recommendedAgeLabel as string,
    plannedDate: toDate(data.plannedDate),
    completedDate: data.completedDate ? toDate(data.completedDate) : null,
    status: data.status as VaccinationDose["status"],
    notes: (data.notes as string | null) ?? null,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

// ─── Schedule CRUD ─────────────────────────────────────────────────────────

export async function getVaccinationScheduleByPet(
  userId: string,
  petId: string
): Promise<VaccinationSchedule | null> {
  try {
    const q = query(
      collection(db, "vaccinationSchedules"),
      where("userId", "==", userId),
      where("petId", "==", petId)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return docToSchedule(d.id, d.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getVaccinationSchedulesByUser(
  userId: string
): Promise<VaccinationSchedule[]> {
  try {
    const q = query(
      collection(db, "vaccinationSchedules"),
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) =>
      docToSchedule(d.id, d.data() as Record<string, unknown>)
    );
  } catch {
    return [];
  }
}

/**
 * Create a vaccination schedule for a pet and persist all dose records.
 *
 * @param completedDoses - doses the user has already completed (with dates)
 */
export async function createPetVaccinationSchedule(
  userId: string,
  petId: string,
  petName: string,
  template: VaccineScheduleTemplate,
  startDate: Date,
  completedDoses: Array<{ vaccineCode: string; completedDate: Date }> = []
): Promise<{ schedule: VaccinationSchedule; doses: VaccinationDose[] }> {
  const now = new Date();

  // 1. Create schedule document
  let timeline = generateVaccinationTimeline(template, startDate);
  if (completedDoses.length > 0) {
    timeline = applyCompletedDoses(timeline, completedDoses);
  }

  const scheduleData = {
    userId,
    petId,
    petName,
    templateId: template.id,
    templateName: template.name,
    startDate,
    scheduleStatus: "active" as const,
    createdAt: now,
    updatedAt: now,
  };

  const scheduleRef = await addDoc(
    collection(db, "vaccinationSchedules"),
    scheduleData
  );
  const schedule: VaccinationSchedule = {
    ...scheduleData,
    id: scheduleRef.id,
  };

  // 2. Batch-create all dose documents
  const batch = writeBatch(db);
  const doseRefs: VaccinationDose[] = [];

  for (const dose of timeline) {
    const doseRef = doc(collection(db, "vaccinationDoses"));
    const doseData = {
      ...dose,
      userId,
      petId,
      scheduleId: scheduleRef.id,
      createdAt: now,
      updatedAt: now,
    };
    batch.set(doseRef, doseData);
    doseRefs.push({ ...doseData, id: doseRef.id });
  }

  await batch.commit();

  return { schedule, doses: doseRefs };
}

// ─── Dose CRUD ─────────────────────────────────────────────────────────────

export async function getVaccinationDosesBySchedule(
  scheduleId: string
): Promise<VaccinationDose[]> {
  try {
    const q = query(
      collection(db, "vaccinationDoses"),
      where("scheduleId", "==", scheduleId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToDose(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => a.plannedDate.getTime() - b.plannedDate.getTime());
  } catch {
    return [];
  }
}

export async function getVaccinationDosesByPet(
  userId: string,
  petId: string
): Promise<VaccinationDose[]> {
  try {
    const q = query(
      collection(db, "vaccinationDoses"),
      where("userId", "==", userId),
      where("petId", "==", petId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToDose(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => a.plannedDate.getTime() - b.plannedDate.getTime());
  } catch {
    return [];
  }
}

export async function markDoseCompleted(
  doseId: string,
  completedDate: Date = new Date()
): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "vaccinationDoses", doseId), {
    status: "completed",
    completedDate,
    updatedAt: now,
  });
}

export async function markDoseSkipped(doseId: string): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "vaccinationDoses", doseId), {
    status: "skipped",
    updatedAt: now,
  });
}

export async function updateDoseDate(
  doseId: string,
  newPlannedDate: Date
): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "vaccinationDoses", doseId), {
    plannedDate: newPlannedDate,
    status: "pending",
    updatedAt: now,
  });
}

export async function updateDoseNotes(
  doseId: string,
  notes: string
): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "vaccinationDoses", doseId), {
    notes,
    updatedAt: now,
  });
}

/**
 * Recalculate and persist future dose dates after a first-dose date change.
 */
export async function regenerateScheduleFromFirstDose(
  scheduleId: string,
  newStartDate: Date,
  template: VaccineScheduleTemplate
): Promise<void> {
  const doses = await getVaccinationDosesBySchedule(scheduleId);
  const now = new Date();
  const batch = writeBatch(db);

  for (const dose of doses) {
    if (dose.status === "completed" || dose.status === "skipped") continue;
    const tpl = template.doses.find(
      (t) => t.vaccineCode === dose.vaccineCode
    );
    if (!tpl) continue;
    const newPlannedDate = new Date(newStartDate);
    newPlannedDate.setDate(
      newPlannedDate.getDate() + tpl.dayOffsetFromStart
    );
    batch.update(doc(db, "vaccinationDoses", dose.id), {
      plannedDate: newPlannedDate,
      updatedAt: now,
    });
  }

  // Also update the schedule start date
  batch.update(doc(db, "vaccinationSchedules", scheduleId), {
    startDate: newStartDate,
    updatedAt: now,
  });

  await batch.commit();
}

/**
 * Delete a vaccination schedule and all its dose records.
 */
export async function deleteVaccinationSchedule(
  scheduleId: string
): Promise<void> {
  const doses = await getVaccinationDosesBySchedule(scheduleId);
  const batch = writeBatch(db);
  for (const dose of doses) {
    batch.delete(doc(db, "vaccinationDoses", dose.id));
  }
  batch.delete(doc(db, "vaccinationSchedules", scheduleId));
  await batch.commit();
}

// ─── Aggregation helpers ───────────────────────────────────────────────────

export async function getUpcomingVaccinationDoses(
  userId: string,
  limit = 5
): Promise<VaccinationDose[]> {
  try {
    const now = new Date();
    const q = query(
      collection(db, "vaccinationDoses"),
      where("userId", "==", userId),
      where("status", "==", "pending")
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToDose(d.id, d.data() as Record<string, unknown>))
      .filter((d) => d.plannedDate >= now)
      .sort((a, b) => a.plannedDate.getTime() - b.plannedDate.getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getOverdueVaccinationDoses(
  userId: string
): Promise<VaccinationDose[]> {
  try {
    const now = new Date();
    const q = query(
      collection(db, "vaccinationDoses"),
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToDose(d.id, d.data() as Record<string, unknown>))
      .filter(
        (d) =>
          (d.status === "pending" || d.status === "overdue") &&
          d.plannedDate < now
      )
      .sort((a, b) => a.plannedDate.getTime() - b.plannedDate.getTime());
  } catch {
    return [];
  }
}
