"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getPuppyListingById, deletePuppyListing } from "@/lib/data/vendor/puppy-listings";
import { deleteAllListingImages } from "@/lib/data/vendor/vendor-storage";
import { ListingStatusBadge } from "@/components/vendor/listing-status-badge";
import { ConfirmDeleteDialog } from "@/components/vendor/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, ArrowLeft, MapPin, Check, X, Dog } from "lucide-react";
import type { PuppyListing } from "@/types/vendor-puppy";

function PuppyDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useVendorAuthGuard();
  const [puppy, setPuppy] = useState<PuppyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const listingId = searchParams.get("id") ?? "";

  useEffect(() => {
    if (!user || !listingId) return;
    getPuppyListingById(listingId, user.uid).then((data) => {
      setPuppy(data);
      setLoading(false);
    });
  }, [user, listingId]);

  async function handleDelete() {
    if (!puppy) return;
    setDeleting(true);
    try {
      const paths = puppy.images.map((i) => i.path).filter(Boolean);
      if (paths.length > 0) await deleteAllListingImages(paths);
      await deletePuppyListing(puppy.id);
      router.push("/vendor/dashboard/puppies");
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

  if (!puppy) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Dog className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">Listing not found</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/vendor/dashboard/puppies">Back to Listings</Link>
        </Button>
      </div>
    );
  }

  const BoolIcon = ({ value }: { value: boolean | null }) =>
    value ? (
      <Check className="h-4 w-4 text-green-600" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground" />
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/vendor/dashboard/puppies">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{puppy.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/vendor/dashboard/puppies/edit?id=${puppy.id}`}>
              <Pencil className="mr-1.5 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <ConfirmDeleteDialog
            title="Delete this puppy listing?"
            description="This will permanently remove the listing and all associated images."
            onConfirm={handleDelete}
            loading={deleting}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ListingStatusBadge status={puppy.isPublished ? "published" : "draft"} />
        <ListingStatusBadge status={puppy.saleStatus} />
        {puppy.featured && <Badge variant="secondary">Featured</Badge>}
      </div>

      {puppy.images.length > 0 && (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {puppy.images.map((img, idx) => (
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
              ["Breed", puppy.breed],
              ["Gender", puppy.gender],
              ["Age", `${puppy.ageInWeeks} weeks`],
              ["Color", puppy.color],
              ["Price", `₹${puppy.price.toLocaleString("en-IN")}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium capitalize">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Health & Safety</h2>
          <dl className="space-y-2 text-sm">
            {[
              ["Vaccinated", puppy.vaccinated],
              ["Dewormed", puppy.dewormed],
              ["Microchipped", puppy.microchipped],
              ["Pedigree", puppy.pedigreeAvailable],
              ["Health Certificate", puppy.healthCertificateAvailable],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between">
                <dt className="text-muted-foreground">{label as string}</dt>
                <dd><BoolIcon value={value as boolean | null} /></dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold">Location & Delivery</h2>
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {puppy.location}
        </div>
        <div className="mt-2 flex gap-4 text-sm">
          <span>Pickup: {puppy.pickupAvailable ? "Yes" : "No"}</span>
          <span>Delivery: {puppy.deliveryAvailable ? "Yes" : "No"}</span>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold">Description</h2>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{puppy.description}</p>
      </Card>

      {puppy.disclaimer && (
        <Card className="p-6">
          <h2 className="mb-3 text-lg font-semibold">Disclaimer</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{puppy.disclaimer}</p>
        </Card>
      )}
    </div>
  );
}

export default function PuppyDetailPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><Skeleton className="h-8 w-64" /><Skeleton className="h-96" /></div>}>
      <PuppyDetailContent />
    </Suspense>
  );
}
