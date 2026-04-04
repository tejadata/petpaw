import { uploadFile, deleteFile } from "@/lib/storage";
import type { UploadResult } from "@/lib/storage";

// ── Path builders ──────────────────────────────────────────────

export function vendorProfileImagePath(vendorId: string, ext: string): string {
  return `vendors/${vendorId}/profile/avatar.${ext}`;
}

export function storeLogoPath(vendorId: string, ext: string): string {
  return `vendors/${vendorId}/store/logo.${ext}`;
}

export function storeBannerPath(vendorId: string, ext: string): string {
  return `vendors/${vendorId}/store/banner.${ext}`;
}

export function puppyImagePath(vendorId: string, listingId: string, fileName: string): string {
  return `vendors/${vendorId}/puppies/${listingId}/${fileName}`;
}

export function vendorProductImagePath(vendorId: string, productId: string, fileName: string): string {
  return `vendors/${vendorId}/products/${productId}/${fileName}`;
}

// ── Helpers ────────────────────────────────────────────────────

function getExt(file: File): string {
  return file.name.split(".").pop()?.toLowerCase() ?? "jpg";
}

// ── Upload functions ───────────────────────────────────────────

export async function uploadVendorProfileImage(
  vendorId: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const path = vendorProfileImagePath(vendorId, getExt(file));
  return uploadFile(path, file, onProgress);
}

export async function uploadStoreLogo(
  vendorId: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const path = storeLogoPath(vendorId, getExt(file));
  return uploadFile(path, file, onProgress);
}

export async function uploadStoreBanner(
  vendorId: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const path = storeBannerPath(vendorId, getExt(file));
  return uploadFile(path, file, onProgress);
}

export async function uploadListingImage(
  vendorId: string,
  listingId: string,
  file: File,
  pathBuilder: (vendorId: string, listingId: string, fileName: string) => string,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  const uniqueName = `${Date.now()}-${file.name}`;
  const path = pathBuilder(vendorId, listingId, uniqueName);
  return uploadFile(path, file, onProgress);
}

export async function uploadPuppyImages(
  vendorId: string,
  listingId: string,
  files: File[],
  onProgress?: (index: number, pct: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  for (let i = 0; i < files.length; i++) {
    const result = await uploadListingImage(
      vendorId,
      listingId,
      files[i],
      puppyImagePath,
      onProgress ? (pct) => onProgress(i, pct) : undefined
    );
    results.push(result);
  }
  return results;
}

export async function uploadProductImages(
  vendorId: string,
  productId: string,
  files: File[],
  onProgress?: (index: number, pct: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  for (let i = 0; i < files.length; i++) {
    const result = await uploadListingImage(
      vendorId,
      productId,
      files[i],
      vendorProductImagePath,
      onProgress ? (pct) => onProgress(i, pct) : undefined
    );
    results.push(result);
  }
  return results;
}

// ── Delete functions ───────────────────────────────────────────

export async function deleteListingImage(path: string): Promise<void> {
  return deleteFile(path);
}

export async function deleteAllListingImages(paths: string[]): Promise<void> {
  await Promise.all(paths.map((p) => deleteFile(p)));
}
