// ─── Vaccine Schedule Template (static, configurable) ─────────────────────

export interface VaccineDoseTemplate {
  vaccineCode: string;
  vaccineName: string;
  doseLabel: string;
  dayOffsetFromStart: number;
  recommendedAgeLabel: string;
  notes: string | null;
}

export interface VaccineScheduleTemplate {
  id: string;
  name: string;
  countryCode: string;
  species: string;
  lifeStage: "puppy" | "adult" | "all";
  doses: VaccineDoseTemplate[];
  isDefault: boolean;
}

// ─── Per-pet vaccination schedule (Firestore) ─────────────────────────────

export type ScheduleStatus = "active" | "completed" | "paused";

export interface VaccinationSchedule {
  id: string;
  userId: string;
  petId: string;
  petName: string;
  templateId: string;
  templateName: string;
  startDate: Date;
  scheduleStatus: ScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Individual dose record (Firestore) ────────────────────────────────────

export type DoseStatus = "pending" | "completed" | "overdue" | "skipped";

export interface VaccinationDose {
  id: string;
  userId: string;
  petId: string;
  scheduleId: string;
  vaccineCode: string;
  vaccineName: string;
  doseLabel: string;
  recommendedAgeLabel: string;
  plannedDate: Date;
  completedDate: Date | null;
  status: DoseStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Helpers for UI ────────────────────────────────────────────────────────

export interface VaccinationStatusSummary {
  totalDoses: number;
  completedDoses: number;
  pendingDoses: number;
  overdueDoses: number;
  skippedDoses: number;
  nextDueDose: VaccinationDose | null;
  progressPercent: number;
}
