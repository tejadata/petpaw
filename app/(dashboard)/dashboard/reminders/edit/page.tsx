"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReminderForm } from "@/components/dashboard/reminders/reminder-form";
import { useAuth } from "@/lib/auth-context";
import { getReminders, updateReminder } from "@/lib/data/reminders";
import { getPetsByUser } from "@/lib/data/pets";
import type { Pet } from "@/types/pet";
import type { Reminder } from "@/types/reminder";
import type { ReminderInput } from "@/lib/validations/reminder";

export default function EditReminderPage() {
  const searchParams = useSearchParams();
  const reminderId = searchParams.get("id");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user || !reminderId) return;
    Promise.all([getReminders(user.uid), getPetsByUser(user.uid)]).then(
      ([reminders, p]) => {
        const found = reminders.find((r) => r.id === reminderId);
        if (!found) {
          setNotFound(true);
        } else {
          setReminder(found);
        }
        setPets(p);
        setLoading(false);
      }
    );
  }, [user, authLoading, reminderId]);

  async function handleSubmit(data: ReminderInput) {
    if (!user || !reminder) return;
    setError(null);
    try {
      const pet = data.petId ? pets.find((p) => p.id === data.petId) : null;
      await updateReminder(reminder.id, {
        ...data,
        petId: data.petId ?? null,
        petName: pet?.name ?? null,
        dogProfileId: data.petId ?? null,
        dogName: pet?.name ?? null,
      });
      router.push("/dashboard/reminders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update reminder");
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Reminder not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard/reminders">Back to Reminders</Link>
        </Button>
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
          <h1 className="text-3xl font-bold">Edit Reminder</h1>
          <p className="mt-1 text-muted-foreground">Update your reminder details.</p>
        </div>
      </div>

      <ReminderForm
        pets={pets}
        defaultValues={{
          petId: reminder?.petId ?? undefined,
          type: reminder?.type as ReminderInput["type"],
          title: reminder?.title,
          description: reminder?.description ?? undefined,
          scheduledDate: reminder?.scheduledDate,
          recurringFrequency: reminder?.recurringFrequency as ReminderInput["recurringFrequency"],
          priority: reminder?.priority as ReminderInput["priority"],
        }}
        onSubmit={handleSubmit}
        submitLabel="Update Reminder"
        error={error ?? undefined}
      />
    </div>
  );
}
