import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function HealthLoading() {
  return (
    <Container className="py-16 sm:py-20">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-6 w-96" />
      <Skeleton className="mt-8 h-20 w-full rounded-lg" />
      <Skeleton className="mt-12 h-8 w-48" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </Container>
  );
}
