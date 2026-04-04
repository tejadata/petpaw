import { z } from "zod";

const storeHoursSchema = z.object({
  day: z.string(),
  open: z.string(),
  close: z.string(),
  closed: z.boolean(),
});

export const storeProfileSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters").max(100),
  storeSlug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens"),
  ownerName: z.string().min(2, "Owner name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Phone number must be at least 7 digits").max(20),
  storeType: z.enum(
    ["vet_store", "pet_shop", "breeder", "pet_food_store", "pet_accessories_store", "mixed_store"],
    { message: "Please select a store type" }
  ),
  description: z.string().min(10, "Description must be at least 10 characters").max(5000),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  latitude: z.coerce.number().min(-90).max(90).optional().nullable(),
  longitude: z.coerce.number().min(-180).max(180).optional().nullable(),
  licenseNumber: z.string().max(50).optional().nullable(),
  taxId: z.string().max(50).optional().nullable(),
  storeHours: z.array(storeHoursSchema).default([]),
  serviceableAreas: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export type StoreProfileInput = z.infer<typeof storeProfileSchema>;
