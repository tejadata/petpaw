"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { signOutAndRedirect } from "@/lib/auth-actions";
import { getVendorByUserId } from "@/lib/data/vendor/vendors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { APPROVAL_STATUS_LABELS } from "@/types/vendor";
import type { Vendor } from "@/types/vendor";

export default function VendorPendingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadVendorStatus();
  }, [user]);

  async function loadVendorStatus() {
    if (!user) return;

    try {
      const vendorData = await getVendorByUserId(user.uid);
      setVendor(vendorData);

      // If approved, redirect to dashboard
      if (vendorData?.approvalStatus === "approved") {
        router.replace("/vendor/dashboard");
        return;
      }
    } catch (error) {
      console.error("Error loading vendor status:", error);
    } finally {
      setLoading(false);
    }
  }

  async function checkStatus() {
    setCheckingStatus(true);
    await loadVendorStatus();
    setCheckingStatus(false);
  }

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await signOutAndRedirect("/vendor/login");
    } finally {
      setSigningOut(false);
    }
  }

  const getStatusIcon = (status: Vendor["approvalStatus"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-8 w-8 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case "rejected":
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <AlertCircle className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Vendor["approvalStatus"]) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Vendor Profile Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find your vendor profile. Please try logging in again.
            </p>
            <Button onClick={() => router.replace("/vendor/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon(vendor.approvalStatus)}
          </div>
          <CardTitle className="text-2xl">
            Vendor Application {APPROVAL_STATUS_LABELS[vendor.approvalStatus]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              {vendor.approvalStatus === "pending" &&
                "Your vendor application is currently under review. We'll notify you once it's approved."}
              {vendor.approvalStatus === "approved" &&
                "Congratulations! Your vendor application has been approved. Redirecting to dashboard..."}
              {vendor.approvalStatus === "rejected" &&
                "Unfortunately, your vendor application has been rejected."}
            </p>
          </div>

          {/* Application Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Application Details</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Business Name
                </span>
                <p className="text-sm">{vendor.businessName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Owner Name
                </span>
                <p className="text-sm">{vendor.ownerName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Store Type
                </span>
                <p className="text-sm">
                  {vendor.storeType
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Applied On
                </span>
                <p className="text-sm">
                  {vendor.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge
              variant={
                vendor.approvalStatus === "pending"
                  ? "secondary"
                  : vendor.approvalStatus === "approved"
                    ? "default"
                    : "destructive"
              }
              className="text-sm px-3 py-1"
            >
              {APPROVAL_STATUS_LABELS[vendor.approvalStatus]}
            </Badge>
          </div>

          {/* Rejection Reason */}
          {vendor.approvalStatus === "rejected" && vendor.rejectionReason && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Rejection Reason
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {vendor.rejectionReason}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {vendor.approvalStatus === "pending" && (
              <Button
                onClick={checkStatus}
                disabled={checkingStatus}
                variant="outline"
              >
                {checkingStatus ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Check Status
                  </>
                )}
              </Button>
            )}

            {vendor.approvalStatus === "rejected" && (
              <Button onClick={() => router.replace("/vendor/onboarding")}>
                Reapply
              </Button>
            )}

            <Button variant="outline" onClick={handleSignOut} disabled={signingOut}>
              {signingOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@pawmatch.com"
                className="text-primary hover:underline"
              >
                support@pawmatch.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
