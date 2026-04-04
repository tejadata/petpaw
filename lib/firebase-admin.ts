import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdmin() {
  if (getApps().length) {
    return { db: getFirestore() };
  }

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    const parsed = JSON.parse(serviceAccount) as ServiceAccount;
    initializeApp({ credential: cert(parsed) });
  } else if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    // For Firebase hosting / environments with default credentials
    initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
  } else {
    // No Firebase configured — return null so callers can fall back to static data
    return { db: null };
  }

  return { db: getFirestore() };
}

const { db: adminDb } = getFirebaseAdmin();

export { adminDb };
