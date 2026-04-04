import { products as staticProducts, productCategories as staticCategories } from "@/lib/datasets/products";
import type { Product, ProductCategory, ProductFilters } from "@/types/product";

// Public product data always uses the curated static dataset.

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  let results = [...staticProducts];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }

  if (filters?.category) {
    results = results.filter((p) => p.categorySlug === filters.category);
  }

  if (filters?.breed) {
    results = results.filter(
      (p) =>
        p.breedSuitability.some((b) => b.toLowerCase().includes(filters.breed!.toLowerCase())) ||
        p.breedSuitability.includes("All breeds")
    );
  }

  if (filters?.size) {
    results = results.filter(
      (p) => p.sizeSuitability.includes(filters.size!) || p.sizeSuitability.includes("All")
    );
  }

  if (filters?.age) {
    results = results.filter(
      (p) => p.ageSuitability === filters.age || p.ageSuitability === "All"
    );
  }

  if (filters?.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }

  switch (filters?.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return staticProducts.find((p) => p.slug === slug) ?? null;
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return staticCategories;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.featured);
}
