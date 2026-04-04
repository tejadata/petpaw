import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function RatingStars({ rating, max = 5, size = "sm", className }: RatingStarsProps) {
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconSize,
            i < Math.floor(rating)
              ? "text-accent fill-accent"
              : i < rating
                ? "text-accent fill-accent/50"
                : "text-muted-foreground/30"
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}
