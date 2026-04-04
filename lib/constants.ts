export const APP_NAME = "PawMatch";
export const APP_DESCRIPTION =
  "Find your perfect dog breed match, get trusted health tips, and discover the best products for your furry friend.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const NAV_LINKS = [
  { label: "Breeds", href: "/breeds" },
  { label: "Quiz", href: "/quiz" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Pet Care", href: "/pet-care" },
  { label: "Symptom Helper", href: "/symptom-helper" },
] as const;

export const FOOTER_LINKS = {
  discover: [
    { label: "Browse Breeds", href: "/breeds" },
    { label: "Breed Quiz", href: "/quiz" },
    { label: "Compare Breeds", href: "/compare" },
    { label: "Marketplace", href: "/marketplace" },
  ],
  health: [
    { label: "Pet Care", href: "/pet-care" },
    { label: "Health Tips", href: "/health" },
    { label: "Homemade Food", href: "/homemade-food" },
    { label: "Symptom Helper", href: "/symptom-helper" },
  ],
  resources: [
    { label: "Products", href: "/products" },
    { label: "Sell on PawMatch", href: "/vendor/login" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const SIZE_CATEGORIES = ["Small", "Medium", "Large", "Giant"] as const;
export type SizeCategory = (typeof SIZE_CATEGORIES)[number];

export const AGE_GROUPS = ["Puppy", "Adult", "Senior", "All"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const ACTIVITY_LEVELS = ["Low", "Moderate", "High", "Very High"] as const;
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];

export const REMINDER_TYPES = [
  "Vaccination",
  "Deworming",
  "Grooming",
  "Vet Visit",
  "Medication",
  "Daily Care",
  "Wellness",
] as const;
export type ReminderType = (typeof REMINDER_TYPES)[number];

export const RECURRING_FREQUENCIES = [
  "Once",
  "Daily",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Quarterly",
  "Yearly",
] as const;
export type RecurringFrequency = (typeof RECURRING_FREQUENCIES)[number];

export const PRODUCT_CATEGORIES = [
  "Food",
  "Toys",
  "Grooming",
  "Beds",
  "Crates",
  "Bowls",
  "Collars",
  "Harnesses",
  "Training",
  "Healthcare",
] as const;

export const HEALTH_CATEGORIES_LIST = [
  "Puppy Care",
  "Adult Dog Care",
  "Senior Dog Care",
  "Preventive Care",
  "Nutrition",
  "Exercise & Fitness",
  "Grooming",
  "Dental Care",
  "Mental Health",
] as const;

export const CLIMATES = ["Cold", "Temperate", "Hot", "Any"] as const;
export type Climate = (typeof CLIMATES)[number];
