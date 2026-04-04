# Authentication Pages

## Purpose

Login and registration pages using the dual auth system (Firebase Auth + NextAuth v5 JWT).

## Routes

| Route | File | Type | Purpose |
|---|---|---|---|
| `/login` | `app/(auth)/login/page.tsx` | Client | Email/password + Google sign-in |
| `/register` | `app/(auth)/register/page.tsx` | Client | New account creation |

## Key Files

| File | Purpose |
|---|---|
| `app/(auth)/layout.tsx` | Auth layout (centered card, no navbar/footer) |
| `auth.ts` | NextAuth v5 config (root) |
| `lib/firebase.ts` | Firebase client SDK (auth instance) |
| `lib/auth-context.tsx` | AuthProvider context + `useAuth()` hook |
| `lib/hooks/use-auth-guard.ts` | Redirect unauthenticated users |
| `lib/hooks/use-vendor-auth-guard.ts` | Redirect non-vendor users |

## Auth Architecture

### Dual System

1. **Firebase Auth** — Client-side sign-in/sign-up (email+password, Google OAuth).
2. **NextAuth v5** — Session management via JWT. Stores `user.role` ("USER" | "ADMIN") in the token. Used for route guarding.

### Login Flow

1. User enters credentials on `/login`
2. `signInWithEmailAndPassword()` (Firebase) authenticates
3. NextAuth `signIn("credentials", ...)` creates a JWT session
4. `AuthProvider` updates context → user is redirected to `/dashboard`

### Registration Flow

1. User fills form on `/register`
2. `createUserWithEmailAndPassword()` (Firebase) creates account
3. User document created in Firestore `users` collection
4. Auto-login → redirect to `/dashboard`

### Google OAuth Flow

1. User clicks "Sign in with Google"
2. `signInWithPopup(auth, googleProvider)` (Firebase)
3. NextAuth `signIn("google")` creates session
4. If new user, document created in `users` collection

## Auth Guards

| Hook | File | Purpose |
|---|---|---|
| `useAuthGuard()` | `lib/hooks/use-auth-guard.ts` | Redirects to `/login`; with `adminOnly=true` also checks admin email |
| `useVendorAuthGuard()` | `lib/hooks/use-vendor-auth-guard.ts` | Checks vendor profile in Firestore, redirects to `/vendor/login` |

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@pawmatch.com` | `admin123` |
| User | Any registered email | User's password |

## How to Edit

| Change | File |
|---|---|
| Login form fields | `app/(auth)/login/page.tsx` |
| Register form fields | `app/(auth)/register/page.tsx` |
| Auth providers | `auth.ts` (NextAuth config) |
| Firebase config | `lib/firebase.ts` |
| Auth context | `lib/auth-context.tsx` |
| Session shape | `auth.ts` → callbacks → `jwt` + `session` |
| Auth layout styling | `app/(auth)/layout.tsx` |
