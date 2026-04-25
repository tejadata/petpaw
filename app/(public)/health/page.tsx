import { getHealthCategories, getFeaturedArticles, getHealthArticles } from "@/lib/data/health";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { HealthCategoryCard } from "@/components/health/health-category-card";
import { HealthArticleCard } from "@/components/health/health-article-card";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { createMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { itemListSchema } from "@/lib/schema";
import { APP_URL } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Dog Health Guide for Indian Dog Owners",
  description:
    "Expert dog health articles on nutrition, grooming, vaccines, and disease prevention — written for pet owners in India. Browse by category or life stage.",
  path: "/health",
  keywords: [
    "dog health care India",
    "dog nutrition guide India",
    "pet health articles India",
    "dog vaccination schedule India",
    "dog grooming tips India",
  ],
});

export default async function HealthPage() {
  const [categories, featuredArticles, allArticles] = await Promise.all([
    getHealthCategories(),
    getFeaturedArticles(),
    getHealthArticles(),
  ]);

  const articleCountByCategory = new Map<string, number>();
  for (const article of allArticles) {
    articleCountByCategory.set(
      article.categorySlug,
      (articleCountByCategory.get(article.categorySlug) ?? 0) + 1
    );
  }

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd
        schema={itemListSchema(
          "Dog Health Articles",
          "Dog health, wellness, and preventive care articles for pet parents in India.",
          allArticles.slice(0, 20).map((article, index) => ({
            position: index + 1,
            name: article.title,
            url: `${APP_URL}/health/${article.slug}`,
            description: article.excerpt,
            image: article.imageUrl || undefined,
          }))
        )}
      />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dog Health Guide for Indian Dog Owners</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Educational content to help you keep your dog happy and healthy. Browse by category or explore featured articles.
      </p>

      <DisclaimerBlock className="mt-8" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Browse by Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <HealthCategoryCard key={cat.id} category={cat} articleCount={articleCountByCategory.get(cat.slug) ?? 0} />
          ))}
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <HealthArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
