import { breeds as staticBreeds } from "@/lib/datasets/breeds";
import type { Breed } from "@/types/breed";

// Public breed data always uses the curated static dataset.
// Only admin/dashboard data (dogs, favorites, reminders) uses Firestore.

export async function getBreeds(): Promise<Breed[]> {
  return staticBreeds;
}

export async function getBreedBySlug(slug: string): Promise<Breed | null> {
  return staticBreeds.find((b) => b.slug === slug) ?? null;
}

export async function getFeaturedBreeds(): Promise<Breed[]> {
  return staticBreeds.filter((b) => b.featured);
}

export async function searchBreeds(query: string): Promise<Breed[]> {
  const all = staticBreeds;
  const q = query.toLowerCase();
  return all.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.temperament.some((t) => t.toLowerCase().includes(q)) ||
      b.sizeCategory.toLowerCase().includes(q)
  );
}

export async function getBreedsBySize(size: string): Promise<Breed[]> {
  return staticBreeds.filter((b) => b.sizeCategory.toLowerCase() === size.toLowerCase());
}
