"use client";

import { useState } from "react";
import { SearchInput } from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SIZE_CATEGORIES } from "@/lib/constants";

interface BreedFiltersProps {
  onSearchChange: (query: string) => void;
  onSizeChange: (size: string | null) => void;
  activeSize: string | null;
}

export function BreedFilters({ onSearchChange, onSizeChange, activeSize }: BreedFiltersProps) {
  return (
    <div className="space-y-4">
      <SearchInput
        placeholder="Search breeds by name, temperament, or size..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeSize === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSizeChange(null)}
        >
          All Sizes
        </Button>
        {SIZE_CATEGORIES.map((size) => (
          <Button
            key={size}
            variant={activeSize === size ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeChange(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}
