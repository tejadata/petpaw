"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import {
  getFavoriteBreedIds,
  getFavoriteArticleIds,
  getFavoriteProductIds,
} from "@/lib/data/favorites";
import { breeds } from "@/lib/datasets/breeds";
import { healthArticles } from "@/lib/datasets/health-articles";
import { products } from "@/lib/datasets/products";
import Link from "next/link";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const [breedIds, setBreedIds] = useState<string[]>([]);
  const [articleIds, setArticleIds] = useState<string[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    Promise.all([
      getFavoriteBreedIds(user.uid),
      getFavoriteArticleIds(user.uid),
      getFavoriteProductIds(user.uid),
    ]).then(([b, a, p]) => {
      setBreedIds(b);
      setArticleIds(a);
      setProductIds(p);
      setLoading(false);
    });
  }, [user, authLoading]);

  const favoriteBreeds = breeds.filter((b) => breedIds.includes(b.id));
  const favoriteArticles = healthArticles.filter((a) =>
    articleIds.includes(a.id),
  );
  const favoriteProducts = products.filter((p) => productIds.includes(p.id));

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Favorites</h1>
      <p className="mt-1 text-muted-foreground">
        Your saved breeds, articles, and products.
      </p>

      <Tabs defaultValue="breeds" className="mt-8">
        <TabsList>
          <TabsTrigger value="breeds">
            Breeds ({favoriteBreeds.length})
          </TabsTrigger>
          <TabsTrigger value="articles">
            Articles ({favoriteArticles.length})
          </TabsTrigger>
          <TabsTrigger value="products">
            Products ({favoriteProducts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breeds" className="mt-6">
          {favoriteBreeds.length === 0 ? (
            <EmptyState
              title="No favorite breeds"
              description="Browse breeds and click the heart icon to save them here."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteBreeds.map((breed) => (
                <Card key={breed.id}>
                  <CardContent className="p-4">
                    <Link
                      href={`/breeds/${breed.id}`}
                      className="font-semibold hover:underline"
                    >
                      {breed.name}
                    </Link>
                    {breed.breedGroup && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {breed.breedGroup}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          {favoriteArticles.length === 0 ? (
            <EmptyState
              title="No favorite articles"
              description="Save health articles to read them later."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {favoriteArticles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-4">
                    <Link
                      href={`/health/${article.id}`}
                      className="font-semibold hover:underline"
                    >
                      {article.title}
                    </Link>
                    {article.categoryName && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {article.categoryName}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          {favoriteProducts.length === 0 ? (
            <EmptyState
              title="No favorite products"
              description="Save product recommendations for easy access."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <p className="font-semibold">{product.title}</p>
                    {product.categoryName && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.categoryName}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
