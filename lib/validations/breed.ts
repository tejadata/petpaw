import { z } from "zod";

export const breedSchema = z.object({
  name: z.string().min(1, "Breed name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  sizeCategory: z.enum(["Small", "Medium", "Large", "Giant"]),
  temperament: z.array(z.string()).min(1, "At least one temperament trait required"),
  exerciseNeeds: z.coerce.number().min(1).max(5),
  trainability: z.coerce.number().min(1).max(5),
  groomingNeeds: z.coerce.number().min(1).max(5),
  sheddingLevel: z.coerce.number().min(1).max(5),
  barkingTendency: z.coerce.number().min(1).max(5),
  lifespanMin: z.coerce.number().min(1).max(25),
  lifespanMax: z.coerce.number().min(1).max(25),
  healthConsiderations: z.string().min(1),
  familyFriendliness: z.coerce.number().min(1).max(5),
  apartmentSuitability: z.coerce.number().min(1).max(5),
  firstTimeOwnerSuitability: z.coerce.number().min(1).max(5),
  climateSuitability: z.array(z.string()).min(1),
  estimatedMonthlyCost: z.coerce.number().min(0),
  idealOwnerProfile: z.string().min(1),
  adoptionNotes: z.string().min(1),
  featured: z.boolean().default(false),
});

export type BreedInput = z.infer<typeof breedSchema>;
