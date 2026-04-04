import Link from "next/link";
import { PawPrint, Heart } from "lucide-react";
import { Container } from "./container";
import { Separator } from "@/components/ui/separator";
import { APP_NAME, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <PawPrint className="h-5 w-5 text-primary" />
              {APP_NAME}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Helping you find the perfect dog companion with trusted guidance
              on breeds, health, and responsible ownership.
            </p>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Discover</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.discover.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Health & Care</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.health.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> for dogs everywhere
          </p>
        </div>
      </Container>
    </footer>
  );
}
