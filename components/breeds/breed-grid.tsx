import type { Breed } from "@/types/breed";
import { BreedCard } from "./breed-card";

interface BreedGridProps {
  breeds: Breed[];
}

export function BreedGrid({ breeds }: BreedGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </div>
  );
}
