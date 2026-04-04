import { getSymptoms } from "@/lib/data/symptoms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const severityColors: Record<string, string> = {
  Mild: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Moderate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Severe: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Emergency: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default async function AdminSymptomsPage() {
  const symptoms = await getSymptoms();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Symptoms</h1>
          <p className="mt-1 text-muted-foreground">
            Manage symptom checker entries ({symptoms.length} symptoms).
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Symptom
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-left font-medium">Severity</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {symptoms.map((symptom) => (
                  <tr key={symptom.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{symptom.name}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                      {symptom.description}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={severityColors[symptom.severity]} variant="secondary">
                        {symptom.severity}
                      </Badge>
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
