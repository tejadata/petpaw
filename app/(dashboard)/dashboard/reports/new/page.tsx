"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalReportUploadForm } from "@/components/dashboard/reports/medical-report-upload-form";
import { useAuth } from "@/lib/auth-context";
import { getPetsByUser } from "@/lib/data/pets";
import { createReport } from "@/lib/data/medical-reports";
import { uploadFile, medicalReportFilePath } from "@/lib/storage";
import type { Pet } from "@/types/pet";
import type { MedicalReportInput } from "@/lib/validations/medical-report";
import { nanoid } from "@/lib/utils";

export default function NewReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const defaultPetId = searchParams.get("petId") ?? undefined;

  useEffect(() => {
    if (authLoading || !user) return;
    getPetsByUser(user.uid).then(setPets);
  }, [user, authLoading]);

  async function handleSubmit(data: MedicalReportInput) {
    if (!user) return;
    setLoading(true);
    setError("");
    setUploadProgress(0);
    try {
      const reportId = nanoid();
      const pet = pets.find((p) => p.id === data.petId);
      const filePath = medicalReportFilePath(user.uid, data.petId, reportId, data.file.name);

      const { url, fileName, fileSize } = await uploadFile(filePath, data.file, setUploadProgress);

      await createReport(user.uid, {
        petId: data.petId,
        petName: pet?.name ?? null,
        title: data.title,
        description: data.description ?? null,
        reportType: data.reportType,
        visitDate: data.visitDate,
        clinicName: data.clinicName ?? null,
        doctorName: data.doctorName ?? null,
        fileUrl: url,
        filePath,
        fileName,
        fileSize,
        userId: user.uid,
      });

      router.push("/dashboard/reports");
    } catch (err: unknown) {
      setError((err as Error).message ?? "Upload failed. Please try again.");
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/reports"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reports
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Upload Medical Report</h1>
      <p className="mt-1 text-muted-foreground">
        Attach a vet report, prescription, or health record to a pet.
      </p>

      <Card className="mt-8 max-w-2xl">
        <CardContent className="p-6">
          <MedicalReportUploadForm
            pets={pets}
            defaultPetId={defaultPetId}
            onSubmit={handleSubmit}
            uploadProgress={uploadProgress}
            loading={loading}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
