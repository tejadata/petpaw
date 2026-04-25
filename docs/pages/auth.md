# Authentication Pages

## Purpose

Login and registration pages using Firebase Authentication with email/password and Google sign-in.

## Routes

| Route           | File                                 | Type   | Purpose                                   |
| --------------- | ------------------------------------ | ------ | ----------------------------------------- |
| `/login`        | `app/(auth)/login/page.tsx`          | Client | Email/password + Google sign-in           |
| `/register`     | `app/(auth)/register/page.tsx`       | Client | New account creation                      |
| `/vendor/login` | `app/(vendor)/vendor/login/page.tsx` | Client | Vendor-specific login with approval check |

## Key Files

| File                                 | Purpose                                       |
| ------------------------------------ | --------------------------------------------- |
| `app/(auth)/layout.tsx`              | Auth layout (centered card, no navbar/footer) |
| `lib/firebase.ts`                    | Firebase client SDK (auth instance)           |
| `lib/auth-context.tsx`               | AuthProvider context + `useAuth()` hook       |
| `lib/hooks/use-auth-guard.ts`        | Redirect unauthenticated users                |
| `lib/hooks/use-vendor-auth-guard.ts` | Redirect non-vendor users                     |

## Auth Architecture

### Firebase Authentication

The app uses Firebase Authentication with browser local persistence. Authentication state is managed through a React context provider.

**Key features:**

- Email/password authentication
- Google OAuth sign-in
- Browser local persistence
- Role-based routing (admin, user, vendor)
- Protected routes with middleware

### Login Flow

1. User enters credentials on `/login`
2. `signInWithEmailAndPassword()` (Firebase) authenticates
3. `AuthProvider` updates context with user data
4. User is redirected based on role:
   - ADMIN → `/admin`
   - USER → `/dashboard`
   - VENDOR → approval check → `/vendor`

### Registration Flow

1. User fills form on `/register`
2. `createUserWithEmailAndPassword()` (Firebase) creates account
3. User document created in Firestore `users` collection
4. Auto-login → redirect to `/dashboard`

### Google OAuth Flow

1. User clicks "Sign in with Google"
2. `signInWithPopup(auth, googleProvider)` (Firebase)
3. `AuthProvider` updates context with user data
4. Redirect based on role

### Vendor Login Flow

1. Vendor enters credentials on `/vendor/login`
2. Firebase authentication
3. Check vendor approval status in Firestore
4. If approved → `/vendor/dashboard`
5. If pending → approval pending page
6. If rejected → contact support message
7. If new user, document created in `users` collection

## Auth Guards

| Hook                   | File                                 | Purpose                                                              |
| ---------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `useAuthGuard()`       | `lib/hooks/use-auth-guard.ts`        | Redirects to `/login`; with `adminOnly=true` also checks admin email |
| `useVendorAuthGuard()` | `lib/hooks/use-vendor-auth-guard.ts` | Checks vendor profile in Firestore, redirects to `/vendor/login`     |

## Demo Credentials

| Role  | Email                | Password        |
| ----- | -------------------- | --------------- |
| Admin | `admin@pawmatch.com` | `admin123`      |
| User  | Any registered email | User's password |

## How to Edit

| Change               | File                                      |
| -------------------- | ----------------------------------------- |
| Login form fields    | `app/(auth)/login/page.tsx`               |
| Register form fields | `app/(auth)/register/page.tsx`            |
| Auth providers       | `auth.ts` (NextAuth config)               |
| Firebase config      | `lib/firebase.ts`                         |
| Auth context         | `lib/auth-context.tsx`                    |
| Session shape        | `auth.ts` → callbacks → `jwt` + `session` |
| Auth layout styling  | `app/(auth)/layout.tsx`                   |
