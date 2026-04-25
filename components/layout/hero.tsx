import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

interface HeroProps {
  title: string;
  description: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  backgroundImage?: string;
  imageCollage?: string[];
  imageAlts?: string[];
}

export function Hero({
  title,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  imageCollage,
  imageAlts,
}: HeroProps) {
  const hasCollage = imageCollage && imageCollage.length >= 3;
  const collageAlts = imageAlts ?? [
    "Happy family dog portrait",
    "Dog portrait close-up",
    "Dog playing outdoors",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-amber-50 dark:from-background dark:to-background">
      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              {description}
            </p>
            {(primaryAction || secondaryAction) && (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {primaryAction && (
                  <Button asChild size="lg" className="min-w-[180px]">
                    <Link href={primaryAction.href}>{primaryAction.label}</Link>
                  </Button>
                )}
                {secondaryAction && (
                  <Button asChild variant="outline" size="lg" className="min-w-[180px]">
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Image collage — always visible, responsive */}
          {hasCollage && (
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Large image spanning full width */}
                <div className="col-span-2 overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={imageCollage[0]}
                    alt={collageAlts[0] ?? "Happy dog"}
                    width={640}
                    height={380}
                    className="h-[220px] sm:h-[280px] lg:h-[320px] w-full object-cover"
                    priority
                  />
                </div>
                {/* Two smaller images side by side */}
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={imageCollage[1]}
                    alt={collageAlts[1] ?? "Dog portrait"}
                    width={320}
                    height={240}
                    className="h-[140px] sm:h-[180px] lg:h-[200px] w-full object-cover"
                    priority
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={imageCollage[2]}
                    alt={collageAlts[2] ?? "Dog playing"}
                    width={320}
                    height={240}
                    className="h-[140px] sm:h-[180px] lg:h-[200px] w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fallback: single background image when no collage */}
          {!hasCollage && backgroundImage && (
            <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl shadow-xl lg:max-w-none">
              <Image
                src={backgroundImage}
                alt=""
                width={640}
                height={480}
                className="h-[300px] sm:h-[400px] w-full object-cover"
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
