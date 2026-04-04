import { z } from "zod";

export const vaccinationSetupSchema = z.object({
  petId: z.string().min(1, "Please select a pet"),
  templateId: z.string().min(1, "Please select a vaccination schedule"),
  startDate: z.coerce.date({ message: "First dose date is required" }),
  completedDoses: z
    .array(
      z.object({
        vaccineCode: z.string(),
        completedDate: z.coerce.date(),
      })
    )
    .default([]),
});

export type VaccinationSetupInput = z.infer<typeof vaccinationSetupSchema>;

export const markDoseCompletedSchema = z.object({
  completedDate: z.coerce.date({ message: "Completion date is required" }),
});

export type MarkDoseCompletedInput = z.infer<typeof markDoseCompletedSchema>;

export const updateDoseDateSchema = z.object({
  plannedDate: z.coerce.date({ message: "New date is required" }),
});

export type UpdateDoseDateInput = z.infer<typeof updateDoseDateSchema>;
