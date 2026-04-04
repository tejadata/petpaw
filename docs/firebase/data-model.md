# Firebase Data Model

Complete reference for all Firestore collections and Cloud Storage paths used in PawMatch.

---

## Collections Overview

| Collection | Purpose | Access | Data Layer |
|---|---|---|---|
| `users` | User profiles | Owner only | `lib/data/pets.ts` (indirect) |
| `pets` | Pet profiles (modern) | Owner only | `lib/data/pets.ts` |
| `dogProfiles` | Pet profiles (legacy) | Owner only | `lib/data/dogs.ts` |
| `medicalReports` | Medical records + files | Owner only | `lib/data/medical-reports.ts` |
| `reminders` | Pet care reminders | Owner only | `lib/data/reminders.ts` |
| `favorites` | Saved breeds/articles/products | Owner only | `lib/data/favorites.ts` |
| `vendors` | Vendor business profiles | Vendor only | `lib/data/vendor/vendors.ts` |
| `stores` | Vendor store info | Public read, vendor write | `lib/data/vendor/stores.ts` |
| `puppyListings` | Puppy sale listings | Public read, vendor write | `lib/data/vendor/puppy-listings.ts` |
| `vendorProducts` | Vendor product listings | Public read, vendor write | `lib/data/vendor/vendor-products.ts` |
| `inquiries` | Buyer–vendor inquiries | Buyer + vendor read | — |

---

## User Data Collections

### `users/{userId}`

User profile document. Created on registration.

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Display name |
| `email` | `string` | Email address |
| `image` | `string?` | Profile image URL |
| `createdAt` | `Timestamp` | Account creation date |
| `updatedAt` | `Timestamp` | Last profile update |

**Type definition:** `types/user.ts` → `User`

---

### `pets/{petId}`

Pet profile owned by a user.

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Owner's auth UID |
| `name` | `string` | Pet name |
| `species` | `string` | Animal species |
| `breed` | `string` | Breed name |
| `gender` | `"male" \| "female"` | Pet gender |
| `dateOfBirth` | `Timestamp?` | Birth date |
| `weight` | `number?` | Weight in kg |
| `activityLevel` | `"low" \| "moderate" \| "high" \| "very_high"` | Activity level |
| `imageUrl` | `string?` | Profile photo URL (Storage) |
| `notes` | `string?` | Owner notes |
| `createdAt` | `Timestamp` | Creation date |
| `updatedAt` | `Timestamp` | Last update |

**Type definition:** `types/pet.ts` → `Pet`  
**Validation:** `lib/validations/pet.ts` → `petSchema`  
**Data layer:** `lib/data/pets.ts` → `getPets()`, `getPetById()`, `createPet()`, `updatePet()`, `deletePet()`

---

### `dogProfiles/{dogId}` (Legacy)

Legacy pet collection. Kept for backward compatibility; new pets use the `pets` collection.

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Owner's auth UID |
| `name` | `string` | Dog name |
| `breed` | `string` | Breed |
| `age` | `number` | Age in years |
| `sex` | `string` | Gender |
| `weight` | `number?` | Weight |
| `activityLevel` | `string` | Activity level |
| `notes` | `string?` | Notes |

**Type definition:** `types/user.ts` → `DogProfile`  
**Data layer:** `lib/data/dogs.ts` → `getDogProfiles()`, `createDogProfile()`, etc.

---

### `medicalReports/{reportId}`

Medical records uploaded by pet owners.

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Owner's auth UID |
| `petId` | `string` | Associated pet ID |
| `title` | `string` | Report title |
| `reportType` | `ReportType` | vaccination, blood_test, scan, surgery, dental, checkup, other |
| `visitDate` | `Timestamp` | Date of vet visit |
| `veterinarianName` | `string?` | Vet name |
| `clinicName` | `string?` | Clinic name |
| `notes` | `string?` | Additional notes |
| `fileUrl` | `string?` | Uploaded file URL (Storage) |
| `filePath` | `string?` | Storage file path |
| `fileName` | `string?` | Original file name |
| `fileSize` | `number?` | File size in bytes |
| `createdAt` | `Timestamp` | Upload date |

