import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Heart, Shield, Search, AlertTriangle, ExternalLink } from "lucide-react";

export const metadata = createMetadata({
  title: "Adoption & Ethical Buying",
  description:
    "Learn about responsible dog adoption and ethical buying practices. Find resources for rescue organizations and reputable breeders.",
  path: "/adoption",
});

export default function AdoptionPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Adoption & Ethical Buying</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you adopt or buy, every dog deserves a loving, prepared home. Here&apos;s how to
          make the best choice for you and your future companion.
        </p>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Adopt First</h2>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Millions of dogs enter shelters each year. Adoption saves lives and gives dogs a second
            chance. Many shelters have purebred dogs and puppies, not just mixed breeds. Benefits of
            adoption include:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Lower cost — adoption fees are typically $50–$300
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Dogs are usually spayed/neutered, vaccinated, and microchipped
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Shelter staff can advise on the dog&apos;s temperament and needs
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              You&apos;re saving a life and reducing demand for puppy mills
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Finding a Reputable Breeder</h2>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            If you choose to buy from a breeder, look for these signs of a responsible breeder:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Welcomes visits and shows you living conditions",
              "Health tests parents for breed-specific conditions",
              "Provides health guarantees and vaccination records",
              "Asks you questions about your home and lifestyle",
              "Doesn't have multiple litters available at all times",
              "Belongs to breed clubs and follows their code of ethics",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="flex items-start gap-2 p-4">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <p className="text-sm">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold">Red Flags to Avoid</h2>
          </div>
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/20 dark:bg-red-900/10">
            <ul className="space-y-2 text-sm">
              {[
                "Selling puppies online with no option to visit",
                "Multiple breeds available with puppies always in stock",
                "No health testing or willingness to show documentation",
                "Won't let you meet the parents or see the facilities",
                "Pressures you to buy immediately or offers a 'discount'",
                "Ships puppies without meeting the buyer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Resources</h2>
          <div className="mt-4 grid gap-3">
            {[
              { name: "Petfinder", url: "https://www.petfinder.com", desc: "Search adoptable dogs near you" },
              { name: "Adopt a Pet", url: "https://www.adoptapet.com", desc: "Nationwide adoption listings" },
              { name: "AKC Marketplace", url: "https://marketplace.akc.org", desc: "Find responsible AKC breeders" },
              { name: "The Shelter Pet Project", url: "https://theshelterpetproject.org", desc: "Shelter adoption advocacy" },
            ].map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{resource.name}</p>
                  <p className="text-sm text-muted-foreground">{resource.desc}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-lg bg-primary/5 p-6 text-center">
          <p className="text-lg font-medium">Ready to find your perfect match?</p>
          <p className="mt-1 text-muted-foreground">
            Take our breed quiz to discover which breeds fit your lifestyle.
          </p>
          <Button asChild className="mt-4">
            <Link href="/quiz">Take the Breed Quiz</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
