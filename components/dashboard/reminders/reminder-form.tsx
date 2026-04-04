"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reminderSchema, type ReminderInput } from "@/lib/validations/reminder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Pet } from "@/types/pet";

const REMINDER_TYPES = [
  "Vaccination", "Deworming", "Grooming", "VetVisit",
  "Medication", "DailyCare", "Wellness", "Training", "Other",
] as const;

const FREQUENCIES = [
  "Once", "Daily", "Weekly", "Biweekly", "Monthly", "Quarterly", "Yearly",
] as const;

interface ReminderFormProps {
  pets: Pet[];
  defaultValues?: Partial<ReminderInput>;
  onSubmit: (data: ReminderInput) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  error?: string;
}

export function ReminderForm({
  pets,
  defaultValues,
  onSubmit,
  submitLabel = "Save Reminder",
  loading = false,
  error,
}: ReminderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReminderInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(reminderSchema) as any,
    defaultValues: {
      type: "VetVisit",
      recurringFrequency: "Once",
      priority: "medium",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Pet selector */}
      {pets.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="petId">Pet (optional)</Label>
          <select
            id="petId"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("petId")}
          >
            <option value="">No specific pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" placeholder="Vet appointment" {...register("title")} />
        {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
      </div>

      {/* Type + Priority */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <select
            id="type"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("type")}
          >
            {REMINDER_TYPES.map((t) => (
              <option key={t} value={t}>{t.replace(/([A-Z])/g, " $1").trim()}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("priority")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Date + Repeat */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="scheduledDate">Due Date *</Label>
          <Input id="scheduledDate" type="date" {...register("scheduledDate")} />
          {errors.scheduledDate && <p className="text-xs text-red-600">{errors.scheduledDate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="recurringFrequency">Repeat</Label>
          <select
            id="recurringFrequency"
            className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            {...register("recurringFrequency")}
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="description">Notes</Label>
        <Textarea id="description" rows={2} placeholder="Optional details…" {...register("description")} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
