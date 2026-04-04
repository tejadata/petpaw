import { z } from "zod";

export const puppyListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  slug: z
    .string()
    .min(2, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens"),
  breed: z.string().min(2, "Breed is required").max(80),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
  ageInWeeks: z.coerce.number().min(1, "Age must be at least 1 week").max(260, "Age cannot exceed 5 years"),
  color: z.string().min(2, "Color is required").max(50),
  price: z.coerce.number().min(0, "Price must be positive"),
  saleStatus: z.enum(["available", "reserved", "sold", "inactive"]).default("available"),
  description: z.string().min(20, "Description must be at least 20 characters").max(5000),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(300),
  vaccinated: z.boolean().default(false),
  dewormed: z.boolean().default(false),
  microchipped: z.boolean().optional().nullable(),
  pedigreeAvailable: z.boolean().optional().nullable(),
  healthCertificateAvailable: z.boolean().optional().nullable(),
  location: z.string().min(2, "Location is required").max(200),
  pickupAvailable: z.boolean().default(true),
  deliveryAvailable: z.boolean().default(false),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  disclaimer: z.string().max(1000).optional().nullable(),
});

export type PuppyListingInput = z.infer<typeof puppyListingSchema>;
