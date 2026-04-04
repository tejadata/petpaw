import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { HomemadeFoodArticleCard } from "@/components/homemade-food/homemade-food-article-card";
import { getHomemadeFoodArticlesByDiet } from "@/lib/data/homemade-food";

export const metadata = createMetadata({
  title: "Homemade Food for Dogs",
  description:
    "Explore homemade food articles by diet type (Veg vs Non-Veg) and life stage (Puppy, Middle Age, Senior).",
  path: "/homemade-food",
});

const ageOrder = ["Puppy", "Middle Age", "Senior"] as const;

export default async function HomemadeFoodPage() {
  const [vegArticles, nonVegArticles] = await Promise.all([
    getHomemadeFoodArticlesByDiet("Veg"),
    getHomemadeFoodArticlesByDiet("Non-Veg"),
  ]);

  const orderedVeg = [...vegArticles].sort(
    (a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup)
  );
  const orderedNonVeg = [...nonVegArticles].sort(
    (a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup)
  );

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        title="Homemade Food Articles"
        description="Just like Health & Care, browse food guidance by diet preference first, then pick your dog's life stage: Puppy, Middle Age, or Senior."
      />

      <DisclaimerBlock className="mt-8" variant="warning">
        Home-cooked feeding should be discussed with your veterinarian, especially for puppies, seniors, and dogs with medical conditions.
      </DisclaimerBlock>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Veg Articles</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Vegetarian meal ideas with stage-specific guidance.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orderedVeg.map((article) => (
            <HomemadeFoodArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Non-Veg Articles</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Non-vegetarian meal ideas with stage-specific guidance.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orderedNonVeg.map((article) => (
            <HomemadeFoodArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </Container>
  );
}
