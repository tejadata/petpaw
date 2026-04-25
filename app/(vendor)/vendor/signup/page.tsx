"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const BENEFITS = [
  "Create your store profile in minutes",
  "List puppies & pet products for free",
  "Reach verified, responsible pet buyers",
  "Manage inventory from one dashboard",
];

export default function VendorSignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirmPassword") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      router.push("/vendor/onboarding");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl grid gap-6 md:gap-8 md:grid-cols-2 md:items-center">
      {/* Left: Benefits */}
      <div className="hidden md:block space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Start selling on <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Create your free vendor account and get your store in front of thousands of pet lovers.
          </p>
        </div>

        <ul className="space-y-3">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-medium">No hidden costs</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Setting up your store is completely free. You only pay a small commission when you make a sale.
          </p>
        </div>
      </div>

      {/* Right: Signup card */}
      <Card className="w-full shadow-lg border-border/50">
        <CardHeader className="text-center pb-2">
          <h2 className="text-xl font-bold">Create your account</h2>
          <p className="text-sm text-muted-foreground">
            Get started in under 2 minutes
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required placeholder="John Doe" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required minLength={8} placeholder="At least 8 characters" autoComplete="new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} placeholder="Repeat your password" autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account…" : "Create Vendor Account"}
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/vendor/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
            <Link href="/register" className="block text-xs text-muted-foreground hover:underline">
              Register as a regular user instead
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Mobile-only: show benefits below */}
      <div className="md:hidden">
        <ul className="space-y-2">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
