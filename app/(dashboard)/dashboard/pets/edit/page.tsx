"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PetForm } from "@/components/dashboard/pets/pet-form";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuth } from "@/lib/auth-context";
import { getPetById, updatePet } from "@/lib/data/pets";
import { uploadFile, deleteFile, petProfileImagePath } from "@/lib/storage";
import type { Pet } from "@/types/pet";
import type { PetInput } from "@/lib/validations/pet";

export default function EditPetPage() {
  const searchParams = useSearchParams();
  const petId = searchParams.get("id");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !user || !petId) return;
    getPetById(petId, user.uid).then((data) => {
      setPet(data);
      setLoading(false);
    });
  }, [user, authLoading, petId]);

  async function handleSubmit(data: PetInput, profileImage: File | null) {
    if (!user || !pet) return;
    setSaving(true);
    setError("");
    try {
      let profileImageUrl = pet.profileImageUrl;
      let profileImagePathVal = pet.profileImagePath;

      if (profileImage) {
        if (profileImagePathVal) await deleteFile(profileImagePathVal).catch(() => {});
        const ext = profileImage.name.split(".").pop() ?? "jpg";
        profileImagePathVal = petProfileImagePath(user.uid, pet.id, ext);
        const result = await uploadFile(profileImagePathVal, profileImage);
        profileImageUrl = result.url;
      }

      await updatePet(pet.id, user.uid, {
        name: data.name,
        species: data.species ?? "Dog",
        breed: data.breed ?? null,
        dateOfBirth: data.dateOfBirth ?? null,
        age: data.age ?? null,
        gender: data.gender ?? null,
        weight: data.weight ?? null,
        color: data.color ?? null,
        profileImageUrl,
        profileImagePath: profileImagePathVal,
        isNeuteredOrSpayed: data.isNeuteredOrSpayed ?? false,
        allergies: data.allergies ?? null,
        medicalConditions: data.medicalConditions ?? null,
        medications: data.medications ?? null,
        feedingNotes: data.feedingNotes ?? null,
        activityLevel: data.activityLevel ?? null,
        emergencyContact: data.emergencyContact ?? null,
      });

      router.push(`/dashboard/pets/view?id=${pet.id}`);
    } catch (err: unknown) {
      setError((err as Error).message ?? "Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!pet) {
    return <EmptyState title="Pet not found" description="This pet does not exist." className="mt-16" />;
  }

  return (
    <div>
      <Link
        href={`/dashboard/pets/view?id=${pet.id}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {pet.name}
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Edit {pet.name}</h1>

      <Card className="mt-8 max-w-2xl">
        <CardContent className="p-6">
          <PetForm
            defaultValues={{
              name: pet.name,
              species: pet.species,
              breed: pet.breed ?? undefined,
              age: pet.age ?? undefined,
              weight: pet.weight ?? undefined,
              gender: pet.gender ?? undefined,
              color: pet.color ?? undefined,
              isNeuteredOrSpayed: pet.isNeuteredOrSpayed,
              allergies: pet.allergies ?? undefined,
              medicalConditions: pet.medicalConditions ?? undefined,
              medications: pet.medications ?? undefined,
              feedingNotes: pet.feedingNotes ?? undefined,
              activityLevel: pet.activityLevel ?? undefined,
              emergencyContact: pet.emergencyContact ?? undefined,
            }}
            onSubmit={handleSubmit}
            loading={saving}
            error={error}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
