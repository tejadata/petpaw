import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be positive"),
  rating: z.coerce.number().min(0).max(5).default(0),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  breedSuitability: z.array(z.string()).default([]),
  ageSuitability: z.enum(["Puppy", "Adult", "Senior", "All"]).default("All"),
  sizeSuitability: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof productSchema>;
