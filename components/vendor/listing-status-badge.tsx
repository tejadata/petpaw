import { cn } from "@/lib/utils";
import type { PuppySaleStatus } from "@/types/vendor-puppy";
import { SALE_STATUS_LABELS } from "@/types/vendor-puppy";

const statusStyles: Record<PuppySaleStatus, string> = {
  available: "bg-emerald-600 text-white shadow-sm",
  reserved: "bg-blue-600 text-white shadow-sm",
  sold: "bg-purple-600 text-white shadow-sm",
  inactive: "bg-slate-500 text-white shadow-sm",
};

interface ListingStatusBadgeProps {
  status: PuppySaleStatus | "published" | "draft";
  className?: string;
}

export function ListingStatusBadge({ status, className }: ListingStatusBadgeProps) {
  if (status === "published") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-600 text-white shadow-sm",
          className
        )}
      >
        Published
      </span>
    );
  }

  if (status === "draft") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-500 text-white shadow-sm",
          className
        )}
      >
        Draft
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status],
        className
      )}
    >
      {SALE_STATUS_LABELS[status]}
    </span>
  );
}
