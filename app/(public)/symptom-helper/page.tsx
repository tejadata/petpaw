"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmergencyBanner } from "@/components/shared/emergency-banner";
import { DisclaimerBlock } from "@/components/shared/disclaimer-block";
import { AlertTriangle, CheckCircle, Info, Phone, Sparkles, AlertCircle } from "lucide-react";
import { getSymptoms, checkSymptomWarnings } from "@/lib/data/symptoms";
import type { Symptom, SymptomWarningResult } from "@/types/health";

export default function SymptomHelperPage() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<SymptomWarningResult | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  async function loadSymptoms() {
    const data = await getSymptoms();
    setSymptoms(data);
    setLoaded(true);
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const slug = e.target.value;
    const checked = e.target.checked;
    setSelected((prev) =>
      checked ? [...prev, slug] : prev.filter((s) => s !== slug)
    );
    setResult(null);
    setLlmResponse(null);
    setLlmError(null);
  }

  async function checkSymptoms() {
    if (selected.length === 0) return;
    setLoading(true);
    setLlmResponse(null);
    setLlmError(null);

    try {
      const selectedSymptomObjects = symptoms.filter((s) => selected.includes(s.slug));
      const [data, aiText] = await Promise.allSettled([
        checkSymptomWarnings(selected),
        import("@/lib/llm/symptom-check").then((mod) => mod.getSymptomAnalysis(selectedSymptomObjects)),
      ]);

      if (data.status === "fulfilled") setResult(data.value);
      if (aiText.status === "fulfilled") {
        setLlmResponse(aiText.value);
      } else {
        setLlmError("AI analysis unavailable right now. Rule-based guidance is shown above.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  function reset() {
    setSelected([]);
    setResult(null);
    setLlmResponse(null);
    setLlmError(null);
  }

  const severityColors: Record<string, string> = {
    Mild: "bg-blue-500 text-white border-blue-500",
    Moderate: "bg-amber-500 text-white border-amber-500",
    Severe: "bg-orange-600 text-white border-orange-600",
    Emergency: "bg-red-600 text-white border-red-600",
  };

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        title="Symptom Helper"
        description="Select the symptoms your dog is experiencing. This tool provides general educational guidance — it is not a diagnostic tool."
      />

      <EmergencyBanner className="mt-8" />
      <DisclaimerBlock className="mt-4" />

      {!loaded ? (
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            This tool is for educational purposes only. By continuing, you acknowledge this
            is not a substitute for veterinary care.
          </p>
          <Button onClick={loadSymptoms} size="lg">
            I Understand — Show Symptom Checker
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Select Symptoms</h2>
                <p className="text-sm text-muted-foreground">
                  Check all symptoms your dog is currently experiencing.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {symptoms.map((symptom) => (
                    <label
                      key={symptom.id}
                      htmlFor={`symptom-${symptom.slug}`}
                      className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={`symptom-${symptom.slug}`}
                        value={symptom.slug}
                        checked={selected.includes(symptom.slug)}
                        onChange={handleCheckboxChange}
                        className="mt-1 h-4 w-4 shrink-0 accent-primary"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {symptom.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {symptom.description}
                        </p>
                        <Badge variant="outline" className={severityColors[symptom.severity]}>
                          {symptom.severity}
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    type="button"
                    onClick={checkSymptoms}
                    disabled={selected.length === 0 || loading}
                  >
                    {loading ? "Checking..." : "Check Symptoms"}
                  </Button>
                  <Button type="button" variant="outline" onClick={reset}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div ref={resultRef} className="scroll-mt-20">
            {result ? (
              <div className="space-y-4">
                <Card
                  className={
                    result.isEmergency
                      ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                      : ""
                  }
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {result.isEmergency ? (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      ) : result.severity === "Mild" ? (
                        <Info className="h-5 w-5 text-blue-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      )}
                      <h3 className="text-lg font-bold">
                        {result.severity} Level
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{result.warningMessage}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.guidance}
                    </p>
                    {result.isEmergency && (
                      <div className="rounded-lg bg-red-100 p-4 dark:bg-red-900/20">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-red-600" />
                          <p className="text-sm font-medium text-red-700 dark:text-red-400">
                            Contact your vet or emergency animal hospital immediately
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        Selected symptoms:
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {result.selectedSymptoms.map((s) => (
                          <Badge key={s.id} variant="outline" className="text-xs">
                            {s.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Analysis Card */}
                {llmResponse ? (
                  <Card className="border-purple-200 dark:border-purple-800">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <h3 className="text-lg font-bold">AI Analysis</h3>
                        <Badge variant="outline" className="text-xs ml-auto">GPT-4o</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                        {llmResponse}
                      </div>
                    </CardContent>
                  </Card>
                ) : llmError ? (
                  <Card className="border-amber-200 dark:border-amber-800">
                    <CardContent className="py-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-amber-700 dark:text-amber-400">{llmError}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            ) : loading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-purple-500 animate-pulse" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Analyzing symptoms with AI...
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Select symptoms and click &quot;Check Symptoms&quot; to see guidance.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
