import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ContactData {
  email: string;
  mobile: string;
  allowCalls: boolean;
  timestamp: Date;
  source: string; // e.g., "marketplace_price_unlock"
}

export async function storeContactData(data: Omit<ContactData, "timestamp">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      ...data,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error storing contact data:", error);
    throw new Error("Failed to store contact information");
  }
}