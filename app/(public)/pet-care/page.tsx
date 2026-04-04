import { getHealthCategories, getFeaturedArticles, getHealthArticles } from "@/lib/data/health";
import { getHomemadeFoodArticlesByDiet } from "@/lib/data/homemade-food";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { HealthCategoryCard } from "@/components/health/health-category-card";
import { HealthArticleCard } from "@/components/health/health-article-card";
import { HomemadeFoodArticleCard } from "@/components/homemade-food/homemade-food-article-card";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { Separator } from "@/components/ui/separator";
import { createMetadata } from "@/lib/metadata";
import { Heart, UtensilsCrossed } from "lucide-react";

export const metadata = createMetadata({
  title: "Pet Care — Health & Homemade Food",
  description:
    "Your complete dog care guide: health articles, nutrition tips, and homemade food recipes for every life stage.",
  path: "/pet-care",
});

const ageOrder = ["Puppy", "Middle Age", "Senior"] as const;

export default async function PetCarePage() {
  const [categories, featuredArticles, allArticles, vegArticles, nonVegArticles] =
    await Promise.all([
      getHealthCategories(),
      getFeaturedArticles(),
      getHealthArticles(),
      getHomemadeFoodArticlesByDiet("Veg"),
      getHomemadeFoodArticlesByDiet("Non-Veg"),
    ]);

  const articleCountByCategory = new Map<string, number>();
  for (const article of allArticles) {
    articleCountByCategory.set(
      article.categorySlug,
      (articleCountByCategory.get(article.categorySlug) ?? 0) + 1
    );
  }

  const orderedVeg = [...vegArticles].sort(
    (a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup)
  );
  const orderedNonVeg = [...nonVegArticles].sort(
    (a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup)
  );

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        title="Pet Care"
        description="Everything you need to keep your dog happy and healthy — from health articles to homemade food recipes."
      />

      {/* ── Jump-to cards ──────────────────────────────────── */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href="#health"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/30"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Health & Wellness</h3>
            <p className="text-sm text-muted-foreground">
              {categories.length} categories &middot; {allArticles.length} articles &middot; {featuredArticles.length} featured
            </p>
          </div>
        </a>
        <a
          href="#homemade-food"
          className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/30"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Homemade Food Recipes</h3>
            <p className="text-sm text-muted-foreground">
              {vegArticles.length} veg &middot; {nonVegArticles.length} non-veg recipes
            </p>
          </div>
        </a>
      </div>

      <DisclaimerBlock className="mt-8" />

      {/* ── Health Section ──────────────────────────────────── */}
      <section className="mt-12" id="health">
        <h2 className="text-2xl font-bold">Health & Wellness</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse health articles by category or explore our featured picks.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <HealthCategoryCard key={cat.id} category={cat} articleCount={articleCountByCategory.get(cat.slug) ?? 0} />
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      {/* ── Homemade Food Section ──────────────────────────── */}
      <section id="homemade-food">
        <h2 className="text-2xl font-bold">Homemade Food Recipes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Nutritious home-cooked meals organized by diet type and life stage.
        </p>

        <DisclaimerBlock className="mt-6" variant="warning">
          Home-cooked feeding should be discussed with your veterinarian, especially for puppies, seniors, and dogs with medical conditions.
        </DisclaimerBlock>

        {orderedVeg.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Vegetarian Recipes</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Balanced vegetarian meal ideas with stage-specific guidance.
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orderedVeg.map((article) => (
                <HomemadeFoodArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {orderedNonVeg.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold">Non-Vegetarian Recipes</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Protein-rich meal ideas with stage-specific guidance.
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orderedNonVeg.map((article) => (
                <HomemadeFoodArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </section>

      {featuredArticles.length > 0 && (
        <>
          <Separator className="my-16" />

          <section id="featured">
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hand-picked reads on dog health, nutrition, and wellness.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <HealthArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </>
      )}
    </Container>
  );
}
