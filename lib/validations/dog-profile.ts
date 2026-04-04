import { z } from "zod";

export const dogProfileSchema = z.object({
  name: z.string().min(1, "Dog name is required"),
  breedId: z.string().optional().nullable(),
  age: z.coerce.number().min(0).max(30).optional().nullable(),
  sex: z.enum(["Male", "Female"]).optional().nullable(),
  weight: z.coerce.number().min(0).max(200).optional().nullable(),
  neuteredSpayed: z.boolean().default(false),
  activityLevel: z.string().optional().nullable(),
  foodNotes: z.string().max(500).optional().nullable(),
  healthNotes: z.string().max(1000).optional().nullable(),
});

export type DogProfileInput = z.infer<typeof dogProfileSchema>;
