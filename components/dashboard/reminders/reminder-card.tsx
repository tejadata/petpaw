"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/dashboard/shared/confirm-delete-dialog";
import { Bell, CheckCircle, Circle, Pencil, Mail, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Reminder } from "@/types/reminder";

const PRIORITY_STYLES = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

interface ReminderCardProps {
  reminder: Reminder;
  userEmail?: string | null;
  userName?: string | null;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, userEmail, userName, onToggleComplete, onDelete }: ReminderCardProps) {
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const isOverdue =
    !reminder.completed && reminder.scheduledDate < new Date();

  async function handleSendEmail() {
    if (!userEmail || emailSending) return;
    setEmailSending(true);
    try {
      const { sendReminderEmail, isEmailConfigured } = await import("@/lib/email");
      if (!isEmailConfigured()) {
        alert("Email is not configured. Add EmailJS keys to .env.local.");
        return;
      }
      const success = await sendReminderEmail({
        toEmail: userEmail,
        toName: userName ?? "Pet Parent",
        reminderTitle: reminder.title,
        petName: reminder.petName,
        dueDate: reminder.scheduledDate.toLocaleDateString(),
        reminderType: reminder.type.replace(/([A-Z])/g, " $1").trim(),
        priority: reminder.priority,
        notes: reminder.description,
      });
      if (success) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      } else {
        alert("Failed to send email. Check your EmailJS configuration.");
      }
    } catch {
      alert("Failed to send email.");
    } finally {
      setEmailSending(false);
    }
  }

  return (
    <Card className={cn("transition-shadow hover:shadow-sm", reminder.completed && "opacity-60")}>
      <CardContent className="flex items-start gap-3 p-4">
        {/* Complete toggle */}
        <button
          onClick={() => onToggleComplete(reminder.id, !reminder.completed)}
          className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors"
          aria-label={reminder.completed ? "Mark incomplete" : "Mark complete"}
        >
          {reminder.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn("font-medium", reminder.completed && "line-through text-muted-foreground")}>
            {reminder.title}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{reminder.type.replace(/([A-Z])/g, " $1").trim()}</span>
            {reminder.petName && <span>· {reminder.petName}</span>}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-medium border",
                PRIORITY_STYLES[reminder.priority]
              )}
            >
              {reminder.priority}
            </span>
            <span className={cn(isOverdue && "text-red-500 font-medium")}>
              {isOverdue ? "Overdue · " : ""}
              {reminder.scheduledDate.toLocaleDateString()}
            </span>
            {reminder.recurringFrequency !== "Once" && (
              <span className="rounded-full bg-muted px-2 py-0.5">{reminder.recurringFrequency}</span>
            )}
          </div>
          {reminder.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{reminder.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-1">
          {userEmail && !reminder.completed && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={handleSendEmail}
              disabled={emailSending}
              aria-label="Send email reminder"
              title={emailSent ? "Email sent!" : "Send email reminder"}
            >
              {emailSending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : emailSent ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Mail className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
          <Button size="icon" variant="ghost" className="h-7 w-7" asChild>
            <Link href={`/dashboard/reminders/edit?id=${reminder.id}`} aria-label="Edit reminder">
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <ConfirmDeleteDialog
            title="Delete this reminder?"
            description="This reminder will be permanently removed."
            onConfirm={() => onDelete(reminder.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
