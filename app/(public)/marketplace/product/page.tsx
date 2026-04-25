"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublicVendorProductById } from "@/lib/data/vendor/vendor-products";
import { getStoreById } from "@/lib/data/vendor/stores";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { VendorDetailsCard } from "@/components/vendor/vendor-details-card";
import { PriceDisplay } from "@/components/marketplace/price-display";
import { VENDOR_PRODUCT_CATEGORY_LABELS } from "@/types/vendor-product";
import type { VendorProduct } from "@/types/vendor-product";
import type { Store as StoreType } from "@/types/vendor";

export default function PublicProductDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<VendorProduct | null>(null);
  const [store, setStore] = useState<StoreType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getPublicVendorProductById(id).then(async (data) => {
      setProduct(data);
      if (data?.storeId) {
        const s = await getStoreById(data.storeId);
        setStore(s);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Container className="py-16">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-6 h-96" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-16">
        <div className="flex flex-col items-center text-center py-16">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">Product not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This product may have been removed or is no longer available.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-16 sm:py-20">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/marketplace">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            {product.images[activeImg] ? (
              <Image
                src={product.images[activeImg].url}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === activeImg
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/30"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-3">
              {VENDOR_PRODUCT_CATEGORY_LABELS[product.category]}
            </Badge>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <PriceDisplay
              price={product.price}
              salePrice={product.salePrice}
              className="mt-2"
            />
            {product.brand && (
              <p className="mt-1 text-sm text-muted-foreground">
                by {product.brand}
              </p>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Details</h3>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                ["Category", VENDOR_PRODUCT_CATEGORY_LABELS[product.category]],
                ["SKU", product.sku ?? "—"],
                ["Weight", product.weight ?? "—"],
                ["Age Suitability", product.ageSuitability ?? "All ages"],
                [
                  "In Stock",
                  product.stockQuantity > 0
                    ? `${product.stockQuantity} available`
                    : "Out of stock",
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {/* Store info */}
          {store && <VendorDetailsCard store={store} />}
        </div>
      </div>
    </Container>
  );
}
