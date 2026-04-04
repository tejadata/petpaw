"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vaccinationSetupSchema,
  type VaccinationSetupInput,
} from "@/lib/validations/vaccination";
import { VACCINATION_TEMPLATES } from "@/lib/datasets/vaccination-templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";
import type { Pet } from "@/types/pet";

interface VaccinationSetupFormProps {
  pets: Pet[];
  defaultPetId?: string;
  onSubmit: (data: VaccinationSetupInput) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export function VaccinationSetupForm({
  pets,
  defaultPetId,
  onSubmit,
  loading = false,
  error,
}: VaccinationSetupFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VaccinationSetupInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(vaccinationSetupSchema) as any,
    defaultValues: {
      petId: defaultPetId ?? "",
      templateId: VACCINATION_TEMPLATES[0]?.id ?? "",
      completedDoses: [],
    },
  });

  const selectedTemplateId = watch("templateId");
  const completedDoses = watch("completedDoses") ?? [];
  const startDate = watch("startDate");
  const selectedTemplate = VACCINATION_TEMPLATES.find(
    (t) => t.id === selectedTemplateId
  );

  function toggleDoseCompleted(vaccineCode: string) {
    const existing = completedDoses.find(
      (d) => d.vaccineCode === vaccineCode
    );
    if (existing) {
      setValue(
        "completedDoses",
        completedDoses.filter((d) => d.vaccineCode !== vaccineCode),
        { shouldDirty: true }
      );
    } else {
      setValue("completedDoses", [
        ...completedDoses,
        { vaccineCode, completedDate: new Date() },
      ], { shouldDirty: true });
    }
  }

  function setDoseCompletedDate(vaccineCode: string, date: Date) {
    setValue(
      "completedDoses",
      completedDoses.map((d) =>
        d.vaccineCode === vaccineCode ? { ...d, completedDate: date } : d
      ),
      { shouldDirty: true }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Disclaimer */}
      <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          This vaccination schedule is <strong>educational guidance only</strong>.
          Always consult your veterinarian for your pet&apos;s specific vaccination plan.
        </p>
      </div>

      {/* Pet selector */}
      <div className="space-y-2">
        <Label htmlFor="petId">Select Pet *</Label>
        <select
          id="petId"
          className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
          {...register("petId")}
        >
          <option value="">Choose a pet…</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name} {pet.breed ? `(${pet.breed})` : ""}
            </option>
          ))}
        </select>
        {errors.petId && (
          <p className="text-xs text-red-600">{errors.petId.message}</p>
        )}
      </div>

      {/* Template selector */}
      <div className="space-y-2">
        <Label htmlFor="templateId">Vaccination Schedule *</Label>
        <select
          id="templateId"
          className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
          {...register("templateId")}
        >
          {VACCINATION_TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {errors.templateId && (
          <p className="text-xs text-red-600">{errors.templateId.message}</p>
        )}
      </div>

      {/* First dose date */}
      <div className="space-y-2">
        <Label htmlFor="startDate">First Dose Date *</Label>
        <p className="text-xs text-muted-foreground">
          Enter the date the first vaccine was (or will be) given. All subsequent
          doses will be scheduled relative to this date.
        </p>
        <Input id="startDate" type="date" {...register("startDate")} />
        {errors.startDate && (
          <p className="text-xs text-red-600">{errors.startDate.message}</p>
        )}
      </div>

      {/* Already completed doses */}
      {selectedTemplate && selectedTemplate.doses.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-semibold">
              Already Completed Doses (optional)
            </h3>
            <p className="text-xs text-muted-foreground">
              Check any doses your pet has already received and enter the date they
              were given.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedTemplate.doses.map((dose) => {
              const isChecked = completedDoses.some(
                (d) => d.vaccineCode === dose.vaccineCode
              );
              const entry = completedDoses.find(
                (d) => d.vaccineCode === dose.vaccineCode
              );
              return (
                <div
                  key={dose.vaccineCode}
                  className="flex flex-wrap items-center gap-3 rounded-lg border p-3"
                >
                  <Checkbox
                    id={`dose-${dose.vaccineCode}`}
                    checked={isChecked}
                    onCheckedChange={() =>
                      toggleDoseCompleted(dose.vaccineCode)
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor={`dose-${dose.vaccineCode}`}
                      className="cursor-pointer text-sm font-medium"
                    >
                      {dose.doseLabel} — {dose.vaccineName}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {dose.recommendedAgeLabel}
                    </p>
                  </div>
                  {isChecked && (
                    <Input
                      type="date"
                      className="h-8 w-40 text-xs"
                      value={
                        entry
                          ? entry.completedDate instanceof Date
                            ? entry.completedDate.toISOString().split("T")[0]
                            : new Date(entry.completedDate)
                                .toISOString()
                                .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setDoseCompletedDate(
                          dose.vaccineCode,
                          new Date(e.target.value)
                        )
                      }
                    />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Schedule preview */}
      {selectedTemplate && startDate && (
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-semibold">Schedule Preview</h3>
            <p className="text-xs text-muted-foreground">
              These doses will be created and tracked in your dashboard.
            </p>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {selectedTemplate.doses.map((dose) => {
                const isCompleted = completedDoses.some(
                  (d) => d.vaccineCode === dose.vaccineCode
                );
                const plannedDate = new Date(startDate);
                plannedDate.setDate(
                  plannedDate.getDate() + dose.dayOffsetFromStart
                );
                return (
                  <div
                    key={dose.vaccineCode}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{dose.doseLabel}</p>
                      <p className="text-xs text-muted-foreground">
                        {dose.vaccineName}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs">
                        {plannedDate.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      {isCompleted ? (
                        <span className="text-xs font-medium text-green-600">
                          Already done
                        </span>
                      ) : (
                        <span className="text-xs text-blue-600">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Creating Schedule…" : "Create Vaccination Schedule"}
      </Button>
    </form>
  );
}
