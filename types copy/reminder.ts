export type ReminderType =
  | "Vaccination"
  | "Deworming"
  | "Grooming"
  | "VetVisit"
  | "Medication"
  | "DailyCare"
  | "Wellness"
  | "Training"
  | "Other";

export type ReminderPriority = "low" | "medium" | "high";
export type RepeatFrequency = "Once" | "Daily" | "Weekly" | "Biweekly" | "Monthly" | "Quarterly" | "Yearly";

export interface Reminder {
  id: string;
  userId: string;
  petId: string | null;
  petName: string | null;
  // legacy fields kept for backward compat
  dogProfileId: string | null;
  dogName: string | null;
  type: ReminderType;
  title: string;
  description: string | null;
  scheduledDate: Date;
  recurringFrequency: RepeatFrequency;
  priority: ReminderPriority;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
