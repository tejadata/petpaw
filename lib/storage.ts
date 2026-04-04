import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
  fileSize: number;
}

/**
 * Upload a file to Firebase Storage with optional progress callback.
 * Returns the download URL, storage path, file name, and file size.
 */
export function uploadFile(
  path: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    task.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        if (onProgress) {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(pct);
        }
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({
            url,
            path,
            fileName: file.name,
            fileSize: file.size,
          });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Delete a file from Firebase Storage by its path.
 * Silently ignores "object not found" errors.
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    await deleteObject(ref(storage, path));
  } catch (err: unknown) {
    // Ignore "object-not-found" — file may already be deleted
    if ((err as { code?: string }).code !== "storage/object-not-found") {
      throw err;
    }
  }
}

/**
 * Build a storage path for a pet profile image.
 */
export function petProfileImagePath(userId: string, petId: string, ext: string): string {
  return `users/${userId}/pets/${petId}/profile.${ext}`;
}

/**
 * Build a storage path for a medical report file.
 */
export function medicalReportFilePath(
  userId: string,
  petId: string,
  reportId: string,
  fileName: string
): string {
  return `users/${userId}/reports/${petId}/${reportId}/${fileName}`;
}
