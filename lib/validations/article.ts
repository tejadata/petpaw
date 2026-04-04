import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  ageGroup: z.enum(["Puppy", "Adult", "Senior", "All"]).default("All"),
  vetReviewed: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export type ArticleInput = z.infer<typeof articleSchema>;
