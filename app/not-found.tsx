import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20">
      <PawPrint className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold">404 — Page Not Found</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-md">
        Oops! This page seems to have wandered off. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/breeds">Browse Breeds</Link>
        </Button>
      </div>
    </Container>
  );
}
