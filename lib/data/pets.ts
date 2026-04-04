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
import type { Pet } from "@/types/pet";
import type { DogProfile } from "@/types/user";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToPet(id: string, data: Record<string, unknown>): Pet {
  return {
    ...(data as Omit<Pet, "id" | "dateOfBirth" | "createdAt" | "updatedAt">),
    id,
    dateOfBirth: data.dateOfBirth ? toDate(data.dateOfBirth) : null,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

/** Map a legacy DogProfile document to the Pet shape */
function dogProfileToPet(dog: DogProfile): Pet {
  return {
    id: dog.id,
    userId: dog.userId,
    name: dog.name,
    species: "Dog",
    breed: dog.breedName ?? null,
    dateOfBirth: null,
    age: dog.age ?? null,
    gender: dog.sex ?? null,
    weight: dog.weight ?? null,
    color: null,
    profileImageUrl: dog.imageUrl ?? null,
    profileImagePath: null,
    isNeuteredOrSpayed: dog.neuteredSpayed ?? false,
    allergies: null,
    medicalConditions: dog.healthNotes ?? null,
    medications: null,
    feedingNotes: dog.foodNotes ?? null,
    activityLevel: (dog.activityLevel as Pet["activityLevel"]) ?? null,
    emergencyContact: null,
    createdAt: dog.createdAt,
    updatedAt: dog.updatedAt,
  };
}

/**
 * Get all pets for a user.
 * Reads from the new `pets` collection AND legacy `dogProfiles` collection,
 * deduplicating by id.
 */
export async function getPetsByUser(userId: string): Promise<Pet[]> {
  try {
    const [petsSnap, dogsSnap] = await Promise.all([
      getDocs(
        query(
          collection(db, "pets"),
          where("userId", "==", userId)
        )
      ),
      getDocs(
        query(collection(db, "dogProfiles"), where("userId", "==", userId))
      ),
    ]);

    const pets = petsSnap.docs.map((d) =>
      docToPet(d.id, d.data() as Record<string, unknown>)
    );
    const petIds = new Set(pets.map((p) => p.id));

    // Merge legacy dog profiles that haven't been migrated
    for (const d of dogsSnap.docs) {
      if (!petIds.has(d.id)) {
        const data = d.data() as DogProfile;
        pets.push(dogProfileToPet({ ...data, id: d.id }));
      }
    }

    return pets.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch {
    return [];
  }
}

export async function getPetById(
  id: string,
  userId: string
): Promise<Pet | null> {
  try {
    // Try new pets collection first
    const snap = await getDoc(doc(db, "pets", id));
    if (snap.exists() && snap.data()?.userId === userId) {
      return docToPet(snap.id, snap.data() as Record<string, unknown>);
    }
    // Fall back to legacy dogProfiles
    const dogSnap = await getDoc(doc(db, "dogProfiles", id));
    if (dogSnap.exists() && dogSnap.data()?.userId === userId) {
      const data = dogSnap.data() as DogProfile;
      return dogProfileToPet({ ...data, id: dogSnap.id });
    }
    return null;
  } catch {
    return null;
  }
}

export async function createPet(
  userId: string,
  data: Omit<Pet, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<Pet> {
  const now = new Date();
  const pet = { ...data, userId, createdAt: now, updatedAt: now };
  const ref = await addDoc(collection(db, "pets"), pet);
  return { ...pet, id: ref.id };
}

export async function updatePet(
  id: string,
  userId: string,
  data: Partial<Omit<Pet, "id" | "userId" | "createdAt">>
): Promise<Pet> {
  const now = new Date();
  const updateData = { ...data, updatedAt: now };
  // Determine if it's in new collection or legacy
  const snap = await getDoc(doc(db, "pets", id));
  if (snap.exists() && snap.data()?.userId === userId) {
    await updateDoc(doc(db, "pets", id), updateData);
  } else {
    const dogSnap = await getDoc(doc(db, "dogProfiles", id));
    if (dogSnap.exists() && dogSnap.data()?.userId === userId) {
      await updateDoc(doc(db, "dogProfiles", id), updateData);
    }
  }
  const updated = await getPetById(id, userId);
  return updated ?? ({ ...data, id, userId, updatedAt: now } as Pet);
}

export async function deletePet(id: string, userId: string): Promise<void> {
  // Try new pets collection first
  const snap = await getDoc(doc(db, "pets", id));
  if (snap.exists() && snap.data()?.userId === userId) {
    await deleteDoc(doc(db, "pets", id));
    return;
  }
  // Fall back to legacy
  const dogSnap = await getDoc(doc(db, "dogProfiles", id));
  if (dogSnap.exists() && dogSnap.data()?.userId === userId) {
    await deleteDoc(doc(db, "dogProfiles", id));
  }
}
