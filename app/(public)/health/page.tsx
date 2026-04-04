import { getHealthCategories, getFeaturedArticles, getHealthArticles } from "@/lib/data/health";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { HealthCategoryCard } from "@/components/health/health-category-card";
import { HealthArticleCard } from "@/components/health/health-article-card";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Health Resources",
  description:
    "Explore our dog health resource center. Find articles on nutrition, training, grooming, and more — reviewed by veterinary professionals.",
  path: "/health",
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
      <SectionHeader
        title="Health Resource Center"
        description="Educational content to help you keep your dog happy and healthy. Browse by category or explore featured articles."
      />

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
