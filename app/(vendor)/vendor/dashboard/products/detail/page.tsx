"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getVendorProductById, deleteVendorProduct } from "@/lib/data/vendor/vendor-products";
import { deleteAllListingImages } from "@/lib/data/vendor/vendor-storage";
import { ListingStatusBadge } from "@/components/vendor/listing-status-badge";
import { InventoryBadge } from "@/components/vendor/inventory-badge";
import { ConfirmDeleteDialog } from "@/components/vendor/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, ArrowLeft, ShoppingBag } from "lucide-react";
import { VENDOR_PRODUCT_CATEGORY_LABELS } from "@/types/vendor-product";
import type { VendorProduct } from "@/types/vendor-product";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useVendorAuthGuard();
  const [product, setProduct] = useState<VendorProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const productId = searchParams.get("id") ?? "";

  useEffect(() => {
    if (!user || !productId) return;
    getVendorProductById(productId, user.uid).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [user, productId]);

  async function handleDelete() {
    if (!product) return;
    setDeleting(true);
    try {
      const paths = product.images.map((i) => i.path).filter(Boolean);
      if (paths.length > 0) await deleteAllListingImages(paths);
      await deleteVendorProduct(product.id);
      router.push("/vendor/dashboard/products");
    } catch {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">Product not found</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/vendor/dashboard/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/vendor/dashboard/products">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{product.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/vendor/dashboard/products/edit?id=${product.id}`}>
              <Pencil className="mr-1.5 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <ConfirmDeleteDialog
            title="Delete this product?"
            description="This will permanently remove the product and all associated images."
            onConfirm={handleDelete}
            loading={deleting}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ListingStatusBadge status={product.isPublished ? "published" : "draft"} />
        <InventoryBadge quantity={product.stockQuantity} />
        <Badge variant="secondary">{VENDOR_PRODUCT_CATEGORY_LABELS[product.category]}</Badge>
        {product.featured && <Badge variant="secondary">Featured</Badge>}
      </div>

      {product.images.length > 0 && (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {product.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image src={img.url} alt={`Photo ${idx + 1}`} fill className="object-cover" sizes="200px" />
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Details</h2>
          <dl className="space-y-2 text-sm">
            {[
              ["Category", VENDOR_PRODUCT_CATEGORY_LABELS[product.category]],
              ["Brand", product.brand ?? "—"],
              ["Price", `₹${product.price.toLocaleString("en-IN")}`],
              ["Sale Price", product.salePrice != null ? `₹${product.salePrice.toLocaleString("en-IN")}` : "—"],
              ["Stock", product.stockQuantity.toString()],
              ["SKU", product.sku ?? "—"],
              ["Weight", product.weight ?? "—"],
              ["Age Suitability", product.ageSuitability ?? "All"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{product.description}</p>
        </Card>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><Skeleton className="h-8 w-64" /><Skeleton className="h-96" /></div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
