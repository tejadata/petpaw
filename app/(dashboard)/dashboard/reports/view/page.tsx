"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuth } from "@/lib/auth-context";
import { getReportById, deleteMedicalReport } from "@/lib/data/medical-reports";
import { REPORT_TYPE_LABELS } from "@/types/medical-report";
import type { MedicalReport } from "@/types/medical-report";

function isImage(fileName: string) {
  return /\.(jpg|jpeg|png|webp)$/i.test(fileName);
}

function isPdf(fileName: string) {
  return /\.pdf$/i.test(fileName);
}

export default function ReportDetailPage() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (authLoading || !user || !reportId) return;
    getReportById(reportId, user.uid).then((data) => {
      setReport(data);
      setLoading(false);
    });
  }, [user, authLoading, reportId]);

  async function handleDelete() {
    if (!user || !report) return;
    setDeleting(true);
    await deleteMedicalReport(report.id, user.uid);
    router.push("/dashboard/reports");
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!report) {
    return <EmptyState title="Report not found" description="This report does not exist or you don't have access." className="mt-16" />;
  }

  const typeLabel = REPORT_TYPE_LABELS[report.reportType];

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/reports"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reports
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{typeLabel}</Badge>
            {report.petName && <Badge variant="outline">{report.petName}</Badge>}
          </div>
        </div>
        <ConfirmDeleteDialog
          title="Delete this report?"
          description="This will permanently delete the report and its file. This action cannot be undone."
          onConfirm={handleDelete}
          disabled={deleting}
          trigger={
            <Button size="sm" variant="outline" className="shrink-0 gap-1 text-red-600 hover:bg-red-50 hover:text-red-700" disabled={deleting}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          }
        />
      </div>

      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Visit Date</p>
              <p className="mt-1">{report.visitDate.toLocaleDateString()}</p>
            </div>
            {report.clinicName && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Clinic</p>
                <p className="mt-1">{report.clinicName}</p>
              </div>
            )}
            {report.doctorName && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Doctor / Vet</p>
                <p className="mt-1">{report.doctorName}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Uploaded</p>
              <p className="mt-1">{report.createdAt.toLocaleDateString()}</p>
            </div>
          </div>

          {report.description && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notes</p>
              <p className="mt-1 text-sm">{report.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              {isImage(report.fileName) ? (
                <ImageIcon className="h-5 w-5 text-blue-500" />
              ) : (
                <FileText className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{report.fileName}</p>
              {report.fileSize && (
                <p className="text-xs text-muted-foreground">
                  {(report.fileSize / 1024).toFixed(0)} KB
                </p>
              )}
            </div>
            <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button size="sm" variant="outline" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                Open
              </Button>
            </a>
          </div>

          {isImage(report.fileName) && (
            <div className="mt-4 overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={report.fileUrl} alt={report.title} className="w-full object-contain max-h-96" />
            </div>
          )}

          {isPdf(report.fileName) && (
            <div className="mt-4 overflow-hidden rounded-lg border">
              <iframe
                src={report.fileUrl}
                title={report.title}
                className="w-full h-[600px]"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
