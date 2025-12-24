"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const AddExperienceForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                type="text"
                name="title"
                placeholder="Give your experience a title"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                name="description"
                placeholder="Share your story here"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="image">Attachments</FieldLabel>
              <Input
                type="text"
                name="image"
                placeholder="Attach your captures here"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="date">When did this happen?</FieldLabel>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                className="rounded-lg border max-w-xs"
              />
            </Field>
          </FieldGroup>

          <ButtonGroup className="ml-auto">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Add Experience</Button>
          </ButtonGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export const EditExperienceForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                type="text"
                name="title"
                placeholder="Update your experience title"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                name="description"
                placeholder="Update your story here"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="image">Attachments</FieldLabel>
              <Input
                type="text"
                name="image"
                placeholder="Attach your captures here"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="date">When did this happen?</FieldLabel>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                className="rounded-lg border max-w-3xs"
              />
              <Input
                type="date"
                name="date"
                value={date ? date.toISOString().split("T")[0] : ""}
                hidden
                required
                readOnly
              />
            </Field>
          </FieldGroup>
          <ButtonGroup className="ml-auto">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Update Experience</Button>
          </ButtonGroup>
        </form>
      </CardContent>
    </Card>
  );
};
