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

  const refreshVendor = async () => {
    if (!user) return;
    try {
      const v = await getVendorByUserId(user.uid);
      setVendor(v);
      return v;
    } catch (error) {
      console.error("Error refreshing vendor:", error);
      return null;
    }
  };

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
    refreshVendor().then((v) => {
      setLoading(false);

      const vendorHome =
        !v ? "/vendor/onboarding" : v.approvalStatus === "approved" ? "/vendor/dashboard" : "/vendor/pending";

      // If vendor profile exists but not approved, redirect to pending page
      if (v && v.approvalStatus !== "approved" && pathname !== "/vendor/pending" && !isPublicRoute) {
        router.replace("/vendor/pending");
      }

      // If vendor is approved and on pending page, redirect to dashboard
      if (v && v.approvalStatus === "approved" && pathname === "/vendor/pending") {
        router.replace("/vendor/dashboard");
      }

      // If on login/signup but already authenticated, redirect
      if (isPublicRoute) {
          router.replace(vendorHome);
        }
      })
      .catch(() => {
        setVendor(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, authLoading, pathname, router]);

  return { user, vendor, loading, refreshVendor };
}
