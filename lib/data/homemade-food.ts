import { homemadeFoodArticles as staticArticles } from "@/lib/datasets/homemade-food-articles";
import type { HomemadeFoodArticle } from "@/types/homemade-food";

// Public homemade food data always uses the curated static dataset.

export async function getHomemadeFoodArticles(): Promise<HomemadeFoodArticle[]> {
  const articles = staticArticles;
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getHomemadeFoodArticleBySlug(
  slug: string
): Promise<HomemadeFoodArticle | null> {
  return staticArticles.find((a) => a.slug === slug) ?? null;
}

export async function getFeaturedHomemadeFoodArticles(): Promise<HomemadeFoodArticle[]> {
  return staticArticles.filter((a) => a.featured);
}

export async function getHomemadeFoodArticlesByDiet(
  dietType: HomemadeFoodArticle["dietType"]
): Promise<HomemadeFoodArticle[]> {
  return staticArticles.filter((a) => a.dietType === dietType);
}
