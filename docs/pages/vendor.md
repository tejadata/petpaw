# Vendor Module

## Purpose

Complete vendor portal for pet breeders and pet product sellers. Includes authentication, onboarding, a management dashboard for puppy and product listings, store profile management, and settings.

## Routes

### Vendor Auth (no sidebar, no auth required)

| Route | File | Purpose |
|---|---|---|
| `/vendor/login` | `app/(vendor)/vendor/login/page.tsx` | Vendor login |
| `/vendor/signup` | `app/(vendor)/vendor/signup/page.tsx` | Vendor registration |
| `/vendor/onboarding` | `app/(vendor)/vendor/onboarding/page.tsx` | Business profile onboarding |

### Vendor Dashboard (sidebar, auth required)

| Route | File | Purpose |
|---|---|---|
| `/vendor/dashboard` | `app/(vendor)/vendor/dashboard/page.tsx` | Vendor overview (stats) |
| `/vendor/dashboard/puppies` | `app/(vendor)/vendor/dashboard/puppies/page.tsx` | Puppy listings list |
| `/vendor/dashboard/puppies/new` | `app/(vendor)/vendor/dashboard/puppies/new/page.tsx` | Create puppy listing |
| `/vendor/dashboard/puppies/detail` | `app/(vendor)/vendor/dashboard/puppies/detail/page.tsx` | View puppy detail (?id=) |
| `/vendor/dashboard/puppies/edit` | `app/(vendor)/vendor/dashboard/puppies/edit/page.tsx` | Edit puppy listing (?id=) |
| `/vendor/dashboard/products` | `app/(vendor)/vendor/dashboard/products/page.tsx` | Product listings list |
| `/vendor/dashboard/products/new` | `app/(vendor)/vendor/dashboard/products/new/page.tsx` | Create product listing |
| `/vendor/dashboard/products/detail` | `app/(vendor)/vendor/dashboard/products/detail/page.tsx` | View product detail (?id=) |
| `/vendor/dashboard/products/edit` | `app/(vendor)/vendor/dashboard/products/edit/page.tsx` | Edit product listing (?id=) |
| `/vendor/dashboard/store` | `app/(vendor)/vendor/dashboard/store/page.tsx` | Store profile management |
| `/vendor/dashboard/settings` | `app/(vendor)/vendor/dashboard/settings/page.tsx` | Vendor settings |

## Key Files

| File | Purpose |
|---|---|
| `app/(vendor)/layout.tsx` | Root vendor layout (server) |
| `app/(vendor)/vendor/dashboard/layout.tsx` | Dashboard layout (client, sidebar + auth guard) |
| `lib/hooks/use-vendor-auth-guard.ts` | Vendor auth guard |
| `lib/data/vendor/vendors.ts` | Vendor profile CRUD |
| `lib/data/vendor/stores.ts` | Store CRUD |
| `lib/data/vendor/puppy-listings.ts` | Puppy listing CRUD |
| `lib/data/vendor/vendor-products.ts` | Product listing CRUD |
| `lib/data/vendor/vendor-storage.ts` | Image upload utilities |

## Components

| Component | File | Purpose |
|---|---|---|
| VendorSidebar | `components/vendor/vendor-sidebar.tsx` | Dashboard nav |
| PuppyListingForm | `components/vendor/puppy-listing-form.tsx` | Puppy create/edit form |
| PuppyListingCard | `components/vendor/puppy-listing-card.tsx` | Puppy list item |
| ProductListingForm | `components/vendor/product-listing-form.tsx` | Product create/edit form |
| ProductListingCard | `components/vendor/product-listing-card.tsx` | Product list item |
| StoreProfileForm | `components/vendor/store-profile-form.tsx` | Store settings form |
| MultiImageUpload | `components/vendor/multi-image-upload.tsx` | Multi-image upload |
| ApprovalStatusBadge | `components/vendor/approval-status-badge.tsx` | Approval badge |
| ListingStatusBadge | `components/vendor/listing-status-badge.tsx` | Listing status |
| InventoryBadge | `components/vendor/inventory-badge.tsx` | Stock indicator |
| VendorDetailsCard | `components/vendor/vendor-details-card.tsx` | Profile card |
| VendorStatCard | `components/vendor/vendor-stat-card.tsx` | Stats card |
| EthicalBreedingNotice | `components/vendor/ethical-breeding-notice.tsx` | Disclaimer |
| ConfirmDeleteDialog | `components/vendor/confirm-delete-dialog.tsx` | Delete modal |

## Firebase Collections

| Collection | Purpose | Access |
|---|---|---|
| `vendors` | Vendor business profiles | Vendor only |
| `stores` | Store public info | Public read, vendor write |
| `puppyListings` | Puppy sale listings | Public read, vendor write |
| `vendorProducts` | Product listings | Public read, vendor write |

## Storage Paths

| Path | Purpose |
|---|---|
| `vendors/{vendorId}/puppies/{listingId}/{fileName}` | Puppy photos |
| `vendors/{vendorId}/products/{productId}/{fileName}` | Product photos |
| `vendors/{vendorId}/store/logo.{ext}` | Store logo |
| `vendors/{vendorId}/store/banner.{ext}` | Store banner |

## Validation Schemas

| Schema | File | Used By |
|---|---|---|
| `vendorOnboardingSchema` | `lib/validations/vendor.ts` | Onboarding form |
| `puppyListingSchema` | `lib/validations/vendor-puppy.ts` | Puppy listing form |
| `vendorProductSchema` | `lib/validations/vendor-product.ts` | Product listing form |
| `storeProfileSchema` | `lib/validations/vendor-store.ts` | Store profile form |

## Vendor Onboarding Flow

1. `/vendor/signup` → Create vendor account (Firebase Auth)
2. `/vendor/onboarding` → Fill business details (name, type, location, license)
3. Vendor profile created with `approvalStatus: "pending"`
4. After approval → access to `/vendor/dashboard`

## Approval Statuses

| Status | Meaning |
|---|---|
| `pending` | Awaiting admin review |
| `approved` | Active, can create listings |
| `rejected` | Application denied |
| `suspended` | Account suspended |

## How to Edit

| Change | File |
|---|---|
| Onboarding form fields | `components/vendor/puppy-listing-form.tsx` etc. + matching validation |
| Store types | `types/vendor.ts` → `STORE_TYPE_LABELS` |
| Product categories | `types/vendor-product.ts` → `VENDOR_PRODUCT_CATEGORY_LABELS` |
| Puppy sale statuses | `types/vendor-puppy.ts` → `SALE_STATUS_LABELS` |
| Sidebar links | `components/vendor/vendor-sidebar.tsx` |
| Auth guard | `lib/hooks/use-vendor-auth-guard.ts` |
| Dashboard layout | `app/(vendor)/vendor/dashboard/layout.tsx` |
