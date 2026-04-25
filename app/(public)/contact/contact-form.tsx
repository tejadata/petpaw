"use client";

import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { APP_CONTACT_EMAIL } from "@/lib/constants";
import { Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or suggestion? We&apos;d love to hear from you.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            {[
              { icon: Mail, label: "Email", value: APP_CONTACT_EMAIL },
              { icon: MapPin, label: "Location", value: "India" },
              { icon: Clock, label: "Response Time", value: "Within 48 hours" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-bold">Send Us a Message</h2>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-8 text-center">
                  <p className="text-lg font-medium text-primary">Thank you!</p>
                  <p className="mt-2 text-muted-foreground">
                    We&apos;ll get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" required placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" required rows={5} placeholder="Tell us more..." />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
