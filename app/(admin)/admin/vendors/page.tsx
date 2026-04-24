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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Eye, AlertCircle } from "lucide-react";
import {
  getPendingVendors,
  getAllVendors,
  approveVendor,
  rejectVendor,
} from "@/lib/data/vendor/vendors";
import { STORE_TYPE_LABELS, APPROVAL_STATUS_LABELS } from "@/types/vendor";
import type { Vendor } from "@/types/vendor";

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

  useEffect(() => {
    loadVendors();
  }, []);

  async function loadVendors() {
    setLoading(true);
    try {
      const allVendors = await getAllVendors();
      setVendors(allVendors);
    } catch (error) {
      console.error("Error loading vendors:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredVendors = vendors.filter((vendor) => {
    if (filter === "all") return true;
    return vendor.approvalStatus === filter;
  });

  async function handleApprove(vendorId: string) {
    try {
      await approveVendor(vendorId);
      await loadVendors();
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  }

  async function handleReject(vendorId: string) {
    if (!rejectionReason.trim()) return;

    try {
      await rejectVendor(vendorId, rejectionReason);
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedVendor(null);
      await loadVendors();
    } catch (error) {
      console.error("Error rejecting vendor:", error);
    }
  }

  const getStatusBadge = (status: Vendor["approvalStatus"]) => {
    const variants = {
      pending: "secondary" as const,
      approved: "default" as const,
      rejected: "destructive" as const,
      suspended: "outline" as const,
    };

    return (
      <Badge variant={variants[status]}>{APPROVAL_STATUS_LABELS[status]}</Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <p className="mt-1 text-muted-foreground">
            Review and manage vendor applications ({vendors.length} total
            vendors).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex gap-2">
        {[
          {
            key: "pending",
            label: "Pending Review",
            count: vendors.filter((v) => v.approvalStatus === "pending").length,
          },
          {
            key: "approved",
            label: "Approved",
            count: vendors.filter((v) => v.approvalStatus === "approved")
              .length,
          },
          {
            key: "rejected",
            label: "Rejected",
            count: vendors.filter((v) => v.approvalStatus === "rejected")
              .length,
          },
          { key: "all", label: "All Vendors", count: vendors.length },
        ].map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(key as any)}
          >
            {label} ({count})
          </Button>
        ))}
      </div>

      {/* Vendors Table */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Business</th>
                  <th className="px-4 py-3 text-left font-medium">Owner</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Location</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Applied</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{vendor.businessName}</div>
                        <div className="text-xs text-muted-foreground">
                          {vendor.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {vendor.ownerName}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">
                        {STORE_TYPE_LABELS[vendor.storeType]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {vendor.city}, {vendor.state}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(vendor.approvalStatus)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {vendor.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Vendor Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                  <Label className="text-sm font-medium">
                                    Business Name
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {vendor.businessName}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">
                                    Owner Name
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {vendor.ownerName}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">
                                    Email
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {vendor.email}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">
                                    Phone
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {vendor.phone}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">
                                    Store Type
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {STORE_TYPE_LABELS[vendor.storeType]}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">
                                    Status
                                  </Label>
                                  <div className="mt-1">
                                    {getStatusBadge(vendor.approvalStatus)}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Address
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {vendor.address}, {vendor.city},{" "}
                                  {vendor.state} {vendor.postalCode},{" "}
                                  {vendor.country}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Description
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {vendor.description}
                                </p>
                              </div>
                              {vendor.licenseNumber && (
                                <div>
                                  <Label className="text-sm font-medium">
                                    License Number
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {vendor.licenseNumber}
                                  </p>
                                </div>
                              )}
                              {vendor.rejectionReason && (
                                <div>
                                  <Label className="text-sm font-medium text-red-600">
                                    Rejection Reason
                                  </Label>
                                  <p className="text-sm text-red-600">
                                    {vendor.rejectionReason}
                                  </p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {vendor.approvalStatus === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(vendor.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVendor(vendor);
                                setShowRejectDialog(true);
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Reject Vendor Application
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a reason for rejecting this vendor application.
              This will be visible to the vendor.
            </p>
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason *</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Please explain why this application is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowRejectDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  selectedVendor && handleReject(selectedVendor.id)
                }
                disabled={!rejectionReason.trim()}
              >
                Reject Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
