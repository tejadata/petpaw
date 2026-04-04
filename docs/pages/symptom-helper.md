# Symptom Helper

## Purpose

AI-powered dog symptom checker that uses OpenAI GPT-4o to provide preliminary veterinary guidance based on symptoms described by the user. Includes built-in emergency detection and medical disclaimers.

## Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/symptom-helper` | `app/(public)/symptom-helper/page.tsx` | Client | Symptom analysis interface |

## Key Files

| File | Purpose |
|---|---|
| `app/(public)/symptom-helper/page.tsx` | UI for symptom input and results display |
| `lib/llm/symptom-check.ts` | `getSymptomAnalysis()` — OpenAI GPT-4o API call |
| `lib/data/symptoms.ts` | `getSymptoms()`, `checkSymptomWarnings()` |
| `lib/datasets/symptoms.ts` | Static symptom database + warning rules |
| `types/health.ts` | `Symptom`, `SymptomWarningResult` |
| `components/shared/emergency-banner.tsx` | Emergency alert banner |
| `components/shared/disclaimer-block.tsx` | Medical disclaimer |

## Data Sources

| Source | Purpose |
|---|---|
| `lib/datasets/symptoms.ts` | Pre-defined symptom list and emergency warning rules |
| OpenAI GPT-4o | Real-time symptom analysis via `getSymptomAnalysis()` |

## How It Works

1. User describes symptoms (text input or selects from predefined list)
2. `checkSymptomWarnings()` runs client-side rules against the symptoms dataset for emergency detection
3. If emergency symptoms detected → shows `EmergencyBanner`
4. `getSymptomAnalysis()` sends structured prompt to GPT-4o
5. GPT-4o returns preliminary guidance
6. Results displayed with prominent `DisclaimerBlock` (not a substitute for veterinary care)

## Environment

- Requires `OPENAI_API_KEY` environment variable
- If not configured, feature degrades gracefully

## How to Edit

| Change | File |
|---|---|
| Symptom list | `lib/datasets/symptoms.ts` → `symptoms` array |
| Warning rules | `lib/datasets/symptoms.ts` → `warningRules` array |
| AI prompt | `lib/llm/symptom-check.ts` → prompt construction |
| UI layout | `app/(public)/symptom-helper/page.tsx` |
| Emergency banner | `components/shared/emergency-banner.tsx` |
| Disclaimer text | `components/shared/disclaimer-block.tsx` |

## Notes

- This is a client component — no SSR metadata
- The LLM call happens client-side (API key exposed via env)
- Disclaimer is critical — must always be visible to users
- Emergency detection is rule-based (not AI) for reliability
