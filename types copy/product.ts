export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  price: number;
  rating: number;
  pros: string[];
  cons: string[];
  breedSuitability: string[];
  ageSuitability: "Puppy" | "Adult" | "Senior" | "All";
  sizeSuitability: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  breed?: string;
  size?: string;
  age?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "rating" | "newest";
}
