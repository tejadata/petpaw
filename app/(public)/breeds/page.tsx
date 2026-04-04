import { getBreeds } from "@/lib/data/breeds";
import { BreedsList } from "@/components/breeds/breeds-list";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { createMetadata } from "@/lib/metadata";

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
      <SectionHeader
        title="Explore Dog Breeds"
        description="Browse our comprehensive breed database. Use the filters to find breeds that match your lifestyle."
      />
      <BreedsList breeds={breeds} />
    </Container>
  );
}
