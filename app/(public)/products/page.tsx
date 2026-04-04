import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
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
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}
