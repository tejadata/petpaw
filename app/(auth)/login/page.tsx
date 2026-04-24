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
import { createUserProfile } from "@/lib/data/users";
import { ADMIN_EMAILS } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle redirect after successful login
  useEffect(() => {
    if (authLoading || !user) return;

    if (userProfile) {
      if (userProfile.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
      return;
    }

    let cancelled = false;

    getVendorByUserId(user.uid)
      .then(async (vendor) => {
        if (cancelled) return;

        if (vendor) {
          if (vendor.approvalStatus === "approved") {
            router.replace("/vendor/dashboard");
          } else {
            router.replace("/vendor/pending");
          }
          return;
        }

        const isAdminEmail = ADMIN_EMAILS.some((adminEmail) => adminEmail === user.email);

        await createUserProfile(user.uid, {
          name: user.displayName ?? null,
          email: user.email ?? "",
          image: user.photoURL ?? null,
          role: isAdminEmail ? "ADMIN" : "USER",
        }).catch(() => null);

        if (!cancelled) {
          router.replace("/dashboard");
        }
      })
      .catch(() => {
        if (!cancelled) {
          router.replace("/dashboard");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user, userProfile, authLoading, router]);

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
      // Don't set loading to false here - let useEffect handle the redirect
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
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Sign in to your account.
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
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>

        <div className="mt-6 rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <p className="font-medium">Demo accounts:</p>
          <p className="mt-1">Admin: admin@pawmatch.com / admin123</p>
          <p>User: user@pawmatch.com / user123</p>
        </div>
      </CardContent>
    </Card>
  );
}
