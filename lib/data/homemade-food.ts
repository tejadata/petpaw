import { homemadeFoodArticles as staticArticles } from "@/lib/datasets/homemade-food-articles";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { HomemadeFoodArticle } from "@/types/homemade-food";

// Listing functions use lightweight static datasets (no content field).
// Single article fetch goes to Firestore to get full content.

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

export async function getHomemadeFoodArticles(): Promise<HomemadeFoodArticle[]> {
  return [...staticArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getHomemadeFoodArticleBySlug(
  slug: string
): Promise<HomemadeFoodArticle | null> {
  // Return metadata from static data (for build-time SEO)
  return staticArticles.find((a) => a.slug === slug) ?? null;
}

/**
 * Fetch full article content from Firestore by slug.
 * Called client-side on individual article pages.
 */
export async function getHomemadeFoodArticleContentFromFirestore(
  slug: string
): Promise<HomemadeFoodArticle | null> {
  try {
    const q = query(
      collection(db, "homemadeFoodArticles"),
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
    } as HomemadeFoodArticle;
  } catch (error) {
    console.error("Error fetching homemade food article from Firestore:", error);
    return null;
  }
}

export async function getFeaturedHomemadeFoodArticles(): Promise<HomemadeFoodArticle[]> {
  return staticArticles.filter((a) => a.featured);
}

export async function getHomemadeFoodArticlesByDiet(
  dietType: HomemadeFoodArticle["dietType"]
): Promise<HomemadeFoodArticle[]> {
  return staticArticles.filter((a) => a.dietType === dietType);
}
