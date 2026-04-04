"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, getProductCategories } from "@/lib/data/products";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ProductCard } from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Product, ProductCategory } from "@/types/product";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") as "rating" | "price-asc" | "price-desc" | "newest" | undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    Promise.all([
      getProducts({ category: activeCategory, sort }),
      getProductCategories(),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
    });
  }, [activeCategory, sort]);

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        title="Product Recommendations"
        description="Curated products chosen for quality, value, and suitability for different breeds and life stages."
      />

      {/* Category filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/products">
          <Badge variant={!activeCategory ? "default" : "outline"} className="cursor-pointer">
            All
          </Badge>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/products?category=${cat.slug}`}>
            <Badge
              variant={activeCategory === cat.slug ? "default" : "outline"}
              className="cursor-pointer"
            >
              {cat.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">No products found in this category.</p>
        </div>
      )}

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Product recommendations may include affiliate links. This does not affect our editorial
        selections.
      </p>
    </Container>
  );
}
