"use client";

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
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LuMousePointerClick } from "react-icons/lu";
import { TbArrowRight, TbLocation } from "react-icons/tb";
import { FaFlagCheckered } from "react-icons/fa";

const userDetails = {
  firstName: "Donald",
  lastName: "Trump",
  age: 35,
  travelPrefs: ["pref1", "pref2"],
};

interface sendingProps {
  firstName: string;
  lastName: string;
  age: number;
  travelPrefs: string[];
  startDest: string;
  endDest: string;
}
const BuddyAi = () => {
  const [endDest, setEndDest] = useState("");
  const [startDest, setStartDest] = useState("");
  const [submitted, setSubmitted] = useState<sendingProps>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ endDest, startDest });
  };
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      {/* breadcrumb */}
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

      <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:border-primary/50 max-w-2xl w-full">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <CardContent className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col justify-center text-center gap-4 md:gap-6">
            <h1 className="text-2xl md:text-3xl font-semibold md:font-bold">
              AI-Powered Tour Planner
            </h1>

            <p className="text-muted-foreground">
              Planning a trip has never been easier! Our AI creates a custom
              travel plan just for you, using your preferences to design the
              perfect journey.
            </p>
          </div>

          {/* points */}
          <ul className="flex flex-col gap-2 md:gap-3 text-sm md:text-base mt-3">
            <li className="flex flex-wrap">
              <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
              &nbsp;Travel plans made just for you
            </li>
            <li className="flex flex-wrap">
              <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
              &nbsp;Easy-to-follow routes from start to destination
            </li>
            <li className="flex flex-wrap">
              <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
              &nbsp;Daily cost estimates for better budgeting
            </li>
            <li className="flex flex-wrap">
              <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
              &nbsp;Activities you’ll love, based on your interests
            </li>
            <li className="flex flex-wrap">
              <LuMousePointerClick className="md:mt-1 text-lg text-primary" />
              &nbsp;Download your full travel plan as a PDF
            </li>
          </ul>

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
                  <TbLocation className="text-primary text-base" />
                  Start Location
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
                <FieldLabel htmlFor="endDest" className="text-base font-medium">
                  <FaFlagCheckered className="text-primary text-base" />
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
    </div>
  );
};

export default BuddyAi;
