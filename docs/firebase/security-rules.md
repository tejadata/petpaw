# Security Rules

Reference for Firestore and Cloud Storage security rules in PawMatch.

---

## Firestore Rules — `firestore.rules`

### Helper Functions

```javascript
function isSignedIn() {
  return request.auth != null;
}

function isOwner(userId) {
  return isSignedIn() && request.auth.uid == userId;
}

function isDocOwner() {
  return isSignedIn() && resource.data.userId == request.auth.uid;
}

function isVendor(vendorId) {
  return isSignedIn() && request.auth.uid == vendorId;
}
```

### User Data Collections

| Collection                  | Read                      | Create                        | Update     | Delete |
| --------------------------- | ------------------------- | ----------------------------- | ---------- | ------ |
| `users/{userId}`            | Owner only                | Owner only                    | Owner only | —      |
| `pets/{petId}`              | Owner (by `userId` field) | Signed-in (sets own `userId`) | Owner      | Owner  |
| `dogProfiles/{dogId}`       | Owner (by `userId` field) | Signed-in                     | Owner      | Owner  |
| `medicalReports/{reportId}` | Owner (by `userId` field) | Signed-in                     | Owner      | Owner  |
| `reminders/{reminderId}`    | Owner (by `userId` field) | Signed-in                     | Owner      | Owner  |
| `favorites/{userId}`        | Owner only                | Owner only                    | Owner only | —      |

**Key pattern:** All user data documents include a `userId` field. Read/update/delete operations check `resource.data.userId == request.auth.uid`.

### Vendor Collections

| Collection                   | Read                | Create    | Update                 | Delete |
| ---------------------------- | ------------------- | --------- | ---------------------- | ------ |
| `vendors/{vendorId}`         | Vendor only         | Signed-in | Vendor                 | —      |
| `stores/{storeId}`           | **Public** (anyone) | Signed-in | Vendor (by `vendorId`) | Vendor |
| `puppyListings/{listingId}`  | **Public** (anyone) | Signed-in | Vendor (by `vendorId`) | Vendor |
| `vendorProducts/{productId}` | **Public** (anyone) | Signed-in | Vendor (by `vendorId`) | Vendor |
| `inquiries/{inquiryId}`      | Vendor + buyer      | Signed-in | —                      | —      |

**Key pattern:** Marketplace listings (`stores`, `puppyListings`, `vendorProducts`) are publicly readable so unauthenticated visitors can browse. Write operations are restricted to the vendor who owns the listing.

### Security Notes

1. **No admin bypass in rules**: Admin access is enforced at the application level (`admin@pawmatch.com` email check in `useAuthGuard`), not in Firestore rules. This is a simplification — consider adding admin UID checks to Firestore rules for production hardening.
2. **Create validation**: Create rules check that `request.auth.uid` is set as the document's `userId`/`vendorId`, preventing users from creating documents attributed to others.
3. **No size/type validation**: Firestore rules do not validate document field types or sizes. Validation is handled by Zod schemas at the application level.

---

## Cloud Storage Rules — `storage.rules`

### User Files

```
/users/{userId}/{allPaths=**}
```

| Operation | Rule                                      |
| --------- | ----------------------------------------- |
| Read      | Owner only (`request.auth.uid == userId`) |
| Write     | Owner only (`request.auth.uid == userId`) |

**Covered paths:**

- `users/{userId}/pets/{petId}/profile.{ext}` — Pet profile images
- `users/{userId}/reports/{petId}/{reportId}/{fileName}` — Medical report files

### Vendor Files

```
/vendors/{vendorId}/{allPaths=**}
```

| Operation | Rule                                         |
| --------- | -------------------------------------------- |
| Read      | **Public** (anyone, even unauthenticated)    |
| Write     | Vendor only (`request.auth.uid == vendorId`) |

**Covered paths:**

- `vendors/{vendorId}/puppies/{listingId}/{fileName}` — Puppy photos
- `vendors/{vendorId}/products/{productId}/{fileName}` — Product photos
- `vendors/{vendorId}/store/logo.{ext}` — Store logo
- `vendors/{vendorId}/store/banner.{ext}` — Store banner

### Security Notes

1. **No file type validation**: Storage rules do not check `contentType`. Application-level validation should restrict accepted file types.
2. **No file size limits in rules**: Consider adding `request.resource.size < MAX_SIZE` for production.
3. **Vendor files are publicly readable**: This is intentional for marketplace listings. Vendor-uploaded images need to be viewable by all marketplace visitors.

---

## CORS Configuration — `cors.json`

Applied to Firebase Cloud Storage for cross-origin requests.

**Allowed origins:**

- `http://localhost:3000` (local dev)
- `http://localhost:3001` (alternate local)
- `https://petpaw-e4259.web.app` (Firebase Hosting)
- `https://petpaw-e4259.firebaseapp.com` (Firebase default domain)

**Allowed methods:** GET, POST, PUT, DELETE, OPTIONS  
**Max-Age:** 3600 seconds  
**Response headers:** Content-Type, Authorization, Content-Length, X-Requested-With, X-Goog-Resumable

---

## Deploying Rules

```bash
# Deploy Firestore rules only
firebase deploy --only firestore:rules

# Deploy Storage rules only
firebase deploy --only storage

# Deploy both
firebase deploy --only firestore:rules,storage

# Deploy everything (hosting + rules)
firebase deploy
```
