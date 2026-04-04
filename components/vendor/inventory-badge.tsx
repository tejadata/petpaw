import { cn } from "@/lib/utils";

interface InventoryBadgeProps {
  quantity: number;
  className?: string;
}

export function InventoryBadge({ quantity, className }: InventoryBadgeProps) {
  const isOutOfStock = quantity === 0;
  const isLow = quantity > 0 && quantity <= 5;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        isOutOfStock
          ? "bg-red-600 text-white shadow-sm"
          : isLow
            ? "bg-amber-500 text-white shadow-sm"
            : "bg-emerald-600 text-white shadow-sm",
        className
      )}
    >
      {isOutOfStock ? "Out of Stock" : isLow ? `Low Stock (${quantity})` : `In Stock (${quantity})`}
    </span>
  );
}
