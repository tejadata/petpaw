"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Trash2 } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import type { VaccinationSchedule } from "@/types/vaccination";

interface VaccinationScheduleCardProps {
  schedule: VaccinationSchedule;
  onDelete: (scheduleId: string) => void;
}

const STATUS_BADGE: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  paused: { label: "Paused", variant: "outline" },
};

export function VaccinationScheduleCard({
  schedule,
  onDelete,
}: VaccinationScheduleCardProps) {
  const badge = STATUS_BADGE[schedule.scheduleStatus] ?? STATUS_BADGE.active;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{schedule.petName}</h3>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {schedule.templateName}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Started{" "}
              {schedule.startDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <ConfirmDeleteDialog
            title={`Delete vaccination schedule for ${schedule.petName}?`}
            description="This will delete the schedule and all dose records. This action cannot be undone."
            onConfirm={() => onDelete(schedule.id)}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <Button asChild size="sm" variant="outline" className="gap-1">
            <Link href={`/dashboard/vaccinations/timeline?petId=${schedule.petId}`}>
              View Timeline
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
