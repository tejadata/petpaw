export type VendorApprovalStatus = "pending" | "approved" | "rejected" | "suspended";

export type StoreType =
  | "vet_store"
  | "pet_shop"
  | "breeder"
  | "pet_food_store"
  | "pet_accessories_store"
  | "mixed_store";

export const STORE_TYPE_LABELS: Record<StoreType, string> = {
  vet_store: "Veterinary Store",
  pet_shop: "Pet Shop",
  breeder: "Breeder",
  pet_food_store: "Pet Food Store",
  pet_accessories_store: "Pet Accessories Store",
  mixed_store: "Mixed Store",
};

export const APPROVAL_STATUS_LABELS: Record<VendorApprovalStatus, string> = {
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
};

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  storeType: StoreType;
  description: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  licenseNumber: string | null;
  taxId: string | null;
  profileImageUrl: string | null;
  approvalStatus: VendorApprovalStatus;
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface Store {
  id: string;
  vendorId: string;
  storeName: string;
  storeSlug: string;
  ownerName: string;
  email: string;
  phone: string;
  storeType: StoreType;
  description: string;
  logoUrl: string | null;
  bannerUrl: string | null;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  licenseNumber: string | null;
  taxId: string | null;
  storeHours: StoreHours[];
  serviceableAreas: string[];
  approvalStatus: VendorApprovalStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorActivityLog {
  id: string;
  vendorId: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "UNPUBLISH";
  entity: "store" | "puppy" | "product";
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export type InquiryStatus = "new" | "read" | "replied" | "closed";

export interface Inquiry {
  id: string;
  vendorId: string;
  storeId: string;
  listingId: string;
  listingType: "puppy" | "product";
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string | null;
  message: string;
  status: InquiryStatus;
  createdAt: Date;
}
