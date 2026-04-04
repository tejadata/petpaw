import type { VaccineScheduleTemplate } from "@/types/vaccination";

/**
 * India-oriented puppy & dog vaccination schedule.
 *
 * IMPORTANT: This is educational scheduling guidance only — not veterinary advice.
 * Always consult a qualified veterinarian for your pet's vaccination plan.
 *
 * Day offsets are calculated from the first dose date (day 0).
 * The default template assumes the first dose is given around 6 weeks of age.
 *
 * To edit this schedule:
 *   1. Modify or add dose entries in the `doses` array below.
 *   2. `dayOffsetFromStart` is relative to the first dose date the user enters.
 *   3. Add new templates by appending to the `VACCINATION_TEMPLATES` array.
 *   4. Set `isDefault: true` on exactly one template per species + countryCode.
 */

const INDIA_PUPPY_SCHEDULE: VaccineScheduleTemplate = {
  id: "india-puppy-standard",
  name: "India Standard Puppy Vaccination Schedule",
  countryCode: "IN",
  species: "Dog",
  lifeStage: "puppy",
  isDefault: true,
  doses: [
    {
      vaccineCode: "DHPPi-1",
      vaccineName: "DHPPi (Distemper, Hepatitis, Parvo, Parainfluenza)",
      doseLabel: "1st Dose",
      dayOffsetFromStart: 0,
      recommendedAgeLabel: "6–8 weeks",
      notes: "First combination vaccine. May also be labelled DP or Canine Distemper-Parvovirus.",
    },
    {
      vaccineCode: "DHPPi-2",
      vaccineName: "DHPPi Booster",
      doseLabel: "2nd Dose (Booster)",
      dayOffsetFromStart: 21,
      recommendedAgeLabel: "9–11 weeks",
      notes: "Booster dose given 3 weeks after the first combination vaccine.",
    },
    {
      vaccineCode: "DHPPi-3",
      vaccineName: "DHPPi Booster",
      doseLabel: "3rd Dose (Booster)",
      dayOffsetFromStart: 42,
      recommendedAgeLabel: "12–13 weeks",
      notes: "Second booster for stronger immunity. Some vets combine with anti-rabies.",
    },
    {
      vaccineCode: "RABIES-1",
      vaccineName: "Anti-Rabies",
      doseLabel: "1st Rabies Dose",
      dayOffsetFromStart: 42,
      recommendedAgeLabel: "12–13 weeks",
      notes: "Mandatory in India. Often given alongside the 3rd DHPPi dose.",
    },
    {
      vaccineCode: "DHPPi-4",
      vaccineName: "DHPPi Final Booster",
      doseLabel: "4th Dose (Final Puppy Booster)",
      dayOffsetFromStart: 63,
      recommendedAgeLabel: "15–16 weeks",
      notes: "Final puppy booster. Completes primary immunisation series.",
    },
    {
      vaccineCode: "KC",
      vaccineName: "Kennel Cough (Bordetella)",
      doseLabel: "Optional Dose",
      dayOffsetFromStart: 63,
      recommendedAgeLabel: "15–16 weeks",
      notes: "Recommended if the puppy will be socialised in boarding, parks, or training classes.",
    },
    {
      vaccineCode: "DHPPi-ANNUAL",
      vaccineName: "DHPPi Annual Booster",
      doseLabel: "Yearly Booster",
      dayOffsetFromStart: 365,
      recommendedAgeLabel: "~1 year after first dose",
      notes: "Annual booster to maintain immunity. Repeat every year.",
    },
    {
      vaccineCode: "RABIES-ANNUAL",
      vaccineName: "Anti-Rabies Annual Booster",
      doseLabel: "Yearly Rabies Booster",
      dayOffsetFromStart: 365,
      recommendedAgeLabel: "~1 year after first rabies dose",
      notes: "Annual rabies booster as required by Indian regulations.",
    },
  ],
};

/**
 * All available vaccination templates.
 * Add new templates (adult dog, breed-specific, etc.) here.
 */
export const VACCINATION_TEMPLATES: VaccineScheduleTemplate[] = [
  INDIA_PUPPY_SCHEDULE,
];

/**
 * Get the default template for a given species and country.
 */
export function getDefaultTemplate(
  species = "Dog",
  countryCode = "IN"
): VaccineScheduleTemplate | undefined {
  return VACCINATION_TEMPLATES.find(
    (t) => t.species === species && t.countryCode === countryCode && t.isDefault
  );
}

/**
 * Get a template by its id.
 */
export function getTemplateById(
  id: string
): VaccineScheduleTemplate | undefined {
  return VACCINATION_TEMPLATES.find((t) => t.id === id);
}
