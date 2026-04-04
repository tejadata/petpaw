import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/** Format a number as Indian Rupees: ₹1,25,000 */
export function formatCurrencyInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Convert lbs to kg and format: "25 kg" */
export function formatWeightKg(lbs: number): string {
  const kg = Math.round(lbs * 0.453592 * 10) / 10;
  return `${kg} kg`;
}

/** Format an Indian postal address as a single string */
export function formatIndianAddress(store: {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}): string {
  return [store.address, store.city, store.state, store.postalCode, store.country]
    .filter(Boolean)
    .join(", ");
}

/** Generate a random 20-char ID (no external dependency) */
export function nanoid(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function traitLabel(value: number): string {
  if (value <= 1) return "Very Low";
  if (value <= 2) return "Low";
  if (value <= 3) return "Moderate";
  if (value <= 4) return "High";
  return "Very High";
}

export function suitabilityLabel(value: number): string {
  if (value <= 1) return "Not Recommended";
  if (value <= 2) return "Below Average";
  if (value <= 3) return "Average";
  if (value <= 4) return "Good";
  return "Excellent";
}
