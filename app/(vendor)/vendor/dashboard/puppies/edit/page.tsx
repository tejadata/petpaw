"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getPuppyListingById, updatePuppyListing } from "@/lib/data/vendor/puppy-listings";
import { uploadPuppyImages, deleteListingImage } from "@/lib/data/vendor/vendor-storage";
import { PuppyListingForm } from "@/components/vendor/puppy-listing-form";
import { MultiImageUpload } from "@/components/vendor/multi-image-upload";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PuppyListing, ListingImage } from "@/types/vendor-puppy";
import type { PuppyListingInput } from "@/lib/validations/vendor-puppy";

function EditPuppyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, vendor } = useVendorAuthGuard();
  const [puppy, setPuppy] = useState<PuppyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<(ListingImage & { file?: File })[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const listingId = searchParams.get("id") ?? "";
  const canPublish = vendor?.approvalStatus === "approved";

  useEffect(() => {
    if (!user || !listingId) return;
    getPuppyListingById(listingId, user.uid).then((data) => {
      setPuppy(data);
      if (data) setImages(data.images.map((img) => ({ ...img })));
      setLoading(false);
    });
  }, [user, listingId]);

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

  async function handleSubmit(data: PuppyListingInput) {
    if (!user || !puppy) return;
    setError("");
    setSaving(true);
    try {
      const pendingFiles = images.filter((img) => img.file).map((img) => img.file!);
      let allImages = images.filter((img) => !img.file).map(({ url, path }) => ({ url, path }));
      if (pendingFiles.length > 0) {
        setUploading(true);
        const results = await uploadPuppyImages(user.uid, puppy.id, pendingFiles, (idx, pct) => {
          setUploadProgress(Math.round(((idx * 100 + pct) / (pendingFiles.length * 100)) * 100));
        });
        allImages = [...allImages, ...results.map((r) => ({ url: r.url, path: r.path }))];
        setUploading(false);
      }
      await updatePuppyListing(puppy.id, user.uid, {
        ...data,
        microchipped: data.microchipped ?? null,
        pedigreeAvailable: data.pedigreeAvailable ?? null,
        healthCertificateAvailable: data.healthCertificateAvailable ?? null,
        disclaimer: data.disclaimer ?? null,
        isPublished: canPublish ? data.isPublished : false,
        images: allImages,
      });
      router.push(`/vendor/dashboard/puppies/detail?id=${puppy.id}`);
    } catch {
      setError("Failed to update listing. Please try again.");
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

  if (!puppy) {
    return <div className="py-16 text-center"><h2 className="text-lg font-semibold">Listing not found</h2></div>;
  }

  const defaultValues: Partial<PuppyListingInput> = {
    title: puppy.title, slug: puppy.slug, breed: puppy.breed, gender: puppy.gender,
    ageInWeeks: puppy.ageInWeeks, color: puppy.color, price: puppy.price,
    saleStatus: puppy.saleStatus, description: puppy.description,
    shortDescription: puppy.shortDescription, vaccinated: puppy.vaccinated,
    dewormed: puppy.dewormed, microchipped: puppy.microchipped,
    pedigreeAvailable: puppy.pedigreeAvailable,
    healthCertificateAvailable: puppy.healthCertificateAvailable,
    location: puppy.location, pickupAvailable: puppy.pickupAvailable,
    deliveryAvailable: puppy.deliveryAvailable, featured: puppy.featured,
    isPublished: puppy.isPublished, disclaimer: puppy.disclaimer,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Puppy Listing</h1>
        <p className="text-sm text-muted-foreground">Update &ldquo;{puppy.title}&rdquo;</p>
      </div>
      <Card className="p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Photos</h3>
        <MultiImageUpload
          images={images} onAdd={handleAddImages} onRemove={handleRemoveImage}
          uploading={uploading} uploadProgress={uploadProgress} maxImages={8}
        />
      </Card>
      <Card className="p-6">
        <PuppyListingForm
          defaultValues={defaultValues} onSubmit={handleSubmit}
          submitLabel="Update Listing" loading={saving || uploading}
          error={error} canPublish={canPublish}
        />
      </Card>
    </div>
  );
}

export default function EditPuppyPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-96" /></div>}>
      <EditPuppyContent />
    </Suspense>
  );
}
