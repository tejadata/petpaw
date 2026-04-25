import { healthCategories as staticCategories } from "@/lib/datasets/health-categories";
import { healthArticles as staticArticles } from "@/lib/datasets/health-articles";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { HealthCategory, HealthArticle } from "@/types/health";

// Listing functions use lightweight static datasets (no content field).
// Single article fetch goes to Firestore to get full content.

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

export async function getHealthCategories(): Promise<HealthCategory[]> {
  return [...staticCategories].sort((a, b) => a.order - b.order);
}

export async function getHealthCategoryBySlug(slug: string): Promise<HealthCategory | null> {
  return staticCategories.find((c) => c.slug === slug) ?? null;
}

export async function getHealthArticles(): Promise<HealthArticle[]> {
  return [...staticArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getHealthArticleBySlug(slug: string): Promise<HealthArticle | null> {
  // First get metadata from static data (for build-time SEO)
  const staticArticle = staticArticles.find((a) => a.slug === slug) ?? null;
  return staticArticle;
}

/**
 * Fetch full article content from Firestore by slug.
 * Called client-side on individual article pages.
 */
export async function getHealthArticleContentFromFirestore(
  slug: string
): Promise<HealthArticle | null> {
  try {
    const q = query(
      collection(db, "healthArticles"),
      where("slug", "==", slug)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      publishedAt: toDate(data.publishedAt),
    } as HealthArticle;
  } catch (error) {
    console.error("Error fetching health article from Firestore:", error);
    return null;
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<HealthArticle[]> {
  return staticArticles.filter((a) => a.categorySlug === categorySlug);
}

export async function getFeaturedArticles(): Promise<HealthArticle[]> {
  return staticArticles.filter((a) => a.featured);
}

export async function getArticlesByAgeGroup(ageGroup: string): Promise<HealthArticle[]> {
  return staticArticles.filter(
    (a) => a.ageGroup === ageGroup || a.ageGroup === "All"
  );
}
