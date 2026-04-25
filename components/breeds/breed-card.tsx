import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint } from "lucide-react";
import type { Breed } from "@/types/breed";
import { traitLabel } from "@/lib/utils";

interface BreedCardProps {
  breed: Breed;
}

export function BreedCard({ breed }: BreedCardProps) {
  const hasImage = breed.imageUrl && !breed.imageUrl.includes("placeholder");

  return (
    <Link href={`/breeds/${breed.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group h-full">
        <div className="aspect-[4/3] relative bg-gradient-to-br from-primary/10 to-secondary/30">
          {hasImage ? (
            <Image
              src={breed.imageUrl}
              alt={breed.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <PawPrint className="h-16 w-16 text-primary/30 group-hover:text-primary/50 transition-colors" />
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {breed.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {breed.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary">{breed.sizeCategory}</Badge>
            <Badge variant="outline">{traitLabel(breed.exerciseNeeds)} Energy</Badge>
          </div>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 text-xs text-muted-foreground">
          <span>Lifespan: {breed.lifespanMin}–{breed.lifespanMax} years</span>
          <span className="ml-auto">~₹{(breed.estimatedMonthlyCost * 83).toLocaleString("en-IN")}/mo</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
