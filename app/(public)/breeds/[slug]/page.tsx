import { notFound } from "next/navigation";
import { getBreedBySlug, getBreeds } from "@/lib/data/breeds";
import { Container } from "@/components/layout/container";
import { BreedTraits } from "@/components/breeds/breed-traits";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/json-ld";
import { breedPageSchema, breadcrumbSchema } from "@/lib/schema";
import { APP_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Home,
  DollarSign,
  Clock,
  ArrowLeft,
  Scale,
  Weight,
  Scissors,
  Dog,
  Users,
  AlertTriangle,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const breed = await getBreedBySlug(slug);
  if (!breed) return {};
  const costInr = breed.estimatedMonthlyCost
    ? ` Est. monthly cost ₹${(breed.estimatedMonthlyCost * 83).toLocaleString("en-IN")}.`
    : "";
  return createMetadata({
    title: `${breed.name} Dog Breed — Traits, Price & Care Guide India`,
    description: `${breed.description.slice(0, 130)} ${breed.sizeCategory} breed, ${breed.breedGroup} group.${costInr}`,
    path: `/breeds/${breed.slug}`,
    image: breed.imageUrl || undefined,
    keywords: [
      `${breed.name} dog India`,
      `${breed.name} puppy price India`,
      `${breed.name} breed information`,
      `${breed.name} temperament`,
      `${breed.breedGroup} dog breed India`,
      `best ${breed.sizeCategory.toLowerCase()} dog India`,
    ],
  });
}

export async function generateStaticParams() {
  const breeds = await getBreeds();
  return breeds.map((b) => ({ slug: b.slug }));
}

export default async function BreedDetailPage({ params }: Props) {
  const { slug } = await params;
  const breed = await getBreedBySlug(slug);
  if (!breed) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd schema={breedPageSchema(breed)} />
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: APP_URL },
        { name: "Dog Breeds", url: `${APP_URL}/breeds` },
        { name: breed.name, url: `${APP_URL}/breeds/${breed.slug}` },
      ])} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/breeds" className="hover:text-foreground">Dog Breeds</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium" aria-current="page">{breed.name}</li>
        </ol>
      </nav>
      <Link
        href="/breeds"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Breeds
      </Link>

      {/* Hero image */}
      {breed.imageUrl && !breed.imageUrl.includes("placeholder") && (
        <div className="mt-6 relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-2xl">
          <Image
            src={breed.imageUrl}
            alt={breed.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <h1 className="text-3xl font-bold text-white sm:text-4xl drop-shadow-lg">{breed.name}</h1>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {(!breed.imageUrl || breed.imageUrl.includes("placeholder")) && (
                <h1 className="text-4xl font-bold tracking-tight">{breed.name}</h1>
              )}
              <Badge variant="secondary">{breed.sizeCategory}</Badge>
              <Badge variant="outline">{breed.breedGroup}</Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {breed.temperament.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {breed.description}
            </p>
          </div>

          <Separator />

          <BreedTraits breed={breed} />

          <Separator />

          {/* Compatibility */}
          <section>
            <h2 className="text-2xl font-bold">Compatibility</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Dog className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Good with Other Dogs</p>
                    <p className="text-sm text-muted-foreground">
                      {breed.goodWithOtherDogs >= 4
                        ? "Very friendly"
                        : breed.goodWithOtherDogs >= 3
                          ? "Usually fine"
                          : "Selective / cautious"}
                      <span className="ml-1 text-xs">({breed.goodWithOtherDogs}/5)</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Separation Anxiety</p>
                    <p className="text-sm text-muted-foreground">
                      {breed.separationAnxiety >= 4
                        ? "High — needs company"
                        : breed.separationAnxiety >= 3
                          ? "Moderate"
                          : "Low — independent"}
                      <span className="ml-1 text-xs">({breed.separationAnxiety}/5)</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold">Health Considerations</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {breed.healthConsiderations}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Ideal Owner Profile</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {breed.idealOwnerProfile}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Adoption Notes</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {breed.adoptionNotes}
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Quick Facts</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Weight className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Weight</p>
                  <p className="text-sm text-muted-foreground">
                    {breed.weightMin}–{breed.weightMax} lbs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Scissors className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Coat Type</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {breed.coatType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Lifespan</p>
                  <p className="text-sm text-muted-foreground">
                    {breed.lifespanMin}–{breed.lifespanMax} years
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Est. Monthly Cost</p>
                  <p className="text-sm text-muted-foreground">
                    ${breed.estimatedMonthlyCost}/month
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Apartment Suitable</p>
                  <p className="text-sm text-muted-foreground">
                    {breed.apartmentSuitability >= 4
                      ? "Yes"
                      : breed.apartmentSuitability >= 3
                        ? "Possible"
                        : "Not ideal"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Family Friendly</p>
                  <p className="text-sm text-muted-foreground">
                    {breed.familyFriendliness >= 4
                      ? "Excellent"
                      : breed.familyFriendliness >= 3
                        ? "Good"
                        : "Moderate"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Climate</p>
                  <p className="text-sm text-muted-foreground">
                    {breed.climateSuitability.join(", ")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-5 text-center">
              <p className="font-medium">Not sure if {breed.name} is right for you?</p>
              <Button asChild className="mt-3 w-full">
                <Link href="/quiz">Take the Breed Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 text-center">
              <p className="font-medium">Compare with other breeds</p>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link href={`/compare?breeds=${breed.slug}`}>Compare Breeds</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
