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

// Admin functions for vendor approval
export async function getPendingVendors(): Promise<Vendor[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "vendors"), where("approvalStatus", "==", "pending"))
    );
    return querySnapshot.docs.map((doc) => docToVendor(doc.id, doc.data() as Record<string, unknown>));
  } catch (error) {
    console.error("Error fetching pending vendors:", error);
    return [];
  }
}

export async function getAllVendors(): Promise<Vendor[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "vendors"));
    return querySnapshot.docs.map((doc) => docToVendor(doc.id, doc.data() as Record<string, unknown>));
  } catch (error) {
    console.error("Error fetching all vendors:", error);
    return [];
  }
}

export async function approveVendor(vendorId: string): Promise<void> {
  await updateDoc(doc(db, "vendors", vendorId), {
    approvalStatus: "approved",
    rejectionReason: null,
    updatedAt: new Date(),
  });
}

export async function rejectVendor(vendorId: string, reason: string): Promise<void> {
  await updateDoc(doc(db, "vendors", vendorId), {
    approvalStatus: "rejected",
    rejectionReason: reason,
    updatedAt: new Date(),
  });
}
