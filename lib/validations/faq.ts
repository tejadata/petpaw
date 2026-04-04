import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  order: z.coerce.number().min(0).default(0),
  published: z.boolean().default(true),
});

export type FAQInput = z.infer<typeof faqSchema>;
