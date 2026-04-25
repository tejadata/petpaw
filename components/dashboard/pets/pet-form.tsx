"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetInput } from "@/lib/validations/pet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUploadField } from "@/components/dashboard/shared/file-upload-field";
import type { Pet } from "@/types/pet";

interface PetFormProps {
  defaultValues?: Partial<PetInput>;
  onSubmit: (data: PetInput, profileImage: File | null) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  error?: string;
}

export function PetForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Pet",
  loading = false,
  error,
}: PetFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PetInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(petSchema) as any,
    defaultValues: {
      species: "Dog",
      isNeuteredOrSpayed: false,
      ...defaultValues,
    },
  });

  const profileImage = watch("_profileImage" as keyof PetInput) as unknown as File | null;

  async function onFormSubmit(data: PetInput) {
    await onSubmit(data, profileImage ?? null);
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Profile Image */}
      <div className="space-y-2">
        <Label>Profile Photo (optional)</Label>
        <FileUploadField
          value={profileImage}
          onChange={(file) => setValue("_profileImage" as keyof PetInput, file as unknown as string)}
          accept=".jpg,.jpeg,.png,.webp"
          hint="JPG, PNG, WebP — max 5MB"
          maxSizeMb={5}
          label="Upload pet photo"
        />
      </div>

      {/* Basic Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Pet Name *</Label>
          <Input id="name" placeholder="Buddy" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="species">Species</Label>
          <Input id="species" placeholder="Dog" {...register("species")} />
          {errors.species && <p className="text-xs text-red-600">{errors.species.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="breed">Breed</Label>
          <Input id="breed" placeholder="Labrador Retriever" {...register("breed")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color / Markings</Label>
          <Input id="color" placeholder="Golden brown" {...register("color")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input id="age" type="number" min={0} max={100} placeholder="3" {...register("age")} />
          {errors.age && <p className="text-xs text-red-600">{errors.age.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" min={0} max={500} placeholder="50" {...register("weight")} />
          {errors.weight && <p className="text-xs text-red-600">{errors.weight.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("gender")}
          >
            <option value="">Select…</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="activityLevel">Activity Level</Label>
          <select
            id="activityLevel"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("activityLevel")}
          >
            <option value="">Select…</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isNeuteredOrSpayed"
          checked={watch("isNeuteredOrSpayed")}
          onCheckedChange={(v) => setValue("isNeuteredOrSpayed", !!v)}
        />
        <Label htmlFor="isNeuteredOrSpayed" className="cursor-pointer font-normal">
          Neutered / Spayed
        </Label>
      </div>

      {/* Health & Care */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Health & Care</h3>
        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea id="allergies" rows={2} placeholder="e.g., pollen, certain foods…" {...register("allergies")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="medicalConditions">Medical Conditions</Label>
          <Textarea id="medicalConditions" rows={2} placeholder="e.g., hip dysplasia, diabetes…" {...register("medicalConditions")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea id="medications" rows={2} placeholder="e.g., Apoquel 16mg daily…" {...register("medications")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedingNotes">Feeding Notes</Label>
          <Textarea id="feedingNotes" rows={2} placeholder="e.g., 2 cups twice daily, grain-free…" {...register("feedingNotes")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input id="emergencyContact" placeholder="Dr. Smith — (555) 123-4567" {...register("emergencyContact")} />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
