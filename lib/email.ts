import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

let initialized = false;

function ensureInit() {
  if (!initialized && PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
    initialized = true;
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export async function sendReminderEmail(params: {
  toEmail: string;
  toName: string;
  reminderTitle: string;
  petName: string | null;
  dueDate: string;
  reminderType: string;
  priority: string;
  notes?: string | null;
}): Promise<boolean> {
  if (!isEmailConfigured()) return false;

  ensureInit();

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: params.toEmail,
      to_name: params.toName,
      reminder_title: params.reminderTitle,
      pet_name: params.petName ?? "N/A",
      due_date: params.dueDate,
      reminder_type: params.reminderType,
      priority: params.priority,
      notes: params.notes ?? "",
    });
    return true;
  } catch (error) {
    console.error("Failed to send reminder email:", error);
    return false;
  }
}
