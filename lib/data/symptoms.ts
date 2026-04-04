import { symptoms as staticSymptoms, warningRules as staticWarningRules } from "@/lib/datasets/symptoms";
import type { Symptom, SymptomWarningResult } from "@/types/health";

// Public symptom data always uses the curated static dataset.

export async function getSymptoms(): Promise<Symptom[]> {
  return staticSymptoms;
}

export async function checkSymptomWarnings(
  selectedSlugs: string[]
): Promise<SymptomWarningResult> {
  const allSymptoms = staticSymptoms;
  const selectedSymptoms = allSymptoms.filter((s) => selectedSlugs.includes(s.slug));

  // Check for matching warning rules (use static rules — complex to store in Firestore)
  for (const rule of staticWarningRules) {
    const ruleMatch = rule.symptomSlugs.every((slug) => selectedSlugs.includes(slug));
    if (ruleMatch) {
      return {
        severity: rule.severity,
        isEmergency: rule.isEmergency,
        warningMessage: rule.warningMessage,
        guidance: rule.guidance,
        selectedSymptoms,
      };
    }
  }

  // Check for any emergency-level individual symptoms
  const hasEmergency = selectedSymptoms.some((s) => s.severity === "Emergency");
  if (hasEmergency) {
    return {
      severity: "Emergency",
      isEmergency: true,
      warningMessage:
        "One or more of the selected symptoms may indicate a serious condition.",
      guidance:
        "Please contact your veterinarian or an emergency animal hospital immediately. These symptoms require prompt professional evaluation.",
      selectedSymptoms,
    };
  }

  // Check for severe symptoms
  const hasSevere = selectedSymptoms.some((s) => s.severity === "Severe");
  if (hasSevere) {
    return {
      severity: "Severe",
      isEmergency: false,
      warningMessage:
        "The selected symptoms may warrant prompt veterinary attention.",
      guidance:
        "We recommend scheduling an appointment with your veterinarian as soon as possible for a proper evaluation.",
      selectedSymptoms,
    };
  }

  // Check for multiple moderate symptoms
  const moderateCount = selectedSymptoms.filter((s) => s.severity === "Moderate").length;
  if (moderateCount >= 2) {
    return {
      severity: "Moderate",
      isEmergency: false,
      warningMessage:
        "Multiple symptoms together may indicate an underlying condition that should be evaluated.",
      guidance:
        "Consider scheduling a veterinary appointment to discuss these symptoms. Monitor your dog closely and note any changes.",
      selectedSymptoms,
    };
  }

  // Default mild response
  return {
    severity: "Mild",
    isEmergency: false,
    warningMessage:
      "The selected symptoms may be mild and temporary, but monitoring is always recommended.",
    guidance:
      "Keep an eye on your dog's condition. If symptoms persist for more than 24-48 hours or worsen, consult your veterinarian. This tool provides educational information only and is not a diagnostic tool.",
    selectedSymptoms,
  };
}