**Type definition:** `types/medical-report.ts` → `MedicalReport`  
**Validation:** `lib/validations/medical-report.ts` → `medicalReportSchema`  
**Data layer:** `lib/data/medical-reports.ts`

---

### `reminders/{reminderId}`

Pet care reminders with optional recurrence.

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Owner's auth UID |
| `petId` | `string` | Associated pet ID |
| `type` | `ReminderType` | vaccination, deworming, grooming, vet_visit, medication, daily_care, wellness |
| `title` | `string` | Reminder title |
| `description` | `string?` | Details |
| `scheduledDate` | `Timestamp` | Due date |
| `frequency` | `RepeatFrequency` | once, daily, weekly, biweekly, monthly, quarterly, yearly |
| `priority` | `ReminderPriority` | low, medium, high |
| `completed` | `boolean` | Completion status |
| `completedAt` | `Timestamp?` | When marked complete |
| `createdAt` | `Timestamp` | Creation date |
| `updatedAt` | `Timestamp` | Last update |

**Type definition:** `types/reminder.ts` → `Reminder`  
**Validation:** `lib/validations/reminder.ts` → `reminderSchema`  
**Data layer:** `lib/data/reminders.ts`

---

### `favorites/{userId}`

Single document per user storing arrays of favorite item IDs.

| Field | Type | Description |
|---|---|---|
| `breedIds` | `string[]` | Favorited breed IDs |
| `articleIds` | `string[]` | Favorited article IDs |
| `productIds` | `string[]` | Favorited product IDs |

**Data layer:** `lib/data/favorites.ts` → `getFavoriteBreedIds()`, `toggleFavoriteBreed()`, etc.

---

## Vendor Collections

### `vendors/{vendorId}`

Vendor business profile. Created during vendor onboarding.

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Auth UID |
| `businessName` | `string` | Registered business name |
| `ownerName` | `string` | Owner's name |
| `email` | `string` | Business email |
| `phone` | `string` | Contact number |
| `storeType` | `StoreType` | breeder, pet_shop, farm, rescue, other |
| `location` | `object` | Address fields (city, state, pincode, etc.) |
| `licenseNumber` | `string?` | Business license |
| `approvalStatus` | `VendorApprovalStatus` | pending, approved, rejected, suspended |
| `createdAt` | `Timestamp` | Registration date |
| `updatedAt` | `Timestamp` | Last update |

**Type definition:** `types/vendor.ts` → `Vendor`  
**Validation:** `lib/validations/vendor.ts` → `vendorOnboardingSchema`  
**Data layer:** `lib/data/vendor/vendors.ts`

---

### `stores/{storeId}`

Public store profile for a vendor.

| Field | Type | Description |
|---|---|---|
| `vendorId` | `string` | Associated vendor ID |
| `name` | `string` | Store display name |
| `description` | `string?` | About the store |
| `logoUrl` | `string?` | Store logo (Storage) |
| `bannerUrl` | `string?` | Store banner (Storage) |
| `address` | `string` | Full address |
| `city` | `string` | City |
| `state` | `string` | State |
| `pincode` | `string` | Postal code |
| `phone` | `string?` | Store phone |
| `hours` | `StoreHours[]?` | Operating hours |
| `serviceableAreas` | `string[]?` | Delivery areas |
| `createdAt` | `Timestamp` | Creation date |
| `updatedAt` | `Timestamp` | Last update |

**Type definition:** `types/vendor.ts` → `Store`  
**Validation:** `lib/validations/vendor-store.ts` → `storeProfileSchema`  
**Data layer:** `lib/data/vendor/stores.ts`

---

### `puppyListings/{listingId}`

Puppy sale listing created by a vendor.

