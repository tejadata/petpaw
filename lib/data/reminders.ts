import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Reminder } from "@/types/reminder";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToReminder(id: string, data: Record<string, unknown>): Reminder {
  return {
    ...(data as Omit<Reminder, "id" | "scheduledDate" | "completedAt" | "createdAt" | "updatedAt">),
    id,
    petId: (data.petId as string | null) ?? (data.dogProfileId as string | null) ?? null,
    petName: (data.petName as string | null) ?? (data.dogName as string | null) ?? null,
    priority: (data.priority as Reminder["priority"]) ?? "medium",
    recurringFrequency: (data.recurringFrequency as Reminder["recurringFrequency"]) ?? "Once",
    scheduledDate: toDate(data.scheduledDate),
    completedAt: data.completedAt ? toDate(data.completedAt) : null,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getReminders(userId: string): Promise<Reminder[]> {
  try {
    const q = query(
      collection(db, "reminders"),
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReminder(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
  } catch {
    return [];
  }
}

export async function getRemindersByPet(userId: string, petId: string): Promise<Reminder[]> {
  try {
    const q = query(
      collection(db, "reminders"),
      where("userId", "==", userId),
      where("petId", "==", petId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReminder(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
  } catch {
    return [];
  }
}

export async function getUpcomingReminders(userId: string, limit = 5): Promise<Reminder[]> {
  try {
    const now = new Date();
    const q = query(
      collection(db, "reminders"),
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReminder(d.id, d.data() as Record<string, unknown>))
      .filter((r) => !r.completed && r.scheduledDate >= now)
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getOverdueReminders(userId: string): Promise<Reminder[]> {
  try {
    const now = new Date();
    const q = query(
      collection(db, "reminders"),
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReminder(d.id, d.data() as Record<string, unknown>))
      .filter((r) => !r.completed && r.scheduledDate < now)
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
  } catch {
    return [];
  }
}

export async function createReminder(
  userId: string,
  data: Omit<Reminder, "id" | "userId" | "completed" | "completedAt" | "createdAt" | "updatedAt">
): Promise<Reminder> {
  const now = new Date();
  const reminder = {
    ...data,
    userId,
    completed: false,
    completedAt: null,
    priority: data.priority ?? "medium",
    recurringFrequency: data.recurringFrequency ?? "Once",
    createdAt: now,
    updatedAt: now,
  };
  const ref = await addDoc(collection(db, "reminders"), reminder);
  return { ...reminder, id: ref.id };
}

export async function updateReminder(
  id: string,
  data: Partial<Omit<Reminder, "id" | "userId" | "createdAt">>
): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "reminders", id), { ...data, updatedAt: now });
}

export async function markReminderComplete(id: string): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "reminders", id), {
    completed: true,
    completedAt: now,
    updatedAt: now,
  });
}

export async function markReminderIncomplete(id: string): Promise<void> {
  const now = new Date();
  await updateDoc(doc(db, "reminders", id), {
    completed: false,
    completedAt: null,
    updatedAt: now,
  });
}

export async function deleteReminder(id: string): Promise<void> {
  await deleteDoc(doc(db, "reminders", id));
}
