"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { createDogProfile } from "@/lib/data/dogs";

export default function NewDogPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) { setError("You must be signed in."); return; }
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const ageVal = (form.elements.namedItem("age") as HTMLInputElement).value;
    const weightVal = (form.elements.namedItem("weight") as HTMLInputElement).value;

    try {
      await createDogProfile(user.uid, {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        breedId: null,
        breedName: null,
        age: ageVal ? Number(ageVal) : null,
        weight: weightVal ? Number(weightVal) : null,
        sex: ((form.elements.namedItem("sex") as HTMLSelectElement).value || null) as "Male" | "Female" | null,
        neuteredSpayed: false,
        activityLevel: (form.elements.namedItem("activityLevel") as HTMLSelectElement).value || null,
        foodNotes: (form.elements.namedItem("foodNotes") as HTMLTextAreaElement).value || null,
        healthNotes: (form.elements.namedItem("healthNotes") as HTMLTextAreaElement).value || null,
        imageUrl: null,
      });
      router.push("/dashboard/dogs");
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message ?? "unknown";
      setError(`Something went wrong: ${msg}`);
      setLoading(false);
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/dogs"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Dogs
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Add a Dog Profile</h1>
      <p className="mt-1 text-muted-foreground">
        Enter your dog&apos;s information to create a profile.
      </p>

      <Card className="mt-8 max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Dog Name *</Label>
              <Input id="name" name="name" required placeholder="Buddy" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input id="age" name="age" type="number" min={0} max={30} placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" name="weight" type="number" min={0} max={200} placeholder="25" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <select
                  id="sex"
                  name="sex"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodNotes">Food & Diet Notes</Label>
              <Textarea
                id="foodNotes"
                name="foodNotes"
                rows={3}
                placeholder="Current food brand, allergies, feeding schedule..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthNotes">Health Notes</Label>
              <Textarea
                id="healthNotes"
                name="healthNotes"
                rows={3}
                placeholder="Any known conditions, medications, vet visit notes..."
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
