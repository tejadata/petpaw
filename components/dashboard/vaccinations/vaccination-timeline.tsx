"use client";

import { Progress } from "@/components/ui/progress";
import { VaccinationDoseRow } from "./vaccination-dose-row";
import { Syringe } from "lucide-react";
import type { VaccinationDose, VaccinationStatusSummary } from "@/types/vaccination";

interface VaccinationTimelineProps {
  doses: VaccinationDose[];
  summary: VaccinationStatusSummary;
  onMarkCompleted: (doseId: string, completedDate: Date) => void;
  onMarkSkipped: (doseId: string) => void;
  onUpdateDate: (doseId: string, newDate: Date) => void;
}

export function VaccinationTimeline({
  doses,
  summary,
  onMarkCompleted,
  onMarkSkipped,
  onUpdateDate,
}: VaccinationTimelineProps) {
  return (
    <div>
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Syringe className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            {summary.completedDoses} of {summary.totalDoses} doses completed
          </span>
        </div>
        <span className="text-sm font-bold text-primary">
          {summary.progressPercent}%
        </span>
      </div>
      <Progress value={summary.progressPercent} className="mt-2 h-2" />

      {/* Dose list */}
      <div className="mt-6 space-y-3">
        {doses.map((dose) => (
          <VaccinationDoseRow
            key={dose.id}
            dose={dose}
            onMarkCompleted={onMarkCompleted}
            onMarkSkipped={onMarkSkipped}
            onUpdateDate={onUpdateDate}
          />
        ))}
      </div>
    </div>
  );
}
