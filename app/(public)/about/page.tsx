import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { APP_NAME } from "@/lib/constants";
import { PawPrint, Heart, Users, BookOpen } from "lucide-react";

export const metadata = createMetadata({
  title: "About",
  description: `Learn about ${APP_NAME} and our mission to help people find the right dog companion.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">About {APP_NAME}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {APP_NAME} was created with a simple belief: every person deserves the right dog, and every
          dog deserves the right home.
        </p>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We help first-time and experienced dog owners make informed decisions about breed
              selection, health care, and responsible pet ownership. Our tools are designed to match
              people with breeds that truly fit their lifestyle — not just the cutest face on social
              media.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">What We Believe</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                { icon: Heart, title: "Adoption First", description: "We always encourage considering rescue and adoption before purchasing from a breeder." },
                { icon: BookOpen, title: "Education Over Sales", description: "Our health content is educational only and we always recommend consulting your veterinarian." },
                { icon: Users, title: "Ethical Breeding", description: "When purchasing from breeders, we advocate for those who prioritize health and temperament." },
                { icon: PawPrint, title: "Lifetime Commitment", description: "We help owners prepare for the full journey — from puppy to senior years." },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5 flex gap-4">
                    <div className="shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Our Commitment to Safety</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              All health-related content on {APP_NAME} is for educational purposes only. We clearly
              mark vet-reviewed content and always encourage users to consult with a licensed
              veterinarian for any health concerns. Our symptom helper is a learning tool — never a
              diagnostic tool.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
