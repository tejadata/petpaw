"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublicPuppyListingById } from "@/lib/data/vendor/puppy-listings";
import { getStoreById } from "@/lib/data/vendor/stores";
import { breeds as staticBreeds } from "@/lib/datasets/breeds";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BreedTraits } from "@/components/breeds/breed-traits";
import { VendorDetailsCard } from "@/components/vendor/vendor-details-card";
import { ArrowLeft, Dog, CheckCircle2 } from "lucide-react";
import { formatWeightKg } from "@/lib/utils";
import { PriceDisplay } from "@/components/marketplace/price-display";
import type { PuppyListing } from "@/types/vendor-puppy";
import type { Store as StoreType } from "@/types/vendor";
import type { Breed } from "@/types/breed";

export default function PublicPuppyDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [puppy, setPuppy] = useState<PuppyListing | null>(null);
  const [store, setStore] = useState<StoreType | null>(null);
  const [breedInfo, setBreedInfo] = useState<Breed | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getPublicPuppyListingById(id).then(async (data) => {
      setPuppy(data);
      if (data?.storeId) {
        const s = await getStoreById(data.storeId);
        setStore(s);
      }
      if (data?.breed) {
        const matched =
          staticBreeds.find(
            (b) => b.name.toLowerCase() === data.breed.toLowerCase(),
          ) ?? null;
        setBreedInfo(matched);
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

  if (!puppy) {
    return (
      <Container className="py-16">
        <div className="flex flex-col items-center text-center py-16">
          <Dog className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">Puppy not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This listing may have been removed or is no longer available.
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
            {puppy.images[activeImg] ? (
              <Image
                src={puppy.images[activeImg].url}
                alt={puppy.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Dog className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>
          {puppy.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {puppy.images.map((img, i) => (
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
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge>{puppy.breed}</Badge>
              <Badge variant="outline">
                {puppy.gender === "male" ? "♂ Male" : "♀ Female"}
              </Badge>
              <Badge variant="outline">{puppy.ageInWeeks} weeks old</Badge>
            </div>
            <h1 className="text-3xl font-bold">{puppy.title}</h1>
            <PriceDisplay price={puppy.price} className="mt-2" />
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {puppy.description}
          </p>

          {/* Health info */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold">Health & Records</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: "Vaccinated", value: puppy.vaccinated },
                { label: "Dewormed", value: puppy.dewormed },
                { label: "Microchipped", value: puppy.microchipped },
                { label: "Pedigree Available", value: puppy.pedigreeAvailable },
                {
                  label: "Health Certificate",
                  value: puppy.healthCertificateAvailable,
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${value ? "text-green-500" : "text-muted-foreground/30"}`}
                  />
                  <span className={value ? "" : "text-muted-foreground"}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Location */}
          <Card className="p-4 space-y-2">
            <h3 className="font-semibold">Location</h3>
            <p className="text-sm text-muted-foreground">{puppy.location}</p>
          </Card>

          {/* Store info */}
          {store && (
            <VendorDetailsCard
              store={store}
              pickupAvailable={puppy.pickupAvailable}
              deliveryAvailable={puppy.deliveryAvailable}
            />
          )}

          {puppy.disclaimer && (
            <p className="text-xs text-muted-foreground italic">
              {puppy.disclaimer}
            </p>
          )}
        </div>
      </div>

      {/* Breed info section */}
      {breedInfo && (
        <div className="mt-10 space-y-6 border-t pt-10">
          <h2 className="text-2xl font-bold">About the {breedInfo.name}</h2>

          {/* Quick stats */}
          <Card className="p-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="mt-0.5 font-semibold">{breedInfo.sizeCategory}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Weight</p>
                <p className="mt-0.5 font-semibold">
                  {formatWeightKg(breedInfo.weightMin)} –{" "}
                  {formatWeightKg(breedInfo.weightMax)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Lifespan</p>
                <p className="mt-0.5 font-semibold">
                  {breedInfo.lifespanMin}–{breedInfo.lifespanMax} yrs
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Breed Group</p>
                <p className="mt-0.5 font-semibold">{breedInfo.breedGroup}</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {breedInfo.description}
          </p>

          {/* Traits + extras */}
          <div className="grid gap-8 md:grid-cols-2">
            <BreedTraits breed={breedInfo} />
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Health Considerations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {breedInfo.healthConsiderations}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ideal Owner</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {breedInfo.idealOwnerProfile}
                </p>
              </div>
              {breedInfo.adoptionNotes && (
                <div>
                  <h3 className="font-semibold mb-2">Adoption Notes</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {breedInfo.adoptionNotes}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button asChild variant="outline" size="sm">
              <a href={`/breeds/${breedInfo.slug}`}>
                View Full {breedInfo.name} Profile →
              </a>
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
