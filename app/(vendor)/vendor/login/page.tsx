"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { getVendorByUserId } from "@/lib/data/vendor/vendors";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ShoppingBag, TrendingUp, Shield, Users } from "lucide-react";

const FEATURES = [
  { icon: ShoppingBag, label: "List puppies & products" },
  { icon: TrendingUp, label: "Grow your pet business" },
  { icon: Shield, label: "Trusted & verified sellers" },
  { icon: Users, label: "Reach thousands of buyers" },
];

export default function VendorLoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle redirect after successful login
  useEffect(() => {
    if (authLoading || !user) return;

    let cancelled = false;

    getVendorByUserId(user.uid)
      .then((vendor) => {
        if (cancelled) return;

        if (!vendor) {
          router.replace("/vendor/onboarding");
        } else if (vendor.approvalStatus !== "approved") {
          router.replace("/vendor/pending");
        } else {
          router.replace("/vendor/dashboard");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Error fetching vendor profile:", err);
        setError("Failed to load vendor profile. Please try again.");
      });

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, router]);

  // Show loading spinner while auth is initializing
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect will be handled by useEffect above
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/operation-not-allowed") {
        setError("Email/Password sign-in is not enabled in Firebase Console.");
      } else if (code === "auth/invalid-api-key") {
        setError("Invalid Firebase API key. Check your .env.local file.");
      } else {
        setError(`Invalid email or password (${code || "unknown error"})`);
      }
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      // Redirect will be handled by useEffect above
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled.");
      } else {
        setError(`Google sign-in failed (${code || "unknown error"})`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl grid gap-6 md:gap-8 md:grid-cols-2 md:items-center">
      {/* Left: Hero messaging */}
      <div className="hidden md:block space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sell on <span className="text-primary">PawMatch</span>
          </h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Join our marketplace of trusted pet businesses. Manage your store,
            list puppies and products, and connect with pet lovers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg border bg-card/50 p-3 text-sm"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Free to get started &middot; No monthly fees &middot; Pay only when
          you sell
        </p>
      </div>

      {/* Right: Login card */}
      <Card className="w-full shadow-lg border-border/50">
        <CardHeader className="text-center pb-2">
          <h2 className="text-xl font-bold">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            Sign in to your vendor dashboard
          </p>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have a vendor account?{" "}
              <Link
                href="/vendor/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up free
              </Link>
            </p>
            <Link
              href="/login"
              className="block text-xs text-muted-foreground hover:underline"
            >
              Sign in as a regular user instead
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Mobile-only: show features below */}
      <div className="md:hidden space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border bg-card/50 p-2.5 text-xs"
            >
              <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Free to get started &middot; No monthly fees
        </p>
      </div>
    </div>
  );
}
