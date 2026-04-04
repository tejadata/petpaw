"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Syringe, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import type { VaccinationStatusSummary } from "@/types/vaccination";

interface VaccinationSummaryCardProps {
  petName: string;
  summary: VaccinationStatusSummary;
  onClick?: () => void;
}

export function VaccinationSummaryCard({
  petName,
  summary,
  onClick,
}: VaccinationSummaryCardProps) {
  return (
    <Card
      className={onClick ? "cursor-pointer transition-shadow hover:shadow-md" : ""}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Syringe className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{petName}</h3>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {summary.completedDoses}/{summary.totalDoses} doses
          </span>
        </div>

        <Progress value={summary.progressPercent} className="mt-3 h-2" />

        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {summary.overdueDoses > 0 && (
            <span className="flex items-center gap-1 text-red-600 font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              {summary.overdueDoses} overdue
            </span>
          )}
          {summary.pendingDoses > 0 && (
            <span className="flex items-center gap-1 text-blue-600">
              <Clock className="h-3.5 w-3.5" />
              {summary.pendingDoses} upcoming
            </span>
          )}
          {summary.completedDoses > 0 && (
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {summary.completedDoses} completed
            </span>
          )}
        </div>

        {summary.nextDueDose && (
          <p className="mt-2 text-xs text-muted-foreground">
            Next: <span className="font-medium">{summary.nextDueDose.vaccineName}</span> —{" "}
            {summary.nextDueDose.plannedDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
