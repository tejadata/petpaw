import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/layout/hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { BreedGrid } from "@/components/breeds/breed-grid";
import { HealthArticleCard } from "@/components/health/health-article-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedBreeds } from "@/lib/data/breeds";
import { getFeaturedArticles } from "@/lib/data/health";
import { Search, Heart, PawPrint } from "lucide-react";
import { APP_NAME, APP_URL, APP_OG_IMAGE } from "@/lib/constants";

// Static metadata — embedded in the homepage HTML at build time.
export const metadata: Metadata = {
  title: {
    absolute: `${APP_NAME} — Find Puppies, Dog Breeds & Pet Products in India`,
  },
  description:
    "Find puppies for sale in India, explore dog breeds, shop pet products, and get expert dog health guidance. India’s trusted pet companion platform.",
  keywords: [
    "puppies for sale India",
    "dog breeds India",
    "pet products India",
    "buy puppy online India",
    "dog health tips India",
    "best dog breed for family India",
    "Labrador puppy price India",
    "Golden Retriever puppy India",
  ],
  openGraph: {
    title: `${APP_NAME} — Find Puppies, Dog Breeds & Pet Products in India`,
    description:
      "Find puppies for sale in India, explore dog breeds, shop pet products, and get expert dog health guidance.",
    url: APP_URL,
    siteName: APP_NAME,
    images: [
      {
        url: APP_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Find Puppies, Dog Breeds & Pet Products in India`,
    description:
      "Find puppies for sale in India, explore dog breeds, shop pet products.",
    images: [APP_OG_IMAGE],
  },
  alternates: { canonical: APP_URL },
};

/* ── Unsplash dog photos (free to use) ── */
const HERO_COLLAGE = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&q=80&auto=format&fit=crop",
];

const DOG_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80&auto=format&fit=crop",
    alt: "Golden retriever sitting in a field",
  },
  {
    src: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&q=80&auto=format&fit=crop",
    alt: "Smiling corgi on a walk",
  },
  {
    src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80&auto=format&fit=crop",
    alt: "Happy dog running on the beach",
  },
  {
    src: "https://cdn.britannica.com/45/233845-050-6B6A7F3E/Two-French-bulldogs.jpg",
    alt: "French bulldog puppy looking at camera",
  },
  {
    src: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&q=80&auto=format&fit=crop",
    alt: "Labrador puppy with a toy",
  },
  {
    src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80&auto=format&fit=crop",
    alt: "Golden retriever posing outdoors",
  },
];

export default async function HomePage() {
  const [featuredBreeds, featuredArticles] = await Promise.all([
    getFeaturedBreeds(),
    getFeaturedArticles(),
  ]);

  return (
    <>
      <Hero
        title="Find Your Perfect Dog Companion"
        description="Discover the right breed for your lifestyle, get expert health guidance, and find everything you need to be a great dog parent."
        primaryAction={{ label: "Take the Breed Quiz", href: "/quiz" }}
        secondaryAction={{ label: "Browse Breeds", href: "/breeds" }}
        imageCollage={HERO_COLLAGE}
        imageAlts={[
          "Happy cream puppy smiling at the camera",
          "Golden retriever portrait outdoors",
          "Playful corgi enjoying a walk",
        ]}
      />

      {/* How it Works */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title={`How ${APP_NAME} Works`}
            description="Three simple steps to finding your ideal dog companion"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Take the Quiz",
                description:
                  "Answer questions about your lifestyle, preferences, and living situation",
              },
              {
                icon: PawPrint,
                title: "Get Matched",
                description:
                  "Our engine scores breeds against your answers and explains why each is a good fit",
              },
              {
                icon: Heart,
                title: "Meet Your Match",
                description:
                  "Learn about your top breeds, find ethical breeders, or adopt from a rescue",
              },
            ].map((step, i) => (
              <Card key={i} className="text-center border-0 shadow-none">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Breeds */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <Container>
          <SectionHeader
            title="Popular Breeds"
            description="Explore some of the most loved dog breeds"
          />
          <BreedGrid breeds={featuredBreeds.slice(0, 6)} />
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href="/breeds">View All Breeds</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Explore Puppies, Products, and Practical Pet Care
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Start with our breed guides, browse trusted marketplace listings,
              or read practical health and care content written for dog parents
              in India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/health">Read Health Guides</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Dog Photo Gallery Mosaic */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title="Every Dog Deserves the Right Home"
            description="From playful puppies to loyal companions — find the one waiting for you"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {DOG_GALLERY.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl ${
                  i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 50vw, 33vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Health & Care */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title="Health & Care Tips"
            description="Trusted, educational content to help you care for your dog"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.slice(0, 3).map((article) => (
              <HealthArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href="/health">View All Articles</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA with dog image background */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Image
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&q=80&auto=format&fit=crop"
          alt="Happy dog enjoying outdoor playtime"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <Container className="relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Not Sure Which Breed Is Right For You?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Our quick quiz matches you with breeds that fit your lifestyle,
            experience, and preferences.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-white text-primary hover:bg-white/90 min-w-[200px]"
          >
            <Link href="/quiz">Start the Quiz</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
