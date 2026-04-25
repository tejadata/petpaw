import { getBreeds } from "@/lib/data/breeds";
import { BreedsList } from "@/components/breeds/breeds-list";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { createMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { itemListSchema } from "@/lib/schema";
import { APP_URL } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Dog Breeds",
  description:
    "Explore our comprehensive guide to dog breeds. Compare traits, temperament, and find the perfect breed for your lifestyle.",
  path: "/breeds",
});

export default async function BreedsPage() {
  const breeds = await getBreeds();

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd
        schema={itemListSchema(
          "Dog Breeds in India",
          "Browse dog breed guides, traits, and care information for popular breeds in India.",
          breeds.slice(0, 20).map((breed, index) => ({
            position: index + 1,
            name: breed.name,
            url: `${APP_URL}/breeds/${breed.slug}`,
            description: breed.description.slice(0, 160),
            image: breed.imageUrl || undefined,
          }))
        )}
      />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dog Breeds in India</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Browse our comprehensive breed database. Use the filters to find breeds that match your lifestyle.
      </p>
      <BreedsList breeds={breeds} />
    </Container>
  );
}
