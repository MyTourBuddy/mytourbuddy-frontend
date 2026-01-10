"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { LuMousePointerClick } from "react-icons/lu";
import { TbArrowRight, TbLocation } from "react-icons/tb";
import { FaFlagCheckered } from "react-icons/fa";

// Gemini SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SendingProps {
  firstName: string;
  lastName: string;
  age: number;
  travelPrefs: string[];
  startDest: string;
  endDest: string;
}

const BuddyAi = () => {
  const [startDest, setStartDest] = useState("");
  const [endDest, setEndDest] = useState("");
  const [submitted, setSubmitted] = useState<SendingProps | null>(null);
  const [aiPlan, setAiPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  if (!user) return null;

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("api key not found")
    return
  }

  // Initialize Gemini client
  const genAI = new GoogleGenerativeAI(apiKey);

  const generateTourPlan = async (payload: SendingProps) => {
    const prompt = `
Create a personalized tour plan.

Name: ${payload.firstName}
Age: ${payload.age}
Preferences: ${payload.travelPrefs.join(", ") || "General travel"}
Start location: ${payload.startDest}
Destination: ${payload.endDest}

Include:
- Day-by-day itinerary
- Places to visit
- Activities
- Estimated daily cost (USD)
- Travel tips
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: SendingProps = {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      travelPrefs: user.role === "TOURIST" ? user.travelPreferences : [],
      startDest,
      endDest,
    };

    setSubmitted(payload);
    setAiPlan(null);

    try {
      const plan = await generateTourPlan(payload);
      setAiPlan(plan);
    } catch (err) {
      console.error(err);
      setAiPlan("Failed to generate tour plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mt-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>TourBuddy Ai</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Form card */}
      {!submitted && (
        <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:border-primary/50 max-w-2xl w-full">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <CardContent className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col justify-center text-center gap-4 md:gap-6">
              <h1 className="text-2xl md:text-3xl font-semibold md:font-bold">
                AI-Powered Tour Planner
              </h1>
              <p className="text-muted-foreground">
                Planning a trip has never been easier! Our AI creates a custom
                travel plan just for you, using your preferences.
              </p>
            </div>

            {/* Points */}
            <ul className="flex flex-col gap-2 md:gap-3 text-sm md:text-base mt-3">
              {[
                "Travel plans made just for you",
                "Easy-to-follow routes from start to destination",
                "Daily cost estimates for better budgeting",
                "Activities you’ll love, based on your interests",
                "Download your full travel plan as a PDF",
              ].map((point, idx) => (
                <li key={idx} className="flex flex-wrap">
                  <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
                  &nbsp;{point}
                </li>
              ))}
            </ul>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 md:gap-6 mt-3"
            >
              <FieldGroup className="flex flex-col md:flex-row gap-2">
                <Field>
                  <FieldLabel
                    htmlFor="startDest"
                    className="text-base font-medium"
                  >
                    <TbLocation className="text-primary text-base" /> Start
                    Location
                  </FieldLabel>
                  <Input
                    type="text"
                    name="startDest"
                    value={startDest}
                    onChange={(e) => setStartDest(e.target.value)}
                    placeholder="e.g., Colombo"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel
                    htmlFor="endDest"
                    className="text-base font-medium"
                  >
                    <FaFlagCheckered className="text-primary text-base" />{" "}
                    Destination
                  </FieldLabel>
                  <Input
                    type="text"
                    name="endDest"
                    value={endDest}
                    onChange={(e) => setEndDest(e.target.value)}
                    placeholder="e.g., Kandy"
                    required
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                className="w-full group text-sm md:text-base h-12"
              >
                Create My Travel Plan&nbsp;
                <TbArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* AI Plan Display */}
      {submitted && (
        <Card className="max-w-2xl w-full">
          <CardContent className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground">
                Generating your tour plan…
              </p>
            ) : (
              <pre className="whitespace-pre-wrap text-sm">{aiPlan}</pre>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BuddyAi;
