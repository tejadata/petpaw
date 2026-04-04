import type {
  VaccineScheduleTemplate,
  VaccinationDose,
  VaccinationStatusSummary,
  DoseStatus,
} from "@/types/vaccination";

// ─── Date helpers ──────────────────────────────────────────────────────────

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─── Core scheduling functions ─────────────────────────────────────────────

/**
 * Generate a timeline of dose records from a template + start date.
 * Returns plain objects (no Firestore ids); caller persists them.
 */
export function generateVaccinationTimeline(
  template: VaccineScheduleTemplate,
  startDate: Date
): Array<
  Omit<VaccinationDose, "id" | "userId" | "petId" | "scheduleId" | "createdAt" | "updatedAt">
> {
  const baseDate = startOfDay(startDate);
  return template.doses.map((dose) => ({
    vaccineCode: dose.vaccineCode,
    vaccineName: dose.vaccineName,
    doseLabel: dose.doseLabel,
    recommendedAgeLabel: dose.recommendedAgeLabel,
    plannedDate: addDays(baseDate, dose.dayOffsetFromStart),
    completedDate: null,
    status: "pending" as DoseStatus,
    notes: dose.notes,
  }));
}

/**
 * Pre-mark specific doses as already completed.
 * `completedDoses` is an array of { vaccineCode, completedDate }.
 * Returns a new array with matching doses marked completed.
 */
export function applyCompletedDoses(
  timeline: Array<
    Omit<VaccinationDose, "id" | "userId" | "petId" | "scheduleId" | "createdAt" | "updatedAt">
  >,
  completedDoses: Array<{ vaccineCode: string; completedDate: Date }>
): typeof timeline {
  const completedMap = new Map(
    completedDoses.map((c) => [c.vaccineCode, c.completedDate])
  );
  return timeline.map((dose) => {
    const completedDate = completedMap.get(dose.vaccineCode);
    if (completedDate) {
      return { ...dose, status: "completed" as DoseStatus, completedDate };
    }
    return dose;
  });
}

/**
 * Recalculate future dose dates when a specific dose's date changes.
 *
 * Strategy: If the changed dose is not the first dose, only that dose's
 * planned date is updated. If it IS the first dose (offset 0), all subsequent
 * non-completed doses are shifted proportionally to the new start date.
 */
export function recalculateFutureDoseDates(
  doses: VaccinationDose[],
  changedDoseId: string,
  newDate: Date,
  template: VaccineScheduleTemplate
): VaccinationDose[] {
  const changedDose = doses.find((d) => d.id === changedDoseId);
  if (!changedDose) return doses;

  const changedTemplate = template.doses.find(
    (t) => t.vaccineCode === changedDose.vaccineCode
  );

  // If this is the first dose (offset 0), shift all future pending doses
  if (changedTemplate && changedTemplate.dayOffsetFromStart === 0) {
    const newStartDate = startOfDay(newDate);
    return doses.map((dose) => {
      if (dose.id === changedDoseId) {
        return { ...dose, plannedDate: newStartDate, updatedAt: new Date() };
      }
      if (dose.status === "completed" || dose.status === "skipped") {
        return dose;
      }
      const tpl = template.doses.find((t) => t.vaccineCode === dose.vaccineCode);
      if (tpl) {
        return {
          ...dose,
          plannedDate: addDays(newStartDate, tpl.dayOffsetFromStart),
          updatedAt: new Date(),
        };
      }
      return dose;
    });
  }

  // Otherwise only update the changed dose
  return doses.map((dose) =>
    dose.id === changedDoseId
      ? { ...dose, plannedDate: startOfDay(newDate), updatedAt: new Date() }
      : dose
  );
}

/**
 * Compute the live status of each dose based on today's date.
 * - completed → stays completed
 * - skipped → stays skipped
 * - pending + past due → overdue
 * - pending + future → pending
 */
export function computeLiveDoseStatuses(
  doses: VaccinationDose[]
): VaccinationDose[] {
  const today = startOfDay(new Date());
  return doses.map((dose) => {
    if (dose.status === "completed" || dose.status === "skipped") return dose;
    const isOverdue = dose.plannedDate < today;
    return { ...dose, status: isOverdue ? "overdue" : "pending" };
  });
}

/**
 * Get a summary of vaccination progress for a pet.
 */
export function getVaccinationStatusSummary(
  doses: VaccinationDose[]
): VaccinationStatusSummary {
  const live = computeLiveDoseStatuses(doses);
  const totalDoses = live.length;
  const completedDoses = live.filter((d) => d.status === "completed").length;
  const pendingDoses = live.filter((d) => d.status === "pending").length;
  const overdueDoses = live.filter((d) => d.status === "overdue").length;
  const skippedDoses = live.filter((d) => d.status === "skipped").length;

  const nextDueDose =
    live
      .filter((d) => d.status === "pending" || d.status === "overdue")
      .sort((a, b) => a.plannedDate.getTime() - b.plannedDate.getTime())[0] ??
    null;

  const actionable = totalDoses - skippedDoses;
  const progressPercent =
    actionable > 0 ? Math.round((completedDoses / actionable) * 100) : 0;

  return {
    totalDoses,
    completedDoses,
    pendingDoses,
    overdueDoses,
    skippedDoses,
    nextDueDose,
    progressPercent,
  };
}
