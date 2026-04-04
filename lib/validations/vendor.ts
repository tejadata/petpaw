import { z } from "zod";

export const vendorOnboardingSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(100),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long"),
  storeType: z.enum(
    ["vet_store", "pet_shop", "breeder", "pet_food_store", "pet_accessories_store", "mixed_store"],
    { message: "Please select a store type" }
  ),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  licenseNumber: z.string().max(50).optional().nullable(),
  taxId: z.string().max(50).optional().nullable(),
});

export type VendorOnboardingInput = z.infer<typeof vendorOnboardingSchema>;
