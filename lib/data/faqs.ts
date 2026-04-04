import { faqs as staticFaqs } from "@/lib/datasets/faqs";
import type { FAQ } from "@/types/admin";

// Public FAQ data always uses the curated static dataset.

export async function getFAQs(): Promise<FAQ[]> {
  return staticFaqs.filter((f) => f.published).sort((a, b) => a.order - b.order);
}

export async function getAllFAQs(): Promise<FAQ[]> {
  return [...staticFaqs].sort((a, b) => a.order - b.order);
}

export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  return staticFaqs
    .filter((f) => f.published && f.category === category)
    .sort((a, b) => a.order - b.order);
}
