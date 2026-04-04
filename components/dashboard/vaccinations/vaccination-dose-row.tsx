"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VaccineStatusBadge } from "./vaccine-status-badge";
import {
  CheckCircle,
  Circle,
  Calendar,
  SkipForward,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { VaccinationDose } from "@/types/vaccination";

interface VaccinationDoseRowProps {
  dose: VaccinationDose;
  onMarkCompleted: (doseId: string, completedDate: Date) => void;
  onMarkSkipped: (doseId: string) => void;
  onUpdateDate: (doseId: string, newDate: Date) => void;
}

export function VaccinationDoseRow({
  dose,
  onMarkCompleted,
  onMarkSkipped,
  onUpdateDate,
}: VaccinationDoseRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [completedDate, setCompletedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newPlannedDate, setNewPlannedDate] = useState(
    dose.plannedDate.toISOString().split("T")[0]
  );

  const isActionable = dose.status === "pending" || dose.status === "overdue";

  return (
    <Card className={cn(dose.status === "completed" && "opacity-70")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Status icon */}
          <button
            type="button"
            className="mt-0.5 shrink-0"
            onClick={() => isActionable && setExpanded(!expanded)}
            aria-label={isActionable ? (expanded ? "Collapse actions" : "Expand actions") : undefined}
          >
            {dose.status === "completed" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle
                className={cn(
                  "h-5 w-5 transition-colors",
                  dose.status === "overdue"
                    ? "text-red-400"
                    : "text-muted-foreground",
                  isActionable && "cursor-pointer hover:text-primary"
                )}
              />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={cn(
                  "font-medium text-sm",
                  dose.status === "completed" && "line-through text-muted-foreground"
                )}
              >
                {dose.vaccineName}
              </p>
              <VaccineStatusBadge status={dose.status} />
            </div>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{dose.doseLabel}</span>
              <span>Age: {dose.recommendedAgeLabel}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {dose.plannedDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {dose.completedDate && (
                <span className="text-green-600">
                  Done:{" "}
                  {dose.completedDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            {dose.notes && (
              <p className="mt-1 text-xs text-muted-foreground/80 italic">
                {dose.notes}
              </p>
            )}

            {/* Expanded actions */}
            {expanded && isActionable && (
              <div className="mt-3 space-y-3 rounded-lg border bg-muted/30 p-3">
                {/* Mark completed */}
                <div className="flex flex-wrap items-end gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Completion date</label>
                    <Input
                      type="date"
                      value={completedDate}
                      onChange={(e) => setCompletedDate(e.target.value)}
                      className="h-8 w-40 text-xs"
                    />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() =>
                      onMarkCompleted(dose.id, new Date(completedDate))
                    }
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Mark Done
                  </Button>
                </div>

                {/* Reschedule */}
                <div className="flex flex-wrap items-end gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Reschedule to</label>
                    <Input
                      type="date"
                      value={newPlannedDate}
                      onChange={(e) => setNewPlannedDate(e.target.value)}
                      className="h-8 w-40 text-xs"
                    />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                    onClick={() =>
                      onUpdateDate(dose.id, new Date(newPlannedDate))
                    }
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Reschedule
                  </Button>
                </div>

                {/* Skip */}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 gap-1 text-muted-foreground"
                  onClick={() => onMarkSkipped(dose.id)}
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Skip this dose
                </Button>
              </div>
            )}
          </div>

          {/* Expand toggle */}
          {isActionable && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "Collapse" : "Expand actions"}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
