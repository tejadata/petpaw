"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { PetCard } from "@/components/dashboard/pets/pet-card";
import { useAuth } from "@/lib/auth-context";
import { getPetsByUser, deletePet } from "@/lib/data/pets";
import { deleteFile } from "@/lib/storage";
import type { Pet } from "@/types/pet";

export default function PetsPage() {
  const { user, loading: authLoading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    getPetsByUser(user.uid).then((data) => {
      setPets(data);
      setLoading(false);
    });
  }, [user, authLoading]);

  async function handleDelete(petId: string) {
    if (!user) return;
    const pet = pets.find((p) => p.id === petId);
    // Delete profile image from storage if present
    if (pet?.profileImagePath) {
      await deleteFile(pet.profileImagePath).catch(() => {});
    }
    await deletePet(petId, user.uid);
    setPets((prev) => prev.filter((p) => p.id !== petId));
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Pets</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your pet profiles.
          </p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/dashboard/pets/new">
            <Plus className="h-4 w-4" />
            Add Pet
          </Link>
        </Button>
      </div>

      {pets.length === 0 ? (
        <EmptyState
          title="No pets yet"
          description="Add your first pet to track their health, reminders, and medical reports."
          className="mt-8"
        />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
