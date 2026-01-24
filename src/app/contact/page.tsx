"use client";

import { useState } from "react";
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
import { TbSend } from "react-icons/tb";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (
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
    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(formData);
    setIsSending(false);
  };
  return (
    <section className="max-w-3xl mx-auto w-full py-3 px-4">
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
              <BreadcrumbPage>Contact us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>

        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Your Name</FieldLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="What's your name?"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel>Your Email</FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your email address here"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel>Your Message</FieldLabel>
                <Textarea
                  name="message"
                  placeholder="Tell us what's on your mind!"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Field>
            </FieldGroup>
            <Button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center justify-center w-fit ml-auto"
            >
              <TbSend className={isSending ? "animate-pulse" : ""} />
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </FieldSet>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
