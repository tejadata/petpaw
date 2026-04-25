/**
 * Generates sitemap.xml at build time for static export.
 * Output: out/sitemap.xml
 *
 * All data comes from static datasets (no Firestore), so this
 * works correctly under `output: "export"`.
 */
import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { breeds as staticBreeds } from "@/lib/datasets/breeds";
import { products as staticProducts } from "@/lib/datasets/products";
import { healthArticles as staticHealthArticles } from "@/lib/datasets/health-articles";
import { homemadeFoodArticles as staticFoodArticles } from "@/lib/datasets/homemade-food-articles";
import { healthCategories as staticHealthCategories } from "@/lib/datasets/health-categories";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_URL;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/breeds`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/marketplace`,             lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/health`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/homemade-food`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/products`,                lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/quiz`,                    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/adoption`,                lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/compare`,                 lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/symptom-helper`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`,                     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/contact`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/privacy`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,                   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const breedRoutes: MetadataRoute.Sitemap = staticBreeds.map((b) => ({
    url: `${base}/breeds/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const healthRoutes: MetadataRoute.Sitemap = staticHealthArticles.map((a) => ({
    url: `${base}/health/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const healthCategoryRoutes: MetadataRoute.Sitemap = staticHealthCategories.map((category) => ({
    url: `${base}/health/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const foodRoutes: MetadataRoute.Sitemap = staticFoodArticles.map((a) => ({
    url: `${base}/homemade-food/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = staticProducts.map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...breedRoutes,
    ...healthCategoryRoutes,
    ...healthRoutes,
    ...foodRoutes,
    ...productRoutes,
  ];
}
