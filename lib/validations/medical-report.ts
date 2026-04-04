import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const medicalReportSchema = z.object({
  petId: z.string().min(1, "Please select a pet"),
  title: z.string().min(1, "Report title is required").max(100),
  description: z.string().max(500).optional().nullable(),
  reportType: z.enum([
    "vaccination",
    "blood_test",
    "prescription",
    "surgery",
    "scan",
    "general_checkup",
    "other",
  ], { error: "Please select a report type" }),
  visitDate: z.coerce.date({ error: "Visit date is required" }),
  clinicName: z.string().max(100).optional().nullable(),
  doctorName: z.string().max(100).optional().nullable(),
  file: z
    .instanceof(File, { message: "Please select a file" })
    .refine((f) => f.size <= MAX_FILE_SIZE, "File must be under 10MB")
    .refine(
      (f) => ACCEPTED_FILE_TYPES.includes(f.type),
      "Only PDF, JPG, PNG, and WebP files are accepted"
    ),
});

// For edit (file optional)
export const medicalReportEditSchema = medicalReportSchema.omit({ file: true }).extend({
  file: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "File must be under 10MB")
    .refine(
      (f) => ACCEPTED_FILE_TYPES.includes(f.type),
      "Only PDF, JPG, PNG, and WebP files are accepted"
    )
    .optional(),
});

export type MedicalReportInput = z.infer<typeof medicalReportSchema>;
export type MedicalReportEditInput = z.infer<typeof medicalReportEditSchema>;

export const ACCEPTED_FILE_TYPES_LIST = ACCEPTED_FILE_TYPES;
export const MAX_FILE_SIZE_MB = 10;
