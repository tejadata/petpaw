"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getStoreByVendor } from "@/lib/data/vendor/stores";
import { getPuppyListingsByVendor } from "@/lib/data/vendor/puppy-listings";
import { getVendorProductsByVendor } from "@/lib/data/vendor/vendor-products";
import { VendorStatCard } from "@/components/vendor/vendor-stat-card";
import { ApprovalStatusBadge } from "@/components/vendor/approval-status-badge";
import { ListingStatusBadge } from "@/components/vendor/listing-status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dog,
  ShoppingBag,
  CheckCircle,
  AlertTriangle,
  Plus,
  Store,
} from "lucide-react";
import type { PuppyListing } from "@/types/vendor-puppy";
import type { VendorProduct } from "@/types/vendor-product";

export default function VendorDashboardPage() {
  const { user, vendor } = useVendorAuthGuard();
  const [puppies, setPuppies] = useState<PuppyListing[]>([]);
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [hasStore, setHasStore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [store, p, pr] = await Promise.all([
        getStoreByVendor(user!.uid),
        getPuppyListingsByVendor(user!.uid),
        getVendorProductsByVendor(user!.uid),
      ]);
      setHasStore(!!store);
      setPuppies(p);
      setProducts(pr);
      setLoading(false);
    }
    load();
  }, [user]);

  const activePuppies = puppies.filter((p) => p.isPublished && p.saleStatus === "available").length;
  const soldPuppies = puppies.filter((p) => p.saleStatus === "sold").length;
  const activeProducts = products.filter((p) => p.isPublished).length;
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 5 && p.stockQuantity > 0).length;

  const recentListings = [...puppies, ...products]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Vendor Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back{vendor?.ownerName ? `, ${vendor.ownerName}` : ""}!
        </p>
      </div>

      {/* Pending / Rejected banner */}
      {vendor && vendor.approvalStatus !== "approved" && (
        <Card className="border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  Account Status:
                </p>
                <ApprovalStatusBadge status={vendor.approvalStatus} />
              </div>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                {vendor.approvalStatus === "pending"
                  ? "Your account is under review. You can set up your store profile while you wait, but you won't be able to publish listings until approved."
                  : vendor.approvalStatus === "rejected"
                    ? `Your application was not approved. ${vendor.rejectionReason ?? "Please contact support for more details."}`
                    : "Your account has been suspended. Please contact support."}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <VendorStatCard
          title="Puppy Listings"
          value={puppies.length}
          icon={Dog}
          description={`${activePuppies} active · ${soldPuppies} sold`}
        />
        <VendorStatCard
          title="Products"
          value={products.length}
          icon={ShoppingBag}
          description={`${activeProducts} published`}
        />
        <VendorStatCard
          title="Active Listings"
          value={activePuppies + activeProducts}
          icon={CheckCircle}
          description="Currently visible to buyers"
        />
        <VendorStatCard
          title="Low Stock"
          value={lowStockProducts}
          icon={AlertTriangle}
          description="Products with 5 or fewer items"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
          <Button asChild>
            <Link href="/vendor/dashboard/puppies/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Puppy
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/vendor/dashboard/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/vendor/dashboard/store">
              <Store className="mr-2 h-4 w-4" />
              {hasStore ? "Edit Store" : "Set Up Store"}
            </Link>
          </Button>
        </div>
      </Card>

      {/* Recent Listings */}
      <Card className="p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Recent Listings</h2>
        {recentListings.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No listings yet. Add your first puppy or product to get started!
          </p>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="space-y-3 sm:hidden">
              {recentListings.map((item) => {
                const isPuppy = "breed" in item;
                return (
                  <Link
                    key={item.id}
                    href={
                      isPuppy
                        ? `/vendor/dashboard/puppies/detail?id=${item.id}`
                        : `/vendor/dashboard/products/detail?id=${item.id}`
                    }
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {isPuppy ? "Puppy" : "Product"} &middot; {item.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <ListingStatusBadge
                      status={item.isPublished ? "published" : "draft"}
                    />
                  </Link>
                );
              })}
            </div>
            {/* Desktop: table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Title</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentListings.map((item) => {
                    const isPuppy = "breed" in item;
                    return (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-3">
                          <Link
                            href={
                              isPuppy
                                ? `/vendor/dashboard/puppies/detail?id=${item.id}`
                                : `/vendor/dashboard/products/detail?id=${item.id}`
                            }
                            className="font-medium hover:underline"
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {isPuppy ? "Puppy" : "Product"}
                        </td>
                        <td className="py-3">
                          <ListingStatusBadge
                            status={item.isPublished ? "published" : "draft"}
                          />
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {item.createdAt.toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