| Field | Type | Description |
|---|---|---|
| `vendorId` | `string` | Vendor who created it |
| `breed` | `string` | Puppy breed |
| `gender` | `string` | male / female |
| `ageWeeks` | `number` | Age in weeks |
| `color` | `string` | Coat color |
| `price` | `number` | Price in INR |
| `status` | `PuppySaleStatus` | available, reserved, sold |
| `description` | `string?` | Listing description |
| `images` | `ListingImage[]` | Photo URLs (Storage) |
| `vaccinated` | `boolean` | Vaccination status |
| `dewormed` | `boolean` | Deworming status |
| `microchipped` | `boolean` | Microchip status |
| `kciRegistered` | `boolean?` | Kennel Club registration |
| `deliveryAvailable` | `boolean?` | Delivery option |
| `published` | `boolean` | Public visibility |
| `createdAt` | `Timestamp` | Creation date |
| `updatedAt` | `Timestamp` | Last update |

**Type definition:** `types/vendor-puppy.ts` → `PuppyListing`  
**Validation:** `lib/validations/vendor-puppy.ts` → `puppyListingSchema`  
**Data layer:** `lib/data/vendor/puppy-listings.ts`

---

### `vendorProducts/{productId}`

Product listing created by a vendor.

| Field | Type | Description |
|---|---|---|
| `vendorId` | `string` | Vendor who created it |
| `title` | `string` | Product title |
| `category` | `VendorProductCategory` | food, treats, toys, grooming, beds, crates, bowls, collars, training, healthcare |
| `brand` | `string?` | Brand name |
| `description` | `string` | Product description |
| `price` | `number` | Price in INR |
| `salePrice` | `number?` | Discounted price |
| `stock` | `number` | Available quantity |
| `sku` | `string?` | Stock keeping unit |
| `images` | `ListingImage[]` | Photo URLs (Storage) |
| `ageBreedSuitability` | `string?` | Target pet age/breed |
| `published` | `boolean` | Public visibility |
| `createdAt` | `Timestamp` | Creation date |
| `updatedAt` | `Timestamp` | Last update |

**Type definition:** `types/vendor-product.ts` → `VendorProduct`  
**Validation:** `lib/validations/vendor-product.ts` → `vendorProductSchema`  
**Data layer:** `lib/data/vendor/vendor-products.ts`

---

### `inquiries/{inquiryId}`

Buyer inquiry about a puppy or product.

| Field | Type | Description |
|---|---|---|
| `vendorId` | `string` | Target vendor |
| `buyerUserId` | `string` | Buyer's auth UID |
| `listingId` | `string` | Related listing ID |
| `listingType` | `string` | "puppy" or "product" |
| `message` | `string` | Inquiry message |
| `status` | `string` | open, replied, closed |
| `createdAt` | `Timestamp` | Submission date |

---

## Cloud Storage Paths

| Path Pattern | Purpose | Access |
|---|---|---|
| `users/{userId}/pets/{petId}/profile.{ext}` | Pet profile images | Owner only |
| `users/{userId}/reports/{petId}/{reportId}/{fileName}` | Medical report files | Owner only |
| `vendors/{vendorId}/puppies/{listingId}/{fileName}` | Puppy listing photos | Public read, vendor write |
| `vendors/{vendorId}/products/{productId}/{fileName}` | Product listing photos | Public read, vendor write |
| `vendors/{vendorId}/store/logo.{ext}` | Store logo | Public read, vendor write |
| `vendors/{vendorId}/store/banner.{ext}` | Store banner | Public read, vendor write |

**Storage utilities:** `lib/storage.ts` → `uploadFile()`, `deleteFile()`, path builders  
**Vendor storage:** `lib/data/vendor/vendor-storage.ts`

---

## Collection Relationships

```
users ─── 1:N ──→ pets
  │                 │
  │                 └── 1:N ──→ medicalReports
  │                 └── 1:N ──→ reminders
  │
  └── 1:1 ──→ favorites
  └── 1:N ──→ dogProfiles (legacy)

vendors ─── 1:1 ──→ stores
  │
  └── 1:N ──→ puppyListings
  └── 1:N ──→ vendorProducts
  └── 1:N ──→ inquiries (received)

users ─── 1:N ──→ inquiries (sent as buyer)
```
