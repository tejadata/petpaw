"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Dog, Calendar, Weight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuth } from "@/lib/auth-context";
import { getPetById } from "@/lib/data/pets";
import { getReportsByPet } from "@/lib/data/medical-reports";
import { getRemindersByPet } from "@/lib/data/reminders";
import { REPORT_TYPE_LABELS } from "@/types/medical-report";
import type { Pet } from "@/types/pet";
import type { MedicalReport } from "@/types/medical-report";
import type { Reminder } from "@/types/reminder";

const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export default function PetDetailPage() {
  const searchParams = useSearchParams();
  const petId = searchParams.get("id");
  const { user, loading: authLoading } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user || !petId) return;
    Promise.all([
      getPetById(petId, user.uid),
      getReportsByPet(user.uid, petId),
      getRemindersByPet(user.uid, petId),
    ]).then(([petData, reportsData, remindersData]) => {
      setPet(petData);
      setReports(reportsData);
      setReminders(remindersData.filter((r) => !r.completed));
      setLoading(false);
    });
  }, [user, authLoading, petId]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!pet) {
    return (
      <EmptyState title="Pet not found" description="This pet does not exist or you don't have access to it." className="mt-16" />
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard/pets"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Pets
      </Link>

      {/* Pet Header */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
            {pet.profileImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pet.profileImageUrl} alt={pet.name} className="h-full w-full object-cover" />
            ) : (
              <Dog className="h-10 w-10 text-primary/40" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            {pet.breed && <p className="text-muted-foreground">{pet.breed}</p>}
            <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
              {pet.species !== "Dog" && <Badge variant="outline">{pet.species}</Badge>}
              {pet.gender && <span>{pet.gender}</span>}
              {pet.age != null && <span>{pet.age} yr{pet.age !== 1 ? "s" : ""}</span>}
              {pet.weight != null && <span>{pet.weight} kg</span>}
            </div>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 gap-1">
          <Link href={`/dashboard/pets/edit?id=${pet.id}`}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      {/* Details Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {pet.activityLevel && (
          <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
            <Activity className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Activity:</span>
            <span className="font-medium">{pet.activityLevel}</span>
          </div>
        )}
        {pet.dateOfBirth && (
          <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">DOB:</span>
            <span className="font-medium">{pet.dateOfBirth.toLocaleDateString()}</span>
          </div>
        )}
        {pet.isNeuteredOrSpayed && (
          <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
            <Weight className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="font-medium">Neutered / Spayed</span>
          </div>
        )}
      </div>

      {[
        { label: "Allergies", value: pet.allergies },
        { label: "Medical Conditions", value: pet.medicalConditions },
        { label: "Medications", value: pet.medications },
        { label: "Feeding Notes", value: pet.feedingNotes },
        { label: "Emergency Contact", value: pet.emergencyContact },
      ]
        .filter((f) => f.value)
        .map((f) => (
          <div key={f.label} className="mt-4 rounded-lg border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{f.label}</p>
            <p className="mt-1 text-sm">{f.value}</p>
          </div>
        ))}

      {/* Active Reminders */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Upcoming Reminders</h2>
          <Button asChild size="sm" variant="outline">
            <Link href={`/dashboard/reminders/new?petId=${pet.id}`}>Add Reminder</Link>
          </Button>
        </div>
        {reminders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No upcoming reminders for this pet.</p>
        ) : (
          <div className="mt-4 space-y-2">
            {reminders.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[r.priority]}`}>
                  {r.priority}
                </span>
                <span className="flex-1 font-medium">{r.title}</span>
                <span className="text-muted-foreground">{r.scheduledDate.toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical Reports */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Medical Reports</h2>
          <Button asChild size="sm" variant="outline">
            <Link href={`/dashboard/reports/new?petId=${pet.id}`}>Upload Report</Link>
          </Button>
        </div>
        {reports.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No reports uploaded yet.</p>
        ) : (
          <div className="mt-4 space-y-2">
            {reports.map((r) => (
              <Link
                key={r.id}
                href={`/dashboard/reports/view?id=${r.id}`}
                className="flex items-center justify-between rounded-lg border p-3 text-sm hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{REPORT_TYPE_LABELS[r.reportType]}</p>
                </div>
                <span className="text-muted-foreground">{r.visitDate.toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
