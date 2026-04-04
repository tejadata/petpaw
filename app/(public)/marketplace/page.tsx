import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import MarketplaceClient from "./marketplace-client";

/**
 * Server component — metadata is embedded in the static HTML at build time.
 * The actual listings are loaded client-side via Firestore SDK.
 */
export const metadata = createMetadata({
  title: "Marketplace — Puppies & Pet Products for Sale in India",
  description:
    "Browse puppies for sale and pet products from verified vendors across India. Find Labrador, Golden Retriever, Poodle puppies and more. Shop dog food, accessories, and grooming products.",
  path: "/marketplace",
  keywords: [
    "puppies for sale India",
    "buy puppy online India",
    "pet products India",
    "dog accessories India",
    "Labrador puppy sale India",
    "verified dog breeders India",
  ],
});

function MarketplaceSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-80 rounded-xl" />
      ))}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        title="Marketplace"
        description="Browse puppies and pet products from verified vendors on PawMatch."
      />
      <Suspense fallback={<MarketplaceSkeleton />}>
        <MarketplaceClient />
      </Suspense>
    </Container>
  );
}
