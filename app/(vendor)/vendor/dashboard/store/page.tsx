"use client";

import { useState, useEffect } from "react";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getStoreByVendor, createStore, updateStore } from "@/lib/data/vendor/stores";
import { uploadStoreLogo, uploadStoreBanner } from "@/lib/data/vendor/vendor-storage";
import { StoreProfileForm } from "@/components/vendor/store-profile-form";
import { MultiImageUpload } from "@/components/vendor/multi-image-upload";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApprovalStatusBadge } from "@/components/vendor/approval-status-badge";
import type { Store } from "@/types/vendor";
import type { StoreProfileInput } from "@/lib/validations/vendor-store";

export default function StoreProfilePage() {
  const { user, vendor } = useVendorAuthGuard();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Logo/Banner state
  const [logoImages, setLogoImages] = useState<{ url: string; path: string }[]>([]);
  const [bannerImages, setBannerImages] = useState<{ url: string; path: string }[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  useEffect(() => {
    if (!user) return;
    getStoreByVendor(user.uid).then((s) => {
      setStore(s);
      if (s?.logoUrl) setLogoImages([{ url: s.logoUrl, path: "" }]);
      if (s?.bannerUrl) setBannerImages([{ url: s.bannerUrl, path: "" }]);
      setLoading(false);
    });
  }, [user]);

  async function handleLogoAdd(files: File[]) {
    if (!user || !files[0]) return;
    setUploadingLogo(true);
    try {
      const result = await uploadStoreLogo(user.uid, files[0]);
      setLogoImages([{ url: result.url, path: result.path }]);
      if (store) {
        await updateStore(store.id, user.uid, { logoUrl: result.url });
      }
    } catch {
      setError("Failed to upload logo.");
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handleBannerAdd(files: File[]) {
    if (!user || !files[0]) return;
    setUploadingBanner(true);
    try {
      const result = await uploadStoreBanner(user.uid, files[0]);
      setBannerImages([{ url: result.url, path: result.path }]);
      if (store) {
        await updateStore(store.id, user.uid, { bannerUrl: result.url });
      }
    } catch {
      setError("Failed to upload banner.");
    } finally {
      setUploadingBanner(false);
    }
  }

  async function handleSubmit(data: StoreProfileInput) {
    if (!user || !vendor) return;
    setError("");
    setSaving(true);
    try {
      if (store) {
        const updated = await updateStore(store.id, user.uid, data);
        setStore(updated);
      } else {
        const created = await createStore(user.uid, {
          ...data,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          licenseNumber: data.licenseNumber ?? null,
          taxId: data.taxId ?? null,
        });
        setStore(created);
      }
    } catch {
      setError("Failed to save store profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  const defaultValues: Partial<StoreProfileInput> = store
    ? {
        storeName: store.storeName,
        storeSlug: store.storeSlug,
        ownerName: store.ownerName,
        email: store.email,
        phone: store.phone,
        storeType: store.storeType,
        description: store.description,
        address: store.address,
        city: store.city,
        state: store.state,
        postalCode: store.postalCode,
        country: store.country,
        latitude: store.latitude,
        longitude: store.longitude,
        licenseNumber: store.licenseNumber,
        taxId: store.taxId,
        storeHours: store.storeHours,
        serviceableAreas: store.serviceableAreas,
        isActive: store.isActive,
      }
    : {
        email: vendor?.email ?? "",
        ownerName: vendor?.ownerName ?? "",
        storeType: vendor?.storeType,
      };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{store ? "Edit Store Profile" : "Set Up Your Store"}</h1>
          <p className="text-sm text-muted-foreground">
            {store ? "Update your store details and settings." : "Create your store to start adding listings."}
          </p>
        </div>
        {store && <ApprovalStatusBadge status={store.approvalStatus} />}
      </div>

      {/* Logo & Banner uploads */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold">Store Logo</h3>
          </CardHeader>
          <CardContent>
            <MultiImageUpload
              images={logoImages}
              onAdd={handleLogoAdd}
              onRemove={() => setLogoImages([])}
              uploading={uploadingLogo}
              maxImages={1}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold">Store Banner</h3>
          </CardHeader>
          <CardContent>
            <MultiImageUpload
              images={bannerImages}
              onAdd={handleBannerAdd}
              onRemove={() => setBannerImages([])}
              uploading={uploadingBanner}
              maxImages={1}
            />
          </CardContent>
        </Card>
      </div>

      {/* Store form */}
      <Card className="p-6">
        <StoreProfileForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitLabel={store ? "Update Store" : "Create Store"}
          loading={saving}
          error={error}
        />
      </Card>
    </div>
  );
}
