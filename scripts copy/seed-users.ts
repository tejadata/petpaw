/**
 * Creates demo Firebase Auth users and their profiles.
 * Run: npm run db:seed-users
 */

import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

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
const db = getFirestore();

const demoUsers = [
  { email: "bhanusvist@gmail.com", password: "admin123", displayName: "Admin", role: "ADMIN" as const },
];

async function main() {
  for (const u of demoUsers) {
    try {
      const existing = await adminAuth.getUserByEmail(u.email).catch(() => null);
      let uid: string;

      if (existing) {
        await adminAuth.updateUser(existing.uid, {
          password: u.password,
          displayName: u.displayName,
        });
        uid = existing.uid;
        console.log(`✓ Updated Firebase Auth: ${u.email}`);
      } else {
        const newUser = await adminAuth.createUser({
          email: u.email,
          password: u.password,
          displayName: u.displayName,
          emailVerified: true,
        });
        uid = newUser.uid;
        console.log(`✓ Created Firebase Auth: ${u.email}`);
      }

      // Create/update user profile in Firestore
      const userProfile = {
        name: u.displayName,
        email: u.email,
        role: u.role,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection("users").doc(uid).set(userProfile, { merge: true });
      console.log(`✓ Updated Firestore profile: ${u.email} (${u.role})`);

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
