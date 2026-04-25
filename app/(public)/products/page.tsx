import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import ProductsClient from "./products-client";

export const metadata = createMetadata({
  title: "Pet Products",
  description:
    "Shop premium dog food, grooming supplies, accessories, and more for your pets. Trusted brands delivering across India.",
  path: "/products",
  keywords: [
    "buy dog food India",
    "pet accessories online India",
    "dog grooming products",
    "pet supplies India",
    "dog toys India",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <Container className="pt-16 sm:pt-20 pb-0">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pet Products for Dogs in India
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Shop premium dog food, grooming supplies, accessories, and toys from trusted brands — delivered across India.
        </p>
      </Container>
      <Suspense>
        <ProductsClient />
      </Suspense>
    </>
  );
}
