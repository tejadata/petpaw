/**
 * Creates demo Firebase Auth users.
 * Run: npm run db:seed-users
 */

import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountKey) {
  console.error("Error: Set FIREBASE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS");
  process.exit(1);
}

if (!getApps().length) {
  const parsed = JSON.parse(serviceAccountKey) as ServiceAccount;
  initializeApp({ credential: cert(parsed) });
}

const adminAuth = getAuth();

const demoUsers = [
  { email: "admin@pawmatch.com", password: "admin123", displayName: "Admin" },
  { email: "user@pawmatch.com", password: "user123", displayName: "Demo User" },
];

async function main() {
  for (const u of demoUsers) {
    try {
      const existing = await adminAuth.getUserByEmail(u.email).catch(() => null);
      if (existing) {
        await adminAuth.updateUser(existing.uid, {
          password: u.password,
          displayName: u.displayName,
        });
        console.log(`✓ Updated: ${u.email}`);
      } else {
        await adminAuth.createUser({
          email: u.email,
          password: u.password,
          displayName: u.displayName,
          emailVerified: true,
        });
        console.log(`✓ Created: ${u.email}`);
      }
    } catch (err) {
      console.error(`✗ Failed for ${u.email}:`, err);
    }
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
