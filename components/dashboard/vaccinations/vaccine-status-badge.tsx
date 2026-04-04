"use client";

import { cn } from "@/lib/utils";
import type { DoseStatus } from "@/types/vaccination";

const STATUS_CONFIG: Record<
  DoseStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Upcoming",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  overdue: {
    label: "Overdue",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  skipped: {
    label: "Skipped",
    className: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

interface VaccineStatusBadgeProps {
  status: DoseStatus;
  className?: string;
}

export function VaccineStatusBadge({ status, className }: VaccineStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
