"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const PackageCreateForm = () => {
  const createPackage = async (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form action={createPackage} className="flex flex-col gap-4 md:gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title" className="text-sm md:text-balance">
            Package Title <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="text"
            name="title"
            placeholder="e.g. 3-Day Ella Adventure"
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description" className="text-sm md:text-balance">
            Package Description <span className="text-red-500">*</span>
          </FieldLabel>
          <Textarea
            rows={3}
            name="description"
            placeholder="Brief overview of the tour"
            className="text-sm md:text-balance"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="price" className="text-sm md:text-balance">
            Price (LKR) <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="number"
            name="price"
            placeholder="e.g. 45,000"
            className="text-sm md:text-balance h-9 md:h-10"
            required
            min="0"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="duration" className="text-sm md:text-balance">
            Duration <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="text"
            name="duration"
            placeholder="e.g. 3 Days / 2 Nights"
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="location" className="text-sm md:text-balance">
            Location <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="text"
            name="location"
            placeholder="e.g. Ella, Sri Lanka"
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="image" className="text-sm md:text-balance">
            Image URL
          </FieldLabel>
          <Input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="text-sm md:text-balance h-9 md:h-10"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="included" className="text-sm md:text-balance">
            What’s Included <span className="text-red-500">*</span>
          </FieldLabel>
          <Textarea
            rows={3}
            name="includes"
            placeholder="Meals, transport, guide, accommodation"
            className="text-sm md:text-balance"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="notIncluded" className="text-sm md:text-balance">
            What’s Not Included
          </FieldLabel>
          <Textarea
            rows={3}
            name="notIncluded"
            placeholder="Personal expenses, tickets, tips"
            className="text-sm md:text-balance"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="note" className="text-sm md:text-balance">
            Additional Notes
          </FieldLabel>
          <Textarea
            rows={3}
            name="note"
            placeholder="Important notes for travelers"
            className="text-sm md:text-balance"
          />
        </Field>
      </FieldGroup>

      <ButtonGroup className="ml-auto">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Create Package</Button>
      </ButtonGroup>
    </form>
  );
};

export const PackageEditForm = () => {
  return (
    <form className="flex flex-col gap-4 md:gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title" className="text-sm md:text-balance">
            Package Title <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="text"
            name="title"
            placeholder="e.g. 3-Day Ella Adventure"
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description" className="text-sm md:text-balance">
            Package Description <span className="text-red-500">*</span>
          </FieldLabel>
          <Textarea
            rows={3}
            name="description"
            placeholder="Brief overview of the tour"
            className="text-sm md:text-balance"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="price" className="text-sm md:text-balance">
            Price (LKR) <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="number"
            name="price"
            placeholder="e.g. 45,000"
            className="text-sm md:text-balance h-9 md:h-10"
            required
            min="0"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="duration" className="text-sm md:text-balance">
            Duration <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="text"
            name="duration"
            placeholder="e.g. 3 Days / 2 Nights"
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="location" className="text-sm md:text-balance">
            Location <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            type="text"
            name="location"
            placeholder="e.g. Ella, Sri Lanka"
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="image" className="text-sm md:text-balance">
            Image URL
          </FieldLabel>
          <Input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="text-sm md:text-balance h-9 md:h-10"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="included" className="text-sm md:text-balance">
            What’s Included <span className="text-red-500">*</span>
          </FieldLabel>
          <Textarea
            rows={3}
            name="includes"
            placeholder="Meals, transport, guide, accommodation"
            className="text-sm md:text-balance"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="notIncluded" className="text-sm md:text-balance">
            What’s Not Included
          </FieldLabel>
          <Textarea
            rows={3}
            name="notIncluded"
            placeholder="Personal expenses, tickets, tips"
            className="text-sm md:text-balance"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="note" className="text-sm md:text-balance">
            Additional Notes
          </FieldLabel>
          <Textarea
            rows={3}
            name="note"
            placeholder="Important notes for travelers"
            className="text-sm md:text-balance"
          />
        </Field>
      </FieldGroup>

      <ButtonGroup className="ml-auto">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Update Package</Button>
      </ButtonGroup>
    </form>
  );
};
