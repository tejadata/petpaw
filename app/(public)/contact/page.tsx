import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { APP_NAME } from "@/lib/constants";
import ContactForm from "./contact-form";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    `Get in touch with the ${APP_NAME} team for queries about pet adoption, dog breeds, or our services across India.`,
  path: "/contact",
  keywords: [`contact ${APP_NAME}`, "pet support India", "dog adoption help"],
});

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}
