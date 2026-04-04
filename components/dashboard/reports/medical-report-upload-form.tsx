"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicalReportSchema, type MedicalReportInput } from "@/lib/validations/medical-report";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadField } from "@/components/dashboard/shared/file-upload-field";
import { Progress } from "@/components/ui/progress";
import type { Pet } from "@/types/pet";

const REPORT_TYPES = [
  { value: "vaccination", label: "Vaccination" },
  { value: "blood_test", label: "Blood Test" },
  { value: "prescription", label: "Prescription" },
  { value: "surgery", label: "Surgery" },
  { value: "scan", label: "Scan / X-Ray" },
  { value: "general_checkup", label: "General Checkup" },
  { value: "other", label: "Other" },
] as const;

interface MedicalReportUploadFormProps {
  pets: Pet[];
  defaultPetId?: string;
  onSubmit: (data: MedicalReportInput) => Promise<void>;
  uploadProgress?: number;
  loading?: boolean;
  error?: string;
}

export function MedicalReportUploadForm({
  pets,
  defaultPetId,
  onSubmit,
  uploadProgress,
  loading = false,
  error,
}: MedicalReportUploadFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MedicalReportInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(medicalReportSchema) as any,
    defaultValues: {
      petId: defaultPetId ?? "",
      reportType: "general_checkup",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Pet selector */}
      <div className="space-y-2">
        <Label htmlFor="petId">Pet *</Label>
        <select
          id="petId"
          className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
          {...register("petId")}
        >
          <option value="">Select a pet…</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name} {pet.breed ? `(${pet.breed})` : ""}
            </option>
          ))}
        </select>
        {errors.petId && <p className="text-xs text-red-600">{errors.petId.message}</p>}
      </div>

      {/* Title + Type */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Report Title *</Label>
          <Input id="title" placeholder="Annual checkup" {...register("title")} />
          {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="reportType">Report Type *</Label>
          <select
            id="reportType"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("reportType")}
          >
            {REPORT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {errors.reportType && <p className="text-xs text-red-600">{errors.reportType.message}</p>}
        </div>
      </div>

      {/* Visit Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="visitDate">Visit Date *</Label>
          <Input id="visitDate" type="date" {...register("visitDate")} />
          {errors.visitDate && <p className="text-xs text-red-600">{errors.visitDate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="clinicName">Clinic / Hospital</Label>
          <Input id="clinicName" placeholder="City Animal Clinic" {...register("clinicName")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="doctorName">Doctor / Vet Name</Label>
        <Input id="doctorName" placeholder="Dr. Smith" {...register("doctorName")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Notes</Label>
        <Textarea id="description" rows={3} placeholder="Any additional notes…" {...register("description")} />
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Report File *</Label>
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <FileUploadField
              value={field.value instanceof File ? field.value : null}
              onChange={field.onChange}
              error={errors.file?.message}
            />
          )}
        />
      </div>

      {/* Upload progress */}
      {loading && uploadProgress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Uploading…</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Uploading…" : "Upload Report"}
      </Button>
    </form>
  );
}
