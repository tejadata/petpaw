import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function BreedsLoading() {
  return (
    <Container className="py-16 sm:py-20">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-3 h-6 w-96" />
      <Skeleton className="mt-8 h-12 w-full" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </Container>
  );
}
