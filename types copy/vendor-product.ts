export type VendorProductCategory =
  | "food"
  | "treats"
  | "supplements"
  | "grooming"
  | "accessories"
  | "toys"
  | "health_support"
  | "feeding"
  | "bedding"
  | "training";

export const VENDOR_PRODUCT_CATEGORY_LABELS: Record<VendorProductCategory, string> = {
  food: "Food",
  treats: "Treats",
  supplements: "Supplements",
  grooming: "Grooming",
  accessories: "Accessories",
  toys: "Toys",
  health_support: "Health Support",
  feeding: "Feeding",
  bedding: "Bedding",
  training: "Training",
};

export interface VendorProduct {
  id: string;
  vendorId: string;
  storeId: string;
  title: string;
  slug: string;
  category: VendorProductCategory;
  brand: string | null;
  description: string;
  shortDescription: string;
  images: { url: string; path: string }[];
  price: number;
  salePrice: number | null;
  stockQuantity: number;
  sku: string | null;
  weight: string | null;
  ageSuitability: string | null;
  breedSuitability: string[];
  featured: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
