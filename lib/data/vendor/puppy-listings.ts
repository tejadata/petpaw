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
import type { PuppyListing } from "@/types/vendor-puppy";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToPuppy(id: string, data: Record<string, unknown>): PuppyListing {
  return {
    ...(data as Omit<PuppyListing, "id" | "createdAt" | "updatedAt">),
    id,
    images: (data.images as PuppyListing["images"]) ?? [],
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getPuppyListingsByVendor(vendorId: string): Promise<PuppyListing[]> {
  try {
    const q = query(collection(db, "puppyListings"), where("vendorId", "==", vendorId));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToPuppy(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch {
    return [];
  }
}

export async function getPuppyListingById(
  id: string,
  vendorId: string
): Promise<PuppyListing | null> {
  try {
    const snap = await getDoc(doc(db, "puppyListings", id));
    if (!snap.exists() || snap.data()?.vendorId !== vendorId) return null;
    return docToPuppy(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function createPuppyListing(
  vendorId: string,
  storeId: string,
  data: Omit<PuppyListing, "id" | "vendorId" | "storeId" | "images" | "createdAt" | "updatedAt">
): Promise<PuppyListing> {
  const now = new Date();
  const listing = {
    ...data,
    vendorId,
    storeId,
    images: [],
    createdAt: now,
    updatedAt: now,
  };
  const ref = await addDoc(collection(db, "puppyListings"), listing);
  return { ...listing, id: ref.id };
}

export async function updatePuppyListing(
  id: string,
  vendorId: string,
  data: Partial<Omit<PuppyListing, "id" | "vendorId" | "storeId" | "createdAt">>
): Promise<PuppyListing> {
  const now = new Date();
  await updateDoc(doc(db, "puppyListings", id), { ...data, updatedAt: now });
  const updated = await getPuppyListingById(id, vendorId);
  return updated ?? ({ ...data, id, vendorId, updatedAt: now } as PuppyListing);
}

export async function deletePuppyListing(id: string): Promise<void> {
  await deleteDoc(doc(db, "puppyListings", id));
}

// ── Public queries ───────────────────────────────────────────

export async function getPublishedPuppyListings(): Promise<PuppyListing[]> {
  try {
    const q = query(collection(db, "puppyListings"), where("isPublished", "==", true));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToPuppy(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch {
    return [];
  }
}

export async function getPublicPuppyListingById(id: string): Promise<PuppyListing | null> {
  try {
    const snap = await getDoc(doc(db, "puppyListings", id));
    if (!snap.exists()) return null;
    const listing = docToPuppy(snap.id, snap.data() as Record<string, unknown>);
    if (!listing.isPublished) return null;
    return listing;
  } catch {
    return null;
  }
}
