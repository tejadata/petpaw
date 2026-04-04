import { healthCategories as staticCategories } from "@/lib/datasets/health-categories";
import { healthArticles as staticArticles } from "@/lib/datasets/health-articles";
import type { HealthCategory, HealthArticle } from "@/types/health";

// Public health data always uses the curated static dataset.

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
  return staticArticles.find((a) => a.slug === slug) ?? null;
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
