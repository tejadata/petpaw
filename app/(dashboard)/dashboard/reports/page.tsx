"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { MedicalReportCard } from "@/components/dashboard/reports/medical-report-card";
import { useAuth } from "@/lib/auth-context";
import { getReportsByUser } from "@/lib/data/medical-reports";
import { getPetsByUser } from "@/lib/data/pets";
import type { MedicalReport, ReportType } from "@/types/medical-report";
import type { Pet } from "@/types/pet";
import { REPORT_TYPE_LABELS } from "@/types/medical-report";

export default function ReportsPage() {
  const { user, loading: authLoading } = useAuth();
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPet, setFilterPet] = useState("all");

  useEffect(() => {
    if (authLoading || !user) return;
    Promise.all([getReportsByUser(user.uid), getPetsByUser(user.uid)]).then(
      ([r, p]) => {
        setReports(r);
        setPets(p);
        setLoading(false);
      }
    );
  }, [user, authLoading]);

  const filtered =
    filterPet === "all" ? reports : reports.filter((r) => r.petId === filterPet);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medical Reports</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and view all pet medical records.
          </p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/dashboard/reports/new">
            <Plus className="h-4 w-4" />
            Upload Report
          </Link>
        </Button>
      </div>

      {/* Pet filter */}
      {pets.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterPet("all")}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${filterPet === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            All
          </button>
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setFilterPet(pet.id)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${filterPet === pet.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
            >
              {pet.name}
            </button>
          ))}
        </div>
      )}

      {/* Report type tabs */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
          {(Object.keys(REPORT_TYPE_LABELS) as ReportType[]).map((type) => {
            const count = filtered.filter((r) => r.reportType === type).length;
            return count > 0 ? (
              <TabsTrigger key={type} value={type}>
                {REPORT_TYPE_LABELS[type]} ({count})
              </TabsTrigger>
            ) : null;
          })}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState
              title="No reports yet"
              description="Upload your first medical report to keep track of vet visits and health records."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((r) => (
                <MedicalReportCard key={r.id} report={r} />
              ))}
            </div>
          )}
        </TabsContent>

        {(Object.keys(REPORT_TYPE_LABELS) as ReportType[]).map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered
                .filter((r) => r.reportType === type)
                .map((r) => (
                  <MedicalReportCard key={r.id} report={r} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
