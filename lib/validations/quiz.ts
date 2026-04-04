import { z } from "zod";

export const quizAnswersSchema = z.object({
  livingSpace: z.string().min(1),
  activityLevel: z.string().min(1),
  experience: z.string().min(1),
  familyKids: z.string().min(1),
  timeAvailable: z.string().min(1),
  groomingTolerance: z.string().min(1),
  climate: z.string().min(1),
  budget: z.string().min(1),
  sizePreference: z.string().min(1),
  barkingTolerance: z.string().min(1),
  trainabilityPreference: z.string().min(1),
  sheddingTolerance: z.string().min(1),
  guardDog: z.string().min(1),
  companionDog: z.string().min(1),
});

export type QuizAnswersInput = z.infer<typeof quizAnswersSchema>;
