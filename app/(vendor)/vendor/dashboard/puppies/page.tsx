"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getPuppyListingsByVendor } from "@/lib/data/vendor/puppy-listings";
import { PuppyListingCard } from "@/components/vendor/puppy-listing-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Dog, Search } from "lucide-react";
import type { PuppyListing } from "@/types/vendor-puppy";
import type { PuppySaleStatus } from "@/types/vendor-puppy";

export default function PuppyListingsPage() {
  const { user } = useVendorAuthGuard();
  const [puppies, setPuppies] = useState<PuppyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PuppySaleStatus | "all">("all");

  useEffect(() => {
    if (!user) return;
    getPuppyListingsByVendor(user.uid).then((data) => {
      setPuppies(data);
      setLoading(false);
    });
  }, [user]);

  const filtered = useMemo(() => {
    return puppies.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.breed.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.saleStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [puppies, search, statusFilter]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Puppy Listings</h1>
          <p className="text-sm text-muted-foreground">{puppies.length} listings total</p>
        </div>
        <Button asChild>
          <Link href="/vendor/dashboard/puppies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Puppy
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or breed…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as PuppySaleStatus | "all")}
          className="rounded-md border bg-transparent px-3 py-2 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Listing grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Dog className="h-12 w-12" />}
          title={puppies.length === 0 ? "No puppy listings yet" : "No matching listings"}
          description={
            puppies.length === 0
              ? "Add your first puppy listing to get started."
              : "Try adjusting your search or filter."
          }
          action={
            puppies.length === 0 ? (
              <Button asChild>
                <Link href="/vendor/dashboard/puppies/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Puppy
                </Link>
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((puppy) => (
            <PuppyListingCard key={puppy.id} puppy={puppy} />
          ))}
        </div>
      )}
    </div>
  );
}
