import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ListingStatusBadge } from "@/components/vendor/listing-status-badge";
import { InventoryBadge } from "@/components/vendor/inventory-badge";
import { ShoppingBag } from "lucide-react";
import { formatCurrencyInr } from "@/lib/utils";
import { VENDOR_PRODUCT_CATEGORY_LABELS } from "@/types/vendor-product";
import type { VendorProduct } from "@/types/vendor-product";

interface ProductListingCardProps {
  product: VendorProduct;
}

export function ProductListingCard({ product }: ProductListingCardProps) {
  return (
    <Link href={`/vendor/dashboard/products/detail?id=${product.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute right-2 top-2">
            <ListingStatusBadge status={product.isPublished ? "published" : "draft"} />
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground truncate">
            {VENDOR_PRODUCT_CATEGORY_LABELS[product.category]}
          </p>
          <h3 className="mt-0.5 font-semibold truncate text-sm sm:text-base">{product.title}</h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg font-bold text-primary">
                {formatCurrencyInr(product.price)}
              </span>
              {product.salePrice != null && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  {formatCurrencyInr(product.salePrice)}
                </span>
              )}
            </div>
            <InventoryBadge quantity={product.stockQuantity} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
