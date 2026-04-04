import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteFile } from "@/lib/storage";
import type { MedicalReport, ReportType } from "@/types/medical-report";

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToReport(
  id: string,
  data: Record<string, unknown>
): MedicalReport {
  return {
    ...(data as Omit<MedicalReport, "id" | "visitDate" | "createdAt">),
    id,
    visitDate: toDate(data.visitDate),
    createdAt: toDate(data.createdAt),
  };
}

export async function getReportsByUser(
  userId: string
): Promise<MedicalReport[]> {
  try {
    const q = query(
      collection(db, "medicalReports"),
      where("userId", "==", userId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReport(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime());
  } catch {
    return [];
  }
}

export async function getReportsByPet(
  userId: string,
  petId: string
): Promise<MedicalReport[]> {
  try {
    const q = query(
      collection(db, "medicalReports"),
      where("userId", "==", userId),
      where("petId", "==", petId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReport(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime());
  } catch {
    return [];
  }
}

export async function getReportsByType(
  userId: string,
  reportType: ReportType
): Promise<MedicalReport[]> {
  try {
    const q = query(
      collection(db, "medicalReports"),
      where("userId", "==", userId),
      where("reportType", "==", reportType)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => docToReport(d.id, d.data() as Record<string, unknown>))
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime());
  } catch {
    return [];
  }
}

export async function getReportById(
  id: string,
  userId: string
): Promise<MedicalReport | null> {
  try {
    const snap = await getDoc(doc(db, "medicalReports", id));
    if (!snap.exists() || snap.data()?.userId !== userId) return null;
    return docToReport(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getRecentReports(
  userId: string,
  limit = 5
): Promise<MedicalReport[]> {
  try {
    const all = await getReportsByUser(userId);
    return all.slice(0, limit);
  } catch {
    return [];
  }
}

export async function createReport(
  userId: string,
  data: Omit<MedicalReport, "id" | "createdAt">
): Promise<MedicalReport> {
  const now = new Date();
  const report = { ...data, userId, createdAt: now };
  const ref = await addDoc(collection(db, "medicalReports"), report);
  return { ...report, id: ref.id };
}

/**
 * Delete a medical report document AND its file from Firebase Storage.
 */
export async function deleteMedicalReport(
  id: string,
  userId: string
): Promise<void> {
  const report = await getReportById(id, userId);
  if (!report) return;
  // Delete file from Storage first (non-fatal if it fails)
  if (report.filePath) {
    await deleteFile(report.filePath).catch(() => {});
  }
  await deleteDoc(doc(db, "medicalReports", id));
}
