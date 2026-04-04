import type { Breed } from "@/types/breed";
import { Badge } from "@/components/ui/badge";
import { traitLabel, suitabilityLabel } from "@/lib/utils";

interface BreedTraitsProps {
  breed: Breed;
}

function TraitRow({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{traitLabel(value)}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function BreedTraits({ breed }: BreedTraitsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Breed Characteristics</h3>
        <div className="space-y-3">
          <TraitRow label="Exercise Needs" value={breed.exerciseNeeds} />
          <TraitRow label="Trainability" value={breed.trainability} />
          <TraitRow label="Grooming Needs" value={breed.groomingNeeds} />
          <TraitRow label="Shedding Level" value={breed.sheddingLevel} />
          <TraitRow label="Barking Tendency" value={breed.barkingTendency} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Suitability</h3>
        <div className="space-y-3">
          <TraitRow label="Family Friendliness" value={breed.familyFriendliness} />
          <TraitRow label="Apartment Suitability" value={breed.apartmentSuitability} />
          <TraitRow label="First-Time Owner" value={breed.firstTimeOwnerSuitability} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Temperament</h3>
        <div className="flex flex-wrap gap-2">
          {breed.temperament.map((t) => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Climate Suitability</h3>
        <div className="flex flex-wrap gap-2">
          {breed.climateSuitability.map((c) => (
            <Badge key={c} variant="outline">{c}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
