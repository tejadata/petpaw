import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ListingStatusBadge } from "@/components/vendor/listing-status-badge";
import { Dog, MapPin } from "lucide-react";
import { formatCurrencyInr } from "@/lib/utils";
import type { PuppyListing } from "@/types/vendor-puppy";

interface PuppyListingCardProps {
  puppy: PuppyListing;
}

export function PuppyListingCard({ puppy }: PuppyListingCardProps) {
  return (
    <Link href={`/vendor/dashboard/puppies/detail?id=${puppy.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] bg-muted">
          {puppy.images[0] ? (
            <Image
              src={puppy.images[0].url}
              alt={puppy.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Dog className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute right-2 top-2">
            <ListingStatusBadge status={puppy.isPublished ? "published" : "draft"} />
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold truncate text-sm sm:text-base">{puppy.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{puppy.breed} · {puppy.gender}</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-base sm:text-lg font-bold text-primary">
              {formatCurrencyInr(puppy.price)}
            </span>
            <ListingStatusBadge status={puppy.saleStatus} />
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{puppy.location}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
