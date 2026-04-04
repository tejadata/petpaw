"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { Pencil, Dog } from "lucide-react";
import type { Pet } from "@/types/pet";

interface PetCardProps {
  pet: Pet;
  onDelete: (petId: string) => void;
}

export function PetCard({ pet, onDelete }: PetCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        {/* Image / Placeholder */}
        <div className="relative flex h-32 items-center justify-center bg-primary/5">
          {pet.profileImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pet.profileImageUrl}
              alt={pet.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Dog className="h-12 w-12 text-primary/30" />
          )}
          {/* Actions overlay */}
          <div className="absolute right-2 top-2 flex gap-1">
            <Button size="icon" variant="secondary" className="h-7 w-7" asChild>
              <Link href={`/dashboard/pets/edit?id=${pet.id}`} aria-label="Edit pet">
                <Pencil className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <ConfirmDeleteDialog
              title={`Delete ${pet.name}?`}
              description="This will permanently delete the pet profile. Reminders and reports linked to this pet will remain but lose the pet link."
              onConfirm={() => onDelete(pet.id)}
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <Link
              href={`/dashboard/pets/view?id=${pet.id}`}
              className="font-semibold hover:underline line-clamp-1"
            >
              {pet.name}
            </Link>
            {pet.species !== "Dog" && (
              <Badge variant="secondary" className="text-xs shrink-0">
                {pet.species}
              </Badge>
            )}
          </div>
          {pet.breed && (
            <p className="text-sm text-muted-foreground line-clamp-1">{pet.breed}</p>
          )}
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
            {pet.age != null && <span>{pet.age} yr{pet.age !== 1 ? "s" : ""}</span>}
            {pet.gender && <span>{pet.gender}</span>}
            {pet.weight != null && <span>{pet.weight} lbs</span>}
            {pet.activityLevel && <span>{pet.activityLevel} activity</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
