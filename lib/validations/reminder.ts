import { z } from "zod";

export const reminderSchema = z.object({
  petId: z.string().optional().nullable(),
  dogProfileId: z.string().optional().nullable(), // legacy compat
  type: z.enum([
    "Vaccination",
    "Deworming",
    "Grooming",
    "VetVisit",
    "Medication",
    "DailyCare",
    "Wellness",
    "Training",
    "Other",
  ]),
  title: z.string().min(1, "Title is required"),
  description: z.string().max(500).optional().nullable(),
  scheduledDate: z.coerce.date({ error: "Date is required" }),
  recurringFrequency: z
    .enum(["Once", "Daily", "Weekly", "Biweekly", "Monthly", "Quarterly", "Yearly"])
    .default("Once"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export type ReminderInput = z.infer<typeof reminderSchema>;
