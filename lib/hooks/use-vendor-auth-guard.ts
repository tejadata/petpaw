"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getVendorByUserId } from "@/lib/data/vendor/vendors";
import type { Vendor } from "@/types/vendor";

const PUBLIC_VENDOR_ROUTES = ["/vendor/login", "/vendor/signup"];

export function useVendorAuthGuard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const isPublicRoute = PUBLIC_VENDOR_ROUTES.includes(pathname);

    if (!user) {
      if (!isPublicRoute) {
        router.replace("/vendor/login");
      }
      setLoading(false);
      return;
    }

    // Authenticated — fetch vendor profile
    getVendorByUserId(user.uid)
      .then((v) => {
        setVendor(v);

        // If no vendor profile yet and not on onboarding page, redirect
        if (!v && pathname !== "/vendor/onboarding" && !isPublicRoute) {
          router.replace("/vendor/onboarding");
        }

        // If already has vendor profile and on onboarding, redirect to dashboard
        if (v && pathname === "/vendor/onboarding") {
          router.replace("/vendor/dashboard");
        }

        // If on login/signup but already authenticated, redirect
        if (isPublicRoute) {
          router.replace(v ? "/vendor/dashboard" : "/vendor/onboarding");
        }
      })
      .catch(() => {
        setVendor(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, authLoading, pathname, router]);

  return { user, vendor, loading };
}
