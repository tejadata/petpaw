/**
 * Firestore Seed Script
 *
 * Populates Firestore with data from lib/datasets/*.
 *
 * Usage:
 *   1. Set FIREBASE_SERVICE_ACCOUNT_KEY env var (JSON string of your service account key)
 *      OR set GOOGLE_APPLICATION_CREDENTIALS to the path of the key file.
 *   2. Run: npx tsx scripts/seed-firestore.ts
 */

import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Import datasets
import { breeds } from "../lib/datasets/breeds";
import { healthCategories } from "../lib/datasets/health-categories";
import { healthArticles } from "../lib/datasets/health-articles";
import { products, productCategories } from "../lib/datasets/products";
import { symptoms, warningRules } from "../lib/datasets/symptoms";
import { faqs } from "../lib/datasets/faqs";
import { homemadeFoodArticles } from "../lib/datasets/homemade-food-articles";

// Initialize Firebase Admin
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (serviceAccountKey) {
  const parsed = JSON.parse(serviceAccountKey) as ServiceAccount;
  initializeApp({ credential: cert(parsed) });
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  initializeApp();
} else {
  console.error(
    "Error: Set FIREBASE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS"
  );
  process.exit(1);
}

const db = getFirestore();

async function seedCollection(name: string, data: Record<string, unknown>[]) {
  console.log(`Seeding ${name} (${data.length} documents)...`);
  const batch = db.batch();
  for (const item of data) {
    const id = (item.id as string) ?? db.collection(name).doc().id;
    const { id: _id, ...rest } = item;
    batch.set(db.collection(name).doc(id), rest);
  }
  await batch.commit();
  console.log(`  ✓ ${name} seeded`);
}

async function main() {
  console.log("Seeding Firestore...\n");

  await seedCollection("breeds", breeds as unknown as Record<string, unknown>[]);
  await seedCollection("healthCategories", healthCategories as unknown as Record<string, unknown>[]);
  await seedCollection("healthArticles", healthArticles as unknown as Record<string, unknown>[]);
  await seedCollection("productCategories", productCategories as unknown as Record<string, unknown>[]);
  await seedCollection("products", products as unknown as Record<string, unknown>[]);
  await seedCollection("symptoms", symptoms as unknown as Record<string, unknown>[]);
  await seedCollection("warningRules", warningRules as unknown as Record<string, unknown>[]);
  await seedCollection("faqs", faqs as unknown as Record<string, unknown>[]);
  await seedCollection("homemadeFoodArticles", homemadeFoodArticles as unknown as Record<string, unknown>[]);

  console.log("\n✓ Firestore seeding complete!");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
