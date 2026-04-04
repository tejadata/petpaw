"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PetForm } from "@/components/dashboard/pets/pet-form";
import { useAuth } from "@/lib/auth-context";
import { createPet } from "@/lib/data/pets";
import { uploadFile, petProfileImagePath } from "@/lib/storage";
import type { PetInput } from "@/lib/validations/pet";

export default function NewPetPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data: PetInput, profileImage: File | null) {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      // Create pet first to get the id
      const pet = await createPet(user.uid, {
        name: data.name,
        species: data.species ?? "Dog",
        breed: data.breed ?? null,
        dateOfBirth: data.dateOfBirth ?? null,
        age: data.age ?? null,
        gender: data.gender ?? null,
        weight: data.weight ?? null,
        color: data.color ?? null,
        profileImageUrl: null,
        profileImagePath: null,
        isNeuteredOrSpayed: data.isNeuteredOrSpayed ?? false,
        allergies: data.allergies ?? null,
        medicalConditions: data.medicalConditions ?? null,
        medications: data.medications ?? null,
        feedingNotes: data.feedingNotes ?? null,
        activityLevel: data.activityLevel ?? null,
        emergencyContact: data.emergencyContact ?? null,
      });

      // Upload profile image if provided
      if (profileImage) {
        const ext = profileImage.name.split(".").pop() ?? "jpg";
        const path = petProfileImagePath(user.uid, pet.id, ext);
        const { url } = await uploadFile(path, profileImage);
        const { updatePet } = await import("@/lib/data/pets");
        await updatePet(pet.id, user.uid, { profileImageUrl: url, profileImagePath: path });
      }

      router.push("/dashboard/pets");
    } catch (err: unknown) {
      setError((err as Error).message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/pets"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Pets
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Add a Pet</h1>
      <p className="mt-1 text-muted-foreground">
        Enter your pet&apos;s information to create a profile.
      </p>

      <Card className="mt-8 max-w-2xl">
        <CardContent className="p-6">
          <PetForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitLabel="Create Pet"
          />
        </CardContent>
      </Card>
    </div>
  );
}
