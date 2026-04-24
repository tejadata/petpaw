export type PuppySaleStatus = "available" | "reserved" | "sold" | "inactive";

export const SALE_STATUS_LABELS: Record<PuppySaleStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
  inactive: "Inactive",
};

export interface ListingImage {
  url: string;
  path: string;
}

export interface PuppyListing {
  id: string;
  vendorId: string;
  storeId: string;
  title: string;
  slug: string;
  breed: string;
  gender: "male" | "female";
  ageInWeeks: number;
  color: string;
  price: number;
  saleStatus: PuppySaleStatus;
  description: string;
  shortDescription: string;
  images: ListingImage[];
  vaccinated: boolean;
  dewormed: boolean;
  microchipped: boolean | null;
  pedigreeAvailable: boolean | null;
  healthCertificateAvailable: boolean | null;
  location: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  featured: boolean;
  isPublished: boolean;
  disclaimer: string | null;
  createdAt: Date;
  updatedAt: Date;
}
