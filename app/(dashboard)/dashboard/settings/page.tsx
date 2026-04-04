"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    try {
      await updateProfile(user, { displayName: name });
      setSaved(true);
      setProfileError("");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setProfileError("Failed to update profile. Please try again.");
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user || !user.email) return;
    const form = e.currentTarget;
    const current = (form.elements.namedItem("currentPassword") as HTMLInputElement).value;
    const next = (form.elements.namedItem("newPassword") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirmNewPassword") as HTMLInputElement).value;
    if (next !== confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email, current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, next);
      setPasswordSaved(true);
      setPasswordError("");
      form.reset();
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch {
      setPasswordError("Incorrect current password or session expired.");
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;
    const confirmed = window.confirm(
      "Are you sure? This will permanently delete your account and all data."
    );
    if (!confirmed) return;
    try {
      await deleteUser(user);
      router.push("/");
    } catch {
      setDeleteError("Please sign out and sign back in before deleting your account.");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-1 text-muted-foreground">
        Manage your account settings and preferences.
      </p>

      <div className="mt-8 max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Profile Information</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={user?.displayName ?? ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email ?? ""} disabled readOnly />
                </div>
              </div>
              {profileError && <p className="text-sm text-red-600">{profileError}</p>}
              <Button type="submit">
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Change Password</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" name="newPassword" type="password" autoComplete="new-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input id="confirmNewPassword" name="confirmNewPassword" type="password" autoComplete="new-password" />
                </div>
              </div>
              {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
              <Button type="submit" variant="outline">
                {passwordSaved ? "Password Updated!" : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-900/20">
          <CardHeader>
            <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Deleting your account will permanently remove all your data, including dog profiles,
              favorites, and reminders. This action cannot be undone.
            </p>
            {deleteError && <p className="mt-2 text-sm text-red-600">{deleteError}</p>}
            <Button
              variant="outline"
              className="mt-4 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
