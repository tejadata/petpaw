#!/bin/bash
#
# Seed article content to Firestore.
#
# This script temporarily restores the full-content dataset files from git,
# runs the existing seed script, then restores the stripped (lightweight) versions.
#
# Prerequisites:
#   1. Set your service account key:
#        export GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
#      OR
#        export FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
#
#   2. Run this script:
#        bash scripts/seed-articles.sh
#

set -e

echo "=== PetsPaw Article Seeder ==="
echo ""

# Check credentials
if [ -z "$FIREBASE_SERVICE_ACCOUNT_KEY" ] && [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
  echo "❌ Error: No Firebase credentials found."
  echo ""
  echo "Set one of these:"
  echo "  export GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json"
  echo "  export FIREBASE_SERVICE_ACCOUNT_KEY='{...}'"
  exit 1
fi

echo "1. Saving current stripped datasets..."
cp lib/datasets/health-articles.ts lib/datasets/health-articles.ts.stripped
cp lib/datasets/homemade-food-articles.ts lib/datasets/homemade-food-articles.ts.stripped

echo "2. Restoring full-content datasets from git..."
git checkout HEAD -- lib/datasets/health-articles.ts lib/datasets/homemade-food-articles.ts

echo "3. Running seed script..."
npx tsx scripts/seed-firestore.ts

echo "4. Restoring stripped datasets..."
mv lib/datasets/health-articles.ts.stripped lib/datasets/health-articles.ts
mv lib/datasets/homemade-food-articles.ts.stripped lib/datasets/homemade-food-articles.ts

echo ""
echo "✅ Done! Articles with full content are now in Firestore."
echo "   Local datasets remain stripped (lightweight) for the app bundle."
