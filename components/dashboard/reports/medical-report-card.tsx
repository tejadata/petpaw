import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { REPORT_TYPE_LABELS, type MedicalReport } from "@/types/medical-report";

const TYPE_COLORS: Record<string, string> = {
  vaccination: "bg-green-100 text-green-700",
  blood_test: "bg-blue-100 text-blue-700",
  prescription: "bg-purple-100 text-purple-700",
  surgery: "bg-red-100 text-red-700",
  scan: "bg-indigo-100 text-indigo-700",
  general_checkup: "bg-amber-100 text-amber-700",
  other: "bg-gray-100 text-gray-700",
};

function isImage(fileName: string) {
  return /\.(jpg|jpeg|png|webp)$/i.test(fileName);
}

interface MedicalReportCardProps {
  report: MedicalReport;
}

export function MedicalReportCard({ report }: MedicalReportCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            {isImage(report.fileName) ? (
              <ImageIcon className="h-5 w-5 text-blue-500" />
            ) : (
              <FileText className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/dashboard/reports/view?id=${report.id}`}
              className="font-semibold hover:underline line-clamp-1"
            >
              {report.title}
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[report.reportType] ?? TYPE_COLORS.other}`}
              >
                {REPORT_TYPE_LABELS[report.reportType]}
              </span>
              {report.petName && (
                <span className="text-xs text-muted-foreground">{report.petName}</span>
              )}
              <span className="text-xs text-muted-foreground">
                {report.visitDate.toLocaleDateString()}
              </span>
            </div>
            {report.clinicName && (
              <p className="mt-1 text-xs text-muted-foreground">{report.clinicName}</p>
            )}
          </div>
          <a
            href={report.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Open file"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
