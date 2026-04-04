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
import type { VendorProduct } from "@/types/vendor-product";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToProduct(id: string, data: Record<string, unknown>): VendorProduct {
  return {
    ...(data as Omit<VendorProduct, "id" | "createdAt" | "updatedAt">),
    id,
    images: (data.images as VendorProduct["images"]) ?? [],
    breedSuitability: (data.breedSuitability as string[]) ?? [],
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getVendorProductsByVendor(vendorId: string): Promise<VendorProduct[]> {
  try {
    const q = query(collection(db, "vendorProducts"), where("vendorId", "==", vendorId));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToProduct(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch {
    return [];
  }
}

export async function getVendorProductById(
  id: string,
  vendorId: string
): Promise<VendorProduct | null> {
  try {
    const snap = await getDoc(doc(db, "vendorProducts", id));
    if (!snap.exists() || snap.data()?.vendorId !== vendorId) return null;
    return docToProduct(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function createVendorProduct(
  vendorId: string,
  storeId: string,
  data: Omit<VendorProduct, "id" | "vendorId" | "storeId" | "images" | "createdAt" | "updatedAt">
): Promise<VendorProduct> {
  const now = new Date();
  const product = {
    ...data,
    vendorId,
    storeId,
    images: [],
    createdAt: now,
    updatedAt: now,
  };
  const ref = await addDoc(collection(db, "vendorProducts"), product);
  return { ...product, id: ref.id };
}

export async function updateVendorProduct(
  id: string,
  vendorId: string,
  data: Partial<Omit<VendorProduct, "id" | "vendorId" | "storeId" | "createdAt">>
): Promise<VendorProduct> {
  const now = new Date();
  await updateDoc(doc(db, "vendorProducts", id), { ...data, updatedAt: now });
  const updated = await getVendorProductById(id, vendorId);
  return updated ?? ({ ...data, id, vendorId, updatedAt: now } as VendorProduct);
}

export async function deleteVendorProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "vendorProducts", id));
}

// ── Public queries ───────────────────────────────────────────

export async function getPublishedVendorProducts(): Promise<VendorProduct[]> {
  try {
    const q = query(collection(db, "vendorProducts"), where("isPublished", "==", true));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToProduct(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch {
    return [];
  }
}

export async function getPublicVendorProductById(id: string): Promise<VendorProduct | null> {
  try {
    const snap = await getDoc(doc(db, "vendorProducts", id));
    if (!snap.exists()) return null;
    const product = docToProduct(snap.id, snap.data() as Record<string, unknown>);
    if (!product.isPublished) return null;
    return product;
  } catch {
    return null;
  }
}
