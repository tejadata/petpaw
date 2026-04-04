"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeProfileSchema, type StoreProfileInput } from "@/lib/validations/vendor-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { STORE_TYPE_LABELS } from "@/types/vendor";
import type { StoreType } from "@/types/vendor";

const STORE_TYPES = Object.entries(STORE_TYPE_LABELS) as [StoreType, string][];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface StoreProfileFormProps {
  defaultValues?: Partial<StoreProfileInput>;
  onSubmit: (data: StoreProfileInput) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  error?: string;
}

export function StoreProfileForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Store",
  loading = false,
  error,
}: StoreProfileFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StoreProfileInput>({
    resolver: zodResolver(storeProfileSchema) as any,
    defaultValues: {
      isActive: true,
      storeHours: DAYS.map((day) => ({ day, open: "09:00", close: "18:00", closed: false })),
      serviceableAreas: [],
      ...defaultValues,
    },
  });

  const storeHours = watch("storeHours");
  const isActive = watch("isActive");

  function generateSlug() {
    const name = watch("storeName");
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("storeSlug", slug);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Store Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name *</Label>
            <Input
              id="storeName"
              placeholder="Happy Paws Pet Shop"
              {...register("storeName")}
              onBlur={generateSlug}
            />
            {errors.storeName && <p className="text-xs text-red-600">{errors.storeName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeSlug">URL Slug *</Label>
            <Input id="storeSlug" placeholder="happy-paws-pet-shop" {...register("storeSlug")} />
            {errors.storeSlug && <p className="text-xs text-red-600">{errors.storeSlug.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name *</Label>
            <Input id="ownerName" placeholder="John Doe" {...register("ownerName")} />
            {errors.ownerName && <p className="text-xs text-red-600">{errors.ownerName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeType">Store Type *</Label>
            <select
              id="storeType"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              {...register("storeType")}
            >
              <option value="">Select…</option>
              {STORE_TYPES.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            {errors.storeType && <p className="text-xs text-red-600">{errors.storeType.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="store@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" type="tel" placeholder="+1 555-123-4567" {...register("phone")} />
            {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">About Your Store *</Label>
          <Textarea id="description" rows={4} placeholder="Tell customers about your store…" {...register("description")} />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Location
        </h3>
        <div className="space-y-2">
          <Label htmlFor="address">Street Address *</Label>
          <Input id="address" placeholder="123 Main Street" {...register("address")} />
          {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" placeholder="San Francisco" {...register("city")} />
            {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input id="state" placeholder="California" {...register("state")} />
            {errors.state && <p className="text-xs text-red-600">{errors.state.message}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input id="postalCode" placeholder="94105" {...register("postalCode")} />
            {errors.postalCode && <p className="text-xs text-red-600">{errors.postalCode.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input id="country" placeholder="United States" {...register("country")} />
            {errors.country && <p className="text-xs text-red-600">{errors.country.message}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input id="latitude" type="number" step="any" placeholder="37.7749" {...register("latitude")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input id="longitude" type="number" step="any" placeholder="-122.4194" {...register("longitude")} />
          </div>
        </div>
      </div>

      {/* Store Hours */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Store Hours
        </h3>
        <div className="space-y-3">
          {storeHours?.map((h, idx) => (
            <div key={h.day} className="grid grid-cols-[120px_1fr_1fr_auto] items-center gap-2 text-sm">
              <span className="font-medium">{h.day}</span>
              <Input
                type="time"
                disabled={h.closed}
                className="h-8"
                {...register(`storeHours.${idx}.open`)}
              />
              <Input
                type="time"
                disabled={h.closed}
                className="h-8"
                {...register(`storeHours.${idx}.close`)}
              />
              <div className="flex items-center gap-1.5">
                <Checkbox
                  checked={h.closed}
                  onCheckedChange={(v) => setValue(`storeHours.${idx}.closed`, !!v)}
                />
                <label className="text-xs text-muted-foreground">Closed</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Optional
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input id="licenseNumber" placeholder="LIC-12345" {...register("licenseNumber")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxId">GST / Tax ID</Label>
            <Input id="taxId" placeholder="GST1234567" {...register("taxId")} />
          </div>
        </div>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="isActive"
          checked={isActive}
          onCheckedChange={(v) => setValue("isActive", !!v)}
        />
        <Label htmlFor="isActive" className="cursor-pointer font-normal">
          Store is active and visible
        </Label>
      </div>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
