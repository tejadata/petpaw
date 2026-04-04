import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface VendorStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function VendorStatCard({
  title,
  value,
  icon: Icon,
  description,
  className,
}: VendorStatCardProps) {
  return (
    <Card className={cn("p-4 sm:p-6", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold">{value}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  );
}
