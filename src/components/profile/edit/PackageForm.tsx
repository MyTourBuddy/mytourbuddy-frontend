"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";

export const PackageCreateForm = () => {
  const [included, setIncluded] = useState<string[]>([""]);
  const [notIncluded, setNotIncluded] = useState<string[]>([""]);

  const updateItem = (
    index: number,
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, ""]);
  };

  const removeItem = (
    index: number,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

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
          <FieldLabel>Max Group Size</FieldLabel>
          <Input
            type="number"
            name="maxGroupSize"
            placeholder="e.g. 10"
            min={1}
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
          <FieldLabel>
            What’s Included <span className="text-red-500">*</span>
          </FieldLabel>

          <div className="flex flex-col gap-2">
            {included.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  placeholder="e.g. Accommodation"
                  onChange={(e) =>
                    updateItem(index, e.target.value, included, setIncluded)
                  }
                  required
                />

                {included.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(index, included, setIncluded)}
                  >
                    <TbX />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              className="w-fit"
              onClick={() => addItem(included, setIncluded)}
            >
              <TbPlus className="mr-2" />
              Add item
            </Button>
          </div>
        </Field>

        <Field>
          <FieldLabel>What’s Not Included</FieldLabel>

          <div className="flex flex-col gap-2">
            {notIncluded.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  placeholder="e.g. Personal expenses"
                  onChange={(e) =>
                    updateItem(
                      index,
                      e.target.value,
                      notIncluded,
                      setNotIncluded
                    )
                  }
                />

                {notIncluded.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      removeItem(index, notIncluded, setNotIncluded)
                    }
                  >
                    <TbX />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              className="w-fit"
              onClick={() => addItem(notIncluded, setNotIncluded)}
            >
              <TbPlus className="mr-2" />
              Add item
            </Button>
          </div>
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
  const [included, setIncluded] = useState<string[]>([""]);
  const [notIncluded, setNotIncluded] = useState<string[]>([""]);

  const updateItem = (
    index: number,
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, ""]);
  };

  const removeItem = (
    index: number,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

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
          <FieldLabel>Max Group Size</FieldLabel>
          <Input
            type="number"
            name="maxGroupSize"
            placeholder="e.g. 10"
            min={1}
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
          <FieldLabel>
            What’s Included <span className="text-red-500">*</span>
          </FieldLabel>

          <div className="flex flex-col gap-2">
            {included.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  placeholder="e.g. Accommodation"
                  onChange={(e) =>
                    updateItem(index, e.target.value, included, setIncluded)
                  }
                  required
                />

                {included.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(index, included, setIncluded)}
                  >
                    <TbX />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              className="w-fit"
              onClick={() => addItem(included, setIncluded)}
            >
              <TbPlus className="mr-2" />
              Add item
            </Button>
          </div>
        </Field>

        <Field>
          <FieldLabel>What’s Not Included</FieldLabel>

          <div className="flex flex-col gap-2">
            {notIncluded.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  placeholder="e.g. Personal expenses"
                  onChange={(e) =>
                    updateItem(
                      index,
                      e.target.value,
                      notIncluded,
                      setNotIncluded
                    )
                  }
                />

                {notIncluded.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      removeItem(index, notIncluded, setNotIncluded)
                    }
                  >
                    <TbX />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="ghost"
              className="w-fit"
              onClick={() => addItem(notIncluded, setNotIncluded)}
            >
              <TbPlus className="mr-2" />
              Add item
            </Button>
          </div>
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
