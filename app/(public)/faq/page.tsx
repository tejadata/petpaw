import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQs } from "@/lib/data/faqs";
import { createMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { faqPageSchema } from "@/lib/schema";
import { APP_NAME } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    `Find answers to common questions about ${APP_NAME}, our breed quiz, health resources, and more.`,
  path: "/faq",
});

export default async function FAQPage() {
  const faqs = await getFAQs();

  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    const cat = faq.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  return (
    <Container className="py-16 sm:py-20">
      {/* FAQPage schema — enables Google's FAQ rich snippets in search results */}
      <JsonLd schema={faqPageSchema(faqs)} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about {APP_NAME}. Explore our{" "}
          <a href="/breeds" className="text-primary underline underline-offset-4">breed guides</a>,{" "}
          <a href="/health" className="text-primary underline underline-offset-4">health articles</a>, and{" "}
          <a href="/quiz" className="text-primary underline underline-offset-4">breed quiz</a>, or browse the questions below.
        </p>

        <div className="mt-12 space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <h2 className="mb-4 text-xl font-bold">{category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {items.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
