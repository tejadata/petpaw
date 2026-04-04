"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VaccinationSetupForm } from "@/components/dashboard/vaccinations/vaccination-setup-form";
import { useAuth } from "@/lib/auth-context";
import { getPetsByUser } from "@/lib/data/pets";
import {
  createPetVaccinationSchedule,
  getVaccinationScheduleByPet,
} from "@/lib/data/vaccinations";
import { getTemplateById } from "@/lib/datasets/vaccination-templates";
import type { Pet } from "@/types/pet";
import type { VaccinationSetupInput } from "@/lib/validations/vaccination";

export default function VaccinationSetupPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPetId = searchParams.get("petId");

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    getPetsByUser(user.uid).then((p) => {
      setPets(p);
      setLoading(false);
    });
  }, [user, authLoading]);

  async function handleSubmit(data: VaccinationSetupInput) {
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
      // Check if a schedule already exists for this pet
      const existing = await getVaccinationScheduleByPet(
        user.uid,
        data.petId
      );
      if (existing) {
        setError(
          "A vaccination schedule already exists for this pet. Delete the existing schedule first, or view the timeline."
        );
        setSaving(false);
        return;
      }

      const template = getTemplateById(data.templateId);
      if (!template) {
        setError("Selected vaccination template not found.");
        setSaving(false);
        return;
      }

      const pet = pets.find((p) => p.id === data.petId);
      if (!pet) {
        setError("Selected pet not found.");
        setSaving(false);
        return;
      }

      await createPetVaccinationSchedule(
        user.uid,
        data.petId,
        pet.name,
        template,
        data.startDate,
        data.completedDoses
      );

      router.push(
        `/dashboard/vaccinations/timeline?petId=${data.petId}`
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create schedule"
      );
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/vaccinations">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Set Up Vaccination Schedule</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a vaccine schedule template and enter your pet&apos;s first dose date.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <VaccinationSetupForm
            pets={pets}
            defaultPetId={preselectedPetId ?? undefined}
            onSubmit={handleSubmit}
            loading={saving}
            error={error ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
