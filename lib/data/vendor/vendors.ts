import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Vendor } from "@/types/vendor";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToVendor(id: string, data: Record<string, unknown>): Vendor {
  return {
    ...(data as Omit<Vendor, "id" | "createdAt" | "updatedAt">),
    id,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getVendorByUserId(userId: string): Promise<Vendor | null> {
  try {
    const snap = await getDoc(doc(db, "vendors", userId));
    if (!snap.exists()) return null;
    return docToVendor(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function createVendorProfile(
  userId: string,
  data: Omit<Vendor, "id" | "userId" | "approvalStatus" | "rejectionReason" | "profileImageUrl" | "createdAt" | "updatedAt">
): Promise<Vendor> {
  const now = new Date();
  const vendor: Omit<Vendor, "id"> = {
    ...data,
    userId,
    profileImageUrl: null,
    approvalStatus: "pending",
    rejectionReason: null,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(doc(db, "vendors", userId), vendor);
  return { ...vendor, id: userId };
}

export async function updateVendorProfile(
  userId: string,
  data: Partial<Omit<Vendor, "id" | "userId" | "createdAt">>
): Promise<Vendor> {
  const now = new Date();
  await updateDoc(doc(db, "vendors", userId), { ...data, updatedAt: now });
  const updated = await getVendorByUserId(userId);
  return updated ?? ({ ...data, id: userId, userId, updatedAt: now } as Vendor);
}
