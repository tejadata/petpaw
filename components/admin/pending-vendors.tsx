"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  Store,
} from "lucide-react";
import {
  getPendingVendors,
  approveVendor,
  rejectVendor,
} from "@/lib/data/vendor/vendors";
import { STORE_TYPE_LABELS } from "@/types/vendor";
import type { Vendor } from "@/types/vendor";
import Link from "next/link";

export function PendingVendorsWidget() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    loadPendingVendors();
  }, []);

  async function loadPendingVendors() {
    setLoading(true);
    try {
      const pending = await getPendingVendors();
      setVendors(pending);
    } catch (error) {
      console.error("Error loading pending vendors:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(vendorId: string) {
    setActionLoading(vendorId);
    try {
      await approveVendor(vendorId);
      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
    } catch (error) {
      console.error("Error approving vendor:", error);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(vendorId: string) {
    if (!rejectionReason.trim()) return;
    setActionLoading(vendorId);
    try {
      await rejectVendor(vendorId, rejectionReason);
      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedVendor(null);
    } catch (error) {
      console.error("Error rejecting vendor:", error);
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-orange-600" />
            Pending Vendor Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-24 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-orange-600" />
            Pending Vendor Approvals
            {vendors.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {vendors.length}
              </Badge>
            )}
          </CardTitle>
          <Link href="/admin/vendors">
            <Button variant="outline" size="sm">
              View All Vendors
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {vendors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <p className="mt-2 text-sm font-medium">All caught up!</p>
              <p className="text-sm text-muted-foreground">
                No pending vendor applications to review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{vendor.businessName}</p>
                      <Badge variant="outline" className="text-xs">
                        {STORE_TYPE_LABELS[vendor.storeType]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {vendor.ownerName} &middot; {vendor.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.city}, {vendor.state} &middot; Applied{" "}
                      {vendor.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* View Details */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" title="View details">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{vendor.businessName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 text-sm">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">
                                Owner
                              </Label>
                              <p>{vendor.ownerName}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">
                                Email
                              </Label>
                              <p>{vendor.email}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">
                                Phone
                              </Label>
                              <p>{vendor.phone}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">
                                Store Type
                              </Label>
                              <p>{STORE_TYPE_LABELS[vendor.storeType]}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">
                                Location
                              </Label>
                              <p>
                                {vendor.address}, {vendor.city}, {vendor.state}{" "}
                                {vendor.postalCode}
                              </p>
                            </div>
                            {vendor.licenseNumber && (
                              <div>
                                <Label className="text-xs font-medium text-muted-foreground">
                                  License #
                                </Label>
                                <p>{vendor.licenseNumber}</p>
                              </div>
                            )}
                            {vendor.taxId && (
                              <div>
                                <Label className="text-xs font-medium text-muted-foreground">
                                  Tax ID
                                </Label>
                                <p>{vendor.taxId}</p>
                              </div>
                            )}
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">
                              Description
                            </Label>
                            <p className="text-muted-foreground">
                              {vendor.description}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Approve */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleApprove(vendor.id)}
                      disabled={actionLoading === vendor.id}
                      title="Approve vendor"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>

                    {/* Reject */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        setSelectedVendor(vendor);
                        setShowRejectDialog(true);
                      }}
                      disabled={actionLoading === vendor.id}
                      title="Reject vendor"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Reject {selectedVendor?.businessName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="rejection-reason">
                Rejection Reason <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="rejection-reason"
                placeholder="Provide a reason for rejecting this vendor application..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setRejectionReason("");
                  setSelectedVendor(null);
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={
                !rejectionReason.trim() ||
                actionLoading === selectedVendor?.id
              }
              onClick={() =>
                selectedVendor && handleReject(selectedVendor.id)
              }
            >
              {actionLoading === selectedVendor?.id
                ? "Rejecting..."
                : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
