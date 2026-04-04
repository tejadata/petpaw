import type { Symptom } from "@/types/health";

export async function getSymptomAnalysis(symptoms: Symptom[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-openai-api-key-here") {
    throw new Error("OpenAI API key is not configured. Add NEXT_PUBLIC_OPENAI_API_KEY to .env.local");
  }

  const symptomList = symptoms
    .map((s) => `- ${s.name} (${s.severity}): ${s.description}`)
    .join("\n");

  const prompt = `You are a helpful veterinary assistant providing general educational information to dog owners.

A dog owner has reported the following symptoms in their dog:
${symptomList}

Please provide a concise response with the following sections:
1. **Overview** — A brief summary of what these symptoms together might suggest
2. **Possible Causes** — 2-3 likely causes (general and educational, not a diagnosis)
3. **What to Watch For** — Additional warning signs that would indicate worsening
4. **Recommended Actions** — Practical steps the owner can take right now
5. **Vet Urgency** — Whether this warrants an emergency visit, same-day appointment, or can wait for a routine consultation

Keep the tone calm, compassionate, and helpful. Always conclude with a reminder that this is educational information only and does not replace professional veterinary advice. Keep the response concise (under 350 words).`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Unable to generate analysis. Please try again.";
}
