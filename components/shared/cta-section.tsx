import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CTASection({
  title,
  description,
  actionLabel,
  actionHref,
  variant = "primary",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary",
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p
            className={cn(
              "mt-4 text-lg",
              variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
          <Button
            asChild
            size="lg"
            variant={variant === "primary" ? "secondary" : "default"}
            className="mt-8"
          >
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
