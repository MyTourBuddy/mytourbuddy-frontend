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
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateTicket } from "@/hooks/useTicketQueries";

const CreateSupportTicket = () => {
  const router = useRouter();
  const createTicketMutation = useCreateTicket();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.description.trim()) {
      return;
    }

    createTicketMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/dashboard/support");
        router.refresh();
      },
      onError: (error) => {
        console.error("Failed to create ticket:", error);
      },
    });
  };

  const isFormValid = formData.subject.trim() && formData.description.trim();

  return (
    <section className="max-w-3xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/support">Support</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="subject">Subject</FieldLabel>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  disabled={createTicketMutation.isPending}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">
                  Please describe your question or issue
                </FieldLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about your question, concern, or issue. Include any relevant information that might help us understand and assist you better."
                  disabled={createTicketMutation.isPending}
                  required
                />
              </Field>
            </FieldSet>

            <Button
              type="submit"
              className="w-fit"
              disabled={!isFormValid || createTicketMutation.isPending}
            >
              {createTicketMutation.isPending ? "Creating..." : "Create Ticket"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
};

export default CreateSupportTicket;
