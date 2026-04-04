"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useVendorAuthGuard } from "@/lib/hooks/use-vendor-auth-guard";
import { updateVendorProfile } from "@/lib/data/vendor/vendors";
import { ApprovalStatusBadge } from "@/components/vendor/approval-status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { STORE_TYPE_LABELS } from "@/types/vendor";

export default function VendorSettingsPage() {
  const { user, vendor } = useVendorAuthGuard();
  const router = useRouter();

  /* ── Profile fields ─────────────────────── */
  const [businessName, setBusinessName] = useState(vendor?.businessName ?? "");
  const [contactEmail, setContactEmail] = useState(vendor?.email ?? "");
  const [contactPhone, setContactPhone] = useState(vendor?.phone ?? "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  /* ── Password fields ────────────────────── */
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdError, setPwdError] = useState("");

  async function handleProfileSave() {
    if (!user) return;
    setProfileSaving(true);
    setProfileError("");
    setProfileSuccess("");
    try {
      await updateVendorProfile(user.uid, { businessName, email: contactEmail, phone: contactPhone });
      setProfileSuccess("Profile updated.");
    } catch {
      setProfileError("Failed to update profile.");
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordChange() {
    if (!user || !user.email) return;
    setPwdError("");
    setPwdSuccess("");
    if (newPwd.length < 8) {
      setPwdError("New password must be at least 8 characters.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError("Passwords do not match.");
      return;
    }
    setPwdSaving(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPwd);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPwd);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setPwdSuccess("Password changed successfully.");
    } catch {
      setPwdError("Failed to change password. Make sure your current password is correct.");
    } finally {
      setPwdSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your vendor account.</p>
      </div>

      {/* Account status */}
      {vendor && (
        <Card className="p-4 sm:p-6 space-y-3">
          <h2 className="text-lg font-semibold">Account Status</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Approval:</span>
              <ApprovalStatusBadge status={vendor.approvalStatus} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{STORE_TYPE_LABELS[vendor.storeType]}</span>
            </div>
          </div>
          {vendor.approvalStatus === "rejected" && vendor.rejectionReason && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              Rejection reason: {vendor.rejectionReason}
            </p>
          )}
        </Card>
      )}

      {/* Business profile */}
      <Card className="p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold">Business Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input id="contactPhone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
          </div>
        </div>
        {profileError && <p className="text-sm text-red-600">{profileError}</p>}
        {profileSuccess && <p className="text-sm text-green-600">{profileSuccess}</p>}
        <Button onClick={handleProfileSave} disabled={profileSaving}>
          {profileSaving ? "Saving…" : "Save Changes"}
        </Button>
      </Card>

      <Separator />

      {/* Change password */}
      <Card className="p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <p className="text-sm text-muted-foreground">Only available for email/password accounts.</p>
        <div className="grid gap-4 sm:max-w-sm">
          <div>
            <Label htmlFor="currentPwd">Current Password</Label>
            <Input id="currentPwd" type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="newPwd">New Password</Label>
            <Input id="newPwd" type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="confirmPwd">Confirm New Password</Label>
            <Input id="confirmPwd" type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
          </div>
        </div>
        {pwdError && <p className="text-sm text-red-600">{pwdError}</p>}
        {pwdSuccess && <p className="text-sm text-green-600">{pwdSuccess}</p>}
        <Button onClick={handlePasswordChange} disabled={pwdSaving}>
          {pwdSaving ? "Changing…" : "Change Password"}
        </Button>
      </Card>
    </div>
  );
}
