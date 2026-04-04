import { z } from "zod";

export const vendorProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150),
  slug: z
    .string()
    .min(2, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens"),
  category: z.enum(
    ["food", "treats", "supplements", "grooming", "accessories", "toys", "health_support", "feeding", "bedding", "training"],
    { message: "Please select a category" }
  ),
  brand: z.string().max(80).optional().nullable(),
  description: z.string().min(20, "Description must be at least 20 characters").max(5000),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(300),
  price: z.coerce.number().min(0, "Price must be positive"),
  salePrice: z.coerce.number().min(0, "Sale price must be positive").optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0, "Stock cannot be negative"),
  sku: z.string().max(50).optional().nullable(),
  weight: z.string().max(30).optional().nullable(),
  ageSuitability: z.string().max(30).optional().nullable(),
  breedSuitability: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

export type VendorProductInput = z.infer<typeof vendorProductSchema>;
