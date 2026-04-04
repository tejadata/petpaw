"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorProductSchema, type VendorProductInput } from "@/lib/validations/vendor-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { VENDOR_PRODUCT_CATEGORY_LABELS } from "@/types/vendor-product";
import type { VendorProductCategory } from "@/types/vendor-product";

const CATEGORIES = Object.entries(VENDOR_PRODUCT_CATEGORY_LABELS) as [VendorProductCategory, string][];

interface ProductListingFormProps {
  defaultValues?: Partial<VendorProductInput>;
  onSubmit: (data: VendorProductInput) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  error?: string;
  canPublish?: boolean;
}

export function ProductListingForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Product",
  loading = false,
  error,
  canPublish = true,
}: ProductListingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VendorProductInput>({
    resolver: zodResolver(vendorProductSchema) as any,
    defaultValues: {
      stockQuantity: 0,
      featured: false,
      isPublished: false,
      breedSuitability: [],
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

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Product Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title *</Label>
            <Input
              id="title"
              placeholder="Premium Puppy Dry Food — Chicken & Rice"
              {...register("title")}
              onBlur={generateSlug}
            />
            {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input id="slug" placeholder="premium-puppy-dry-food" {...register("slug")} />
            {errors.slug && <p className="text-xs text-red-600">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              {...register("category")}
            >
              <option value="">Select category…</option>
              {CATEGORIES.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-600">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" placeholder="Royal Canin, Pedigree, etc." {...register("brand")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description *</Label>
          <Textarea id="shortDescription" rows={2} placeholder="Brief summary for product cards…" {...register("shortDescription")} />
          {errors.shortDescription && <p className="text-xs text-red-600">{errors.shortDescription.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Full Description *</Label>
          <Textarea id="description" rows={5} placeholder="Detailed product description…" {...register("description")} />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Pricing & Inventory
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹) *</Label>
            <Input id="price" type="number" min={0} step="1" placeholder="299" {...register("price")} />
            {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salePrice">Sale Price (₹)</Label>
            <Input id="salePrice" type="number" min={0} step="1" placeholder="249" {...register("salePrice")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockQuantity">Stock Quantity *</Label>
            <Input id="stockQuantity" type="number" min={0} placeholder="100" {...register("stockQuantity")} />
            {errors.stockQuantity && <p className="text-xs text-red-600">{errors.stockQuantity.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" placeholder="PF-001" {...register("sku")} />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Additional Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight / Package Size</Label>
            <Input id="weight" placeholder="e.g. 3 kg, 500 g" {...register("weight")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ageSuitability">Age Suitability</Label>
            <Input id="ageSuitability" placeholder="Puppy, Adult, Senior, All" {...register("ageSuitability")} />
          </div>
        </div>
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
          Publish product
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
