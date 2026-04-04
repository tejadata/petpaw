import { getAllFAQs } from "@/lib/data/faqs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminFAQsPage() {
  const faqs = await getAllFAQs();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">FAQs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage frequently asked questions ({faqs.length} FAQs).
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Question</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Order</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq.id} className="border-b last:border-0">
                    <td className="max-w-xs truncate px-4 py-3 font-medium">
                      {faq.question}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{faq.category}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={faq.published ? "secondary" : "outline"}>
                        {faq.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{faq.order}</td>
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
