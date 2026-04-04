"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground max-w-md">
        We encountered an unexpected error. Please try again.
      </p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </Container>
  );
}
