import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group h-full">
        <div className="aspect-[4/3] bg-gradient-to-br from-accent/10 to-secondary/20 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-accent/30 group-hover:text-accent/50 transition-colors" />
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
              {product.title}
            </h3>
            <span className="font-bold text-lg whitespace-nowrap">{formatCurrency(product.price)}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.summary}</p>
          <div className="mt-3 flex items-center justify-between">
            <RatingStars rating={product.rating} />
            <Badge variant="secondary" className="text-xs">{product.categoryName}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
