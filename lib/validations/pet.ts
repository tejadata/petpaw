import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Pet name is required").max(50),
  species: z.string().min(1, "Species is required").default("Dog"),
  breed: z.string().max(100).optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  age: z.coerce.number().min(0).max(100).optional().nullable(),
  gender: z.enum(["Male", "Female"]).optional().nullable(),
  weight: z.coerce.number().min(0, "Weight must be positive").max(500).optional().nullable(),
  color: z.string().max(50).optional().nullable(),
  isNeuteredOrSpayed: z.boolean().default(false),
  allergies: z.string().max(500).optional().nullable(),
  medicalConditions: z.string().max(500).optional().nullable(),
  medications: z.string().max(500).optional().nullable(),
  feedingNotes: z.string().max(500).optional().nullable(),
  activityLevel: z.enum(["Low", "Moderate", "High", "Very High"]).optional().nullable(),
  emergencyContact: z.string().max(200).optional().nullable(),
});

export type PetInput = z.infer<typeof petSchema>;
