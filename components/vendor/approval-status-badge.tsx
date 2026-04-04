import { cn } from "@/lib/utils";
import type { VendorApprovalStatus } from "@/types/vendor";
import { APPROVAL_STATUS_LABELS } from "@/types/vendor";

const statusStyles: Record<VendorApprovalStatus, string> = {
  pending: "bg-amber-500 text-white shadow-sm",
  approved: "bg-emerald-600 text-white shadow-sm",
  rejected: "bg-red-600 text-white shadow-sm",
  suspended: "bg-slate-600 text-white shadow-sm",
};

interface ApprovalStatusBadgeProps {
  status: VendorApprovalStatus;
  className?: string;
}

export function ApprovalStatusBadge({ status, className }: ApprovalStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status],
        className
      )}
    >
      {APPROVAL_STATUS_LABELS[status]}
    </span>
  );
}
