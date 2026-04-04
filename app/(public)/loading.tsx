import { CardGridSkeleton } from "@/components/shared/loading-skeleton";
import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="py-20 sm:py-28 bg-muted/30">
        <Container className="text-center space-y-6">
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="flex justify-center gap-4 mt-8">
            <Skeleton className="h-11 w-40" />
            <Skeleton className="h-11 w-40" />
          </div>
        </Container>
      </div>
      <Container className="py-16 space-y-16">
        <CardGridSkeleton count={6} />
      </Container>
    </div>
  );
}
