import { Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerBlockProps {
  variant?: "info" | "warning";
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_DISCLAIMER = "All health-related content is for educational purposes only and should not replace professional veterinary advice. Always consult with a licensed veterinarian for medical decisions regarding your pet.";

export function DisclaimerBlock({ variant = "info", className, children }: DisclaimerBlockProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm",
        variant === "warning"
          ? "border-warning/50 bg-warning/5 text-warning-foreground"
          : "border-primary/20 bg-primary/5 text-foreground",
        className
      )}
      role="note"
    >
      {variant === "warning" ? (
        <ShieldAlert className="h-5 w-5 shrink-0 text-warning mt-0.5" />
      ) : (
        <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
      )}
      <div>{children ?? DEFAULT_DISCLAIMER}</div>
    </div>
  );
}
