"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getStoreByVendor } from "@/lib/data/vendor/stores";
import { createVendorProduct, updateVendorProduct } from "@/lib/data/vendor/vendor-products";
import { uploadProductImages } from "@/lib/data/vendor/vendor-storage";
import { ProductListingForm } from "@/components/vendor/product-listing-form";
import { MultiImageUpload } from "@/components/vendor/multi-image-upload";
import { Card } from "@/components/ui/card";
import type { VendorProductInput } from "@/lib/validations/vendor-product";

export default function NewProductPage() {
  const router = useRouter();
  const { user, vendor } = useVendorAuthGuard();
  const [storeId, setStoreId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<{ url: string; path: string; file?: File }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const canPublish = vendor?.approvalStatus === "approved";

  useEffect(() => {
    if (!user) return;
    getStoreByVendor(user.uid).then((s) => {
      if (s) setStoreId(s.id);
    });
  }, [user]);

  function handleAddImages(files: File[]) {
    const newImages = files.map((f) => ({
      url: URL.createObjectURL(f),
      path: "",
      file: f,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(data: VendorProductInput) {
    if (!user || !storeId) {
      setError("Please set up your store profile first.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      const product = await createVendorProduct(user.uid, storeId, {
        ...data,
        brand: data.brand ?? null,
        salePrice: data.salePrice ?? null,
        sku: data.sku ?? null,
        weight: data.weight ?? null,
        ageSuitability: data.ageSuitability ?? null,
        breedSuitability: data.breedSuitability ?? [],
        isPublished: canPublish ? data.isPublished : false,
      });

      const pendingFiles = images.filter((img) => img.file).map((img) => img.file!);
      if (pendingFiles.length > 0) {
        setUploading(true);
        const results = await uploadProductImages(user.uid, product.id, pendingFiles, (idx, pct) => {
          const overall = Math.round(((idx * 100 + pct) / (pendingFiles.length * 100)) * 100);
          setUploadProgress(overall);
        });
        const uploadedImages = results.map((r) => ({ url: r.url, path: r.path }));
        await updateVendorProduct(product.id, user.uid, { images: uploadedImages });
        setUploading(false);
      }

      router.push("/vendor/dashboard/products");
    } catch {
      setError("Failed to create product. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="text-sm text-muted-foreground">Create a new product listing for your store.</p>
      </div>

      {!storeId && (
        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
          You need to set up your store profile before adding products.
        </div>
      )}

      <Card className="p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Photos</h3>
        <MultiImageUpload
          images={images}
          onAdd={handleAddImages}
          onRemove={handleRemoveImage}
          uploading={uploading}
          uploadProgress={uploadProgress}
          maxImages={8}
        />
      </Card>

      <Card className="p-6">
        <ProductListingForm
          onSubmit={handleSubmit}
          submitLabel="Create Product"
          loading={saving || uploading}
          error={error}
          canPublish={canPublish}
        />
      </Card>
    </div>
  );
}
