import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import ContactForm from "./contact-form";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the PawMatch team for queries about pet adoption, dog breeds, or our services across India.",
  path: "/contact",
  keywords: ["contact PawMatch", "pet support India", "dog adoption help"],
});

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}
