"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPuppyListings } from "@/lib/data/vendor/puppy-listings";
import { getPublishedVendorProducts } from "@/lib/data/vendor/vendor-products";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dog, ShoppingBag, MapPin, Heart } from "lucide-react";
import { VENDOR_PRODUCT_CATEGORY_LABELS } from "@/types/vendor-product";
import { formatCurrencyInr } from "@/lib/utils";
import type { PuppyListing } from "@/types/vendor-puppy";
import type { VendorProduct, VendorProductCategory } from "@/types/vendor-product";

const PRODUCT_CATEGORIES = Object.entries(VENDOR_PRODUCT_CATEGORY_LABELS) as [VendorProductCategory, string][];

type PuppyPriceRange = "all" | "under_5000" | "5000_25000" | "25000_100000" | "above_100000";
type ProductPriceRange = "all" | "under_500" | "500_2000" | "2000_10000" | "above_10000";

const PUPPY_PRICE_RANGES: { value: PuppyPriceRange; label: string }[] = [
  { value: "all", label: "All Prices" },
  { value: "under_5000", label: "Under ₹5,000" },
  { value: "5000_25000", label: "₹5,000 – ₹25,000" },
  { value: "25000_100000", label: "₹25,000 – ₹1,00,000" },
  { value: "above_100000", label: "Above ₹1,00,000" },
];

const PRODUCT_PRICE_RANGES: { value: ProductPriceRange; label: string }[] = [
  { value: "all", label: "All Prices" },
  { value: "under_500", label: "Under ₹500" },
  { value: "500_2000", label: "₹500 – ₹2,000" },
  { value: "2000_10000", label: "₹2,000 – ₹10,000" },
  { value: "above_10000", label: "Above ₹10,000" },
];

function matchesPuppyPrice(price: number, range: PuppyPriceRange): boolean {
  if (range === "all") return true;
  if (range === "under_5000") return price < 5000;
  if (range === "5000_25000") return price >= 5000 && price <= 25000;
  if (range === "25000_100000") return price > 25000 && price <= 100000;
  return price > 100000;
}

function matchesProductPrice(price: number, range: ProductPriceRange): boolean {
  if (range === "all") return true;
  if (range === "under_500") return price < 500;
  if (range === "500_2000") return price >= 500 && price <= 2000;
  if (range === "2000_10000") return price > 2000 && price <= 10000;
  return price > 10000;
}

export default function MarketplaceClient() {
  const [puppies, setPuppies] = useState<PuppyListing[]>([]);
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"puppies" | "products">("puppies");
  const [search, setSearch] = useState("");
  const [breedFilter, setBreedFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<VendorProductCategory | "all">("all");
  const [puppyPriceRange, setPuppyPriceRange] = useState<PuppyPriceRange>("all");
  const [productPriceRange, setProductPriceRange] = useState<ProductPriceRange>("all");

  useEffect(() => {
    Promise.all([getPublishedPuppyListings(), getPublishedVendorProducts()]).then(
      ([p, pr]) => {
        setPuppies(p);
        setProducts(pr);
        setLoading(false);
      }
    );
  }, []);

  const breeds = useMemo(
    () => [...new Set(puppies.map((p) => p.breed))].sort(),
    [puppies]
  );

  const filteredPuppies = useMemo(() => {
    return puppies.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.breed.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesBreed = breedFilter === "all" || p.breed === breedFilter;
      return matchesSearch && matchesBreed && matchesPuppyPrice(p.price, puppyPriceRange);
    });
  }, [puppies, search, breedFilter, puppyPriceRange]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search || p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const effectivePrice = p.salePrice ?? p.price;
      return matchesSearch && matchesCategory && p.stockQuantity > 0 && matchesProductPrice(effectivePrice, productPriceRange);
    });
  }, [products, search, categoryFilter, productPriceRange]);

  return (
    <>
      <Tabs
        value={tab}
        onValueChange={(v) => {
          setTab(v as "puppies" | "products");
          setSearch("");
          setPuppyPriceRange("all");
          setProductPriceRange("all");
        }}
        className="mt-8"
      >
        <TabsList>
          <TabsTrigger value="puppies" className="gap-1.5">
            <Dog className="h-4 w-4" />
            Puppies
            {!loading && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {puppies.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="products" className="gap-1.5">
            <ShoppingBag className="h-4 w-4" />
            Products
            {!loading && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {products.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search & filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={tab === "puppies" ? "Search by name, breed, city…" : "Search products…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {tab === "puppies" && breeds.length > 0 && (
          <select
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
            className="rounded-md border bg-transparent px-3 py-2 text-sm"
          >
            <option value="all">All Breeds</option>
            {breeds.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        )}
        {tab === "puppies" && (
          <select
            value={puppyPriceRange}
            onChange={(e) => setPuppyPriceRange(e.target.value as PuppyPriceRange)}
            className="rounded-md border bg-transparent px-3 py-2 text-sm"
          >
            {PUPPY_PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        )}
        {tab === "products" && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as VendorProductCategory | "all")}
            className="rounded-md border bg-transparent px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        )}
        {tab === "products" && (
          <select
            value={productPriceRange}
            onChange={(e) => setProductPriceRange(e.target.value as ProductPriceRange)}
            className="rounded-md border bg-transparent px-3 py-2 text-sm"
          >
            {PRODUCT_PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      ) : tab === "puppies" ? (
        filteredPuppies.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <Dog className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No puppies found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {puppies.length === 0
                ? "No puppies are listed yet. Check back soon!"
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPuppies.map((puppy) => (
              <Link key={puppy.id} href={`/marketplace/puppy?id=${puppy.id}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] bg-muted">
                    {puppy.images[0] ? (
                      <Image
                        src={puppy.images[0].url}
                        alt={puppy.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Dog className="h-12 w-12 text-muted-foreground/40" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3">{puppy.breed}</Badge>
                    {puppy.saleStatus === "sold" && (
                      <span className="absolute top-3 right-3 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white tracking-wide z-10">SOLD</span>
                    )}
                    {puppy.featured && puppy.saleStatus !== "sold" && (
                      <Badge variant="secondary" className="absolute top-3 right-3 gap-1">
                        <Heart className="h-3 w-3" /> Featured
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold line-clamp-1">{puppy.title}</h3>
                      <span className="shrink-0 text-lg font-bold text-primary">
                        {formatCurrencyInr(puppy.price)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {puppy.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {puppy.location}
                      </span>
                      <span>{puppy.gender === "male" ? "♂ Male" : "♀ Female"}</span>
                      <span>{puppy.ageInWeeks}w old</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {puppy.vaccinated && <Badge variant="outline" className="text-xs">Vaccinated</Badge>}
                      {puppy.dewormed && <Badge variant="outline" className="text-xs">Dewormed</Badge>}
                      {puppy.microchipped && <Badge variant="outline" className="text-xs">Microchipped</Badge>}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )
      ) : filteredProducts.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length === 0
              ? "No products are listed yet. Check back soon!"
              : "Try adjusting your search or filters."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/marketplace/product?id=${product.id}`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] bg-muted">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3">
                    {VENDOR_PRODUCT_CATEGORY_LABELS[product.category]}
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-1">{product.title}</h3>
                    <div className="shrink-0 text-right">
                      {product.salePrice != null ? (
                        <>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrencyInr(product.salePrice)}
                          </span>
                          <span className="ml-1.5 text-xs text-muted-foreground line-through">
                            {formatCurrencyInr(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          {formatCurrencyInr(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.shortDescription}
                  </p>
                  {product.brand && (
                    <p className="text-xs text-muted-foreground">by {product.brand}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
