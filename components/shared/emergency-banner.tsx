import { AlertTriangle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyBannerProps {
  title?: string;
  message?: string;
  className?: string;
}

export function EmergencyBanner({
  title = "Urgent Veterinary Attention May Be Needed",
  message = "If your dog is experiencing a medical emergency, please contact a veterinarian or emergency animal hospital immediately. Do not rely on online tools for emergency situations.",
  className,
}: EmergencyBannerProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-destructive bg-destructive/5 p-4 sm:p-6",
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-bold text-destructive text-lg">{title}</h3>
          <p className="mt-1 text-sm text-foreground">{message}</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-destructive">
            <Phone className="h-4 w-4" />
            <span>Contact your veterinarian or emergency animal hospital immediately</span>
          </div>
        </div>
      </div>
    </div>
  );
}
