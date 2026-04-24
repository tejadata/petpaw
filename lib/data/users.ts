import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "@/types/user";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToUser(id: string, data: Record<string, unknown>): User {
  return {
    ...(data as Omit<User, "id" | "createdAt" | "updatedAt">),
    id,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const snap = await getDoc(doc(db, "users", userId));
    if (!snap.exists()) return null;
    return docToUser(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function createUserProfile(
  userId: string,
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> {
  const now = new Date();
  const user: Omit<User, "id"> = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(doc(db, "users", userId), user);
  return { ...user, id: userId };
}

export async function updateUserProfile(
  userId: string,
  data: Partial<Omit<User, "id" | "createdAt">>
): Promise<User> {
  const now = new Date();
  await updateDoc(doc(db, "users", userId), { ...data, updatedAt: now });
  const updated = await getUserById(userId);
  return updated ?? ({ ...data, id: userId, updatedAt: now } as User);
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => docToUser(doc.id, doc.data() as Record<string, unknown>));
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}

export async function getUsersByRole(role: "USER" | "ADMIN"): Promise<User[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("role", "==", role))
    );
    return querySnapshot.docs.map((doc) => docToUser(doc.id, doc.data() as Record<string, unknown>));
  } catch (error) {
    console.error("Error fetching users by role:", error);
    return [];
  }
}