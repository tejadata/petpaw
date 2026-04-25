"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .regex(
      /^(\+91|91)?[6-9]\d{9}$/,
      "Please enter a valid Indian mobile number (10 digits starting with 6-9)",
    ),
  allowCalls: z.boolean().optional().default(false),
});

type ContactFormData = {
  email: string;
  mobile: string;
  allowCalls?: boolean;
};

interface PriceUnlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: ContactFormData) => void;
  loading?: boolean;
}

export function PriceUnlockModal({
  open,
  onOpenChange,
  onSuccess,
  loading = false,
}: PriceUnlockModalProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      allowCalls: false,
    },
  });

  const allowCallsValue = watch("allowCalls");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      // Clean mobile number (remove +91 prefix if present)
      const cleanMobile = data.mobile.replace(/^(\+91|91)/, "");
      const cleanData = {
        email: data.email,
        mobile: cleanMobile,
        allowCalls: data.allowCalls ?? false,
      };
      await onSuccess(cleanData);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>View Price</DialogTitle>
          <DialogDescription>
            Please provide your contact details to view pricing information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              disabled={submitting || loading}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="9876543210"
              {...register("mobile")}
              disabled={submitting || loading}
            />
            <p className="text-xs text-muted-foreground">
              Enter 10-digit Indian mobile number (without +91)
            </p>
            {errors.mobile && (
              <p className="text-sm text-red-600">{errors.mobile.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowCalls"
              checked={allowCallsValue}
              onCheckedChange={(checked) => {
                setValue("allowCalls", checked as boolean);
              }}
              disabled={submitting || loading}
            />
            <Label htmlFor="allowCalls" className="text-sm">
              I agree to receive calls from PawMatch for product inquiries
            </Label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={submitting || loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || loading}
              className="flex-1"
            >
              {submitting || loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {loading ? "Loading..." : "Submitting..."}
                </>
              ) : (
                "View Price"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
