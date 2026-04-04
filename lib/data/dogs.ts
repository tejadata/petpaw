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
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { DogProfile } from "@/types/user";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToProfile(id: string, data: Record<string, unknown>): DogProfile {
  return {
    ...(data as Omit<DogProfile, "id" | "createdAt" | "updatedAt">),
    id,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getDogProfiles(userId: string): Promise<DogProfile[]> {
  try {
    const q = query(collection(db, "dogProfiles"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => docToProfile(d.id, d.data() as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getDogProfileById(id: string, userId: string): Promise<DogProfile | null> {
  try {
    const snap = await getDoc(doc(db, "dogProfiles", id));
    if (!snap.exists() || snap.data()?.userId !== userId) return null;
    return docToProfile(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function createDogProfile(
  userId: string,
  data: Omit<DogProfile, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<DogProfile> {
  const now = new Date();
  const profile = { ...data, userId, createdAt: now, updatedAt: now };
  const ref = await addDoc(collection(db, "dogProfiles"), profile);
  return { ...profile, id: ref.id };
}

export async function updateDogProfile(
  id: string,
  userId: string,
  data: Partial<DogProfile>
): Promise<DogProfile> {
  const now = new Date();
  await updateDoc(doc(db, "dogProfiles", id), { ...data, updatedAt: now });
  const updated = await getDogProfileById(id, userId);
  return updated ?? ({ ...data, id, userId, updatedAt: now } as DogProfile);
}

export async function deleteDogProfile(id: string, _userId: string): Promise<void> {
  await deleteDoc(doc(db, "dogProfiles", id));
}
