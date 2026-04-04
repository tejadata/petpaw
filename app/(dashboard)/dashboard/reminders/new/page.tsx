"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReminderForm } from "@/components/dashboard/reminders/reminder-form";
import { useAuth } from "@/lib/auth-context";
import { createReminder } from "@/lib/data/reminders";
import { getPetsByUser } from "@/lib/data/pets";
import type { Pet } from "@/types/pet";
import type { ReminderInput } from "@/lib/validations/reminder";

export default function NewReminderPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPetId = searchParams.get("petId");

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    getPetsByUser(user.uid).then((p) => {
      setPets(p);
      setLoading(false);
    });
  }, [user, authLoading]);

  async function handleSubmit(data: ReminderInput) {
    if (!user) return;
    setError(null);
    try {
      const pet = data.petId ? pets.find((p) => p.id === data.petId) : null;
      await createReminder(user.uid, {
        ...data,
        petId: data.petId ?? null,
        petName: pet?.name ?? null,
        dogProfileId: data.petId ?? null,
        dogName: pet?.name ?? null,
        title: data.title,
        type: data.type,
        description: data.description ?? null,
        scheduledDate: data.scheduledDate,
        recurringFrequency: data.recurringFrequency,
        priority: data.priority,
      });
      router.push("/dashboard/reminders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create reminder");
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
          <Link href="/dashboard/reminders">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Reminder</h1>
          <p className="mt-1 text-muted-foreground">
            Set up a reminder for vet visits, medication, grooming, and more.
          </p>
        </div>
      </div>

      <ReminderForm
        pets={pets}
        defaultValues={{ petId: preselectedPetId ?? undefined }}
        onSubmit={handleSubmit}
        submitLabel="Create Reminder"
        error={error ?? undefined}
      />
    </div>
  );
}
