import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function getFavoriteIds(userId: string, type: string): Promise<string[]> {
  try {
    const snap = await getDoc(doc(db, "favorites", userId));
    if (!snap.exists()) return [];
    return (snap.data()?.[type] as string[]) ?? [];
  } catch {
    return [];
  }
}

export async function getFavoriteBreedIds(userId: string): Promise<string[]> {
  return getFavoriteIds(userId, "breeds");
}

export async function getFavoriteArticleIds(userId: string): Promise<string[]> {
  return getFavoriteIds(userId, "articles");
}

export async function getFavoriteProductIds(userId: string): Promise<string[]> {
  return getFavoriteIds(userId, "products");
}

async function toggleFavorite(userId: string, type: string, itemId: string): Promise<boolean> {
  const ref = doc(db, "favorites", userId);
  const snap = await getDoc(ref);
  const current: string[] = snap.exists() ? (snap.data()?.[type] ?? []) : [];
  const index = current.indexOf(itemId);
  if (index > -1) {
    current.splice(index, 1);
    await setDoc(ref, { [type]: current }, { merge: true });
    return false;
  } else {
    current.push(itemId);
    await setDoc(ref, { [type]: current }, { merge: true });
    return true;
  }
}

export async function toggleFavoriteBreed(userId: string, breedId: string): Promise<boolean> {
  return toggleFavorite(userId, "breeds", breedId);
}

export async function toggleFavoriteArticle(userId: string, articleId: string): Promise<boolean> {
  return toggleFavorite(userId, "articles", articleId);
}

export async function toggleFavoriteProduct(userId: string, productId: string): Promise<boolean> {
  return toggleFavorite(userId, "products", productId);
}
