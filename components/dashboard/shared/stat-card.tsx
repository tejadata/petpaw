import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  iconColor?: string;
  href?: string;
  loading?: boolean;
}

export function StatCard({ icon: Icon, label, value, iconColor = "text-primary", loading }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Icon className={cn("h-8 w-8", iconColor)} />
        {loading ? (
          <div className="h-8 w-10 animate-pulse rounded bg-muted" />
        ) : (
          <span className="text-3xl font-bold">{value}</span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
