import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Store } from "@/types/vendor";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToStore(id: string, data: Record<string, unknown>): Store {
  return {
    ...(data as Omit<Store, "id" | "createdAt" | "updatedAt">),
    id,
    storeHours: (data.storeHours as Store["storeHours"]) ?? [],
    serviceableAreas: (data.serviceableAreas as string[]) ?? [],
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getStoreByVendor(vendorId: string): Promise<Store | null> {
  try {
    const q = query(collection(db, "stores"), where("vendorId", "==", vendorId));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return docToStore(d.id, d.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getStoreById(storeId: string): Promise<Store | null> {
  try {
    const snap = await getDoc(doc(db, "stores", storeId));
    if (!snap.exists()) return null;
    return docToStore(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function createStore(
  vendorId: string,
  data: Omit<Store, "id" | "vendorId" | "logoUrl" | "bannerUrl" | "approvalStatus" | "createdAt" | "updatedAt">
): Promise<Store> {
  const now = new Date();
  const store = {
    ...data,
    vendorId,
    logoUrl: null,
    bannerUrl: null,
    approvalStatus: "pending" as const,
    createdAt: now,
    updatedAt: now,
  };
  const ref = await addDoc(collection(db, "stores"), store);
  return { ...store, id: ref.id };
}

export async function updateStore(
  storeId: string,
  vendorId: string,
  data: Partial<Omit<Store, "id" | "vendorId" | "createdAt">>
): Promise<Store> {
  const now = new Date();
  await updateDoc(doc(db, "stores", storeId), { ...data, updatedAt: now });
  const updated = await getStoreById(storeId);
  return updated ?? ({ ...data, id: storeId, vendorId, updatedAt: now } as Store);
}
