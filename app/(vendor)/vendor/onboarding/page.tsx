"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vendorOnboardingSchema,
  type VendorOnboardingInput,
} from "@/lib/validations/vendor";
import { createVendorProfile } from "@/lib/data/vendor/vendors";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STORE_TYPE_LABELS } from "@/types/vendor";
import type { StoreType } from "@/types/vendor";

const STORE_TYPES = Object.entries(STORE_TYPE_LABELS) as [StoreType, string][];

export default function VendorOnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorOnboardingInput>({
    resolver: zodResolver(vendorOnboardingSchema) as any,
    defaultValues: {
      email: user?.email ?? "",
      ownerName: user?.displayName ?? "",
    },
  });

  if (authLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    router.replace("/vendor/login");
    return null;
  }

  async function onSubmit(data: VendorOnboardingInput) {
    if (!user) return;
    setError("");
    setSubmitting(true);

    try {
      await createVendorProfile(user.uid, {
        businessName: data.businessName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        storeType: data.storeType,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        licenseNumber: data.licenseNumber ?? null,
        taxId: data.taxId ?? null,
      });
      router.push("/vendor/dashboard");
    } catch (err) {
      console.error("Vendor profile creation failed:", err);
      setError("Failed to create vendor profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">Complete Your Vendor Profile</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about your business. Your account will be reviewed by our team
          before you can publish listings.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Business Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Business Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business / Store Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Happy Paws Pet Shop"
                  {...register("businessName")}
                />
                {errors.businessName && (
                  <p className="text-xs text-red-600">
                    {errors.businessName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Full Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="John Doe"
                  {...register("ownerName")}
                />
                {errors.ownerName && (
                  <p className="text-xs text-red-600">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 555-123-4567"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeType">Store Type *</Label>
              <select
                id="storeType"
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                {...register("storeType")}
              >
                <option value="">Select store type…</option>
                {STORE_TYPES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.storeType && (
                <p className="text-xs text-red-600">
                  {errors.storeType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description *</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Tell us about your business, what you sell, and your experience…"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Address
            </h3>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-xs text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="San Francisco"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-xs text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="California"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-xs text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  placeholder="94105"
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-600">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  {...register("country")}
                />
                {errors.country && (
                  <p className="text-xs text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Optional */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Optional Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="LIC-12345"
                  {...register("licenseNumber")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">GST / Tax ID</Label>
                <Input
                  id="taxId"
                  placeholder="GST1234567"
                  {...register("taxId")}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your application will be reviewed by our team. You&apos;ll be
            notified once approved.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
