import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/metadata";
import CompareContent from "./head";

export const metadata = createMetadata({
  title: "Compare Dog Breeds Side by Side",
  description:
    "Compare up to 3 dog breeds side by side on PetsPaw. Review traits, temperament, monthly cost, and lifestyle fit to choose the right breed for your home in India.",
  path: "/compare",
  keywords: [
    "compare dog breeds India",
    "dog breed comparison",
    "best dog breed for apartment India",
    "dog breed traits comparison",
  ],
});

export default function ComparePage() {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Compare Dog Breeds Side by Side
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Select up to 3 breeds to compare their traits, temperament, monthly cost, and lifestyle fit.
      </p>
      <CompareContent />
    </Container>
  );
}
