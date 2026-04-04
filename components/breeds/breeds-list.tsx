"use client";

import { useState, useMemo } from "react";
import { BreedGrid } from "@/components/breeds/breed-grid";
import { BreedFilters } from "@/components/breeds/breed-filters";
import type { Breed } from "@/types/breed";

interface BreedsListProps {
  breeds: Breed[];
}

export function BreedsList({ breeds }: BreedsListProps) {
  const [search, setSearch] = useState("");
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = breeds;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.temperament.some((t) => t.toLowerCase().includes(q)) ||
          b.sizeCategory.toLowerCase().includes(q)
      );
    }
    if (activeSize) {
      result = result.filter((b) => b.sizeCategory === activeSize);
    }
    return result;
  }, [breeds, search, activeSize]);

  return (
    <>
      <div className="mt-8">
        <BreedFilters
          onSearchChange={setSearch}
          onSizeChange={setActiveSize}
          activeSize={activeSize}
        />
      </div>
      <div className="mt-8">
        <BreedGrid breeds={filtered} />
      </div>
    </>
  );
}
