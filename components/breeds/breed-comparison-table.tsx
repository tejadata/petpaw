import type { Breed } from "@/types/breed";
import { traitLabel, suitabilityLabel } from "@/lib/utils";

interface BreedComparisonTableProps {
  breeds: Breed[];
}

const comparisonRows = [
  { label: "Size", key: "sizeCategory" as const },
  { label: "Exercise Needs", key: "exerciseNeeds" as const, isTrait: true },
  { label: "Trainability", key: "trainability" as const, isTrait: true },
  { label: "Grooming Needs", key: "groomingNeeds" as const, isTrait: true },
  { label: "Shedding Level", key: "sheddingLevel" as const, isTrait: true },
  { label: "Barking Tendency", key: "barkingTendency" as const, isTrait: true },
  { label: "Family Friendliness", key: "familyFriendliness" as const, isTrait: true },
  { label: "Apartment Suitability", key: "apartmentSuitability" as const, isTrait: true },
  { label: "First-Time Owner", key: "firstTimeOwnerSuitability" as const, isTrait: true },
  { label: "Lifespan", key: "lifespan" as const },
  { label: "Monthly Cost", key: "estimatedMonthlyCost" as const },
] as const;

export function BreedComparisonTable({ breeds }: BreedComparisonTableProps) {
  if (breeds.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Trait</th>
            {breeds.map((breed) => (
              <th key={breed.id} className="py-3 px-4 text-left font-semibold">
                {breed.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <td className="py-3 px-4 font-medium text-muted-foreground">{row.label}</td>
              {breeds.map((breed) => (
                <td key={breed.id} className="py-3 px-4">
                  {row.key === "lifespan"
                    ? `${breed.lifespanMin}–${breed.lifespanMax} years`
                    : row.key === "estimatedMonthlyCost"
                      ? `$${breed.estimatedMonthlyCost}/month`
                      : row.key === "sizeCategory"
                        ? breed.sizeCategory
                        : "isTrait" in row && row.isTrait
                          ? traitLabel(breed[row.key] as number)
                          : String(breed[row.key as keyof Breed])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
