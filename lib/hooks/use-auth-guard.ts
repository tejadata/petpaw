"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function useAuthGuard(adminOnly = false) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (adminOnly && userProfile?.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [user, userProfile, loading, adminOnly, router]);

  return { user, userProfile, loading };
}
