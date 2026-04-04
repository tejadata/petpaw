import type { Symptom } from "@/types/health";

export const symptoms: Symptom[] = [
  { id: "sym-1", name: "Vomiting", slug: "vomiting", description: "Forceful emptying of stomach contents", severity: "Moderate" },
  { id: "sym-2", name: "Diarrhea", slug: "diarrhea", description: "Loose or watery stools", severity: "Moderate" },
  { id: "sym-3", name: "Loss of appetite", slug: "loss-of-appetite", description: "Refusing food or eating significantly less than usual", severity: "Mild" },
  { id: "sym-4", name: "Lethargy", slug: "lethargy", description: "Unusual tiredness, lack of energy, or withdrawal from normal activities", severity: "Moderate" },
  { id: "sym-5", name: "Excessive thirst", slug: "excessive-thirst", description: "Drinking significantly more water than usual", severity: "Mild" },
  { id: "sym-6", name: "Frequent urination", slug: "frequent-urination", description: "Urinating more often or in larger amounts than normal", severity: "Mild" },
  { id: "sym-7", name: "Coughing", slug: "coughing", description: "Persistent or forceful coughing", severity: "Moderate" },
  { id: "sym-8", name: "Difficulty breathing", slug: "difficulty-breathing", description: "Labored, rapid, or wheezing breathing", severity: "Emergency" },
  { id: "sym-9", name: "Limping", slug: "limping", description: "Favoring one or more legs while walking", severity: "Moderate" },
  { id: "sym-10", name: "Scratching excessively", slug: "scratching", description: "Persistent scratching, biting, or licking at skin", severity: "Mild" },
  { id: "sym-11", name: "Bloated abdomen", slug: "bloated-abdomen", description: "Swollen or distended belly that may feel hard", severity: "Emergency" },
  { id: "sym-12", name: "Seizures", slug: "seizures", description: "Uncontrolled shaking, convulsions, or loss of consciousness", severity: "Emergency" },
  { id: "sym-13", name: "Bleeding", slug: "bleeding", description: "Visible blood from any part of the body", severity: "Severe" },
  { id: "sym-14", name: "Collapse", slug: "collapse", description: "Sudden inability to stand or loss of consciousness", severity: "Emergency" },
  { id: "sym-15", name: "Eye discharge", slug: "eye-discharge", description: "Unusual discharge, redness, or squinting in one or both eyes", severity: "Mild" },
  { id: "sym-16", name: "Ear scratching", slug: "ear-scratching", description: "Persistent scratching at ears, head shaking, or ear odor", severity: "Mild" },
  { id: "sym-17", name: "Weight loss", slug: "weight-loss", description: "Unexplained loss of weight over days or weeks", severity: "Moderate" },
  { id: "sym-18", name: "Hair loss", slug: "hair-loss", description: "Patches of missing fur or thinning coat", severity: "Mild" },
  { id: "sym-19", name: "Swelling", slug: "swelling", description: "Unusual lumps, bumps, or swelling on any part of the body", severity: "Moderate" },
  { id: "sym-20", name: "Pale gums", slug: "pale-gums", description: "Gums that appear white, pale, or bluish instead of healthy pink", severity: "Severe" },
];

export interface WarningRule {
  symptomSlugs: string[];
  severity: "Mild" | "Moderate" | "Severe" | "Emergency";
  isEmergency: boolean;
  warningMessage: string;
  guidance: string;
}

export const warningRules: WarningRule[] = [
  {
    symptomSlugs: ["difficulty-breathing", "collapse"],
    severity: "Emergency",
    isEmergency: true,
    warningMessage: "These symptoms together may indicate a life-threatening emergency.",
    guidance: "Please seek immediate veterinary attention. Contact your nearest emergency veterinary clinic or animal hospital right away. Do not wait.",
  },
  {
    symptomSlugs: ["bloated-abdomen", "vomiting"],
    severity: "Emergency",
    isEmergency: true,
    warningMessage: "Bloating combined with vomiting can be a sign of a serious condition that may require urgent care.",
    guidance: "This combination of symptoms may indicate a condition that can become life-threatening quickly. Please contact your veterinarian or an emergency animal hospital immediately.",
  },
  {
    symptomSlugs: ["seizures"],
    severity: "Emergency",
    isEmergency: true,
    warningMessage: "Seizures require prompt veterinary evaluation.",
    guidance: "Keep your dog safe during a seizure (away from stairs and sharp objects). Do not put anything in their mouth. Time the seizure and contact your veterinarian or emergency clinic immediately.",
  },
  {
    symptomSlugs: ["bleeding", "pale-gums"],
    severity: "Severe",
    isEmergency: true,
    warningMessage: "Bleeding combined with pale gums may indicate significant blood loss.",
    guidance: "Apply gentle pressure to any visible wounds with a clean cloth. Seek immediate veterinary care. This combination requires urgent professional attention.",
  },
  {
    symptomSlugs: ["vomiting", "diarrhea", "lethargy"],
    severity: "Severe",
    isEmergency: false,
    warningMessage: "Multiple gastrointestinal symptoms combined with lethargy should be evaluated by a veterinarian.",
    guidance: "Withhold food for a few hours but ensure access to water. If symptoms persist beyond 24 hours, worsen, or if you notice blood, contact your veterinarian promptly.",
  },
  {
    symptomSlugs: ["excessive-thirst", "frequent-urination", "weight-loss"],
    severity: "Moderate",
    isEmergency: false,
    warningMessage: "This combination of symptoms may relate to metabolic or hormonal conditions.",
    guidance: "Schedule a veterinary appointment soon for bloodwork and urinalysis. These symptoms together can indicate conditions that benefit from early detection and management.",
  },
];
