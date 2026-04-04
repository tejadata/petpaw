"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { puppyListingSchema, type PuppyListingInput } from "@/lib/validations/vendor-puppy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { EthicalBreedingNotice } from "@/components/vendor/ethical-breeding-notice";
import { breeds as breedsDataset } from "@/lib/datasets/breeds";

const BREED_OPTIONS = [...breedsDataset]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((b) => b.name);

const SALE_STATUSES = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
  { value: "inactive", label: "Inactive" },
] as const;

interface PuppyListingFormProps {
  defaultValues?: Partial<PuppyListingInput>;
  onSubmit: (data: PuppyListingInput) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  error?: string;
  canPublish?: boolean;
}

export function PuppyListingForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Listing",
  loading = false,
  error,
  canPublish = true,
}: PuppyListingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PuppyListingInput>({
    resolver: zodResolver(puppyListingSchema) as any,
    defaultValues: {
      saleStatus: "available",
      vaccinated: false,
      dewormed: false,
      pickupAvailable: true,
      deliveryAvailable: false,
      featured: false,
      isPublished: false,
      ...defaultValues,
    },
  });

  function generateSlug() {
    const title = watch("title");
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("slug", slug);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <EthicalBreedingNotice />

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Puppy Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Listing Title *</Label>
            <Input
              id="title"
              placeholder="Golden Retriever Puppy — Male, 10 Weeks"
              {...register("title")}
              onBlur={generateSlug}
            />
            {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input id="slug" placeholder="golden-retriever-male-10-weeks" {...register("slug")} />
            {errors.slug && <p className="text-xs text-red-600">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="breed">Breed *</Label>
            <select
              id="breed"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              {...register("breed")}
            >
              <option value="">Select breed…</option>
              {BREED_OPTIONS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
              <option value="Other / Mixed Breed">Other / Mixed Breed</option>
            </select>
            {errors.breed && <p className="text-xs text-red-600">{errors.breed.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <select id="gender" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" {...register("gender")}>
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-xs text-red-600">{errors.gender.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color *</Label>
            <Input id="color" placeholder="Golden" {...register("color")} />
            {errors.color && <p className="text-xs text-red-600">{errors.color.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="ageInWeeks">Age in Weeks *</Label>
            <Input id="ageInWeeks" type="number" min={1} placeholder="10" {...register("ageInWeeks")} />
            {errors.ageInWeeks && <p className="text-xs text-red-600">{errors.ageInWeeks.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹) *</Label>
            <Input id="price" type="number" min={0} step="1" placeholder="15000" {...register("price")} />
            {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleStatus">Sale Status</Label>
            <select id="saleStatus" className="w-full rounded-md border bg-transparent px-3 py-2 text-sm" {...register("saleStatus")}>
              {SALE_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description *</Label>
          <Textarea id="shortDescription" rows={2} placeholder="Brief summary for listing cards…" {...register("shortDescription")} />
          {errors.shortDescription && <p className="text-xs text-red-600">{errors.shortDescription.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Full Description *</Label>
          <Textarea id="description" rows={5} placeholder="Detailed description of the puppy…" {...register("description")} />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </div>
      </div>

      {/* Health & Safety */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Health & Safety
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {([
            ["vaccinated", "Vaccinated"],
            ["dewormed", "Dewormed"],
            ["microchipped", "Microchipped"],
            ["pedigreeAvailable", "Pedigree Available"],
            ["healthCertificateAvailable", "Health Certificate"],
          ] as const).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={!!watch(key)}
                onCheckedChange={(v) => setValue(key, !!v)}
              />
              <Label htmlFor={key} className="cursor-pointer font-normal">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Delivery */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Location & Delivery
        </h3>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input id="location" placeholder="Bengaluru, Karnataka" {...register("location")} />
          {errors.location && <p className="text-xs text-red-600">{errors.location.message}</p>}
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="pickupAvailable"
              checked={watch("pickupAvailable")}
              onCheckedChange={(v) => setValue("pickupAvailable", !!v)}
            />
            <Label htmlFor="pickupAvailable" className="cursor-pointer font-normal">
              Pickup Available
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="deliveryAvailable"
              checked={watch("deliveryAvailable")}
              onCheckedChange={(v) => setValue("deliveryAvailable", !!v)}
            />
            <Label htmlFor="deliveryAvailable" className="cursor-pointer font-normal">
              Delivery Available
            </Label>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="space-y-2">
        <Label htmlFor="disclaimer">Disclaimer (optional)</Label>
        <Textarea id="disclaimer" rows={2} placeholder="Any additional disclaimers…" {...register("disclaimer")} />
      </div>

      {/* Publish */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="isPublished"
          checked={watch("isPublished")}
          onCheckedChange={(v) => setValue("isPublished", !!v)}
          disabled={!canPublish}
        />
        <Label htmlFor="isPublished" className="cursor-pointer font-normal">
          Publish listing
          {!canPublish && (
            <span className="ml-1 text-xs text-muted-foreground">
              (requires approved vendor status)
            </span>
          )}
        </Label>
      </div>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
