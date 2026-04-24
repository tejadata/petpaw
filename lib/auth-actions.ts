import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signOutAndRedirect(redirectTo: string) {
  await signOut(auth);
  window.location.replace(redirectTo);
}
