"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getPetsByUser } from "@/lib/data/pets";
import type { Pet } from "@/types/pet";

export default function DogsPage() {
  const { user, loading: authLoading } = useAuth();
  const [dogs, setDogs] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    getPetsByUser(user.uid).then((pets) => {
      setDogs(pets);
      setLoading(false);
    });
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Dogs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your dog profiles and track their information.
          </p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/dashboard/dogs/new">
            <Plus className="h-4 w-4" />
            Add Dog
          </Link>
        </Button>
      </div>

      {dogs.length === 0 ? (
        <EmptyState
          title="No dog profiles yet"
          description="Add your first dog profile to track their health, vaccinations, and more."
          className="mt-8"
        />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dogs.map((dog) => (
            <Card key={dog.id}>
              <CardContent className="p-6 space-y-1">
                <h2 className="text-xl font-semibold">{dog.name}</h2>
                {dog.breed && <p className="text-sm text-muted-foreground">{dog.breed}</p>}
                <div className="flex gap-4 text-sm text-muted-foreground pt-1">
                  {dog.age != null && <span>{dog.age} yr{dog.age !== 1 ? "s" : ""}</span>}
                  {dog.gender && <span>{dog.gender}</span>}
                  {dog.weight != null && <span>{dog.weight} kg</span>}
                </div>
                {dog.activityLevel && (
                  <p className="text-xs text-muted-foreground">Activity: {dog.activityLevel}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
