export type ReportType =
  | "vaccination"
  | "blood_test"
  | "prescription"
  | "surgery"
  | "scan"
  | "general_checkup"
  | "other";

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  vaccination: "Vaccination",
  blood_test: "Blood Test",
  prescription: "Prescription",
  surgery: "Surgery",
  scan: "Scan / X-Ray",
  general_checkup: "General Checkup",
  other: "Other",
};

export interface MedicalReport {
  id: string;
  userId: string;
  petId: string;
  petName: string | null;
  title: string;
  description: string | null;
  reportType: ReportType;
  visitDate: Date;
  clinicName: string | null;
  doctorName: string | null;
  fileUrl: string;
  filePath: string; // Firebase Storage path for deletion
  fileName: string;
  fileSize: number | null; // bytes
  createdAt: Date;
}
