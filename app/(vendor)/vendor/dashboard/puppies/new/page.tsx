"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getStoreByVendor } from "@/lib/data/vendor/stores";
import { createPuppyListing } from "@/lib/data/vendor/puppy-listings";
import { uploadPuppyImages } from "@/lib/data/vendor/vendor-storage";
import { updatePuppyListing } from "@/lib/data/vendor/puppy-listings";
import { PuppyListingForm } from "@/components/vendor/puppy-listing-form";
import { MultiImageUpload } from "@/components/vendor/multi-image-upload";
import { Card } from "@/components/ui/card";
import type { PuppyListingInput } from "@/lib/validations/vendor-puppy";
import type { ListingImage } from "@/types/vendor-puppy";
import { useEffect } from "react";

export default function NewPuppyPage() {
  const router = useRouter();
  const { user, vendor } = useVendorAuthGuard();
  const [storeId, setStoreId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<(ListingImage & { file?: File })[]>([]);
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

  async function handleSubmit(data: PuppyListingInput) {
    if (!user || !storeId) {
      setError("Please set up your store profile first.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      // Create listing
      const listing = await createPuppyListing(user.uid, storeId, {
        ...data,
        microchipped: data.microchipped ?? null,
        pedigreeAvailable: data.pedigreeAvailable ?? null,
        healthCertificateAvailable: data.healthCertificateAvailable ?? null,
        disclaimer: data.disclaimer ?? null,
        isPublished: canPublish ? data.isPublished : false,
      });

      // Upload images if any
      const pendingFiles = images.filter((img) => img.file).map((img) => img.file!);
      if (pendingFiles.length > 0) {
        setUploading(true);
        const results = await uploadPuppyImages(user.uid, listing.id, pendingFiles, (idx, pct) => {
          const overall = Math.round(((idx * 100 + pct) / (pendingFiles.length * 100)) * 100);
          setUploadProgress(overall);
        });
        const uploadedImages = results.map((r) => ({ url: r.url, path: r.path }));
        await updatePuppyListing(listing.id, user.uid, { images: uploadedImages });
        setUploading(false);
      }

      router.push("/vendor/dashboard/puppies");
    } catch {
      setError("Failed to create listing. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Puppy Listing</h1>
        <p className="text-sm text-muted-foreground">
          Create a new puppy listing for your store.
        </p>
      </div>

      {!storeId && (
        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
          You need to set up your store profile before adding listings.
        </div>
      )}

      {/* Image Upload */}
      <Card className="p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Photos
        </h3>
        <MultiImageUpload
          images={images}
          onAdd={handleAddImages}
          onRemove={handleRemoveImage}
          uploading={uploading}
          uploadProgress={uploadProgress}
          maxImages={8}
        />
      </Card>

      {/* Form */}
      <Card className="p-6">
        <PuppyListingForm
          onSubmit={handleSubmit}
          submitLabel="Create Listing"
          loading={saving || uploading}
          error={error}
          canPublish={canPublish}
        />
      </Card>
    </div>
  );
}
