# Components Guide

Complete inventory of all React components in PawMatch, organized by domain.

---

## UI Library — `components/ui/`

15 shadcn/ui primitives built on Radix UI. These are the base building blocks used by all feature components.

| Component | File | Description |
|---|---|---|
| Accordion | `components/ui/accordion.tsx` | Expandable content sections |
| AlertDialog | `components/ui/alert-dialog.tsx` | Confirmation dialogs with action buttons |
| Badge | `components/ui/badge.tsx` | Tag/label display (default, secondary, destructive, outline) |
| Button | `components/ui/button.tsx` | Button with CVA variants (default, destructive, outline, secondary, ghost, link) + sizes |
| Card | `components/ui/card.tsx` | Card container (Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription) |
| Checkbox | `components/ui/checkbox.tsx` | Checkbox input |
| Dialog | `components/ui/dialog.tsx` | Modal dialog |
| Input | `components/ui/input.tsx` | Text input field |
| Label | `components/ui/label.tsx` | Form label |
| Progress | `components/ui/progress.tsx` | Progress bar |
| Select | `components/ui/select.tsx` | Dropdown select |
| Separator | `components/ui/separator.tsx` | Visual divider |
| Skeleton | `components/ui/skeleton.tsx` | Loading skeleton placeholder |
| Tabs | `components/ui/tabs.tsx` | Tab navigation (Tabs, TabsList, TabsTrigger, TabsContent) |
| Textarea | `components/ui/textarea.tsx` | Multi-line text input |

---

## Layout Components — `components/layout/`

Shell components that define the page structure.

| Component | File | Description |
|---|---|---|
| Container | `components/layout/container.tsx` | Max-width page wrapper with padding |
| Navbar | `components/layout/navbar.tsx` | Top navigation bar with desktop/mobile menus, login/vendor links |
| Footer | `components/layout/footer.tsx` | Site footer with link groups (Discover, Health, Resources, Company) |
| Hero | `components/layout/hero.tsx` | Hero section with title, description, and CTA |
| SectionHeader | `components/layout/section-header.tsx` | Page section heading with optional description |

---

## Shared Components — `components/shared/`

Cross-cutting components used across multiple features.

| Component | File | Description |
|---|---|---|
| CtaSection | `components/shared/cta-section.tsx` | Call-to-action banner section |
| DisclaimerBlock | `components/shared/disclaimer-block.tsx` | Medical/legal disclaimer display |
| EmergencyBanner | `components/shared/emergency-banner.tsx` | Emergency alert banner (veterinary emergencies) |
| EmptyState | `components/shared/empty-state.tsx` | Empty state with icon and message (no results, no data) |
| JsonLd | `components/shared/json-ld.tsx` | Renders `<script type="application/ld+json">` for structured data |
| LoadingSkeleton | `components/shared/loading-skeleton.tsx` | Reusable loading skeleton layouts |
| RatingStars | `components/shared/rating-stars.tsx` | Star rating display (read-only) |
| SearchInput | `components/shared/search-input.tsx` | Search input with icon |

---

## Breed Components — `components/breeds/`

| Component | File | Props | Description |
|---|---|---|---|
| BreedCard | `components/breeds/breed-card.tsx` | `Breed` | Card with image, name, size, temperament, key traits |
| BreedGrid | `components/breeds/breed-grid.tsx` | `Breed[]` | Responsive grid layout for breed cards |
| BreedFilters | `components/breeds/breed-filters.tsx` | Filter state | Filter panel (size, exercise, shedding, apartment, etc.) |
| BreedTraits | `components/breeds/breed-traits.tsx` | `Breed` | Trait display with 1–5 bar ratings |
| BreedComparisonTable | `components/breeds/breed-comparison-table.tsx` | `Breed[]` | Side-by-side comparison table |
| BreedsList | `components/breeds/breeds-list.tsx` | `Breed[]` | Alternative list view of breeds |

**Used by:** `/breeds`, `/breeds/[slug]`, `/compare`, `/quiz/results`

---

## Health Components — `components/health/`

| Component | File | Description |
|---|---|---|
| HealthArticleCard | `components/health/health-article-card.tsx` | Card for health article (title, excerpt, category badge) |
| HealthCategoryCard | `components/health/health-category-card.tsx` | Card for health category (icon, name, article count) |

**Used by:** `/health`, `/health/[slug]`, `/health/category/[slug]`

---

## Homemade Food Components — `components/homemade-food/`

| Component | File | Description |
|---|---|---|
| HomemadeFoodArticleCard | `components/homemade-food/homemade-food-article-card.tsx` | Card for recipe article (title, diet type, age group) |

