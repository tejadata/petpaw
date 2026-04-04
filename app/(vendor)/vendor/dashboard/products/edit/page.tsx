"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getVendorProductById, updateVendorProduct } from "@/lib/data/vendor/vendor-products";
import { uploadProductImages, deleteListingImage } from "@/lib/data/vendor/vendor-storage";
import { ProductListingForm } from "@/components/vendor/product-listing-form";
import { MultiImageUpload } from "@/components/vendor/multi-image-upload";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { VendorProduct } from "@/types/vendor-product";
import type { VendorProductInput } from "@/lib/validations/vendor-product";

function EditProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, vendor } = useVendorAuthGuard();
  const [product, setProduct] = useState<VendorProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<{ url: string; path: string; file?: File }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const productId = searchParams.get("id") ?? "";
  const canPublish = vendor?.approvalStatus === "approved";

  useEffect(() => {
    if (!user || !productId) return;
    getVendorProductById(productId, user.uid).then((data) => {
      setProduct(data);
      if (data) setImages(data.images.map((img) => ({ ...img })));
      setLoading(false);
    });
  }, [user, productId]);

  function handleAddImages(files: File[]) {
    const newImages = files.map((f) => ({ url: URL.createObjectURL(f), path: "", file: f }));
    setImages((prev) => [...prev, ...newImages]);
  }

  async function handleRemoveImage(index: number) {
    const img = images[index];
    if (img.path) {
      try { await deleteListingImage(img.path); } catch { /* ignore */ }
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(data: VendorProductInput) {
    if (!user || !product) return;
    setError("");
    setSaving(true);
    try {
      const pendingFiles = images.filter((img) => img.file).map((img) => img.file!);
      let allImages = images.filter((img) => !img.file).map(({ url, path }) => ({ url, path }));
      if (pendingFiles.length > 0) {
        setUploading(true);
        const results = await uploadProductImages(user.uid, product.id, pendingFiles, (idx, pct) => {
          setUploadProgress(Math.round(((idx * 100 + pct) / (pendingFiles.length * 100)) * 100));
        });
        allImages = [...allImages, ...results.map((r) => ({ url: r.url, path: r.path }))];
        setUploading(false);
      }
      await updateVendorProduct(product.id, user.uid, {
        ...data,
        brand: data.brand ?? null,
        salePrice: data.salePrice ?? null,
        sku: data.sku ?? null,
        weight: data.weight ?? null,
        ageSuitability: data.ageSuitability ?? null,
        breedSuitability: data.breedSuitability ?? [],
        isPublished: canPublish ? data.isPublished : false,
        images: allImages,
      });
      router.push(`/vendor/dashboard/products/detail?id=${product.id}`);
    } catch {
      setError("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!product) {
    return <div className="py-16 text-center"><h2 className="text-lg font-semibold">Product not found</h2></div>;
  }

  const defaultValues: Partial<VendorProductInput> = {
    title: product.title, slug: product.slug, category: product.category,
    brand: product.brand, description: product.description,
    shortDescription: product.shortDescription, price: product.price,
    salePrice: product.salePrice, stockQuantity: product.stockQuantity,
    sku: product.sku, weight: product.weight, ageSuitability: product.ageSuitability,
    breedSuitability: product.breedSuitability, featured: product.featured,
    isPublished: product.isPublished,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-sm text-muted-foreground">Update &ldquo;{product.title}&rdquo;</p>
      </div>
      <Card className="p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Photos</h3>
        <MultiImageUpload
          images={images} onAdd={handleAddImages} onRemove={handleRemoveImage}
          uploading={uploading} uploadProgress={uploadProgress} maxImages={8}
        />
      </Card>
      <Card className="p-6">
        <ProductListingForm
          defaultValues={defaultValues} onSubmit={handleSubmit}
          submitLabel="Update Product" loading={saving || uploading}
          error={error} canPublish={canPublish}
        />
      </Card>
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-96" /></div>}>
      <EditProductContent />
    </Suspense>
  );
}
