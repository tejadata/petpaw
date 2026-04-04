"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { VaccinationTimeline } from "@/components/dashboard/vaccinations/vaccination-timeline";
import { useAuth } from "@/lib/auth-context";
import {
  getVaccinationScheduleByPet,
  getVaccinationDosesByPet,
  markDoseCompleted,
  markDoseSkipped,
  updateDoseDate,
  regenerateScheduleFromFirstDose,
} from "@/lib/data/vaccinations";
import {
  computeLiveDoseStatuses,
  getVaccinationStatusSummary,
} from "@/lib/vaccination/scheduling";
import { getTemplateById } from "@/lib/datasets/vaccination-templates";
import type {
  VaccinationSchedule,
  VaccinationDose,
  VaccinationStatusSummary,
} from "@/types/vaccination";

export default function VaccinationTimelinePage() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");

  const [schedule, setSchedule] = useState<VaccinationSchedule | null>(null);
  const [doses, setDoses] = useState<VaccinationDose[]>([]);
  const [summary, setSummary] = useState<VaccinationStatusSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const loadData = useCallback(async () => {
    if (!user || !petId) return;
    const [sched, rawDoses] = await Promise.all([
      getVaccinationScheduleByPet(user.uid, petId),
      getVaccinationDosesByPet(user.uid, petId),
    ]);
    if (!sched) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const live = computeLiveDoseStatuses(rawDoses);
    setSchedule(sched);
    setDoses(live);
    setSummary(getVaccinationStatusSummary(live));
    setLoading(false);
  }, [user, petId]);

  useEffect(() => {
    if (authLoading || !user) return;
    loadData();
  }, [user, authLoading, loadData]);

  async function handleMarkCompleted(doseId: string, completedDate: Date) {
    await markDoseCompleted(doseId, completedDate);
    // Optimistic update
    setDoses((prev) => {
      const updated = prev.map((d) =>
        d.id === doseId
          ? { ...d, status: "completed" as const, completedDate, updatedAt: new Date() }
          : d
      );
      setSummary(getVaccinationStatusSummary(updated));
      return updated;
    });
  }

  async function handleMarkSkipped(doseId: string) {
    await markDoseSkipped(doseId);
    setDoses((prev) => {
      const updated = prev.map((d) =>
        d.id === doseId
          ? { ...d, status: "skipped" as const, updatedAt: new Date() }
          : d
      );
      setSummary(getVaccinationStatusSummary(updated));
      return updated;
    });
  }

  async function handleUpdateDate(doseId: string, newDate: Date) {
    const dose = doses.find((d) => d.id === doseId);
    if (!dose || !schedule) return;

    const template = getTemplateById(schedule.templateId);
    const tpl = template?.doses.find(
      (t) => t.vaccineCode === dose.vaccineCode
    );

    // If changing the first dose, recalculate all future dates
    if (tpl && tpl.dayOffsetFromStart === 0 && template) {
      await regenerateScheduleFromFirstDose(
        schedule.id,
        newDate,
        template
      );
      // Reload all data after batch update
      await loadData();
    } else {
      await updateDoseDate(doseId, newDate);
      setDoses((prev) => {
        const updated = prev.map((d) =>
          d.id === doseId
            ? { ...d, plannedDate: newDate, status: "pending" as const, updatedAt: new Date() }
            : d
        );
        const live = computeLiveDoseStatuses(updated);
        setSummary(getVaccinationStatusSummary(live));
        return live;
      });
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound || !schedule || !summary) {
    return (
      <div>
        <Link
          href="/dashboard/vaccinations"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vaccinations
        </Link>
        <EmptyState
          title="No vaccination schedule found"
          description="Set up a vaccination schedule for this pet first."
          className="mt-8"
        />
        <div className="mt-4 flex justify-center">
          <Button asChild>
            <Link href={`/dashboard/vaccinations/setup${petId ? `?petId=${petId}` : ""}`}>
              Set Up Schedule
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/vaccinations"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Vaccinations
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {schedule.petName}&apos;s Vaccinations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {schedule.templateName} · Started{" "}
            {schedule.startDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={loadData}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>

      {/* Overdue warning */}
      {summary.overdueDoses > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            <strong>{summary.overdueDoses}</strong> vaccination
            {summary.overdueDoses !== 1 ? "s" : ""} overdue — please consult your
            veterinarian.
          </span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
        This schedule is educational guidance only. Always consult your vet for
        your pet&apos;s specific vaccination plan.
      </div>

      <div className="mt-6">
        <VaccinationTimeline
          doses={doses}
          summary={summary}
          onMarkCompleted={handleMarkCompleted}
          onMarkSkipped={handleMarkSkipped}
          onUpdateDate={handleUpdateDate}
        />
      </div>
    </div>
  );
}