**Used by:** `/homemade-food`, `/homemade-food/[slug]`

---

## Product Components — `components/products/`

| Component | File | Description |
|---|---|---|
| ProductCard | `components/products/product-card.tsx` | Product card (image, title, price, rating, category) |

**Used by:** `/products`, `/products/[slug]`, `/dashboard/favorites`

---

## Quiz Components — `components/quiz/`

| Component | File | Description |
|---|---|---|
| RecommendationCard | `components/quiz/recommendation-card.tsx` | Quiz result card showing breed match score and explanation |

**Used by:** `/quiz/results`

---

## Dashboard Components — `components/dashboard/`

### Sidebar

| Component | File | Description |
|---|---|---|
| Sidebar | `components/dashboard/sidebar.tsx` | Dashboard navigation sidebar (links to pets, reminders, reports, favorites, settings) |

### Shared Dashboard Components — `components/dashboard/shared/`

| Component | File | Description |
|---|---|---|
| ConfirmDeleteDialog | `components/dashboard/shared/confirm-delete-dialog.tsx` | Reusable delete confirmation modal |
| FileUploadField | `components/dashboard/shared/file-upload-field.tsx` | File upload input with drag-and-drop |
| StatCard | `components/dashboard/shared/stat-card.tsx` | Statistics display card (icon, value, label) |

### Pet Components — `components/dashboard/pets/`

| Component | File | Description |
|---|---|---|
| PetCard | `components/dashboard/pets/pet-card.tsx` | Pet profile card (image, name, breed, age) |
| PetForm | `components/dashboard/pets/pet-form.tsx` | Create/edit pet form (React Hook Form + Zod) |

### Reminder Components — `components/dashboard/reminders/`

| Component | File | Description |
|---|---|---|
| ReminderCard | `components/dashboard/reminders/reminder-card.tsx` | Reminder card with type badge, date, priority |
| ReminderForm | `components/dashboard/reminders/reminder-form.tsx` | Create/edit reminder form |

### Report Components — `components/dashboard/reports/`

| Component | File | Description |
|---|---|---|
| MedicalReportCard | `components/dashboard/reports/medical-report-card.tsx` | Report list item (title, type, date) |
| MedicalReportUploadForm | `components/dashboard/reports/medical-report-upload-form.tsx` | Upload form with file selection and progress |

---

## Vendor Components — `components/vendor/`

| Component | File | Description |
|---|---|---|
| VendorSidebar | `components/vendor/vendor-sidebar.tsx` | Vendor dashboard sidebar (Dashboard, Store, Puppies, Products, Settings) |
| VendorDetailsCard | `components/vendor/vendor-details-card.tsx` | Vendor profile information card |
| VendorStatCard | `components/vendor/vendor-stat-card.tsx` | Vendor statistics display |
| ApprovalStatusBadge | `components/vendor/approval-status-badge.tsx` | Badge showing pending/approved/rejected/suspended |
| ListingStatusBadge | `components/vendor/listing-status-badge.tsx` | Badge showing available/reserved/sold |
| InventoryBadge | `components/vendor/inventory-badge.tsx` | Stock level indicator |
| PuppyListingCard | `components/vendor/puppy-listing-card.tsx` | Puppy listing card for vendor dashboard |
| PuppyListingForm | `components/vendor/puppy-listing-form.tsx` | Create/edit puppy listing form |
| ProductListingCard | `components/vendor/product-listing-card.tsx` | Product listing card for vendor dashboard |
| ProductListingForm | `components/vendor/product-listing-form.tsx` | Create/edit vendor product form |
| StoreProfileForm | `components/vendor/store-profile-form.tsx` | Store profile settings form |
| MultiImageUpload | `components/vendor/multi-image-upload.tsx` | Multi-image upload with preview |
| EthicalBreedingNotice | `components/vendor/ethical-breeding-notice.tsx` | Ethical breeding disclaimer notice |
| ConfirmDeleteDialog | `components/vendor/confirm-delete-dialog.tsx` | Vendor-specific delete confirmation |

---

## Admin Components — `components/admin/`

| Component | File | Description |
|---|---|---|
| Sidebar | `components/admin/sidebar.tsx` | Admin panel sidebar navigation |

---

## Component Count by Domain

| Domain | Count |
|---|---|
| UI Library | 15 |
| Layout | 5 |
| Shared | 8 |
| Breeds | 6 |
| Health | 2 |
| Homemade Food | 1 |
| Products | 1 |
| Quiz | 1 |
| Dashboard | 9 (1 sidebar + 3 shared + 2 pets + 2 reminders + 2 reports) |
| Vendor | 14 |
| Admin | 1 |
| **Total** | **63** |
