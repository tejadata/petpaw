"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { VaccinationScheduleCard } from "@/components/dashboard/vaccinations/vaccination-schedule-card";
import { VaccinationSummaryCard } from "@/components/dashboard/vaccinations/vaccination-summary-card";
import { useAuth } from "@/lib/auth-context";
import {
  getVaccinationSchedulesByUser,
  getVaccinationDosesByPet,
  deleteVaccinationSchedule,
} from "@/lib/data/vaccinations";
import { computeLiveDoseStatuses, getVaccinationStatusSummary } from "@/lib/vaccination/scheduling";
import type { VaccinationSchedule, VaccinationStatusSummary } from "@/types/vaccination";
import { useRouter } from "next/navigation";

export default function VaccinationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [schedules, setSchedules] = useState<VaccinationSchedule[]>([]);
  const [summaries, setSummaries] = useState<Map<string, VaccinationStatusSummary>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    async function load() {
      const scheds = await getVaccinationSchedulesByUser(user!.uid);
      setSchedules(scheds);

      // Fetch dose summaries for each schedule
      const summaryMap = new Map<string, VaccinationStatusSummary>();
      await Promise.all(
        scheds.map(async (s) => {
          const doses = await getVaccinationDosesByPet(user!.uid, s.petId);
          const live = computeLiveDoseStatuses(doses);
          summaryMap.set(s.petId, getVaccinationStatusSummary(live));
        })
      );
      setSummaries(summaryMap);
      setLoading(false);
    }

    load();
  }, [user, authLoading]);

  async function handleDelete(scheduleId: string) {
    await deleteVaccinationSchedule(scheduleId);
    setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vaccinations</h1>
          <p className="mt-1 text-muted-foreground">
            Track your pets&apos; vaccination schedules and upcoming doses.
          </p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/dashboard/vaccinations/setup">
            <Plus className="h-4 w-4" />
            New Schedule
          </Link>
        </Button>
      </div>

      {schedules.length === 0 ? (
        <EmptyState
          title="No vaccination schedules"
          description="Set up a vaccination schedule for your pet to track upcoming doses and get reminders."
          className="mt-8"
        />
      ) : (
        <>
          {/* Summary cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schedules.map((s) => {
              const summary = summaries.get(s.petId);
              if (!summary) return null;
              return (
                <VaccinationSummaryCard
                  key={s.id}
                  petName={s.petName}
                  summary={summary}
                  onClick={() =>
                    router.push(
                      `/dashboard/vaccinations/timeline?petId=${s.petId}`
                    )
                  }
                />
              );
            })}
          </div>

          {/* Schedule list */}
          <h2 className="mt-8 text-xl font-bold">Schedules</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {schedules.map((s) => (
              <VaccinationScheduleCard
                key={s.id}
                schedule={s}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
