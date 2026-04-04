import { getBreeds } from "@/lib/data/breeds";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminBreedsPage() {
  const breeds = await getBreeds();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Breeds</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the breed database ({breeds.length} breeds).
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Breed
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Size</th>
                  <th className="px-4 py-3 text-left font-medium">Lifespan</th>
                  <th className="px-4 py-3 text-left font-medium">Featured</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {breeds.map((breed) => (
                  <tr key={breed.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/breeds/${breed.slug}`}
                        className="font-medium hover:underline"
                      >
                        {breed.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{breed.sizeCategory}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {breed.lifespanMin}–{breed.lifespanMax} years
                    </td>
                    <td className="px-4 py-3">
                      {breed.featured && <Badge variant="secondary">Featured</Badge>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
