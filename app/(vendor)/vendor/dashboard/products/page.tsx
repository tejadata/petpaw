"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { getVendorProductsByVendor } from "@/lib/data/vendor/vendor-products";
import { ProductListingCard } from "@/components/vendor/product-listing-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, ShoppingBag, Search } from "lucide-react";
import type { VendorProduct, VendorProductCategory } from "@/types/vendor-product";
import { VENDOR_PRODUCT_CATEGORY_LABELS } from "@/types/vendor-product";

const CATEGORIES = Object.entries(VENDOR_PRODUCT_CATEGORY_LABELS) as [VendorProductCategory, string][];

export default function ProductListingsPage() {
  const { user } = useVendorAuthGuard();
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<VendorProductCategory | "all">("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in_stock" | "low" | "out">("all");

  useEffect(() => {
    if (!user) return;
    getVendorProductsByVendor(user.uid).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [user]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search || p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && p.stockQuantity > 5) ||
        (stockFilter === "low" && p.stockQuantity > 0 && p.stockQuantity <= 5) ||
        (stockFilter === "out" && p.stockQuantity === 0);
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

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
          <h1 className="text-xl sm:text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} products total</p>
        </div>
        <Button asChild>
          <Link href="/vendor/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as VendorProductCategory | "all")}
          className="rounded-md border bg-transparent px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as "all" | "in_stock" | "low" | "out")}
          className="rounded-md border bg-transparent px-3 py-2 text-sm"
        >
          <option value="all">All Stock</option>
          <option value="in_stock">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Listing grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12" />}
          title={products.length === 0 ? "No products yet" : "No matching products"}
          description={
            products.length === 0
              ? "Add your first product to get started."
              : "Try adjusting your search or filters."
          }
          action={
            products.length === 0 ? (
              <Button asChild>
                <Link href="/vendor/dashboard/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Product
                </Link>
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductListingCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
