"use client";

import { useState } from "react";
import { BreedComparisonTable } from "@/components/breeds/breed-comparison-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { breeds as staticBreeds } from "@/lib/datasets/breeds";

const MAX_COMPARE = 3;

export default function CompareContent() {
  const [selected, setSelected] = useState(staticBreeds.slice(0, 0));
  const [search, setSearch] = useState("");

  const filtered = staticBreeds.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.some((s) => s.id === b.id)
  );

  function addBreed(breed: (typeof staticBreeds)[0]) {
    if (selected.length < MAX_COMPARE) {
      setSelected((prev) => [...prev, breed]);
      setSearch("");
    }
  }

  function removeBreed(id: string) {
    setSelected((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap gap-2">
        {selected.map((breed) => (
          <Badge key={breed.id} variant="secondary" className="gap-1 py-1.5 pl-3 pr-1.5 text-sm">
            {breed.name}
            <button
              onClick={() => removeBreed(breed.id)}
              className="ml-1 rounded-full p-0.5 hover:bg-muted"
              aria-label={`Remove ${breed.name}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {selected.length < MAX_COMPARE && (
        <Card>
          <CardContent className="p-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a breed to add..."
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            {search.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                {filtered.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-muted-foreground">No breeds found</p>
                ) : (
                  filtered.slice(0, 8).map((breed) => (
                    <button
                      key={breed.id}
                      onClick={() => addBreed(breed)}
                      className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                    >
                      {breed.name}{" "}
                      <span className="text-muted-foreground">· {breed.sizeCategory}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selected.length >= 2 ? (
        <BreedComparisonTable breeds={selected} />
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {selected.length === 0
                ? "Search and select at least 2 breeds to compare."
                : "Select 1 more breed to start comparing."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
